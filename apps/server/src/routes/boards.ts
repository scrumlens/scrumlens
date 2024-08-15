import Elysia from 'elysia'
import type { WebSocketEventData } from '../../../../shared/types'
import { WebSocketEvent } from '../../../../shared/types'
import { boardsDTO } from '@/dto/boards'
import { Board } from '@/models/board'
import { Note } from '@/models/note'
import { Comment } from '@/models/comment'
import { User } from '@/models/user'
import middleware from '@/middleware'
import { getExtendedBoardData } from '@/helpers/boards'
import { verifyToken } from '@/utils'
import { sendInviteEmail } from '@/services/email'

const app = new Elysia({ prefix: '/boards' })

const connections = new Set<{
  userId: string
  boardId: string
  wsId: string
}>()

function userSyncData(boardId: string) {
  return {
    type: 'user:sync',
    data: Array.from(connections)
      .filter(i => i.boardId === boardId)
      .map(i => i.userId),
  } as WebSocketEventData
}

app
  .use(middleware)
  .use(boardsDTO)
  .ws('/:id', {
    open(ws) {
      ws.subscribe(ws.data.params.id)
    },
    message(ws, message) {
      const m = message as WebSocketEventData

      if (m.type === 'user:connect') {
        connections.add({
          userId: m.data,
          boardId: ws.data.params.id,
          wsId: ws.id,
        })

        const payload = userSyncData(ws.data.params.id)

        ws.send(JSON.stringify(payload))
        ws.publish(ws.data.params.id, JSON.stringify(payload))
      }

      if (m.type === 'user:sync') {
        const payload = userSyncData(ws.data.params.id)

        ws.send(JSON.stringify(payload))
      }
    },
    close(ws) {
      connections.forEach((i) => {
        if (i.wsId === ws.id) {
          connections.delete(i)
        }
      })
    },
  })
  /**
   * Создание доски
   */
  .post(
    '/',
    async ({ body, store, set }) => {
      const user = await User.findById(store.userId)
      const boards = await Board.find({ userId: store.userId }).lean()

      if (!user) {
        set.status = 400
        throw new Error('User not found')
      }

      if ((user.isGuest || !user.isActive) && boards.length >= 1) {
        set.status = 403
        throw new Error('You are not allowed to create more boards')
      }

      const board = await Board.create({
        ...body,
        userId: user._id,
        participants: [
          {
            userId: user._id,
            role: 'admin',
          },
        ],
      })

      return {
        message: 'Board created',
        data: board._id,
      }
    },
    {
      body: 'boardAdd',
      requiredAuth: true,
      detail: {
        tags: ['Boards'],
      },
    },
  )
  /**
   * Отправка инвайт ссылки для доски пользователю
   */
  .post(
    '/:id/invite',
    async ({ params, body, set }) => {
      const emailList = body.email.split(',').map(i => i.trim())

      const board = await Board.findById(params.id)

      if (!board) {
        set.status = 400
        throw new Error('Board not found')
      }

      const users = await User.find({ email: { $in: emailList } })

      if (users.length === 0) {
        set.status = 400
        throw new Error('User not found')
      }

      const usersNotInBoard = users.filter(
        i => !board.participants.some(j => j.userId?.equals(i._id)),
      )

      await Promise.all(
        usersNotInBoard.map((user) => {
          return sendInviteEmail({
            email: user.email,
            userId: user.id,
            boardId: params.id,
            boardName: board.title,
          })
        }),
      )
    },
    {
      requiredAuth: true,
      body: 'boardSendInvite',
      detail: {
        tags: ['Boards'],
      },
    },
  )
  .post(
    '/invite-verify',
    async ({ body, set }) => {
      try {
        const decoded = verifyToken(body.token)

        const user = await User.findById(decoded.userId)
        const board = await Board.findById(decoded.boardId)

        if (!user) {
          set.status = 400
          throw new Error('User not found')
        }

        if (!board) {
          set.status = 400
          throw new Error('Board not found')
        }

        const isUserParticipant = board.participants.some(i =>
          i.userId?.equals(decoded.userId),
        )

        if (!isUserParticipant) {
          board.participants.push({
            userId: user._id,
            role: 'member',
          })
          await board.save()
        }
      }
      catch {
        set.status = 400
        throw new Error('Invalid token')
      }
    },
    {
      body: 'boardInviteVerify',
      detail: {
        tags: ['Boards'],
      },
    },
  )
  /**
   * Получение списка досок
   */
  .get(
    '/',
    async ({ query, store }) => {
      const limit = Number(query.limit) || 20
      const page = Number(query.page) || 1
      const sort = query.sort || 'createdAt'
      const order = query.order === 'ASC' ? 1 : -1

      const boards = await Board.find({
        participants: {
          $elemMatch: {
            userId: store.userId,
          },
        },
        title: new RegExp(query.search ?? '', 'gi'),
      })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order })
        .lean()

      const userBoards = await Board.find({ userId: store.userId }).lean()

      return {
        count: boards.length,
        own: userBoards.length,
        items: JSON.parse(JSON.stringify(boards)),
      } as any
    },
    {
      query: 'boardsQuery',
      response: 'boardsResponse',
      detail: {
        tags: ['Boards'],
      },
      requiredAuth: true,
    },
  )
  /**
   * Получение доски по id
   */
  .get(
    '/:id',
    async ({ params, store, server, set }) => {
      const board = await Board.findById(params.id)

      if (!board) {
        set.status = 404
        throw new Error('Board not found')
      }

      const isUserParticipant = board.participants.some(i =>
        i.userId?.equals(store.userId),
      )

      if (board.accessPolicy === 'private' && !isUserParticipant) {
        set.status = 403
        throw new Error('You are not a allowed to access this board')
      }

      if (board.accessPolicy === 'public' && !isUserParticipant) {
        const user = await User.findById(store.userId)

        if (!user) {
          set.status = 400
          throw new Error('User not found')
        }

        board.participants.push({
          userId: user._id,
          role: 'member',
        })
        await board.save()

        const data = await getExtendedBoardData(board)

        const payload = {
          type: WebSocketEvent.BoardUpdate,
          data,
        }

        server?.publish(params.id, JSON.stringify(payload))
      }

      const data = await getExtendedBoardData(board)

      return JSON.parse(JSON.stringify(data))
    },
    {
      response: 'boardResponse',
      requiredAuth: true,
      detail: {
        tags: ['Boards'],
      },
    },
  )
  /**
   * Обновление доски
   */
  .patch(
    '/:id',
    async ({ params, body, set, server }) => {
      const board = await Board.findByIdAndUpdate(params.id, body)

      if (!board) {
        set.status = 400
        throw new Error('Board not found')
      }

      const updatedBoard = await Board.findById(params.id)
      const data = await getExtendedBoardData(updatedBoard!)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(params.id, JSON.stringify(payload))
    },
    {
      body: 'boardUpdate',
      requiredAuth: true,
      detail: {
        tags: ['Boards'],
      },
    },
  )
  /**
   * Удаление доски
   */
  .delete(
    '/:id',
    async ({ params, store, set, server }) => {
      const user = await User.findById(store.userId)

      if (!user) {
        set.status = 400
        throw new Error('User not found')
      }

      const board = await Board.findById(params.id)

      if (!board) {
        set.status = 400
        throw new Error('Board not found')
      }

      if (!board.userId.equals(user._id)) {
        set.status = 403
        throw new Error('You are not allowed to delete this board')
      }

      await board.deleteOne()
      await Note.deleteMany({ boardId: params.id })
      await Comment.deleteMany({ boardId: params.id })

      const payload = {
        type: WebSocketEvent.BoardDelete,
        data: params.id,
      }

      server?.publish(params.id, JSON.stringify(payload))
    },
    {
      requiredAuth: true,
      detail: {
        tags: ['Boards'],
      },
    },
  )

export default app
