import { response } from '$static/lib/ts/Responses.ts'
import {
  getClientProtocol,
  getClientHost
} from '$static/lib/ts/Requests.ts'
import { Token } from '$static/lib/js/Token.js'

/**
 * Wraps the concrete class `handle()` method so as to return an
 * error response on exception.
 */
export abstract class AbstractHandler {
  token: Token | null
  request: Request
  url: URL
  protocol: string
  host: string

  constructor(request: Request) {
    this.request = request
    this.url = new URL(request.url)
    this.protocol = getClientProtocol(request)
    this.host = getClientHost(request)
    this.token = Token.from(request)
  }

  /**
   * The token is validated if present, and the request
   * is passed on to the concrete class. This can rely upon
   * the token having been validated, but the capabilities
   * must still be checked for authz purposes by the concrete
   * class.
   */
  async handler(): Promise<Response> {
    console.log('Handling', this.request.url)
    try {
      await this.assertIsValid()
      return await this.handle()
    }
    catch (e) {
      console.error(e)
      return response({
        error: e?.toString()
      })
    }
  }


  /**
   * Checks the request is valid.
   * @throws exception if request is invalid.
   */
  abstract assertIsValid(): Promise<void>

  /**
   * Processes the valid request.
   * @return the response object.
   */
  abstract handle(): Promise<Response>
}
