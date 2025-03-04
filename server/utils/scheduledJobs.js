import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import mongoose from 'mongoose';

const updateCallStatuses = async () => {
  const now = new Date();
  const stages = ['Screening', 'Round 1'];
  
  console.log(`Job running at server time: ${now.toISOString()}`);
  
  try {
    for (const stage of stages) {
      // Find candidates with Call Scheduled status
      const candidatesList = await candidates.find({
        [`jobApplications.stageStatuses.${stage}.status`]: 'Call Scheduled'
      }).lean();
      
      console.log(`Found ${candidatesList.length} candidates with "Call Scheduled" status for ${stage}`);
      
      let updatesCompleted = 0;
      
      // Process each candidate
      for (const candidate of candidatesList) {
        // We'll update each job directly in MongoDB one by one
        for (const jobApp of candidate.jobApplications) {
          // Skip if this job doesn't have stageStatuses or the specific stage
          if (!jobApp.stageStatuses || !jobApp.stageStatuses[stage]) continue;
          
          // Skip if status is not Call Scheduled
          if (jobApp.stageStatuses[stage].status !== 'Call Scheduled') {
            console.log(`Skipping job ${jobApp.jobId} for ${stage} - status is ${jobApp.stageStatuses[stage].status} not Call Scheduled`);
            continue;
          }
          
          // Skip if missing call information
          const currentCall = jobApp.stageStatuses[stage].currentCall;
          if (!currentCall || !currentCall.scheduledDate || !currentCall.scheduledTime) continue;
          
          // Check if time has passed
          const scheduledDate = new Date(currentCall.scheduledDate);
          const [hours, minutes] = currentCall.scheduledTime.split(':').map(Number);
          
          // Set the hours and minutes on the scheduled date
          const callDateTime = new Date(scheduledDate);
          callDateTime.setUTCHours(hours, minutes, 0, 0);
          
          console.log(`Job ${jobApp.jobId} scheduled for ${callDateTime}, current time: ${now}`);
          
          // Check if time has passed
          if (callDateTime < now) {
            // Use the direct positional operator $ to update this specific job application
            const jobId = typeof jobApp.jobId === 'string' 
              ? new mongoose.Types.ObjectId(jobApp.jobId) 
              : jobApp.jobId;
            
            // Use a direct update operation - get the indexed position first
            const candidateToUpdate = await candidates.findOne(
              { _id: candidate._id },
              { jobApplications: 1 }
            );
            
            // Find the job application index
            let jobIndex = -1;
            if (candidateToUpdate && candidateToUpdate.jobApplications) {
              jobIndex = candidateToUpdate.jobApplications.findIndex(job => 
                job.jobId.toString() === jobId.toString()
              );
            }
            
            if (jobIndex >= 0) {
              // Use the exact array index for the update
              const result = await candidates.updateOne(
                { _id: candidate._id },
                { $set: { [`jobApplications.${jobIndex}.stageStatuses.${stage}.status`]: 'Under Review' } }
              );
              
              if (result.modifiedCount > 0) {
                console.log(`Updated job ${jobApp.jobId} to Under Review`);
                updatesCompleted++;
              } else {
                console.log(`Failed to update job ${jobApp.jobId}`);
              }
            } else {
              console.log(`Could not find job ${jobApp.jobId} in candidate ${candidate._id}`);
            }
          }
        }
      }
      
      console.log(`Total updates for ${stage}: ${updatesCompleted}`);
    }
  } catch (error) {
    console.error(`Error updating call statuses:`, error);
    console.error(error);
  }
};

const startScheduledJobs = () => {
  // Run every 30 seconds
  cron.schedule('*/30 * * * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;