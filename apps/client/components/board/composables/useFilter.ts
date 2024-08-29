import { useBoard } from './useBoard'

const { boardRaw } = useBoard()

const users = ref<{ userId: string, name: string, checked: boolean }[]>([])

const selectedUserIds = computed(() => users.value.filter(i => i.checked))

function resetFilter() {
  users.value.forEach(i => (i.checked = false))
}

watch(
  boardRaw,
  () => {
    if (!boardRaw.value)
      return

    boardRaw.value.participants.forEach((i) => {
      if (users.value.find(j => j.userId === i.userId))
        return

      users.value.push({
        userId: i.userId,
        name: i.name,
        checked: false,
      })
    })
  },
  { immediate: true },
)

export function useFilter() {
  return {
    resetFilter,
    selectedUserIds,
    users,
  }
}
