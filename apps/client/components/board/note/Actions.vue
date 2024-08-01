<script setup lang="ts">
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'

interface Emits {
  (e: 'edit'): void
  (e: 'delete'): void
}

const emit = defineEmits<Emits>()

const { isAdmin } = useBoard()
const { userRaw } = useUser()

const note = inject(NOTE_KEY)

const isShowConfirm = ref(false)

const isUserOwner = computed(() => userRaw.value?._id === note?.data.value.userId)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        v-if="isUserOwner || isAdmin"
        size="icon-xs"
        variant="ghost"
        class="absolute top-2 right-2"
        @click.prevent
      >
        <Icon name="lucide:ellipsis-vertical" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-32"
      @close-auto-focus.prevent
    >
      <DropdownMenuItem @click="emit('edit')">
        <div class="flex items-center gap-2">
          <Icon name="lucide:pencil" />
          <span>Edit</span>
        </div>
      </DropdownMenuItem>
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
          This action cannot be undone. This will permanently delete note.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="emit('delete')">
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
