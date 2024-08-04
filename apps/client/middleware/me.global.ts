export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name === 'auth-verify')
    return

  const { isAuth } = useAuth()
  const { userRaw, getUser } = useUser()

  if (isAuth.value && !userRaw.value) {
    await getUser()
  }
})
