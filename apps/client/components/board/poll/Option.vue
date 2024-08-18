<script setup lang="ts">
import type { BoardResponse } from '~/services/api/generated'

const props = defineProps<Props>()

const { userRaw } = useUser()

interface Props {
  title: string
  data: BoardResponse['polls'][0]['options'][0]
  percent: number
}

const isUserVoted = computed(() => userRaw.value && props.data.vote.includes(userRaw.value._id))
</script>

<template>
  <div
    data-board-poll-option
    class="group flex items-center gap-2 text-sm cursor-pointer"
  >
    <div
      class="border rounded-md flex-grow p-1 relative"
    >
      <div
        class="z-10 relative [&.is-voted]:text-blue-500"
        :class="{ 'is-voted': isUserVoted }"
      >
        {{ data.title }}
      </div>
      <div
        class="absolute inset-0 bg-slate-100 dark:bg-slate-800 z-0"
        :style="{
          width: `${percent}%`,
        }"
      />
    </div>
    <div class="tabular-nums w-10">
      {{ percent.toFixed(0) }}%
    </div>
  </div>
</template>
