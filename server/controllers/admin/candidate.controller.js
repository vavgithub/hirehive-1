import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { Question, seedQuestions } from "../../models/admin/questions.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { uploadToCloudinary } from '../../utils/cloudinary.js';
import { promises as fs } from 'fs';
import path from 'path';
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";


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
    }).sort({"jobApplications.applicationDate" : -1});

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
        hourlyRate: candidate.hourlyRate,
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
        profilePictureUrl : candidate.profilePictureUrl,
        hasGivenAssessment:candidate.hasGivenAssessment,
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
      };
    });

    // console.log("this is backend", formattedCandidates);

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

export const updateCandidateProfessionalDetails = async (req, res) => {
  try {
    const { id, jobId } = req.params;
    const { experience, noticePeriod, hourlyRate, currentCTC, expectedCTC } = req.body;

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
    if (job?.employmentType === "Contract" || job?.employmentType === "Part Time") {
      if (!hourlyRate || hourlyRate.toString().trim() === "") {
        return res.status(400).json({ message: "Hourly Rate is Required for Part Time / Contract Jobs" });
      }
    }
    if (!(job?.employmentType === "Contract" || job?.employmentType === "Part Time")) {
      if (!currentCTC || currentCTC.toString().trim() === "") {
        return res.status(400).json({ message: "Current CTC is Required for Full Time Jobs" });
      }
      if (!expectedCTC || expectedCTC.toString().trim() === "") {
        return res.status(400).json({ message: "Expected CTC is Required for Full Time Jobs" });
      }
    }

    const professionalInfo = {
      ...candidate.jobApplications?.find(app => app.jobId?.toString() === jobId)?.professionalInfo.toObject(),
      expectedCTC,
      currentCTC,
      hourlyRate,
      experience,
      noticePeriod
    }

    const updateCandidate = await candidates.findOneAndUpdate({
      _id : id,
      'jobApplications.jobId' : jobId
    },{
      $set : {
        'jobApplications.$.professionalInfo' : professionalInfo
      }
    })

    res.status(200).json({ message: "Candidate details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating candidate", error: error.message });
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

// controllers/candidate.controller.js

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
      enrichedQuestionResponses = jobApplication.questionResponses.map(response => ({
        questionId: response.questionId,
        answer: response.answer,
        question: {
          text: questionsMap[response.questionId.toString()]?.text || "Original question no longer available",
          type: questionsMap[response.questionId.toString()]?.type || "text",
          options: questionsMap[response.questionId.toString()]?.options || [],
          required: questionsMap[response.questionId.toString()]?.required || false,
          answerType: questionsMap[response.questionId.toString()]?.answerType || "text"
        }
      }));
    } else {
      // If job is deleted, still show the answers but with placeholder question info
      enrichedQuestionResponses = jobApplication.questionResponses.map(response => ({
        questionId: response.questionId,
        answer: response.answer,
        question: {
          text: "Original question no longer available",
          type: "text",
          options: [],
          required: false,
          answerType: "text"
        }
      }));
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
      profilePictureUrl : candidate.profilePictureUrl,
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
        jobStatus : job ? job.status : "deleted",
        notes: jobApplication.notes,
        jobType : job ? job.employmentType : 'NA',
        applicationDate: jobApplication.applicationDate,
        rating: jobApplication.rating,
        currentStage: jobApplication.currentStage,
        stageStatuses: jobApplication.stageStatuses,
        questionResponses: enrichedQuestionResponses,
        professionalInfo: jobApplication.professionalInfo
      },

      //Entire job applications
      applications : candidate?.jobApplications
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

export const addNotes = async (req,res) => {
  try {
    const { candidateId ,jobId } = req.params;
    const { notes } = req.body;

    const sanitizedNotes = sanitizeLexicalHtml(notes);

    if(!sanitizedNotes){
      return res.status(404).send({ message: "Invalid notes data" });
    }

    // Find the candidate and job
    const candidate = await candidates.findById(candidateId);
    const hasJob = candidate.jobApplications.find(app => app.jobId.toString() === jobId)

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    if (!hasJob) {
      return res.status(404).send({ message: "Job not found" });
    }

    candidate.jobApplications.forEach(app=>{
      if(app.jobId.toString() === jobId){
        app.notes = {
          content : sanitizedNotes,
          addedDate : new Date()
        }
      }
      return app
    })

    await candidate.save();

    res.status(200).json({message : "Notes added successfully"});
  } catch (error) {
    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getCandidateJobs = async (req,res) => {
  try {
    const { candidateId } = req.params;

    // Find the candidate
    const candidate = await candidates.findById(candidateId).select("-password");

    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }

    res.status(200).json({jobs : candidate?.jobApplications.length > 0 ? candidate.jobApplications : []});
  } catch (error) {
    console.error("Error in getCandidateJobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

  export const getAllCandidatesWithStats = async (req, res) => {
    try {
      const allCandidates = await candidates.aggregate([
        {
          $match: { isVerified: true } // Filter only verified candidates
        },
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
          $addFields: {
            jobDetail: { $arrayElemAt: ['$jobDetails', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            profilePictureUrl : 1,
            hasGivenAssessment:1,
            experience: {
              $ifNull: ['$jobApplications.professionalInfo.experience', '$experience']
            },
            expectedCTC: {
              $ifNull: ['$jobApplications.professionalInfo.expectedCTC', '$expectedCTC']
            },
            currentCTC: {
              $ifNull: ['$jobApplications.professionalInfo.currentCTC', '$currentCTC']
            },
            hourlyRate:{
              $ifNull: ['$jobApplications.professionalInfo.hourlyRate', '$hourlyRate']
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
            currentStage: '$jobApplications.currentStage',
            stageStatuses: '$jobApplications.stageStatuses',
            jobTitle: {
              $ifNull: ['$jobDetail.jobTitle', '$jobApplications.jobApplied']
            },
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
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            profilePictureUrl : 1,
            hasGivenAssessment:1,
            experience: 1,
            expectedCTC: 1,
            currentCTC: 1,
            hourlyRate:1,
            website: 1,
            portfolio: 1,
            noticePeriod: 1,
            skills: 1,
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
          $sort: { applicationDate: -1 }
        }
      ]);
  
      const stats = {
        Total: allCandidates.length,
        Portfolio: 0,
        Screening: 0,
        'Design Task': 0,
        'Round 1': 0,
        'Round 2': 0,
        'Offer Sent': 0,
        'Hired': 0
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
        console.log('No questions found in database. Seeding questions...');
        await seedQuestions(); // Make sure this is imported
      }
  
      const questions = await Question.aggregate([
        { $sample: { size: 10 } },
        {
          $project: {
            id: '$_id',
            questionType: 1,
            text: 1,
            imageUrl: 1,
            options: {
              $map: {
                input: '$options',
                as: 'option',
                in: {
                  text: '$$option.text',
                  imageUrl: '$$option.imageUrl'
                }
              }
            }
          }
        }
      ]);
  
      console.log(`Found ${questions.length} questions`);
  
      if (!questions.length) {
        return res.status(404).json({ 
          success: false,
          message: 'No questions available' 
        });
      }
  
      res.status(200).json({ 
        success: true,
        questions 
      });
    } catch (error) {
      console.error('Error in getRandomQuestions:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching questions',
        error: error.message 
      });
    }
  };

  export const submitQuestionnaireAttempt = async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { answers, totalTimeInSeconds, recordingUrl } = req.body;
      
      // Get questions to check correct answers
      const questionIds = Object.keys(answers);
      const questions = await Question.find({ _id: { $in: questionIds } });
      
      let responses = [];
      let score = 0;
      let correctAnswers = 0;
      if(questionIds.length > 0){

      // Process answers and calculate score
       responses = questions.map(question => {
        const selectedAnswer = answers[question._id];
        const correctOption = question.options.find(opt => opt.isCorrect);
        const isCorrect = selectedAnswer === correctOption.text;
        
        return {
          questionId: question._id,
          selectedAnswer,
          isCorrect
        };
      });
  
      correctAnswers = responses.filter(r => r.isCorrect).length;
      score = correctAnswers * 10;
  
      }

      // Create attempt data
      const attemptData = {
        totalTimeInSeconds,
        score,
        responses,
        recordingUrl // Add this field
      };
  
      // Update candidate
      const updatedCandidate = await candidates.findByIdAndUpdate(
        candidateId,
        {
          questionnaireAttempts: [attemptData] ,
          hasGivenAssessment: true
        },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: 'Assessment completed successfully',
        data: {
          score,
          totalTimeInSeconds,
          correctAnswers,
          totalQuestions: questions.length
        }
      });
  
    } catch (error) {
      console.error('Error in submitQuestionnaireAttempt:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving assessment',
        error: error.message
      });
    }
  };

  export const getQuestionnaireDetails = async (req, res) => {
    try {
      const { candidateId } = req.params;
  
      const candidate = await candidates.findById(candidateId)
        .select('questionnaireAttempts firstName lastName phone email profilePictureUrl')
        .lean();
  
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: "Candidate not found"
        });
      }
  
      // Get the latest attempt
      const latestAttempt = candidate.questionnaireAttempts[candidate.questionnaireAttempts.length - 1];
  
      if (!latestAttempt) {
        return res.status(404).json({
          success: false,
          message: "No questionnaire attempts found for this candidate"
        });
      }
  
      // Get all question details in one query
      const questionIds = latestAttempt.responses.map(response => response.questionId);
      const questions = await Question.find({ _id: { $in: questionIds } }).lean();
  
      // Create a map for quick question lookup
      const questionMap = questions.reduce((acc, question) => {
        acc[question._id.toString()] = question;
        return acc;
      }, {});
  
      // Calculate statistics
      const totalQuestions = latestAttempt.responses.length;
      const correctAnswers = latestAttempt.responses.filter(response => response.isCorrect).length;
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
            profilePictureUrl : candidate?.profilePictureUrl,
            recordingUrl: latestAttempt.recordingUrl,
            totalTimeSpent: formattedTime,
            attemptDate: latestAttempt.attemptDate,
          },
          assessmentStats: {
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            scoreOutOf100: latestAttempt.score
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
                options: question.options.map(opt => ({
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  isCorrect: opt.isCorrect
                }))
              },
              selectedAnswer: response.selectedAnswer,
              isCorrect: response.isCorrect
            };
          })
        }
      };
  
      return res.status(200).json(response);
  
    } catch (error) {
      console.error("Error in getQuestionnaireDetails:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };

  export const uploadAssessmentRecording = async (req, res) => {
    try {
      console.log('Upload request received:', {
        file: req.file,
        body: req.body
      });
  
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No video file uploaded'
        });
      }
  
      // Pass the full file path directly
      const videoUrl = await uploadToCloudinary(req.file.path, 'assessment-recordings');
  
      return res.status(200).json({
        success: true,
        videoUrl
      });
  
    } catch (error) {
      console.error('Error in uploadAssessmentRecording:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to process video upload'
      });
    }
  };