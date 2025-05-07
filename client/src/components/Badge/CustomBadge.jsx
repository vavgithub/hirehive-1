import React from 'react'

function CustomBadge({pointer,children,extraStyles,paddingX,paddingY,label,backgroundColor,borderRadius,...props}) {
    let valueSteps = {
    0 : "0",
    1 : "2",
    2 : "4",
    3 : "6",
    4 : "8"
    }

    let borderSteps = {
    0 : "[0rem]",
    1 : "[0.25rem]",
    2 : "[0.5rem]",
    3 : "[0.75rem]",
    4 : "[1rem]",
    5 : "[1.25rem]",
    6 : "[1.5rem]",
    7 : "[1.75rem]",
    8 : "[2rem]",
    9 : "[2.25rem]",
    10 : "full",
    }

    const styles = 
    `${pointer ? "cursor-pointer" : "cursor-default"}  
    ${paddingY?.toString() ? `py-${valueSteps[paddingY]}` : 'py-2'}  
    ${paddingX?.toString() ? `px-${valueSteps[paddingX]}` : 'px-6'} 
    ${backgroundColor ? backgroundColor : 'bg-background-70'} 
    ${borderRadius?.toString() ? `rounded-${borderSteps[borderRadius]}` : "rounded-xl"} 
    `

  return (
    <span {...props} className={styles + "  " + extraStyles}>
      {label}
    </span>
  )
}

export default CustomBadge
