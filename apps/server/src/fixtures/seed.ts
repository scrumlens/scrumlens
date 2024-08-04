/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import { styleText } from 'node:util'
import mongoose from 'mongoose'
import type { InferSchemaType, Types } from 'mongoose'
import type { userSchema } from '@/models/user'
import { User } from '@/models/user'
import type { boardSchema } from '@/models/board'
import { Board } from '@/models/board'
import type { noteSchema } from '@/models/note'
import { Note } from '@/models/note'

type UserDoc = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId }
type NoteDoc = InferSchemaType<typeof noteSchema> & { _id: Types.ObjectId }
type BoardDoc = InferSchemaType<typeof boardSchema> & {
  _id: Types.ObjectId
  save: any
}

mongoose.connect(Bun.env.MONGO_URL)

const userNames = ['Alex', 'Sarah', 'Mike', 'Jenna', 'Tom']

const usersData = userNames.map(name => ({
  name,
  email: `${name.toLowerCase()}@scrumlens.com`,
  password: '123456',
}))

async function seed() {
  console.log(styleText('green', 'Seed started...'))

  const users: UserDoc[] = []
  let board: BoardDoc

  await Promise.all(
    usersData.map(async (user) => {
      const _user = await User.findOne({ email: user.email })
      if (!_user) {
        const newUser = new User(user)
        await newUser.save()
        users.push(newUser)
      }
      else {
        users.push(_user)
      }
    }),
  )

  console.log(styleText('blue', 'Users...'))

  const userAlex = await User.findOne({ email: 'alex@scrumlens.com' })
  const boardAlex = await Board.findOne({ userId: userAlex!._id })

  if (!boardAlex) {
    board = new Board({
      title: 'Retro 1',
      userId: userAlex!._id,
      accessPolicy: 'public',
      columns: [
        {
          title: 'Glad',
          color: '#86efac',
          description: 'Positive experiences',
          noteIds: [],
        },
        {
          title: 'Sad',
          color: '#fed7aa',
          description: 'Negative experiences',
          noteIds: [],
        },
        {
          title: 'Mad',
          color: '#fca5a5',
          description: 'Frustrations and challenges',
          noteIds: [],
        },
      ],
      participants: [
        {
          role: 'admin',
          userId: userAlex!._id,
        },
        {
          role: 'member',
          userId: users[1]._id,
        },
        {
          role: 'member',
          userId: users[2]._id,
        },
        {
          role: 'member',
          userId: users[3]._id,
        },
        {
          role: 'member',
          userId: users[4]._id,
        },
      ],
    })
    await board.save()
  }
  else {
    const columns = boardAlex.toObject().columns

    columns[0].noteIds = []
    columns[1].noteIds = []
    columns[2].noteIds = []

    boardAlex.columns = columns
    boardAlex.notes = []

    await boardAlex.save()
    board = boardAlex
  }

  console.log(styleText('blue', 'Boards...'))

  const notes = {
    glad: [] as unknown as NoteDoc[],
    sad: [] as unknown as NoteDoc[],
    mad: [] as unknown as NoteDoc[],
  }

  // Создаем заметки
  await Note.deleteMany({ boardId: board._id })
  // MARK: Glad
  const note1 = new Note({
    content: 'Successfully implemented the drag-and-drop feature for cards',
    userId: users[0]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: users[1]._id,
        emoji: 'fire',
      },
      {
        userId: users[2]._id,
        emoji: 'party-popper',
      },
    ],
  })

  notes.glad.push(note1)
  await note1.save()

  const note2 = new Note({
    content: 'Great team collaboration during the UI redesign sprint',
    userId: users[1]._id,
    boardId: board._id,
    voteUp: [users[0]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'fire',
      },
    ],
  })

  notes.glad.push(note2)
  await note2.save()

  const note3 = new Note({
    content: 'Positive user feedback on the new voting system.',
    userId: users[2]._id,
    boardId: board._id,
    voteUp: [users[3]._id, users[4]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[3]._id,
        emoji: 'fire',
      },
    ],
  })

  notes.glad.push(note3)
  await note3.save()

  const note4 = new Note({
    content: 'Completed the mobile responsive design ahead of schedule.',
    userId: users[3]._id,
    boardId: board._id,
    voteUp: [users[4]._id, users[0]._id, users[1]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[4]._id,
        emoji: 'fire',
      },
    ],
  })

  notes.glad.push(note4)
  await note4.save()

  const note5 = new Note({
    content: 'Successfully implemented real-time collaboration feature.',
    userId: users[4]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'fire',
      },
      {
        userId: users[1]._id,
        emoji: 'fire',
      },
      {
        userId: users[2]._id,
        emoji: 'party-popper',
      },
    ],
  })

  notes.glad.push(note5)
  await note5.save()

  // MARK: Sad
  const note6 = new Note({
    content: 'Struggled with some performance issues in the real-time updates.',
    userId: users[0]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [users[1]._id],
    reactions: [],
  })

  notes.sad.push(note6)
  await note6.save()

  const note7 = new Note({
    content: 'Had to delay the export feature due to unexpected complexities.',
    userId: users[1]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [users[0]._id],
    reactions: [],
  })

  notes.sad.push(note7)
  await note7.save()

  const note8 = new Note({
    content:
      'Faced challenges integrating with the third-party analytics tool.',
    userId: users[2]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'thinking-face',
      },
    ],
  })

  notes.sad.push(note8)
  await note8.save()

  const note9 = new Note({
    content: 'User testing revealed some confusion with the new navigation.',
    userId: users[3]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [],
  })

  notes.sad.push(note9)
  await note9.save()

  const note10 = new Note({
    content: 'Difficulty in managing the growing complexity of the codebase.',
    userId: users[4]._id,
    boardId: board._id,
    voteUp: [users[0]._id, users[1]._id, users[2]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'thinking-face',
      },
      {
        userId: users[1]._id,
        emoji: 'thinking-face',
      },
      {
        userId: users[2]._id,
        emoji: 'thinking-face',
      },
    ],
  })

  notes.sad.push(note10)
  await note10.save()

  const note11 = new Note({
    content: 'User retention rates lower than expected after the last update.',
    userId: users[0]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [],
  })

  notes.sad.push(note11)
  await note11.save()

  const note12 = new Note({
    content: 'Unexpected issues with cross-browser compatibility.',
    userId: users[1]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: users[3]._id,
        emoji: 'loudly-crying-face',
      },
    ],
  })

  notes.sad.push(note12)
  await note12.save()

  const note13 = new Note({
    content: 'Struggled to meet accessibility standards in some areas.',
    userId: users[2]._id,
    boardId: board._id,
    voteUp: [users[0]._id, users[1]._id, users[2]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[3]._id,
        emoji: 'thinking-face',
      },
      {
        userId: users[4]._id,
        emoji: 'thinking-face',
      },
    ],
  })

  notes.sad.push(note13)
  await note13.save()

  // MARK: Mad
  const note14 = new Note({
    content:
      'Frequent context switching disrupted focus on core development tasks.',
    userId: users[0]._id,
    boardId: board._id,
    voteUp: [users[1]._id, users[2]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[1]._id,
        emoji: 'loudly-crying-face',
      },
      {
        userId: users[2]._id,
        emoji: 'loudly-crying-face',
      },
    ],
  })

  notes.mad.push(note14)
  await note14.save()

  const note15 = new Note({
    content:
      'Limited documentation made onboarding new team members difficult.',
    userId: users[1]._id,
    boardId: board._id,
    voteUp: [users[0]._id, users[2]._id],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'loudly-crying-face',
      },
      {
        userId: users[2]._id,
        emoji: 'loudly-crying-face',
      },
      {
        userId: users[3]._id,
        emoji: 'pile-of-poo',
      },
    ],
  })

  notes.mad.push(note15)
  await note15.save()

  const note16 = new Note({
    content:
      'Inconsistent coding standards across the project caused merge conflicts.',
    userId: users[2]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [users[0]._id, users[1]._id, users[3]._id],
    reactions: [],
  })

  notes.mad.push(note16)
  await note16.save()

  const note17 = new Note({
    content: 'Last-minute feature requests impacted our planned sprint goals.',
    userId: users[3]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [],
  })

  notes.mad.push(note17)
  await note17.save()

  const note18 = new Note({
    content:
      'Lack of clear product vision led to conflicting feature priorities.',
    userId: users[4]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [users[0]._id, users[1]._id, users[2]._id],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'thinking-face',
      },
      {
        userId: users[1]._id,
        emoji: 'thinking-face',
      },
      {
        userId: users[2]._id,
        emoji: 'pile-of-poo',
      },
      {
        userId: users[3]._id,
        emoji: 'face-with-tears-of-joy',
      },
      {
        userId: users[4]._id,
        emoji: 'face-with-tears-of-joy',
      },
    ],
  })

  notes.mad.push(note18)
  await note18.save()

  const note19 = new Note({
    content: 'Recurring technical debt slowing down new feature development.',
    userId: users[0]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [],
  })

  notes.mad.push(note19)
  await note19.save()

  const note20 = new Note({
    content: 'Insufficient testing resources causing delays in release cycles.',
    userId: users[1]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [
      {
        userId: users[0]._id,
        emoji: 'thinking-face',
      },
    ],
  })

  notes.mad.push(note20)
  await note20.save()

  const note21 = new Note({
    content: 'Communication gaps between dev team and product management.',
    userId: users[2]._id,
    boardId: board._id,
    voteUp: [],
    voteDown: [],
    reactions: [],
  })

  notes.mad.push(note21)
  await note21.save()

  board.notes.push(...notes.glad.map(i => i._id))
  board.notes.push(...notes.sad.map(i => i._id))
  board.notes.push(...notes.mad.map(i => i._id))

  // @ts-expect-error err
  const columns = board.toObject().columns

  columns[0].noteIds.push(...notes.glad.map(i => i._id))
  columns[1].noteIds.push(...notes.sad.map(i => i._id))
  columns[2].noteIds.push(...notes.mad.map(i => i._id))

  board.columns = columns
  await board.save()

  console.log(styleText('blue', 'Notes...'))
  console.log(styleText('green', 'Seed finished'))

  process.exit(0)
}

seed()
