<script setup lang="ts">
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'

interface Emits {
  (e: 'edit'): void
}

const emit = defineEmits<Emits>()

const { isAdmin } = useBoard()
const { userRaw } = useUser()

const note = inject(NOTE_KEY)

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
      <DropdownMenuItem>
        <div class="flex items-center gap-2">
          <Icon name="lucide:trash-2" />
          <span>Delete</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
