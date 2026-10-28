import { Outlet, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import * as Sentry from '@sentry/react'
import { LogOut } from 'lucide-react'
import { logout } from '../services/auth.service'
import useAuth from '../hooks/useAuth'
import { useAuthContext } from '../context/AuthProvider'
import { useUnknownProfilePicture } from '../context/ThemeContext'
import { getRoute, hasRoutePermission, ROUTE_KEY } from '../config/permissions.config'
import GeodeShell, { buildGeodeNav } from '../pages/Admin/dashboard/GeodeShell'
import { Avatar } from '@/components/shadcn/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'

const iconProps = { size: 16, strokeWidth: 1.75, 'aria-hidden': true }

function GeodeAdminLayout() {
  const navigate = useNavigate()
  const { user, setUser } = useAuthContext()
  const { refetch } = useAuth()
  const queryClient = useQueryClient()
  const newMembersCount = useSelector((state) => state.admin?.newMembersCount ?? 0)
  const unknownProfilePicture = useUnknownProfilePicture()

  const handleLogout = async () => {
    try {
      await logout()
      Sentry.setUser(null)
      setUser(null)
      refetch()
      queryClient.clear()
      navigate('/admin/login')
    } catch {
      // The session stays until logout succeeds.
    }
  }

  const nav = buildGeodeNav(user)
  const items = nav.items.map((item) => (
    item.label === 'Teams' && newMembersCount > 0 ? { ...item, badge: true } : item
  ))
  const accountName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Account'
  const profilePath = user?.role ? getRoute(user.role, ROUTE_KEY.PROFILE) : undefined
  const companyPath = user?.role && hasRoutePermission(user.role, ROUTE_KEY.COMPANY_PROFILE_VIEW)
    ? getRoute(user.role, ROUTE_KEY.COMPANY_PROFILE_VIEW)
    : undefined

  const account = (
    <DropdownMenu>
      <DropdownMenuTrigger className="geode-nav-item">
        <Avatar src={user?.profilePicture || unknownProfilePicture} alt="" fallback={accountName.slice(0, 1)} />
        <span className="truncate text-geode-text">{accountName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top">
        {companyPath ? (
          <DropdownMenuItem onSelect={() => navigate(companyPath)}>
            {user?.companyDetails?.name || 'Company'}
          </DropdownMenuItem>
        ) : null}
        {profilePath ? (
          <DropdownMenuItem onSelect={() => navigate(profilePath)}>
            Profile
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut {...iconProps} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <GeodeShell items={items} footer={nav.footer} account={account}>
      <Outlet />
    </GeodeShell>
  )
}

export default GeodeAdminLayout
