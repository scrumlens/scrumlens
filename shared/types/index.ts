import type { BoardResponse } from '../../apps/client/services/api/generated'

export const Cookie = {
  AccessToken: 'scrumlens_access_token',
  RefreshToken: 'scrumlens_refresh_token',
} as const

export const WebSocketChannel = {
  Board: 'board',
} as const

export const WebSocketEvent = {
  BoardUpdate: 'board:update',
  BoardSync: 'board:sync',
  UserSync: 'user:sync',
  UserConnect: 'user:connect',
} as const

export const WebSocketCode = {
  ClosedByClient: 4001,
} as const

export interface WebSocketEventMap {
  [WebSocketEvent.BoardUpdate]: BoardResponse
  [WebSocketEvent.BoardSync]: string[]
  [WebSocketEvent.UserConnect]: string
  [WebSocketEvent.UserSync]: string[]
}

export type WebSocketEventData = {
  [K in keyof typeof WebSocketEvent]: {
    type: (typeof WebSocketEvent)[K]
    data: WebSocketEventMap[(typeof WebSocketEvent)[K]]
  };
}[keyof typeof WebSocketEvent]
