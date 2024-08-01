import { useDebounceFn } from '@vueuse/core'
import { api } from '~/services/api'
import type {
  BoardResponse,
  BoardUpdate,
  NoteUpdate,
} from '~/services/api/generated'

const boardRaw = ref<BoardResponse>()

const { userRaw } = useUser()

const isAdmin = computed(
  () =>
    boardRaw.value?.participants.find(p => p.userId === userRaw.value?._id)
      ?.role === 'admin',
)

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

async function addNote(content: string, columnIndex: number) {
  return api.notes.postNotes({
    boardId: boardRaw.value!._id,
    columnIndex: String(columnIndex),
    content,
  })
}

async function updateNote(noteId: string, update: NoteUpdate) {
  try {
    await api.notes.patchNotesById(noteId, update)
  }
  catch (err) {
    console.error(err)
  }
}

async function deleteNote(noteId: string) {
  try {
    api.notes.deleteNotesById(noteId)
  }
  catch (err) {
    console.error(err)
  }
}

export function useBoard() {
  return {
    addColumnItem,
    addNote,
    boardRaw,
    getBoardById,
    isAdmin,
    moveColumnItem,
    removeColumnItem,
    updateBoard,
    updateBoardDebounced,
    updateNote,
    deleteNote,
  }
}
