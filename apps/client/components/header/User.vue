<script setup lang="ts">
import { RoutePath } from '@/types'

const { userAcronym } = useUser()
const { logout } = useAuth()
</script>

<template>
  <div data-user>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Avatar class="cursor-pointer">
          <AvatarFallback>
            {{ userAcronym }}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-32">
        <DropdownMenuItem as-child>
          <NuxtLink :to="RoutePath.Dashboard">
            Dashboard
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink :to="RoutePath.Profile">
            Profile
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="logout">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
