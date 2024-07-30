<script setup lang="ts">
import { useBoard } from './composables'

const { boardRaw } = useBoard()
</script>

<template>
  <div
    data-board
    class="h-full overflow-x-auto"
  >
    <div class="flex gap-3 px-3">
      <BoardColumn
        v-for="i in boardRaw?.columns"
        :id="i._id"
        :key="i._id"
      />
    </div>
  </div>
</template>
