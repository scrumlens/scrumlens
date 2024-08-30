type Sort = 'custom' | 'createdAt' | 'votes' | 'comments' | 'emojis'

const options: { label: string, value: Sort }[] = [
  { label: 'Custom', value: 'custom' },
  { label: 'Created at', value: 'createdAt' },
  { label: 'Votes', value: 'votes' },
  { label: 'Comments', value: 'comments' },
  { label: 'Emojis', value: 'emojis' },
]

const selected = ref<Sort>(options[0].value)

function resetSort() {
  selected.value = options[0].value
}

export function useSort() {
  return {
    options,
    resetSort,
    selected,
  }
}
