import React from 'react'

function CustomHeading({fontValue,fontSize,color,label,extraStyles = ""}) {

  const fontSteps = {
    0 : "typography-small-p",
    1 : "typography-large-p",
    2 : "typography-body",
    3 : "typography-h4",
    4 : "typography-h3",
    5 : "typography-h2",
    6 : "typography-h1",
  }  

  const fonts = {
    1 : "Gilroy",
    2 : 'Gilroy'
  }

  const styles = `
  font-semibold mb-4 
  ${color?.toString() ? color : "text-font-main"} 
  ${fontValue?.toString() ? fonts[fontValue] : "font-gilroy"} 
  ${fontSize?.toString() ? `${fontSteps[fontSize]}` : 'typography-body'}
  `

  return (
    <div className={styles + "  " + extraStyles}>
      {label}
    </div>
  )
}

export default CustomHeading
