import Elysia, { t } from 'elysia'
import { sign } from 'jsonwebtoken'

export const authDTO = new Elysia().model({
  signin: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signup: t.Object({
    name: t.String({
      minLength: 3,
    }),
    email: t.String(),
    password: t.String({
      minLength: 6,
    }),
  }),
  signupGuest: t.Object({
    name: t.String({
      minLength: 3,
    }),
  }),
  verifyToken: t.Object({
    token: t.String(),
  }),
})
