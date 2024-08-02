<script setup lang="ts">
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
          <Icon name="lucide:ellipsis-vertical" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-40">
        <DropdownMenuItem @click="onEditBoard(data._id)">
          <div class="flex items-center gap-2">
            <Icon name="lucide:pencil" />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="toggleLock">
          <div class="flex items-center gap-2">
            <Icon :name="data.isLocked ? 'lucide:lock' : 'lucide:lock-open'" />
            <span>{{ data.isLocked ? 'Unlock' : 'Lock' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem @click="togglePublic">
          <div class="flex items-center gap-2">
            <Icon :name="data.accessPolicy === 'public' ? 'lucide:globe' : 'lucide:globe-lock'" />
            <span>{{ data.accessPolicy === 'public' ? 'Make private' : 'Make public' }}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="isShowConfirm = true">
          <div class="flex items-center gap-2">
            <Icon name="lucide:trash-2" />
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
