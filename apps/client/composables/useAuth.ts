import { useStorage } from '@vueuse/core'
import { api } from '~/services/api'
import type { Signin } from '~/services/api/generated'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'

export const authStore = useStorage('isAuth', false)

const { toast } = useToast()
const { user } = useUser()

const isAuth = computed(() => authStore.value === true)

async function login(body: Signin) {
  const { start, finish } = useLoadingIndicator()

  try {
    start()
    await api.auth.postAuthSignin(body)
    authStore.value = true
    return true
  }
  catch (err) {
    console.error(err)
    toast({
      title: 'Something went wrong.',
      description: 'Invalid login or password.',
      variant: 'destructive',
    })
    return false
  }
  finally {
    finish()
  }
}

async function logout() {
  const router = useRouter()
  const { start, finish } = useLoadingIndicator()

  try {
    start()
    await api.auth.postAuthLogout()
    authStore.value = false
    user.value = undefined
    router.push('/login')
  }
  catch (err) {
    console.error(err)
  }
  finally {
    finish()
  }
}

export function useAuth() {
  return {
    isAuth,
    login,
    logout,
  }
}
