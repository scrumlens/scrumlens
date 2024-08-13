<script setup lang="ts">
import { useBoard, useWebSocket } from '@/components/board/composables'

const route = useRoute()
const { getBoardById } = useBoard()

const ws = useWebSocket(`boards/${route.params.id}`)
await getBoardById(route.params.id as string)

onBeforeRouteLeave(async () => {
  ws.close()
})
</script>

<template>
  <Board />
</template>
