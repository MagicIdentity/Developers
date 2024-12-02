import { AbstractHandler } from './AbstractHandler.ts'
import { response} from '$static/lib/ts/Responses.ts'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { MatchType, isMatchType, setMatch } from './Match.ts'
import { getPlayer1, setPlayer1 } from './Game.ts'

const PATH = '/setMatch'
const CAPABILITY = 'setGame'

export class SetMatch extends AbstractHandler {
  #match?: MatchType

  static shouldHandle(request: Request): boolean {
    const url = new URL(request.url)
    return (
      request.method === 'POST' &&
      url.pathname === PATH
    )
  }

  async assertIsValid() {
    const {
      system: {
        source
      }
    } = Lifecycle.getConfig()
    if (!this.token?.hasCapability(source, CAPABILITY)) {
      throw `Missing capability: ${CAPABILITY}`
    }
    const match = await this.request.json()
    if (!isMatchType(match)) {
      throw `Invalid match in request body`
    }
    this.#match = match
  }

  async handle(): Promise<Response> {
    let match = this.#match as MatchType

    switch (match.status) {

      case 'join': {
        const isJoined = await this.join()
        if (isJoined) {
          match = {
            status: 'twoplayer',
            player2: match.player2
          }
        }
        else {
          match = {
            status: 'invite',
            player2: match.player2
          }
        }
        break
      }

      default:
        // No action
    }

    await setMatch(match)
    return response({
      ok: match
    })
  }

  async join(): Promise<boolean> {
    const {
      system: {
        party,
        source,
        protocol,
        sourcePrefix
      }
    } = Lifecycle.getConfig()

    const {
      player2
    } = this.#match as MatchType

    if (party === player2) {
      throw 'Cannot join your own game!'
    }

    const scope = {
      [source]: 'getGame'
    }

    const url = `${protocol}//${player2}/tab/${sourcePrefix}/v1/join`
    const token = await Lifecycle.getTokenFor(scope, player2)
    const body = await getPlayer1()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Tabserver-Token': token.asSignedBase64()
      },
      body: JSON.stringify(body)
    })

    const json = await response.json()
    if ('error' in json) {
      return false
    }

    const {
      theWord
    } = json.ok

    await setPlayer1({
      theWord,
      guesses: []
    })

    return true
  }
}
