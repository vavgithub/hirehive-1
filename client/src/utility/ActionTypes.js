export const ACTION_TYPES = {
  DELETE: 'DELETE',
  EDIT: 'EDIT',
  DRAFT: 'DRAFT',
  CLOSE: 'CLOSE',
  REOPEN: 'RE OPEN',
  REJECT: 'REJECT',
  ARCHIVE: 'ARCHIVE',
  BUDGET: 'BUDGET',
  MOVE: 'MOVE',
  ASSESSMENT: 'ASSESSMENT',
  CAMERAERROR: 'CAMERA ERROR',
  AUDIOERROR: 'AUDIO ERROR',
  MEDIAERROR: 'MEDIA ERROR',
  COMPANYEXIST: 'COMPANY EXIST',
  SHARE:'SHARE',
  PIN : 'PIN',
  UNPIN : 'UNPIN',
};


export const getModalMessage = (action, jobTitle) => {
    switch (action) {
        case ACTION_TYPES.DELETE:
            return `Are you sure you want to delete the "${jobTitle}" job post?`;
        case ACTION_TYPES.EDIT:
            return `Are you sure you want to edit the "${jobTitle}" job post?`;
        case ACTION_TYPES.DRAFT:
            return `Are you sure you want to move "${jobTitle}" to drafts?`;
        case ACTION_TYPES.CLOSE:
            return `Are you sure you want to close the "${jobTitle}" job post?`;
        case ACTION_TYPES.REJECT:
            return `Are you sure you want to reject the candidate for "${jobTitle}"?`;
        case ACTION_TYPES.ARCHIVE:
            return `Are you sure you want to archive the "${jobTitle}" job post?`;
        case ACTION_TYPES.REOPEN:
            return `Are you sure you want to reOpen the "${jobTitle}" job post?`;
        default:
            return `Are you sure you want to perform this action on "${jobTitle}"?`;
    }
};