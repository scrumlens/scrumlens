import { styleText } from 'node:util'
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import mongoose from 'mongoose'
import { version } from '../package.json'
import ws from './routes/ws'
import auth from './routes/auth'

mongoose.connect(Bun.env.MONGO_URL)

const app = new Elysia()

app
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Scrumlens API',
          version,
        },
        tags: [{ name: 'Auth', description: 'Authentication' }],
      },
    }),
  )
  .use(auth)
  .use(ws)
  .listen(Bun.env.API_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      styleText('green', `\nServer is running\n`),
      styleText('green', 'API: '),
      styleText('cyan', `http://localhost:${Bun.env.API_PORT}\n`),
      styleText('green', 'Docs:'),
      styleText('cyan', `http://localhost:${Bun.env.API_PORT}/swagger\n`),
    )
  })
