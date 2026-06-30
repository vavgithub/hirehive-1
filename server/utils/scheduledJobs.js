import cron from 'node-cron';
import { candidates } from '../models/candidate/candidate.model.js';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import { getDesignTaskContent, getRejectionEmailContent } from './emailTemplates.js';
import { sendEmail } from './sentEmail.js';
import { REJECTION_REASON } from '../controllers/admin/hr.controller.js';
import { removeEmojis } from './emojiRemover.js';
import { sendUpdatesToTelegram } from '../controllers/candidate/bot.controller.js';
import { captureError } from "./errorHandler.js";
import { expireDataRetentionWindows } from '../controllers/admin/billing.controller.js';

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

          if (scheduledDate < now) {
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

              // Then upsert/update the logs
              const logsPath = `jobApplications.${jobIndex}.stageStatuses.${stage}.logs`;
              const logs = jobApp.stageStatuses[stage].logs || [];
              const existingLogIndex = logs.findIndex(log => log.status === 'Under Review');

              if (existingLogIndex !== -1) {
                // Overwrite date of existing log entry
                bulkOps.push({
                  updateOne: {
                    filter: { _id: candidate._id },
                    update: {
                      $set: {
                        [`${logsPath}.${existingLogIndex}.date`]: new Date()
                      }
                    }
                  }
                });
              } else {
                // Push new log entry
                bulkOps.push({
                  updateOne: {
                    filter: { _id: candidate._id },
                    update: {
                      $push: {
                        [logsPath]: {
                          status: 'Under Review',
                          date: new Date()
                        }
                      }
                    }
                  }
                });
              }
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
    captureError(error, { file: "scheduledJobs.js", action: "scheduledJob" });
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
                : stage === "Portfolio" ? { $in: ["Not Assigned","Pending", "Reviewed"] } : { $in: [ "Reviewed","No Show"] },
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
          "jobApplications.$": 1,
          "integrations" : 1
        }
      );
      
      for(let candidate of result){
        const currentStageStatus = candidate?.jobApplications[0]?.stageStatuses.get(stage)?.status;
        const logs = candidate?.jobApplications[0]?.stageStatuses.get(stage)?.logs ?? [];

        if(candidate?.jobApplications[0]?.currentStage === "Design Task" && candidate?.jobApplications[0]?.stageStatuses.get("Design Task")?.status === "Pending"){
          // Send design email to candidate
          const removedDescription = removeEmojis(candidate?.jobApplications[0]?.stageStatuses.get(stage)?.taskDescription)
          const emailSubject = `Value At Void : ${candidate?.jobApplications[0]?.jobApplied} | Design Task for ${candidate.firstName}`;
          const emailContent = getDesignTaskContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied,removedDescription,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledDate,candidate?.jobApplications[0]?.stageStatuses.get(stage)?.currentCall?.scheduledTime)
          
          //write Logs
          let hasUpdated = false;
          if(logs?.length > 0){
            for(let log of logs){
              if(log.status === 'Sent'){
                log.date = new Date()
                hasUpdated = true
              }
            }
          }
          if(!hasUpdated){
            logs.push({status: "Sent", date : new Date()})
          }
          await sendEmail(candidate?.email, emailSubject, emailContent,"Design Task");
          if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
            const updateType = `${candidate?.jobApplications[0].currentStage.toUpperCase()}_SENT`;
            sendUpdatesToTelegram(candidate,candidate?.jobApplications[0],candidate.integrations?.telegram?.user_id,updateType,candidate?.jobApplications[0].stageStatuses.get(stage).currentCall.scheduledDate)
          }
        }else{
          //Selective Email sending
          const canSendEmail = !!REJECTION_REASON.find(reasonObj =>(reasonObj?.reason === candidate?.jobApplications[0]?.stageStatuses.get(stage)?.rejectionReason?.trim() && reasonObj?.email))
          if(canSendEmail){
            // Send rejection email
            const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,candidate?.jobApplications[0]?.jobApplied);
            //write Logs
            let hasUpdated = false;
            if(logs?.length > 0){
              for(let log of logs){
                if(log.status === 'Rejected'){
                  log.date = new Date()
                  hasUpdated = true
                }
              }
            }
            if(!hasUpdated){
              logs.push({status: "Rejected", date : new Date()})
            }
            await sendEmail(candidate.email, "Application Status Update", emailContent);
            if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
              const updateType = `${candidate?.jobApplications[0].currentStage.toUpperCase()}_REJECTED`;
              sendUpdatesToTelegram(candidate,candidate?.jobApplications[0],candidate.integrations?.telegram?.user_id,updateType,candidate?.jobApplications[0].stageStatuses.get(stage).currentCall.scheduledDate)
            }
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
              [`jobApplications.$.stageStatuses.${stage}.scheduledDate`] : null,
              [`jobApplications.$.stageStatuses.${stage}.logs`] : logs,
            }
          }
        );
      } 
    }
  } catch (error) {
    captureError(error, { file: "scheduledJobs.js", action: "scheduledJob" });
    console.error(`[${new Date().toISOString()}] Error updating call statuses:`, error);
  }
};

const expireSubscriptionRetentionWindows = async () => {
  try {
    const expiredCount = await expireDataRetentionWindows();
    if (expiredCount > 0) {
      console.log(`[${new Date().toISOString()}] Moved ${expiredCount} workspace(s) to Free after data-retention window`);
    }
  } catch (error) {
    captureError(error, { file: "scheduledJobs.js", action: "expireDataRetentionWindows" });
    console.error(`[${new Date().toISOString()}] Error expiring data-retention windows:`, error);
  }
};

const startScheduledJobs = () => {
  // Run every 30 seconds
  cron.schedule('*/1 * * * *', () => {
    console.log(`[${new Date().toISOString()}] Running scheduled job to update call statuses`);
    updateCallStatuses();
    updateMailSendAndStatuses()
  });

  // Hourly: move workspaces to Free once their data-retention window has ended
  cron.schedule('0 * * * *', () => {
    expireSubscriptionRetentionWindows();
  });

  console.log('Scheduled jobs started');
};

export default startScheduledJobs;