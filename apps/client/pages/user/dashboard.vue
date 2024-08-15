<script setup lang="ts">
import { useBoard } from '@/components/board/composables'
import type { BoardResponse } from '~/services/api/generated'

const { userRaw } = useUser()
const { getBoards, boardsRaw, isOpenEditDialog, editId } = useBoard()

await getBoards()

const editBoard = computed(() => boardsRaw.value?.items.find(i => i._id === editId.value) as unknown as BoardResponse)

const boardsStatic = computed(() => {
  const own = getNoun(boardsRaw.value?.own, 'board', 'boards', 'boards')
  const haveAccess = getNoun(boardsRaw.value?.count, 'board', 'boards', 'boards')
  return `You own <strong>${boardsRaw.value?.own}</strong> ${own} and have access to <strong>${boardsRaw.value?.count}</strong> ${haveAccess}`
})
</script>

<template>
  <div data-user-dashboard>
    <UserVerifyAlert />
    <UserGuestAlert v-if="userRaw?.isGuest" />
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
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <BoardFormEdit
          v-if="editBoard"
          :data="editBoard"
          @close="isOpenEditDialog = false"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>
