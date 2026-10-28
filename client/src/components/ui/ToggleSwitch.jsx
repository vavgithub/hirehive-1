import { Switch } from '@/components/shadcn/switch'

function ToggleSwitch({ label, checkValue, setCheckValue, disabled }) {
  return (
    <label className="inline-flex items-center gap-2">
      {label ? <span className="text-sm">{label}</span> : null}
      <Switch
        checked={Boolean(checkValue)}
        disabled={disabled}
        onCheckedChange={(checked) => setCheckValue(checked)}
        aria-label={label || 'Toggle'}
      />
    </label>
  )
}

export default ToggleSwitch
