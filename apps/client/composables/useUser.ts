import { api } from '~/services/api'
import type { UsersMeResponse } from '~/services/api/generated'

const userRaw = shallowRef<UsersMeResponse>()

const userAcronym = computed(
  () => userRaw.value && toAcronym(userRaw.value?.name),
)

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
