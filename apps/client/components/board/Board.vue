<script setup lang="ts">
import { useBoard } from './composables'

const { boardRaw } = useBoard()
</script>

<template>
  <div
    data-board
    class="h-full overflow-x-auto"
  >
    <div class="flex gap-3">
      <BoardColumn
        v-for="(i, index) in boardRaw?.columns"
        :id="i._id"
        :key="i._id"
        :index="index"
      />
    </div>
  </div>
</template>
