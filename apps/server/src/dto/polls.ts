import Elysia, { t } from 'elysia'

export const pollsDTO = new Elysia().model({
  pollAdd: t.Object({
    title: t.String(),
    options: t.Optional(
      t.Array(
        t.Object({
          title: t.String(),
          vote: t.Optional(t.Array(t.String())),
        }),
      ),
    ),
    boardId: t.String(),
  }),
  pollVoteOption: t.Object({
    optionId: t.String(),
  }),
})
