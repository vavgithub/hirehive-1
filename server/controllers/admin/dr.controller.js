//dr.controller.js

import mongoose from "mongoose";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { updateStatusOnAssigneeChange } from "../../utils/statusManagement.js";
import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";

// export const updateAssignee = async (req, res) => {
//   try {
//     const { candidateId, jobId, stage, assigneeId } = req.body;

//     // Find the candidate
//     const candidate = await candidates.findById(candidateId);
//     if (!candidate) {
//       return res.status(404).json({ message: 'Candidate not found' });
//     }

//     // Find the specific job application
//     const jobApplication = candidate.jobApplications.find(
//       (app) => app.jobId.toString() === jobId
//     );
//     if (!jobApplication) {
//       return res.status(404).json({ message: 'Job application not found' });
//     }

//     // Initialize or update the stage status
//     if (!jobApplication.stageStatuses[stage]) {
//       jobApplication.stageStatuses[stage] = {
//         status: 'Not Assigned',
//         assignedTo: null,
//         rejectionReason: "N/A",
//         score: {},
//         currentCall: null,
//         callHistory: []
//       };
//     }

//     // Update the assignee and status
//     jobApplication.stageStatuses[stage].assignedTo = assigneeId;
//     jobApplication.stageStatuses[stage].status = assigneeId ? 'Under Review' : 'Not Assigned';

//     // Update the current stage if an assignee is added
//     if (assigneeId) {
//       jobApplication.currentStage = stage;
//     }

//     // Save the changes
//     await candidate.save();

//     res.status(200).json({ 
//       message: 'Assignee updated successfully',
//       updatedStageStatus: jobApplication.stageStatuses[stage],
//       currentStage: jobApplication.currentStage
//     });
//   } catch (error) {
//     console.error('Error updating assignee:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const updateCandidateAssignee = async (req, res) => {
  try {
    const { candidateId, jobId, stage, assigneeId } = req.body;

    // Find the candidate
    const candidate = await candidates.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Find the specific job application
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );
    if (!jobApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    // Initialize the stage status if it doesn't exist
    if (!jobApplication.stageStatuses.has(stage)) {
      jobApplication.stageStatuses.set(stage, {
        status: 'Not Assigned',
        assignedTo: null,
        rejectionReason: 'N/A',
        score: {},
        currentCall: null,
        callHistory: []
      });
    }

    const stageStatus = jobApplication.stageStatuses.get(stage);

    // Update the assignee
    stageStatus.assignedTo = assigneeId;

    // Update the status based on the stage
    if (stage === 'Portfolio') {
      stageStatus.status = assigneeId ? 'Under Review' : 'Not Assigned';
    }
    // Add more stage-specific logic here as needed

    // If this is the first stage and an assignee is added, update the current stage
    if (stage === 'Portfolio' && assigneeId && !jobApplication.currentStage) {
      jobApplication.currentStage = stage;
    }

    // Save the changes
    await candidate.save();

    res.status(200).json({ 
      message: 'Assignee updated successfully',
      updatedStageStatus: stageStatus,
      currentStage: jobApplication.currentStage
    });
  } catch (error) {
    console.error('Error updating assignee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAssignedCandidates = async (req, res) => {
  try {
    const designReviewerId = new mongoose.Types.ObjectId(req.user._id);

    const assignedCandidates = await candidates.aggregate([
      // Unwind jobApplications to process each one individually
      { $unwind: '$jobApplications' },
      // Convert stageStatuses map to an array
      {
        $addFields: {
          'jobApplications.stageStatusesArray': { $objectToArray: '$jobApplications.stageStatuses' },
        },
      },
      // Filter stageStatusesArray for stages assigned to the reviewer and 'Under Review'
      {
        $addFields: {
          'jobApplications.filteredStageStatusesArray': {
            $filter: {
              input: '$jobApplications.stageStatusesArray',
              as: 'stageStatus',
              cond: {
                $and: [
                  { $eq: ['$$stageStatus.v.assignedTo', designReviewerId] },
                  { $eq: ['$$stageStatus.v.status', 'Under Review'] },
                ],
              },
            },
          },
        },
      },
      // Match only job applications that have relevant stages
      {
        $match: {
          'jobApplications.filteredStageStatusesArray': { $ne: [] },
        },
      },
      // Add currentStage field from the filtered stages
      {
        $addFields: {
          'jobApplications.currentStage': {
            $arrayElemAt: ['$jobApplications.filteredStageStatusesArray.k', 0],
          },
        },
      },
      // Reconstruct the stageStatuses map from the filtered array
      {
        $addFields: {
          'jobApplications.stageStatuses': {
            $arrayToObject: '$jobApplications.filteredStageStatusesArray',
          },
        },
      },
      // Remove temporary fields
      {
        $project: {
          'jobApplications.stageStatusesArray': 0,
          'jobApplications.filteredStageStatusesArray': 0,
        },
      },
      // Group back by candidate
      {
        $group: {
          _id: '$_id',
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          email: { $first: '$email' },
          phone: { $first: '$phone' },
          jobApplications: { $push: '$jobApplications' },
        },
      },
    ]);

    // Fetch job details as before
    const candidatesWithJobDetails = await Promise.all(
      assignedCandidates.map(async (candidate) => {
        const candidateWithJobs = {
          ...candidate,
          jobApplications: await Promise.all(
            candidate.jobApplications.map(async (application) => {
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
              const stages = jobStagesStatuses[jobProfile] || [];

              if (stages.length === 0) {
                console.log(`No stages found for job profile: ${jobProfile}`);
              }

              return {
                ...application,
                jobTitle: job ? job.jobTitle : application.jobApplied || 'Unknown Job',
                jobProfile,
                // The stageStatuses are already filtered
              };
            })
          ),
        };
        return candidateWithJobs;
      })
    );

    res.status(200).json(candidatesWithJobDetails);
  } catch (error) {
    console.error('Error fetching assigned candidates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  export const autoAssignPortfolios = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { jobId, reviewerIds } = req.body;
  
      if (!jobId || !reviewerIds || reviewerIds.length === 0) {
        return res.status(400).json({ message: 'Invalid input. Job ID and at least one reviewer ID are required.' });
      }
  
      // Find all candidates for the given job in Portfolio stage with Not Assigned status
      const eligibleCandidates = await candidates.find({
        'jobApplications': {
          $elemMatch: {
            jobId: new mongoose.Types.ObjectId(jobId),
            currentStage: 'Portfolio',
            'stageStatuses.Portfolio.status': 'Not Assigned'
          }
        }
      }).session(session);
  
      if (eligibleCandidates.length === 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'No eligible candidates found for assignment.' });
      }
  
      // Calculate how many candidates each reviewer should get
      const candidatesPerReviewer = Math.floor(eligibleCandidates.length / reviewerIds.length);
      let remainingCandidates = eligibleCandidates.length % reviewerIds.length;
  
      let assignmentCount = 0;
      const assignments = {};
  
      // Distribute candidates among reviewers
      for (let i = 0; i < eligibleCandidates.length; i++) {
        const candidate = eligibleCandidates[i];
        const reviewerIndex = Math.floor(i / (candidatesPerReviewer + (remainingCandidates > 0 ? 1 : 0)));
        const reviewerId = reviewerIds[reviewerIndex];
  
        // Update candidate
        const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);
        if (jobApplication) {
          jobApplication.stageStatuses.Portfolio = {
            ...jobApplication.stageStatuses.Portfolio,
            status: 'Under Review',
            assignedTo: new mongoose.Types.ObjectId(reviewerId)
          };
          await candidate.save({ session });
          assignmentCount++;
  
          // Track assignments for response
          if (!assignments[reviewerId]) {
            assignments[reviewerId] = 0;
          }
          assignments[reviewerId]++;
        }
  
        if (i === (candidatesPerReviewer + (remainingCandidates > 0 ? 1 : 0)) * (reviewerIndex + 1) - 1) {
          remainingCandidates--;
        }
      }
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(200).json({
        message: 'Auto-assignment completed successfully',
        totalAssigned: assignmentCount,
        assignments: assignments
      });
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error in autoAssignPortfolios:', error);
      res.status(500).json({ message: 'Server error during auto-assignment' });
    }
  };

 export  const submitScoreReview = async (req, res) => {
   try {
     const { candidateId, jobId, stage, ratings, feedback } = req.body;
 
     // Validate required fields
     if (!candidateId || !jobId || !stage) {
       return res.status(400).json({ message: 'candidateId, jobId, and stage are required' });
     }
 
     // Find the candidate by ID
     const candidate = await candidates.findById(candidateId);
     if (!candidate) {
       return res.status(404).json({ message: 'Candidate not found' });
     }
 
     // Find the specific job application
     const jobApplication = candidate.jobApplications.find(
       (app) => app.jobId.toString() === jobId
     );
     if (!jobApplication) {
       return res.status(404).json({ message: 'Job application not found for this candidate' });
     }
 
     // Check if the stage exists in stageStatuses
     if (!jobApplication.stageStatuses.has(stage)) {
       return res.status(400).json({ message: `Stage '${stage}' not found in candidate's job application` });
     }
 
     // Update the stage status
     const stageStatus = jobApplication.stageStatuses.get(stage);
 
     // Update score and feedback
     stageStatus.score = ratings; // Can be a number or an object with multiple ratings
     stageStatus.feedback = feedback;
 
     // Update the status from 'Under Review' to 'Reviewed'
     if (stageStatus.status === 'Under Review') {
       stageStatus.status = 'Reviewed';
     } else {
       // Optionally handle cases where status is not 'Under Review'
       return res.status(400).json({ message: `Cannot review a stage with status '${stageStatus.status}'` });
     }
 
     // Save the updated candidate document
     await candidate.save();
 
     // Respond with success
     return res.status(200).json({ message: 'Review submitted successfully' });
   } catch (error) {
     console.error('Error in submitScoreReview:', error);
     return res.status(500).json({ message: 'Internal server error', error: error.message });
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

      jobApplication.stageStatuses.Screening = {
          status: 'Call Scheduled',
          assignedTo: assigneeId,
          currentCall: {
              scheduledDate: date,
              scheduledTime: time,
              meetingLink: meetingLink
          }
      };

      await candidate.save();

      res.status(200).json({
          message: 'Screening call scheduled successfully',
          updatedStageStatus: jobApplication.stageStatuses.Screening
      });
  } catch (error) {
      console.error('Error scheduling screening:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
 