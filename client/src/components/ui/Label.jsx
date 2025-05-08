import React from 'react'

const Label = ({text , icon: Icon ,spanContent}) => {
  return (
    <div className='rounded-xl flex gap-4 items-center p-4 bg-background-80 typography-large-p'>
          {Icon && <Icon />} 
        <p>{text}{spanContent && <span className='text-font-gray ml-[2px]'>{spanContent}</span>}</p>
    </div>
  )
}

export default Label