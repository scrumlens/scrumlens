export const WebSocketChannel = {
  Board: 'board',
} as const

export const WebSocketEvent = {
  BoardUpdate: 'board:update',
  BoardSync: 'board:sync',
} as const

export interface WebSocketEventData<T> {
  type: (typeof WebSocketEvent)[keyof typeof WebSocketEvent]
  data: T
}
