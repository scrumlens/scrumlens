import Elysia from 'elysia'
import middleware from '@/middleware'
import { usersDTO } from '@/dto/users'
import { User } from '@/models/user'

const app = new Elysia({ prefix: '/users' })

app
  .use(middleware)
  .use(usersDTO)
  /**
   * Получение данных пользователя
   */
  .get(
    '/me',
    async ({ store }) => {
      const user = await User.findById(store.userId).select(
        '_id name email isActive isGuest ',
      )

      return JSON.parse(JSON.stringify(user))
    },
    {
      requiredAuth: true,
      response: 'usersMeResponse',
      detail: {
        tags: ['Users'],
      },
    },
  )
  /**
   * Обновление данных пользователя
   */
  .patch(
    '/me',
    async ({ store, body, set }) => {
      const user = await User.findById(store.userId)

      if (!user) {
        throw new Error('User not found')
      }

      if (body.name) {
        user.name = body.name
      }

      if (body.password) {
        user.password = body.password
      }

      if (body.email) {
        const isExist = await User.findOne({ email: body.email })

        if (isExist) {
          set.status = 400
          throw new Error('Email already exists')
        }

        user.email = body.email
        user.isGuest = false
      }

      await user.save()

      return { message: 'User updated' }
    },
    {
      body: 'userUpdate',
      requiredAuth: true,
      detail: {
        tags: ['Users'],
      },
    },
  )

export default app
