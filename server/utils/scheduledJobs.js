import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import mongoose from 'mongoose';
import moment from 'moment-timezone';

const updateCallStatuses = async () => {
  const now = new Date();
  const stages = ['Screening', 'Round 1', 'Round 2'];

  console.log(`Job running at server time: ${now.toISOString()}`);

  try {
    for (const stage of stages) {
      const candidatesList = await candidates.find({
        [`jobApplications.stageStatuses.${stage}.status`]: 'Call Scheduled'
      }).lean();

      console.log(`Found ${candidatesList.length} candidates with "Call Scheduled" status for ${stage}`);

      let bulkOps = [];

      for (const candidate of candidatesList) {
        for (const jobApp of candidate.jobApplications) {
          if (!jobApp.stageStatuses || !jobApp.stageStatuses[stage]) continue;
          if (jobApp.stageStatuses[stage].status !== 'Call Scheduled') continue;

          const currentCall = jobApp.stageStatuses[stage].currentCall;
          if (!currentCall || !currentCall.scheduledDate || !currentCall.scheduledTime) continue;

          const scheduledDate = new Date(currentCall.scheduledDate);
          const [hours, minutes] = currentCall.scheduledTime.split(':').map(Number);

          const callDateTime = moment(scheduledDate)
            .tz('Asia/Kolkata')
            .set({ hour: hours, minute: minutes, second: 0 })
            .utc()
            .toDate();

          if (callDateTime < now) {
            const jobId = typeof jobApp.jobId === 'string'
              ? new mongoose.Types.ObjectId(jobApp.jobId)
              : jobApp.jobId;

            const jobIndex = candidate.jobApplications.findIndex(job =>
              job.jobId.toString() === jobId.toString()
            );

            if (jobIndex >= 0) {
              bulkOps.push({
                updateOne: {
                  filter: { _id: candidate._id },
                  update: { $set: { [`jobApplications.${jobIndex}.stageStatuses.${stage}.status`]: 'Under Review' } }
                }
              });
            }
          }
        }
      }

      if (bulkOps.length > 0) {
        const result = await candidates.bulkWrite(bulkOps);
        console.log(`Total updates for ${stage}: ${result.modifiedCount}`);
      } else {
        console.log(`No updates needed for ${stage}`);
      }
    }
  } catch (error) {
    console.error(`Error updating call statuses:`, error);
  }
};


const startScheduledJobs = () => {
  // Run every 30 seconds
  cron.schedule('*/5 * * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;