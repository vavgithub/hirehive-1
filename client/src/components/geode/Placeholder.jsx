export function GeodePlaceholder({ label = 'Image', compact = false }) {
  return (
    <div
      className={compact ? 'geode-placeholder geode-placeholder-compact' : 'geode-placeholder'}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  )
}
