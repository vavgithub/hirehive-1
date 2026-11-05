import React from 'react';

const omittedIconProps = [
  'isActiveIcon',
  'inheritColor',
  'isTeritiaryIcon',
  'isInActiveIcon',
  'customIconSize',
  'customStrokeWidth',
  'hasBg',
  'customBgHover',
  'size',
]

function IconWrapper({ icon: Icon, isErrorIcon, children, className = '', ...props }) {
  const rest = { ...props }
  omittedIconProps.forEach((key) => {
    delete rest[key]
  })

  return (
    <span
      {...rest}
      className={`inline-flex size-4 shrink-0 items-center justify-center text-current ${isErrorIcon ? 'text-destructive' : ''} ${className}`}
    >
      {Icon ? <Icon size={16} color="currentColor" strokeWidth={2} aria-hidden="true" /> : children}
    </span>
  );
}

export default IconWrapper;
