<script setup lang="ts">
import LogoSvg from '@/assets/svg/logo.svg'
</script>

<template>
  <div
    data-header
    class="flex items-center justify-between h-14 px-4 border-b"
  >
    <div>
      <LogoSvg
        class="w-8"
        :font-controlled="false"
      />
    </div>
    <div>
      <HeaderUser />
    </div>
  </div>
</template>
