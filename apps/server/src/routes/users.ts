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
    async ({ store, body }) => {
      await User.findByIdAndUpdate(store.userId, body)

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
