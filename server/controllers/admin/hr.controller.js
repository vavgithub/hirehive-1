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
  
        Thank you for applying for the ${job.title} position at ${job.company}. 
        After careful review, we have decided to move forward with other candidates.
  
        We appreciate your interest in our company and wish you all the best in your job search.
  
        Best regards,
        HR Manager
        ${job.company}
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
  
      // Determine the next stage
      const nextStageConfig = stages[currentStageIndex + 1];
  
      if (!nextStageConfig) {
        return res.status(400).json({ message: 'This is the final stage' });
      }
  
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
  
      console.log('Updated job application state:', JSON.stringify(jobApplication, null, 2));
  
      // Mark the jobApplications field as modified
      candidate.markModified('jobApplications');
  
      // Save the updated candidate document
      await candidate.save();
  
      console.log('Candidate saved successfully');
  
      res.status(200).json({ 
        message: 'Candidate moved to next stage successfully',
        nextStage: nextStage,
        previousStage: currentStage,
        previousStageStatus: 'Cleared'
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

