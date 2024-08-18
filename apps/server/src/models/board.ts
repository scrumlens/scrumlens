import mongoose from 'mongoose'

const { Schema } = mongoose

const columnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  color: String,
  noteIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
})

const participantSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },
  },
  {
    _id: false,
  },
)

export const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
    participants: [participantSchema],
    columns: [columnSchema],
    polls: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
      },
    ],
    accessPolicy: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Board = mongoose.model('Board', boardSchema)
