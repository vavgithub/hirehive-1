import React from 'react'

function CustomHeading({fontValue,fontSize,color,label,extraStyles = ""}) {

  const fontSteps = {
    0 : "[0px]",
    1 : "[10px]",
    2 : "[12px]",
    3 : "[14px]",
    4 : "[16px]",
    5 : "[20px]",
    6 : "[24px]",
    7 : "[32px]",
  }  

  const fonts = {
    1 : "outfit",
    2 : 'bricolage'
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
