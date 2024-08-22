<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import type { NuxtError } from '#app'
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'

const props = defineProps({
  error: Object as () => NuxtError,
})

const onGoToHome = () => clearError({ redirect: '/' })

const errorMessage: Record<number, string> = {
  404: 'Page not found',
  500: ' Internal server error',
} as const

const text = computed(() => errorMessage[props.error?.statusCode || 404])
</script>

<template>
  <div class="flex flex-col align-center justify-center text-center h-screen">
    <UiHeading class="text-4xl mb-0">
      {{ error?.statusCode }}
    </UiHeading>
    <UiText>
      {{ text }}
    </UiText>
    <div class="flex justify-center mt-1">
      <Button
        variant="secondary"
        class="flex items-center gap-1"
        @click="onGoToHome"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Back to Home
      </Button>
    </div>
  </div>
</template>
