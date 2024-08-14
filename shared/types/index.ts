import type { BoardResponse } from '../../apps/client/services/api/generated'

export const Cookie = {
  AccessToken: 'scrumlens_access_token',
  RefreshToken: 'scrumlens_refresh_token',
} as const

export const WebSocketEvent = {
  BoardDelete: 'board:delete',
  BoardSync: 'board:sync',
  BoardUpdate: 'board:update',
  UserConnect: 'user:connect',
  UserSync: 'user:sync',
} as const

export const WebSocketCode = {
  ClosedByClient: 4001,
} as const

export interface WebSocketEventMap {
  [WebSocketEvent.BoardDelete]: string
  [WebSocketEvent.BoardSync]: string[]
  [WebSocketEvent.BoardUpdate]: BoardResponse
  [WebSocketEvent.UserConnect]: string
  [WebSocketEvent.UserSync]: string[]
}

export type WebSocketEventData = {
  [K in keyof typeof WebSocketEvent]: {
    type: (typeof WebSocketEvent)[K]
    data: WebSocketEventMap[(typeof WebSocketEvent)[K]]
  };
}[keyof typeof WebSocketEvent]
