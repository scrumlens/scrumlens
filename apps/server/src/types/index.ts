export const COOKIE = {
  accessToken: 'scrumlens_access_token',
  refreshToken: 'scrumlens_refresh_token',
} as const

export const WebsocketChannel = {
  Board: 'board',
} as const

export const WebsocketEvent = {
  BoardUpdate: 'board:update',
  BoardSync: 'board:sync',
} as const
