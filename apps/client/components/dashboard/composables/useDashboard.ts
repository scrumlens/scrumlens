import { api } from '~/services/api'
import type { BoardsResponse } from '~/services/api/generated'

const boardsRaw = ref<BoardsResponse>()

async function getBoards() {
  try {
    const { data } = await api.boards.getBoards()
    boardsRaw.value = data
  }
  catch (err) {
    console.error(err)
  }
}

export function useDashboard() {
  return {
    boardsRaw,
    getBoards,
  }
}
