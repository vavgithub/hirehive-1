import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-geode-2 whitespace-nowrap rounded-geode-pill font-geode text-geode-small font-geode-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-geode-action text-geode-action-text hover:bg-geode-action-hover',
        secondary: 'bg-geode-ink text-geode-ink-text hover:bg-geode-ink-hover',
        outline: 'border border-geode-border bg-geode-card text-geode-text hover:bg-geode-muted-bg',
        ghost: 'text-geode-text hover:bg-geode-muted-bg',
      },
      size: {
        sm: 'h-geode-sm px-geode-3',
        md: 'h-geode-md px-geode-4',
        lg: 'h-geode-lg px-geode-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
