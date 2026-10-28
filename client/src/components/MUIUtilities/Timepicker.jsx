import { useLayoutEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { Clock } from '@/components/geode/icons'
import IconWrapper from '../Cards/IconWrapper'

function toTimeInput(value) {
  if (!value) return ''
  if (typeof value === 'string' && /^\d{2}:\d{2}/.test(value)) return value.slice(0, 5)
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('HH:mm') : ''
}

export default function Timepicker({ customBg, onChange, value, error }) {
  const fieldRef = useRef(null)

  useLayoutEffect(() => {
    if (!fieldRef.current) return
    if (customBg) fieldRef.current.style.setProperty('--geode-picker-bg', customBg)
    else fieldRef.current.style.removeProperty('--geode-picker-bg')
  }, [customBg])

  return (
    <label ref={fieldRef} className={error ? 'geode-picker geode-picker-invalid' : 'geode-picker'}>
      <IconWrapper icon={Clock} size={0} isInActiveIcon />
      <input
        className="geode-picker-input"
        type="time"
        value={toTimeInput(value)}
        onChange={(event) => onChange(event.target.value ? dayjs(`1970-01-01T${event.target.value}`) : null)}
      />
    </label>
  )
}
