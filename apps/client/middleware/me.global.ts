export default defineNuxtRouteMiddleware(async () => {
  const { isAuth } = useAuth()
  const { userRaw, getUser } = useUser()

  if (isAuth.value && !userRaw.value) {
    await getUser()
  }
})
