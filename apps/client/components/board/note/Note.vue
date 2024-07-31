<script setup lang="ts">
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'
import type { BoardResponse } from '~/services/api/generated'

interface Props {
  data: BoardResponse['notes'][0]
}

const props = defineProps<Props>()

const { boardRaw } = useBoard()

provide(NOTE_KEY, {
  data: computed(() => props.data),
})
</script>

<template>
  <div
    data-board-note
    class="p-2 bg-white dark:bg-slate-900 rounded-md border dark:border-slate-700"
  >
    <div class="text-sm">
      <div class="font-bold">
        {{ boardRaw?.participants.find(i => i.userId === data.userId)?.name }}
      </div>
      <div>
        {{ data.content }}
      </div>
    </div>
    <div
      data-board-note-actions
      class="flex _items-center gap-2 text-sm justify-between text-muted-foreground mt-3"
    >
      <BoardNoteEmoji />
      <BoardNoteVote />
    </div>
  </div>
</template>
