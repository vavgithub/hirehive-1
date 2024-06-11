// runAddCandidates.js

import { addCandidates } from '../utility/addCandidates.js';

const jobId = '66680c1de9f8caa45eedbf2e'; // Replace with your actual job ID
const newCandidates = [
  { lastName: 'Smith', firstName: 'John', age: 28, status: 'Portfolio', stage: 'Not Assigned', experience: 5, latestScore: 4.8, email: 'john.smith@example.com', phone: '1234567891', resume: 'http://example.com/resume/john_smith.pdf' },
  { lastName: 'Doe', firstName: 'Jane', age: 32, status: 'Screening', stage: 'Call Pending', experience: 6, latestScore: 4.6, email: 'jane.doe@example.com', phone: '1234567892', resume: 'http://example.com/resume/jane_doe.pdf' },
  // Add more candidate objects as needed
];

addCandidates(jobId, newCandidates);
