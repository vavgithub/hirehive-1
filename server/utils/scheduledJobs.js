import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import { getDesignTaskContent, getRejectionEmailContent } from './emailTemplates.js';
import { sendEmail } from './sentEmail.js';
import { REJECTION_REASON } from '../controllers/admin/hr.controller.js';

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
                ? { $in: ["Pending", "Reviewed","Sent"] }
                : stage === "Portfolio" ? { $in: ["Not Assigned","Pending", "Reviewed"] } : "Reviewed",
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
          //Selective Email sending
          const canSendEmail = !!REJECTION_REASON.find(reasonObj =>(reasonObj?.reason === candidate?.jobApplications[0]?.stageStatuses.get(stage)?.rejectionReason?.trim() && reasonObj?.email))
          if(canSendEmail){
            // Send rejection email
            const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied);
  
            await sendEmail(candidate.email, "Application Status Update", emailContent);
          }
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
  // Run every 30 seconds
  cron.schedule('*/5 * * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
    updateMailSendAndStatuses()
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;