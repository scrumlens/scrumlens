<script setup lang="ts">
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'

definePageMeta({
  layout: 'blank',
})

const year = new Date().getFullYear()
</script>

<template>
  <div
    data-login
    class="grid grid-cols-2 h-full"
  >
    <div class="flex-grow flex-shrink-0 flex items-center justify-center dark:bg-slate-950">
      <div class="flex flex-col items-center">
        <LogoSvg
          class="h-9 dark:invert"
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
        <UiText class="text-muted-foreground text-xs">
          © {{ year }}
        </UiText>
      </div>
    </div>
    <div class="flex-grow flex-shrink-0 flex items-center justify-center bg-primary-foreground dark:bg-primary-foreground">
      <div class="w-[350px]">
        <LoginSignUp v-if="$route.query.type === 'signup'" />
        <LoginSignIn v-else />
      </div>
    </div>
  </div>
</template>
