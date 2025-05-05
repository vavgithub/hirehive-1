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

    // Fetch candidates who have applied for this job
    const candidatesData = await candidates
      .find({
        "jobApplications.jobId": jobId,
        isVerified: true,
      })
      .sort({ "jobApplications.applicationDate": -1 });

    // Process and format the candidate data
    const formattedCandidates = candidatesData.map((candidate) => {
      const jobApplication = candidate.jobApplications.find(
        (app) => app.jobId.toString() === jobId
      );

      // Initialize stage statuses
      const stageStatuses = {};
      stages.forEach((stage) => {
        const stageStatus = jobApplication.stageStatuses.get(stage.name) || {
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
      stages: stages.map((stage) => stage.name),
    });
  } catch (error) {
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
    const candidate = await candidates.findById(id);
    if (!candidate) {
      return res.status(400).json({ message: "Invalid Candidate Data" });
    }

    // Fetch job
    const job = await jobs.findById(jobId);
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
          noticePeriod
      }, {
      new: true,
    });

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(updatedCandidate);
  } catch (error) {
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
    res
      .status(400)
      .json({ message: "Error updating candidate", error: error.message });
  }
};

// controllers/candidate.controller.js

export const getCandidateById = async (req, res) => {
  try {
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
        jobProfile: jobApplication?.jobProfile || "UI UX",
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
    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCandidateJobs = async (req, res) => {
  try {
    const { candidateId } = req.params;

    // Find the candidate
    const candidate = await candidates
      .findById(candidateId)
      .select("-password");

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    res.status(200).json({
      jobs:
        candidate?.jobApplications.length > 0 ? candidate.jobApplications : [],
    });
  } catch (error) {
    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
      {
        $sort: { applicationDate: -1 }
      }
    ]);

    //MONTHLY
    const { firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth } = getPreviousMonthRange();
    const { firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek } = getPreviousWeekRange();
    const { startOfYesterday, endOfYesterday, startOfToday } = getYesterdayTodayRange();

    // Query to count jobs created in the current month
    const currentMonthJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,
      createdAt: { $gte: firstDayCurrentMonth }
    });

    // Query to count candidates created in the previous month
    const previousMonthJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,  
      createdAt: { $gte: firstDayPreviousMonth, $lte: lastDayPreviousMonth }
    });

    // Calculate the percentage change
    let monthlyPercentageChange = 0;
    // Monthly Percentage Change
    if (previousMonthJobs === 0) {
      monthlyPercentageChange = currentMonthJobs * 100;
    } else {
      monthlyPercentageChange = ((currentMonthJobs - previousMonthJobs) / previousMonthJobs) * 100;
    }

    //WEEKLY
    // Query to count candidates created in the current week
    const currentWeekJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,  
      createdAt: { $gte: firstDayCurrentWeek }
    });

    // Query to count candidates created in the previous week
    const previousWeekJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,  
      createdAt: { $gte: firstDayPreviousWeek, $lte: lastDayPreviousWeek }
    });

    // Calculate the percentage change
    let weeklyPercentageChange = 0;
    // Weekly Percentage Change
    if (previousWeekJobs === 0) {
      weeklyPercentageChange = currentWeekJobs * 100;
    } else {
      weeklyPercentageChange = ((currentWeekJobs - previousWeekJobs) / previousWeekJobs) * 100;
    }

    //YESTERDAYS
    // Query to count candidates created today
    const todayJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,  
      createdAt: { $gte: startOfToday }
    });

    // Query to count candidates created yesterday
    const yesterdayJobs = await candidates.countDocuments({
      isVerified: true,
      'jobApplications.companyDetails._id' : req.user.company_id ,  
      createdAt: { $gte: startOfYesterday, $lte: endOfYesterday }
    });

    // Calculate the percentage change
    let dailyPercentageChange = 0;
    // Daily Percentage Change
    if (yesterdayJobs === 0) {
      dailyPercentageChange = todayJobs * 100; // Treat as a full increase
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
    console.log(result)
    res.status(200).json({
      success: true,
      questions : result[0]?.questions,
    });
  } catch (error) {
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
    console.error("Error in getQuestionnaireDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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

    // Pass the full file path directly
    const videoUrl = await uploadToCloudinary(
      req.file.path,
      "assessment-recordings"
    );

    return res.status(200).json({
      success: true,
      videoUrl,
    });
  } catch (error) {
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
    // Find all candidates with at least one shortlisted job application
    const shortlistedCandidates = await candidates.find({
      "jobApplications.shortlisted": true,
    });

    // Format response to include only relevant information
    const formattedCandidates = shortlistedCandidates.map((candidate) => {
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
          const currentStageStatus = app.stageStatuses && app.stageStatuses.get(app.currentStage);
          
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
    
    return res.status(200).json({ candidates: formattedCandidates });
  } catch (error) {
    console.error("Error fetching shortlisted candidates:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
