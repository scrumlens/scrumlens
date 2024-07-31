import { useDebounceFn } from '@vueuse/core'
import { api } from '~/services/api'
import type { BoardResponse, BoardUpdate } from '~/services/api/generated'

const boardRaw = ref<BoardResponse>()

async function getBoardById(id: string) {
  try {
    const { data } = await api.boards.getBoardsById(id)
    boardRaw.value = data
  }
  catch (err) {
    console.error(err)
  }
}

async function updateBoard(id: string, update: BoardUpdate) {
  try {
    await api.boards.patchBoardsById(id, update)
  }
  catch (err) {
    console.error(err)
  }
}

const updateBoardDebounced = useDebounceFn(updateBoard, 100)

function addColumnItem(columnId: string, itemId: string, newIndex: number) {
  const column = boardRaw.value?.columns.find(c => c._id === columnId)
  if (!column)
    return

  const noteIds = column.noteIds.slice()

  noteIds.splice(newIndex, 0, itemId)
  column.noteIds = noteIds
}

function moveColumnItem(
  columnId: string,
  itemId: string,
  newIndex: number,
  oldIndex: number,
) {
  const column = boardRaw.value?.columns.find(c => c._id === columnId)

  if (!column)
    return

  const noteIds = column.noteIds.slice()

  noteIds.splice(oldIndex, 1)
  noteIds.splice(newIndex, 0, itemId)
  column.noteIds = noteIds
}

function removeColumnItem(columnId: string, itemId: string) {
  const column = boardRaw.value?.columns.find(c => c._id === columnId)
  if (!column)
    return

  const noteIds = column.noteIds.filter(i => i !== itemId)

  column.noteIds = noteIds
}

export function useBoard() {
  return {
    addColumnItem,
    boardRaw,
    getBoardById,
    moveColumnItem,
    removeColumnItem,
    updateBoard,
    updateBoardDebounced,
  }
}
