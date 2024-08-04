<script setup lang="ts">
import { Info } from 'lucide-vue-next'
import { api } from '~/services/api'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'

const { userRaw } = useUser()
const { toast } = useToast()

const isPending = ref(false)

async function resendLink() {
  try {
    isPending.value = true
    await api.auth.postAuthVerifyResend()
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
        :disabled="isPending"
        @click="resendLink"
      >
        Resend link to email.
      </Button>
    </AlertDescription>
  </Alert>
</template>
