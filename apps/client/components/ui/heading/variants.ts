import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const variants = cva('font-medium leading-normal text-foreground', {
  variants: {
    variant: {
      muted: 'text-muted-foreground',
    },
    size: {
      default: 'text-2xl my-4',
      md: 'text-xl my-4',
      sm: 'text-lg my-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type Variants = VariantProps<typeof variants>
