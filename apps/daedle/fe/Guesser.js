export class Guesser {
  #game
  #keyboard
  #letterIndex = 0 // Guess in progress does not survive page refresh.

  constructor(game, keyboard) {
    this.#game = game
    this.#keyboard = keyboard
  }

  /**
   * Links the guesser to the keyboard for keypresses
   * and the keyboard to the game for colouring keys.
   */
  activate() {

    this.#game.addEventListener('attempt', () => {
      this.#keyboard.colorKeys(this.#game)
    })

    this.#keyboard.addEventListener('keypress', (event) => {
      const key = event.detail
      switch (key) {
        case 'del':
          this.clearLetter()
          break

        case 'enter': {
          this.commit()
          break
        }

        default:
          this.setLetter(key)
      }
    })

    this.reset()
  }

  /**
   * Resets the guesser on the first uncommitted guess row.
   */
  reset() {
    this.#letterIndex = 0
  }

  getLetterEl() {
    const guessEl = this.#game.getGuessEl()
    return guessEl.querySelector(`letter:nth-child(${this.#letterIndex})`)
  }

  setLetter(letter) {
    if (this.#letterIndex == this.#game.getLetterCount()) {
      return
    }

    this.#letterIndex++
    const letterEl = this.getLetterEl()
    letterEl.innerText = letter
    letterEl.classList.add('guessed')
  }

  clearLetter() {
    if (this.#letterIndex == 0) {
      return
    }

    const letterEl = this.getLetterEl()
    letterEl.innerText = ''
    letterEl.className = ''
    this.#letterIndex--
  }

  getGuess() {
    let guess = ''
    const guessEl = this.#game.getGuessEl()
    const letterEls = Array.from(guessEl.querySelectorAll('letter'))
    for (const letterEl of letterEls) {
      const letter = letterEl.innerText ?? ''
      guess = guess + letter
    }
    return guess
  }

  /**
   * Commits a guess and returns the marked candidate.
   * @throws {string} if guess cannot be committed.
   */
  async commit() {
    const guessEl = this.#game.getGuessEl()
    const guess = this.getGuess()

    try {
      const attempt = await this.#game.markGuess(guess)
      this.#game.addAttempt(attempt)
      attempt.render(guessEl)
      this.reset()
    }
    catch (e) {
      this.feedback(e)
    }
  }

  feedback(_e) {
    const guessEl = this.#game.getGuessEl()
    guessEl.classList.add('shake');
    guessEl.addEventListener('animationend',
      () => {
        guessEl.classList.remove('shake')
    }, {
      once: true
    })
  }
}
