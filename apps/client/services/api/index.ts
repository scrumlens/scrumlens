import ky from 'ky'
import { Api } from './generated'

const customFetch = ky.create({
  credentials: 'include',
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          try {
            // eslint-disable-next-line ts/no-use-before-define
            await api.auth.postAuthRefresh()
            return await ky(request)
          }
          catch (err) {
            const { logout } = useAuth()
            await logout()
            console.error(err)
          }
        }

        if (response.status === 404)
          await navigateTo('/error')

        return response
      },
    ],
  },
})

export const api = new Api({
  baseUrl: '/api',
  customFetch,
})
