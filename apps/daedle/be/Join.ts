import { AbstractHandler } from './AbstractHandler.ts'
import { response } from '$static/lib/ts/Responses.ts'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { getMatch, setMatch, MatchType } from './Match.ts'
import { getPlayer1 } from './Game.ts'

const PATH = '/join'
const CAPABILITY = 'getGame'

/**
 * A join occurs when a player sets the match status to 'join',
 * which causes a request to player2 to join their game, with
 * player1's game in the request body.
 *
 * If player2 is already has status 'invite', then the player2 join
 * succeeds.
 *
 * Otherwise, player1 status is set to 'invite', awaiting the
 * join from player2.
 *
 * The shared game is therefore the player that first requests
 * the join.
 */
export class Join extends AbstractHandler {

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
    const party = this.token?.getParty()
    const counterparty = this.token?.getCounterparty() as string
    const {
      status,
      player2
    } = await getMatch()

    if (!(
      status === 'invite' &&
      player2 === counterparty
    )) {
      throw `Cannot join because ${party} has not invited ${counterparty}`
    }
  }

  async handle(): Promise<Response> {
    const player2 = this.token?.getCounterparty() as string
    const match: MatchType = {
      status: 'twoplayer',
      player2
    }
    await setMatch(match)

    const {
      theWord,
      guesses
    } = await getPlayer1()

    return response({
      ok: {
        theWord,
        guesses
      }
    })
  }
}
