import React, { useState } from 'react';
import { Button } from './ui/Button';
import Label from './ui/Label';

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
    title: 'Close Job Posting',
    confirmLabel: 'Close',
    confirmVariant: 'cancel',
    requiresReason: true,
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

const CLOSE_REASONS = [
  { value: 'Hired', label: 'Hired' },
  { value: 'Lack of suitable candidates', label: 'Lack of suitable candidates' },
  { value: 'Budget Constraints', label: 'Budget Constraints' },
  { value: 'Changes in business needs', label: 'Changes in business needs' },
  { value: 'Don’t want more entries', label: 'Don’t want more entries' },
];

const RedWarning = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M12.5 16V12M12.5 8H12.51M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z" stroke="#FF385C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const Modal = ({
  open,
  onClose,
  actionType,
  onConfirm,
  item,
  customTitle,
  customMessage,
  customConfirmLabel,
  closeReason,
  onCloseReasonChange,
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

  const handleConfirm = () => {
    if (actionType === ACTION_TYPES.CLOSE && !closeReason) {
      alert('Please select a reason for closing the job.');
      return;
    }
    onConfirm(item, closeReason);
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"
        }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-background-60 rounded-xl shadow  transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
      >
        <div className='p-6'>
          <h1 className="typography-h1">{title}</h1>
          <p className="text-font-gray typography-body">{message}</p>
          {action.requiresReason && (

            <div className="mt-4">

              <Label icon={<RedWarning />} text={"Candidates will no longer be able to apply to this job posting"}></Label>
              <label htmlFor="closeReason" className="block typography-body">
                Please provide the reason for closing this job post
              </label>
              <select
                id="closeReason"
                value={closeReason}
                onChange={(e) => onCloseReasonChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background-100 border-gray-300 focus:outline-none focus:ring-teal-400 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select reason for closing</option>
                {CLOSE_REASONS.map((reason) => (
                  <option key={reason.value} value={reason.value} className='mt-2'>
                    {reason.label}
                  </option>
                ))}
              </select>

            </div>
          )}

          {children}

          <div className="flex justify-end gap-4 mt-4">

            <div className="w-[180px]">
              <Button variant={cancelVariant} onClick={onClose}>
                {cancelLabel}
              </Button>
            </div>

            <div className="w-[180px]">
              <Button variant={buttonVariant} onClick={handleConfirm}>
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