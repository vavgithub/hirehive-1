import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';

const updateCallStatuses = async () => {
  const now = new Date();
  const stages = ['Screening', 'Round 1', 'Round 2'];
  
  try {
    for (const stage of stages) {
      const result = await candidates.updateMany(
        {
          [`jobApplications.stageStatuses.${stage}.status`]: 'Call Scheduled',
          [`jobApplications.stageStatuses.${stage}.currentCall.scheduledDate`]: { $lt: now }
        },
        {
          $set: { [`jobApplications.$[].stageStatuses.${stage}.status`]: 'Under Review' }
        }
      );
      
      // console.log(`[${new Date().toISOString()}] Updated ${result.modifiedCount} documents for ${stage}`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error updating call statuses:`, error);
  }
};

const startScheduledJobs = () => {
  // Run every 5 minutes
  cron.schedule('*/1 * * * *', () => {
    // console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;