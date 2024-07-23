<script setup lang="ts">

</script>

<template>
  <div
    data-layout-default
    class="flex flex-col h-screen"
  >
    <Header />
    <div
      data-main
      class="grow"
    >
      <slot />
    </div>
  </div>
</template>
