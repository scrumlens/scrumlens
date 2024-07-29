import Elysia from 'elysia'
import mongoose from 'mongoose'
import { boardsDTO } from '@/dto/boards'
import { Board } from '@/models/board'
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

      const data = await getExtendedBoardData(board)

      if (board.accessPolicy === 'public' && !isUserParticipant) {
        board.participants.push({
          userId: store.userId,
          role: 'member',
        })
        board.save()

        server?.publish(
          WebSocketChannel.Board,
          formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
        )
      }

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

export default app
