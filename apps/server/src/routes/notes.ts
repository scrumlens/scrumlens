import Elysia from 'elysia'
import { Types } from 'mongoose'
import middleware from '@/middleware'
import { notesDTO } from '@/dto/notes'
import { Note } from '@/models/note'
import { Board } from '@/models/board'
import { WebSocketChannel, WebSocketEvent } from '@/types'
import { formatWebSocketMessage } from '@/utils'
import { getExtendedBoardData } from '@/helpers/boards'

const app = new Elysia({ prefix: '/notes' })

app
  .use(middleware)
  .use(notesDTO)
  /**
   * Создание заметки
   */
  .post(
    '/',
    async ({ body, store, server, set }) => {
      const columnIndex = Number(body.columnIndex)

      const note = await Note.create({
        ...body,
        userId: store.userId,
      })

      const board = await Board.findById(body.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const columns = JSON.parse(JSON.stringify(board.columns)) as any

      if (columnIndex > columns.length - 1) {
        await note.deleteOne()
        set.status = 400
        throw new Error('Column not found')
      }

      columns[columnIndex].noteIds.push(note._id)

      board.notes.push(note._id)
      board.columns = columns

      await board.save()

      const data = await getExtendedBoardData(board)

      server?.publish(
        WebSocketChannel.Board,
        formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
      )

      return { message: 'Note created' }
    },
    {
      body: 'noteAdd',
      requiredAuth: true,
      detail: {
        tags: ['Notes'],
      },
    },
  )
  /**
   * Обновление заметки
   */
  .patch(
    '/:id',
    async ({ params, body, store, server }) => {
      const userId = new Types.ObjectId(store.userId)
      const note = await Note.findById(params.id)

      if (!note) {
        throw new Error('Note not found')
      }

      if (body.voteUp) {
        if (note.voteUp.includes(userId)) {
          note.voteUp = note.voteUp.filter(id => !id.equals(userId))
        }
        else {
          note.voteUp.push(userId)
        }
      }
      else if (body.voteDown) {
        if (note.voteDown.includes(userId)) {
          note.voteDown = note.voteDown.filter(id => !id.equals(userId))
        }
        else {
          note.voteDown.push(userId)
        }
      }

      if (body.reactions) {
        const indexOfReaction = note.reactions.findIndex(
          r => r.userId.equals(userId) && r.emoji === body.reactions,
        )
        if (indexOfReaction === -1) {
          note.reactions.push({
            userId,
            emoji: body.reactions,
          })
        }
        else {
          note.reactions.splice(indexOfReaction, 1)
        }
      }

      await note.save()

      const board = await Board.findById(note.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const data = await getExtendedBoardData(board)

      server?.publish(
        WebSocketChannel.Board,
        formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
      )

      return { message: 'Note updated' }
    },
    {
      body: 'noteUpdate',
      requiredAuth: true,
      detail: {
        tags: ['Notes'],
      },
    },
  )
  /**
   * Удаление заметки
   */
  .delete(
    '/:id',
    async ({ params, store, server, set }) => {
      const userId = new Types.ObjectId(store.userId)
      const note = await Note.findById(params.id)

      if (!note) {
        throw new Error('Note not found')
      }

      const board = await Board.findById(note.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const isUserAdmin = board.participants.some(
        p => p.userId?.equals(userId) && p.role === 'admin',
      )

      if (!note.userId.equals(userId) && !isUserAdmin) {
        set.status = 403
        throw new Error('You are not allowed to delete this note')
      }

      board.notes = board.notes.filter(id => !id.equals(note._id))
      board.columns.forEach((column) => {
        column.noteIds = column.noteIds.filter(id => !id.equals(note._id))
      })

      await note.deleteOne()
      await board.save()

      const data = await getExtendedBoardData(board)

      server?.publish(
        WebSocketChannel.Board,
        formatWebSocketMessage(WebSocketEvent.BoardUpdate, data),
      )

      return { message: 'Note deleted' }
    },
    {
      requiredAuth: true,
      detail: {
        tags: ['Notes'],
      },
    },
  )

export default app
