export const COOKIE = {
  accessToken: 'scrumlens_access_token',
  refreshToken: 'scrumlens_refresh_token',
} as const

export const WebSocketChannel = {
  Board: 'board',
} as const

export const WebSocketEvent = {
  BoardUpdate: 'board:update',
  BoardSync: 'board:sync',
} as const
