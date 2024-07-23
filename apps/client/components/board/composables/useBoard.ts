const board = ref({
  id: '1',
  title: 'Retro 1',
  columns: [
    {
      id: '1',
      title: 'Column 1',
      description: 'Description 1',
      color: '#60a5fa',
      itemIds: ['1', '2'],
    },
    {
      id: '2',
      title: 'Column 2',
      description: 'Description 2',
      color: '#fef08a',
      itemIds: ['3'],
    },
    {
      id: '3',
      title: 'Column 3',
      description: 'Description 3',
      color: '#f0abfc',
      itemIds: ['4'],
    },
  ],
  items: [
    // vote это массив userId
    { id: '1', content: 'Content 1', userId: '1', vote: [1] },
    { id: '2', content: 'Content 2', userId: '2', vote: [] },
    { id: '3', content: 'Content 3', userId: '1', vote: [] },
    { id: '4', content: 'Content 4', userId: '1', vote: [1] },
  ],
  comments: [
    { id: '1', text: 'Comment 1', userId: '1', itemId: '1' },
    { id: '2', text: 'Comment 2', userId: '2', itemId: '2' },
    { id: '3', text: 'Comment 3', userId: '1', itemId: '3' },
    { id: '4', text: 'Comment 4', userId: '1', itemId: '4' },
  ],
})

function addColumnItem(columnId: string, itemId: string, newIndex: number) {
  const column = board.value.columns.find(c => c.id === columnId)
  if (!column)
    return

  const itemIds = column.itemIds.slice()

  itemIds.splice(newIndex, 0, itemId)
  column.itemIds = itemIds
}

function moveColumnItem(
  columnId: string,
  itemId: string,
  newIndex: number,
  oldIndex: number,
) {
  const column = board.value.columns.find(c => c.id === columnId)
  if (!column)
    return

  const itemIds = column.itemIds.slice()

  itemIds.splice(oldIndex, 1)
  itemIds.splice(newIndex, 0, itemId)
  column.itemIds = itemIds
}

function removeColumnItem(columnId: string, itemId: string) {
  const column = board.value.columns.find(c => c.id === columnId)
  if (!column)
    return

  const itemIds = column.itemIds.filter(i => i !== itemId)

  column.itemIds = itemIds
}

export function useBoard() {
  return {
    addColumnItem,
    moveColumnItem,
    removeColumnItem,
    board,
  }
}
