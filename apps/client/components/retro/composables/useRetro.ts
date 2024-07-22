const retro = ref({
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
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ],
})

function addColumnItem(columnId: string, itemId: string, newIndex: number) {
  const column = retro.value.columns.find(c => c.id === columnId)
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
  const column = retro.value.columns.find(c => c.id === columnId)
  if (!column)
    return

  const itemIds = column.itemIds.slice()

  itemIds.splice(oldIndex, 1)
  itemIds.splice(newIndex, 0, itemId)
  column.itemIds = itemIds
}

function removeColumnItem(columnId: string, itemId: string) {
  const column = retro.value.columns.find(c => c.id === columnId)
  if (!column)
    return

  const itemIds = column.itemIds.filter(i => i !== itemId)

  column.itemIds = itemIds
}

export function useRetro() {
  return {
    addColumnItem,
    moveColumnItem,
    removeColumnItem,
    retro,
  }
}
