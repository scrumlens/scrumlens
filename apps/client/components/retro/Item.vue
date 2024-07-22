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
    class="p-2 bg-white rounded-md border"
  >
    <div>
      <div class="text-muted-foreground text-sm">
        User {{ item?.userId }}
      </div>
      <div>
        {{ item?.content }}
      </div>
    </div>
    <div class="flex items-center gap-2 text-sm justify-between text-muted-foreground mt-3">
      <div class="flex items-center gap-1">
        <Icon name="lucide:smile-plus" />
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 tabular-nums">
          <Icon name="lucide:message-square" />
          {{ item?.vote.length || 0 }}
        </div>
        <div class="flex items-center gap-1 tabular-nums">
          <Icon name="lucide:thumbs-up" />
          {{ item?.vote.length || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
