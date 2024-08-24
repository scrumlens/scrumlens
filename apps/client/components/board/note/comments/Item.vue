<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-vue-next'
import type { BoardResponse } from '~/services/api/generated'
import { useBoard } from '@/components/board/composables'

interface Props {
  data: BoardResponse['comments'][0]
}

interface Emits {
  (e: 'edit', value: boolean): void
  (e: 'delete'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const { boardRaw, isAdmin, deleteComment } = useBoard()
const { userRaw } = useUser()

const isEdit = ref(false)
const isShowConfirm = ref(false)

const author = computed(() =>
  boardRaw.value?.participants.find(i => i.userId === props.data.userId),
)

const isUserOwner = computed(() => userRaw.value?._id === props.data.userId)

const isEdited = computed(() => props.data.updatedAt > props.data.createdAt)

function onEdit() {
  isEdit.value = true
  emit('edit', true)
}

function onCancel() {
  isEdit.value = false
  emit('edit', false)
}
</script>

<template>
  <div class="mb-4 relative">
    <div class="flex items-center gap-2">
      <Avatar
        class="cursor-pointer"
        size="xs"
      >
        <AvatarFallback>
          {{ toAcronym(author?.name || '') }}
        </AvatarFallback>
      </Avatar>
      <div>
        <UiText class="m-0">
          {{ isUserOwner ? 'You' : author?.name }}
        </UiText>
        <UiText
          size="sm"
          class="m-0"
          variant="muted"
        >
          {{ formatDistanceToNow(data.createdAt) }}
          <span v-if="isEdited">
            (edited)
          </span>
        </UiText>
      </div>
    </div>
    <div>
      <BoardNoteCommentsCreateOrUpdate
        v-if="isEdit"
        :comment-id="data._id"
        class="mt-3"
        :edit="true"
        :content="data.content"
        :focus-delay="170"
        @close="onCancel"
      />
      <UiText v-else>
        {{ data.content }}
      </UiText>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            v-if="(isUserOwner && !boardRaw?.isLocked) || isAdmin"
            size="icon-xs"
            variant="ghost"
            class="absolute top-2 right-2"
            @click.prevent
          >
            <EllipsisVertical class="w-3.5 h-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-32"
          @close-auto-focus.prevent
        >
          <DropdownMenuItem @click="onEdit">
            <div class="flex items-center gap-2">
              <Pencil class="w-3.5 h-3.5" />
              <span>Edit</span>
            </div>
          </DropdownMenuItem>
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
            <AlertDialogAction @click="deleteComment(data._id)">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
