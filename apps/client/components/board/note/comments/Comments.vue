<script setup lang="ts">
import { NOTE_KEY } from '@/components/board/note/types'
import { useBoard } from '@/components/board/composables'

const note = inject(NOTE_KEY)

const { boardRaw } = useBoard()

const isEdit = ref(false)

const commentsByNote = computed(() => boardRaw.value?.comments.filter(i => i.noteId === note!.data.value._id))
</script>

<template>
  <div
    data-board-comments
    class="border p-2 rounded-md mx-1 mt-3 mb-1"
  >
    <template v-if="commentsByNote && commentsByNote.length">
      <BoardNoteCommentsItem
        v-for="item in commentsByNote"
        :key="item._id"
        :data="item"
        @edit="isEdit = $event"
      />
    </template>
    <div
      v-else
      class="mb-4"
    >
      <UiText variant="muted">
        No comments yet
      </UiText>
    </div>
    <BoardNoteCommentsCreateOrUpdate
      v-if="!isEdit"
      :note-id="note?.data.value._id"
    />
  </div>
</template>
