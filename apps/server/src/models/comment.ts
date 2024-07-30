import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema(
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
    noteId: {
      type: Schema.Types.ObjectId,
      ref: 'Note',
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Comment = mongoose.model('Comment', commentSchema)
