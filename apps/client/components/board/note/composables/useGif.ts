import { useDebounceFn } from '@vueuse/core'
import { api } from '~/services/api'
import type { GifResponse } from '~/services/api/generated'

const gifsRaw = shallowRef<GifResponse>()
const isLoading = ref(false)

export function useGif() {
  const query = ref()

  async function search() {
    try {
      isLoading.value = true

      if (!query.value)
        return

      const { data } = await api.media.getMediaGif({ q: query.value })
      gifsRaw.value = data
    }
    catch (err) {
      console.error(err)
    }
    finally {
      isLoading.value = false
    }
  }

  const searchDebounced = useDebounceFn(search, 500)

  return {
    gifsRaw: readonly(gifsRaw),
    query,
    searchDebounced,
    isLoading,
  }
}
