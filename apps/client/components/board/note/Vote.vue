<script setup lang="ts">
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'

const note = inject(NOTE_KEY)

const { upVote, downVote } = useBoard()
const { userRaw } = useUser()
</script>

<template>
  <div class="flex _items-center items-baseline">
    <Button
      size="xs"
      variant="ghost"
      class="flex gap-1"
    >
      <Icon name="lucide:message-square" />
      <span class="tabular-nums">
        {{ note?.data.value.comments.length || 0 }}
      </span>
    </Button>
    <Button
      size="xs"
      variant="ghost"
      class="flex gap-1"
      @click="upVote(note?.data.value._id!)"
    >
      <Icon
        name="lucide:thumbs-up"
        :class="{ 'text-primary': note?.data.value.voteUp.includes(userRaw?._id || '') }"
      />
      <span class="tabular-nums">
        {{ note?.data.value.voteUp.length || 0 }}
      </span>
    </Button>
    <Button
      size="xs"
      variant="ghost"
      @click="downVote(note?.data.value._id!)"
    >
      <div class="flex items-center gap-1">
        <Icon
          name="lucide:thumbs-down"
          :class="{ 'text-red-500': note?.data.value.voteDown.includes(userRaw?._id || '') }"
        />
        <span class="tabular-nums">
          {{ note?.data.value.voteDown.length || 0 }}
        </span>
      </div>
    </Button>
  </div>
</template>
