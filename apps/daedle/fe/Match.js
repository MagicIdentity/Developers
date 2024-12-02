import { BrowserApp } from '$static/lib/js/BrowserApp.js'
import { Game } from './Game.js'

const POLL_PERIOD_MILLIS = 5000

const app = await BrowserApp.getInstance('daedle')
const Prefix = app.getParam('prefix')
const Url = {
  GetMatch: `${app.getPartyOrigin()}/tab/${Prefix}/v1/getMatch`,
  SetMatch: `${app.getPartyOrigin()}/tab/${Prefix}/v1/setMatch`
}

export class Match extends EventTarget {
  #match        // MatchType.
  #frontGame
  #backGame

  #pollInviteTimeoutRef
  #pollPlayer2TimeoutRef

  #matchEl
  #flipperEl
  #flipTriggerEls
  #joinButton
  #kickButton
  #player2Input
  #player2NameEl
  #resetButtons
  #cancelButtons
  #frontEl
  #backEl
  #frontGameEl
  #backGameEl
  #frontSolvedEl
  #backSolvedEl
  #keyboardEl
  #lostEl

  constructor(matchEl) {
    super()
    this.#matchEl = matchEl
    this.#flipperEl = matchEl.querySelector('flipper')
    this.#flipTriggerEls = matchEl.querySelectorAll('front, back')
    this.#joinButton = matchEl.querySelector('button[name=join]')
    this.#kickButton = matchEl.querySelector('button[name=kick]')
    this.#player2Input = matchEl.querySelector('input[name=player2]')
    this.#player2NameEl = matchEl.querySelector('player2 name')
    this.#resetButtons = matchEl.querySelectorAll('button[name=reset]')
    this.#cancelButtons = matchEl.querySelectorAll('button[name=cancel]')
    this.#frontEl = matchEl.querySelector('front')
    this.#backEl = matchEl.querySelector('back')
    this.#frontSolvedEl = this.#frontEl.querySelector('solved')
    this.#backSolvedEl = this.#backEl.querySelector('solved')
    this.#frontGameEl = this.#frontEl.querySelector('game')
    this.#backGameEl = this.#backEl.querySelector('game')
    this.#keyboardEl = matchEl.querySelector('keyboard')
    this.#lostEl = matchEl.querySelector('lost')

    this.activate()
  }

  activate() {
    for (const el of this.#flipTriggerEls) {
      el.addEventListener('click', () => {
        this.#flipperEl.classList.toggle('flip')
        this.pollPlayer2()
      })
    }
    this.#joinButton.addEventListener('click', () => {
      const player2 = this.#player2Input.value.toLowerCase()
      if (!player2) {
        return
      }
      this.set({
        status: 'join',
        player2
      })
    })
    this.#kickButton.addEventListener('click', () => {
      this.set({
        status: 'oneplayer'
      })
      this.#frontEl.className = ''
      this.#backEl.className = ''
    })
    this.#resetButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.reset()
      })
    })
    this.#cancelButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.cancel()
      })
    })

    this.#frontGame = new Game(this.#frontGameEl, {
      letterCount: 5,
      guessCount: 6,
      keyboardEl: this.#keyboardEl
    })
    this.#frontEl.className = 'in_progress'
    this.#frontGame.addEventListener('attempt',
      (event) => {
        switch (event.detail.gameState) {

          case Game.State.LOST:
            this.#frontEl.className = 'lost'
            this.#lostEl.innerText = this.#frontGame.getTheWord()
            break
          case Game.State.SOLVED:
            this.#frontEl.className = 'solved'
            this.#frontSolvedEl.innerText = this.#frontGame.getTriesCount()
            break
          case Game.State.IN_PROGRESS:
            this.#frontEl.className = 'in_progress'
            break
          default:
            // No action.
        }
      }
    )
  }

  async getMatch() {
    const response = await fetch(Url.GetMatch, {
      headers: {
        'X-Tabserver-Token': app.getTokenBase64()
      }
    })

    const {
      ok: match,
      error
    } = await response.json()

    if (error) {
      throw error
    }

    this.#match = match
  }

  async load() {
    await this.getMatch()
    await this.#frontGame.load()

    if (this.#match.status === 'twoplayer') {
      this.#player2NameEl.innerText = this.#match.player2
      this.#backGame = new Game(this.#backGameEl, {
        letterCount: 5,
        guessCount: 6,
        player2: this.#match.player2
      })
      this.#backEl.className = 'in_progress'
      this.#backGame.addEventListener('attempt',
        (event) => {
          switch (event.detail.gameState) {

            case Game.State.LOST:
              this.#backEl.className = 'lost'
              break
            case Game.State.SOLVED:
              this.#backEl.className = 'solved'
              this.#backSolvedEl.innerText = this.#backGame.getTriesCount()
              break
            case Game.State.IN_PROGRESS:
              this.#backEl.className = 'in_progress'
              break
            default:
              // No action.
          }
        }
      )
    }

    this.#matchEl.className = this.#match.status
    this.#flipperEl.classList.remove('flip')
    // Keyboard reset here

    this.dispatchEvent(new CustomEvent('ready', {
      detail: this.#match
    }))
  }

  async set(match) {
    const response = await fetch(Url.SetMatch, {
      method: 'POST',
      headers: {
        'X-Tabserver-Token': app.getTokenBase64()
      },
      body: JSON.stringify(match)
    })

    const {
      ok,
      error
    } = await response.json()

    if (error) {
      console.error(error)
      return
    }

    const {
      status: requestStatus
    } = match

    const {
      status,
      player2
    } = ok

    if (player2) {
      this.#player2NameEl.innerText = player2
    }

    if (requestStatus === 'join' && status === 'twoplayer') {
      await this.load()
    }

    if (status === 'invite') {
      this.pollInvite()
    }

    this.#matchEl.className = status
  }

  reset() {
    this.cancel()
    this.#frontGame.reset()
    this.#flipperEl.classList.remove('flip')
    this.#frontEl.className = ''
    this.#backEl.className = ''
  }

  cancel() {
    this.#matchEl.className = 'oneplayer'
    this.set({
      status: 'oneplayer'
    })
  }

  async pollInvite() {
    await this.getMatch()
    if (this.#match.status !== 'invite') {
      this.load()
    }
    else {
      clearTimeout(this.#pollInviteTimeoutRef)
      this.#pollInviteTimeoutRef = setTimeout(() => this.pollInvite(), POLL_PERIOD_MILLIS)
    }
  }

  async pollPlayer2() {
    if (
      this.#match.status === 'twoplayer' &&
      this.#flipperEl.classList.contains('flip')
    ) {
      try {
        await this.#backGame.load()
        clearTimeout(this.#pollPlayer2TimeoutRef)
        this.#pollPlayer2TimeoutRef = setTimeout(() => this.pollPlayer2(), POLL_PERIOD_MILLIS)
      }
      catch (_e) {
        this.set({
          status: 'oneplayer'
        })
      }
    }
  }
}
