import { cn } from '@/lib/utils'

function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-geode-pill bg-geode-muted-bg px-geode-3 py-geode-1 font-geode text-geode-small text-geode-text',
        className
      )}
      {...props}
    />
  )
}

export { Badge }
