<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useBoard } from './composables'

interface Props {
  id: string
}

const props = defineProps<Props>()

const { board, addColumnItem, moveColumnItem, removeColumnItem } = useBoard()

const column = computed(() => board.value.columns.find(i => i.id === props.id))

const columnItems = computed(() => column.value?.itemIds?.map(i => board.value.items.find(item => item.id === i)))

// TODO добавить типы для event
function onChange(event: any) {
  if (event.added) {
    addColumnItem(props.id, event.added.element.id, event.added.newIndex)
  }

  if (event.moved) {
    moveColumnItem(props.id, event.moved.element.id, event.moved.newIndex, event.moved.oldIndex)
  }

  if (event.removed) {
    removeColumnItem(props.id, event.removed.element.id)
  }
}
</script>

<template>
  <div
    data-board-column
    class="min-w-96 max-w-96 my-3 flex flex-col gap-2"
  >
    <div class="bg-primary-foreground rounded-md p-2">
      <div class="mb-2 space-y-2 text-sm">
        <div class="flex items-center justify-between">
          <div
            class="inline-flex px-2 rounded-full bg-neutral-300"
            :style="{ backgroundColor: column?.color }"
          >
            {{ column?.title }}
          </div>
          <div class="text-xs tabular-nums text-muted-foreground">
            <span>
              Items: {{ columnItems?.length || 0 }}
            </span>
          </div>
        </div>
        <div>
          {{ column?.description }}
        </div>
      </div>
      <Draggable
        :list="columnItems"
        group="common"
        class="flex flex-col gap-2 min-h-10"
        item-key="id"
        @change="onChange"
      >
        <template #item="{ element }">
          <BoardItem :id="element.id" />
        </template>
      </Draggable>
      <div class="flex items-center p-2 text-sm text-muted-foreground">
        <Icon name="lucide:plus" />
        New
      </div>
    </div>
  </div>
</template>
