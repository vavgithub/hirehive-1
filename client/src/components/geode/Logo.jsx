import logo from '@/assets/geode/logo.svg'

export function GeodeLogo({ compact = false }) {
  return (
    <img
      src={logo}
      alt="Geode"
      className={compact ? 'geode-logo geode-logo-compact' : 'geode-logo'}
    />
  )
}
