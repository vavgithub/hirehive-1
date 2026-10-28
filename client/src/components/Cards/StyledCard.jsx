import React from 'react'

function StyledCard({children,onClick,extraStyles,padding,rounded,backgroundColor,borderRadius,...props}) {

  let valueSteps = {
    0 : "p-0",
    1 : "md:p-2 p-1",
    2 : "md:p-8 p-4",
    3 : "md:p-6 p-3",
    4 : "md:p-8 p-4",
    5 : 'md:p-4 p-2'
  }

  const paddingString = padding?.toString() ? valueSteps[padding] : 'p-4 md:p-8'
  const styles = 
  ` ${paddingString} ${backgroundColor ? backgroundColor : 'bg-background-90'} ${borderRadius ? borderRadius : "rounded-xl"} 
  `

  return (
    <div
      {...props}
      onClick={onClick}
      data-pad={padding?.toString() ? String(padding) : 'default'}
      data-transparent={backgroundColor === 'bg-transparent' ? 'true' : undefined}
      className={`app-card ${styles}  ${extraStyles ?? ''}`}
    >
      {children}
    </div>
  )
}

export default StyledCard 
