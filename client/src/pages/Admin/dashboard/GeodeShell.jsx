import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Briefcase, CalendarDays, ChevronDown, ClipboardCheck, FileText, IdCard, LayoutGrid, Menu, PauseCircle, Settings, Star, UserCheck, Users, X } from '@/components/geode/icons'
import { GeodeLogo } from '@/components/geode/Logo'
import { Avatar } from '@/components/shadcn/avatar'
import { getRoute, hasRoutePermission, ROLES, ROUTE_KEY } from '@/config/permissions.config'
import { cn } from '@/lib/utils'

const iconProps = { size: 16, strokeWidth: 1.75, 'aria-hidden': true }

export const previewGeodeNav = [
  { label: 'Dashboard', to: '/preview/geode-dashboard', icon: LayoutGrid, end: true },
  {
    label: 'Jobs',
    icon: Briefcase,
    children: [
      { label: 'All Jobs', icon: Briefcase },
      { label: 'Assessments', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Candidates',
    icon: Users,
    children: [
      { label: 'All Candidates', icon: Users },
      { label: 'Future Gems', icon: UserCheck },
      { label: 'Parked Candidates', icon: PauseCircle },
    ],
  },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Teams', icon: IdCard },
  { label: 'Guide', icon: FileText },
]

export const previewGeodeFooter = [
  { label: 'Settings', icon: Settings },
]

function leaf(label, to, icon) {
  if (!to) return null
  return { label, to, icon }
}

export function buildGeodeNav(user) {
  if (!user?.role) return { items: [], footer: [] }

  const jobs = [
    hasRoutePermission(user.role, ROUTE_KEY.ALLJOBS) ? leaf('All Jobs', getRoute(user.role, ROUTE_KEY.ALLJOBS), Briefcase) : null,
    hasRoutePermission(user.role, ROUTE_KEY.ASSESSMENTS) ? leaf('Assessments', getRoute(user.role, ROUTE_KEY.ASSESSMENTS), ClipboardCheck) : null,
  ].filter(Boolean)

  const candidates = [
    hasRoutePermission(user.role, ROUTE_KEY.ALL_CANDIDATES)
      ? leaf(user.role === ROLES.DESIGN_REVIEWER ? 'Candidates' : 'All Candidates', getRoute(user.role, ROUTE_KEY.ALL_CANDIDATES), Users)
      : null,
    hasRoutePermission(user.role, ROUTE_KEY.SHORTLISTED) ? leaf('Future Gems', getRoute(user.role, ROUTE_KEY.SHORTLISTED), UserCheck) : null,
    hasRoutePermission(user.role, ROUTE_KEY.PARKED) ? leaf('Parked Candidates', getRoute(user.role, ROUTE_KEY.PARKED), PauseCircle) : null,
  ].filter(Boolean)

  const items = []
  if (user.role === ROLES.ADMIN) {
    items.push({ label: 'Dashboard', to: getRoute(user.role, ROUTE_KEY.DASHBOARD), icon: LayoutGrid, end: true })
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.JOBS) && jobs.length > 1) {
    items.push({ label: 'Jobs', icon: Briefcase, children: jobs })
  } else if (jobs[0]) {
    items.push({ ...jobs[0], label: jobs.length === 1 ? jobs[0].label : 'Jobs' })
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.CANDIDATES) && candidates.length > 1) {
    items.push({ label: 'Candidates', icon: Users, children: candidates })
  } else if (candidates[0]) {
    items.push(candidates[0])
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.REVIEWS)) {
    items.push({ label: 'Reviews', to: getRoute(user.role, ROUTE_KEY.REVIEWS), icon: Star })
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.CALENDAR)) {
    items.push({ label: 'Calendar', to: getRoute(user.role, ROUTE_KEY.CALENDAR), icon: CalendarDays })
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.TEAMS)) {
    items.push({ label: 'Teams', to: getRoute(user.role, ROUTE_KEY.TEAMS), icon: IdCard })
  }
  if (hasRoutePermission(user.role, ROUTE_KEY.GUIDE)) {
    items.push({ label: 'Guide', to: getRoute(user.role, ROUTE_KEY.GUIDE), icon: FileText })
  }

  const footer = []
  if (hasRoutePermission(user.role, ROUTE_KEY.SETTINGS)) {
    footer.push({ label: 'Settings', to: getRoute(user.role, ROUTE_KEY.SETTINGS), icon: Settings })
  }
  return { items, footer }
}

function NavRow({ item, onNavigate }) {
  const location = useLocation()
  const Icon = item.icon
  const childActive = item.children?.some((child) => child.to && location.pathname.startsWith(child.to))
  const [open, setOpen] = useState(Boolean(childActive))

  if (item.children?.length) {
    return (
      <div className="flex flex-col gap-geode-1">
        <button type="button" className="geode-nav-item" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {Icon ? <Icon {...iconProps} /> : null}
          <span className="flex-1">{item.label}</span>
          {item.badge ? <span className="geode-nav-badge" /> : null}
          <ChevronDown {...iconProps} className={cn('transition-transform', open && 'rotate-180')} />
        </button>
        {open ? (
          <div className="ml-geode-4 flex flex-col gap-geode-1">
            {item.children.map((child) => (
              <NavRow key={child.label} item={child} onNavigate={onNavigate} />
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  if (!item.to) {
    return (
      <span className="geode-nav-item">
        {Icon ? <Icon {...iconProps} /> : null}
        <span>{item.label}</span>
      </span>
    )
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className="geode-nav-item"
    >
      {Icon ? <Icon {...iconProps} /> : null}
      <span className="flex-1">{item.label}</span>
      {item.badge ? <span className="geode-nav-badge" /> : null}
    </NavLink>
  )
}

function GeodeShell({ items, footer = [], user, account, children }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const sidebar = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-geode-lg shrink-0 items-center justify-between px-geode-4">
        <GeodeLogo />
        <button type="button" className="lg:hidden" aria-label="Close menu" onClick={close}>
          <X {...iconProps} />
        </button>
      </div>
      <nav className="flex min-h-0 flex-1 flex-col gap-geode-1 overflow-y-auto px-geode-3" aria-label="Primary">
        {items.map((item) => (
          <NavRow key={item.label} item={item} onNavigate={close} />
        ))}
      </nav>
      <div className="mt-auto flex shrink-0 flex-col gap-geode-1 border-t border-geode-border p-geode-3">
        {footer.map((item) => (
          <NavRow key={item.label} item={item} onNavigate={close} />
        ))}
        {account}
        {account ? null : user?.to ? (
          <NavLink to={user.to} onClick={close} className="geode-nav-item">
            <Avatar src={user.avatar} alt="" fallback={user.name ? user.name.slice(0, 1) : 'G'} />
            <span className="truncate text-geode-text">{user.name || 'Account'}</span>
          </NavLink>
        ) : (
          <span className="geode-nav-item">
            <Avatar src={user?.avatar} alt="" fallback={user?.name ? user.name.slice(0, 1) : 'G'} />
            <span className="truncate text-geode-text">{user?.name || 'Account'}</span>
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="geode flex min-h-screen bg-geode-bg text-geode-text">
      {open ? <button type="button" className="fixed inset-0 z-30 bg-geode-ink/40 lg:hidden" aria-label="Close menu" onClick={close} /> : null}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-geode-sidebar flex-col border-r border-geode-border bg-geode-card lg:sticky lg:top-0 lg:h-screen lg:max-h-screen',
        open ? 'flex' : 'hidden lg:flex',
      )}
      >
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-geode-lg items-center gap-geode-3 border-b border-geode-border bg-geode-card px-geode-4 lg:hidden">
          <button type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu {...iconProps} />
          </button>
          <GeodeLogo compact />
        </div>
        <main className="flex-1 px-geode-4 py-geode-4 md:px-geode-5 md:py-geode-5">
          {children}
        </main>
      </div>
    </div>
  )
}

export default GeodeShell
