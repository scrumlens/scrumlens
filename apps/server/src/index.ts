import { styleText } from 'node:util'
import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import mongoose from 'mongoose'
import { logger } from '@bogeychan/elysia-logger'
import { version } from '../package.json'
import auth from './routes/auth'
import users from './routes/users'
import boards from './routes/boards'
import notes from './routes/notes'

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
  .use(
    logger({
      level: 'error',
    }),
  )
  .use(auth)
  .use(users)
  .use(boards)
  .use(notes)
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
