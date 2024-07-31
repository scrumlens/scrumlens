<script setup lang="ts">
import { useDashboard } from '@/components/dashboard/composables'

const { getBoards, boardsRaw } = useDashboard()

onMounted(() => {
  getBoards()
})
</script>

<template>
  <div data-user-dashboard>
    <UiHeading class="mb-7">
      Dashboard
    </UiHeading>
    <div class="grid grid-cols-4 gap-4">
      <NuxtLink
        v-for="i in boardsRaw?.items"
        :key="i._id"
        :to="`/boards/${i._id}`"
      >
        <DashboardCard :data="i" />
      </NuxtLink>
    </div>
  </div>
</template>
