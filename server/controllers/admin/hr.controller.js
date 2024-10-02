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