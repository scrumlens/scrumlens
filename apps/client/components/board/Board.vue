<script setup lang="ts">
import JSConfetti from 'js-confetti'
import { repository, version } from '../../../../package.json'
import { useBoard } from './composables'

const { boardRaw, isLockedForMember, isMember, getBoardById } = useBoard()
const route = useRoute()
const confetti = new JSConfetti()

watch(() => boardRaw.value?.isLocked, (v) => {
  if (v) {
    setTimeout(() => {
      confetti.addConfetti()
    }, 300)
  }
})

watch(() => boardRaw.value?.accessPolicy, (v) => {
  if (v === 'private' && !isMember.value) {
    boardRaw.value = undefined
  }
  if (v === 'public' && !isMember.value) {
    getBoardById(route.params.id as string)
  }
})
</script>

<template>
  <div
    v-if="boardRaw"
    data-board
    :disabled="boardRaw?.isLocked"
    :class="{ 'is-locked': isLockedForMember }"
    class="h-full overflow-x-auto flex flex-col [&.is-locked]:opacity-50 [&.is-locked]:pointer-events-none"
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
  <div
    v-else
    class="flex flex-col items-center justify-center h-full"
  >
    <UiHeading>This is private board</UiHeading>
    <UiText>Please contact the administrator of the board to get an invite link.</UiText>
  </div>
</template>
