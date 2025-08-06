import { useEffect, useState } from 'react'

function useDebounce(input,duration = 250) {
  const [debouncedValue,setDebouncedValue] = useState('')

  useEffect(()=>{
    const timeout = setTimeout(()=>{
        setDebouncedValue(input)
    },duration)
    return ()=>{
        clearTimeout(timeout)
    }
  },[input])

  return [debouncedValue]
}

export default useDebounce