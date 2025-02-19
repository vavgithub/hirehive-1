import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import { getDesignTaskContent, getRejectionEmailContent } from './emailTemplates.js';
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
          jobApplications: {
            $elemMatch: {
              [`stageStatuses.${stage}.status`]: stage === "Design Task" 
                ? { $in: ["Pending", "Reviewed"] }
                : "Reviewed",
              [`stageStatuses.${stage}.scheduledDate`]: {
                $exists: true,
                $ne: null,
                $lt: now
              }
            }
          }
        },
        {
          "_id": 1,
          "firstName": 1,
          "lastName": 1,
          "email": 1,
          "jobApplications.$": 1
        }
      );
      
      for(let candidate of result){
        const currentStageStatus = candidate?.jobApplications[0]?.stageStatuses.get(stage)?.status;
        if(candidate?.jobApplications[0]?.currentStage === "Design Task" && candidate?.jobApplications[0]?.stageStatuses.get("Design Task")?.status === "Pending"){
          // Send design email to candidate
          const emailSubject = `Value At Void : ${candidate?.jobApplications[0]?.jobApplied} | Design Task for ${candidate.firstName} (3 days)`;
          const emailContent = getDesignTaskContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.taskDescription,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledDate,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledTime)
  
          await sendEmail(candidate?.email, emailSubject, emailContent,"Design Task");
        }else{
          // Send rejection email
          const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied);

          await sendEmail(candidate.email, "Application Status Update", emailContent);
        }

        await candidates.updateOne(
          {
            _id: candidate._id, // Match the candidate
            "jobApplications.jobId": candidate?.jobApplications[0]?.jobId// Ensure we're updating the correct jobApplication
          },
          {
            $set: {
              [`jobApplications.$.stageStatuses.${stage}.status`]: (stage === "Design Task" && currentStageStatus === "Pending" ) ? "Sent" :"Rejected",
              [`jobApplications.$.stageStatuses.${stage}.scheduledDate`] : null
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