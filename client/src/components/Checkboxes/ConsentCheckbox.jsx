import React from 'react'
import { Check } from 'lucide-react'
import IconWrapper from '../Cards/IconWrapper'

const ConsentCheckbox = ({ id, checked, onChange, label, className = '', justify = true }) => {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 cursor-pointer text-left ${className}`}>
      <span className='relative flex h-4 w-4 mt-0.5 shrink-0'>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='peer appearance-none h-4 w-4 cursor-pointer rounded border border-font-gray bg-background-100 checked:bg-accent-100 checked:border-accent-100'
        />
        <span className='pointer-events-none absolute inset-0 hidden items-center justify-center text-background-100 peer-checked:flex'>
          <IconWrapper customStrokeWidth={4} customIconSize={2} icon={Check} inheritColor size={0} />
        </span>
      </span>
      <span className={`typography-small-p text-font-gray ${justify ? 'text-justify' : ''}`}>{label}</span>
    </label>
  )
}

export default ConsentCheckbox
