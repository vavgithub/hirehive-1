import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

function placeMenu(menu, anchorEl, align, matchWidth) {
  if (!menu || !anchorEl?.getBoundingClientRect) return
  const rect = anchorEl.getBoundingClientRect()
  const menuRect = menu.getBoundingClientRect()
  const width = matchWidth ? rect.width : menuRect.width
  let left = rect.left
  if (align === 'end') left = rect.right - width
  if (align === 'center') left = rect.left + (rect.width - width) / 2
  const maxLeft = window.innerWidth - width - 8
  menu.style.position = 'fixed'
  menu.style.top = `${rect.bottom + 8}px`
  menu.style.left = `${Math.min(Math.max(8, left), Math.max(8, maxLeft))}px`
  menu.style.zIndex = '60'
  if (matchWidth) menu.style.width = `${rect.width}px`
}

export function AnchoredMenu({ anchorEl, open, onClose, align = 'start', className, children }) {
  const menuRef = useRef(null)
  const [tick, setTick] = useState(0)
  const matchWidth = className?.includes('geode-menu-anchor') || className?.includes('geode-menu-match')

  useEffect(() => {
    if (!open) return undefined
    const update = () => setTick((value) => value + 1)
    const close = (event) => {
      if (menuRef.current?.contains(event.target)) return
      onClose?.()
    }
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useLayoutEffect(() => {
    placeMenu(menuRef.current, anchorEl, align, matchWidth)
  }, [open, anchorEl, align, matchWidth, tick, children])

  if (!open || !anchorEl) return null

  return createPortal(
    <div ref={menuRef} className={cn('geode-menu', className)} role="menu">
      {children}
    </div>,
    document.body,
  )
}
