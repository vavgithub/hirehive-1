// utils/addCandidates.js

import mongoose from 'mongoose';
import { candidates } from '../models/candidate/candidate.model.js';


/**
 * Adds candidates to a job
 * @param {String} jobId - The ID of the job to add candidates to
 * @param {Array} candidateData - An array of candidate objects
 */
export const addCandidates = async (jobId, candidateData) => {
    try {
      const candidateDocs = candidateData.map(candidate => ({
        ...candidate,
        jobId: new mongoose.Types.ObjectId(jobId)
      }));
  
      await candidates.insertMany(candidateDocs);
      console.log('Candidates added successfully');
    } catch (error) {
      console.error('Error adding candidates:', error);
    }
  };
