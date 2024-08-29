<script setup lang="ts">
import { ArrowUpDown, Dot } from 'lucide-vue-next'
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
          class="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-1 right-1"
        />
        <ArrowUpDown class="w-3.5 h-3.5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        v-for="i in options"
        :key="i.value"
        as-child
        @click="selected = i.value"
      >
        <div :class="{ 'bg-slate-100 dark:bg-slate-800': selected === i.value }">
          {{ i.label }}
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
