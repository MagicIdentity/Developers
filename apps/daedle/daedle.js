import { Match } from './fe/Match.js'

const stateEl = document.querySelector('state')
const matchEl = document.querySelector('match')
const stopPropagationEls = document.querySelectorAll('button, share, keyboard')

for (const el of stopPropagationEls) {
  el.addEventListener('click', (event) => event.stopPropagation())
}

const match = new Match(matchEl)

match.addEventListener('ready',
  () => {
    stateEl.className = 'match'
  }
)

match.load()
