import Elysia from 'elysia'
import { Types } from 'mongoose'
import { WebSocketEvent } from '../../../../shared/types'
import middleware from '@/middleware'
import { commentsDTO } from '@/dto/comments'
import { Note } from '@/models/note'
import { Comment } from '@/models/comment'
import { getExtendedBoardData } from '@/helpers/boards'
import { Board } from '@/models/board'

const app = new Elysia({ prefix: '/comments' })

app
  .use(middleware)
  .use(commentsDTO)
  /**
   * Создание комментария
   */
  .post(
    '/',
    async ({ body, store, server, set }) => {
      const userId = new Types.ObjectId(store.userId)
      const note = await Note.findById(body.noteId)

      if (!note) {
        set.status = 400
        throw new Error('Note not found')
      }

      const board = await Board.findById(note.boardId)

      if (!board) {
        set.status = 400
        throw new Error('Board not found')
      }

      const comment = await Comment.create({
        ...body,
        userId,
        boardId: board._id,
      })

      note.comments.push(comment._id)
      await note.save()

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))

      return { message: 'Comment created' }
    },
    {
      body: 'commentAdd',
      requiredAuth: true,
      detail: {
        tags: ['Comments'],
      },
    },
  )
  /**
   * Обновление комментария
   */
  .patch(
    '/:id',
    async ({ params, body, store, server, set }) => {
      const userId = new Types.ObjectId(store.userId)
      const comment = await Comment.findById(params.id)

      if (!comment) {
        throw new Error('Comment not found')
      }

      const board = await Board.findById(comment.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const isUserAdmin = board.participants.some(
        p => p.userId?.equals(userId) && p.role === 'admin',
      )

      if (!comment.userId.equals(userId) && !isUserAdmin) {
        set.status = 403
        throw new Error('You are not allowed to update this comment')
      }

      comment.content = body.content

      await comment.save()

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))

      return { message: 'Comment updated' }
    },
    {
      body: 'commentUpdate',
      requiredAuth: true,
      detail: {
        tags: ['Comments'],
      },
    },
  )
  /**
   * Удаление комментария
   */
  .delete(
    '/:id',
    async ({ params, store, server, set }) => {
      const userId = new Types.ObjectId(store.userId)
      const comment = await Comment.findById(params.id)

      if (!comment) {
        throw new Error('Comment not found')
      }

      const board = await Board.findById(comment.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const isUserAdmin = board.participants.some(
        p => p.userId?.equals(userId) && p.role === 'admin',
      )

      if (!comment.userId.equals(userId) && !isUserAdmin) {
        set.status = 403
        throw new Error('You are not allowed to delete this comment')
      }

      await Note.findByIdAndUpdate(comment.noteId, {
        $pull: { comments: comment._id },
      })

      await comment.deleteOne()

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))

      return { message: 'Comment deleted' }
    },
    {
      requiredAuth: true,
      detail: {
        tags: ['Comments'],
      },
    },
  )

export default app
