import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { setItem, getItem } from '$static/lib/js/Storage.js'
import { getMatch } from './Match.ts'

const Player1Key = 'daedle/player1'

export interface GameType {
   theWord: string,
   guesses: string[]
}

// deno-lint-ignore no-explicit-any
export function isGameType(obj: any): obj is GameType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.theWord === 'string' &&
    Array.isArray(obj.guesses)
  )
}

export async function setPlayer1(game: GameType) {
  const token = await Lifecycle.getStorageToken()
  return await setItem(token, Player1Key, game)
}

export async function getPlayer1(): Promise<GameType> {
  const token = await Lifecycle.getStorageToken()
  const result = await getItem(token, Player1Key)
  if ('error' in result) {
    throw 'No game for player 1'
  }
  return result.ok
}

export async function getPlayer2(): Promise<GameType> {
  const {
    system: {
      protocol,
      source,
      sourcePrefix
    }
  } = Lifecycle.getConfig()

  const {
    player2
  } = await getMatch()

  const scope = {
    [source]: 'getGame'
  }

  const token = await Lifecycle.getTokenFor(scope, player2)
  const url = `${protocol}//${player2}/tab/${sourcePrefix}/v1/getGame`
  const response = await fetch(url, {
    headers: {
      'X-Tabserver-Token': token.asSignedBase64()
    }
  })
  const json = await response.json()
  if ('error' in json) {
    throw `Error getting game from ${player2}`
  }
  return json.ok
}
