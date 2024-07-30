<script setup lang="ts">
import { useBoard } from './composables'

interface Props {
  id: string
}

const props = defineProps<Props>()

const { boardRaw } = useBoard()

const note = computed(() => boardRaw.value?.notes.find(i => i._id === props.id))
</script>

<template>
  <div
    data-board-note
    class="p-2 bg-white rounded-md border"
  >
    <div class="text-sm">
      <div class="font-bold">
        {{ boardRaw?.participants.find(i => i.userId === note?.userId)?.name }}
      </div>
      <div>
        {{ note?.content }}
      </div>
    </div>
    <div class="flex items-center gap-2 text-sm justify-between text-muted-foreground mt-3">
      <div class="flex items-center gap-1">
        <Icon name="lucide:smile-plus" />
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 tabular-nums">
          <Icon name="lucide:message-square" />
          {{ note?.comments.length || 0 }}
        </div>
        <div class="flex items-center gap-1 tabular-nums">
          <Icon name="lucide:thumbs-up" />
          {{ note?.voteUp.length || 0 }}
        </div>
        <div class="flex items-center gap-1 tabular-nums">
          <Icon name="lucide:thumbs-down" />
          {{ note?.voteDown.length || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
