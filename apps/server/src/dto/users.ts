import Elysia, { t } from 'elysia'

export const usersDTO = new Elysia().model({
  userUpdate: t.Object({
    name: t.String(),
  }),
  usersMeResponse: t.Object({
    _id: t.String(),
    name: t.String(),
    email: t.String(),
    isActive: t.Boolean(),
    isGuest: t.Boolean(),
  }),
})
