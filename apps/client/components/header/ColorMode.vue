<script setup lang="ts">
const colorMode = useColorMode()

function onSelect(command: string) {
  colorMode.preference = command
}

const options = [
  { label: 'Light', value: 'light', icon: 'uil:sun' },
  { label: 'Dark', value: 'dark', icon: 'uil:moon' },
  { label: 'System', value: 'system', icon: 'uil:monitor' },
]

function getIcon(command: string) {
  return options.find(i => i.value === command)?.icon || options[0].icon
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        size="icon-xs"
        variant="ghost"
      >
        <Icon
          :name="getIcon(colorMode.value)"
          mode="svg"
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
          <Icon
            :name="i.icon"
            mode="svg"
            class="w-5 h-5"
          />
          <span>{{ i.label }}</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
