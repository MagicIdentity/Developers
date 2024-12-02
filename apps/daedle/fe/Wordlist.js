const ALLWORDS_TXT = './fe/allwords.txt'
const THEWORDS_TXT = './fe/thewords.txt'

export class Wordlist {
  static #instance
  #allWords
  #theWords

  static async getInstance() {
    if (!Wordlist.#instance) {
      const wordlist = new Wordlist()
      await wordlist.init()
      Wordlist.#instance = wordlist
    }
    return Wordlist.#instance
  }

  async init() {
    this.#allWords = await this.getWords(ALLWORDS_TXT)
    this.#theWords = await this.getWords(THEWORDS_TXT)
  }

  async getWords(href) {
    const response = await fetch(href)
    const wordsText = await response.text()
    return wordsText.split(/\r?\n/)
  }

  hasTheWord(word) {
    return word && this.#theWords.includes(word)
  }

  hasGuess(word) {
    return word && this.#allWords.includes(word)
  }

  randomTheWord() {
    const index = Math.floor(Math.random() * (this.#theWords.length + 1))
    return this.#theWords[index]
  }
}
