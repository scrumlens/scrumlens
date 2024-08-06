<script setup lang="ts">
import { Monitor, Moon, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()

function onSelect(command: string) {
  colorMode.preference = command
}

const options = [
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
  { label: 'System', value: 'system', icon: Monitor },
]

function getIcon(command: string) {
  return options.find(i => i.value === command)?.icon || options[0].icon
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        size="icon-sm"
        variant="ghost"
      >
        <component
          :is="getIcon(colorMode.value)"
          class="w-5 h-5"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-32">
      <DropdownMenuItem
        v-for="i in options"
        :key="i.value"
        @click="onSelect(i.value)"
      >
        <div class="flex items-center gap-2">
          <component
            :is="i.icon"
            class="w-4 h-4"
          />

          <span>{{ i.label }}</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
