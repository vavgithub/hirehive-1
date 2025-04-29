import React from 'react'

function StyledCard({children,onClick,extraStyles,padding,rounded,backgroundColor,borderRadius,...props}) {

  let valueSteps = {
    0 : "0",
    1 : "2",
    2 : "4",
    3 : "6",
    4 : "8"
  }

  const styles = 
  ` ${padding?.toString() ? `p-${valueSteps[padding]}` : 'p-8'} ${backgroundColor ? backgroundColor : 'bg-background-90'} ${borderRadius ? borderRadius : "rounded-xl"} 
  `

  return (
    <div {...props}  onClick={onClick} className={`${styles}  ${extraStyles ?? ''}`}>
      {children}
    </div>
  )
}

export default StyledCard 
