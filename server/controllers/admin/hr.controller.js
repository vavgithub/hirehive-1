import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { sendEmail } from "../../utils/sentEmail.js";


export const rejectCandidate = async (req, res) => {
    try {
      const { candidateId, jobId, rejectionReason } = req.body;
  
      // Find the candidate and job
      const candidate = await candidates.findById(candidateId);
      const job = await jobs.findById(jobId);
  
      if (!candidate || !job) {
        return res.status(404).json({ message: 'Candidate or Job not found' });
      }
  
      // Find the job application for this specific job
      const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);
  
      if (!jobApplication) {
        return res.status(404).json({ message: 'Job application not found for this candidate' });
      }
  
      // Get the current stage
      const currentStage = jobApplication.currentStage;
  
      // Update the status of the current stage to 'Rejected'
      if (jobApplication.stageStatuses.has(currentStage)) {
        const stageStatus = jobApplication.stageStatuses.get(currentStage);
        stageStatus.status = 'Rejected';
        stageStatus.rejectionReason = rejectionReason;
        jobApplication.stageStatuses.set(currentStage, stageStatus);
      } else {
        // If for some reason the current stage doesn't exist in stageStatuses, create it
        jobApplication.stageStatuses.set(currentStage, {
          status: 'Rejected',
          rejectionReason: rejectionReason,
          assignedTo: null,
          score: {},
          currentCall: null,
          callHistory: []
        });
      }
  
      // Save the updated candidate document
      await candidate.save();
  
      // Send rejection email
      const emailContent = `
        Dear ${candidate.firstName} ${candidate.lastName},
  
        Thank you for applying for the ${job.jobTitle} position at VAV. 
        After careful review, we have decided to move forward with other candidates.
  
        We appreciate your interest in our company and wish you all the best in your job search.
  
        Best regards,
        HR Manager
        VAV
      `;
  
      await sendEmail(candidate.email, 'Application Status Update', emailContent);
  
      res.status(200).json({ message: 'Candidate rejected successfully' });
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      res.status(500).json({ message: 'Error rejecting candidate', error: error.message });
    }
  };


  export const moveCandidate = async (req, res) => {
    try {
        const { candidateId, jobId, currentStage } = req.body;

        console.log(`Moving candidate ${candidateId} for job ${jobId} from stage ${currentStage}`);

        // Find the candidate and job
        const candidate = await candidates.findById(candidateId);
        const job = await jobs.findById(jobId);

        if (!candidate || !job) {
            return res.status(404).json({ message: 'Candidate or Job not found' });
        }

        // Find the job application for this specific job
        const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);

        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found for this candidate' });
        }

        console.log('Current job application state:', JSON.stringify(jobApplication, null, 2));

        // Validate the current stage
        if (jobApplication.currentStage !== currentStage) {
            return res.status(400).json({ message: 'Invalid current stage' });
        }

        const jobProfile = job.jobProfile; // Assuming job has a jobProfile field
        const stages = jobStagesStatuses[jobProfile];
        
        // Find the index of the current stage
        const currentStageIndex = stages.findIndex(stage => stage.name === currentStage);
        
        if (currentStageIndex === -1) {
            return res.status(400).json({ message: 'Current stage not found in job stages' });
        }

        // Determine if this is the last stage
        const isLastStage = currentStageIndex === stages.length - 1;

        if (isLastStage) {
            // This is the last stage, update status to Accepted
            jobApplication.stageStatuses.get(currentStage).status = 'Accepted';
            console.log(`Candidate accepted in the last stage: ${currentStage}`);

            // You might want to add an additional field to indicate the candidate is hired
            jobApplication.hired = true;
            jobApplication.hireDate = new Date();

            console.log('Updated last stage:', JSON.stringify(jobApplication.stageStatuses.get(currentStage), null, 2));
        } else {
            // Existing logic for moving to the next stage
            const nextStageConfig = stages[currentStageIndex + 1];
            const nextStage = nextStageConfig.name;

            console.log(`Moving from ${currentStage} to ${nextStage}`);

            // Update the current (previous) stage status to 'Cleared'
            jobApplication.stageStatuses.get(currentStage).status = 'Cleared';

            console.log('Updated current stage:', JSON.stringify(jobApplication.stageStatuses.get(currentStage), null, 2));

            // Initialize or update the next stage
            jobApplication.stageStatuses.set(nextStage, {
                status: nextStageConfig.requiresCall ? 'Pending' : 'Not Assigned',
                rejectionReason: 'N/A',
                assignedTo: null,
                score: {},
                currentCall: null,
                callHistory: []
            });

            console.log('New next stage:', JSON.stringify(jobApplication.stageStatuses.get(nextStage), null, 2));

            // Update the current stage
            jobApplication.currentStage = nextStage;
        }

        console.log('Updated job application state:', JSON.stringify(jobApplication, null, 2));

        // Mark the jobApplications field as modified
        candidate.markModified('jobApplications');

        // Save the updated candidate document
        await candidate.save();

        console.log('Candidate saved successfully');

        res.status(200).json({ 
            message: isLastStage ? 'Candidate accepted in the final stage' : 'Candidate moved to next stage successfully',
            nextStage: isLastStage ? currentStage : jobApplication.currentStage,
            previousStage: isLastStage ? null : currentStage,
            previousStageStatus: isLastStage ? 'Accepted' : 'Cleared'
        });
    } catch (error) {
        console.error('Error moving candidate:', error);
        res.status(500).json({ message: 'Error moving candidate', error: error.message });
    }
};


  export const updateCandidateRating = async (req, res) => {
    try {
      const { candidateId, jobId, rating } = req.body;
  
      const candidate = await candidates.findById(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);
  
      if (!jobApplication) {
        return res.status(404).json({ message: 'Job application not found for this candidate' });
      }
  
      jobApplication.rating = rating;
  
      // Mark the jobApplications field as modified
      candidate.markModified('jobApplications');
  
      await candidate.save();
  
      res.status(200).json({ 
        message: 'Candidate rating updated successfully',
        rating: rating
      });
    } catch (error) {
      console.error('Error updating candidate rating:', error);
      res.status(500).json({ message: 'Error updating candidate rating', error: error.message });
    }
  };


  export const getCandidateScores = async (req, res) => {
    const { candidateId, jobId } = req.params;
  
    try {
      // Find the candidate by ID
      const candidate = await candidates.findById(candidateId).lean();
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      // Find the specific job application by jobId
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === jobId
      );
  
      if (!jobApplication) {
        return res
          .status(404)
          .json({ message: 'Job application not found for this candidate' });
      }
  
      // Extract the stage statuses and their scores
      const stageStatuses = jobApplication.stageStatuses || {};
      const scores = {};
      let totalScore = 0; // Initialize total score
  
      // Use Object.entries() to iterate over a plain object
      for (const [stageName, stageStatus] of Object.entries(stageStatuses)) {
        // Handle the mixed type of 'score' appropriately
        const stageScore = stageStatus.score !== undefined ? stageStatus.score : {};
  
        scores[stageName] = stageScore; // Assign to scores object
  
        // Compute total score
        if (typeof stageScore === 'number') {
          totalScore += stageScore;
        } else if (typeof stageScore === 'object' && stageScore !== null) {
          // Sum up the numeric values in the object
          const sum = Object.values(stageScore).reduce((acc, val) => {
            if (typeof val === 'number') {
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
      console.error('Error fetching candidate scores:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const scheduleScreening = async (req, res) => {
    try {
        const { candidateId, jobId, date, time, assigneeId, meetingLink } = req.body;

        const candidate = await candidates.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const jobApplication = candidate.jobApplications.find(
            app => app.jobId.toString() === jobId
        );
        if (!jobApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        // Update the Screening stage status
        jobApplication.stageStatuses.set('Screening', {
            status: 'Call Scheduled',
            assignedTo: assigneeId,
            currentCall: {
                scheduledDate: date,
                scheduledTime: time,
                meetingLink: meetingLink
            }
        });

        // Save the changes
        await candidate.save();

        console.log('Candidate after save:', candidate.toObject());

        res.status(200).json({
            message: 'Screening call scheduled successfully',
            updatedStageStatus: jobApplication.stageStatuses.get('Screening')
        });
    } catch (error) {
        console.error('Error scheduling screening:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const scheduleCall = async (req, res) => {
  try {
      const { candidateId, jobId, stage, date, time, assigneeId, meetingLink } = req.body;

      const candidate = await candidates.findById(candidateId);
      if (!candidate) {
          return res.status(404).json({ message: 'Candidate not found' });
      }

      const jobApplication = candidate.jobApplications.find(
          app => app.jobId.toString() === jobId
      );
      if (!jobApplication) {
          return res.status(404).json({ message: 'Job application not found' });
      }

      // Validate if the stage is valid
      const validStages = ['Screening', 'Round 1', 'Round 2'];
      if (!validStages.includes(stage)) {
          return res.status(400).json({ message: 'Invalid stage' });
      }

      // Update the stage status
      jobApplication.stageStatuses.set(stage, {
          status: 'Call Scheduled',
          assignedTo: assigneeId,
          currentCall: {
              scheduledDate: date,
              scheduledTime: time,
              meetingLink: meetingLink
          }
      });

      // Save the changes
      await candidate.save();

      console.log('Candidate after save:', candidate.toObject());

      res.status(200).json({
          message: `${stage} call scheduled successfully`,
          updatedStageStatus: jobApplication.stageStatuses.get(stage)
      });
  } catch (error) {
      console.error('Error scheduling interview:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const rescheduleCall = async (req, res) => {
  try {
    const { candidateId, jobId, stage, date, time, assigneeId, meetingLink } = req.body;
    console.log('Rescheduling request received:', { candidateId, jobId, stage, date, time, assigneeId, meetingLink });

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      console.log('Candidate not found:', candidateId);
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const jobApplication = candidate.jobApplications.find(
      app => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      console.log('Job application not found:', jobId);
      return res.status(404).json({ message: 'Job application not found' });
    }

    console.log('Current job application:', JSON.stringify(jobApplication, null, 2));

    // Validate the stage
    const validStages = ['Screening', 'Round 1', 'Round 2'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: 'Invalid stage' });
    }

    // Get the stage status
    let stageStatus = jobApplication.stageStatuses.get(stage);

    // If stage status doesn't exist, initialize it
    if (!stageStatus) {
      console.log(`Initializing ${stage} stage status`);
      stageStatus = {
        status: 'Call Scheduled',
        assignedTo: assigneeId,
        currentCall: null,
        callHistory: []
      };
    }

    console.log(`Current ${stage} stage status:`, JSON.stringify(stageStatus, null, 2));

    // Move current call to call history if it exists
    if (stageStatus.currentCall) {
      console.log('Moving current call to history:', stageStatus.currentCall);
      if (!stageStatus.callHistory) {
        stageStatus.callHistory = [];
      }
      stageStatus.callHistory.unshift({
        ...stageStatus.currentCall,
        status: 'Rescheduled'
      });
    } else {
      console.log('No current call to move to history');
    }

    // Update current call with new details
    console.log('Updating current call with new details');
    stageStatus.currentCall = {
      scheduledDate: date,
      scheduledTime: time,
      meetingLink: meetingLink
    };
    stageStatus.assignedTo = assigneeId;
    stageStatus.status = 'Call Scheduled';

    // Update the stage status in the stageStatuses Map
    jobApplication.stageStatuses.set(stage, stageStatus);

    console.log(`Updated ${stage} stage status:`, JSON.stringify(stageStatus, null, 2));

    // Mark the jobApplications array as modified
    candidate.markModified('jobApplications');

    await candidate.save();
    console.log('Candidate saved successfully');

    const updatedCandidate = await candidates.findById(candidateId);
    const updatedJobApplication = updatedCandidate.jobApplications.find(
      app => app.jobId.toString() === jobId
    );
    const updatedStageStatus = updatedJobApplication.stageStatuses.get(stage);
    console.log(`Fetched updated ${stage} stage status:`, JSON.stringify(updatedStageStatus, null, 2));

    res.status(200).json({
      message: `${stage} call rescheduled successfully`,
      updatedStageStatus: updatedStageStatus
    });
  } catch (error) {
    console.error('Error rescheduling interview:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const rescheduleScreening = async (req, res) => {
  try {
    const { candidateId, jobId, date, time, assigneeId, meetingLink } = req.body;
    console.log('Rescheduling request received:', { candidateId, jobId, date, time, assigneeId, meetingLink });

    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      console.log('Candidate not found:', candidateId);
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const jobApplication = candidate.jobApplications.find(
      app => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      console.log('Job application not found:', jobId);
      return res.status(404).json({ message: 'Job application not found' });
    }

    console.log('Current job application:', JSON.stringify(jobApplication, null, 2));

    // Get the Screening stage status
    let screeningStatus = jobApplication.stageStatuses.get('Screening');

    // If Screening status doesn't exist, initialize it
    if (!screeningStatus) {
      console.log('Initializing Screening stage status');
      screeningStatus = {
        status: 'Call Scheduled',
        assignedTo: assigneeId,
        currentCall: null,
        callHistory: []
      };
    }

    console.log('Current Screening stage status:', JSON.stringify(screeningStatus, null, 2));

    // Move current call to call history if it exists
    if (screeningStatus.currentCall) {
      console.log('Moving current call to history:', screeningStatus.currentCall);
      if (!screeningStatus.callHistory) {
        screeningStatus.callHistory = [];
      }
      screeningStatus.callHistory.unshift({
        ...screeningStatus.currentCall,
        status: 'Rescheduled'
      });
    } else {
      console.log('No current call to move to history');
    }

    // Update current call with new details
    console.log('Updating current call with new details');
    screeningStatus.currentCall = {
      scheduledDate: date,
      scheduledTime: time,
      meetingLink: meetingLink
    };
    screeningStatus.assignedTo = assigneeId;
    screeningStatus.status = 'Call Scheduled';

    // Update the Screening status in the stageStatuses Map
    jobApplication.stageStatuses.set('Screening', screeningStatus);

    console.log('Updated Screening stage status:', JSON.stringify(screeningStatus, null, 2));

    // Mark the jobApplications array as modified
    candidate.markModified('jobApplications');

    await candidate.save();
    console.log('Candidate saved successfully');

    const updatedCandidate = await candidates.findById(candidateId);
    const updatedJobApplication = updatedCandidate.jobApplications.find(
      app => app.jobId.toString() === jobId
    );
    const updatedScreeningStatus = updatedJobApplication.stageStatuses.get('Screening');
    console.log('Fetched updated Screening stage status:', JSON.stringify(updatedScreeningStatus, null, 2));

    res.status(200).json({
      message: 'Screening call rescheduled successfully',
      updatedStageStatus: updatedScreeningStatus
    });
  } catch (error) {
    console.error('Error rescheduling screening:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// budgetScoreController.js

export const submitBudgetScore = async (req, res) => {
  try {
      const { candidateId, jobId, stage, score } = req.body;
      console.log('Received request:', { candidateId, jobId, stage, score });

      const candidate = await candidates.findById(candidateId);
      if (!candidate) {
          console.log('Candidate not found:', candidateId);
          return res.status(404).json({ message: 'Candidate not found' });
      }

      const jobApplication = candidate.jobApplications.find(
          app => app.jobId.toString() === jobId
      );
      if (!jobApplication) {
          console.log('Job application not found:', jobId);
          return res.status(404).json({ message: 'Job application not found' });
      }

      console.log('Job application found:', jobApplication);

      // Get the current stage status
      const stageStatus = jobApplication.stageStatuses.get(stage);
      if (!stageStatus) {
          console.log('Stage status not found:', stage);
          return res.status(404).json({ message: 'Stage status not found' });
      }

      console.log('Current stage status:', stageStatus);

      // Initialize score object if it doesn't exist
      if (!stageStatus.score) {
          stageStatus.score = {};
      }

      // Add or update the Budget score
      stageStatus.score.Budget = score;

      console.log('Updated stage status:', stageStatus);

      // Mark the nested fields as modified
      candidate.markModified(`jobApplications`);

      await candidate.save();
      console.log('Candidate saved successfully');

      res.status(200).json({
          message: 'Budget score submitted successfully',
          updatedScore: stageStatus.score
      });
  } catch (error) {
      console.error('Error submitting budget score:', error);
      res.status(500).json({ message: 'Server error', error: error.toString(), stack: error.stack });
  }
};


export const sendDesignTask = async (req, res) => {
  try {
      const { candidateId, jobId, taskDescription, dueDate, dueTime, candidateEmail } = req.body;

      const candidate = await candidates.findById(candidateId);
      if (!candidate) {
          return res.status(404).json({ message: 'Candidate not found' });
      }

      const jobApplication = candidate.jobApplications.find(
          app => app.jobId.toString() === jobId
      );
      if (!jobApplication) {
          return res.status(404).json({ message: 'Job application not found' });
      }

      // Update the Design Task stage status
      jobApplication.stageStatuses.set('Design Task', {
          status: 'Sent',
          currentCall: {
              scheduledDate: new Date(dueDate),
              scheduledTime: dueTime,
              meetingLink: '' // You can leave this empty or use it for a submission link if needed
          },
          taskDescription: taskDescription
      });

      // Send email to candidate
      const emailSubject = 'Design Task Assignment';
      const emailContent = `
          Dear ${candidate.firstName} ${candidate.lastName},

          You have been assigned a design task for your job application. Please find the details below:

          Task Description:
          ${taskDescription}

          Due Date: ${new Date(dueDate).toLocaleDateString()}
          Due Time: ${dueTime}

          Please submit your completed task before the due date and time.

          Best regards,
          [Your Company Name]
      `;

      await sendEmail(candidateEmail, emailSubject, emailContent);

      await candidate.save();

      res.status(200).json({
          message: 'Design task sent successfully',
          updatedStageStatus: jobApplication.stageStatuses.get('Design Task')
      });
  } catch (error) {
      console.error('Error sending design task:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const scoreRoundTwo = async (req, res) => {
  try {
      const { candidateId, jobId, score, feedback } = req.body;

      const candidate = await candidates.findById(candidateId);
      if (!candidate) {
          return res.status(404).json({ message: 'Candidate not found' });
      }

      const jobApplication = candidate.jobApplications.find(
          app => app.jobId.toString() === jobId
      );
      if (!jobApplication) {
          return res.status(404).json({ message: 'Job application not found' });
      }

      // Update the Round 2 stage status
      const roundTwoStatus = jobApplication.stageStatuses.get('Round 2');
      if (!roundTwoStatus || roundTwoStatus.status !== 'Under Review') {
          return res.status(400).json({ message: 'Round 2 is not under review' });
      }

      roundTwoStatus.status = 'Reviewed';
      roundTwoStatus.score = score;
      roundTwoStatus.feedback = feedback;

      jobApplication.stageStatuses.set('Round 2', roundTwoStatus);

      // Save the changes
      await candidate.save();

      res.status(200).json({
          message: 'Round 2 scored successfully',
          updatedStageStatus: roundTwoStatus
      });
  } catch (error) {
      console.error('Error scoring Round 2:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};