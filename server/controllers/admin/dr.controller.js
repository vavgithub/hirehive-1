//dr.controller.js

import mongoose from "mongoose";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { JOB_PROFILES, jobStagesStatuses } from "../../config/jobStagesStatuses.js";

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

import { captureError } from "../../utils/errorHandler.js";
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

    if (stage === 'Design Task') {
      if (stageStatus?.submittedTaskLink) {
        stageStatus.status = assigneeId ? 'Under Review' : stageStatus.status;
      }else{
        stageStatus.assignedTo = null;
      }
    }

    // Add more stage-specific logic here as needed

    // If this is the first stage and an assignee is added, update the current stage
    if (['Portfolio', 'Design Task'].includes(stage) && assigneeId && !jobApplication.currentStage) {
      jobApplication.currentStage = stage;
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

    res.status(200).json({ 
      message: 'Assignee updated successfully',
      updatedStageStatus: stageStatus,
      currentStage: jobApplication.currentStage
    });
  } catch (error) {
    captureError(error, { controller: "dr.controller.js", action: "updateCandidateAssignee" });

    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCandidateMultipleAssignee = async (req, res) => {
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

    // Update the assignees
    const updatedAssignees = [
      ...stageStatus.additionalReviewers,
      { assigneeId },
    ];
    stageStatus.additionalReviewers = updatedAssignees;

    // Update the status based on the stage
    if (stage === 'Portfolio') {
      stageStatus.status = (updatedAssignees?.length > 1 && assigneeId) ? 'Under Review' : 'Not Assigned';
    }

    if (stage === 'Design Task') {
      if (stageStatus?.submittedTaskLink) {
        stageStatus.status = assigneeId ? 'Under Review' : stageStatus.status;
      }else{
        stageStatus.assignedTo = null;
      }
    }

    // Add more stage-specific logic here as needed

    // If this is the first stage and an assignee is added, update the current stage
    if (['Portfolio', 'Design Task'].includes(stage) && assigneeId && !jobApplication.currentStage) {
      jobApplication.currentStage = stage;
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

    res.status(200).json({ 
      message: 'Additional Assignee added successfully',
      updatedStageStatus: stageStatus,
      currentStage: jobApplication.currentStage
    });
  } catch (error) {
    captureError(error, { controller: "dr.controller.js", action: "updateCandidateMultipleAssignee" });

    res.status(500).json({ message: 'Server error' });
  }
};


export const getAssignedCandidates = async (req, res) => {
  try {
    const designReviewerId = new mongoose.Types.ObjectId(req.user._id);

    const assignedCandidates = await candidates.aggregate([
      // Unwind jobApplications to process each one individually
      { $unwind: "$jobApplications" },
      // Convert stageStatuses map to an array
      {
        $addFields: {
          "jobApplications.stageStatusesArray": {
            $objectToArray: "$jobApplications.stageStatuses",
          },
        },
      },
      // Filter stageStatusesArray for stages assigned to the reviewer and 'Under Review'
      {
        $addFields: {
          "jobApplications.filteredStageStatusesArray": {
            $filter: {
              input: "$jobApplications.stageStatusesArray",
              as: "stageStatus",
              cond: {
                $and: [
                  { $eq: ["$$stageStatus.v.status", "Under Review"] },
                  {
                    $or: [
                      { $eq: ["$$stageStatus.v.assignedTo", designReviewerId] },
                      {
                        $gt: [
                          {
                            $size: {
                              $filter: {
                                input: {
                                  $ifNull: [
                                    "$$stageStatus.v.additionalReviewers",
                                    [],
                                  ],
                                },
                                as: "review",
                                cond: {
                                  $and: [
                                    {
                                      $eq: [
                                        "$$review.assigneeId",
                                        designReviewerId,
                                      ],
                                    },
                                    {
                                      $or: [
                                        { $eq: ["$$review.score", null] },
                                        { $not: ["$$review.score"] },
                                      ],
                                    },
                                  ],
                                },
                              },
                            },
                          },
                          0,
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      // Match only job applications that have relevant stages
      {
        $match: {
          "jobApplications.filteredStageStatusesArray": { $ne: [] },
        },
      },
      // Add currentStage field from the filtered stages
      {
        $addFields: {
          "jobApplications.currentStage": {
            $arrayElemAt: ["$jobApplications.filteredStageStatusesArray.k", 0],
          },
        },
      },
      // Reconstruct the stageStatuses map from the filtered array
      {
        $addFields: {
          "jobApplications.stageStatuses": {
            $arrayToObject: "$jobApplications.filteredStageStatusesArray",
          },
        },
      },
      // Remove temporary fields
      {
        $project: {
          "jobApplications.stageStatusesArray": 0,
          "jobApplications.filteredStageStatusesArray": 0,
        },
      },
      // Group back by candidate
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          email: { $first: "$email" },
          phone: { $first: "$phone" },
          profilePictureUrl: { $first: "$profilePictureUrl" },
          jobApplications: { $push: "$jobApplications" },
          portfolio: { $first: "$portfolio" }, // Adding portfolio here
        },
      },
      //Sorted with Firstname
      {
        $sort: {
          firstName: 1,
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
                captureError(error, { controller: "dr.controller.js", action: "getAssignedCandidates" });

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


    const filteredCandidatesWithDetails = candidatesWithJobDetails.filter(candidate=>candidate.jobApplications[0].currentStage !== "Round 2")

    res.status(200).json(filteredCandidatesWithDetails);
  } catch (error) {
    captureError(error, { controller: "dr.controller.js", action: "getAssignedCandidates" });

    res.status(500).json({ message: 'Server error' });
  }
};

export const getUnderReviewStats = async (req, res) => {
  try {
    const reviewerId = req.user._id; // Get the logged-in reviewer's ID from the protect middleware

    const stats = await candidates.aggregate([
      // Unwind the jobApplications array to work with each application individually
      { $unwind: '$jobApplications' },
      // Convert the stageStatuses map into an array for easier filtering
      { 
        $addFields: { 
          'jobApplications.stageStatusesArray': { $objectToArray: '$jobApplications.stageStatuses' }
        }
      },
      // Filter the array to only include stages that are 'Under Review' and assigned to the current reviewer
      { 
        $addFields: {
          'jobApplications.filteredStageStatusesArray': {
            $filter: {
              input: '$jobApplications.stageStatusesArray',
              as: 'stageStatus',
              cond: {
                $and: [
                  { $eq: ['$$stageStatus.v.status', 'Under Review'] },
                  { $eq: ['$$stageStatus.v.assignedTo', reviewerId] } // Filter by assigned reviewer
                ]
              }
            }
          }
        }
      },
      // Match only job applications that have relevant stages for this reviewer
      { $match: { 'jobApplications.filteredStageStatusesArray': { $ne: [] } } },
      // Group by stage to count the number of candidates in each stage
      {
        $group: {
          _id: '$jobApplications.currentStage',
          count: { $sum: 1 }
        }
      },
      // Format the result for easier front-end usage
      {
        $project: {
          stage: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Calculate the total count by summing the counts of all stages
    const totalCount = stats.reduce((acc, stat) => acc + stat.count, 0);

    // Add the total stat to the response
    stats.push({ stage: 'Total', count: totalCount });

    res.status(200).json({ stats });
  } catch (error) {
    captureError(error, { controller: "dr.controller.js", action: "getUnderReviewStats" });

    res.status(500).json({ message: 'Server error' });
  }
};




export const autoAssignPortfolios = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { jobId, reviewerIds, budgetMin, budgetMax } = req.body;

    if (
      !jobId ||
      !Array.isArray(reviewerIds) || 
      reviewerIds.length === 0 ||
      budgetMin === undefined ||
      budgetMax === undefined
    ) {
      return res.status(400).json({ message: 'Invalid input. Job ID, reviewer IDs, and budget range are required.' });
    }

    const objectJobId = new mongoose.Types.ObjectId(jobId);

    // STEP 1: Fetch eligible candidates inside session
    const eligibleCandidates = await candidates.find({
      jobApplications: {
        $elemMatch: {
          jobId: objectJobId,
          currentStage: 'Portfolio',
          'stageStatuses.Portfolio.status': 'Not Assigned'
        }
      },
      expectedCTC: { $gte: budgetMin, $lte: budgetMax }
    }).session(session);

    if (!eligibleCandidates.length) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'No eligible candidates found for assignment within the specified budget range.' });
    }

    const totalCandidates = eligibleCandidates.length;
    const reviewerCount = reviewerIds.length;

    const assignments = {};
    let assignmentCount = 0;

    // STEP 2: Shuffle candidates if desired
    // eligibleCandidates.sort(() => 0.5 - Math.random());

    // STEP 3: Assign each candidate in round-robin fashion
    for (let i = 0; i < totalCandidates; i++) {
      const candidate = eligibleCandidates[i];
      const reviewerIndex = i % reviewerCount;
      const reviewerId = reviewerIds[reviewerIndex];
      const objectReviewerId = new mongoose.Types.ObjectId(reviewerId);

      // STEP 4: Update candidate inside transaction and session
      const updated = await candidates.findOneAndUpdate(
        {
          _id: candidate._id,
          jobApplications: {
            $elemMatch: {
              jobId: objectJobId,
              currentStage: 'Portfolio',
              'stageStatuses.Portfolio.status': 'Not Assigned'
            }
          }
        },
        {
          $set: {
            'jobApplications.$.stageStatuses.Portfolio.status': 'Under Review',
            'jobApplications.$.stageStatuses.Portfolio.assignedTo': objectReviewerId
          }
        },
        { session, new: true }
      );

      if (updated) {
        assignmentCount++;
        assignments[reviewerId] = (assignments[reviewerId] || 0) + 1;
      }
    }

    await session.commitTransaction();
    res.status(200).json({
      message: 'Auto-assignment completed successfully',
      totalAssigned: assignmentCount,
      assignments
    });

  } catch (error) {
    captureError(error, { controller: "dr.controller.js", action: "autoAssignPortfolios" });

    await session.abortTransaction();
    res.status(500).json({ message: 'Server error during auto-assignment' });
  } finally {
    session.endSession(); // Always end session, even on error
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
     
     let isAdditionalReviewer = false
     // Update score and feedback
   if(stage === "Portfolio" && stageStatus.additionalReviewers?.length > 0){
      stageStatus.additionalReviewers?.map(rev => {
        if(rev.assigneeId?.toString() === req.user._id?.toString()){
          isAdditionalReviewer = true
          rev.score = ratings
          rev.feedback = feedback
          if(stageStatus.additionalReviewers?.length === 1){
            stageStatus.score = ratings
            stageStatus.feedback = feedback
          }
        }
      })
      if(!isAdditionalReviewer){
        stageStatus.score = ratings; // Can be a number or an object with multiple ratings
        stageStatus.feedback = feedback;
      }
    }else if(stage === "Screening"){
      // const jobBasedScoring = jobStagesStatuses[jobApplication.jobProfile ?? JOB_PROFILES.UIUX].find(stage => stage.name === "Screening").scoreConfig;
      // const mandatoryFields = Object.keys(jobBasedScoring).filter(key => key !== "Budget");
      // const missingFields = mandatoryFields.filter(key => !(key in ratings));
      // if (missingFields.length > 0) {
      //   return res.status(400).json({ message: `Ratings has some missing fields such as ${missingFields?.join(', ')}` });
      // }
      stageStatus.score = { ...ratings, Budget : stageStatus?.score?.Budget}; // Can be a number or an object with multiple ratings
      stageStatus.feedback = feedback; 
    }else{
       stageStatus.score = ratings; // Can be a number or an object with multiple ratings
       stageStatus.feedback = feedback;
     }
 
     // Update the status from 'Under Review' to 'Reviewed'
     if (stageStatus.status === 'Under Review' ) {
      if(stage === "Portfolio" ){
        const additional = stageStatus.additionalReviewers || [];
        if (additional.length > 0) {
          const hasScores = additional.every(
            (rev) => rev.score !== undefined && rev.score !== null
          );
          if (hasScores) {
            const primaryScore =
              typeof stageStatus.score === 'number' && !Number.isNaN(stageStatus.score)
                ? stageStatus.score
                : null;
            const allScores = [
              ...additional.map((r) => r.score),
              ...(primaryScore !== null ? [primaryScore] : []),
            ];
            stageStatus.overallScore = Math.round(
              allScores.reduce((acc, s) => acc + s, 0) / allScores.length
            );
            stageStatus.status = 'Reviewed';
          }
        } else if (stageStatus.score && stageStatus.feedback) {
          stageStatus.status = 'Reviewed';
        }
      }else{
        stageStatus.status = 'Reviewed';
      }
     } else {
       // Optionally handle cases where status is not 'Under Review'
       return res.status(400).json({ message: `Cannot review a stage with status '${stageStatus.status}'` });
     }

     //Writing Logs
     if(stageStatus.score){
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
 
     // Respond with success
     return res.status(200).json({ message: 'Review submitted successfully' });
   } catch (error) {
     captureError(error, { controller: "dr.controller.js", action: "submitScoreReview" });

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
      captureError(error, { controller: "dr.controller.js", action: "scheduleScreening" });

      res.status(500).json({ message: 'Server error' });
  }
};
 