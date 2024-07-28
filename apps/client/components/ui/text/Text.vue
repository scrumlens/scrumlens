<script setup lang="ts">
import type { Variants } from './variants'
import { variants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  variant?: Variants['variant']
  size?: Variants['size']
  class?: string
  as?: any
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
})
</script>

<template>
  <component
    :is="as"
    :class="cn(variants({ variant, size }), props.class)"
  >
    <slot />
  </component>
</template>
