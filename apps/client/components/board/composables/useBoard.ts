import { useDebounceFn } from '@vueuse/core'
import { api, getErrorData } from '~/services/api'
import type {
  BoardAdd,
  BoardResponse,
  BoardUpdate,
  BoardsResponse,
  NoteUpdate,
} from '~/services/api/generated'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'
import { TEMPLATES } from '~/db/templates'
import type { BoardTemplate } from '~/types'

const boardsRaw = ref<BoardsResponse>()
const boardRaw = ref<BoardResponse>()

const { userRaw } = useUser()
const { toast } = useToast()

const editId = ref()

const isAdmin = computed(
  () =>
    boardRaw.value?.participants.find(p => p.userId === userRaw.value?._id)
      ?.role === 'admin',
)

const isCanCreateNewBoard = computed(() => userRaw.value?.isActive)

const isOpenEditDialog = ref(false)

async function getBoards() {
  try {
    const { data } = await api.boards.getBoards()
    boardsRaw.value = data
  }
  catch (err) {
    console.error(err)
  }
}

async function getBoardById(id: string) {
  try {
    const { data } = await api.boards.getBoardsById(id)
    boardRaw.value = data
  }
  catch (err) {
    console.error(err)
  }
}

async function addBoard(board: BoardAdd & { template: BoardTemplate }) {
  const { title, accessPolicy, template } = board

  if (!isCanCreateNewBoard.value)
    return

  try {
    await api.boards.postBoards({
      title,
      accessPolicy,
      columns: TEMPLATES[template],
    })
  }
  catch (err) {
    const data = await getErrorData(err)
    console.error(err)
    toast({
      title: 'Something went wrong',
      description: data.message,
      variant: 'destructive',
    })
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

async function deleteBoard(id: string) {
  try {
    await api.boards.deleteBoardsById(id)
  }
  catch (err) {
    const data = await getErrorData(err)
    console.error(err)
    toast({
      title: 'Something went wrong',
      description: data.message,
      variant: 'destructive',
    })
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
    const data = await getErrorData(err)
    console.error(err)
    toast({
      title: 'Something went wrong',
      description: data.message,
      variant: 'destructive',
    })
  }
}

async function deleteNote(noteId: string) {
  try {
    api.notes.deleteNotesById(noteId)
  }
  catch (err) {
    const data = await getErrorData(err)
    console.error(err)
    toast({
      title: 'Something went wrong',
      description: data.message,
      variant: 'destructive',
    })
  }
}

export function useBoard() {
  return {
    addBoard,
    addColumnItem,
    addNote,
    boardRaw,
    boardsRaw,
    deleteBoard,
    deleteNote,
    editId,
    getBoardById,
    getBoards,
    isAdmin,
    isCanCreateNewBoard,
    isOpenEditDialog,
    moveColumnItem,
    removeColumnItem,
    updateBoard,
    updateBoardDebounced,
    updateNote,
  }
}
