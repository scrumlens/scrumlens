<script setup lang="ts">
import { api, getErrorData } from '~/services/api'
import { useToast } from '@/components/ui/shadcn/toast/use-toast'
import { RoutePath } from '@/types'

definePageMeta({
  layout: 'blank',
})

const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const isVerified = ref(false)
const isPending = ref(false)

try {
  isPending.value = true

  await api.boards.postBoardsInviteVerify({ token: route.query.token as string })

  isVerified.value = true
  isPending.value = false

  router.push(`/boards/${route.params.id}`)
}
catch (err) {
  isVerified.value = false
  isPending.value = false
  console.error(err)

  const { message } = await getErrorData(err)
  toast({
    title: 'Something went wrong',
    description: message,
    variant: 'destructive',
  })
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="border rounded-lg p-8">
      <div
        v-if="isVerified || !isPending"
        class="flex flex-col items-center"
      >
        <UiHeading class="m-0">
          Verification succeeded
        </UiHeading>
        <UiText>
          Now you can access to this board
        </UiText>
      </div>
      <div
        v-else
        class="flex flex-col items-center text-center"
      >
        <UiHeading class="m-0">
          Verification failed
        </UiHeading>
        <UiText>
          Verification link is expired or invalid.<br>You can try to resend verification link.
        </UiText>
        <NuxtLink :to="RoutePath.Profile">
          <Button>
            Go to Profile
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
