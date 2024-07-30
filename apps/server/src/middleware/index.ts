import Elysia from 'elysia'
import { verifyToken } from '@/utils'
import { COOKIE } from '@/types'

const app = new Elysia().state('userId', '').macro(({ onBeforeHandle }) => ({
  requiredAuth(bool: boolean) {
    onBeforeHandle(({ cookie, set, store }) => {
      if (!bool)
        return

      try {
        const decoded = verifyToken(cookie[COOKIE.accessToken]?.value || '')
        store.userId = decoded.userId
      }
      catch (err) {
        console.error(err)
        store.userId = ''
        return (set.status = 401)
      }
    })
  },
}))

export default app
