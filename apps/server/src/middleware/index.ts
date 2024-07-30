import Elysia from 'elysia'
import { verifyToken } from '@/utils'
import { Cookie } from '@/types'

const app = new Elysia().state('userId', '').macro(({ onBeforeHandle }) => ({
  requiredAuth(bool: boolean) {
    onBeforeHandle(({ cookie, set, store }) => {
      if (!bool)
        return

      try {
        const decoded = verifyToken(cookie[Cookie.AccessToken]?.value || '')
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
