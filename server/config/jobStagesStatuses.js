export const jobStagesStatuses = {
  'UI UX': [
    { 
      name: 'Portfolio', 
      requiresCall: false,
      statuses: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected']
    },
    { 
      name: 'Screening', 
      requiresCall: true,
      statuses: ['Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected']
    },
    { 
      name: 'Design Task', 
      requiresCall: true,
      statuses: ['Pending','Not Assigned', 'Sent', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted']
    },
    { 
      name: 'Round 1', 
      requiresCall: true,
      statuses: ['Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected']
    },
    { 
      name: 'Round 2', 
      requiresCall: true,
      statuses: ['Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected']
    },
    { 
      name: 'Hired', 
      requiresCall: false,
      statuses: ['Pending', 'Offer Sent', 'Accepted', 'Rejected']
    }
  ],
  'Frontend Developer': [
    // Add stages and statuses for Frontend Developer role
    // Example:
    { 
      name: 'Resume Review', 
      requiresCall: false,
      statuses: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected']
    },
    // ... other stages
  ],
  // Add more job profiles as needed
};