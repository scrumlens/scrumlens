import { Elysia } from 'elysia'

const app = new Elysia()

app.listen(Bun.env.API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\nServer start on port ${Bun.env.API_PORT}\n`)
})
