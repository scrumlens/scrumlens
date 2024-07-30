import Elysia from 'elysia'
import { nanoid } from 'nanoid'
import { authDTO } from '@/dto/auth'
import { User } from '@/models/user'
import {
  checkPassword,
  generateAccessTokens,
  generateGuestEmail,
  verifyToken,
} from '@/utils'
import { COOKIE } from '@/types'

const app = new Elysia({ prefix: '/auth' })

app
  .use(authDTO)
  /**
   * Регистрация
   */
  .post(
    '/signup',
    async ({ body, set }) => {
      body.email = body.email.toLowerCase()

      try {
        const user = new User(body)
        await user.save()

        // TODO отправка письма с ссылкой для активации аккаунта
      }
      catch (err) {
        console.error(err)
        set.status = 400
      }
    },
    {
      body: 'signup',
      detail: {
        tags: ['Auth'],
      },
    },
  )
  /**
   * Регистрация гостя
   */
  .post(
    '/signup-guest',
    async ({ body, set, cookie }) => {
      try {
        const user = new User(body)

        user.password = nanoid(12)
        user.email = generateGuestEmail()
        user.isActive = true
        user.isGuest = true

        await user.save()

        const { accessToken, refreshToken } = generateAccessTokens(user.id)

        cookie[COOKIE.accessToken].set({
          value: accessToken,
          httpOnly: true,
        })

        cookie[COOKIE.refreshToken].set({
          value: refreshToken,
          httpOnly: true,
        })
      }
      catch (err) {
        console.error(err)
        set.status = 400
      }
    },
    {
      body: 'signupGuest',
      detail: {
        tags: ['Auth'],
      },
    },
  )
  /**
   * Авторизация
   */
  .post(
    '/signin',
    async ({ body, set, cookie }) => {
      const user = await User.findOne({
        email: {
          $regex: new RegExp(body.email, 'i'),
        },
      })

      if (!user) {
        set.status = 400
        return { message: 'Invalid login or password' }
      }

      const isValidPassword = checkPassword(
        body.password,
        user.password,
        user.salt!,
      )

      if (!isValidPassword) {
        set.status = 400
        return { message: 'Invalid login or password' }
      }

      if (!user.isActive) {
        set.status = 400
        return { message: 'Account is not active' }
      }

      const { accessToken, refreshToken } = generateAccessTokens(user.id)

      cookie[COOKIE.accessToken].set({
        value: accessToken,
        httpOnly: true,
      })

      cookie[COOKIE.refreshToken].set({
        value: refreshToken,
        httpOnly: true,
      })
    },
    {
      body: 'signin',
      detail: {
        tags: ['Auth'],
      },
    },
  )
  /**
   * Выход
   */
  .post(
    '/logout',
    async ({ cookie }) => {
      cookie[COOKIE.accessToken].set({
        value: '',
        httpOnly: true,
      })
      cookie[COOKIE.refreshToken].set({
        value: '',
        httpOnly: true,
      })
    },
    {
      detail: {
        tags: ['Auth'],
      },
    },
  )
  /**
   * Обновление токена
   */
  .post(
    '/refresh',
    async ({ cookie, set }) => {
      try {
        const decoded = verifyToken(cookie[COOKIE.refreshToken]?.value || '')
        const { accessToken, refreshToken } = generateAccessTokens(
          decoded.userId,
        )

        cookie[COOKIE.accessToken].set({
          value: accessToken,
          httpOnly: true,
        })

        cookie[COOKIE.refreshToken].set({
          value: refreshToken,
          httpOnly: true,
        })
      }
      catch (err) {
        cookie[COOKIE.accessToken].set({
          value: '',
          httpOnly: true,
        })
        cookie[COOKIE.refreshToken].set({
          value: '',
          httpOnly: true,
        })

        console.error(err)
        set.status = 400
        return { message: 'Invalid token' }
      }
    },
    {
      detail: {
        tags: ['Auth'],
      },
    },
  )
  /**
   * Верификация токена
   */
  .post(
    '/verify',
    async ({ body, set }) => {
      try {
        const decoded = verifyToken(body.token)
        const user = await User.findById(decoded.userId)

        if (!user) {
          set.status = 400
          return { message: 'User not found' }
        }

        user.isActive = true
        await user.save()

        return { message: 'Account verified' }
      }
      catch (err) {
        console.error(err)
        set.status = 400
        return { message: 'Invalid token' }
      }
    },
    {
      body: 'verifyToken',
      detail: {
        tags: ['Auth'],
      },
    },
  )

export default app
