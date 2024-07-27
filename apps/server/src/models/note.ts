import mongoose from 'mongoose'

const { Schema } = mongoose

const reactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    emoji: {
      type: String,
      // 🤔 😭 😂 🔥 🎉 💩
      enum: [
        'thinking-face',
        'loudly-crying-face',
        'face-with-tears-of-joy',
        'fire',
        'party-popper',
        'pile-of-poo',
      ],
    },
  },
  {
    _id: false,
  },
)

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    voteUp: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    voteDown: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reactions: [reactionSchema],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  },
)

export const Note = mongoose.model('Note', noteSchema)
