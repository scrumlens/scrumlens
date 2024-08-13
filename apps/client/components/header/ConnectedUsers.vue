<script setup lang="ts">
import { useBoard } from '@/components/board/composables'

const { connectedUsers } = useBoard()

const MAX_USERS_AVATARS = 5
const OFFSET_POSITION = 10

const usersToShow = computed(() => {
  return connectedUsers.value?.slice(0, MAX_USERS_AVATARS)
})

const remainingUserCount = computed(() => {
  return (connectedUsers.value && connectedUsers.value?.length - MAX_USERS_AVATARS) || 0
})

const remainingUserNames = computed(() => {
  return (connectedUsers.value && connectedUsers.value?.slice(MAX_USERS_AVATARS)) || []
})
</script>

<template>
  <div
    data-connected-users
    class="flex justify-end relative h-full w-[160px]"
  >
    <TooltipProvider :disable-hoverable-content="true">
      <Tooltip
        v-for="user in usersToShow"
        :key="user.name"
      >
        <TooltipTrigger as="div">
          <Avatar
            size="xs"
            class="realtive z-10 border"
            :style="{
              'margin-left': `-${OFFSET_POSITION}px`,
            }"
          >
            <AvatarFallback class="text-black dark:text-foreground">
              {{ user.acronym }}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {{ user.name }}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger as="div">
          <Avatar
            v-if="remainingUserCount > 0"
            size="xs"
            class="relative z-10 border"
            :style="{
              'margin-left': `-${OFFSET_POSITION}px`,
            }"
          >
            <AvatarFallback class="text-[11px]">
              +{{ remainingUserCount }}
            </AvatarFallback>
          </Avatar>
          <TooltipContent>
            <div
              v-for="user in remainingUserNames"
              :key="user.name"
            >
              {{ user.name }}
            </div>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
