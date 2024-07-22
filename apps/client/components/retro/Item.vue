<script setup lang="ts">
import { useRetro } from './composables'

interface Props {
  id: string
}

const props = defineProps<Props>()

const { retro } = useRetro()

const item = computed(() => retro.value.items.find(i => i.id === props.id))
</script>

<template>
  <div
    data-column-item
    class="flex gap-3 p-2 bg-white rounded-md border"
  >
    {{ item?.title }}
  </div>
</template>
