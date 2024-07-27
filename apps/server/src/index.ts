import { styleText } from 'node:util'
import { Elysia, t } from 'elysia'
import ws from './routes/ws'

const app = new Elysia()

app.use(ws).listen(Bun.env.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    styleText('green', `\nServer is running on`),
    styleText('cyan', `http://localhost:${Bun.env.API_PORT}\n`),
  )
})
