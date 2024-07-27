import Elysia, { t } from 'elysia'

const app = new Elysia()

app.ws('/:id', {
  body: t.Object({
    message: t.String(),
  }),

  open(ws) {
    ws.send({
      message: 'Hello from server',
      time: Date.now(),
    })
  },

  message(ws, { message }) {
    ws.send({
      message,
      time: Date.now(),
    })
  },
})

export default app
