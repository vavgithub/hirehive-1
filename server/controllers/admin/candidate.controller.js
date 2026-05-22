import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { Question, seedQuestions } from "../../models/admin/questions.model.js";
import { User } from "../../models/admin/user.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { promises as fs } from "fs";
import path from "path";
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";
import { getPreviousMonthRange, getPreviousWeekRange, getYesterdayTodayRange } from "../../utils/dateRanges.js";
import mongoose from "mongoose";
import { EMAIL_REGEX } from "../../utils/validator.js";
import { Assessment } from "../../models/admin/assessment.model.js";
import { Company } from "../../models/admin/company.model.js";
import { getPlaceDetails } from "../../utils/integrations/google.js";
import { captureError } from "../../utils/errorHandler.js";

// controllers/candidate.controller.js

export const getAllCandidatesForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate jobId
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Fetch the job to get its profile
    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Get the stages for this job profile
    const stages = jobStagesStatuses[job.jobProfile] || [];

    const { location, locationId, sessionId, page, pageLimit, search, filter, sortFilters } = req.body;

    //Pagintation management
    const LIMIT = pageLimit || 10;
    const pageCount = page || null;
    let paginationFilter = [];

    if(pageCount){
      const skipCount = (pageCount - 1) * LIMIT
      paginationFilter = [
        {
          $skip : skipCount
        },
        {
          $limit : LIMIT
        }
      ]
    }
    
    //Search filtering
    let searchQuery = [];
    if (search !== "") {
      searchQuery = [{
        $match: {
          $or: [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            // add more fields as needed
          ]
        }
      }];
    }

    const sortArray = Object.entries(sortFilters || {});
    let sortQuery = []

    if(sortArray?.length !== 0){
      sortArray.map(([key,value]) => {
        if(value === 'asc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.hourlyRate" : 1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.currentCTC" : 1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.expectedCTC" : 1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.experience" : 1}
                }
              ]
            }else if(key === 'score'){
              sortQuery = [
                {
                  $addFields: {
                    stageScore: {
                      $let: {
                        vars: {
                          current: "$jobApplications.currentStage",
                          stageStatusesArr: { $objectToArray: "$jobApplications.stageStatuses" }
                        },
                        in: {
                          $first: {
                            $map: {
                              input: {
                                $filter: {
                                  input: "$$stageStatusesArr",
                                  as: "item",
                                  cond: { $eq: ["$$item.k", "$$current"] }
                                }
                              },
                              as: "match",
                              in: "$$match.v.score"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                {
                  $addFields: {
                    totalScore: {
                      $cond: [
                        { $isNumber: "$stageScore" },
                        "$stageScore",
                        {
                          $cond: [
                            { $eq: [{ $type: "$stageScore" }, "object"] },
                            {
                              $sum: {
                                $map: {
                                  input: { $objectToArray: "$stageScore" },
                                  as: "item",
                                  in: "$$item.v"
                                }
                              }
                            },
                            0
                          ]
                        }
                      ]
                    }
                  }
                },
                { $sort: { totalScore: 1 } },
              ]
            }
          }else if(value === 'desc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.hourlyRate" : -1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.currentCTC" : -1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.expectedCTC" : -1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.experience" : -1}
                }
              ]
            }else if(key === 'score'){
              sortQuery = [
                {
                  $addFields: {
                    stageScore: {
                      $let: {
                        vars: {
                          current: "$jobApplications.currentStage",
                          stageStatusesArr: { $objectToArray: "$jobApplications.stageStatuses" }
                        },
                        in: {
                          $first: {
                            $map: {
                              input: {
                                $filter: {
                                  input: "$$stageStatusesArr",
                                  as: "item",
                                  cond: { $eq: ["$$item.k", "$$current"] }
                                }
                              },
                              as: "match",
                              in: "$$match.v.score"
                            }
                          }
                        }
                      }
                    }
                  }
                },
                {
                  $addFields: {
                    totalScore: {
                      $cond: [
                        { $isNumber: "$stageScore" },
                        "$stageScore",
                        {
                          $cond: [
                            { $eq: [{ $type: "$stageScore" }, "object"] },
                            {
                              $sum: {
                                $map: {
                                  input: { $objectToArray: "$stageScore" },
                                  as: "item",
                                  in: "$$item.v"
                                }
                              }
                            },
                            0
                          ]
                        }
                      ]
                    }
                  }
                },
                { $sort: { totalScore: -1 } },
              ]
            }
          }
      })
    }

    //Data filtering
    const filterArray = Object.entries(filter || {})
    let statusFilter = []
    let stageFilter = []
    let assessmentFilter = []
    let ratingFilter = []
    let assigneeFilter = []
    let budgetFilter = []

    if(filterArray?.length !== 0){
      filterArray.map(([key,value]) => {
        if(key === 'status'){
          if(Array.isArray(value)){
            statusFilter = [
              {
                $match: {
                  $expr: {
                    $in: [
                      {
                        $getField: {
                          field: "status",
                          input: {
                            $getField: {
                              field: "$jobApplications.currentStage",
                              input: "$jobApplications.stageStatuses"
                            }
                          }
                        }
                      },
                      value  // <-- list all allowed statuses here
                    ]
                  }
                }
              }
            ]
          }
        }
        if(key === 'stage'){
          if(Array.isArray(value)){
            stageFilter = [
               {
                  $match: {
                    "jobApplications.currentStage": {
                      $in: value
                    }
                  }
                },
            ]
          }
        }
        if(key === 'assessment'){
          let isCompleted = false;
          let isNotCompleted = false;
          value.map(state => {
            state === "Completed" && (isCompleted = true)
            state === "Not Completed" && (isNotCompleted = true)
          })
          if (isCompleted && !isNotCompleted) {
            assessmentFilter = [
              {
                $match: {
                  "jobApplications.assessmentResponse": { $type: "object" }
                }
              },
            ]
          } else if (!isCompleted && isNotCompleted) {
            assessmentFilter = [
              {
                $match: {
                  "jobApplications.assessmentResponse": { $exists: false }
                }
              },
            ]
          }
        }
        if(key === 'rating'){
          ratingFilter = [
            {
              $match : {
                "jobApplications.rating" : { $in : value}
              }
            }
          ]
        }
        if(key === 'assignee' && value){
          if(Array.isArray(value)){
            const selectedAssigneeIds = value.map(assignee => new mongoose.Types.ObjectId(assignee._id));
            assigneeFilter = [
              {
                $match: {
                  $expr: {
                    $in: [
                      {
                        $getField: {
                          field: "assignedTo",
                          input: {
                            $getField: {
                              field: "$jobApplications.currentStage",
                              input: "$jobApplications.stageStatuses"
                            }
                          }
                        }
                      },
                      selectedAssigneeIds // array of ObjectIds
                    ]
                  }
                }
              }

            ]
          }
        }
        if(key === 'budget'){
          if (value?.from != null || value?.to != null) {
            const rangeQuery = {};

            if (value.from != null) {
              rangeQuery.$gte = Number(value?.from || 0);
            }
            if (value.to != null) {
              rangeQuery.$lte = Number(value?.to || Infinity);
            }
            if(job.employmentType === "Part Time" || job.employmentType === "Contract"){
              budgetFilter.push({
                $match: {
                  "jobApplications.professionalInfo.hourlyRate": rangeQuery
                }
              });
            }else{
              budgetFilter.push({
                $match: {
                  "jobApplications.professionalInfo.expectedCTC": rangeQuery
                }
              });
            }
          }
        }
      })

    }

    let geoFilter = null;
    if (locationId && sessionId) {
      const result = await getPlaceDetails(locationId, sessionId);
      if (result.latlng?.longitude && result.latlng?.latitude) {
        geoFilter = {
          coordinates: [
            parseFloat(result.latlng.longitude),
            parseFloat(result.latlng.latitude)
          ]
        };
      }
    }

    // Build location filters
    const locationConditions = [];
    if (location) {
      locationConditions.push({ location: { $regex: location, $options: 'i' } });
    }
    if (geoFilter?.coordinates) {
      locationConditions.push({
        geoLocation: {
          $geoWithin: {
            $centerSphere: [
              [geoFilter.coordinates[0], geoFilter.coordinates[1]],
              100000 / 6371000 // ~100km radius in radians
            ]
          }
        }
      });
    }

    const pipeline = [
      { $match: { isVerified: true } },
      ...searchQuery,
      ...(locationConditions.length > 0 ? [{ $match: { $or: locationConditions } }] : []),
      { $unwind: "$jobApplications" },
      { $match: { "jobApplications.jobId": new mongoose.Types.ObjectId(jobId) } },

      // ✅ Filter based on different criteria
      ...budgetFilter,
      ...stageFilter,
      ...statusFilter,
      ...assigneeFilter,
      ...ratingFilter,
      ...assessmentFilter,

      { $sort: { "jobApplications.applicationDate": -1 } },
      ...sortQuery,

      // ✅ Use $facet to split pipeline into 2 branches
      {
        $facet: {
          candidates: [
            { $project: { password: 0 } },
            ...paginationFilter // include skip & limit here
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      },
      // ✅ Format the totalCount as number (0 if empty)
      {
        $addFields: {
          totalCount: {
            $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0]
          }
        }
      }
    ];

    const candidatesData = await candidates.aggregate(pipeline);


    // Process and format the candidate data
    const formattedCandidates = candidatesData[0].candidates.map((candidate) => {
      const jobApplication = candidate.jobApplications
      // Initialize stage statuses
      const stageStatuses = {};
      stages.forEach((stage) => {
        const stageStatus = jobApplication.stageStatuses[stage.name] || {
          status: "Not Assigned",
          rejectionReason: "N/A",
          assignedTo: null,
          score: {},
          currentCall: null,
          callHistory: [],
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
        hourlyRate: candidate.hourlyRate,
        experience: candidate.experience,
        skills: candidate.skills,
      };

      const assessmentDetails = {
        assessment_id : jobApplication.assessment_id,
        assessmentResponse : jobApplication.assessmentResponse
      }

      return {
        // Personal info (remains constant)
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        profilePictureUrl: candidate.profilePictureUrl,
        hasGivenAssessment: candidate.hasGivenAssessment,
        // Professional info (specific to this job application)
        website: professionalInfo.website,
        portfolio: professionalInfo.portfolio,
        noticePeriod: professionalInfo.noticePeriod,
        currentCTC: professionalInfo.currentCTC,
        expectedCTC: professionalInfo.expectedCTC,
        experience: professionalInfo.experience,
        hourlyRate: professionalInfo.hourlyRate,
        skills: professionalInfo.skills,

        // Job application specific info
        resumeUrl: jobApplication.resumeUrl,
        rating: jobApplication.rating,
        currentStage: jobApplication.currentStage,
        applicationDate: jobApplication.applicationDate,
        stageStatuses: stageStatuses,
        questionResponses: jobApplication.questionResponses,

        //Assessment Details
        ...assessmentDetails
      };
    });


    res.status(200).json({
      candidates: formattedCandidates,
      totalCount : candidatesData[0]?.totalCount || 0,
      stages: stages.map((stage) => stage.name),
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getAllCandidatesForJob", role: "admin" });

    console.error("Error fetching candidates:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
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

export const updateCandidateProfessionalDetails = async (req, res) => {
  try {
    const { id, jobId } = req.params;
    const { experience, noticePeriod, hourlyRate, currentCTC, expectedCTC } =
      req.body;

    // Fetch candidate
    const [candidate, job] = await Promise.all([
      candidates.findById(id),
      jobs.findById(jobId)
    ]);

    if (!candidate) {
      return res.status(400).json({ message: "Invalid Candidate Data" });
    }

    // Fetch job
    if (!job) {
      return res.status(400).json({ message: "Invalid Job Data" });
    }

    // Validation based on employment type
    if (
      job?.employmentType === "Contract" ||
      job?.employmentType === "Part Time"
    ) {
      if (!hourlyRate || hourlyRate.toString().trim() === "") {
        return res.status(400).json({
          message: "Hourly Rate is Required for Part Time / Contract Jobs",
        });
      }
    }
    if (
      !(
        job?.employmentType === "Contract" ||
        job?.employmentType === "Part Time"
      )
    ) {
      if (!currentCTC || currentCTC.toString().trim() === "") {
        return res
          .status(400)
          .json({ message: "Current CTC is Required for Full Time Jobs" });
      }
      if (!expectedCTC || expectedCTC.toString().trim() === "") {
        return res
          .status(400)
          .json({ message: "Expected CTC is Required for Full Time Jobs" });
      }
    }

    const professionalInfo = {
      ...candidate.jobApplications
        ?.find((app) => app.jobId?.toString() === jobId)
        ?.professionalInfo.toObject(),
      expectedCTC,
      currentCTC,
      hourlyRate,
      experience,
      noticePeriod,
    };

    const updateCandidate = await candidates.findOneAndUpdate(
      {
        _id: id,
        "jobApplications.jobId": jobId,
      },
      {
        $set: {
          "jobApplications.$.professionalInfo": professionalInfo,
        },
      }
    );

    res.status(200).json({ message: "Candidate details updated successfully" });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "updateCandidateProfessionalDetails", role: "admin" });

    res
      .status(400)
      .json({ message: "Error updating candidate", error: error.message });
  }
};

export const updateCandidateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      firstName,
      lastName , 
      email , 
      phone, 
      portfolio, 
      website , 
      experience , 
      currentCTC ,
      expectedCTC ,
      hourlyRate , 
      noticePeriod } = req.body;

    // Validate mandatory text fields
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() || 
      !EMAIL_REGEX.test(email) || 
      !phone?.trim() ||
      !portfolio?.trim()
    ) {
      return res.status(400).json({ message: "All required fields must be provided and not empty" });
    }

    // Validate numeric fields
    if (
      isNaN(Number(experience)) ||
      isNaN(Number(currentCTC)) ||
      isNaN(Number(expectedCTC)) ||
      isNaN(Number(hourlyRate)) ||
      isNaN(Number(noticePeriod))
    ) {
      return res.status(400).json({ message: "Numeric fields must be valid numbers" });
    }

    const updatedCandidate = await candidates.findByIdAndUpdate(id, 
      {
          firstName,
          lastName,
          email,
          phone,
          portfolio,
          website,
          experience,
          currentCTC,
          expectedCTC,
          hourlyRate,
          noticePeriod
      }, {
      new: true,
    });

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "updateCandidateProfile", role: "admin" });

    res
      .status(400)
      .json({ message: "Error updating candidate", error: error.message });
  }
};

export const updateStatusAndStage = async (req, res) => {
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
    captureError(error, { controller: "candidate.controller.js", action: "updateStatusAndStage", role: "admin" });

    res
      .status(400)
      .json({ message: "Error updating candidate", error: error.message });
  }
};

// controllers/candidate.controller.js

export const getCandidateById = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
    const { candidateId, jobId } = req.params;

    // Find the candidate
    const candidate = await candidates
      .findById(candidateId)
      .select("-password");

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    // Find the specific job application
    const jobApplication = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!jobApplication) {
      return res
        .status(404)
        .send({ message: "Job application not found for this candidate" });
    }

    // Try to find the job, but don't fail if not found
    const job = await jobs.findById(jobId).catch(() => null);

    // Handle question responses even if job is deleted
    let enrichedQuestionResponses = [];
    if (job && job.questions) {
      // Create a map of questions from the job
      const questionsMap = job.questions.reduce((acc, question) => {
        acc[question._id.toString()] = question;
        return acc;
      }, {});

      // Combine questions with answers
      enrichedQuestionResponses = jobApplication.questionResponses.map(
        (response) => ({
          questionId: response.questionId,
          answer: response.answer,
          question: {
            text:
              questionsMap[response.questionId.toString()]?.text ||
              "Original question no longer available",
            type: questionsMap[response.questionId.toString()]?.type || "text",
            options:
              questionsMap[response.questionId.toString()]?.options || [],
            required:
              questionsMap[response.questionId.toString()]?.required || false,
            answerType:
              questionsMap[response.questionId.toString()]?.answerType ||
              "text",
          },
        })
      );
    } else {
      // If job is deleted, still show the answers but with placeholder question info
      enrichedQuestionResponses = jobApplication.questionResponses.map(
        (response) => ({
          questionId: response.questionId,
          answer: response.answer,
          question: {
            text: "Original question no longer available",
            type: "text",
            options: [],
            required: false,
            answerType: "text",
          },
        })
      );
    }

    // Get professional info from job application or fall back to candidate's global info
    const professionalInfo = jobApplication.professionalInfo || {
      website: candidate.website,
      portfolio: candidate.portfolio,
      noticePeriod: candidate.noticePeriod,
      currentCTC: candidate.currentCTC,
      expectedCTC: candidate.expectedCTC,
      hourlyRate: candidate.hourlyRate,
      experience: candidate.experience,
      skills: candidate.skills,
    };

    // Construct the response object with relevant information
    const response = {
      // Personal info (constant)
      _id: candidate._id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      dob: candidate.dob,
      profilePictureUrl: candidate.profilePictureUrl,
      hasGivenAssessment: candidate.hasGivenAssessment,

      // Professional info (job-specific or fallback)
      website: professionalInfo.website,
      portfolio: professionalInfo.portfolio,
      noticePeriod: professionalInfo.noticePeriod,
      currentCTC: professionalInfo.currentCTC,
      expectedCTC: professionalInfo.expectedCTC,
      hourlyRate: professionalInfo.hourlyRate,
      experience: professionalInfo.experience,
      skills: professionalInfo.skills,

      // Additional info
      location: candidate.location,
      resumeUrl: jobApplication.resumeUrl || candidate.resumeUrl,

      // Job application specific info
      jobApplication: {
        jobId: jobApplication.jobId,
        jobApplied: jobApplication.jobApplied,
        jobProfile: jobApplication?.jobProfile || "UI UX", //Dont remove this fallback value
        jobStatus: job ? job.status : "deleted",
        notes: jobApplication.notes,
        jobType: job ? job.employmentType : "NA",
        applicationDate: jobApplication.applicationDate,
        assessment_id: jobApplication.assessment_id,
        assessmentResponse: jobApplication.assessmentResponse,
        shortlisted: jobApplication.shortlisted,
        rating: jobApplication.rating,
        currentStage: jobApplication.currentStage,
        stageStatuses: jobApplication.stageStatuses,
        questionResponses: enrichedQuestionResponses,
        professionalInfo: jobApplication.professionalInfo,
      },

      //Entire job applications
      applications: candidate?.jobApplications,
    };

    res.send(response);
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getCandidateById", role: "admin" });

    console.error("Error in getCandidateById:", error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addNotes = async (req, res) => {
  try {
    const { candidateId, jobId } = req.params;
    const { notes } = req.body;

    const sanitizedNotes = sanitizeLexicalHtml(notes);

    if (!sanitizedNotes) {
      return res.status(404).send({ message: "Invalid notes data" });
    }

    // Find the candidate and job
    const candidate = await candidates.findById(candidateId);
    const hasJob = candidate.jobApplications.find(
      (app) => app.jobId.toString() === jobId
    );

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    if (!hasJob) {
      return res.status(404).send({ message: "Job not found" });
    }

    candidate.jobApplications.forEach((app) => {
      if (app.jobId.toString() === jobId) {
        app.notes = {
          content: sanitizedNotes,
          addedDate: new Date(),
        };
      }
      return app;
    });

    await candidate.save();

    res.status(200).json({ message: "Notes added successfully" });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "addNotes", role: "admin" });

    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCandidateJobs = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { company_id } = req.user;

    // Find the candidate
    const candidate = await candidates
      .findById(candidateId)
      .select("-password");

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    let companyFilteredApplications = []
    if(candidate?.jobApplications.length > 0){
      companyFilteredApplications = candidate.jobApplications?.filter(app => app.companyDetails?._id?.toString() === company_id?.toString())
    }

    res.status(200).json({
      jobs: companyFilteredApplications,
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getCandidateJobs", role: "admin" });

    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllCandidates = async (req,res) => {
  try {
    const company_id = req.user.company_id;
    
    const { location , locationId, sessionId , page , pageLimit, search, filter ,sortFilters } = req.body;

    //Pagintation management
    const LIMIT = pageLimit || 10;
    const pageCount = page || null;
    let paginationFilter = [];

    if(pageCount){
      const skipCount = (pageCount - 1) * LIMIT
      paginationFilter = [
        {
          $skip : skipCount
        },
        {
          $limit : LIMIT
        }
      ]
    }
    
    //Search filtering
    let searchQuery = [];
    if (search !== "") {
      searchQuery = [{
        $match: {
          $or: [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            // add more fields as needed
          ]
        }
      }];
    }

    const sortArray = Object.entries(sortFilters);
    let sortQuery = []
    
    if(sortArray?.length !== 0){
      sortArray.map(([key,value]) => {
        if(value === 'asc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {hourlyRate : 1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {currentCTC : 1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {expectedCTC : 1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {experience : 1}
                }
              ]
            }
          }else if(value === 'desc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {hourlyRate : -1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {currentCTC : -1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {expectedCTC : -1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {experience : -1}
                }
              ]
            }
          }
      })
    }

    //Data filtering
    const filterArray = Object.entries(filter)
    let filterQuery = []

    if(filterArray?.length !== 0){
      let encodedFilters = {}
      filterArray.map(([key,value]) => {
        if(key === 'status'){
          const statusValues = Array.isArray(value) ? value : [value];
          const stageStatusValues = statusValues.filter(
            (s) => s !== 'Escalated' && s !== 'escalated'
          );
          if (stageStatusValues.length) {
            encodedFilters.status = { $in: stageStatusValues };
          }
          if (statusValues.includes('escalated') || statusValues.includes('Escalated')) {
            encodedFilters.aiTriggerStatus = { $in: ['escalated'] };
          }
        }
        if(key === 'stage'){
          encodedFilters.currentStage = {$in : value}
        }
        if(key === 'assessment'){
          let isCompleted = false;
          let isNotCompleted = false;
          value.map(state => {
            state === "Completed" && (isCompleted = true)
            state === "Not Completed" && (isNotCompleted = true)
          })
          if (isCompleted && !isNotCompleted) {
            encodedFilters.hasGivenAssessment = true
            encodedFilters.assessmentResponse = { $ne : false }
          } else if (!isCompleted && isNotCompleted) {
            encodedFilters.hasGivenAssessment = false
            encodedFilters.assessmentResponse = false
          }
        }
        if(key === 'rating'){
          encodedFilters.rating = { $in : value }
        }
        if(key === 'showContractors' && value){
          encodedFilters.jobType = "Contract"
        }else if(key === 'job Type'){
          encodedFilters.jobType = { $in : value }
        }
      })

      filterQuery = [
        {
          $match : encodedFilters
        }
      ]
      console.log('[Filter] encodedFilters:', JSON.stringify(encodedFilters));
      console.log('[Filter] filterQuery:', JSON.stringify(filterQuery));
    }

    //Location filter management
    let geoFilter = null;
    if(locationId && sessionId){
        const result = await getPlaceDetails(locationId,sessionId);
        if(result.latlng?.longitude && result.latlng?.latitude){
          geoFilter = {
              coordinates : [parseFloat(result.latlng.longitude) , parseFloat(result.latlng.latitude)]
          }
        }
    }
    // Find all users in the same company
    const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
    // Extract user _id values into an array
    const userIds = usersInCompany.map(user => user._id);

    const allCandidates = await candidates.aggregate([
        // First branch: regex match
      ...(location
        ? [{ $match: { location: { $regex: location, $options: 'i' } } }]
        : []
      ),

      // Union with second branch: geolocation match
      ...(geoFilter?.coordinates
        ? [{
            $unionWith: {
              coll: candidates.collection.name,
              pipeline: [{
                $match: {
                  geoLocation: {
                    $geoWithin: {
                      $centerSphere: [
                        [ geoFilter.coordinates[0], geoFilter.coordinates[1] ],
                        100000 / 6371000
                      ]
                    }
                  }
                }
              }]
            }
          }]
        : []
      ),
      // Now dedupe by candidate _id
      {
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }
      },
      {
        $match: { isVerified: true }, // Filter only verified candidates
      },
      ...searchQuery,
      {
        $unwind: "$jobApplications",
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobApplications.jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $addFields: {
          jobDetail: { $arrayElemAt: ["$jobDetails", 0] },
        },
      },
      // Filter only those applications for jobs created by the logged-in admin
      {
        $match: {
          "jobDetail.createdBy": { $in: userIds } 
        }
      },
      // Project the required fields
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          profilePictureUrl: 1,
          hasGivenAssessment: 1,
          experience: {
            $ifNull: [
              "$jobApplications.professionalInfo.experience",
              "$experience",
            ],
          },
          expectedCTC: {
            $ifNull: [
              "$jobApplications.professionalInfo.expectedCTC",
              "$expectedCTC",
            ],
          },
          currentCTC: {
            $ifNull: [
              "$jobApplications.professionalInfo.currentCTC",
              "$currentCTC",
            ],
          },
          hourlyRate: {
            $ifNull: [
              "$jobApplications.professionalInfo.hourlyRate",
              "$hourlyRate",
            ],
          },
          website: {
            $ifNull: ["$jobApplications.professionalInfo.website", "$website"],
          },
          portfolio: {
            $ifNull: [
              "$jobApplications.professionalInfo.portfolio",
              "$portfolio",
            ],
          },
          noticePeriod: {
            $ifNull: [
              "$jobApplications.professionalInfo.noticePeriod",
              "$noticePeriod",
            ],
          },
          skills: {
            $ifNull: ["$jobApplications.professionalInfo.skills", "$skills"],
          },
          currentStage: "$jobApplications.currentStage",
          stageStatuses: "$jobApplications.stageStatuses",
          jobTitle: {
            $ifNull: ["$jobDetail.jobTitle", "$jobApplications.jobApplied"],
          },
          jobType: {
            $ifNull: ['$jobDetail.employmentType', '$jobApplications.jobType']
          },
          assessment_id : "$jobApplications.assessment_id",
          assessmentResponse : {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$jobApplications.assessmentResponse", null] },
                  { $ne: [{ $type: "$jobApplications.assessmentResponse" }, "missing"] }
                ]
              },
              then: true,
              else: false
            }
          },
          jobId: "$jobApplications.jobId",
          rating: "$jobApplications.rating",
          resumeUrl: "$jobApplications.resumeUrl",
          applicationDate: "$jobApplications.applicationDate",
          aiTriggerStatus: '$jobApplications.aiTriggerStatus',
          aiScoredAt: '$jobApplications.aiScoredAt',
        },
      },
      {
        $addFields: {
          stageStatusesArray: { $objectToArray: "$stageStatuses" },
        },
      },
      {
        $addFields: {
          currentStageStatus: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$stageStatusesArray",
                  cond: { $eq: ["$$this.k", "$currentStage"] },
                },
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
          profilePictureUrl: 1,
          hasGivenAssessment: 1,
          experience: 1,
          expectedCTC: 1,
          currentCTC: 1,
          hourlyRate: 1,
          website: 1,
          portfolio: 1,
          noticePeriod: 1,
          skills: 1,
          currentStage: 1,
          jobTitle: 1,
          jobType: 1,
          jobId: 1,
          rating: 1,
          resumeUrl: 1,
          applicationDate: 1,
          assessment_id : 1,
          assessmentResponse : 1,
          status: '$currentStageStatus.v.status',
          aiTriggerStatus: 1,
          aiScoredAt: 1,
        }
      },
      ...filterQuery,
      {
        $sort: { applicationDate: -1 }
      },
      ...sortQuery,
      {
        $facet: {
          totalCount: [
            { $count: "count" }
          ],
          candidates: [
            ...paginationFilter
          ]
        }
      },
      {
        $project: {
          totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
          candidates: 1
        }
      }
    ]);

    return res.status(200).json({allCandidates : allCandidates[0].candidates,totalCandidates :  allCandidates[0].totalCount});
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getAllCandidates", role: "admin" });

      console.error('Error fetching candidates:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
  }
}

export const getAllCandidatesWithStats = async (req, res) => {
  try {
    const adminId = req.user._id; // Extract the admin's _id from the authenticated user
    const company_id = req.user.company_id;
    
    // Find all users in the same company
    const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
    // Extract user _id values into an array
    const userIds = usersInCompany.map(user => user._id);

    const allCandidates = await candidates.aggregate([

      {
        $match: { isVerified: true }, // Filter only verified candidates
      },
      {
        $unwind: "$jobApplications",
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobApplications.jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $addFields: {
          jobDetail: { $arrayElemAt: ["$jobDetails", 0] },
        },
      },
      // Filter only those applications for jobs created by the logged-in admin
      {
        $match: {
          "jobDetail.createdBy": { $in: userIds } 
        }
      },
      // Project the required fields
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          profilePictureUrl: 1,
          hasGivenAssessment: 1,
          experience: {
            $ifNull: [
              "$jobApplications.professionalInfo.experience",
              "$experience",
            ],
          },
          expectedCTC: {
            $ifNull: [
              "$jobApplications.professionalInfo.expectedCTC",
              "$expectedCTC",
            ],
          },
          currentCTC: {
            $ifNull: [
              "$jobApplications.professionalInfo.currentCTC",
              "$currentCTC",
            ],
          },
          hourlyRate: {
            $ifNull: [
              "$jobApplications.professionalInfo.hourlyRate",
              "$hourlyRate",
            ],
          },
          website: {
            $ifNull: ["$jobApplications.professionalInfo.website", "$website"],
          },
          portfolio: {
            $ifNull: [
              "$jobApplications.professionalInfo.portfolio",
              "$portfolio",
            ],
          },
          noticePeriod: {
            $ifNull: [
              "$jobApplications.professionalInfo.noticePeriod",
              "$noticePeriod",
            ],
          },
          skills: {
            $ifNull: ["$jobApplications.professionalInfo.skills", "$skills"],
          },
          currentStage: "$jobApplications.currentStage",
          stageStatuses: "$jobApplications.stageStatuses",
          jobTitle: {
            $ifNull: ["$jobDetail.jobTitle", "$jobApplications.jobApplied"],
          },
          jobType: {
            $ifNull: ['$jobDetail.employmentType', '$jobApplications.jobType']
          },
          assessment_id : "$jobApplications.assessment_id",
          assessmentResponse : {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$jobApplications.assessmentResponse", null] },
                  { $ne: [{ $type: "$jobApplications.assessmentResponse" }, "missing"] }
                ]
              },
              then: true,
              else: false
            }
          },
          jobId: "$jobApplications.jobId",
          rating: "$jobApplications.rating",
          resumeUrl: "$jobApplications.resumeUrl",
          applicationDate: "$jobApplications.applicationDate",
        },
      },
      {
        $addFields: {
          stageStatusesArray: { $objectToArray: "$stageStatuses" },
        },
      },
      {
        $addFields: {
          currentStageStatus: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$stageStatusesArray",
                  cond: { $eq: ["$$this.k", "$currentStage"] },
                },
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
          profilePictureUrl: 1,
          hasGivenAssessment: 1,
          experience: 1,
          expectedCTC: 1,
          currentCTC: 1,
          hourlyRate: 1,
          website: 1,
          portfolio: 1,
          noticePeriod: 1,
          skills: 1,
          currentStage: 1,
          jobTitle: 1,
          jobType: 1,
          jobId: 1,
          rating: 1,
          resumeUrl: 1,
          applicationDate: 1,
          assessment_id : 1,
          assessmentResponse : 1,
          status: '$currentStageStatus.v.status'
        }
      },
    ]);

    const { firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth } = getPreviousMonthRange();
    const { firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek } = getPreviousWeekRange();
    const { startOfYesterday, endOfYesterday, startOfToday } = getYesterdayTodayRange();
    
    const getCandidateCounts = async (companyId, firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth, firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek, startOfYesterday, endOfYesterday, startOfToday) => {
      const pipeline = [
        { $unwind: "$jobApplications" }, // Flatten jobApplications array
        {
          $match: {
            isVerified: true,
            "jobApplications.companyDetails._id": companyId,
            createdAt: { $gte: firstDayPreviousMonth } // Broad filter covering all periods
          }
        },
        {
          $facet: {
            previousMonth: [
              {
                $match: {
                  createdAt: { $gte: firstDayPreviousMonth, $lte: lastDayPreviousMonth }
                }
              },
              { $count: "totalJobs" }
            ],
            currentMonth: [
              {
                $match: {
                  createdAt: { $gte: firstDayCurrentMonth }
                }
              },
              { $count: "totalJobs" }
            ],
            previousWeek: [
              {
                $match: {
                  createdAt: { $gte: firstDayPreviousWeek, $lte: lastDayPreviousWeek }
                }
              },
              { $count: "totalJobs" }
            ],
            currentWeek: [
              {
                $match: {
                  createdAt: { $gte: firstDayCurrentWeek }
                }
              },
              { $count: "totalJobs" }
            ],
            yesterday: [
              {
                $match: {
                  createdAt: { $gte: startOfYesterday, $lte: endOfYesterday }
                }
              },
              { $count: "totalJobs" }
            ],
            today: [
              {
                $match: {
                  createdAt: { $gte: startOfToday }
                }
              },
              { $count: "totalJobs" }
            ]
          }
        },
        {
          $project: {
            previousMonthJobs: { $arrayElemAt: ["$previousMonth.totalJobs", 0] },
            currentMonthJobs: { $arrayElemAt: ["$currentMonth.totalJobs", 0] },
            previousWeekJobs: { $arrayElemAt: ["$previousWeek.totalJobs", 0] },
            currentWeekJobs: { $arrayElemAt: ["$currentWeek.totalJobs", 0] },
            yesterdayJobs: { $arrayElemAt: ["$yesterday.totalJobs", 0] },
            todayJobs: { $arrayElemAt: ["$today.totalJobs", 0] }
          }
        }
      ];
    
      const result = await candidates.aggregate(pipeline);
      return {
        previousMonthJobs: result[0]?.previousMonthJobs || 0,
        currentMonthJobs: result[0]?.currentMonthJobs || 0,
        previousWeekJobs: result[0]?.previousWeekJobs || 0,
        currentWeekJobs: result[0]?.currentWeekJobs || 0,
        yesterdayJobs: result[0]?.yesterdayJobs || 0,
        todayJobs: result[0]?.todayJobs || 0
      };
    };
    
    // Execute query
    const {
      previousMonthJobs,
      currentMonthJobs,
      previousWeekJobs,
      currentWeekJobs,
      yesterdayJobs,
      todayJobs
    } = await getCandidateCounts(
      req.user.company_id,
      firstDayPreviousMonth,
      lastDayPreviousMonth,
      firstDayCurrentMonth,
      firstDayPreviousWeek,
      lastDayPreviousWeek,
      firstDayCurrentWeek,
      startOfYesterday,
      endOfYesterday,
      startOfToday
    );
    
    // Calculate percentage changes (unchanged)
    let monthlyPercentageChange = 0;
    if (previousMonthJobs === 0) {
      monthlyPercentageChange = currentMonthJobs * 100;
    } else {
      monthlyPercentageChange = ((currentMonthJobs - previousMonthJobs) / previousMonthJobs) * 100;
    }
    
    let weeklyPercentageChange = 0;
    if (previousWeekJobs === 0) {
      weeklyPercentageChange = currentWeekJobs * 100;
    } else {
      weeklyPercentageChange = ((currentWeekJobs - previousWeekJobs) / previousWeekJobs) * 100;
    }
    
    let dailyPercentageChange = 0;
    if (yesterdayJobs === 0) {
      dailyPercentageChange = todayJobs * 100;
    } else {
      dailyPercentageChange = ((todayJobs - yesterdayJobs) / yesterdayJobs) * 100;
    }

    const stats = {
      Total: allCandidates.length,
      Portfolio: 0,
      Screening: 0,
      'Design Task': 0,
      'Round 1': 0,
      'Round 2': 0,
      'Offer Sent': 0,
      'Hired': 0,
      statistics: {
        total: {
          monthly: Math.round(monthlyPercentageChange),
          weekly: Math.round(weeklyPercentageChange),
          daily: Math.round(dailyPercentageChange),
        },        
      }
    };

    allCandidates.forEach(candidate => {
      if (candidate.currentStage) {
        stats[candidate.currentStage] = (stats[candidate.currentStage] || 0) + 1;
      }
    });

    res.status(200).json({
      candidates: allCandidates,
      stats: stats
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getCandidateCounts", role: "admin" });

    console.error('Error fetching candidates:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const getRandomQuestions = async (req, res) => {
  try {
    // First, check if we have any questions in the database
    const questionCount = await Question.countDocuments();

    if (questionCount === 0) {
      console.log("No questions found in database. Seeding questions...");
      await seedQuestions(); // Make sure this is imported
    }

    const questions = await Question.aggregate([
      { $sample: { size: 10 } },
      {
        $project: {
          id: "$_id",
          questionType: 1,
          text: 1,
          imageUrl: 1,
          options: {
            $map: {
              input: "$options",
              as: "option",
              in: {
                text: "$$option.text",
                imageUrl: "$$option.imageUrl",
              },
            },
          },
        },
      },
    ]);

    console.log(`Found ${questions.length} questions`);

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "No questions available",
      });
    }

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getRandomQuestions", role: "admin" });

    console.error("Error in getRandomQuestions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};

export const getAssessmentQuestionsById = async (req, res) => {
  try {
    const  { assessmentId } = req.query;
    
    if(!assessmentId){
      return res.status(400).json({
        message : "No Assessment Id Found"
      })
    }

    const company_id = req.user.company_id;
    let hasAccess = false;
    if(company_id){
      const company = await Company.findById({_id : company_id});

      //Criteria to Allow Users to Assessment Questions is Team member to be 3 or above
      if(company.assessmentAccess){
        if(company.assessmentAccess === "ALLOWED"){
          hasAccess = true
        }
      }else if(company?.invited_team_members?.filter(member => member?.status === "JOINED")?.length >= 3){
        hasAccess = true
      }
    }

    if(!hasAccess){
      res.status(405).json({
        error: 'No Access for Assessment',
        hasAccess
      });
    }else{

      const assessmentObjectId = new mongoose.Types.ObjectId(assessmentId);
  
      const result =  await Assessment.aggregate([
        { $match: { _id: assessmentObjectId } },
        { $project: { questions: 1 ,title : 1 , category : 1} },
        { $unwind: "$questions" },
        { $match: {
            $or: [
              { "questions.inActive": { $exists: false } },
              { "questions.inActive": false }
            ]
        } },
        {
          $addFields: {
            "questions.options": {
              $map: {
                input: "$questions.options",
                as: "opt",
                in: {
                  text: "$$opt.text",
                  imageUrl: "$$opt.imageUrl"
                  // 'isCorrect' is intentionally omitted
                }
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id",
            title : { $first : '$title'},
            category : { $first : '$category'},
            questions: { $push: "$questions" }
          }
        }
      ]);  
  
      console.log(`Found ${result[0]?.questions?.length} questions`);
  
      res.status(200).json({
        success: true,
        title : result[0]?.title,
        category : result[0]?.category,
        questions : result[0]?.questions,
      });
    }
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getAssessmentQuestionsById", role: "admin" });

    console.error("Error in getRandomQuestions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};


export const getRandomAssessmentQuestions = async (req, res) => {
  try {
    const  { assessmentId } = req.query;
    
    if(!assessmentId){
      return res.status(400).json({
        message : "No Assessment Id Found"
      })
    }
    const assessmentObjectId = new mongoose.Types.ObjectId(assessmentId);

    const result = await Assessment.aggregate([
      { $match: { _id: assessmentObjectId } },
      { $project: { questions: 1 } },
      { $unwind: "$questions" },
      { $match: {
          $or: [
            { "questions.inActive": { $exists: false } },
            { "questions.inActive": false }
          ]
      } },
      { $sample: { size: 10 } },
      {
        $addFields: {
          "questions.options": {
            $map: {
              input: "$questions.options",
              as: "opt",
              in: {
                text: "$$opt.text",
                imageUrl: "$$opt.imageUrl"
                // 'isCorrect' is intentionally omitted
              }
            }
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          questions: { $push: "$questions" }
        }
      }
    ]);  

    console.log(`Found ${result[0]?.questions?.length} questions`);

    res.status(200).json({
      success: true,
      questions : result[0]?.questions,
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getRandomAssessmentQuestions", role: "admin" });

    console.error("Error in getRandomQuestions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};

export const submitQuestionnaireAttempt = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { assessment_id, answers, totalTimeInSeconds, recordingUrl } = req.body;
    // Get questions to check correct answers
    const questionIds = Object.keys(answers);
    const assessment = await Assessment.findById({ _id: assessment_id });
    const questions = assessment.questions.filter(question => questionIds.includes(question._id.toString()));

    let responses = [];
    let score = 0;
    let correctAnswers = 0;
    if (questionIds.length > 0) {
      // Process answers and calculate score
      responses = questions.map((question) => {
        const selectedAnswer = answers[question._id];
        const correctOption = question.options.find((opt) => opt.isCorrect);
        const isCorrect = selectedAnswer === correctOption.text;

        return {
          questionId: question._id,
          selectedAnswer,
          isCorrect,
        };
      });

      correctAnswers = responses.filter((r) => r.isCorrect).length;
      score = correctAnswers * 10;
    }

    // Create attempt data
    const attemptData = {
      title : assessment?.title,
      category : assessment?.category,
      totalTimeInSeconds,
      score,
      responses,
      recordingUrl, // Add this field
    };
    
    // Update candidate
    const candidate = await candidates.findById(
      {_id : candidateId}
    );

    let hasPendingAssessment = false;

    for(let application of candidate.jobApplications){
      if(application?.assessment_id?.toString() === assessment_id){
        application.assessmentResponse = attemptData
      }else if(application?.assessment_id && !application.assessmentResponse){
        hasPendingAssessment = true
      }
    }

    if(!hasPendingAssessment){
      candidate.hasGivenAssessment = true
    }
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Assessment completed successfully",
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "submitQuestionnaireAttempt", role: "admin" });

    console.error("Error in submitQuestionnaireAttempt:", error);
    res.status(500).json({
      success: false,
      message: "Error saving assessment",
      error: error.message,
    });
  }
};

export const getQuestionnaireDetails = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const candidate = await candidates
      .findById(candidateId)
      .select(
        "questionnaireAttempts firstName lastName phone email profilePictureUrl"
      )
      .lean();

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Get the latest attempt
    const latestAttempt =
      candidate.questionnaireAttempts[
        candidate.questionnaireAttempts.length - 1
      ];

    if (!latestAttempt) {
      return res.status(404).json({
        success: false,
        message: "No questionnaire attempts found for this candidate",
      });
    }

    // Get all question details in one query
    const questionIds = latestAttempt.responses.map(
      (response) => response.questionId
    );
    const questions = await Question.find({ _id: { $in: questionIds } }).lean();

    // Create a map for quick question lookup
    const questionMap = questions.reduce((acc, question) => {
      acc[question._id.toString()] = question;
      return acc;
    }, {});

    // Calculate statistics
    const totalQuestions = latestAttempt.responses.length;
    const correctAnswers = latestAttempt.responses.filter(
      (response) => response.isCorrect
    ).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    // Format time
    const timeInMinutes = Math.floor(latestAttempt.totalTimeInSeconds / 60);
    const timeInSeconds = latestAttempt.totalTimeInSeconds % 60;
    const formattedTime = `${timeInMinutes}mins ${timeInSeconds}seconds`;

    // Enhanced response with question details
    const response = {
      success: true,
      data: {
        candidateInfo: {
          name: `${candidate.firstName} ${candidate.lastName}`,
          email: candidate.email,
          phone: candidate.phone,
          score: latestAttempt.score,
          profilePictureUrl: candidate?.profilePictureUrl,
          recordingUrl: latestAttempt.recordingUrl,
          totalTimeSpent: formattedTime,
          attemptDate: latestAttempt.attemptDate,
        },
        assessmentStats: {
          totalQuestions,
          correctAnswers,
          incorrectAnswers,
          scoreOutOf100: latestAttempt.score,
        },
        questionResponses: latestAttempt.responses.map((response, index) => {
          const question = questionMap[response.questionId.toString()];
          return {
            questionNumber: index + 1,
            questionId: response.questionId,
            questionDetails: {
              text: question.text,
              type: question.questionType,
              category: question.category,
              difficulty: question.difficulty,
              imageUrl: question.imageUrl,
              options: question.options.map((opt) => ({
                text: opt.text,
                imageUrl: opt.imageUrl,
                isCorrect: opt.isCorrect,
              })),
            },
            selectedAnswer: response.selectedAnswer,
            isCorrect: response.isCorrect,
          };
        }),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getQuestionnaireDetails", role: "admin" });

    console.error("Error in getQuestionnaireDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getJobBasedQuestionnaireDetails = async (req, res) => {
  try {
    const { candidateId , jobId} = req.params;

    const candidate = await candidates
      .findById(candidateId)
      .select(
        " firstName lastName phone email profilePictureUrl jobApplications"
      )
      .lean();

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    const application = candidate.jobApplications.find(app => app.jobId?.toString() === jobId);

    // Get the latest attempt
    const latestAttempt = application?.assessmentResponse;

    if (!latestAttempt) {
      return res.status(404).json({
        success: false,
        message: "No questionnaire attempts found for this candidate",
      });
    }
    // Get all question details in one query
    const questionIds = latestAttempt.responses.map(
      (response) => response.questionId.toString()
    );
    const assessment = await Assessment.findById({ _id: application?.assessment_id });
    const questions = assessment.questions.filter(question => questionIds.includes(question._id.toString()));

    // Create a map for quick question lookup
    const questionMap = questions.reduce((acc, question) => {
      acc[question._id.toString()] = question;
      return acc;
    }, {});

    // Calculate statistics
    const totalQuestions = latestAttempt.responses.length;
    const correctAnswers = latestAttempt.responses.filter(
      (response) => response.isCorrect
    ).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    // Format time
    const timeInMinutes = Math.floor(latestAttempt.totalTimeInSeconds / 60);
    const timeInSeconds = latestAttempt.totalTimeInSeconds % 60;
    const formattedTime = `${timeInMinutes}mins ${timeInSeconds}seconds`;

    // Enhanced response with question details
    const response = {
      success: true,
      data: {
        candidateInfo: {
          name: `${candidate.firstName} ${candidate.lastName}`,
          email: candidate.email,
          phone: candidate.phone,
          score: latestAttempt.score,
          profilePictureUrl: candidate?.profilePictureUrl,
          recordingUrl: latestAttempt.recordingUrl,
          totalTimeSpent: formattedTime,
          attemptDate: latestAttempt.attemptDate,
        },
        assessmentStats: {
          totalQuestions,
          correctAnswers,
          incorrectAnswers,
          scoreOutOf100: latestAttempt.score,
        },
        assessment : {
          _id:assessment._id,
          title : assessment.title ?? latestAttempt?.title,
          category : assessment.category ?? latestAttempt?.category,
        },
        questionResponses: latestAttempt.responses.map((response, index) => {
          const question = questionMap[response.questionId.toString()];
          return {
            questionNumber: index + 1,
            questionId: response.questionId,
            questionDetails: {
              text: question.text,
              type: question.questionType,
              category: question.category,
              difficulty: question.difficulty,
              imageUrl: question.imageUrl,
              options: question.options.map((opt) => ({
                text: opt.text,
                imageUrl: opt.imageUrl,
                isCorrect: opt.isCorrect,
              })),
            },
            selectedAnswer: response.selectedAnswer,
            isCorrect: response.isCorrect,
          };
        }),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "getJobBasedQuestionnaireDetails", role: "admin" });

    console.error("Error in getQuestionnaireDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//NOT USING -( ASSESSMENT RECORDING UPLOADED VIA FRONTEND) 
export const uploadAssessmentRecording = async (req, res) => {
  try {
    console.log("Upload request received:", {
      file: req.file,
      body: req.body,
    });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video file uploaded",
      });
    }

    // // Pass the full file path directly
    // const videoUrl = await uploadToCloudinary(
    //   req.file.path,
    //   "assessment-recordings"
    // );

    return res.status(200).json({
      success: true,
      videoUrl,
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "uploadAssessmentRecording", role: "admin" });

    console.error("Error in uploadAssessmentRecording:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process video upload",
    });
  }
};

export const toggleShortlistCandidate = async (req, res) => {
  try {
    const { candidateId, jobId } = req.params;
    const { shortlisted } = req.body;

    // Find candidate and update shortlisted status for the specific job application
    const candidate = await candidates.findOneAndUpdate(
      {
        _id: candidateId,
        "jobApplications.jobId": new mongoose.Types.ObjectId(jobId),
      },
      {
        $set: { "jobApplications.$.shortlisted": shortlisted },
      },
      { new: true }
    );

    if (!candidate) {
      return res
        .status(404)
        .json({ message: "Candidate or job application not found" });
    }

    return res.status(200).json({
      message: `Candidate ${
        shortlisted ? "shortlisted" : "removed from shortlist"
      } successfully`,
      candidate,
    });
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "toggleShortlistCandidate", role: "admin" });

    console.error("Error updating shortlist status:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// export const shortlistCandidate = async (req, res) => {
//   try {
//     // Find all candidates with at least one shortlisted job application
//     const shortlistedCandidates = await candidates.find({
//       "jobApplications.shortlisted": true,
//     });

//     // Format response to include only relevant information
//     const formattedCandidates = shortlistedCandidates.map((candidate) => {
//       // Filter only shortlisted job applications
//       const shortlistedApplications = candidate.jobApplications.filter(
//         (app) => app.shortlisted
//       );
      
//       console.log("this is backendb shortlisted", shortlistedApplications);
      
//       return {
//         _id: candidate._id,
//         firstName: candidate.firstName,
//         lastName: candidate.lastName,
//         email: candidate.email,
//         phone: candidate.phone,
//         profilePictureUrl: candidate.profilePictureUrl,
//         location: candidate.location,
//         portfolio: candidate.portfolio,
//         website: candidate.website,
//         resumeUrl: candidate.resumeUrl,
//         experience: candidate.experience,
//         applications: shortlistedApplications.map((app) => ({
//           jobId: app.jobId,
//           jobApplied: app.jobApplied,
//           applicationDate: app.applicationDate,
//           currentStage: app.currentStage,
//           status: app.status,
//           rating: app.rating,
//           currentCTC: app.professionalInfo?.currentCTC || 0,
//           expectedCTC: app.professionalInfo?.expectedCTC || 0,
//           hourlyRate: app.professionalInfo?.hourlyRate || 0,
//         })),
//       };
//     });
    
//     console.log("this is backend", formattedCandidates);
//     return res.status(200).json({ candidates: formattedCandidates });
//   } catch (error) {
//     console.error("Error fetching shortlisted candidates:", error);
//     return res
//     .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };


export const shortlistCandidate = async (req, res) => {
  try {

    const { company_id } = req.params;

    const { location, locationId, sessionId , page, pageLimit, search, filter, sortFilters } = req.body;

    //Pagintation management
    const LIMIT = pageLimit || 10;
    const pageCount = page || null;
    let paginationFilter = [];

    if(pageCount){
      const skipCount = (pageCount - 1) * LIMIT
      paginationFilter = [
        {
          $skip : skipCount
        },
        {
          $limit : LIMIT
        }
      ]
    }
    
    //Search filtering
    let searchQuery = [];
    if (search !== "") {
      searchQuery = [{
        $match: {
          $or: [
            { firstName: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
            { lastName: { $regex: new RegExp(search, 'i') } },
            // add more fields as needed
          ]
        }
      }];
    }

    const sortArray = Object.entries(sortFilters || {});
    let sortQuery = []

    if(sortArray?.length !== 0){
      sortArray.map(([key,value]) => {
        if(value === 'asc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.hourlyRate" : 1 , _id : 1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.currentCTC" : 1 , _id : 1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.expectedCTC" : 1 , _id : 1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.experience" : 1 , _id : 1}
                }
              ]
            }
          }else if(value === 'desc'){
            if(key === 'hourlyRate'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.hourlyRate" : -1 , _id : 1}
                }
              ]
            }else if(key === 'currentCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.currentCTC" : -1 , _id : 1}
                }
              ]
            }else if(key === 'expectedCTC'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.expectedCTC" : -1 , _id : 1}
                }
              ]
            }else if(key === 'experience'){
              sortQuery = [
                {
                  $sort : {"jobApplications.professionalInfo.experience" : -1 , _id : 1}
                }
              ]
            }
          }
      })
    }


    //Data filtering
    const filterArray = Object.entries(filter || {})
    let statusFilter = []
    let stageFilter = []
    let assessmentFilter = []
    let ratingFilter = []
    let jobTypeFilter = []

    if(filterArray?.length !== 0){
      filterArray.map(([key,value]) => {
        if(key === 'status'){
          if(Array.isArray(value)){
            statusFilter = [
              {
                $match: {
                  $expr: {
                    $in: [
                      {
                        $getField: {
                          field: "status",
                          input: {
                            $getField: {
                              field: "$jobApplications.currentStage",
                              input: "$jobApplications.stageStatuses"
                            }
                          }
                        }
                      },
                      value  // <-- list all allowed statuses here
                    ]
                  }
                }
              }
            ]
          }
        }
        if(key === 'stage'){
          if(Array.isArray(value)){
            stageFilter = [
               {
                  $match: {
                    "jobApplications.currentStage": {
                      $in: value
                    }
                  }
                },
            ]
          }
        }
        if(key === 'assessment'){
          let isCompleted = false;
          let isNotCompleted = false;
          value.map(state => {
            state === "Completed" && (isCompleted = true)
            state === "Not Completed" && (isNotCompleted = true)
          })
          if (isCompleted && !isNotCompleted) {
            assessmentFilter = [
              {
                $match: {
                  "jobApplications.assessmentResponse": { $type: "object" }
                }
              },
            ]
          } else if (!isCompleted && isNotCompleted) {
            assessmentFilter = [
              {
                $match: {
                  "jobApplications.assessmentResponse": { $exists: false }
                }
              },
            ]
          }
        }
        if(key === 'rating'){
          if(Array.isArray(value)){
            ratingFilter = [
              {
                $match : {
                  "jobApplications.rating" : { $in : value}
                }
              }
            ]
          }
        }
        if(key === 'showContractors' && value){
          jobTypeFilter = [
            {
              $match : {
                "jobApplications.jobType" : { $in : ["Part Time" , "Contract"] }
              }
            }
          ]
        }else if(key === 'job Type'){
          if(Array.isArray(value)){
            jobTypeFilter = [
              {
                $match : {
                  "jobApplications.jobType" : { $in : value }
                }
              }
            ]
          }
        }
      })

    }

    let geoFilter = null;
    if (locationId && sessionId) {
      const result = await getPlaceDetails(locationId, sessionId);
      if (result.latlng?.longitude && result.latlng?.latitude) {
        geoFilter = {
          coordinates: [
            parseFloat(result.latlng.longitude),
            parseFloat(result.latlng.latitude)
          ]
        };
      }
    }

    // Build location filters
    const locationConditions = [];
    if (location) {
      locationConditions.push({ location: { $regex: location, $options: 'i' } });
    }
    if (geoFilter?.coordinates) {
      locationConditions.push({
        geoLocation: {
          $geoWithin: {
            $centerSphere: [
              [geoFilter.coordinates[0], geoFilter.coordinates[1]],
              100000 / 6371000 // ~100km radius in radians
            ]
          }
        }
      });
    }
    
    const pipeline = [
      // Optional: Location filter
      ...searchQuery,
      ...(locationConditions.length > 0 ? [{ $match: { $or: locationConditions } }] : []),
      // Unwind jobApplications to filter individual ones
      { $unwind: "$jobApplications" },

      // Filter for shortlisted jobApplications for this company
      {
        $match: {
          "jobApplications.shortlisted": true,
          "jobApplications.companyDetails._id": new mongoose.Types.ObjectId(company_id)
        }
      },

      ...stageFilter,
      ...statusFilter,
      ...assessmentFilter,
      ...jobTypeFilter,
      ...ratingFilter,

      // Group back by candidate _id, collecting only shortlisted jobApplications
      {
        $group: {
          _id: "$_id",
          jobApplications: { $push: "$jobApplications" },
          candidate: { $first: "$$ROOT" }  // preserve other candidate fields
        }
      },

      // Rebuild candidate document with filtered jobApplications
      {
        $addFields: {
          "candidate.jobApplications": "$jobApplications"
        }
      },

      {
        $replaceRoot: {
          newRoot: "$candidate"
        }
      },

      {
        $sort : { "jobApplications.applicationDate" : -1}
      },
      ...sortQuery,

        // 👇 Facet to get both paginated results & total count
      {
        $facet: {
          candidates: [...paginationFilter], // your pagination (e.g., $skip, $limit)
          totalCount: [{ $count: "count" }]
        }
      },
      // 👇 Optional: format output as a single object
      {
        $addFields: {
          totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] }
        }
      }
    ];

    const shortlistedCandidates = await candidates.aggregate(pipeline);


    // Format response to include only relevant information
    const formattedCandidates = shortlistedCandidates[0]?.candidates.map((candidate) => {
      // Filter only shortlisted job applications
      const shortlistedApplications = candidate.jobApplications.filter(
        (app) => app.shortlisted
      );
      
      return {
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        profilePictureUrl: candidate.profilePictureUrl,
        location: candidate.location || "",
        portfolio: candidate.portfolio,
        website: candidate.website,
        resumeUrl: candidate.resumeUrl || "", // Ensure resumeUrl is not undefined
        experience: candidate.experience,
        applications: shortlistedApplications.map((app) => {
          // Convert Map to regular object for stageStatuses
          const stageStatusesObj = {};
          if (app.stageStatuses && app.stageStatuses instanceof Map) {
            for (const [key, value] of app.stageStatuses.entries()) {
              stageStatusesObj[key] = value;
            }
          }
          
          // Get the current stage status
          const currentStageStatus = app.stageStatuses && app.stageStatuses[app.currentStage];
          
          return {
            jobId: app.jobId,
            jobApplied: app.jobApplied || app.jobProfile || "", // Fallback to jobProfile if jobApplied is empty
            applicationDate: app.applicationDate,
            currentStage: app.currentStage,
            status: currentStageStatus?.status || "Under Review", // Get the status of the current stage
            rating: app.rating,
            currentCTC: app.professionalInfo?.currentCTC || 0,
            expectedCTC: app.professionalInfo?.expectedCTC || 0,
            hourlyRate: app.professionalInfo?.hourlyRate || 0,
            stageStatuses: stageStatusesObj, // Add the converted stageStatuses
            // Include other fields from the schema if needed
            jobProfile: app.jobProfile || "" // Include jobProfile as a fallback
          };
        }),
      };
    });
    
    return res.status(200).json({ candidates: formattedCandidates , totalCount : shortlistedCandidates[0]?.totalCount || 0});
  } catch (error) {
    captureError(error, { controller: "candidate.controller.js", action: "shortlistCandidate", role: "admin" });

    console.error("Error fetching shortlisted candidates:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


