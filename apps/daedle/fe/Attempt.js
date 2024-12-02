export const Color = {
  GREY: 'grey',
  AMBER: 'amber',
  GREEN: 'green'
}

/**
 * An attempt is a completed guess.
 */
export class Attempt {
  #wordLength
  #guess
  #theWord
  #marks

  constructor(guess, theWord) {
    this.#guess = guess
    this.#theWord = theWord
    this.#wordLength = guess.length
  }

  getGuess() {
    return this.#guess
  }

  getMarks() {
    return this.#marks
  }

  doMarking() {
    const guess = this.#guess.split('')
    const theWord = this.#theWord.split('')
    const marks = new Array(guess.length)

    // Start with grey marks.
    for (let i = 0; i < this.#wordLength; i++) {
      marks[i] = {
        letter: guess[i],
        color: Color.GREY
      }
    }

    // Substitute green marks.
    for (let i = 0; i < this.#wordLength; i++) {
      if (guess[i] === theWord[i]) {
        marks[i] = {
          letter: guess[i],
          color: Color.GREEN
        }
        guess[i] = theWord[i] = null
      }
    }

    // Substitute amber marks.
    for (let i = 0; i < this.#wordLength; i++) {
      if (guess[i] !== null) {
        const theWordIndex = theWord.indexOf(guess[i])
        if ( theWordIndex !== -1) {
          marks[i] = {
            letter: guess[i],
            color: Color.AMBER
          }
          guess[i] = theWord[theWordIndex] = null
        }
      }
    }

    this.#marks = marks
  }

  isSolution() {
    return this.#marks.every(mark => mark.color === Color.GREEN)
  }

  render(guessEl) {
    if (!this.#marks) {
      throw 'Must do marking first'
    }

    for (let i = 0; i < this.#wordLength; i++) {
      const letterEl = guessEl.querySelector(`letter:nth-child(${i+1})`)
      letterEl.innerText = this.#marks[i].letter.toUpperCase()
      letterEl.className = this.#marks[i].color
    }

    guessEl.classList.add('committed')
  }
}
