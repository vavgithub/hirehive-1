import { useEffect, useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { CircleCheck, CircleX, X } from '@/components/geode/icons'

const listeners = new Set()
let items = []
let nextId = 1

function text(value) {
  if (value == null || value === '') return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (typeof value === 'object' && typeof value.message === 'string') return value.message
  return 'Something went wrong'
}

function publish(next) {
  items = next
  listeners.forEach((listener) => listener(items))
}

function push(variant, title, message) {
  const toast = { id: nextId++, variant, title: text(title), message: text(message) }
  publish([...items, toast].slice(-4))
}

function dismiss(id) {
  publish(items.filter((item) => item.id !== id))
}

function showSuccessToast(title, message) {
  push('success', title, message)
}

function showErrorToast(title, message) {
  push('error', title, message)
}

function StyledToastContainer() {
  const [toasts, setToasts] = useState(items)

  useEffect(() => {
    listeners.add(setToasts)
    setToasts(items)
    return () => listeners.delete(setToasts)
  }, [])

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={3000} label="Notifications">
      {toasts.map((toast) => (
        <ToastPrimitive.Root
          key={toast.id}
          className="geode-toast"
          data-variant={toast.variant}
          onOpenChange={(open) => {
            if (!open) dismiss(toast.id)
          }}
        >
          <span className="geode-toast-icon" aria-hidden="true">
            {toast.variant === 'success' ? <CircleCheck /> : <CircleX />}
          </span>
          <div className="geode-toast-copy">
            <ToastPrimitive.Title className="font-geode text-geode-small font-geode-heading text-geode-text">
              {toast.title}
            </ToastPrimitive.Title>
            {toast.message ? (
              <ToastPrimitive.Description className="font-geode text-geode-small text-geode-muted">
                {toast.message}
              </ToastPrimitive.Description>
            ) : null}
          </div>
          <ToastPrimitive.Close className="geode-toast-close" aria-label="Dismiss">
            <X aria-hidden="true" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="geode-toaster" />
    </ToastPrimitive.Provider>
  )
}

export { StyledToastContainer, showSuccessToast, showErrorToast }
