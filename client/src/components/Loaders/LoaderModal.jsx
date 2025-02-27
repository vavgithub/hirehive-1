import React from 'react'
import Loader from './Loader'

function LoaderModal() {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen min-h-screen flex justify-center items-center bg-background-overlay'>
      <Loader/>
    </div>
  )
}

export default LoaderModal
