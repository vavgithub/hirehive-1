import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";

// controllers/candidate.controller.js

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
      isVerified: true
    });

    // Process and format the candidate data
    const formattedCandidates = candidatesData.map(candidate => {
      const jobApplication = candidate.jobApplications.find(app => 
        app.jobId.toString() === jobId
      );
      
      // Initialize stage statuses
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

      // Get professional info specific to this job application
      const professionalInfo = jobApplication.professionalInfo || {
        website: candidate.website,
        portfolio: candidate.portfolio,
        noticePeriod: candidate.noticePeriod,
        currentCTC: candidate.currentCTC,
        expectedCTC: candidate.expectedCTC,
        experience: candidate.experience,
        skills: candidate.skills
      };

      return {
        // Personal info (remains constant)
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,

        // Professional info (specific to this job application)
        website: professionalInfo.website,
        portfolio: professionalInfo.portfolio,
        noticePeriod: professionalInfo.noticePeriod,
        currentCTC: professionalInfo.currentCTC,
        expectedCTC: professionalInfo.expectedCTC,
        experience: professionalInfo.experience,
        skills: professionalInfo.skills,

        // Job application specific info
        resumeUrl: jobApplication.resumeUrl,
        rating: jobApplication.rating,
        currentStage: jobApplication.currentStage,
        applicationDate: jobApplication.applicationDate,
        stageStatuses: stageStatuses,
        questionResponses: jobApplication.questionResponses,
      };
    });

    res.status(200).json({
      candidates: formattedCandidates,
      stages: stages.map(stage => stage.name)
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// export const getAllCandidatesForJob = async (req, res) => {
//     try {
//       const { jobId } = req.params;
  
//       // Validate jobId
//       if (!jobId) {
//         return res.status(400).json({ message: 'Job ID is required' });
//       }
  
//       // Fetch the job to get its profile
//       const job = await jobs.findById(jobId);
//       if (!job) {
//         return res.status(404).json({ message: 'Job not found' });
//       }
  
//       // Get the stages for this job profile
//       const stages = jobStagesStatuses[job.jobProfile] || [];
  
//       // Fetch candidates who have applied for this job
//       const candidatesData = await candidates.find({
//         'jobApplications.jobId': jobId,
//         isVerified: true // Only fetch verified candidates
//       });
  
//       // Process and format the candidate data
//       const formattedCandidates = candidatesData.map(candidate => {
//         const jobApplication = candidate.jobApplications.find(app => app.jobId.toString() === jobId);
        
//         // Initialize an object to store stage statuses
//         const stageStatuses = {};
//         stages.forEach(stage => {
//           const stageStatus = jobApplication.stageStatuses.get(stage.name) || {
//             status: 'Not Assigned',
//             rejectionReason: 'N/A',
//             assignedTo: null,
//             score: {},
//             currentCall: null,
//             callHistory: []
//           };
//           stageStatuses[stage.name] = stageStatus;
//         });
//         // console.log("this is backend", candidate);
  
//         return {
//           _id: candidate._id,
//           firstName: candidate.firstName,
//           lastName: candidate.lastName,
//           email: candidate.email,
//           phone: candidate.phone,
//           expectedCTC : candidate.expectedCTC,
//           experience:candidate.experience,
//           resumeUrl:candidate.resumeUrl,
//           website:candidate.website,
//           portfolio:candidate.portfolio,
//           rating:jobApplication.rating,
//           currentStage: jobApplication.currentStage,
//           applicationDate: jobApplication.applicationDate,
//           stageStatuses: stageStatuses,
//           questionResponses: jobApplication.questionResponses,
//           // Add any other relevant fields
//         };
//       });
  
//       res.status(200).json({
//         candidates: formattedCandidates,
//         stages: stages.map(stage => stage.name)
//       });
//     } catch (error) {
//       console.error('Error fetching candidates:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };


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

// controllers/candidate.controller.js

export const getCandidateById = async (req, res) => {
  try {
    const { candidateId, jobId } = req.params;

    // Find the candidate and job concurrently
    const [candidate, job] = await Promise.all([
      candidates.findById(candidateId).select("-password"),
      jobs.findById(jobId)
    ]);

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    // Find the specific job application
    const jobApplication = candidate.jobApplications.find(
      app => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res.status(404).send({ message: "Job application not found for this candidate" });
    }

    // Create a map of questions from the job
    const questionsMap = job.questions.reduce((acc, question) => {
      acc[question._id.toString()] = question;
      return acc;
    }, {});

    // Combine questions with answers
    const enrichedQuestionResponses = jobApplication.questionResponses.map(response => ({
      questionId: response.questionId,
      answer: response.answer,
      question: {
        text: questionsMap[response.questionId.toString()]?.text || "Question not found",
        type: questionsMap[response.questionId.toString()]?.type || "text",
        options: questionsMap[response.questionId.toString()]?.options || [],
        required: questionsMap[response.questionId.toString()]?.required || false,
        answerType: questionsMap[response.questionId.toString()]?.answerType || "text"
      }
    }));

    // Get professional info from job application or fall back to candidate's global info
    const professionalInfo = jobApplication.professionalInfo || {
      website: candidate.website,
      portfolio: candidate.portfolio,
      noticePeriod: candidate.noticePeriod,
      currentCTC: candidate.currentCTC,
      expectedCTC: candidate.expectedCTC,
      experience: candidate.experience,
      skills: candidate.skills
    };

    // Construct the response object with relevant information
    const response = {
      // Personal info (constant)
      _id: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      
      // Professional info (job-specific or fallback)
      website: professionalInfo.website,
      portfolio: professionalInfo.portfolio,
      noticePeriod: professionalInfo.noticePeriod,
      currentCTC: professionalInfo.currentCTC,
      expectedCTC: professionalInfo.expectedCTC,
      experience: professionalInfo.experience,
      skills: professionalInfo.skills,
      
      // Additional info
      location: candidate.location,
      resumeUrl: jobApplication.resumeUrl || candidate.resumeUrl,

      // Job application specific info
      jobApplication: {
        jobId: jobApplication.jobId,
        jobApplied: jobApplication.jobApplied,
        applicationDate: jobApplication.applicationDate,
        rating: jobApplication.rating,
        currentStage: jobApplication.currentStage,
        stageStatuses: jobApplication.stageStatuses,
        questionResponses: enrichedQuestionResponses,
        professionalInfo: jobApplication.professionalInfo
      }
    };

    res.send(response);
  } catch (error) {
    console.error("Error in getCandidateById:", error);
    res.status(500).send({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

  // export const getAllCandidatesWithStats = async (req, res) => {
  //   try {
  //     const allCandidates = await candidates.aggregate([
  //       {
  //         $unwind: '$jobApplications'
  //       },
  //       {
  //         $lookup: {
  //           from: 'jobs',
  //           localField: 'jobApplications.jobId',
  //           foreignField: '_id',
  //           as: 'jobDetails'
  //         }
  //       },
  //       {
  //         $unwind: '$jobDetails'
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           firstName: 1,
  //           lastName: 1,
  //           email: 1,
  //           phone: 1,
  //           experience: 1,
  //           expectedCTC: 1,
  //           currentStage: '$jobApplications.currentStage',
  //           stageStatuses: '$jobApplications.stageStatuses',
  //           jobTitle: '$jobDetails.jobTitle',
  //           jobId: '$jobApplications.jobId',
  //           rating: '$jobApplications.rating',
  //           resumeUrl: '$jobApplications.resumeUrl',
  //           portfolio: 1
  //         }
  //       },
  //       {
  //         $addFields: {
  //           stageStatusesArray: { $objectToArray: '$stageStatuses' }
  //         }
  //       },
  //       {
  //         $addFields: {
  //           currentStageStatus: {
  //             $arrayElemAt: [
  //               {
  //                 $filter: {
  //                   input: '$stageStatusesArray',
  //                   cond: { $eq: ['$$this.k', '$currentStage'] }
  //                 }
  //               },
  //               0
  //             ]
  //           }
  //         }
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           firstName: 1,
  //           lastName: 1,
  //           email: 1,
  //           phone: 1,
  //           experience: 1,
  //           expectedCTC: 1,
  //           currentStage: 1,
  //           jobTitle: 1,
  //           jobId: 1,
  //           rating: 1,
  //           resumeUrl: 1,
  //           portfolio: 1,
  //           status: '$currentStageStatus.v.status'
  //         }
  //       }
  //     ]);
  
  //     const stats = {
  //       Total: allCandidates.length,
  //       Portfolio: 0,
  //       Screening: 0,
  //       'Design Task': 0,
  //       'Round 1': 0,
  //       'Round 2': 0,
  //       'Offer Sent': 0
  //     };
  
  //     allCandidates.forEach(candidate => {
  //       stats[candidate.currentStage] = (stats[candidate.currentStage] || 0) + 1;
  //     });
  
  //     res.status(200).json({
  //       candidates: allCandidates,
  //       stats: stats
  //     });
  //   } catch (error) {
  //     console.error('Error fetching candidates:', error);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };


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
            // Personal info (constant across applications)
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            
            // Professional info (from job application or fallback to global)
            experience: {
              $ifNull: ['$jobApplications.professionalInfo.experience', '$experience']
            },
            expectedCTC: {
              $ifNull: ['$jobApplications.professionalInfo.expectedCTC', '$expectedCTC']
            },
            currentCTC: {
              $ifNull: ['$jobApplications.professionalInfo.currentCTC', '$currentCTC']
            },
            website: {
              $ifNull: ['$jobApplications.professionalInfo.website', '$website']
            },
            portfolio: {
              $ifNull: ['$jobApplications.professionalInfo.portfolio', '$portfolio']
            },
            noticePeriod: {
              $ifNull: ['$jobApplications.professionalInfo.noticePeriod', '$noticePeriod']
            },
            skills: {
              $ifNull: ['$jobApplications.professionalInfo.skills', '$skills']
            },
            
            // Job application specific info
            currentStage: '$jobApplications.currentStage',
            stageStatuses: '$jobApplications.stageStatuses',
            jobTitle: '$jobDetails.jobTitle',
            jobId: '$jobApplications.jobId',
            rating: '$jobApplications.rating',
            resumeUrl: '$jobApplications.resumeUrl',
            applicationDate: '$jobApplications.applicationDate'
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
            // Personal info
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            
            // Professional info
            experience: 1,
            expectedCTC: 1,
            currentCTC: 1,
            website: 1,
            portfolio: 1,
            noticePeriod: 1,
            skills: 1,
            
            // Job application info
            currentStage: 1,
            jobTitle: 1,
            jobId: 1,
            rating: 1,
            resumeUrl: 1,
            applicationDate: 1,
            status: '$currentStageStatus.v.status'
          }
        },
        {
          $sort: { applicationDate: -1 } // Sort by application date, newest first
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
      res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  };