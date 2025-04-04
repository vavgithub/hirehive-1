import React, { useState, useEffect, useRef } from 'react';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import IconWrapper from '../Cards/IconWrapper';
import { Archive, CircleCheck, CircleX, EllipsisVertical, SquarePen, Trash } from 'lucide-react';

const MenuItems = {
  job: {
    open: [
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: () => <IconWrapper size={0} customIconSize={5} icon={Archive} />, label: 'Move To Draft' },
      { action: ACTION_TYPES.CLOSE, icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleX} />, label: 'Close job' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete', className: 'text-red-100' },
    ],
    closed: [
      { action: ACTION_TYPES.REOPEN, icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleCheck} />, label: 'Re-open' },
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DRAFT, icon: () => <IconWrapper size={0} customIconSize={5} icon={Archive} />, label: 'Move To Draft' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete', className: 'text-red-100' },
    ],
    draft: [
      { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
      { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete' },
    ],
  },
  page1: [
    { action: ACTION_TYPES.EDIT, icon: () => <IconWrapper size={0} customIconSize={5} icon={SquarePen} />, label: 'Edit' },
    // { action: ACTION_TYPES.DELETE, icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Delete', className: 'text-red-100' },
  ],
  page2: [
    { action: 'ACTION_3', icon: () => <IconWrapper size={0} customIconSize={5} isErrorIcon icon={Trash} />, label: 'Action 3' },
    { action: 'ACTION_4', icon: () => <IconWrapper size={0} customIconSize={5} icon={CircleX} />, label: 'Action 4' },
  ],
  // Add more page-specific menu items as needed
};

const ThreeDots = ({ job, handleAction, page }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getMenuItems = () => {
    if (job && job.status) {
      return MenuItems.job[job.status] || [];
    }
    return MenuItems[page] || [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none flex items-center">
        <IconWrapper icon={EllipsisVertical} customIconSize={7} customStrokeWidth={7} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-70 shadow-lg cursor-pointer rounded-md z-10">
          <ul className="py-1">
            {menuItems.map(({ action, icon: Icon, label, className }) => (
              <li
                key={action}
                className={`px-4 py-2 flex items-center gap-1 typography-body ${className || ''}`}
                onClick={(e) => {
                  handleAction(action, job ? job._id : null);
                  e.stopPropagation();
                }}
              >
                <button className="text-black rounded m-1">
                  <Icon />
                </button>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDots;