import { useLayoutEffect, useState } from 'react'

export function useGeodeToken(name, fallback) {
  const [value, setValue] = useState(fallback)

  useLayoutEffect(() => {
    const root = document.querySelector('.geode')
    if (!root) return
    const next = getComputedStyle(root).getPropertyValue(name).trim()
    if (next) setValue(next)
  }, [name])

  return value
}
