import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import { getDesignTaskContent } from './emailTemplates.js';
import { sendEmail } from './sentEmail.js';

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

const updateMailSendAndStatuses = async () => {
  const now = new Date();
  const stages = ['Portfolio','Screening', 'Design Task' ,'Round 1', 'Round 2', 'Hired'];
  
  try {
    for (const stage of stages) {
      const result = await candidates.find(
        {
          $and: [
            stage === "Design Task"
              ? {
                  $or: [
                    { [`jobApplications.stageStatuses.${stage}.status`]: "Pending" },
                    { [`jobApplications.stageStatuses.${stage}.status`]: "Reviewed" }
                  ]
                }
              : { [`jobApplications.stageStatuses.${stage}.status`]: "Reviewed" },
            { [`jobApplications.stageStatuses.${stage}.scheduledDate`]: { $lt: now } }
          ]
        },
        {
          "_id": 1,
          "firstName" : 1,
          "lastName" : 1,
          "email" : 1,
          "jobApplications.$": 1 // Only return the matched jobApplication
        }
      );
      
      for(let candidate of result){

        // Send email to candidate
        const emailSubject = `Value At Void : ${candidate?.jobApplications[0]?.jobApplied} | Design Task for ${candidate.firstName} (3 days)`;
        const emailContent = getDesignTaskContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.taskDescription,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledDate,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledTime)

        await sendEmail(candidate?.email, emailSubject, emailContent,"Design Task");

        await candidates.updateOne(
          {
            _id: candidate._id, // Match the candidate
            "jobApplications.jobId": candidate?.jobApplications[0]?.jobId// Ensure we're updating the correct jobApplication
          },
          {
            $set: {
              [`jobApplications.$.stageStatuses.${stage}.status`]: stage === "Design Task" ? "Sent" :"Rejected",
            }
          }
        );
      } 
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
    updateMailSendAndStatuses()
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;