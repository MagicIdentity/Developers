import { AbstractHandler } from './AbstractHandler.ts'
import { response } from '$static/lib/ts/Responses.ts'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { getMatch } from './Match.ts'

const PATH = '/getMatch'
const CAPABILITY = 'getGame'

export class GetMatch extends AbstractHandler {

  static shouldHandle(request: Request): boolean {
    const url = new URL(request.url)
    return (
      request.method === 'GET' &&
      url.pathname === PATH
    )
  }

  // deno-lint-ignore require-await
  async assertIsValid() {
    const {
      system: {
        source
      }
    } = Lifecycle.getConfig()
    if (!this.token?.hasCapability(source, CAPABILITY)) {
      throw `Missing capability: ${CAPABILITY}`
    }
  }

  async handle(): Promise<Response> {
    let match
    try {
      match = await getMatch()
    }
    catch (_e) {
      match = {
        status: 'oneplayer'
      }
    }

    return response({
      ok: match
    })
  }
}
