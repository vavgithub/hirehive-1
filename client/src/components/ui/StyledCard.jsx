import React from 'react'

function StyledCard({children,onClick,extraStyles,padding,backgroundColor,isRounded = true}) {

  const styles = 
  ` ${padding ? padding : 'p-6'} 
    ${backgroundColor ? backgroundColor : 'bg-background-40'} 
    ${isRounded ? "rounded-xl" : ""} 
  `

  return (
    <div className={`${styles}  ${extraStyles}`}>
      {children}
    </div>
  )
}

export default StyledCard 
