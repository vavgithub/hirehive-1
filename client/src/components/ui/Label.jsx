import React from 'react'

const Label = ({text , icon}) => {
  return (
    <div className='rounded-xl flex gap-4 p-4 bg-background-80 typography-large-p'>
         {icon && icon}
        {text}
    </div>
  )
}

export default Label