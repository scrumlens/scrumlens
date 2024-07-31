<script setup lang="ts">
import type { Emoji } from './types'
import { NOTE_KEY } from './types'
import { useBoard } from '@/components/board/composables'

const note = inject(NOTE_KEY)

const { userRaw } = useUser()
const { addReaction } = useBoard()

const emojis: Emoji[] = [
  { name: 'thinking-face', value: '🤔' },
  { name: 'loudly-crying-face', value: '😭' },
  { name: 'face-with-tears-of-joy', value: '😂' },
  { name: 'fire', value: '🔥' },
  { name: 'party-popper', value: '🎉' },
  { name: 'pile-of-poo', value: '💩' },
]

const isOpen = ref(false)

const uniqEmojis = computed(() => new Set(note?.data.value.reactions.map(i => i.emoji)))

function onReaction(emoji: Emoji['name']) {
  if (!note?.data.value._id)
    return

  addReaction(note?.data.value._id, emoji)
  isOpen.value = false
}

function isEmojiBelongsToUser(emoji: string) {
  return note?.data.value.reactions.some(i => i.emoji === emoji && i.userId === userRaw.value?._id)
}
</script>

<template>
  <div
    data-note-emoji
    class="flex items-baseline gap-1"
  >
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <div class="flex items-center">
          <Button
            size="icon-sm"
            variant="ghost"
          >
            <Icon name="lucide:smile-plus" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-[300px] p-2">
        <div class="flex gap-2">
          <div
            v-for="emoji in emojis"
            :key="emoji.name"
          >
            <Button
              size="icon"
              variant="ghost"
              class="text-xl"
              @click="onReaction(emoji.name)"
            >
              {{ emoji.value }}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    <div class="flex flex-wrap gap-1 relative -top-[2px]">
      <div
        v-for="i in uniqEmojis"
        :key="i"
        class="border dark:border-slate-600 rounded-full px-1 py-[1px] cursor-pointer"
        :class="{ 'bg-primary-foreground border-primary dark:border-blue-500': isEmojiBelongsToUser(i!) }"
        @click="onReaction(i)"
      >
        {{ emojis.find(e => e.name === i)?.value }}
        <span class="tabular-nums">
          {{ note?.data.value.reactions.filter(r => r.emoji === i).length }}
        </span>
      </div>
    </div>
  </div>
</template>
