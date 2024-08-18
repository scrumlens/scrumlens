<script setup lang="ts">
import { BarChart2 } from 'lucide-vue-next'
import { useBoard } from '@/components/board/composables'

const { boardRaw } = useBoard()
</script>

<template>
  <div data-board-column-poll>
    <div class="flex flex-col bg-primary-foreground dark:bg-slate-900/50 rounded-md p-2 gap-2">
      <div class="mb-2 space-y-2 text-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <BarChart2 class="w-4 h-4" />
            Polls
          </div>
          <div class="text-xs tabular-nums text-muted-foreground">
            <span>
              Items: {{ boardRaw?.polls?.length || 0 }}
            </span>
          </div>
        </div>
      </div>
      <BoardPollCard
        v-for="i in boardRaw?.polls"
        :id="i._id"
        :key="i._id"
        :data="i"
      />
    </div>
  </div>
</template>
