<script setup lang="ts">
import { Lock, LockOpen, Pencil } from 'lucide-vue-next'
import { useBoard } from '@/components/board/composables'
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'

const { boardRaw, isAdmin, connectedUsers } = useBoard()

const isOpenEditDialog = ref(false)
</script>

<template>
  <div
    data-header
    class="flex items-center justify-between h-14 px-4 border-b shrink-0 fixed top-0 w-full z-10 backdrop-blur bg-white/70 dark:bg-slate-950/70"
  >
    <div class="flex items-center gap-2">
      <LogoSvg
        class="h-7"
        :font-controlled="false"
      />
      <div
        v-if="boardRaw && $route.name === 'boards-id'"
        class="flex items-center gap-3 text-sm"
      >
        <span class="relative -top-[1px]">/</span>
        <span>
          {{ boardRaw?.title }}
        </span>
        <Lock
          v-if="boardRaw.isLocked"
          class="w-3.5 h-3.5 text-muted-foreground"
        />
        <LockOpen
          v-else
          class="w-3.5 h-3.5 text-muted-foreground"
        />
        <Button
          v-if="isAdmin"
          size="xs"
          variant="ghost"
          @click="isOpenEditDialog = true"
        >
          <Pencil class="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
    <div class="flex items-center gap-6">
      <HeaderConnectedUsers />
      <Separator
        v-if="connectedUsers && connectedUsers.length > 0"
        orientation="vertical"
        class="h-5"
      />
      <HeaderColorMode />
      <HeaderUser />
    </div>
  </div>
  <Dialog
    v-if="isAdmin"
    v-model:open="isOpenEditDialog"
  >
    <DialogContent class="max-w-[700px]">
      <DialogHeader>
        <DialogTitle>Edit Board</DialogTitle>
      </DialogHeader>
      <BoardFormEdit
        v-if="boardRaw"
        :data="boardRaw"
        @close="isOpenEditDialog = false"
      />
    </DialogContent>
  </Dialog>
</template>
