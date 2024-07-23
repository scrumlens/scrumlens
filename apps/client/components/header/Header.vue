<script setup lang="ts">
import LogoSvg from '@/assets/svg/scrumlens-logo.svg'
</script>

<template>
  <div
    data-header
    class="flex items-center justify-between h-14 px-4 border-b shrink-0 sticky top-0 z-10 backdrop-blur bg-white/70"
  >
    <div class="flex items-center gap-2">
      <LogoSvg
        class="h-7"
        :font-controlled="false"
      />
    </div>
    <div>
      <HeaderUser />
    </div>
  </div>
</template>
