import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef(({ className, src, alt = '', fallback = '', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-geode-avatar w-geode-avatar shrink-0 overflow-hidden rounded-geode-pill bg-geode-muted-bg', className)}
    {...props}
  >
    <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" />
    <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center font-geode text-geode-small text-geode-text">
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar }
