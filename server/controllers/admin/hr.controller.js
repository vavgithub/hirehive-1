import axios from "axios";
import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { undoConfig } from "../../config/undoConfig.js";
import { Company } from "../../models/admin/company.model.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { Task } from "../../models/admin/task.model.js";
import { User } from "../../models/admin/user.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { decrypt } from "../../utils/crypto.js";
import { getDesignTaskContent, getRejectionEmailContent } from "../../utils/emailTemplates.js";
import { removeEmojis } from "../../utils/emojiRemover.js";
import { updateDateWithTime } from "../../utils/formatter.js";
import { cancelMeetEvent, createMeetEvent, getAuthorizedOauthClient, getCalendarClient, SCOPE_KEYS } from "../../utils/integrations/google.js";
import { formattedMeetingDescription } from "../../utils/integrations/meetingDescription.js";
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";
import { sendEmail } from "../../utils/sentEmail.js";
import { sendUpdatesToTelegram } from "../candidate/bot.controller.js";

const RATINGS = ['Good Fit', 'Not A Good Fit', 'May Be'];

export const REJECTION_REASON = [
  {
    reason : "Candidate's scores did not meet the criteria",
    email : true
  },
  {
    reason: "Candidate has reapplied but was previously rejected",
    email: false
  },
  {
    reason: "Candidate's portfolio/work samples did not meet expectations",
    email: false
  },
  {
    reason: "Candidate displayed unprofessional or bad attitude",
    email: false
  },
  {
    reason: "Candidate's skills do not align with job requirements",
    email: false
  },
  {
    reason: "Candidate withdrew their application",
    email: false
  },
  {
    reason: "Candidate requested an unrealistic salary",
    email: false
  },
  {
    reason: "Candidate was unresponsive to communication",
    email: false
  },
  {
    reason: "Candidate provided misleading or false information",
    email: false
  }
];

export const rejectCandidate = async (req, res) => {
  try {
    const { candidateId, jobId, rejectionReason , scheduledDate , scheduledTime } = req.body;

    // Find the candidate and job
    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId),
      jobs.findById(jobId),
    ]);

    if (!candidate || !job) {
      return res.status(404).json({ message: "Candidate or Job not found" });
    }

    // Find the job application for this specific job
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    //Added to avoid breaking with JobProfile for existing jobs and candidates
    candidate.jobApplications.forEach(app=>app.jobProfile = job?.jobProfile)

    if (!jobApplication) {
      return res
        .status(404)
        .json({ message: "Job application not found for this candidate" });
    }

    // Get the current stage
    const currentStage = jobApplication.currentStage;

    //Accept & store UTC dates only
    if(scheduledDate && scheduledTime){
      const [hour,minutes] = scheduledTime?.split(":");
      const mailScheduledDate = new Date(scheduledDate);
      mailScheduledDate.setHours(hour,minutes,0,0);

      // Update the status of the current stage to 'Rejected'
      if (jobApplication.stageStatuses.has(currentStage)) {
        const stageStatus = jobApplication.stageStatuses.get(currentStage);
        stageStatus.rejectionReason = rejectionReason;
        stageStatus.scheduledDate = scheduledDate;
        jobApplication.stageStatuses.set(currentStage, stageStatus);
      } else {
        // If for some reason the current stage doesn't exist in stageStatuses, create it
        jobApplication.stageStatuses.set(currentStage, {
          rejectionReason: rejectionReason,
          assignedTo: null,
          score: {},
          scheduledDate : scheduledDate,
          currentCall: null,
          callHistory: [],
        });
      }

        
      const stageStatus = jobApplication.stageStatuses.get(currentStage)
      //Writing Logs
      if(stageStatus.status){
        let existUpdated = false
        for(let log of stageStatus.logs){
          if(log.status === stageStatus.status){
            log.date = new Date()
            existUpdated = true
          }
        }
        if(!existUpdated){
          stageStatus.logs.push({
            status : stageStatus.status,
            date : new Date()
          })
        }
      }

      // Save the updated candidate document
      await candidate.save();

      res.status(200).json({ message: "Candidate rejection scheduled successfully" });
    }else{

      // Update the status of the current stage to 'Rejected'
      if (jobApplication.stageStatuses.has(currentStage)) {
        const stageStatus = jobApplication.stageStatuses.get(currentStage);
        stageStatus.status = "Rejected";
        stageStatus.rejectionReason = rejectionReason;
        jobApplication.stageStatuses.set(currentStage, stageStatus);
      } else {
        // If for some reason the current stage doesn't exist in stageStatuses, create it
        jobApplication.stageStatuses.set(currentStage, {
          status: "Rejected",
          rejectionReason: rejectionReason,
          assignedTo: null,
          score: {},
          currentCall: null,
          callHistory: [],
        });
      }
  
      const stageStatus = jobApplication.stageStatuses.get(currentStage)
      //Writing Logs
      if(stageStatus.status === 'Rejected'){
        let existUpdated = false
        for(let log of stageStatus.logs){
          if(log.status === stageStatus.status){
            log.date = new Date()
            existUpdated = true
          }
        }
        if(!existUpdated){
          stageStatus.logs.push({
            status : stageStatus.status,
            date : new Date()
          })
        }
      }

      // Save the updated candidate document
      await candidate.save();

      if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
        const updateType = `${currentStage?.toUpperCase()}_REJECTED`;
        sendUpdatesToTelegram(candidate,job,candidate.integrations?.telegram?.user_id,updateType)
      }
      
    //Selective Email sending
    const canSendEmail = !!REJECTION_REASON.find(reasonObj =>(reasonObj?.reason === rejectionReason?.trim() && reasonObj?.email))
    if(canSendEmail){
      // Send rejection email
      const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,job.jobTitle);

      await sendEmail(candidate.email, "Application Status Update", emailContent);
    }
  
      res.status(200).json({ message: "Candidate rejected successfully" });
    }
  } catch (error) {
    console.error("Error rejecting candidate:", error);
    res
      .status(500)
      .json({ message: "Error rejecting candidate", error: error.message });
  }
};

export const rejectMultipleCandidates = async (req, res) => {
  try {
    const { candidateData } = req.body;

    if(!candidateData || candidateData?.length === 0){
      throw new Error("No Candidates Found")
    }

    let isScheduled = false;

    for(let eachCandidate of candidateData){
      if(!eachCandidate?.candidateId || !eachCandidate?.jobId || !eachCandidate?.rejectionReason){
        throw new Error("Invalid Candidates Data")
      }

      // Find the candidate and job
      const candidate = await candidates.findById(eachCandidate?.candidateId);
      const job = await jobs.findById(eachCandidate?.jobId);

      if (!candidate || !job) {
        return res.status(404).json({ message: "Candidate or Job not found" });
      }

      // Find the job application for this specific job
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === eachCandidate?.jobId
      );

      if (!jobApplication) {
        return res
          .status(404)
          .json({ message: "Job application not found for this candidate" });
      }

      // Get the current stage
      const currentStage = jobApplication.currentStage;

      const { scheduledDate, scheduledTime } = eachCandidate;

    //Accept & store UTC dates only
      if(scheduledDate && scheduledTime){
        
        const [hour,minutes] = scheduledTime?.split(":");
        const mailScheduledDate = new Date(scheduledDate);
        mailScheduledDate.setHours(hour,minutes,0,0);
  
        // Update the status of the current stage to 'Rejected'
        if (jobApplication.stageStatuses.has(currentStage)) {
          const stageStatus = jobApplication.stageStatuses.get(currentStage);
          stageStatus.rejectionReason = eachCandidate?.rejectionReason;
          stageStatus.scheduledDate = scheduledDate;
          jobApplication.stageStatuses.set(currentStage, stageStatus);
        } else {
          // If for some reason the current stage doesn't exist in stageStatuses, create it
          jobApplication.stageStatuses.set(currentStage, {
            rejectionReason: eachCandidate?.rejectionReason,
            assignedTo: null,
            score: {},
            scheduledDate : scheduledDate,
            currentCall: null,
            callHistory: [],
          });
        }

        const stageStatus = jobApplication.stageStatuses.get(currentStage)
        //Writing Logs
        if(stageStatus.status){
          let existUpdated = false
          for(let log of stageStatus.logs){
            if(log.status === stageStatus.status){
              log.date = new Date()
              existUpdated = true
            }
          }
          if(!existUpdated){
            stageStatus.logs.push({
              status : stageStatus.status,
              date : new Date()
            })
          }
        }

        // Save the updated candidate document
        await candidate.save();

        isScheduled = true;
  
      }else{
  
        // Update the status of the current stage to 'Rejected'
        if (jobApplication.stageStatuses.has(currentStage)) {
          const stageStatus = jobApplication.stageStatuses.get(currentStage);
          stageStatus.status = "Rejected";
          stageStatus.rejectionReason = eachCandidate?.rejectionReason;
          jobApplication.stageStatuses.set(currentStage, stageStatus);
        } else {
          // If for some reason the current stage doesn't exist in stageStatuses, create it
          jobApplication.stageStatuses.set(currentStage, {
            status: "Rejected",
            rejectionReason: eachCandidate?.rejectionReason,
            assignedTo: null,
            score: {},
            currentCall: null,
            callHistory: [],
          });
        }

        const stageStatus = jobApplication.stageStatuses.get(currentStage)
        //Writing Logs
        if(stageStatus.status === 'Rejected'){
          let existUpdated = false
          for(let log of stageStatus.logs){
            if(log.status === stageStatus.status){
              log.date = new Date()
              existUpdated = true
            }
          }
          if(!existUpdated){
            stageStatus.logs.push({
              status : stageStatus.status,
              date : new Date()
            })
          }
        }
    
        // Save the updated candidate document
        await candidate.save();

        if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
          const updateType = `${currentStage?.toUpperCase()}_REJECTED`;
          sendUpdatesToTelegram(candidate,job,candidate.integrations.telegram.user_id,updateType)
        }
    
        //Selective Email sending
        const canSendEmail = !!REJECTION_REASON.find(reasonObj =>(reasonObj?.reason === eachCandidate?.rejectionReason?.trim() && reasonObj?.email))
        if(canSendEmail){
          // Send rejection email
          const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,job.jobTitle);

          await sendEmail(candidate.email, "Application Status Update", emailContent);
        }
      }
    }

    if(isScheduled){
      res.status(200).json({ message: "Selected candidates rejection scheduled successfully" });
    }else{
      res.status(200).json({ message: "Selected candidates rejected successfully" });
    }
  } catch (error) {
    console.error("Error rejecting candidate:", error);
    res
      .status(500)
      .json({ message: "Error rejecting candidate", error: error.message });
  }
};

export const noShow = async (req, res) => {
  try {
    const { candidateId, jobId, currentStage } = req.body;
    
    // Find the candidate and job
    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId),
      jobs.findById(jobId),
    ]);

    if (!candidate || !job) {
      return res.status(404).json({ message: "Candidate or Job not found" });
    }

    // Find the specific job application
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    //Added to avoid breaking with JobProfile for existing jobs and candidates
    candidate.jobApplications.forEach(app=>app.jobProfile = job?.jobProfile)

    if (!jobApplication) {
      return res.status(404).json({ 
        message: "Job application not found for this candidate" 
      });
    }

    // Validate the current stage
    if (jobApplication.currentStage !== currentStage) {
      return res.status(400).json({ message: "Invalid current stage" });
    }

    // Get the stages for this job profile
    const jobStages = jobStagesStatuses[job.jobProfile];
    if (!jobStages) {
      return res.status(400).json({ 
        message: "Invalid job profile or stages not defined" 
      });
    }

    // Find the current stage configuration
    const stageConfig = jobStages.find(stage => stage.name === currentStage);
    if (!stageConfig) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    // Verify that this stage allows "No Show" status
    if (!stageConfig.requiresCall || !stageConfig.statuses.includes('No Show')) {
      return res.status(400).json({ 
        message: "No Show status not allowed for this stage" 
      });
    }

    // Update the stage status to "No Show"
    const stageStatus = jobApplication.stageStatuses.get(currentStage);
    if (!stageStatus) {
      return res.status(400).json({ 
        message: "Stage status not found" 
      });
    }

    // Store the current call info in call history before updating
    if (stageStatus.currentCall) {
      stageStatus.callHistory.unshift({
        ...stageStatus.currentCall,
        status: 'No Show'
      });
    }

    // Update the status
    stageStatus.status = 'No Show';
    stageStatus.currentCall = null; // Clear current call data

    //Writing Logs
    if(stageStatus.status === 'No Show'){
      let existUpdated = false
      for(let log of stageStatus.logs){
        if(log.status === stageStatus.status){
          log.date = new Date()
          existUpdated = true
        }
      }
      if(!existUpdated){
        stageStatus.logs.push({
          status : stageStatus.status,
          date : new Date()
        })
      }
    }

    // Save the updated candidate document
    await candidate.save();

    return res.status(200).json({
      message: "Status updated to No Show successfully",
      jobApplication
    });

  } catch (error) {
    console.error('Error in noShow controller:', error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export const moveCandidate = async (req, res) => {
  try {
    const { candidateId, jobId, currentStage } = req.body;

    // Find the candidate and job
    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId),
      jobs.findById(jobId),
    ]);

    if (!candidate || !job) {
      return res.status(404).json({ message: "Candidate or Job not found" });
    }

    // Find the job application for this specific job
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    //Added to avoid breaking with JobProfile for existing jobs and candidates
    candidate.jobApplications.forEach(app=>app.jobProfile = job?.jobProfile)

    if (!jobApplication) {
      return res
        .status(404)
        .json({ message: "Job application not found for this candidate" });
    }

    // Validate the current stage
    if (jobApplication.currentStage !== currentStage) {
      return res.status(400).json({ message: "Invalid current stage" });
    }

    const jobProfile = job.jobProfile;
    const stages = jobStagesStatuses[jobProfile];

    // Find the index of the current stage
    const currentStageIndex = stages.findIndex(
      (stage) => stage.name === currentStage
    );

    if (currentStageIndex === -1) {
      return res
        .status(400)
        .json({ message: "Current stage not found in job stages" });
    }

    // Determine if this is the last stage
    const isLastStage = currentStageIndex === stages.length - 1;

    if (isLastStage) {
      // This is the last stage, update status to Accepted
      jobApplication.stageStatuses.get(currentStage).status = "Accepted";

      // You might want to add an additional field to indicate the candidate is hired
      jobApplication.hired = true;
      jobApplication.hireDate = new Date();

      const stageStatus = jobApplication.stageStatuses.get(currentStage)
      //Writing Logs
      if(stageStatus.status === 'Accepted'){
        let existUpdated = false
        for(let log of stageStatus.logs){
          if(log.status === stageStatus.status){
            log.date = new Date()
            existUpdated = true
          }
        }
        if(!existUpdated){
          stageStatus.logs.push({
            status : stageStatus.status,
            date : new Date()
          })
        }
      }
    } else {
      // Existing logic for moving to the next stage
      const nextStageConfig = stages[currentStageIndex + 1];
      const nextStage = nextStageConfig.name;

      // Update the current (previous) stage status to 'Cleared'
      jobApplication.stageStatuses.get(currentStage).status = "Cleared";

      const stageStatus = jobApplication.stageStatuses.get(currentStage)
      //Writing Logs
      if(stageStatus.status === 'Cleared'){
        let existUpdated = false
        for(let log of stageStatus.logs){
          if(log.status === stageStatus.status){
            log.date = new Date()
            existUpdated = true
          }
        }
        if(!existUpdated){
          stageStatus.logs.push({
            status : stageStatus.status,
            date : new Date()
          })
        }
      }

      // Initialize or update the next stage
      // Check if the next stage is "Hired" stage
      const isNextStageHired = nextStage === "Hired";

      jobApplication.stageStatuses.set(nextStage, {
        // Set status to 'Under Review' if it's Hired stage, otherwise follow the normal logic
        status: isNextStageHired
          ? "Under Review"
          : nextStageConfig.requiresCall
          ? "Pending"
          : "Not Assigned",
        rejectionReason: "N/A",
        assignedTo: null,
        score: {},
        currentCall: null,
        callHistory: [],
      });

      // Update the current stage
      jobApplication.currentStage = nextStage;
    }

    // Mark the jobApplications field as modified
    candidate.markModified("jobApplications");

    // Save the updated candidate document
    await candidate.save();

    if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
      const updateType = `${currentStage?.toUpperCase()}_CLEARED`;
      sendUpdatesToTelegram(candidate,job,candidate.integrations?.telegram?.user_id,updateType)
    }

    res.status(200).json({
      message: isLastStage
        ? "Candidate accepted in the final stage"
        : "Candidate moved to next stage successfully",
      nextStage: isLastStage ? currentStage : jobApplication.currentStage,
      previousStage: isLastStage ? null : currentStage,
      previousStageStatus: isLastStage ? "Accepted" : "Cleared",
    });
  } catch (error) {
    console.error("Error moving candidate:", error);
    res
      .status(500)
      .json({ message: "Error moving candidate", error: error.message });
  }
};

export const moveMultipleCandidates = async (req, res) => {
  try {
    const { candidateData } = req.body;

    if(!candidateData || candidateData?.length === 0){
      throw new Error("No Candidates Found")
    }

    for(let eachCandidate of candidateData){
        if(!eachCandidate?.candidateId || !eachCandidate?.jobId){
            throw new Error("Invalid Candidates Data")
        }
        // Find the candidate and job
        const [candidate, job] = await Promise.all([
          candidates.findById(eachCandidate.candidateId),
          jobs.findById(eachCandidate.jobId)
        ]);

        if (!candidate || !job) {
          return res.status(404).json({ message: "Candidate or Job not found" });
        }

        // Find the job application for this specific job
        const jobApplication = candidate.jobApplications.find(
          (app) => app.jobId.toString() === eachCandidate.jobId
        );

        if (!jobApplication) {
          return res
            .status(404)
            .json({ message: "Job application not found for this candidate" });
        }

        // Validate the current stage
        if (jobApplication.currentStage !== eachCandidate.stage) {
          return res.status(400).json({ message: "Invalid current stage" });
        }

        const jobProfile = job.jobProfile;
        const stages = jobStagesStatuses[jobProfile];

        // Find the index of the current stage
        const currentStageIndex = stages.findIndex(
          (stage) => stage.name === eachCandidate.stage
        );

        if (currentStageIndex === -1) {
          return res
            .status(400)
            .json({ message: "Current stage not found in job stages" });
        }

        // Determine if this is the last stage
        const isLastStage = currentStageIndex === stages.length - 1;

        if (isLastStage) {
          // This is the last stage, update status to Accepted
          jobApplication.stageStatuses.get(eachCandidate.stage).status = "Accepted";
    
          // You might want to add an additional field to indicate the candidate is hired
          jobApplication.hired = true;
          jobApplication.hireDate = new Date();

          const stageStatus = jobApplication.stageStatuses.get(currentStage)
          //Writing Logs
          if(stageStatus.status === 'Accepted'){
            let existUpdated = false
            for(let log of stageStatus.logs){
              if(log.status === stageStatus.status){
                log.date = new Date()
                existUpdated = true
              }
            }
            if(!existUpdated){
              stageStatus.logs.push({
                status : stageStatus.status,
                date : new Date()
              })
            }
          }
        } else {
          // Existing logic for moving to the next stage
          const nextStageConfig = stages[currentStageIndex + 1];
          const nextStage = nextStageConfig.name;
    
          // Update the current (previous) stage status to 'Cleared'
          jobApplication.stageStatuses.get(eachCandidate.stage).status = "Cleared";
       
          const stageStatus = jobApplication.stageStatuses.get(eachCandidate.stage)
          //Writing Logs
          if(stageStatus.status === 'Cleared'){
            let existUpdated = false
            for(let log of stageStatus.logs){
              if(log.status === stageStatus.status){
                log.date = new Date()
                existUpdated = true
              }
            }
            if(!existUpdated){
              stageStatus.logs.push({
                status : stageStatus.status,
                date : new Date()
              })
            }
          }
    
          // Initialize or update the next stage
          // Check if the next stage is "Hired" stage
          const isNextStageHired = nextStage === "Hired";
    
          jobApplication.stageStatuses.set(nextStage, {
            // Set status to 'Under Review' if it's Hired stage, otherwise follow the normal logic
            status: isNextStageHired
              ? "Under Review"
              : nextStageConfig.requiresCall
              ? "Pending"
              : "Not Assigned",
            rejectionReason: "N/A",
            assignedTo: null,
            score: {},
            currentCall: null,
            callHistory: [],
          });
    
          // Update the current stage
          jobApplication.currentStage = nextStage;
        }
    
        // Mark the jobApplications field as modified
        candidate.markModified("jobApplications");
        
        // Save the updated candidate document
        await candidate.save();

        if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
          const updateType = `${eachCandidate.stage?.toUpperCase()}_CLEARED`;
          sendUpdatesToTelegram(candidate,job,candidate.integrations?.telegram?.user_id,updateType)
        }
    };
    
    res.status(200).json({message:"Selected candidates are moved to respective stages successfully."})
  } catch (error) {
    console.error("Error moving candidate:", error);
    res
      .status(500)
      .json({ message: "Error moving candidate", error: error.message });
  }
};

export const updateAssigneeForMultipleCandidates = async (req,res) => {
  try {
    const { candidateData, assigneeId } = req.body;

    if(!candidateData || candidateData?.length === 0){
      throw new Error("No Candidates Found")
    }
    
    if(!assigneeId){
      throw new Error("Invalid Assignee Data")
    }

    const isAssigneeExist = await User.findOne({_id:assigneeId,role:"Design Reviewer"});
    if(!isAssigneeExist){
      throw new Error("No Assignee Found")
    }

    for(let eachCandidate of candidateData){
      // Find the candidate
      const candidate = await candidates.findById(eachCandidate?.candidateId);
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }

      // Find the specific job application
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === eachCandidate?.jobId
      );
      if (!jobApplication) {
        return res.status(404).json({ message: 'Job application not found' });
      }

      // Initialize the stage status if it doesn't exist
      if (!jobApplication.stageStatuses.has(eachCandidate?.stage)) {
        jobApplication.stageStatuses.set(eachCandidate?.stage, {
          status: 'Not Assigned',
          assignedTo: null,
          rejectionReason: 'N/A',
          score: {},
          currentCall: null,
          callHistory: []
        });
      }

      const stageStatus = jobApplication.stageStatuses.get(eachCandidate?.stage);

      // Update the assignee
      stageStatus.assignedTo = assigneeId;

      // Update the status based on the stage
      if (eachCandidate?.stage === 'Portfolio') {
        stageStatus.status = assigneeId ? 'Under Review' : 'Not Assigned';
      }

      if (eachCandidate?.stage === 'Design Task') {
        if (stageStatus?.submittedTaskLink) {
          stageStatus.status = assigneeId ? 'Under Review' : stageStatus.status;
        }else{
          stageStatus.assignedTo = null;
        }
      }
      // Add more stage-specific logic here as needed

      // If this is the first stage and an assignee is added, update the current stage
      if (['Portfolio', 'Design Task'].includes(eachCandidate?.stage) && assigneeId && !jobApplication.currentStage) {
        jobApplication.currentStage = eachCandidate?.stage;
      }

      if(stageStatus.assignedTo){
        let existUpdated = false
        for(let log of stageStatus.logs){
          if(log.status === stageStatus.status){
            log.date = new Date()
            existUpdated = true
          }
        }
        if(!existUpdated){
          stageStatus.logs.push({
            status : stageStatus.status,
            date : new Date()
          })
        }
      }

      // Save the changes
      await candidate.save();
    }

    res.status(200).json({ 
      message: 'Assignee updated successfully',
    });
  } catch (error) {
    console.error('Error updating assignee:', error);
    res.status(500).json({ message: error?.message || 'Server error' });
  }
}

export const updateCandidateRating = async (req, res) => {
  try {
    const { candidateId, jobId, rating } = req.body;

    const candidate = await candidates.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res
        .status(404)
        .json({ message: "Job application not found for this candidate" });
    }

    jobApplication.rating = rating;

    // Mark the jobApplications field as modified
    candidate.markModified("jobApplications");

    await candidate.save();

    res.status(200).json({
      message: "Candidate rating updated successfully",
      rating: rating,
    });
  } catch (error) {
    console.error("Error updating candidate rating:", error);
    res
      .status(500)
      .json({
        message: "Error updating candidate rating",
        error: error.message,
      });
  }
};

export const rateMultipleCandidates = async (req,res) => {
  try {
    const { candidateData, rating } = req.body;

    if(!candidateData || candidateData?.length === 0){
      throw new Error("No Candidates Found")
    }
    
    if(!rating){
      throw new Error("No Rating Found")
    }

    if(!RATINGS.includes(rating)){
      throw new Error("Invalid Rating")
    }

    for(let eachCandidate of candidateData){

      const candidate = await candidates.findById(eachCandidate?.candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === eachCandidate?.jobId
      );
  
      if (!jobApplication) {
        return res
          .status(404)
          .json({ message: "Job application not found for this candidate" });
      }
  
      jobApplication.rating = rating;
  
      // Mark the jobApplications field as modified
      candidate.markModified("jobApplications");
  
      await candidate.save();
    }

    res.status(200).json({
      message: "Candidates rating updated successfully",
    });
  } catch (error) {
    console.error("Error updating candidate rating:", error);
    res
      .status(500)
      .json({
        message: error.message || "Error updating candidate rating",
      });
  }
}

export const getCandidateScores = async (req, res) => {
  const { candidateId, jobId } = req.params;

  try {
    // Find the candidate by ID
    const candidate = await candidates.findById(candidateId).lean();

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Find the specific job application by jobId
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res
        .status(404)
        .json({ message: "Job application not found for this candidate" });
    }

    // Extract the stage statuses and their scores
    const stageStatuses = jobApplication.stageStatuses || {};
    const scores = {};
    let totalScore = 0; // Initialize total score

    // Use Object.entries() to iterate over a plain object
    for (const [stageName, stageStatus] of Object.entries(stageStatuses)) {
      // Handle the mixed type of 'score' appropriately
      const stageScore =
        stageStatus.score !== undefined ? stageStatus.score : {};

      scores[stageName] = stageScore; // Assign to scores object

      // Compute total score
      if (typeof stageScore === "number") {
        totalScore += stageScore;
      } else if (typeof stageScore === "object" && stageScore !== null) {
        // Sum up the numeric values in the object
        const sum = Object.values(stageScore).reduce((acc, val) => {
          if (typeof val === "number") {
            return acc + val;
          }
          return acc;
        }, 0);
        totalScore += sum;
      }
    }

    // Return the scores per stage and the total score
    return res.status(200).json({ candidateId, jobId, scores, totalScore });
  } catch (error) {
    console.error("Error fetching candidate scores:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const scheduleScreening = async (req, res) => {
  try {
    const { candidateId, jobId, date, time, assigneeId, meetingLink } =
      req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Update the Screening stage status
    jobApplication.stageStatuses.set("Screening", {
      status: "Call Scheduled",
      assignedTo: assigneeId,
      currentCall: {
        scheduledDate: date,
        scheduledTime: time,
        meetingLink: meetingLink,
      },
    });

    // Save the changes
    await candidate.save();

    res.status(200).json({
      message: "Screening call scheduled successfully",
      updatedStageStatus: jobApplication.stageStatuses.get("Screening"),
    });
  } catch (error) {
    console.error("Error scheduling screening:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const scheduleCall = async (req, res) => {
  try {
    //Accept & store UTC dates only
    const { candidateId, jobId, stage, date, time, assigneeId, meetingLink , automaticLink , addedInvitees } =
      req.body;

    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId),
      jobs.findById(jobId),
    ]);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    //Added to avoid breaking with JobProfile for existing jobs and candidates
    candidate.jobApplications.forEach(app=>app.jobProfile = job?.jobProfile)
    
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Validate if the stage is valid
    const validStages = ["Screening", "Round 1", "Round 2"];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    let autoGeneratedLink = null
    let autoGeneratedEventId = null

    if(automaticLink && !meetingLink){

      let assigneeEmail = ''
      if(assigneeId){
        const assignee = await User.findById({_id: assigneeId})
        assigneeEmail = assignee?.email ?? ''
      }
  
      const userId = req.user._id
      const user = await User.findById({_id : userId});
      const company = await Company.findById({_id : user?.company_id});
  
      const eventDetails = {
        summary: `${stage} - Interview with ${candidate?.firstName + ' ' + candidate?.lastName} (${job.jobProfile} - ${job.employmentType})`,
        description: formattedMeetingDescription(company?.name,company?.about , company?.website , job.employeeLocation , job.employmentType , job.experienceFrom, job.jobDescription) ,
        startDateTime: date, // already in ISO UTC
        endDateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(),
        attendees: [candidate?.email, ...(assigneeEmail ? [assigneeEmail] : []),...(addedInvitees?.length ? addedInvitees : [])],
        timeZone: 'UTC'
      };
  
      //Automatic Google Meet Link Generation
      if(user?.integrations?.google?.token && user.integrations?.google?.scopes?.includes(SCOPE_KEYS?.EDIT_EVENTS)){
        const oauth2Client = await getAuthorizedOauthClient(decrypt(user.integrations.google.token))
        const calendar = await getCalendarClient(oauth2Client);
        const result = await createMeetEvent(calendar,eventDetails);
        if(result){
          autoGeneratedEventId = result.eventId
          autoGeneratedLink = result.joinLink
        }
      }else{
        return res.status(400).json({
          error : true,
          message : 'Please authorize Google Workspace to create meetings.' 
        })
      }
    }

    // Update the stage status
    jobApplication.stageStatuses.set(stage, {
      status: "Call Scheduled",
      assignedTo: assigneeId,
      currentCall: {
        scheduledDate: date,
        scheduledTime: time,
        meetingLink: autoGeneratedLink ?? meetingLink,
        eventId : autoGeneratedEventId ?? null
      },
      //Populating logs
      ...(jobApplication.stageStatuses.get(stage)?.logs?.length > 0 ? {logs : jobApplication.stageStatuses.get(stage)?.logs} : {}),
      //Populating score to get the score given before calls (Budget)
    ...(jobApplication.stageStatuses.get(stage)?.score ? {score :  jobApplication.stageStatuses.get(stage)?.score} : {})
    });

    const stageStatus = jobApplication.stageStatuses.get(stage)
    //Writing Logs
    if(stageStatus.currentCall.meetingLink){
      let existUpdated = false
      for(let log of stageStatus.logs){
        if(log.status === stageStatus.status){
          log.date = new Date()
          existUpdated = true
        }
      }
      if(!existUpdated){
        stageStatus.logs.push({
          status : stageStatus.status,
          date : new Date()
        })
      }
    }

    // Save the changes
    await candidate.save();

    if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
      const updateType = `${jobApplication.currentStage.toUpperCase()}_CALLSCHEDULED`;
      sendUpdatesToTelegram(candidate,job,candidate.integrations?.telegram?.user_id,updateType,date)
    }

    res.status(200).json({
      message: `${stage} call scheduled successfully`,
      updatedStageStatus: jobApplication.stageStatuses.get(stage),
    });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rescheduleCall = async (req, res) => {
  try {
    //Accept & store UTC dates only
    const { candidateId, jobId, stage, date, time, assigneeId, meetingLink ,automaticLink , addedInvitees } =
      req.body;

    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId),
      jobs.findById(jobId),
    ]);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Validate the stage
    const validStages = ["Screening", "Round 1", "Round 2"];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage" });
    }

    // Get the stage status
    let stageStatus = jobApplication.stageStatuses.get(stage);

    // If stage status doesn't exist, initialize it
    if (!stageStatus) {
      stageStatus = {
        status: "Call Scheduled",
        assignedTo: assigneeId,
        currentCall: null,
        callHistory: [],
      };
    }

      const userId = req.user._id
      const user = await User.findById({_id : userId});
      const company = await Company.findById({_id : user?.company_id});

    // Move current call to call history if it exists
    if (stageStatus.currentCall.toObject()) {
      if (!stageStatus.callHistory) {
        stageStatus.callHistory = [];
      }

      //Cancel previously scheduled call
      if(stageStatus.currentCall?.eventId){
        if(user?.integrations?.google?.token && user.integrations?.google?.scopes?.includes(SCOPE_KEYS?.EDIT_EVENTS)){
          const oauth2Client = await getAuthorizedOauthClient(decrypt(user.integrations.google.token))
          const calendar = await getCalendarClient(oauth2Client);
          await cancelMeetEvent(calendar,stageStatus.currentCall?.eventId);
        }
      }

      if(stageStatus.status !== 'No Show'){
        stageStatus.callHistory.unshift({
          ...stageStatus.currentCall,
          status: "Rescheduled",
        });
      }
    } else {
      console.log("No current call to move to history");
    }

    
    let autoGeneratedLink = null
    let autoGeneratedEventId = null

    if(automaticLink && !meetingLink){

      let assigneeEmail = ''
      if(assigneeId){
        const assignee = await User.findById({_id: assigneeId})
        assigneeEmail = assignee?.email ?? ''
      }
  
      const eventDetails = {
        summary: `${stage} - Interview with ${candidate?.firstName + ' ' + candidate?.lastName} (${job.jobProfile} - ${job.employmentType})`,
        description: formattedMeetingDescription(company?.name,company?.about , company?.website , job.employeeLocation , job.employmentType , job.experienceFrom, job.jobDescription) ,
        startDateTime: date, // already in ISO UTC
        endDateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(),
        attendees: [candidate?.email, ...(assigneeEmail ? [assigneeEmail] : []),...(addedInvitees?.length ? addedInvitees : [])],
        timeZone: 'UTC'
      };
      
  
      //Automatic Google Meet Link Generation
      if(user?.integrations?.google?.token && user.integrations?.google?.scopes?.includes(SCOPE_KEYS?.EDIT_EVENTS)){
        const oauth2Client = await getAuthorizedOauthClient(decrypt(user.integrations.google.token))
        const calendar = await getCalendarClient(oauth2Client);
        const result = await createMeetEvent(calendar,eventDetails);
        if(result){
          autoGeneratedEventId = result.eventId
          autoGeneratedLink = result.joinLink
        }
      }else{
        return res.status(400).json({
          error : true,
          message : 'Please authorize Google Workspace to create meetings.' 
        })
      }
    }


    // Update current call with new details
    stageStatus.currentCall = {
      scheduledDate: date,
      scheduledTime: time,
      meetingLink: autoGeneratedLink ?? meetingLink,
      eventId : autoGeneratedEventId ?? null
    };
    stageStatus.assignedTo = assigneeId;
    stageStatus.status = "Call Scheduled";

    
    //Writing Logs
    if(stageStatus.currentCall.meetingLink){
      let existUpdated = false
      for(let log of stageStatus.logs){
        if(log.status === stageStatus.status){
          log.date = new Date()
          existUpdated = true
        }
      }
      if(!existUpdated){
        stageStatus.logs.push({
          status : stageStatus.status,
          date : new Date()
        })
      }
    }

    // Update the stage status in the stageStatuses Map
    jobApplication.stageStatuses.set(stage, stageStatus);

    // Mark the jobApplications array as modified
    candidate.markModified("jobApplications");

    await candidate.save();

    
    if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
      const updateType = `${jobApplication.currentStage.toUpperCase()}_CALL_RESCHEDULED`;
      sendUpdatesToTelegram(candidate,job,candidate.integrations?.telegram?.user_id,updateType,date)
    }

    const updatedCandidate = await candidates.findById(candidateId);
    const updatedJobApplication = updatedCandidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    const updatedStageStatus = updatedJobApplication.stageStatuses.get(stage);

    res.status(200).json({
      message: `${stage} call rescheduled successfully`,
      updatedStageStatus: updatedStageStatus,
    });
  } catch (error) {
    console.error("Error rescheduling interview:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rescheduleScreening = async (req, res) => {
  try {
    const { candidateId, jobId, date, time, assigneeId, meetingLink } =
      req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Get the Screening stage status
    let screeningStatus = jobApplication.stageStatuses.get("Screening");

    // If Screening status doesn't exist, initialize it
    if (!screeningStatus) {
      screeningStatus = {
        status: "Call Scheduled",
        assignedTo: assigneeId,
        currentCall: null,
        callHistory: [],
      };
    }

    // Move current call to call history if it exists
    if (screeningStatus.currentCall) {
      if (!screeningStatus.callHistory) {
        screeningStatus.callHistory = [];
      }
      screeningStatus.callHistory.unshift({
        ...screeningStatus.currentCall,
        status: "Rescheduled",
      });
    } else {
      console.log("No current call to move to history");
    }

    // Update current call with new details
    screeningStatus.currentCall = {
      scheduledDate: date,
      scheduledTime: time,
      meetingLink: meetingLink,
    };
    screeningStatus.assignedTo = assigneeId;
    screeningStatus.status = "Call Scheduled";

    // Update the Screening status in the stageStatuses Map
    jobApplication.stageStatuses.set("Screening", screeningStatus);

    // Mark the jobApplications array as modified
    candidate.markModified("jobApplications");

    await candidate.save();

    const updatedCandidate = await candidates.findById(candidateId);
    const updatedJobApplication = updatedCandidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    const updatedScreeningStatus =
      updatedJobApplication.stageStatuses.get("Screening");

    res.status(200).json({
      message: "Screening call rescheduled successfully",
      updatedStageStatus: updatedScreeningStatus,
    });
  } catch (error) {
    console.error("Error rescheduling screening:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// budgetScoreController.js

export const submitBudgetScore = async (req, res) => {
  try {
    const { candidateId, jobId, stage, score } = req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Get the current stage status
    const stageStatus = jobApplication.stageStatuses.get(stage);
    if (!stageStatus) {
      return res.status(404).json({ message: "Stage status not found" });
    }

    // Initialize score object if it doesn't exist
    if (!stageStatus.score) {
      stageStatus.score = {};
    }

    // Add or update the Budget score
    stageStatus.score.Budget = score;

    //Writing Logs
    if(stageStatus.score.Budget){
      let existUpdated = false
      for(let log of stageStatus.logs){
        if(log.status === stageStatus.status){
          log.date = new Date()
          existUpdated = true
        }
      }
      if(!existUpdated){
        stageStatus.logs.push({
          status : stageStatus.status,
          date : new Date()
        })
      }
    }

    // Mark the nested fields as modified
    candidate.markModified(`jobApplications`);

    await candidate.save();

    res.status(200).json({
      message: "Budget score submitted successfully",
      updatedScore: stageStatus.score,
    });
  } catch (error) {
    console.error("Error submitting budget score:", error);
    res
      .status(500)
      .json({
        message: "Server error",
        error: error.toString(),
        stack: error.stack,
      });
  }
};

export const sendDesignTask = async (req, res) => {
  try {
    const {
      candidateId,
      jobId,
      taskDescription,
      dueDate,
      dueTime,
      candidateEmail,
      scheduledDate,
      scheduledTime
    } = req.body;

    const sanitizedDescription = sanitizeLexicalHtml(taskDescription);

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    
    //Accept & store UTC dates only
    if(scheduledDate && scheduledTime){
      const [hour,minutes] = scheduledTime?.split(":");
      const mailScheduledDate = new Date(scheduledDate);
      mailScheduledDate.setHours(hour,minutes,0,0);

      // Update the Design Task stage status
      jobApplication.stageStatuses.set("Design Task", {
        status: "Pending",
        currentCall: {
          scheduledDate: new Date(dueDate),
          scheduledTime: dueTime,
          meetingLink: "", // You can leave this empty or use it for a submission link if needed
        },
        logs : jobApplication.stageStatuses.get('Design Task').logs ?? [] ,
        taskDescription: sanitizedDescription,
        scheduledDate : scheduledDate
      });

      //write Logs
      const logs = jobApplication.stageStatuses.get('Design Task').logs ?? [];
      let hasUpdated = false;
      if(logs?.length > 0){
        for(let log of logs){
          if(log.status === 'Pending'){
            log.date = new Date()
            hasUpdated = true
          }
        }
      }
      if(!hasUpdated){
        logs.push({status: "Pending", date : new Date()})
      }

      await candidate.save();

      res.status(200).json({
        message: "Design task scheduled successfully",
        updatedStageStatus: jobApplication.stageStatuses.get("Design Task"),
      });
    }else{

      //write Logs
      const logs = jobApplication.stageStatuses.get('Design Task').logs ?? [];
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
      // Update the Design Task stage status
      jobApplication.stageStatuses.set("Design Task", {
        status: "Sent",
        currentCall: {
          scheduledDate: new Date(dueDate),
          scheduledTime: dueTime,
          meetingLink: "", // You can leave this empty or use it for a submission link if needed
        },
        logs : logs,
        taskDescription: sanitizedDescription,
      });
  
      // Send email to candidate
      const emailSubject = `Value At Void : ${jobApplication.jobApplied} | Design Task for ${candidate.firstName}`;
      const emailContent = getDesignTaskContent(candidate.firstName + " " + candidate.lastName,jobApplication.jobApplied,removeEmojis(sanitizedDescription),dueDate,dueTime)
      
      await sendEmail(candidateEmail, emailSubject, emailContent,"Design Task");
  
      await candidate.save();

      
      if(candidate.integrations?.telegram?.user_id && candidate.integrations?.telegram?.status === 'CONNECTED'){
        const updateType = `${jobApplication.currentStage.toUpperCase()}_SENT`;
        sendUpdatesToTelegram(candidate,jobApplication,candidate.integrations?.telegram?.user_id,updateType,dueDate)
      }
  
      res.status(200).json({
        message: "Design task sent successfully",
        updatedStageStatus: jobApplication.stageStatuses.get("Design Task"),
      });
    }
  } catch (error) {
    console.error("Error sending design task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const scoreRoundTwo = async (req, res) => {
  try {
    const { candidateId, jobId, score, feedback } = req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Update the Round 2 stage status
    const roundTwoStatus = jobApplication.stageStatuses.get("Round 2");
    if (!roundTwoStatus || roundTwoStatus.status !== "Under Review") {
      return res.status(400).json({ message: "Round 2 is not under review" });
    }

    roundTwoStatus.status = "Reviewed";
    roundTwoStatus.score = score;
    roundTwoStatus.feedback = feedback;
    
        //Writing Logs
    if(roundTwoStatus.status === 'Reviewed'){
      let existUpdated = false
      for(let log of roundTwoStatus.logs){
        if(log.status === roundTwoStatus.status){
          log.date = new Date()
          existUpdated = true
        }
      }
      if(!existUpdated){
        roundTwoStatus.logs.push({
          status : roundTwoStatus.status,
          date : new Date()
        })
      }
    }

    jobApplication.stageStatuses.set("Round 2", roundTwoStatus);

    // Save the changes
    await candidate.save();

    res.status(200).json({
      message: "Round 2 scored successfully",
      updatedStageStatus: roundTwoStatus,
    });
  } catch (error) {
    console.error("Error scoring Round 2:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Universal Controller to Update Any Status for any applications.
export const changeApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { candidateId, jobId } = req.params;

    if (!candidateId || !jobId || !status) {
      return res.status(400).json({ message: "Invalid Input Data" });
    }

    // Find the candidate
    const candidate = await candidates.findOne({
      _id: candidateId,
      "jobApplications.jobId": jobId,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Locate the relevant job application
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    const currentStage = jobApplication.currentStage;
    if (!jobApplication.stageStatuses.has(currentStage)) {
      return res.status(400).json({ message: "Current stage not found" });
    }

    // Update the status in the Map
    const stageStatus = jobApplication.stageStatuses.get(currentStage);
    stageStatus.status = status; // Update the status
    jobApplication.stageStatuses.set(currentStage, stageStatus); // Re-set the Map key

    // Save the updated candidate document
    await candidate.save();

    res.status(200).json({
      message: "Status Updated Successfully.",
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const saveTaskTemplates = async ( req, res) => {
  try {
    const { title, level, jobProfile, htmlString } = req.body;

    if(!title || !level || !jobProfile || !htmlString){
      return res.status(400).json({
        error : true,
        message : 'Please provide title, job level, job profile and task description.'
      })
    }
    const sanitizedString = sanitizeLexicalHtml(htmlString);

    const existingTasks = await Task.find({
      title : { $regex: title, $options: "i" },
      company_id : req.user.company_id,
      category : jobProfile
    })

    if(existingTasks?.length > 0){
      return res.status(400).json({
        error : true,
        message : 'This task title already exists.'
      })
    }

    const newTask = await Task.create({
      title,
      level,
      category : jobProfile,
      htmlString : sanitizedString,
      company_id : req.user?.company_id ?? null
    })


    res.status(200).json({
      success : true,
      data : newTask,
      message: "Task template created Successfully.",
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getTaskTemplates = async ( req, res) => {
  try {
    const { jobProfile } = req.body;
    const savedTemplates = await Task.find({category : jobProfile, company_id : null});

    const companySavedTemplates = await Task.find({category : jobProfile , company_id : req.user?.company_id});

    res.status(200).json({
      success : true,
      data : [...savedTemplates, ...companySavedTemplates],
      message: "Task templates fetched Successfully.",
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const undoAction = async (req,res) => {
  try {
    const { candidateId, jobId } = req.body;

    if (!candidateId || !jobId ) {
      return res.status(400).json({ message: "Invalid Input Data" });
    }

    // Find the candidate
    const candidate = await candidates.findOne({
      _id: candidateId,
      "jobApplications.jobId": jobId,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Locate the relevant job application
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    const currentStage = jobApplication.currentStage;
    if (!jobApplication.stageStatuses.has(currentStage)) {
      return res.status(400).json({ message: "Current stage not found" });
    }

    function setNestedValue(obj, path, value) {
      if (!path.includes('.')) {
        obj[path] = value;
        return;
      }
      const keys = path.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (typeof current[key] !== 'object' || current[key] === null) {
          current[key] = {};
        }
        current = current[key];
      }
      current[keys.at(-1)] = value;
    }


    // Update the status in the Map
    const stageStatus = jobApplication.stageStatuses.get(currentStage);
    const currentStatus = stageStatus.status;
    const currentConfig = undoConfig[currentStage][currentStatus];
    const timeout = 5;

    if(stageStatus?.logs?.length > 0){
      const sortedLogs = stageStatus.logs.sort((a,b) => new Date(b.date) - new Date(a.date))
      const currentDate = new Date();
      const logDate = new Date(sortedLogs[0].date);

      const timeDifferenceInMs = Math.abs(currentDate - logDate); // in milliseconds
      const timeDifferenceInMinutes = timeDifferenceInMs / (1000 * 60);
      
      const isScheduled = stageStatus.scheduledDate;

      if (timeDifferenceInMinutes > timeout && !stageStatus.scheduledDate) {
        return res.status(400).json({
            error : true , 
            message : "This action crossed 5 minutes and can't be undone."
        })
      }

      if(currentConfig){
          if(currentConfig?.revert?.length > 0 && !currentConfig.condition?.includes('check_rejection_scheduled')){
            if(currentConfig.condition?.includes('remove_except_budget')){
                currentConfig.revert.forEach(option => {
                  if(option.field !== 'score'){
                    setNestedValue(stageStatus, option.field, option.value);
                  }
                });
                stageStatus.score = {Budget : stageStatus.score.Budget}
            }else{
              currentConfig.revert.forEach(option => {
                setNestedValue(stageStatus, option.field, option.value);
              });
            }
          }
          let isRejectionScheduled = false
          if(currentConfig.condition?.includes('check_rejection_scheduled')){
              if(stageStatus?.scheduledDate && stageStatus?.rejectionReason){
                stageStatus.scheduledDate = null
                stageStatus.rejectionReason = 'N/A'
                isRejectionScheduled = true
              }else if(currentConfig?.revert?.length > 0){
                if(currentConfig.condition?.includes('remove_except_budget')){
                    currentConfig.revert.forEach(option => {
                      if(option.field !== 'score'){
                        setNestedValue(stageStatus, option.field, option.value);
                      }
                    });
                    stageStatus.score = {Budget : stageStatus.score.Budget}
                }else{
                  currentConfig.revert.forEach(option => {
                    setNestedValue(stageStatus, option.field, option.value);
                  });
                }
              }else{
                return res.status(400).json({
                  error : true , 
                  message : 'This action cannot be undone.'
                })
              }
          }else if(!currentConfig.revertTo){
              return res.status(400).json({
                error : true , 
                message : 'This action cannot be undone.'
              })
            }
          
          if(!isScheduled || (isScheduled && currentStage === 'Hired')){
            //Removing current log
            stageStatus.logs = stageStatus.logs.filter(log => log.status !== (sortedLogs[0]?.status ?? stageStatus.status))
          }

          if(currentConfig?.revertTo && stageStatus.status !== currentConfig.revertTo && !isRejectionScheduled){
            //Reverting to previous status
            stageStatus.status = sortedLogs[1]?.status ?? currentConfig.revertTo
          }
        }
    }else{
      return res.status(400).json({
        error : true , 
        message : 'This action cannot be undone.'
      })
    }

    candidate.markModified('jobApplications')
    await candidate.save();

    res.status(200).json({
      success : true ,
      message : 'Action reverted successfully'
    })
  } catch (error) {
    console.error("Error in undo action:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const triggerAiScore = async (req, res) => {
  try {
    const { behance_url, candidate_id, role, job_id } = req.body;
    const response = await axios.post(
      'https://portfolio-intelligence-production-294a.up.railway.app/score',
      { behance_url, candidate_id, role, job_id }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAiScoreStatus = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const response = await axios.get(
      `https://portfolio-intelligence-production-294a.up.railway.app/score-status/${candidateId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveAiScore = async (req, res) => {
  try {
    const { candidateId, jobId, aiScore, aiReasoning, aiRecommendation } = req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) return res.status(404).json({ message: 'Job application not found' });

    const stageStatus = jobApplication.stageStatuses.get('Portfolio');
    if (!stageStatus) return res.status(404).json({ message: 'Portfolio stage not found' });

    stageStatus.aiScore = aiScore;
    stageStatus.aiReasoning = aiReasoning;
    stageStatus.aiRecommendation = aiRecommendation;

    await candidate.save();
    return res.status(200).json({ message: 'AI score saved successfully' });
  } catch (error) {
    console.error('Error saving AI score:', error);
    return res.status(500).json({ message: error.message });
  }
};