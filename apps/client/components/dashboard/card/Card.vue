<script setup lang="ts">
import { format } from 'date-fns'
import type { BoardsResponse } from '~/services/api/generated'

interface Props {
  data: BoardsResponse['items'][0]
}

const props = defineProps<Props>()

const { userRaw } = useUser()

const isUserOwner = computed(() => userRaw.value?._id === props.data.userId)
</script>

<template>
  <div
    data-dashboard-card
    class="rounded-lg border p-3 relative hover:border-primary cursor-pointer transition-all"
  >
    <DashboardCardActions
      v-if="isUserOwner"
      :data="data"
      class="absolute top-2 right-2"
    />
    <UiHeading
      as="h3"
      size="sm"
      class="mb-0 mt-1"
    >
      {{ data.title }}
    </UiHeading>

    <div class="flex items-center gap-2 mt-3">
      <Icon
        class="text-muted-foreground"
        :name="data.isLocked ? 'lucide:lock' : 'lucide:lock-open'"
      />
      <UiText size="sm">
        {{ data.isLocked ? 'Locked' : 'Unlocked' }}
      </UiText>
      <Icon
        class="text-muted-foreground"
        :name="data.accessPolicy === 'public' ? 'lucide:globe' : 'lucide:globe-lock'"
      />
      <UiText size="sm">
        {{ data.accessPolicy === 'public' ? 'Public' : 'Private' }}
      </UiText>
      <Icon
        name="lucide:calendar-days"
        class="text-muted-foreground"
      />
      <UiText
        size="sm"
      >
        {{ format(data.createdAt, 'dd.MM.yyyy') }}
      </UiText>
    </div>
    <div class="grid grid-cols-3 gap-3 bg-primary-foreground p-3 mt-3 text-xl">
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:columns-2"
          class="text-muted-foreground"
        />
        {{ data.columns.length }}
      </div>
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:users-round"
          class="text-muted-foreground"
        />
        {{ data.participants.length }}
      </div>
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:sticky-note"
          class="text-muted-foreground"
        />
        {{ data.notes.length }}
      </div>
    </div>
  </div>
</template>
