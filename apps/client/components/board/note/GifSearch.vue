<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { useGif } from './composables/useGif'

interface Emits {
  (e: 'add', value: string): void
}

const emit = defineEmits<Emits>()

const { gifsRaw, searchDebounced, query, isLoading } = useGif()
</script>

<template>
  <div
    data-note-gif-search
    class="space-y-2"
  >
    <Input
      v-model="query"
      placeholder="Type to search GIFs"
      @input="searchDebounced"
    />
    <div class="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto relative">
      <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-primary-foreground/80"
      >
        <LoaderCircle class="animate-spin w-4 h-4" />
      </div>
      <div
        v-for="gif in gifsRaw?.results"
        :key="gif.id"
        class="bg-primary-foreground"
      >
        <img
          :src="gif.media_formats.tinygif.url"
          class="w-full h-20 object-cover"
          @click="emit('add', gif.media_formats.tinygif.url)"
        >
      </div>
    </div>
  </div>
</template>
