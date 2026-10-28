import React from 'react'
import { Check } from '@/components/geode/icons'
import { Button as ShadcnButton } from '@/components/shadcn/button'

export const DefaultIcon = () => <Check aria-hidden="true" />

const variantMap = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'ghost',
  white: 'outline',
  cancel: 'destructive',
  cancelSec: 'outline',
  icon: 'primary',
  iconSec: 'secondary',
}

const Button = React.forwardRef(({
  variant = 'primary',
  size = 'default',
  icon: IconComponent,
  iconPosition = 'left',
  children,
  className,
  ...props
}, ref) => {
  const iconOnly = variant === 'icon' || variant === 'iconSec' || size === 'icon'
  const iconElement = IconComponent ? <IconComponent /> : (variant === 'icon' ? <DefaultIcon /> : null)

  return (
    <ShadcnButton
      ref={ref}
      variant={variantMap[variant] || 'primary'}
      size={iconOnly ? 'icon' : (size === 'icon' ? 'icon' : 'default')}
      className={className}
      {...props}
    >
      {iconOnly ? iconElement : (
        <>
          {iconPosition === 'left' ? iconElement : null}
          {children}
          {iconPosition === 'right' ? iconElement : null}
        </>
      )}
    </ShadcnButton>
  )
})

Button.displayName = 'Button'

export { Button }
export default Button
