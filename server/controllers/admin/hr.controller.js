import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { User } from "../../models/admin/user.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { getDesignTaskContent, getRejectionEmailContent } from "../../utils/emailTemplates.js";
import { sendEmail } from "../../utils/sentEmail.js";

const RATINGS = ['Good Fit', 'Not A Good Fit', 'May Be'];

export const rejectCandidate = async (req, res) => {
  try {
    const { candidateId, jobId, rejectionReason } = req.body;

    // Find the candidate and job
    const candidate = await candidates.findById(candidateId);
    const job = await jobs.findById(jobId);

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

    // Save the updated candidate document
    await candidate.save();

    // Send rejection email
    const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,job.jobTitle);

    await sendEmail(candidate.email, "Application Status Update", emailContent);

    res.status(200).json({ message: "Candidate rejected successfully" });
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

      // Save the updated candidate document
      await candidate.save();

      // Send rejection email
      const emailContent = getRejectionEmailContent(candidate.firstName + " " + candidate.lastName,job.jobTitle);

      await sendEmail(candidate.email, "Application Status Update", emailContent);
    }

    res.status(200).json({ message: "Selected candidates rejected successfully" });
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
    const candidate = await candidates.findById(candidateId);
    const job = await jobs.findById(jobId);

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
      stageStatus.callHistory.push({
        ...stageStatus.currentCall,
        status: 'No Show'
      });
    }

    // Update the status
    stageStatus.status = 'No Show';
    stageStatus.currentCall = null; // Clear current call data

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
    const candidate = await candidates.findById(candidateId);
    const job = await jobs.findById(jobId);

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
    } else {
      // Existing logic for moving to the next stage
      const nextStageConfig = stages[currentStageIndex + 1];
      const nextStage = nextStageConfig.name;

      // Update the current (previous) stage status to 'Cleared'
      jobApplication.stageStatuses.get(currentStage).status = "Cleared";

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
        const candidate = await candidates.findById(eachCandidate.candidateId);
        const job = await jobs.findById(eachCandidate.jobId);

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
        } else {
          // Existing logic for moving to the next stage
          const nextStageConfig = stages[currentStageIndex + 1];
          const nextStage = nextStageConfig.name;
    
          // Update the current (previous) stage status to 'Cleared'
          jobApplication.stageStatuses.get(eachCandidate.stage).status = "Cleared";
    
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
      if (['Portfolio', 'Design Task'].includes(eachCandidate?.stage)) {
        stageStatus.status = assigneeId ? 'Under Review' : 'Not Assigned';
      }
      // Add more stage-specific logic here as needed

      // If this is the first stage and an assignee is added, update the current stage
      if (['Portfolio', 'Design Task'].includes(eachCandidate?.stage) && assigneeId && !jobApplication.currentStage) {
        jobApplication.currentStage = eachCandidate?.stage;
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
    const { candidateId, jobId, stage, date, time, assigneeId, meetingLink } =
      req.body;

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    const job = await jobs.findById(jobId);

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

    // Update the stage status
    jobApplication.stageStatuses.set(stage, {
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
    const { candidateId, jobId, stage, date, time, assigneeId, meetingLink } =
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

    // Move current call to call history if it exists
    if (stageStatus.currentCall.toObject()) {
      if (!stageStatus.callHistory) {
        stageStatus.callHistory = [];
      }
      stageStatus.callHistory.unshift({
        ...stageStatus.currentCall,
        status: "Rescheduled",
      });
    } else {
      console.log("No current call to move to history");
    }

    // Update current call with new details
    stageStatus.currentCall = {
      scheduledDate: date,
      scheduledTime: time,
      meetingLink: meetingLink,
    };
    stageStatus.assignedTo = assigneeId;
    stageStatus.status = "Call Scheduled";

    // Update the stage status in the stageStatuses Map
    jobApplication.stageStatuses.set(stage, stageStatus);

    // Mark the jobApplications array as modified
    candidate.markModified("jobApplications");

    await candidate.save();

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
        taskDescription: taskDescription,
        scheduledDate : mailScheduledDate
      });

      await candidate.save();

      res.status(200).json({
        message: "Design task scheduled successfully",
        updatedStageStatus: jobApplication.stageStatuses.get("Design Task"),
      });
    }else{

      // Update the Design Task stage status
      jobApplication.stageStatuses.set("Design Task", {
        status: "Sent",
        currentCall: {
          scheduledDate: new Date(dueDate),
          scheduledTime: dueTime,
          meetingLink: "", // You can leave this empty or use it for a submission link if needed
        },
        taskDescription: taskDescription,
      });
  
      // Send email to candidate
      const emailSubject = `Value At Void : ${jobApplication.jobApplied} | Design Task for ${candidate.firstName} (3 days)`;
      const emailContent = getDesignTaskContent(candidate.firstName + " " + candidate.lastName,jobApplication.jobApplied,taskDescription,dueDate,dueTime)
      
      await sendEmail(candidateEmail, emailSubject, emailContent,"Design Task");
  
      await candidate.save();
  
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
