<script setup lang="ts">
import { MessageSquare } from 'lucide-vue-next'
import { NOTE_KEY } from '@/components/board/note/types'

const note = inject(NOTE_KEY)
</script>

<template>
  <div>
    <Button
      size="xs"
      variant="ghost"
      class="flex gap-1"
    >
      <MessageSquare class="w-3.5 h-3.5" />
      <span class="tabular-nums">
        {{ note?.data.value.comments.length || 0 }}
      </span>
    </Button>
  </div>
</template>
