<script setup lang="ts">
import { api } from '~/services/api'
import type { BoardResponse } from '~/services/api/generated'
import { useBoard } from '@/components/board/composables'

interface Props {
  data: BoardResponse['polls'][0]
}

const props = defineProps<Props>()

const { isLockedForMember } = useBoard()

const allVotes = computed(() => props.data.options.reduce((acc, cur) => acc + cur.vote.length, 0))

const totalVotesText = computed(() => {
  return `${allVotes.value} ${getNoun(allVotes.value, 'vote', 'votes', 'votes')}`
})

function percentByOption(option: BoardResponse['polls'][0]['options'][0]) {
  return (option.vote.length / allVotes.value) * 100 || 0
}

async function vote(optionId: string) {
  if (isLockedForMember.value) {
    return
  }
  try {
    api.polls.patchPollsByIdVote(props.data._id, { optionId })
  }
  catch (err) {
    console.error(err)
  }
}

async function onDelete() {
  try {
    await api.polls.deletePollsById(props.data._id)
  }
  catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="p-2 bg-white dark:bg-slate-900 rounded-md border dark:border-slate-700 min-w-96 max-w-96">
    <div class="flex items-center justify-between text-sm mb-2">
      <div class="font-bold">
        {{ data.title }}
      </div>
      <div class="flex items-center gap-2">
        <div class="text-muted-foreground text-xs">
          {{ totalVotesText }}
        </div>
        <BoardPollActions @delete="onDelete" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <BoardPollOption
        v-for="i in data.options"
        :key="i._id"
        :data="i"
        :title="i.title"
        :percent="percentByOption(i)"
        @click="vote(i._id)"
      />
    </div>
  </div>
</template>
