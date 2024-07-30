/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import { styleText } from 'node:util'
import mongoose from 'mongoose'
import { User } from '@/models/user'
import { Board } from '@/models/board'
import { Note } from '@/models/note'
import { Comment } from '@/models/comment'

mongoose.connect(Bun.env.MONGO_URL)

const users = [
  {
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
    isActive: true,
  },
  {
    name: 'Mike Doe',
    email: 'mike@doe.com',
    password: '123456',
    isActive: true,
  },
]

async function seed() {
  await mongoose.connection.dropDatabase()
  console.log(styleText('blue', 'Database dropped...'))

  // Создаем пользователей
  const user1 = new User(users[0])
  const user2 = new User(users[1])

  await user1.save()
  await user2.save()

  console.log(styleText('blue', 'Users created...'))

  // Создаем доску
  const board = new Board({
    title: 'Retro 1',
    userId: user1._id,
    accessPolicy: 'public',
    columns: [
      {
        title: 'Column 1',
        color: '#60a5fa',
        noteIds: [],
      },
    ],
    participants: [
      {
        role: 'admin',
        userId: user1._id,
      },
    ],
  })

  await board.save()

  board.columns.push({
    title: 'Column 2',
    color: '#fef08a',
    noteIds: [],
  })

  board.columns.push({
    title: 'Column 3',
    color: '#f0abfc',
    noteIds: [],
  })

  board.participants.push({
    role: 'member',
    userId: user2._id,
  })

  await board.save()

  // реорганизуем колонки для теста
  board.columns.push(board.columns.shift())

  await board.save()

  console.log(styleText('blue', 'Board created...'))

  // Создаем заметки
  const note1 = new Note({
    content: 'Content 1',
    userId: user1._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: user2._id,
        emoji: 'pile-of-poo',
      },
    ],
  })

  note1.reactions.push({
    userId: user1._id,
    emoji: 'thinking-face',
  })

  await note1.save()

  const note2 = new Note({
    content: 'Content 2',
    userId: user2._id,
    boardId: board._id,
    voteUp: [user1._id],
    voteDown: [user2._id],
    reactions: [
      {
        userId: user1._id,
        emoji: 'fire',
      },
    ],
  })

  await note2.save()

  board.notes.push(note1._id)
  board.notes.push(note2._id)

  const columns = board.toObject().columns
  columns[0].noteIds.push(note1._id)
  columns[1].noteIds.push(note2._id)

  board.columns = columns
  await board.save()

  console.log(styleText('blue', 'Notes created...'))

  // Создаем комментарии
  const comment1 = new Comment({
    content: 'Comment 1',
    userId: user1._id,
    noteId: note1._id,
    boardId: board._id,
  })

  note1.comments.push(comment1._id)
  await note1.save()

  await comment1.save()

  const comment2 = new Comment({
    content: 'Comment 2',
    userId: user2._id,
    noteId: note2._id,
    boardId: board._id,
  })

  note2.comments.push(comment2._id)
  await note2.save()

  await comment2.save()

  console.log(styleText('blue', 'Comments created...'))
  console.log(styleText('green', 'Seed finished'))

  process.exit(0)
}

seed()
