<script setup lang="ts">
import { useBoard, useWebSocket } from '@/components/board/composables'

const route = useRoute()
const { getBoardById, connectedUserIds } = useBoard()

const ws = useWebSocket(`boards/${route.params.id}`)
await getBoardById(route.params.id as string)

onBeforeRouteLeave(async () => {
  ws.close()
  connectedUserIds.value = []
})
</script>

<template>
  <Board />
</template>
