import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'

function CustomToolTip({ title, disabled, children, size = 1, arrowed = false }) {
  const targetClass = disabled ? 'geode-tooltip-target cursor-default' : 'geode-tooltip-target cursor-pointer'
  if (!title) return <div className={targetClass}>{children}</div>
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={targetClass}>{children}</div>
      </TooltipTrigger>
      <TooltipContent data-size={size} data-arrow={arrowed ? 'true' : 'false'}>
        {title}
      </TooltipContent>
    </Tooltip>
  )
}

export default CustomToolTip
