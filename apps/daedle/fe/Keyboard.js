import { Color } from './Attempt.js'

export class Keyboard extends EventTarget {
  #keyboardEl
  #keys

  constructor(keyboardEl) {
    super()
    this.#keyboardEl = keyboardEl

    this.#keys = Array.from(keyboardEl.querySelectorAll('key'))
    for (const key of this.#keys) {
      key.addEventListener('click', (event) => {
        const keyEl = event.target
        this.feedback(keyEl)
        event.stopPropagation()
        const name = keyEl.getAttribute('name')
        this.dispatchEvent(new CustomEvent('keypress', {
          detail: name
        }))
      })
    }
  }

  feedback(keyEl) {
    keyEl.classList.add('touched')
    setTimeout(() => keyEl.classList.remove('touched'), 200)
    if (globalThis?.navigator?.vibrate) {
      globalThis.navigator.vibrate(10)
    }
  }

  colorKeys(game) {
    this.reset()
    const colors = this.getColors(game)
    for (const letter in colors) {
      const letterEl = this.#keyboardEl.querySelector(`key[name=${letter.toUpperCase()}]`)
      letterEl.className = colors[letter]
    }
  }

  reset() {
    this.#keyboardEl.querySelectorAll('key').forEach(
      (keyEl) => {
        keyEl.classList.remove(Color.GREY, Color.AMBER, Color.GREEN)
      }
    )
  }

  /**
   * Colours the keyboard per the game attempts so far.
   *
   * @param {Game} game whose attempts colour the keys.
   */
  getColors(game) {
    const colors = {}
    for (const attempt of game.getAttempts()) {
      for (const mark of attempt.getMarks()) {
        const {
          letter,
          color
        } = mark

        if (
          color === Color.GREEN
        ) {
          colors[letter] = Color.GREEN
        }

        if (
          color === Color.AMBER &&
          colors[letter] !== Color.GREEN
        ) {
          colors[letter] = Color.AMBER
        }

        if (
          color === Color.GREY &&
          colors[letter] !== Color.GREEN &&
          colors[letter] !== Color.AMBER
        ) {
          colors[letter] = Color.GREY
        }
      }
    }
    return colors
  }
}
