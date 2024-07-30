import Elysia, { t } from 'elysia'
import { commonQuery } from './query'
import { noteItem } from './note'
import { commentItem } from './comments'

export const boardItem = t.Object({
  _id: t.String(),
  title: t.String(),
  userId: t.String(),
  participants: t.Array(
    t.Object({
      role: t.Enum({
        admin: 'admin',
        member: 'member',
      }),
      userId: t.String(),
    }),
  ),
  notes: t.Array(t.String()),
  columns: t.Array(
    t.Object({
      _id: t.String(),
      title: t.String(),
      description: t.String(),
      color: t.String(),
      noteIds: t.Array(t.String()),
    }),
  ),
  accessPolicy: t.Enum({
    public: 'public',
    private: 'private',
  }),
  isLocked: t.Boolean(),
  createdAt: t.String(),
  updatedAt: t.String(),
})

export const boardItemExtended = t.Object({
  ...boardItem.properties,
  notes: t.Array(noteItem),
  participants: t.Array(
    t.Object({
      role: t.Enum({
        admin: 'admin',
        member: 'member',
      }),
      userId: t.String(),
      name: t.String(),
    }),
  ),
  comments: t.Array(commentItem),
})

export const boardsDTO = new Elysia().model({
  boardAdd: t.Object({
    title: t.String(),
    columns: t.Optional(
      t.Array(
        t.Object({
          title: t.String(),
          description: t.Optional(t.String()),
          color: t.Optional(t.String()),
          noteIds: t.Optional(t.Array(t.String())),
        }),
      ),
    ),
    accessPolicy: t.Enum({
      public: 'public',
      private: 'private',
    }),
  }),
  boardUpdate: t.Object({
    title: t.Optional(t.String()),
    notes: t.Optional(t.Array(t.String())),
    columns: t.Optional(
      t.Array(
        t.Object({
          title: t.String(),
          description: t.Optional(t.String()),
          color: t.Optional(t.String()),
          noteIds: t.Optional(t.Array(t.String())),
        }),
      ),
    ),
    participants: t.Optional(
      t.Array(
        t.Object({
          userId: t.String(),
          role: t.Enum({
            admin: 'admin',
            member: 'member',
          }),
        }),
      ),
    ),
    accessPolicy: t.Optional(
      t.Enum({
        public: 'public',
        private: 'private',
      }),
    ),
    isLocked: t.Optional(t.Boolean()),
  }),
  boardResponse: boardItemExtended,
  boardsResponse: t.Object({
    count: t.Number(),
    items: t.Array(boardItem),
  }),
  boardsQuery: commonQuery,
})
