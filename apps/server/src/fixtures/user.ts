/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import mongoose from 'mongoose'

import { User } from '@/models/user'

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
  await Promise.all(
    users.map(async (user) => {
      const newUser = new User(user)
      await newUser.save()
    }),
  )
  console.log('Users created')
  process.exit(0)
}

seed()
