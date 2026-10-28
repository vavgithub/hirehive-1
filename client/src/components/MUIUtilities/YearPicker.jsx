import { useEffect } from 'react'
import dayjs from 'dayjs'

function toYear(value) {
  if (!value && value !== 0) return ''
  if (typeof value === 'number' && value > 1900) return String(value)
  if (typeof value === 'string' && /^\d{4}$/.test(value)) return value
  const parsed = dayjs(value)
  return parsed.isValid() ? String(parsed.year()) : ''
}

export default function YearPicker({ onChange, value, error }) {
  const current = dayjs().year()
  const years = []
  for (let year = current; year >= 1900; year -= 1) years.push(String(year))
  const selected = toYear(value)

  useEffect(() => {
    if (!value) onChange(dayjs())
  }, [])

  return (
    <select
      className={error ? 'geode-year geode-picker-invalid' : 'geode-year'}
      value={selected || String(current)}
      aria-label="Founded year"
      onChange={(event) => onChange(dayjs(`${event.target.value}-01-01`))}
    >
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  )
}
