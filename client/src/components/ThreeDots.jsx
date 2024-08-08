import React, { useState, useEffect, useRef } from 'react';
import { ACTION_TYPES } from '../utility/ActionTypes';
import ThreeDotsIcon from '../svg/ThreeDotsIcon';
import EditIcon from '../svg/KebabList/EditIcon';
import ArchiveIcon from '../svg/KebabList/ArchivedIcon';
import DeleteIcon from '../svg/KebabList/DeleteIcon';
import CloseIcon from '../svg/KebabList/CloseIcon';

const MenuItems = {
  open: [
    { action: ACTION_TYPES.EDIT, icon: EditIcon, label: 'Edit' },
    { action: ACTION_TYPES.DRAFT, icon: ArchiveIcon, label: 'Move To Draft' },
    { action: ACTION_TYPES.CLOSE, icon: CloseIcon, label: 'Close job' },
    { action: ACTION_TYPES.DELETE, icon: DeleteIcon, label: 'Delete', className: 'text-red-100' },
  ],
  closed: [
    { action: ACTION_TYPES.EDIT, icon: EditIcon, label: 'Edit' },
    { action: ACTION_TYPES.DRAFT, icon: ArchiveIcon, label: 'Move To Draft' },
    { action: ACTION_TYPES.DELETE, icon: DeleteIcon, label: 'Delete' },
  ],
  draft: [
    { action: ACTION_TYPES.EDIT, icon: EditIcon, label: 'Edit' },
    { action: ACTION_TYPES.DELETE, icon: DeleteIcon, label: 'Delete' },
  ],
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

  const menuItems = MenuItems[job.status] || [];

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <ThreeDotsIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-70 shadow-lg rounded-md z-10">
          <ul className="py-1">
            {menuItems.map(({ action, icon: Icon, label, className }) => (
              <li
                key={action}
                className={`px-4 py-2 flex items-center gap-1 typography-body ${className || ''}`}
                onClick={(e) => {
                  handleAction(action, job._id);
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