import Elysia, { t } from 'elysia'

export const usersDTO = new Elysia().model({
  userUpdate: t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
  }),
  usersMeResponse: t.Object({
    _id: t.String(),
    name: t.String(),
    email: t.String(),
    isActive: t.Boolean(),
    isGuest: t.Boolean(),
  }),
})
