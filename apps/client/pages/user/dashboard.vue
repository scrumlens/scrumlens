<script setup lang="ts">
import { useBoard } from '@/components/board/composables'

const { userRaw } = useUser()
const { getBoards, boardsRaw, isOpenEditDialog } = useBoard()

await getBoards()

const boardsStatic = computed(() => {
  const own = getNoun(boardsRaw.value?.own, 'board', 'boards', 'boards')
  const haveAccess = getNoun(boardsRaw.value?.count, 'board', 'boards', 'boards')
  return `You own <strong>${boardsRaw.value?.own}</strong> ${own} and have access to <strong>${boardsRaw.value?.count}</strong> ${haveAccess}`
})
</script>

<template>
  <div data-user-dashboard>
    <UserVerifyAlert />
    <UiHeading class="mb-7">
      Dashboard
    </UiHeading>
    <div class="mb-7">
      <UiText v-html="boardsStatic" />
    </div>
    <div class="grid grid-cols-4 gap-4">
      <DashboardCardAdd v-if="!userRaw?.isGuest" />
      <NuxtLink
        v-for="i in boardsRaw?.items"
        :key="i._id"
        :to="`/boards/${i._id}`"
      >
        <DashboardCard :data="i" />
      </NuxtLink>
    </div>
    <Dialog v-model:open="isOpenEditDialog">
      <DialogContent class="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Retrospective Board</DialogTitle>
        </DialogHeader>
        <BoardFormEdit @close="isOpenEditDialog = false" />
      </DialogContent>
    </Dialog>
  </div>
</template>
