// config/jobStages.js


export const jobStages = {
  'UI UX': [
    { name: 'Portfolio', requiresCall: false },
    { name: 'Screening', requiresCall: true },
    { name: 'Design Task', requiresCall: false },
    { name: 'Round 1', requiresCall: true },
    { name: 'Round 2', requiresCall: true },
    { name: 'Hired', requiresCall: false },
  ],
  'Frontend Developer': [
    { name: 'Resume Review', requiresCall: false },
    { name: 'Technical Test', requiresCall: false },
    { name: 'Interview', requiresCall: true },
    { name: 'Offer', requiresCall: false },
  ],
  // Add more job profiles and their stages as needed
};