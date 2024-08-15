<script setup lang="ts">
const { userRaw } = useUser()
</script>

<template>
  <div data-user-profile>
    <UserVerifyAlert />
    <UserGuestAlert v-if="userRaw?.isGuest" />
    <UiHeading>Profile</UiHeading>
    <div class="max-w-[400px]">
      <UserProfile />
    </div>
  </div>
</template>
