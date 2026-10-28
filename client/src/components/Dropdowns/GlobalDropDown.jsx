import { useEffect, useState } from 'react'
import IconWrapper from '../Cards/IconWrapper'
import { ChevronDown, Info } from '@/components/geode/icons'
import CustomToolTip from '../Tooltip/CustomToolTip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'

function optionValue(option) {
  return typeof option === 'string' ? option : option?.value
}

function optionLabel(option) {
  return typeof option === 'string' ? option : option?.label
}

function GlobalDropDown({
  onChange,
  options = [],
  label,
  error,
  hasInfoIcon,
  infoText = '',
  errorMessage,
  defaultValue = '',
  value,
  customPlaceholder,
  extraStylesForLabel,
  required,
  searchEnabled = false,
}) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (defaultValue) {
      onChange(options?.find((option) => option?.value?.toLowerCase() === defaultValue?.toLowerCase())?.value)
    }
  }, [defaultValue])

  const filteredOptions = searchEnabled
    ? options.filter((option) => optionLabel(option)?.toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  const selected = options.find((option) => optionValue(option) === value)
  const selectedLabel = selected ? optionLabel(selected) : ''

  return (
    <div className="relative flex w-full flex-col gap-2">
      {hasInfoIcon ? (
        <div className="absolute right-0 top-0">
          <CustomToolTip title={infoText} arrowed>
            <IconWrapper size={0} customIconSize={2} customStrokeWidth={5} icon={Info} />
          </CustomToolTip>
        </div>
      ) : null}
      {label ? (
        <label className={`typography-body ${extraStylesForLabel || ''}`}>
          {label}
          {required ? <span className="ml-1 text-red-100">*</span> : null}
        </label>
      ) : null}
      <DropdownMenu open={open} onOpenChange={(next) => { setOpen(next); if (next && searchEnabled) setSearchTerm('') }}>
        <DropdownMenuTrigger asChild>
          <button type="button" className={error ? 'geode-select geode-select-invalid' : 'geode-select'}>
            <span>{selectedLabel || customPlaceholder || '-Select-'}</span>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="geode-menu-match">
          {searchEnabled ? (
            <input
              className="geode-menu-search"
              autoFocus
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => event.stopPropagation()}
            />
          ) : null}
          {filteredOptions.length > 0 ? filteredOptions.map((option) => (
            <DropdownMenuItem
              key={optionValue(option)}
              onSelect={() => onChange(optionValue(option))}
            >
              {optionLabel(option)}
            </DropdownMenuItem>
          )) : (
            <div className="geode-menu-item">No options found</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && errorMessage ? (
        <span className="geode-field-error text-red-500 typography-small-p">{errorMessage}</span>
      ) : null}
    </div>
  )
}

export default GlobalDropDown
