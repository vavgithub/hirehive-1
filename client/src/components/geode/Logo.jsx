export function GeodeLogo({ compact = false }) {
  return (
    <span
      role="img"
      aria-label="Geode"
      className={compact ? 'geode-logo geode-logo-compact' : 'geode-logo'}
    >
      Geode
    </span>
  )
}
