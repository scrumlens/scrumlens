<script setup lang="ts">
import type { BoardsResponse } from '~/services/api/generated'

interface Props {
  data: BoardsResponse['items'][0]
}

defineProps<Props>()
</script>

<template>
  <div
    data-dashboard-card
    class="rounded-lg border p-3 relative"
  >
    <div class="flex justify-between _text-sm text-muted-foreground">
      <div class="flex">
        <Button
          size="icon-xs"
          variant="ghost"
          @click.prevent
        >
          <Icon :name="data.isLocked ? 'lucide:lock' : 'lucide:lock-open'" />
        </Button>
        <Button
          size="icon-xs"
          variant="ghost"
          @click.prevent
        >
          <Icon :name="data.accessPolicy === 'public' ? 'lucide:globe' : 'lucide:globe-lock'" />
        </Button>
      </div>
      <div class="flex">
        <Button
          size="icon-xs"
          variant="ghost"
          @click.prevent
        >
          <Icon name="lucide:ellipsis-vertical" />
        </Button>
      </div>
    </div>
    <UiHeading
      as="h3"
      size="sm"
      class="mb-0 mt-1"
    >
      {{ data.title }}
    </UiHeading>
    <div class="grid grid-cols-3 bg-primary-foreground p-3 mt-3">
      <div class="flex items-center gap-2 text-xl">
        <Icon
          name="lucide:columns-2"
          class="text-muted-foreground"
        />
        {{ data.columns.length }}
      </div>
      <div class="flex items-center gap-2 text-xl">
        <Icon
          name="lucide:users-round"
          class="text-muted-foreground"
        />
        {{ data.participants.length }}
      </div>
      <div class="flex items-center gap-2 text-xl">
        <Icon
          name="lucide:sticky-note"
          class="text-muted-foreground"
        />
        {{ data.notes.length }}
      </div>
    </div>
  </div>
</template>
