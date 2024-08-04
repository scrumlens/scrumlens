<script setup lang="ts">
import { repository, version } from '../../../package.json'
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'

definePageMeta({
  layout: 'blank',
})

const year = new Date().getFullYear()

const { isAuth } = useAuth()
const router = useRouter()

if (isAuth.value) {
  router.push('/')
}
</script>

<template>
  <div
    data-login
    class="grid grid-cols-2 h-full"
  >
    <div class="flex-grow flex-shrink-0 flex items-center justify-center dark:bg-slate-950">
      <div class="flex flex-col items-center">
        <LogoSvg
          class="h-9"
          :font-controlled="false"
        />
        <UiHeading
          size="md"
          class="mb-1"
        >
          Agile Retrospective Tool
        </UiHeading>
        <UiText>
          Analyze work patterns, identify trends, and grow together
        </UiText>
        <UiText class="text-muted-foreground text-xs text-center">
          © {{ year }} • Anton Reshetov <br> v{{ version }} • <a
            :href="repository"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >GitHub</a>
        </UiText>
      </div>
    </div>
    <div class="flex-grow flex-shrink-0 flex items-center justify-center bg-primary-foreground dark:bg-primary-foreground">
      <div class="w-[350px]">
        <LoginSignUp v-if="$route.query.type === 'signup'" />
        <LoginSignUpGuest v-else-if="$route.query.type === 'signup-as-guest'" />
        <LoginSignIn v-else />
      </div>
    </div>
  </div>
</template>
