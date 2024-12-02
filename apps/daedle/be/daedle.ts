import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { response } from '$static/lib/ts/Responses.ts'

import { GetGame } from './GetGame.ts'
import { SetGame } from './SetGame.ts'
import { GetMatch } from './GetMatch.ts'
import { SetMatch } from './SetMatch.ts'
import { Join } from './Join.ts'

const lifecycle = Lifecycle.getInstance()
lifecycle.addEventListener('config',
  event => console.log('Config', event)
)

// deno-lint-ignore require-await
async function handler(request: Request): Promise<Response> {
  if (Lifecycle.shouldHandle(request)) {
    return lifecycle.handler(request)
  }

  if (SetGame.shouldHandle(request)) {
    return new SetGame(request).handler()
  }

  if (GetGame.shouldHandle(request)) {
    return new GetGame(request).handler()
  }

  if (SetMatch.shouldHandle(request)) {
    return new SetMatch(request).handler()
  }

  if (GetMatch.shouldHandle(request)) {
    return new GetMatch(request).handler()
  }

  if (Join.shouldHandle(request)) {
    return new Join(request).handler()
  }

  return response({
    error: `404 Invalid request to Daedle game`
  })
}

/**
 * Start server.
 */
Deno.serve({port: 0}, handler)
