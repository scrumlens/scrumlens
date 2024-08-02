<script setup lang="ts">
import { useBoard } from '@/components/board/composables'
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'

const { boardRaw } = useBoard()
</script>

<template>
  <div
    data-header
    class="flex items-center justify-between h-14 px-4 border-b shrink-0 sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-slate-950/70"
  >
    <div class="flex items-center gap-2">
      <LogoSvg
        class="h-7"
        :font-controlled="false"
      />
      <div
        v-if="boardRaw && $route.name === 'boards-id'"
        class="flex items-center gap-3 text-sm"
      >
        <span class="relative -top-[1px]">/</span>
        <span>
          {{ boardRaw?.title }}
        </span>
        <Icon :name="boardRaw.isLocked ? 'lucide:lock' : 'lucide:lock-open'" />
      </div>
    </div>
    <div class="flex items-center gap-6">
      <HeaderColorMode />
      <HeaderUser />
    </div>
  </div>
</template>
