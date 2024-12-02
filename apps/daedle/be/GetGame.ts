import { AbstractHandler } from './AbstractHandler.ts'
import { response } from '$static/lib/ts/Responses.ts'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { getPlayer1, getPlayer2, GameType } from './Game.ts'
import { getMatch } from './Match.ts'

const PATH = '/getGame'
const CAPABILITY = 'getGame'

export class GetGame extends AbstractHandler {

  static shouldHandle(request: Request): boolean {
    const url = new URL(request.url)
    return (
      request.method === 'GET' &&
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

    const party = this.token.getParty()
    const counterparty = this.token.getCounterparty()
    const isForeign = this.token.getParty() !== counterparty
    const {
      status,
      player2
    } = await getMatch()
    if (
      isForeign && (
        status !== 'twoplayer' ||
        player2 !== counterparty
      )
    ) {
      throw `${party} is not in two player with ${counterparty}`
    }
  }

  async handle(): Promise<Response> {
    const url = new URL(this.request.url)
    let game: GameType
    if (url.searchParams.has('player2')) {
      game = await getPlayer2()
    }
    else {
      game = await getPlayer1()
    }

    return response({
      ok: game
    })
  }
}
