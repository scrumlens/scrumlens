<script setup lang="ts">
import { ArrowUpDown } from 'lucide-vue-next'
import { useSort } from '@/components/board/composables'

const { selected, options } = useSort()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        size="xs"
        variant="ghost"
        class="relative"
      >
        <div
          v-if="selected !== 'custom'"
          class="w-1.5 h-1.5 rounded-full bg-blue-500 absolute top-1 right-1"
        />
        <ArrowUpDown class="w-3.5 h-3.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel class="flex items-center justify-between gap-2 h-10">
        <div>
          Sort by
        </div>
      </DropdownMenuLabel>
      <DropdownMenuRadioGroup v-model="selected">
        <DropdownMenuRadioItem
          v-for="i in options"
          :key="i.value"
          :value="i.value"
        >
          {{ i.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
