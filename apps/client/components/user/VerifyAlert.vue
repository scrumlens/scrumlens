<script setup lang="ts">
import { Info } from 'lucide-vue-next'
import { api } from '~/services/api'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'

const { userRaw } = useUser()
const { toast } = useToast()

let timer: any
const TIMEOUT = 30

const timerCount = ref(0)

const isPending = ref(false)
const isTimer = ref(false)

async function resendLink() {
  try {
    isPending.value = true
    await api.auth.postAuthVerifyResend()
    toast({
      title: 'Email sent',
      description: 'Please check your inbox.',
    })

    timerCount.value = 0
    isTimer.value = true

    timer = setInterval(() => {
      timerCount.value += 1

      if (timerCount.value === TIMEOUT) {
        clearInterval(timer)
        isTimer.value = false
      }
    }, 1000)
  }
  catch (err) {
    console.error(err)
    toast({
      title: 'Something went wrong',
      description: 'Failed to resend email verification link.',
      variant: 'destructive',
    })
  }
  finally {
    isPending.value = false
  }
}
</script>

<template>
  <Alert v-if="!userRaw?.isActive && !userRaw?.isGuest">
    <Info class="h-4 w-4" />
    <AlertTitle>
      Account verification
    </AlertTitle>
    <AlertDescription>
      To use all features of Scrumlens, you need to verify your account.
      <Button
        size="link"
        variant="link"
        :disabled="isPending || isTimer"
        @click="resendLink"
      >
        Resend link to email.
      </Button>
      <span
        v-if="isTimer"
        class="tabular-nums"
      >
        <br>Await {{ TIMEOUT - timerCount }}s to resend.
      </span>
    </AlertDescription>
  </Alert>
</template>
