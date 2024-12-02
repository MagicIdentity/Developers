import { BrowserApp } from 'https://webdaemon.online/dev/static/lib/js/BrowserApp.js'
import {
  setItem,
  getItem
} from 'https://webdaemon.online/dev/static/lib/js/Storage.js'

const stateDiv = document.querySelector('div.state')
const responseDiv = document.querySelector('div.response')
const lastSeenDiv = document.querySelector('div.lastseen')

/**
 * The prefix and tab name match the configuration in
 * the helloWorld.yml file.
 */
const SOURCE_PREFIX = 'hello/world'
const TAB_NAME = 'v1'

/**
 * You don't need to use this convenience class, but it
 * is, well... convenient.
 */
const app = await BrowserApp.getInstance('HelloWorld')

/**
 * An orphan is when the app is not launched from a
 * dæmon shell (or launcher), and therefore does not
 * have a signed token to use in requests.
 */
if (app.isOrphan()) {
  stateDiv.classList.add('orphan')
  throw 'Launch fom your Web Dæmon!'
}

/**
 * We construct the path to the installed app and tab. The request
 * includes the token given to us by the launcher.
 */
const url = `${app.getPartyOrigin()}/tab/${SOURCE_PREFIX}/${TAB_NAME}`
const response = await fetch(url, {
  headers: {
    'X-Tabserver-Token': app.getTokenBase64()
  }
})

/**
 * We deconstruct the response in order to show the greeting.
 */
const {
  ok: {
    greeting,
    counterparty
  }
} = await response.json()
responseDiv.innerText = `${greeting} ${counterparty}`

/**
 * The Dæmon storage is accessed using the token. This only
 * works because the `party:control` source is specified in
 * the `audience` section of the YML file. We are authorized
 * because the token signatory is the Dæmon (party) itself.
 *
 * Dæmon storage is also partitioned by the "same origin" rule.
 * One app cannot access the storage associated with a different app.
 */
const token = app.getToken()
const lastSeen = await getItem(token, 'last/seen')
if ('ok' in lastSeen) {
  lastSeenDiv.innerText = `Last seen ${lastSeen.ok}`
}
else {
  lastSeenDiv.innerText = 'Not seen before!'
}
await setItem(token, 'last/seen', new Date())
