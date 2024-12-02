import { Lifecycle } from '$static/lib/ts/Lifecycle.ts'
import { setItem, getItem } from '$static/lib/js/Storage.js'

export const MatchKey = 'daedle/match'

export interface MatchType {
  status: 'oneplayer'| 'invite' | 'join' | 'twoplayer',
  player2: string
}

// deno-lint-ignore no-explicit-any
export function isMatchType(obj: any): obj is MatchType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.status === 'string' &&
    ['oneplayer', 'invite', 'join', 'twoplayer'].includes(obj.status)
  )
}

export async function setMatch(match: MatchType) {
  const token = await Lifecycle.getStorageToken()
  return await setItem(token, MatchKey, match)
}

export async function getMatch(): Promise<MatchType> {
  const token = await Lifecycle.getStorageToken()
  const result = await getItem(token, MatchKey)
  if ('error' in result) {
    throw 'No match'
  }
  return result.ok
}
