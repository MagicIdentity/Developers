import { Guesser } from './Guesser.js'
import { Keyboard } from './Keyboard.js'
import { Wordlist } from './Wordlist.js'
import { Attempt } from './Attempt.js'
import { BrowserApp } from '$static/lib/js/BrowserApp.js'

const app = await BrowserApp.getInstance('daedle')
const Prefix = app.getParam('prefix')
const Url = {
  GetGame: `${app.getPartyOrigin()}/tab/${Prefix}/v1/getGame`,
  SetGame: `${app.getPartyOrigin()}/tab/${Prefix}/v1/setGame`
}

/**
 * If player2 is set, then the game represents a remote player
 * and requires no keyboard etc.
 */
export class Game extends EventTarget {
  #suppressSave = false
  #gameEl
  #keyboard
  #letterCount
  #guessCount
  #player2
  #theWord
  #attempts = [] /** List of marked Attempt */
  #gameState = Game.State.IN_PROGRESS

  static State = {
    SOLVED: 'SOLVED',
    IN_PROGRESS: 'IN_PROGRESS',
    LOST: 'LOST'
  }

  constructor(gameEl, {letterCount, guessCount, keyboardEl, player2}) {
    super()
    this.#gameEl = gameEl
    this.#letterCount = letterCount ?? 5
    this.#guessCount = guessCount ?? 6
    this.#player2 = player2

    if (!player2) {
      this.#keyboard = new Keyboard(keyboardEl)
      const guesser = new Guesser(this, this.#keyboard)
      guesser.activate()
      this.addEventListener('attempt', () => {
        if (!this.#suppressSave) {
          this.save()
        }
      })
    }
  }

  async reset() {
    const wordlist = await Wordlist.getInstance()
    this.#gameState = Game.State.IN_PROGRESS
    this.render()
    this.#keyboard.reset()
    await this.setTheWord(wordlist.randomTheWord())
    await this.setGuesses([])
    await this.save()
  }

  async load() {
    const url = new URL(Url.GetGame)
    if (this.#player2) {
      url.searchParams.append('player2', this.#player2)
    }
    const response = await fetch(url, {
      headers: {
        'X-Tabserver-Token': app.getTokenBase64()
      }
    })

    const {
      ok,
      error
    } = await response.json()

    if (error) {
      if (this.#player2) {
        throw `Error getting game from ${this.#player2}`
      }
      return this.reset()
    }

    const {
      theWord,
      guesses
    } = ok
    this.#keyboard?.reset()
    this.render()
    await this.setTheWord(theWord)
    await this.setGuesses(guesses)
  }

  async save() {
    const theWord = this.#theWord
    const guesses = this.#attempts.map(attempt => attempt.getGuess())
    const body = {
      theWord,
      guesses
    }
    await fetch(Url.SetGame, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tabserver-Token': app.getTokenBase64()
      },
      body: JSON.stringify(body)
    })
  }

  async setTheWord(theWord = null) {
    const wordlist = await Wordlist.getInstance()
    if (!theWord) {
      theWord = wordlist.randomTheWord()
    }

    if (!wordlist.hasTheWord(theWord)) {
      throw `Invalid word '${theWord.toUpperCase()}'`
    }
    this.#theWord = theWord
  }

  getTheWord() {
    return this.#theWord
  }

  async setGuesses(guesses = []) {
    this.#suppressSave = true
    this.#attempts = []
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i]
      const attempt = await this.markGuess(guess)
      const guessEl = this.#gameEl.querySelector(`guesses > guess:nth-of-type(${i + 1})`)
      attempt.render(guessEl)
      this.addAttempt(attempt)
    }
    this.#suppressSave = false
  }

  async markGuess(guess) {
    const wordlist = await Wordlist.getInstance()
    guess = guess.toLowerCase()
    if (!wordlist.hasGuess(guess)) {
      throw `Invalid guess '${guess}'`
    }
    const attempt = new Attempt(guess, this.#theWord)
    attempt.doMarking()
    return attempt
  }

  getLetterCount() {
    return this.#letterCount
  }

  getAttempts() {
    return this.#attempts
  }

  getTriesCount() {
    return this.#attempts.length
  }

  getGuessEl() {
    const guessEls = Array.from(this.#gameEl.querySelectorAll('guess'))
    for (const guessEl of guessEls) {
      if (!guessEl.classList.contains('committed')) {
        return guessEl
      }
    }
    return null
  }

  /**
   * Adds the valid and marked attempt and fires the attempt event
   * which includes the game state (solved, lost or in_progress)
   * @param {Attempt} attempt
   */
  addAttempt(attempt) {
    this.#attempts.push(attempt)

    if (attempt.isSolution()) {
      this.#gameState = Game.State.SOLVED
    }
    else if (this.#attempts.length === this.#guessCount) {
      this.#gameState = Game.State.LOST
    }

    this.dispatchEvent(
      new CustomEvent('attempt', {
        detail: {
          gameState: this.#gameState,
          attempt
        }
      })
    )
  }

  /**
   * Fetches the wordlist, and renders the empty board of guess
   * rows and letter columns.
   */
  render() {
    const existingGuesses = this.#gameEl.querySelector('guesses')
    existingGuesses?.remove()
    const guessesEl = document.createElement('guesses')
    for (let i = 0; i < this.#guessCount; i++) {
      const guessEl = document.createElement('guess')
      for (let j = 0; j < this.#letterCount; j++) {
        const letterEl = document.createElement('letter')
        guessEl.appendChild(letterEl)
      }
      guessesEl.appendChild(guessEl)
    }
    this.#gameEl.appendChild(guessesEl)
  }
}
