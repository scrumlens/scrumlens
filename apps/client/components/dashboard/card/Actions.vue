<script setup lang="ts">
import { EllipsisVertical, Globe, GlobeLock, Lock, LockOpen, Pencil, Trash2 } from 'lucide-vue-next'
import type { BoardsResponse } from '~/services/api/generated'
import { useBoard } from '@/components/board/composables'

interface Props {
  data: BoardsResponse['items'][0]
}

const props = defineProps<Props>()

const { getBoards, updateBoard, deleteBoard, editId, isOpenEditDialog } = useBoard()

const isShowConfirm = ref(false)

async function togglePublic() {
  await updateBoard(props.data._id, {
    accessPolicy: props.data.accessPolicy === 'public' ? 'private' : 'public',
  })
  await getBoards()
}

async function toggleLock() {
  await updateBoard(props.data._id, {
    isLocked: !props.data.isLocked,
  })
  await getBoards()
}

async function onDeleteBoard(id: string) {
  await deleteBoard(id)
  await getBoards()
}

function onEditBoard(id: string) {
  editId.value = id
  isOpenEditDialog.value = true
}
</script>

<template>
  <div data-dashboard-card-actions>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          size="icon-sm"
          variant="ghost"
          @click.prevent
        >
          <EllipsisVertical class="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-40">
        <DropdownMenuItem @click="onEditBoard(data._id)">
          <div class="flex items-center gap-2">
            <Pencil class="w-3.5 h-3.5" />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="toggleLock">
          <div class="flex items-center gap-2">
            <Lock
              v-if="data.isLocked"
              class="w-3.5 h-3.5"
            />
            <LockOpen
              v-else
              class="w-3.5 h-3.5"
            />
            <span>{{ data.isLocked ? 'Unlock' : 'Lock' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem @click="togglePublic">
          <div class="flex items-center gap-2">
            <Globe
              v-if="data.accessPolicy === 'public'"
              class="w-3.5 h-3.5"
            />
            <GlobeLock
              v-else
              class="w-3.5 h-3.5"
            />
            <span>{{ data.accessPolicy === 'public' ? 'Make private' : 'Make public' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="isShowConfirm = true">
          <div class="flex items-center gap-2">
            <Trash2 class="w-3.5 h-3.5" />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialog v-model:open="isShowConfirm">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete board.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="onDeleteBoard(data._id)">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
