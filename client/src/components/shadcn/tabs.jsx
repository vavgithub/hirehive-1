import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('inline-flex flex-wrap items-center gap-geode-1 rounded-geode-control bg-geode-muted-bg p-geode-1', className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex h-geode-sm items-center rounded-geode-control bg-transparent px-geode-3 font-geode text-geode-small font-geode-heading text-geode-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-geode-focus data-[state=active]:bg-geode-card data-[state=active]:text-geode-text',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export { Tabs, TabsList, TabsTrigger }
