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
} as const

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
}
