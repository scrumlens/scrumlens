<script setup lang="ts">
import { useRetro } from './composables'

const { retro } = useRetro()
</script>

<template>
  <div
    data-retro
    class="h-full overflow-x-auto"
  >
    <div class="flex gap-3 px-3">
      <RetroColumn
        v-for="i in retro.columns"
        :id="i.id"
        :key="i.id"
      />
    </div>
  </div>
</template>
