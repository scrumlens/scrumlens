<script setup lang="ts">
import { ListFilter, Trash2 } from 'lucide-vue-next'
import { useFilter } from '@/components/board/composables'

const { users, selectedUserIds, resetFilter, resetOptions } = useFilter()

const isOpen = ref(false)

function onReset() {
  resetFilter()
  resetOptions()
  isOpen.value = false
}

onBeforeUnmount(() => {
  onReset()
})
</script>

<template>
  <DropdownMenu
    v-model:open="isOpen"
    cl
  >
    <DropdownMenuTrigger as-child>
      <Button
        size="xs"
        variant="ghost"
        class="relative"
      >
        <div
          v-if="selectedUserIds.length"
          class="w-1.5 h-1.5 rounded-full bg-blue-500 absolute top-1 right-1"
        />
        <ListFilter class="w-3.5 h-3.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel class="flex items-center justify-between gap-2 h-10">
        <div>
          Filter by
        </div>
        <Button
          v-if="selectedUserIds.length"
          size="xs"
          variant="ghost"
          @click="onReset"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuLabel>
      <DropdownMenuGroup class="max-h-[400px] overflow-y-auto">
        <DropdownMenuCheckboxItem
          v-for="i in users"
          :key="i.userId"
          v-model:checked="i.checked"
          @select.prevent
        >
          {{ i.name }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
