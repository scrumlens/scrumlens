import mongoose from 'mongoose'
import { generateSalt, hashPassword } from '@/utils'

const { Schema } = mongoose

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.salt = generateSalt()
  this.password = hashPassword(this.password, this.salt)
  next()
})

export const User = mongoose.model('User', userSchema)
