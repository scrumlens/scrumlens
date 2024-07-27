let ws: WebSocket

export function useWebsocket(id: string) {
  const {
    public: { websocketUrl },
  } = useRuntimeConfig()

  if (ws) {
    return ws
  }

  const isDev = import.meta.env.MODE === 'development'
  const wsUrl = isDev ? `${websocketUrl}/${id}` : `/ws/${id}`

  ws = new WebSocket(wsUrl)

  return ws
}
