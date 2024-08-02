<script setup lang="ts">
import { useBoard } from '@/components/board/composables'

const { isCanCreateNewBoard } = useBoard()

const isPending = ref(false)

const isOpenCreateDialog = ref(false)
</script>

<template>
  <button
    data-dashboard-add-card
    :disabled="!isCanCreateNewBoard || isPending"
    class="flex items-center justify-center rounded-lg border hover:border-primary cursor-pointer bg-slate-50 dark:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-inherit"
    @click="isOpenCreateDialog = true"
  >
    <div class="flex items-center gap-2 text-muted-foreground">
      <Icon name="lucide:plus" />
      <UiText class="text-muted-foreground">
        New
      </UiText>
    </div>
  </button>
  <Dialog v-model:open="isOpenCreateDialog">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Retrospective Board</DialogTitle>
        <DialogDescription>
          Choose a template to start your retrospective
        </DialogDescription>
      </DialogHeader>
      <BoardFormCreate @close="isOpenCreateDialog = false" />
    </DialogContent>
  </Dialog>
</template>
