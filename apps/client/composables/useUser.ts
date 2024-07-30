import { api } from '~/services/api'
import type { UsersMeResponse } from '~/services/api/generated'

const userRaw = shallowRef<UsersMeResponse>()

const userAcronym = computed(() => {
  if (!userRaw.value)
    return

  const [firstName, lastName] = userRaw.value?.name.split(' ')
  const first = firstName.charAt(0).toUpperCase()
  const last = lastName?.charAt(0).toUpperCase() || ''
  return first + last
})

async function getUser() {
  try {
    const { data } = await api.users.getUsersMe()
    userRaw.value = data
  }
  catch (err) {
    console.error(err)
  }
}

export function useUser() {
  return {
    getUser,
    userAcronym,
    userRaw,
  }
}
