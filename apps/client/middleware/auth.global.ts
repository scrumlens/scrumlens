import { Cookie } from '../../../shared/types'

export default defineNuxtRouteMiddleware((to) => {
  const publicRouteNames = ['auth-verify', 'boards-id-invite']

  if (publicRouteNames.includes(to.name as string))
    return

  if (import.meta.server) {
    const token = useCookie(Cookie.AccessToken)

    if (token.value && to.name === 'login')
      return navigateTo('/')

    if (!token.value && to.name !== 'login') {
      abortNavigation()
      return navigateTo('/login')
    }
  }

  if (import.meta.client) {
    const { isAuth } = useAuth()

    if (isAuth.value && to.name === 'login')
      return navigateTo('/user/dashboard')

    if (!isAuth.value && to.name !== 'login') {
      abortNavigation()
      return navigateTo(`/login?redirect=${to.fullPath}`)
    }
  }
})
