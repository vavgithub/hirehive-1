import { ACTION_TYPES } from '../../utility/ActionTypes'
import IconWrapper from '../Cards/IconWrapper'
import { Archive, CircleCheck, CircleX, EllipsisVertical, Pin, PinOff, Share2, SquarePen, Trash } from '@/components/geode/icons'
import { hasPermission, PERMISSIONS } from '../../config/permissions.config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn/dropdown-menu'

const pinUnpinMenuItems = {
  pin: { action: ACTION_TYPES.PIN, icon: Pin, label: 'Pin' },
  unpin: { action: ACTION_TYPES.UNPIN, icon: PinOff, label: 'Unpin' },
}

const MenuItems = {
  job: {
    open: [
      { action: ACTION_TYPES.EDIT, icon: SquarePen, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: Archive, label: 'Move To Draft' },
      { action: ACTION_TYPES.CLOSE, icon: CircleX, label: 'Close job' },
      { action: ACTION_TYPES.DELETE, icon: Trash, label: 'Delete', className: 'geode-menu-danger' },
    ],
    closed: [
      { action: ACTION_TYPES.REOPEN, icon: CircleCheck, label: 'Re-open' },
      { action: ACTION_TYPES.EDIT, icon: SquarePen, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: Archive, label: 'Move To Draft' },
      { action: ACTION_TYPES.DELETE, icon: Trash, label: 'Delete', className: 'geode-menu-danger' },
    ],
    draft: [
      { action: ACTION_TYPES.EDIT, icon: SquarePen, label: 'Edit' },
      { action: ACTION_TYPES.MAKE_ACTIVE, icon: CircleCheck, label: 'Make Active' },
      { action: ACTION_TYPES.DELETE, icon: Trash, label: 'Delete', className: 'geode-menu-danger' },
    ],
  },
  page1: [
    { action: ACTION_TYPES.EDIT, icon: SquarePen, label: 'Edit' },
  ],
  page2: [
    { action: 'ACTION_3', icon: Trash, label: 'Action 3', className: 'geode-menu-danger' },
    { action: 'ACTION_4', icon: CircleX, label: 'Action 4' },
  ],
  Jobs: [
    { action: ACTION_TYPES.SHARE, icon: Share2, label: 'Share' },
  ],
}

const ThreeDots = ({ job, handleAction, page, orgId, isPinned, role, extraStyles, customBgColor, customBgHover }) => {
  const getMenuItems = () => {
    if (job && job.status) return MenuItems.job[job.status] || []
    return MenuItems[page] || []
  }

  const menuItems = getMenuItems()
  const pinItem = pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']

  const handleMenuItemClick = (action, jobId) => {
    if (action === ACTION_TYPES.SHARE) {
      const companyId = orgId || (job && job.company_id)
      if (companyId) window.open(`${window.location.origin}/org/${companyId}/`, '_blank')
      else console.error('Organization ID not found')
      return
    }
    handleAction(action, jobId)
  }

  return (
    <div className={`relative ${extraStyles || ''}`} onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="flex items-center focus:outline-none" aria-label={job ? 'Job actions' : 'More actions'}>
            <IconWrapper
              hasBg={customBgColor || 'bg-background-80'}
              customBgHover={customBgHover || 'hover-outline'}
              icon={EllipsisVertical}
              customIconSize={7}
              customStrokeWidth={7}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(job?.status === 'open' && hasPermission(role, PERMISSIONS.SHOW_PIN_UNPIN_OPTION)) ? (
            <DropdownMenuItem onSelect={() => handleMenuItemClick(pinItem.action, job ? job._id : null)}>
              <IconWrapper size={0} customIconSize={5} icon={pinItem.icon} />
              {pinItem.label}
            </DropdownMenuItem>
          ) : null}
          {menuItems.length > 0 ? menuItems.map(({ action, icon, label, className }) => (
            <DropdownMenuItem
              key={action}
              className={className}
              onSelect={() => handleMenuItemClick(action, job ? job._id : null)}
            >
              <IconWrapper size={0} customIconSize={5} isErrorIcon={className === 'geode-menu-danger'} icon={icon} />
              {label}
            </DropdownMenuItem>
          )) : (
            <div className="geode-menu-item">No options found</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ThreeDots
