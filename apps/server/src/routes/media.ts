import Elysia from 'elysia'
import qs from 'qs'
import ky from 'ky'
import middleware from '@/middleware'
import { mediaDTO } from '@/dto/media'

const app = new Elysia({ prefix: '/media' })

app
  .use(middleware)
  .use(mediaDTO)
  .get(
    '/gif',
    async ({ query }) => {
      const q = qs.stringify({
        key: Bun.env.TENOR_API_KEY,
        client_key: Bun.env.TENOR_CLIENT_KEY,
        q: query.q,
        limit: 18,
        media_filter: 'gif, tinygif',
      })
      try {
        const res = await ky(`https://tenor.googleapis.com/v2/search?${q}`)
        return res.json()
      }
      catch (err) {
        console.error(err)
        throw new Error('Something went wrong')
      }
    },
    {
      query: 'gifRequest',
      response: 'gifResponse',
      requiredAuth: true,
      detail: {
        tags: ['Media'],
      },
    },
  )

export default app
