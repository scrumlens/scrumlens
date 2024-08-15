<script setup lang="ts">
import { Info } from 'lucide-vue-next'
</script>

<template>
  <Alert>
    <Info class="h-4 w-4" />
    <AlertTitle>
      Guest mode
    </AlertTitle>
    <AlertDescription>
      You're in guest mode. You cannot create boards. You can join other public boards through their links.<br>If you log out, you will not be able to log in again under this account.<br>If you want to turn your guest account into your personal account, enter your email in the Profile section.
    </AlertDescription>
  </Alert>
</template>
