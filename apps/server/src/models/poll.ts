import mongoose from 'mongoose'

const { Schema } = mongoose

const optionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  vote: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Poll = mongoose.model('Poll', pollSchema)
