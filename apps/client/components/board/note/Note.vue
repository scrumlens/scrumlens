<script setup lang="ts">
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'
import type { BoardResponse } from '~/services/api/generated'

interface Props {
  data: BoardResponse['notes'][0]
}

const props = defineProps<Props>()

const { boardRaw, deleteNote } = useBoard()

const isEdit = ref(false)
const isShowComments = ref(false)

provide(NOTE_KEY, {
  data: computed(() => props.data),
})
</script>

<template>
  <div
    data-board-note
    class="p-2 bg-white dark:bg-slate-900 rounded-md border dark:border-slate-700 relative"
  >
    <BoardNoteActions
      @edit="isEdit = true"
      @delete="deleteNote(props.data._id)"
    />
    <div class="text-sm">
      <div class="font-bold">
        {{ boardRaw?.participants.find(i => i.userId === data.userId)?.name }}
      </div>

      <BoardNoteCreateOrUpdate
        v-if="isEdit"
        :note-id="data._id"
        :edit="true"
        :text="data.content"
        :focus-delay="170"
        class="mt-3"
        @close="isEdit = false"
      />
      <div
        v-else
        class="whitespace-pre-wrap"
      >
        {{ data.content }}
        <img
          v-if="data.gif"
          class="mt-2 rounded-md"
          :src="data.gif"
        >
      </div>
    </div>
    <div
      data-board-note-actions
      class="flex gap-2 text-sm justify-between text-muted-foreground mt-3"
    >
      <BoardNoteEmoji />
      <div class="flex items-baseline">
        <BoardNoteCommentsButton @click="isShowComments = !isShowComments" />
        <BoardNoteVote />
      </div>
    </div>
    <BoardNoteComments v-if="isShowComments" />
  </div>
</template>
