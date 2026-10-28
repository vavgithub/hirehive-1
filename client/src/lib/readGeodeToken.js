import { useLayoutEffect, useState } from 'react'

function resolveToken(root, raw) {
  if (!raw.includes('var(')) return raw
  const probe = document.createElement('span')
  probe.style.color = raw
  root.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.style.color = 'inherit'
  const inherited = getComputedStyle(probe).color
  probe.remove()
  if (resolved && resolved !== inherited) return resolved
  return raw
}

export function useGeodeToken(name, fallback) {
  const [value, setValue] = useState(fallback)

  useLayoutEffect(() => {
    const root = document.querySelector('.geode')
    if (!root) return
    const next = getComputedStyle(root).getPropertyValue(name).trim()
    if (next) setValue(resolveToken(root, next))
  }, [name])

  return value
}
