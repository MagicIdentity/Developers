import { AbstractHandler } from './AbstractHandler.ts'
import { response } from '$static/lib/ts/Responses.ts'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { GameType, isGameType, setPlayer1 } from './Game.ts'

const PATH = '/setGame'
const CAPABILITY = 'setGame'

export class SetGame extends AbstractHandler {
  #game?: GameType

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
    const game = await this.request.json()
    console.log('SetGame.ts#31', game)
    if (!isGameType(game)) {
      throw `Invalid game in request body`
    }
    this.#game = game
  }

  async handle(): Promise<Response> {
    const game = this.#game as GameType
    const result = await setPlayer1(game)
    return response(result)
  }
}
