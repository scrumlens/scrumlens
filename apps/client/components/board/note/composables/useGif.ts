import { useDebounceFn } from '@vueuse/core'
import { api } from '~/services/api'
import type { GifResponse } from '~/services/api/generated'

const gifsRaw = shallowRef<GifResponse>()
const isLoading = ref(false)

export function useGif() {
  async function search(q: string) {
    try {
      isLoading.value = true
      const { data } = await api.media.getMediaGif({ q })
      gifsRaw.value = data
    }
    catch (err) {
      console.error(err)
    }
    finally {
      isLoading.value = false
    }
  }

  if (!gifsRaw.value) {
    search('cat')
  }

  return {
    gifsRaw: readonly(gifsRaw),
    isLoading,
    searchDebounced: useDebounceFn(search, 500),
  }
}
