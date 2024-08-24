import Elysia, { t } from 'elysia'

export const commentItem = t.Object({
  _id: t.String(),
  content: t.String(),
  noteId: t.String(),
  userId: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
})

export const commentsDTO = new Elysia().model({
  commentAdd: t.Object({
    content: t.String(),
    noteId: t.String(),
  }),
  commentUpdate: t.Object({
    content: t.String(),
  }),
})
