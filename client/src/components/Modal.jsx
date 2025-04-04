import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import AssessmentPopup from "../svg/Background/AssessmentPopup.svg"
import { useMediaQuery } from 'react-responsive';
import CloseButton from '../svg/CloseButton';
import { CustomDropdown } from './Form/FormFields';
import Label from './ui/Label';
import RedInfoIcon from '../svg/RedInfoIcon';
import StyledCard from './ui/StyledCard';
import SchedulerButton from './ui/SchedulerButton';

const ACTION_TYPES = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  DRAFT: 'DRAFT',
  CLOSE: 'CLOSE',
  REJECT: 'REJECT',
  ARCHIVE: 'ARCHIVE',
  BUDGET: 'BUDGET',
  MOVE: 'MOVE',
  ASSESSMENT: 'ASSESSMENT',
  CAMERAERROR: 'CAMERA ERROR',
  AUDIOERROR: 'AUDIO ERROR',
  MEDIAERROR: 'MEDIA ERROR',
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
    confirmVariant: 'primary',
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
  [ACTION_TYPES.ASSESSMENT]: {
    title: 'Start the assessment!',
    mobTitle: 'Take Your Assessment on Desktop',
    confirmLabel: 'Take Assessment',
    confirmVariant: 'primary',
    cancelLabel: 'Cancel',
    message: 'Take the assessment now to get prioritized and improve your likelihood of advancing quickly.',
    mobMessage: 'Open the application on your desktop and take the assessment to get prioritized and improve your chances of advancing quickly.'
  },
  [ACTION_TYPES.CAMERAERROR]: {
    title: 'Camera Access Denied',
    message : "We need access to your camera to proceed. Please allow camera access in your browser settings (address bar) to continue."
  },
  [ACTION_TYPES.AUDIOERROR]: {
    title: 'Audio Access Denied',
    message : "We need access to your microphone to proceed. It seems you've denied permission. Please enable it in your browser settings (address bar)."
  },
  [ACTION_TYPES.MEDIAERROR]: {
    title: 'Media Access Denied',
    message : "We need access to your camera and microphone to proceed. It seems you've denied permission for both, please enable them in your browser settings (address bar)."
  },
};

const CLOSE_REASONS = [
  { value: 'Hired', label: 'Hired' },
  { value: 'Lack of suitable candidates', label: 'Lack of suitable candidates' },
  { value: 'Budget Constraints', label: 'Budget Constraints' },
  { value: 'Changes in business needs', label: 'Changes in business needs' },
  { value: 'Dont want more entries', label: 'Dont want more entries' },
];

export const REJECTION_REASONS = [
  "Candidate's scores did not meet the criteria",
  // "Candidate did not appear for the screening",
   // "Candidate did not appear for round one",
   // "Candidate did not appear for round two",
   // "Candidate did not submit the design task"
   "Candidate has reapplied but was previously rejected",
   "Candidate's portfolio/work samples did not meet expectations",
   "Candidate displayed unprofessional or bad attitude",
   "Candidate's skills do not align with job requirements",
   "Candidate withdrew their application",
   "Candidate requested an unrealistic salary",
   "Candidate was unresponsive to communication",
   "Candidate provided misleading or false information"
 
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
  isReadyToClose = true,
  actionType,
  onConfirm,
  item,
  customTitle,
  customMessage,
  customConfirmLabel,
  isconfirmButtonDisabled,
  cancelLabel = "Cancel",
  confirmVariant,
  cancelVariant = "secondary",
  children,
  candidateName,
  candidateScore,
  maxScoreOfStage,
  jobTitle,
  companyName,
  closeReason,
  onCloseReasonChange,
  specifiedWidth,
  noCancel = false,
  useScheduledReject = false
}) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const action = ACTION_PROPERTIES[actionType] || {};

  const navigate = useNavigate();

  // Find if it is mobile-screen
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  const title = customTitle || action.title || 'Confirm Action';
  const message = customMessage || action.message || `Are you sure you want to perform this action?`;
  const confirmLabel = customConfirmLabel || action.confirmLabel || 'Confirm';
  const buttonVariant = confirmVariant || action.confirmVariant || 'primary';

  const handleReasonSelect = (reason) => {
    if (actionType === ACTION_TYPES.REJECT) {
      setRejectionReason(reason);
      setShowEmailPreview(true);
    } else if (actionType === ACTION_TYPES.CLOSE) {
      onCloseReasonChange(reason);
    }
  };
  const handleConfirm = ( scheduledDate, scheduledTime ) => {
    if (actionType === ACTION_TYPES.ASSESSMENT) {
        navigate('/assessment');
    } else if (actionType === ACTION_TYPES.REJECT) {
        if (!rejectionReason) {
            alert('Please select a reason for rejecting the candidate.');
            return;
        }
        if(scheduledDate && scheduledTime){
          onConfirm(item, rejectionReason , scheduledDate?.toISOString(), scheduledTime?.format('HH:mm'));
        }else{
          onConfirm(item, rejectionReason);
        }
    } else if (actionType === ACTION_TYPES.CLOSE) {
        if (!closeReason) {
            alert('Please select a reason for closing the job.');
            return;
        }
        onConfirm(item); // The closeReason is already available in the parent component
    }else if(useScheduledReject){
      if(scheduledDate && scheduledTime){
        onConfirm(item , scheduledDate?.toISOString(), scheduledTime?.format('HH:mm'));
      }else{
        onConfirm(item);
      }
    } else {
        onConfirm?.(item);
    }
   isReadyToClose && onClose();
};

 // Reset rejection states when modal is closed
 useEffect(() => {
  if (!open) {
    setRejectionReason('');
    setShowEmailPreview(false);
  }
}, [open]);


  if (!open) return null;

  const renderModalContent = () => {
    if (actionType === ACTION_TYPES.ASSESSMENT) {
      return (
        <div className="flex flex-col items-center relative">
          <div onClick={onClose} className=' cursor-pointer md:hidden absolute -top-14 -right-14 bg-background-60 p-1 rounded-xl'>
              <CloseButton/>
          </div>
          <div className="mb-4">
            <img
              src={AssessmentPopup}
              alt="Assessment"
              className="h-auto"
              onError={(e) => {
                e.target.src = '/api/placeholder/256/256';
              }}
            />
          </div>
          <h1 className={(isMobile  ?  "typography-h3" : "typography-h1") + " mb-2"}>{isMobile  ? action.mobTitle :title}</h1>
          <p className={(isMobile ? "typography-large-p" :  "typography-body mb-6") +" text-font-gray typography-body "}>{isMobile  ? action.mobMessage :message}</p>
        </div>
      );
    }

    if (actionType === ACTION_TYPES.REJECT) {
      return (
        <>
          <h1 className="typography-h1">{title}</h1>
          <p className="text-font-gray typography-body mb-4">
            Are you sure you want to reject "{candidateName}"?
          </p>

          <Label icon={RedInfoIcon} text={`The candidate has scored ${candidateScore}`} spanContent={`/${maxScoreOfStage}`} />
          
          {!showEmailPreview && action.requiresReason && (
            <div className="mt-4">
              {/* <label htmlFor="rejectionReason" className="block typography-body">
                Please provide the reason for rejecting this candidate
              </label> */}
              <CustomDropdown 
              extraStylesForLabel="font-bricolage font-semibold" 
              label={'Please provide the reason for rejecting this candidate'} 
              options={REJECTION_REASONS} 
              value={rejectionReason}
              onChange={handleReasonSelect}
              />
              {/* <select
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => handleReasonSelect(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background-100 border-gray-300 focus:outline-none focus:ring-teal-400 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select reason for rejection</option>
                {REJECTION_REASONS.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select> */}
            </div>
          )}

          {showEmailPreview && (
            <>
              <p className="text-gray-300 mt-4 font-outfit mb-2">This rejection email will be sent to the candidate</p>
              <div className="bg-background-100 p-4 rounded mb-4 font-outfit">
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
        </>
      );
    }

    if (actionType === ACTION_TYPES.CLOSE && action.requiresReason) {
      return (
        <>
          <h1 className="typography-h1">{title}</h1>
          <p className="text-font-gray typography-body">{message}</p>
          <div className="mt-4">
            <label htmlFor="closeReason" className="block typography-body">
              Please select a reason for closing this job
            </label>
            <select
              id="closeReason"
              value={closeReason}
              onChange={(e) => handleReasonSelect(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-background-100 border-gray-300 focus:outline-none focus:ring-teal-400 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select reason</option>
              {CLOSE_REASONS.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="typography-h1">{title}</h1>
        <p className="text-font-gray typography-body">{message}</p>
      </>
    );
  };

  return (
    <div
      onClick={onClose}
      className={((isMobile && actionType === ACTION_TYPES.ASSESSMENT ) ? "px-6 " : "px-4 ") + " fixed z-50 inset-0 flex justify-center items-center bg-background-overlay transition-colors bg-black/20  md:mx-0"}
    >
      <StyledCard
        onClick={(e) => e.stopPropagation()}
        backgroundColor={"bg-background-80 "}
        padding={0}
        extraStyles={"shadow w-full  mx-4 transform transition-transform duration-200 ease-out " + (specifiedWidth ? specifiedWidth : actionType === ACTION_TYPES.BUDGET ? "max-w-xl" : "max-w-lg")}
      >
        <div className="p-6">
          {renderModalContent()}
          {children}
          <div className="flex justify-end gap-4 mt-4">
            <div className={(isMobile && actionType === ACTION_TYPES.ASSESSMENT ) ? "hidden" : ""}>
              {!noCancel && 
              <Button variant={cancelVariant} onClick={onClose}>
                {cancelLabel}
              </Button>}
            </div>
            {( actionType !== ACTION_TYPES.ASSESSMENT || (!isMobile && actionType === ACTION_TYPES.ASSESSMENT)) 
            && actionType !== ACTION_TYPES.CAMERAERROR 
            && actionType !== ACTION_TYPES.AUDIOERROR 
            && actionType !== ACTION_TYPES.REJECT 
            && !useScheduledReject
            && actionType !== ACTION_TYPES.MEDIAERROR && 
              <Button
                variant={buttonVariant}
                onClick={handleConfirm}
                disabled={
                  isconfirmButtonDisabled || (actionType === ACTION_TYPES.REJECT && !rejectionReason) ||
                  (actionType === ACTION_TYPES.CLOSE && !closeReason)
                }
              >
                {confirmLabel}
              </Button>
            }
            {
             (actionType === ACTION_TYPES.REJECT || useScheduledReject) && 
             <SchedulerButton onConfirm={handleConfirm} disabled={isconfirmButtonDisabled || (useScheduledReject ? false : !rejectionReason)} buttonText={"Reject"}  modalTitle={"Schedule Email"} modalMessage={"Schedule rejection email with specified date and time"} buttonVariant={"cancel"} />
            }
          </div>
        </div>
      </StyledCard>
    </div>
  );
};

export default Modal;