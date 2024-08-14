import Elysia from 'elysia'
import { Cookie } from '../../../../shared/types'
import { verifyToken } from '@/utils'

const app = new Elysia().state('userId', '').macro(({ onBeforeHandle }) => ({
  requiredAuth(bool: boolean) {
    onBeforeHandle(({ cookie, set, store }) => {
      if (!bool)
        return

      try {
        const decoded = verifyToken(cookie[Cookie.AccessToken]?.value || '')
        store.userId = decoded.userId
      }
      catch {
        store.userId = ''
        set.status = 401
        return { message: 'Unauthorized' }
      }
    })
  },
}))

export default app
