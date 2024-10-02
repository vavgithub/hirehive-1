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
  BUDGET: 'BUDGET',
  MOVE: 'MOVE',
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
    title: 'Reject Candidate',
    confirmLabel: 'Reject',
    confirmVariant: 'cancel',
    requiresReason: true,
  },
  [ACTION_TYPES.ARCHIVE]: {
    title: 'Confirm Archive',
    confirmLabel: 'Archive',
    confirmVariant: 'secondary',
  },
  [ACTION_TYPES.MOVE]: {
    title: 'Move to Next Stage',
    confirmLabel: 'Move',
    confirmVariant: 'primary',
  },
};

const CLOSE_REASONS = [
  { value: 'Hired', label: 'Hired' },
  { value: 'Lack of suitable candidates', label: 'Lack of suitable candidates' },
  { value: 'Budget Constraints', label: 'Budget Constraints' },
  { value: 'Changes in business needs', label: 'Changes in business needs' },
  { value: 'Don’t want more entries', label: 'Don’t want more entries' },
];

const REJECTION_REASONS = [
  "Candidate's scores did not meet the criteria",
  "Candidate did not appear for the screening",
  "Candidate did not appear for round one",
  "Candidate did not appear for round two",
  "Candidate did not submit the design task"
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
  cancelLabel = "Cancel",
  confirmVariant,
  cancelVariant = "secondary",
  children,
  candidateName,
  jobTitle,
  companyName
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const action = ACTION_PROPERTIES[actionType] || {};

  const title = customTitle || action.title || 'Confirm Action';
  const message = customMessage || `Are you sure you want to perform this action?`;
  const confirmLabel = customConfirmLabel || action.confirmLabel || 'Confirm';
  const buttonVariant = confirmVariant || action.confirmVariant || 'primary';

  const handleReasonSelect = (reason) => {
    setRejectionReason(reason);
    if (actionType === ACTION_TYPES.REJECT) {
      setShowEmailPreview(true);
    }
  };

  const handleConfirm = () => {
    if (actionType === ACTION_TYPES.REJECT) {
      if (!rejectionReason) {
        alert('Please select a reason for rejecting the candidate.');
        return;
      }
      onConfirm(item, rejectionReason);
    } else {
      onConfirm(item);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-background-60 rounded-xl shadow transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <div className='p-6'>
          <h1 className="typography-h1">{title}</h1>
          {actionType === ACTION_TYPES.REJECT ? (
            <p className="text-font-gray typography-body">Are you sure you want to reject "{candidateName}"?</p>
          ) : (
            <p className="text-font-gray typography-body">{message}</p>
          )}
          
          {action.requiresReason && actionType === ACTION_TYPES.REJECT && !showEmailPreview && (
            <div className="mt-4">
              <label htmlFor="rejectionReason" className="block typography-body">
                Please provide the reason for rejecting this candidate
              </label>
              <select
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => handleReasonSelect(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background-100 border-gray-300 focus:outline-none focus:ring-teal-400 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select reason for rejection</option>
                {REJECTION_REASONS.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
          )}

          {actionType === ACTION_TYPES.REJECT && showEmailPreview && (
            <>
              <p className="text-gray-300 mb-2">This rejection email will be sent to the candidate</p>
              <div className="bg-background-100 p-4 rounded mb-4">
                <p className="text-white">Dear {candidateName},</p>
                <p className="text-white mt-2">
                  Thank you for applying for the {jobTitle} position at {companyName}. 
                  After careful review, we have decided to move forward with other candidates.
                </p>
                <p className="text-white mt-2">
                  We appreciate your interest in our company and wish you all the best in your job search.
                </p>
                <p className="text-white mt-2">
                  Best regards,<br />
                  HR Manager<br />
                  {companyName}
                </p>
              </div>
            </>
          )}

          {children}

          <div className="flex justify-end gap-4 mt-4">
            <div className="w-[180px]">
              <Button variant={cancelVariant} onClick={onClose}>
                {cancelLabel}
              </Button>
            </div>
            <div className="w-[180px]">
              <Button 
                variant={buttonVariant} 
                onClick={handleConfirm}
                disabled={actionType === ACTION_TYPES.REJECT && !rejectionReason}
              >
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