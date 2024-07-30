import Elysia from 'elysia'
import mongoose from 'mongoose'
import { boardsDTO } from '@/dto/boards'
import { Board } from '@/models/board'
import { Note } from '@/models/note'
import { Comment } from '@/models/comment'
import { User } from '@/models/user'
import middleware from '@/middleware'
import { WebSocketChannel, WebSocketEvent } from '@/types'
import { formatWebSocketMessage } from '@/utils'
import { getExtendedBoardData } from '@/helpers/boards'

const app = new Elysia({ prefix: '/boards' })

app
  .use(middleware)
  .use(boardsDTO)
  .ws('/:id', {
    open(ws) {
      ws.subscribe(WebSocketChannel.Board)
    },
    message(ws, message) {
      ws.send(message)
    },
  })
  /**
   * Создание доски
   */
  .post(
    '/',
    async ({ body, store, set }) => {
      const user = await User.findById(store.userId)

      if (!user) {
        set.status = 400
        return { message: 'User not found' }
      }

      try {
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
      }
      catch (err) {
        console.error(err)
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

      return {
        count: boards.length,
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
        return { message: 'Board not found' }
      }

      const isUserParticipant = board.participants.some(i =>
        i.userId?.equals(store.userId),
      )

      if (board.accessPolicy === 'private' && !isUserParticipant) {
        return {
          statusCode: 403,
          error: 'You are not a participant of this board',
        }
      }

      if (board.accessPolicy === 'public' && !isUserParticipant) {
        const user = await User.findById(store.userId)

        if (!user) {
          set.status = 400
          return { message: 'User not found' }
        }

        board.participants.push({
          userId: user._id,
          role: 'member',
        })
        await board.save()

        const data = await getExtendedBoardData(board)

        server?.publish(
          WebSocketChannel.Board,
          formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
        )
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
      try {
        const board = await Board.findByIdAndUpdate(params.id, body)

        if (!board) {
          set.status = 404
          return { message: 'Board not found' }
        }

        const updatedBoard = await Board.findById(params.id)
        const data = await getExtendedBoardData(updatedBoard!)

        server?.publish(
          WebSocketChannel.Board,
          formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
        )
      }
      catch (err) {
        console.error(err)

        if (err instanceof mongoose.Error.CastError) {
          set.status = 400
          return { message: 'Invalid ID' }
        }

        set.status = 400
        return { message: 'Something wrong, try later' }
      }
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
    async ({ params, store, set }) => {
      try {
        const user = await User.findById(store.userId)

        if (!user) {
          set.status = 400
          return { message: 'User not found' }
        }

        const board = await Board.findById(params.id)

        if (!board) {
          set.status = 400
          return { message: 'Board not found' }
        }

        if (!board.userId.equals(user._id)) {
          set.status = 403
          return { message: 'You are not allowed to delete this board' }
        }

        await board.deleteOne()
        await Note.deleteMany({ boardId: params.id })
        await Comment.deleteMany({ boardId: params.id })
      }
      catch (err) {
        console.error(err)

        if (err instanceof mongoose.Error.CastError) {
          set.status = 400
          return { message: 'Invalid ID' }
        }

        set.status = 400
        return { message: 'Something wrong, try later' }
      }
    },
    {
      requiredAuth: true,
      detail: {
        tags: ['Boards'],
      },
    },
  )

export default app
