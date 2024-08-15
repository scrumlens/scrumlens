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
      class="grow px-5 pt-16 pb-4"
    >
      <slot />
    </div>
  </div>
</template>
