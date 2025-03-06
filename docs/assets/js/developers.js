import { BrowserApp } from 'https://unpkg.com/webdaemon'

const app = await BrowserApp.getInstance('developers')
const party = app.getParty()
const partyEl = document.querySelector('party')
if (party && partyEl) {
  partyEl.innerText = party
}
