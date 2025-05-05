import React from 'react'

function CustomPill({error,selected,selectionBorder,selectionHover,pointer,children,extraStyles,paddingX,paddingY,label,backgroundColor,hoverColor,noHover,borderRadius,...props}) {
    let valueSteps = {
    0 : "0",
    1 : "2",
    2 : "4",
    3 : "6",
    4 : "8"
    }

    let borderSteps = {
    0 : "[0px]",
    1 : "[4px]",
    2 : "[8px]",
    3 : "[12px]",
    4 : "[16px]",
    5 : "[20px]",
    6 : "[24px]",
    7 : "[28px]",
    8 : "[32px]",
    9 : "[36px]",
    10 : "full",
    }

    const styles = 
    `inline-block ${pointer ? "cursor-pointer" : "cursor-default"}  
    ${paddingY?.toString() ? `py-${valueSteps[paddingY]}` : 'py-2'}  
    ${paddingX?.toString() ? `px-${valueSteps[paddingX]}` : 'px-6'} 
    ${backgroundColor ? backgroundColor : 'bg-background-40'} 
    ' border ' 
    ${selected ? (selectionBorder && typeof selectionBorder === 'string') ? selectionBorder : 'border-teal-100' : error ? 'border-red-100' : 'border-background-40 hover:border-background-30'} 
    ${noHover ? '' : selected ? (selectionHover && typeof selectionHover === 'string') ? selectionHover : 'hover:bg-accent-300' :(hoverColor && typeof hoverColor === 'string') ? `hover:${hoverColor}` : 'hover:bg-background-30'} 
    ${borderRadius?.toString() ? `rounded-${borderSteps[borderRadius]}` : "rounded-full"} 
    `

  return (
    <span {...props} className={styles + "  " + extraStyles}>
      {label}
    </span>
  )
}

export default CustomPill
