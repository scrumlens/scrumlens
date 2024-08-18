<script setup lang="ts">
import { EllipsisVertical, Trash2 } from 'lucide-vue-next'
import { useBoard } from '@/components/board/composables'

interface Emits {
  (e: 'delete'): void
}
const emit = defineEmits<Emits>()

const { isAdmin } = useBoard()

const isShowConfirm = ref(false)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        v-if="isAdmin"
        size="icon-xs"
        variant="ghost"
        @click.prevent
      >
        <EllipsisVertical class="w-3.5 h-3.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-32"
      @close-auto-focus.prevent
    >
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
