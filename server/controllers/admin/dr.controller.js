import mongoose from "mongoose";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { jobStages } from "../../config/jobStages.js";

export const updateAssignee = async (req, res) => {
    try {
      const { candidateId, jobId, stage, assigneeId } = req.body;
  
      const candidate = await candidates.findById(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === jobId
      );
  
      if (!jobApplication) {
        return res.status(404).json({ message: 'Job application not found' });
      }
  
      if (!jobApplication.stageStatuses.has(stage)) {
        return res.status(404).json({ message: 'Stage not found' });
      }
  
      jobApplication.stageStatuses.get(stage).assignedTo = assigneeId;
  
      await candidate.save();
  
      res.status(200).json({ message: 'Assignee updated successfully' });
    } catch (error) {
      console.error('Error updating assignee:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getAssignedCandidates = async (req, res) => {
    try {
      const designReviewerId = new mongoose.Types.ObjectId(req.user._id);
  
      // Create a dynamic $or condition for all possible stages across all job profiles
      const stageConditions = Object.values(jobStages).flatMap(stages => 
        stages.map(stage => ({
          [`jobApplications.stageStatuses.${stage.name}.assignedTo`]: designReviewerId
        }))
      );
  
      const assignedCandidates = await candidates.aggregate([
        { $unwind: '$jobApplications' },
        {
          $match: {
            $or: stageConditions
          }
        },
        {
          $group: {
            _id: '$_id',
            firstName: { $first: '$firstName' },
            lastName: { $first: '$lastName' },
            email: { $first: '$email' },
            phone: { $first: '$phone' },
            jobApplications: { $push: '$jobApplications' }
          }
        }
      ]);
  
      const candidatesWithJobDetails = await Promise.all(assignedCandidates.map(async (candidate) => {
        const candidateWithJobs = {
          ...candidate,
          jobApplications: await Promise.all(candidate.jobApplications.map(async (application) => {
            let job;
            try {
              job = await jobs.findById(application.jobId);
              if (!job) {
                console.log(`Job not found for ID: ${application.jobId}`);
              }
            } catch (error) {
              console.error(`Error fetching job with ID ${application.jobId}:`, error);
            }
  
            const jobProfile = job ? job.jobProfile : application.jobProfile || 'Unknown Profile';
            const stages = jobStages[jobProfile] || [];
            
            // If stages are empty, log this unusual situation
            if (stages.length === 0) {
              console.log(`No stages found for job profile: ${jobProfile}`);
            }
  
            // Filter stageStatuses to include only the stages for this job profile
            const filteredStageStatuses = {};
            Object.keys(application.stageStatuses).forEach(stageName => {
              if (stages.some(stage => stage.name === stageName)) {
                filteredStageStatuses[stageName] = application.stageStatuses[stageName];
              }
            });
  
            return {
              ...application,
              jobTitle: job ? job.jobTitle : application.jobApplied || 'Unknown Job',
              jobProfile,
              stageStatuses: filteredStageStatuses
            };
          }))
        };
        return candidateWithJobs;
      }));
  
      res.status(200).json(candidatesWithJobDetails);
    } catch (error) {
      console.error('Error fetching assigned candidates:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };