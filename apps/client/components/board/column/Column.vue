<script setup lang="ts">
import Draggable from 'vuedraggable'
import { Plus } from 'lucide-vue-next'
import { useBoard } from '@/components/board/composables'

interface Props {
  id: string
  index: number
}

const props = defineProps<Props>()

const {
  addColumnItem,
  moveColumnItem,
  removeColumnItem,
  boardRaw,
  updateBoardDebounced,
  isAdmin,
} = useBoard()
const { userRaw } = useUser()

const isShowForm = ref(false)

const column = computed(() => boardRaw.value?.columns.find(i => i._id === props.id))

const notes = computed(() => column.value?.noteIds?.map(i => boardRaw.value?.notes.find(item => item._id === i)))

// TODO добавить типы для event
function onChange(event: any) {
  if (event.added) {
    addColumnItem(props.id, event.added.element._id, event.added.newIndex)
  }

  if (event.moved) {
    moveColumnItem(props.id, event.moved.element._id, event.moved.newIndex, event.moved.oldIndex)
  }

  if (event.removed) {
    removeColumnItem(props.id, event.removed.element._id)
  }

  updateBoardDebounced(boardRaw.value!._id, {
    columns: boardRaw.value?.columns,
  })
}
</script>

<template>
  <div
    data-board-column
    class="min-w-96 max-w-96 flex flex-col gap-2"
  >
    <div class="bg-primary-foreground dark:bg-slate-900/50 rounded-md p-2">
      <div class="mb-2 space-y-2 text-sm">
        <div class="flex items-center justify-between">
          <div
            class="inline-flex px-2 rounded-full bg-neutral-300 dark:text-background"
            :style="{ backgroundColor: column?.color }"
          >
            {{ column?.title }}
          </div>
          <div class="text-xs tabular-nums text-muted-foreground">
            <span>
              Items: {{ notes?.length || 0 }}
            </span>
          </div>
        </div>
        <div>
          {{ column?.description }}
        </div>
      </div>
      <Draggable
        :list="notes"
        group="common"
        class="flex flex-col gap-2 min-h-10"
        item-key="_id"
        filter=".no-drag"
        @change="onChange"
      >
        <template #item="{ element }">
          <BoardNote
            :id="element._id"
            :class="{ 'no-drag': element.userId !== userRaw?._id && !isAdmin || boardRaw?.isLocked }"
            class="cursor-grab [&.no-drag]:cursor-default"
            :data="element"
          />
        </template>
      </Draggable>
      <div class="flex items-center mt-2 text-sm">
        <Button
          v-if="!isShowForm"
          size="sm"
          variant="ghost"
          class="text-muted-foreground w-full justify-start"
          @click="isShowForm = !isShowForm"
        >
          <Plus class="w-4 h-4" />
          <UiText class="text-muted-foreground">
            New
          </UiText>
        </Button>
      </div>
      <BoardNoteCreateOrUpdate
        v-if="isShowForm"
        :index="index"
        @close="isShowForm = false"
      />
    </div>
  </div>
</template>
