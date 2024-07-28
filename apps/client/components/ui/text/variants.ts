import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const variants = cva('my-2 text-foreground', {
  variants: {
    variant: {
      muted: 'text-muted-foreground',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type Variants = VariantProps<typeof variants>
