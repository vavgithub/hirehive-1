import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';


const updateCallStatuses = async () => {
  const now = new Date();
  
  try {
    const result = await candidates.updateMany(
      {
        'jobApplications.stageStatuses.Screening.status': 'Call Scheduled',
        'jobApplications.stageStatuses.Screening.currentCall.scheduledDate': { $lt: now }
      },
      {
        $set: { 'jobApplications.$[].stageStatuses.Screening.status': 'Under Review' }
      }
    );
    
    console.log(`[${new Date().toISOString()}] Updated ${result.modifiedCount} documents`);
  } catch (error) {
    console.error('[${new Date().toISOString()}] Error updating call statuses:', error);
  }
};

const startScheduledJobs = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;