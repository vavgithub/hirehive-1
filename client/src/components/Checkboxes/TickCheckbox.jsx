const TickCheckbox = ({
  id,
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label htmlFor={id} className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="geode-check"
      />
      {label ? <span className="whitespace-nowrap">{label}</span> : null}
    </label>
  )
}

export default TickCheckbox
