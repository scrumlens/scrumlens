<script setup lang="ts">
import { useBoard, useWebSocket } from '@/components/board/composables'

const route = useRoute()
const { getBoardById } = useBoard()

useWebSocket(`boards/${route.params.id}`)
getBoardById(route.params.id as string)
</script>

<template>
  <Board />
</template>
