import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";

export const getAllCandidatesForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
  
      // Validate jobId
      if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required' });
      }
  
      // Fetch the job to get its profile
      const job = await jobs.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Get the stages for this job profile
      const stages = jobStagesStatuses[job.jobProfile] || [];
  
      // Fetch candidates who have applied for this job
      const candidatesData = await candidates.find({
        'jobApplications.jobId': jobId,
        isVerified: true // Only fetch verified candidates
      });
  
      // Process and format the candidate data
      const formattedCandidates = candidatesData.map(candidate => {
        const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);
        
        // Initialize an object to store stage statuses
        const stageStatuses = {};
        stages.forEach(stage => {
          const stageStatus = jobApplication.stageStatuses.get(stage.name) || {
            status: 'Not Assigned',
            rejectionReason: 'N/A',
            assignedTo: null,
            score: {},
            currentCall: null,
            callHistory: []
          };
          stageStatuses[stage.name] = stageStatus;
        });
        // console.log("this is backend", candidate);
  
        return {
          _id: candidate._id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          email: candidate.email,
          phone: candidate.phone,
          expectedCTC : candidate.expectedCTC,
          experience:candidate.experience,
          resumeUrl:candidate.resumeUrl,
          website:candidate.website,
          portfolio:candidate.portfolio,
          rating:jobApplication.rating,
          currentStage: jobApplication.currentStage,
          applicationDate: jobApplication.applicationDate,
          stageStatuses: stageStatuses,
          questionResponses: jobApplication.questionResponses,
          // Add any other relevant fields
        };
      });
  
      res.status(200).json({
        candidates: formattedCandidates,
        stages: stages.map(stage => stage.name)
      });
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


export  const updateStatusAndStage = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      const updatedCandidate = await candidates.findByIdAndUpdate(id, updates, {
        new: true,
      });
  
      if (!updatedCandidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      res.json(updatedCandidate);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error updating candidate", error: error.message });
    }
  };

  export const getCandidateById = async (req, res) => {
    try {
      const { candidateId, jobId } = req.params;
  
      // Find the candidate
      const candidate = await candidates.findById(candidateId).select("-password");
  
      if (!candidate) {
        return res.status(404).send({ message: "Candidate not found" });
      }
  
      // Find the specific job application
      const jobApplication = candidate.jobApplications.find(
        app => app.jobId.toString() === jobId
      );
  
      if (!jobApplication) {
        return res.status(404).send({ message: "Job application not found for this candidate" });
      }
  
      // Construct the response object with relevant information
      const response = {
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        website: candidate.website,
        portfolio: candidate.portfolio,
        resumeUrl: jobApplication.resumeUrl || candidate.resumeUrl,
        noticePeriod: candidate.noticePeriod,
        currentCTC: candidate.currentCTC,
        expectedCTC: candidate.expectedCTC,
        experience: candidate.experience,
        skills: candidate.skills,
        location: candidate.location,
        jobApplication: {
          jobId: jobApplication.jobId,
          jobApplied: jobApplication.jobApplied,
          applicationDate: jobApplication.applicationDate,
          rating: jobApplication.rating,
          currentStage: jobApplication.currentStage,
          stageStatuses: jobApplication.stageStatuses,
          questionResponses: jobApplication.questionResponses
        }
      };
  
      res.send(response);
    } catch (error) {
      console.error("Error in getCandidateById:", error);
      res.status(500).send({ message: "Internal server error", error: error.message });
    }
  };


  export const getAllCandidatesWithStats = async (req, res) => {
    try {
      const allCandidates = await candidates.aggregate([
        {
          $unwind: '$jobApplications'
        },
        {
          $lookup: {
            from: 'jobs',
            localField: 'jobApplications.jobId',
            foreignField: '_id',
            as: 'jobDetails'
          }
        },
        {
          $unwind: '$jobDetails'
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            experience: 1,
            expectedCTC: 1,
            currentStage: '$jobApplications.currentStage',
            stageStatuses: '$jobApplications.stageStatuses',
            jobTitle: '$jobDetails.jobTitle',
            jobId: '$jobApplications.jobId',
            rating: '$jobApplications.rating',
            resumeUrl: '$jobApplications.resumeUrl',
            portfolio: 1
          }
        },
        {
          $addFields: {
            stageStatusesArray: { $objectToArray: '$stageStatuses' }
          }
        },
        {
          $addFields: {
            currentStageStatus: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$stageStatusesArray',
                    cond: { $eq: ['$$this.k', '$currentStage'] }
                  }
                },
                0
              ]
            }
          }
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            experience: 1,
            expectedCTC: 1,
            currentStage: 1,
            jobTitle: 1,
            jobId: 1,
            rating: 1,
            resumeUrl: 1,
            portfolio: 1,
            status: '$currentStageStatus.v.status'
          }
        }
      ]);
  
      const stats = {
        Total: allCandidates.length,
        Portfolio: 0,
        Screening: 0,
        'Design Task': 0,
        'Round 1': 0,
        'Round 2': 0,
        'Offer Sent': 0
      };
  
      allCandidates.forEach(candidate => {
        stats[candidate.currentStage] = (stats[candidate.currentStage] || 0) + 1;
      });
  
      res.status(200).json({
        candidates: allCandidates,
        stats: stats
      });
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };