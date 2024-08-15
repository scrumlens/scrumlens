<script setup lang="ts">
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
          <NuxtLink to="/dashboard">
            Dashboard
          </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuItem as-child>
          <NuxtLink to="/profile">
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
