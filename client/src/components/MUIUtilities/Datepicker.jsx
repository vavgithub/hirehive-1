import { useEffect, useLayoutEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { Calendar } from '@/components/geode/icons'
import IconWrapper from '../Cards/IconWrapper'

function toDateInput(value) {
  if (!value) return ''
  const parsed = dayjs(value)
  return parsed.isValid() ? parsed.format('YYYY-MM-DD') : ''
}

export default function Datepicker({ onChange, customBg, disableDate = 'before', value, error, hasDefault = true }) {
  const fieldRef = useRef(null)
  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    if (hasDefault) onChange(dayjs())
  }, [hasDefault])

  useLayoutEffect(() => {
    if (!fieldRef.current) return
    if (customBg) fieldRef.current.style.setProperty('--geode-picker-bg', customBg)
    else fieldRef.current.style.removeProperty('--geode-picker-bg')
  }, [customBg])

  return (
    <label ref={fieldRef} className={error ? 'geode-picker geode-picker-invalid' : 'geode-picker'}>
      <IconWrapper icon={Calendar} size={0} isInActiveIcon />
      <input
        className="geode-picker-input"
        type="date"
        value={toDateInput(value)}
        min={disableDate === 'before' ? today : undefined}
        max={disableDate === 'after' ? today : undefined}
        onChange={(event) => onChange(event.target.value ? dayjs(event.target.value) : null)}
      />
    </label>
  )
}
