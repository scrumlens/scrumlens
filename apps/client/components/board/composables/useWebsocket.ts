/* eslint-disable no-console */
import type { WebSocketEventData } from '../../../../../shared/types'
import { useBoard } from './useBoard'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'
import { RoutePath } from '@/types'

const isDev = import.meta.env.MODE === 'development'

let ws: WebSocket
let heartbeatInterval: any
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_DELAY = 3000
const HEARTBEAT_INTERVAL = 15000

const wsUrl = ref('')
const reconnectAttempts = ref(0)

const { boardRaw, connectedUserIds } = useBoard()
const { userRaw } = useUser()
const { toast } = useToast()

function reconnect() {
  reconnectAttempts.value++

  console.log('[WebSocket]: reconnect...')

  if (reconnectAttempts.value > MAX_RECONNECT_ATTEMPTS) {
    console.log('[WebSocket]: max reconnect attempts')
    return
  }

  setTimeout(() => {
    connect()
  }, RECONNECT_DELAY)
}

function connect() {
  ws = new WebSocket(wsUrl.value)

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data) as WebSocketEventData

    if (message.type === 'board:update') {
      boardRaw.value = message.data
    }

    if (message.type === 'user:sync') {
      connectedUserIds.value = message.data
    }

    if (message.type === 'board:delete') {
      const router = useRouter()
      router.push(RoutePath.Dashboard)

      toast({
        title: 'Board deleted',
        description: 'Owner has deleted the board',
      })
    }
  }

  ws.onopen = () => {
    console.log('[WebSocket]: opened')
    reconnectAttempts.value = 0

    if (!userRaw.value)
      return

    const message: WebSocketEventData = {
      type: 'user:connect',
      data: userRaw.value._id,
    }

    ws.send(JSON.stringify(message))

    heartbeatInterval = setInterval(() => {
      const message: WebSocketEventData = {
        type: 'user:sync',
        data: [],
      }
      ws.send(JSON.stringify(message))
    }, HEARTBEAT_INTERVAL)
  }

  ws.onclose = (event) => {
    clearInterval(heartbeatInterval)
    console.log(event)
    if (event.code === 1006)
      reconnect()
  }
}

export function useWebSocket(url: string) {
  const {
    public: { websocketUrl },
  } = useRuntimeConfig()

  if (ws) {
    ws.close()
  }

  wsUrl.value = isDev ? `${websocketUrl}/${url}` : `/ws/${url}`
  connect()

  return ws
}
