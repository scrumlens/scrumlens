<script setup lang="ts">
import { useBoard } from './composables'

const { board } = useBoard()
</script>

<template>
  <div
    data-board
    class="h-full overflow-x-auto"
  >
    <div class="flex gap-3 px-3">
      <BoardColumn
        v-for="i in board.columns"
        :id="i.id"
        :key="i.id"
      />
    </div>
  </div>
</template>
