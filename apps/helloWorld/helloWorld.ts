import { Token } from '$static/lib/js/Token.js'
import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { response } from '$static/lib/ts/Responses.ts'

console.log('Loading')

/**
 * Handles lifecycle events including:
 *
 *  - Startup lifecycle request from spawner.
 *  - Public JWK requests from verifiers.
 *  - Shutdown request from spawner.
 */
const lifecycle = new Lifecycle()
lifecycle.addEventListener('config', (event) => {
  console.log(event)
})

// deno-lint-ignore require-await
async function handler(request: Request): Promise<Response> {

  /**
   * The server has lifecycle handled by this object. For example,
   * the config object is supplied in an initialisation request.
   */
  if (Lifecycle.shouldHandle(request)) {
    return lifecycle.handler(request)
  }

  /**
   * The config object is useful for source HTML and YAML files.
   */
  const config = Lifecycle.getConfig()
  const source = config.system.source
  const greeting = config.user.greeting

  try {
    const token = Token.from(request)
    if (token === null) {
      throw `This request must provide a token in 'X-Tabserver-Token'`
    }

    if (!token.hasCapability(source, 'speak')) {
      throw `This token must request the capability 'speak'`
    }

    console.log('Saying', greeting)

    return response({
      ok: {
        greeting,
        counterparty: token.getCounterparty()
      }
    })
  }
  catch (e) {
    console.error(e)
    return response({
      error: `404 ${e}`
    })
  }
}

/**
 * When this module is loaded in the Dæmon, it starts serving
 * requests on a system-allocated port.
 */
Deno.serve({port: 0}, handler)
