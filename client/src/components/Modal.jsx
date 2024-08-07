import React from 'react';
import { Button } from './ui/Button';

const ACTION_TYPES = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  DRAFT: 'DRAFT',
  CLOSE: 'CLOSE',
  REJECT: 'REJECT',
  ARCHIVE: 'ARCHIVE',
};

const ACTION_PROPERTIES = {
  [ACTION_TYPES.DELETE]: {
    title: 'Confirm Delete',
    confirmLabel: 'Delete',
    confirmVariant: 'cancel',
  },
  [ACTION_TYPES.EDIT]: {
    title: 'Confirm Edit',
    confirmLabel: 'Edit',
    confirmVariant: 'primary',
  },
  [ACTION_TYPES.DRAFT]: {
    title: 'Confirm Draft',
    confirmLabel: 'Draft',
    confirmVariant: 'secondary',
  },
  [ACTION_TYPES.CLOSE]: {
    title: 'Confirm Close',
    confirmLabel: 'Close',
    confirmVariant: 'primary',
  },
  [ACTION_TYPES.REJECT]: {
    title: 'Confirm Reject',
    confirmLabel: 'Reject',
    confirmVariant: 'cancel',
  },
  [ACTION_TYPES.ARCHIVE]: {
    title: 'Confirm Archive',
    confirmLabel: 'Archive',
    confirmVariant: 'secondary',
  },
};

const Modal = ({
  open,
  onClose,
  actionType,
  onConfirm,
  item,
  customTitle,
  customMessage,
  customConfirmLabel,
  cancelLabel = "Cancel",
  confirmVariant,
  cancelVariant = "secondary",
  children
}) => {
  const action = ACTION_PROPERTIES[actionType] || {};
  
  const title = customTitle || action.title || 'Confirm Action';
  const message = customMessage || `Are you sure you want to perform this action?`;
  const confirmLabel = customConfirmLabel || action.confirmLabel || 'Confirm';
  const buttonVariant = confirmVariant || action.confirmVariant || 'primary';

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-background-60 rounded-xl shadow  transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/* <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          x
        </button> */}
        <div className='p-6'>
          <h1 className="typography-h1">{title}</h1>
          <p className="text-font-gray typography-body">{message}</p>
          {children}
          <div className="flex justify-end gap-4 mt-4">
            <div className="w-[180px]">
              <Button variant={cancelVariant} onClick={onClose}>
                {cancelLabel}
              </Button>
            </div>
            <div className="w-[180px]">
              <Button variant={buttonVariant} onClick={() => onConfirm(item)}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;