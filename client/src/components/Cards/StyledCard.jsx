import React from 'react'

function StyledCard({children,onClick,extraStyles,padding,rounded,backgroundColor,borderRadius,...props}) {

  let valueSteps = {
    0 : "0",
    1 : "2",
    2 : "8",
    3 : "6",
    4 : "8",
    5 : '4'
  }

  const styles = 
  ` ${padding?.toString() ? `md:p-${valueSteps[padding]} p-${valueSteps[padding]/2}` : 'p-4 md:p-8'} ${backgroundColor ? backgroundColor : 'bg-background-90'} ${borderRadius ? borderRadius : "rounded-xl"} 
  `

  return (
    <div {...props}  onClick={onClick} className={`${styles}  ${extraStyles ?? ''}`}>
      {children}
    </div>
  )
}

export default StyledCard 
