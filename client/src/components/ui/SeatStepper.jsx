import React from 'react'
import { Plus, Minus } from 'lucide-react'
import IconWrapper from '../Cards/IconWrapper'

const SeatStepper = ({
  value,
  onChange,
  min = 1,
  max,
  helperText,
  align = 'center',
  incrementLabel = 'Increase seats',
  decrementLabel = 'Decrease seats',
  className = '',
}) => {
  const clamp = (next) => {
    let result = Number.isFinite(next) ? next : min
    result = Math.max(min, result)
    if (max != null) result = Math.min(max, result)
    return result
  }

  const atMin = value <= min
  const atMax = max != null && value >= max
  const alignment = align === 'start' ? 'items-start' : 'items-center'

  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => onChange(clamp(value + 1))}
          disabled={atMax}
          aria-label={incrementLabel}
          className='bg-background-70 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-80 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <IconWrapper icon={Plus} inheritColor size={0} customIconSize={3} />
        </button>
        <input
          type='number'
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
          className='no-spinner w-28 h-11 rounded-xl bg-background-80 typography-body text-font-main text-center outline-none'
        />
        <button
          type='button'
          onClick={() => onChange(clamp(value - 1))}
          disabled={atMin}
          aria-label={decrementLabel}
          className='bg-background-70 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-80 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <IconWrapper icon={Minus} inheritColor size={0} customIconSize={3} />
        </button>
      </div>
      {helperText && <p className='typography-small-p text-font-gray'>{helperText}</p>}
    </div>
  )
}

export default SeatStepper
