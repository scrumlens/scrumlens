<script setup lang="ts">
import { api } from '~/services/api'

definePageMeta({
  layout: 'blank',
})

const route = useRoute()

const isVerified = ref(false)

try {
  await api.auth.postAuthVerify({ token: route.query.token as string })
  isVerified.value = true
}
catch (err) {
  console.error(err)
  isVerified.value = false
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="border rounded-lg p-8">
      <div
        v-if="isVerified"
        class="flex flex-col items-center"
      >
        <UiHeading class="m-0">
          Verification succeeded
        </UiHeading>
        <UiText>
          You can now login
        </UiText>
        <NuxtLink to="/login">
          <Button>
            Login
          </Button>
        </NuxtLink>
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
        <NuxtLink to="/user/profile">
          <Button>
            Go to Profile
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
