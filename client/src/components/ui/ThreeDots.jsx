import React, { useState, useEffect, useRef } from 'react';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import IconWrapper from '../Cards/IconWrapper';
import { Archive, CircleCheck, CircleX, EllipsisVertical, SquarePen, Share2, Trash, Pin, PinOff } from 'lucide-react';
import { ListItemText, MenuItem, Popover, TextField } from '@mui/material';

const pinUnpinMenuItems = {
  pin: { action: ACTION_TYPES.PIN, icon: () => <IconWrapper size={0} customIconSize={5} icon={Pin} />, label: 'Pin' },
  unpin: { action: ACTION_TYPES.UNPIN, icon: () => <IconWrapper size={0} customIconSize={5} icon={PinOff} />, label: 'Unpin' },
}

const MenuItems = {
  job: {
    open: [
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: () => <IconWrapper size={0} customIconSize={5} icon={Archive} />, label: 'Move To Draft' },
      { action: ACTION_TYPES.CLOSE, icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleX} />, label: 'Close job' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete', className: 'text-red-100' ,style : { color :'red' }  },
    ],
    closed: [
      { action: ACTION_TYPES.REOPEN, icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleCheck} />, label: 'Re-open' },
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: () => <IconWrapper size={0} customIconSize={5} icon={Archive} />, label: 'Move To Draft' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete', className: 'text-red-100',style : { color :'red' } },
    ],
    draft: [
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete' },
    ],
  },
  page1: [
    { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
  ],
  page2: [
    { action: 'ACTION_3', icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Action 3' },
    { action: 'ACTION_4', icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleX} />, label: 'Action 4' },
  ],
  Jobs: [
    { action: ACTION_TYPES.SHARE, icon: () => <IconWrapper size={0} customIconSize={5} icon={Share2} />, label: 'Share' },
  ]
};

const ThreeDots = ({ job, handleAction, page, orgId, isPinned, role , extraStyles}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const getMenuItems = () => {
    if (job && job.status) {
      return MenuItems.job[job.status] || [];
    }
    return MenuItems[page] || [];
  };

  const menuItems = getMenuItems();

  const handleMenuItemClick = (action, jobId, e) => {
    e.stopPropagation();

    if (action === ACTION_TYPES.SHARE) {
      // For share action, use orgId passed from props
      const baseUrl = window.location.origin;

      // Check if orgId is available from props or fallback to job.company_id if needed
      const companyId = orgId || (job && job.company_id);

      if (companyId) {
        const shareUrl = `${baseUrl}/org/${companyId}/`;
        window.open(shareUrl, '_blank');
      } else {
        console.error('Organization ID not found');
      }
    } else {
      // For other actions, call the parent handler
      handleAction(action, jobId);
    }

    setIsOpen(false);
  };

  return (
    <div className={" relative " + extraStyles} ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none flex items-center ">
        <IconWrapper hasBg customBgHover={'hover:bg-background-80'} icon={EllipsisVertical} customIconSize={7} customStrokeWidth={7} />
      </button>
        <Popover
          disableScrollLock
          anchorEl={menuRef.current}
          open={Boolean(isOpen)}
          onClose={toggleMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top', // aligns the top of the Popover with the top of the anchorEl
            horizontal: 'right', // aligns the right side of the Popover with the right side of the anchorEl
          }}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: '12rem',
              borderRadius: '12px',
              padding: '8px',
              backgroundColor: 'rgba(22, 23, 24, 1)',
              marginTop: '12px',
            },
          }}
        >
          <div className="flex flex-col gap-2 px-1 py-2 w-full text-white">
          {(job?.status === 'open' && (role === "Admin" || role === "Hiring Manager")) &&
          <MenuItem
              key={pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.action}
          sx={{
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(22, 23, 24, 1)',
            display: 'flex',
            fontSize: '14px',
            alignItems: 'center',
            gap: '12px',
            color: 'rgba(255, 255, 255, 1)', // default color
            '&:hover': {
              backgroundColor: 'rgba(35, 36, 37, 1)',
              color: 'rgba(255, 255, 255, 1)', // custom white color
              '& .MuiTypography-root': {
                color: pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.style?.color ?? 'rgba(255, 255, 255, 1) !important', // force Typography to be white
              },
            },
            ...pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.style,
          }}
          onClick={(e) => handleMenuItemClick(pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.action, job ? job._id : null, e)}
        >
            {
              (() => {
                const DynamicIcon = pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.icon;
                return DynamicIcon ? <DynamicIcon /> : null;
              })()
            }
          <ListItemText
            primaryTypographyProps={{
              component: 'span',
              sx: {
                fontWeight: 300,
                fontSize: '14px',
                color: 'inherit', // critical: let it inherit from MenuItem
              },
            }}
            primary={pinUnpinMenuItems[isPinned ? 'unpin' : 'pin']?.label}
          />
        </MenuItem>
          }
            {menuItems.length > 0 ? (
              menuItems.map(({ action, icon: Icon, label, className, style }) => (
                <MenuItem
                      key={action}
                      sx={{
                        padding: '8px 16px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(22, 23, 24, 1)',
                        display: 'flex',
                        fontSize: '14px',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 1)', // default color
                        '&:hover': {
                          backgroundColor: 'rgba(35, 36, 37, 1)',
                          color: 'rgba(255, 255, 255, 1)', // custom white color
                          '& .MuiTypography-root': {
                            color: style?.color ?? 'rgba(255, 255, 255, 1) !important', // force Typography to be white
                          },
                        },
                        ...style,
                      }}
                      onClick={(e) => {
                        handleMenuItemClick(action, job ? job._id : null, e)
                      }}
                    >
                      <Icon />
                      <ListItemText
                        primaryTypographyProps={{
                          component: 'span',
                          sx: {
                            fontWeight: 300,
                            fontSize: '14px',
                            color: 'inherit', // critical: let it inherit from MenuItem
                          },
                        }}
                        primary={label}
                      />
                    </MenuItem>

              ))
            ) : (
              <MenuItem disabled>No options found</MenuItem>
            )}
          </div>
        </Popover>
    </div>
  );
};

export default ThreeDots;