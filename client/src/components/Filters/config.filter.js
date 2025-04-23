// src/config.filter.js

export const stageStatusMap = {
    Portfolio: ['Not Assigned', 'Under Review', 'Reviewed', 'Completed', 'Rejected'],
    Screening: ['Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Completed', 'No Show', 'Rejected'],
    'Design Task': ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Completed', 'Rejected', 'Not Submitted'],
    'Round 1': ['Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Completed', 'No Show', 'Rejected'],
    'Round 2': ['Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Completed', 'No Show', 'Rejected'],
  };
  
export const allStatuses = [
    'Not Assigned',
    'Under Review',
    'Reviewed',
    'Completed',
    'Rejected',
    'Pending',
    'Call Scheduled',
    'No Show',
    'Sent',
    'Not Submitted',
  ];
  