import React from 'react'

function CustomHeading({fontValue,fontSize,color,label,extraStyles = ""}) {

  const fontSteps = {
    0 : "[0px]",
    1 : "[0.625rem]",
    2 : "[0.75rem]",
    3 : "[0.875rem]",
    4 : "[1rem]",
    5 : "[1.25rem]",
    6 : "[1.5rem]",
    7 : "[2rem]",
  }  

  const fonts = {
    1 : "Gilroy",
    2 : 'Gilroy'
  }

  const styles = `
  font-semibold mb-4 
  ${color?.toString() ? color : "text-white"} 
  ${fontValue?.toString() ? fonts[fontValue] : "font-bricolage"} 
  ${fontSize?.toString() ? `text-${fontSteps[fontSize]}` : 'text-[20px]'}
  `

  return (
    <div className={styles + "  " + extraStyles}>
      {label}
    </div>
  )
}

export default CustomHeading
