import ky, { HTTPError } from 'ky'
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

export async function getErrorData(
  err: any,
): Promise<{ name: string, message: string }> {
  if (err instanceof HTTPError)
    return await err.response.json()

  return { name: 'Error', message: 'Please try again later' }
}

export const api = new Api({
  baseUrl: '/api',
  customFetch,
})
