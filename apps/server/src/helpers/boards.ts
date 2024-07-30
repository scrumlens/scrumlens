import type { InferSchemaType } from 'mongoose'
import type { boardSchema } from '@/models/board'
import { Note } from '@/models/note'
import { User } from '@/models/user'
import { Comment } from '@/models/comment'

export async function getExtendedBoardData(
  board: InferSchemaType<typeof boardSchema>,
) {
  const notes = await Note.find({
    _id: {
      $in: board?.notes,
    },
  })

  const participants = await User.find({
    _id: {
      $in: board?.participants.map(p => p.userId),
    },
  }).select('name')

  const comments = await Comment.find({
    _id: {
      $in: notes.map(i => i.comments),
    },
  })

  const data = JSON.parse(JSON.stringify(board))

  data.notes = notes

  data.participants = board.participants.map((i) => {
    const name = participants.find(p => p._id.equals(i.userId))?.name
    return {
      userId: i.userId,
      role: i.role,
      name,
    }
  })

  data.comments = comments

  return data
}
