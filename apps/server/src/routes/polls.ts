import Elysia from 'elysia'
import { Types } from 'mongoose'
import { WebSocketEvent } from '../../../../shared/types'
import { Poll } from '@/models/poll'
import { User } from '@/models/user'
import { Board } from '@/models/board'
import middleware from '@/middleware'
import { pollsDTO } from '@/dto/polls'
import { getExtendedBoardData } from '@/helpers/boards'

const app = new Elysia({ prefix: '/polls' })

app
  .use(middleware)
  .use(pollsDTO)
  /**
   * Создание опроса
   */
  .post(
    '/',
    async ({ body, store, server }) => {
      const user = await User.findById(store.userId)
      const board = await Board.findById(body.boardId)

      if (!user) {
        throw new Error('User not found')
      }

      if (!board) {
        throw new Error('Board not found')
      }

      if (!board.participants.some(i => i.userId?.equals(store.userId))) {
        throw new Error('You are not a allowed to access this board')
      }

      const poll = await Poll.create({
        ...body,
        boardId: board._id,
        userId: user._id,
      })

      board.polls.push(poll._id)
      await board.save()

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))

      return {
        message: 'Poll created',
        data: poll._id,
      }
    },
    {
      body: 'pollAdd',
      requiredAuth: true,
      detail: {
        tags: ['Polls'],
      },
    },
  )
  /**
   * Голосование
   */
  .patch(
    '/:id/vote',
    async ({ body, params, store, set, server }) => {
      const poll = await Poll.findById(params.id)
      const userId = new Types.ObjectId(store.userId)

      if (!poll) {
        set.status = 400
        throw new Error('Poll not found')
      }

      const board = await Board.findById(poll.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const option = poll.options.find(i => i.id === body.optionId)

      if (!option) {
        set.status = 400
        throw new Error('Option not found')
      }

      const lastVoteOption = poll.options.find(i => i.vote.includes(userId))
      const currentOptionHasVote = option.vote.includes(userId)

      if (lastVoteOption) {
        await Poll.updateOne(
          { _id: poll._id },
          { $pull: { [`options.$[option].vote`]: userId } },
          { arrayFilters: [{ 'option._id': lastVoteOption.id }] },
        )
      }

      const update = currentOptionHasVote
        ? { $pull: { [`options.$[option].vote`]: userId } }
        : { $push: { [`options.$[option].vote`]: userId } }

      await Poll.updateOne({ _id: poll._id }, update, {
        arrayFilters: [{ 'option._id': body.optionId }],
      })

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))
    },
    {
      body: 'pollVoteOption',
      requiredAuth: true,
      detail: {
        tags: ['Polls'],
      },
    },
  )
  /**
   * Удаление опроса
   */
  .delete(
    '/:id',
    async ({ params, store, server }) => {
      const poll = await Poll.findById(params.id)
      const userId = new Types.ObjectId(store.userId)

      if (!poll) {
        throw new Error('Poll not found')
      }

      const board = await Board.findById(poll.boardId)

      if (!board) {
        throw new Error('Board not found')
      }

      const isUserAdmin = board.participants.some(
        p => p.userId?.equals(userId) && p.role === 'admin',
      )

      if (!isUserAdmin) {
        throw new Error('You are not allowed to delete this poll')
      }

      await Poll.deleteOne({ _id: params.id })

      board.polls = board.polls.filter(i => !i.equals(params.id))
      await board.save()

      const data = await getExtendedBoardData(board)

      const payload = {
        type: WebSocketEvent.BoardUpdate,
        data,
      }

      server?.publish(board.id, JSON.stringify(payload))
    },
    {
      requiredAuth: true,
      detail: {
        tags: ['Polls'],
      },
    },
  )

export default app
