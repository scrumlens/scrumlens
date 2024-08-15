export default defineEventHandler((event) => {
  const { app } = useRuntimeConfig()
  const { path } = event

  if (path === '/') {
    sendRedirect(event, `${app.baseURL}dashboard`)
  }
})
