<script setup lang="ts">
import { Lock, LockOpen } from 'lucide-vue-next'
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
        <Lock
          v-if="boardRaw.isLocked"
          class="w-3.5 h-3.5"
        />
        <LockOpen
          v-else
          class="w-3.5 h-3.5"
        />
      </div>
    </div>
    <div class="flex items-center gap-6">
      <HeaderColorMode />
      <HeaderUser />
    </div>
  </div>
</template>
