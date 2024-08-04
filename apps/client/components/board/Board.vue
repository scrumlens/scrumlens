<script setup lang="ts">
import { repository, version } from '../../../../package.json'
import { useBoard } from './composables'

const { boardRaw } = useBoard()
</script>

<template>
  <div
    data-board
    class="h-full overflow-x-auto flex flex-col"
  >
    <div class="flex gap-3 flex-grow">
      <BoardColumn
        v-for="(i, index) in boardRaw?.columns"
        :id="i._id"
        :key="i._id"
        :index="index"
      />
    </div>
    <div class="flex items-center justify-center">
      <UiText
        size="sm"
        variant="muted"
      >
        v{{ version }} • <a
          :href="repository"
          target="_blank"
          rel="noopener noreferrer"
          class="underline"
        >GitHub</a>
      </UiText>
    </div>
  </div>
</template>
