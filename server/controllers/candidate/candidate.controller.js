import mongoose from "mongoose";
import { candidates } from "../../models/candidate/candidate.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/admin/user.model.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { archiveJob } from "../admin/jobs.controller.js";

const stats =  asyncHandler(async (req, res, next) => {
  try {
      // Perform the aggregation to get total count and stage counts in one go
      const [totalCount, stageStats] = await Promise.all([
          candidates.countDocuments(), // Get the total count of candidates
          candidates.aggregate([
              {
                  $group: {
                      _id: "$stage",           // Group by the "stage" field
                      count: { $sum: 1 }       // Count the number of documents in each group
                  }
              },
              {
                  $sort: { _id: 1 }          // Sort the results by stage (optional)
              }
          ])
      ]);

       // Format the stageStats to make it more readable (optional)
       const formattedStats = stageStats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    // Construct the final response object
    const stats = {
        totalCount,
        stageStats: formattedStats
    };

      res.status(200).json(new ApiResponse(200, stats, "Stats fetched successfully"));
  } catch (error) {
      next(new ApiError(500, "Failed to fetch stats", [error.message]));
  }
});

const jobSpecificStats = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId) {
      return next(new ApiError(400, "Job ID is required"));
  }

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return next(new ApiError(400, "Invalid Job ID format"));
  }

  try {
      // Perform the aggregation to get total count and stage counts for the specific job
      const [totalCount, stageStats] = await Promise.all([
          candidates.countDocuments({ jobId: new mongoose.Types.ObjectId(jobId) }),
          candidates.aggregate([
              {
                  $match: { jobId: new mongoose.Types.ObjectId(jobId) }
              },
              {
                  $group: {
                      _id: "$stage",
                      count: { $sum: 1 }
                  }
              },
              {
                  $sort: { _id: 1 }
              }
          ])
      ]);

      // Format the stageStats to make it more readable
      const formattedStats = stageStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
      }, {});

      // Ensure all stages are represented in the stats, even if they have zero candidates
      const allStages = ["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"];
      allStages.forEach(stage => {
          if (!(stage in formattedStats)) {
              formattedStats[stage] = 0;
          }
      });

      // Construct the final response object
      const stats = {
          totalCount,
          stageStats: formattedStats
      };

      res.status(200).json(new ApiResponse(200, stats, "Job-specific stats fetched successfully"));
  } catch (error) {
      console.error("Error in jobSpecificStats:", error);
      next(new ApiError(500, "Failed to fetch job-specific stats", [error.message]));
  }
});


const fetchActiveJobs = async (req, res) => {
  try {
    // Find jobs where status is "open" and sort by creation date in descending order
    const activeJobs = await jobs
      .find({ status: "open" })
      .sort({ createdAt: -1 });

    if (activeJobs.length === 0) {
      return res.status(404).json({ message: "No active jobs found" });
    }

    res.status(200).json(activeJobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open jobs", error: error.message });
  }
};

const allCandidate = asyncHandler(async (req, res, next) => {
  try {
    const candidateData = await candidates.find();

    if (!candidateData || candidateData.length === 0) {
      throw new ApiError(404, "No Candidates Found");
    }

    // If successful, send an ApiResponse
    res
      .status(200)
      .json(
        new ApiResponse(200, candidateData, "Candidates fetched successfully")
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Failed to fetch candidates");
  }
});

// const getCandidate = async (req, res) => {
//   try {
//     const jobId = req.params.jobId;
//     const jobCandidates = await candidates.find({ jobId });
//     res.send(jobCandidates);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const getCandidate = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find all candidates who have applied to the specific job
    const jobCandidates = await candidates.find(
      { 'jobApplications.jobId': jobId },
      {
        // Optionally, include only the matching job application in the result
        jobApplications: { $elemMatch: { jobId } },
        // Include other candidate fields as needed
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        // Include other fields you need
      }
    );

    res.status(200).json(jobCandidates);
  } catch (error) {
    console.error('Error fetching candidates for job:', error);
    res.status(500).send(error);
  }
};

const createCandidate = async (req, res) => {
  try {
    const candidate = new candidates(req.body);
    await candidate.save();
    res.status(201).send(candidate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await candidates.findById(req.params.id);
    res.send(candidate);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStatusAndStage = async (req, res) => {
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

const updateAssignee = async (req, res) => {
  try {
    const { candidatesData } = req.body;

    if (
      !candidatesData ||
      !Array.isArray(candidatesData) ||
      candidatesData.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input. Expected an array of candidates." });
    }

    const updateOperations = candidatesData.map((candidate) => ({
      updateOne: {
        filter: { _id: candidate.id },
        update: {
          $set: {
            assignee: candidate.assignee,
            status: candidate.status, // Add this line to update the status
          },
        },
      },
    }));

    const result = await candidates.bulkWrite(updateOperations);

    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: "Assignees and statuses updated successfully",
        modifiedCount: result.modifiedCount,
      });
    } else {
      res.status(404).json({ message: "No candidates were updated" });
    }
  } catch (error) {
    console.error("Error updating assignees and statuses:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const candidate = await candidates.findByIdAndUpdate(
      id,
      { rating },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error updating candidate rating:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCandidateStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignee } = req.body;

    // Validate input
    if (!id || !assignee) {
      return res
        .status(400)
        .json({ message: "Candidate ID and assignee are required" });
    }

    // Find the candidate and update the assignee
    const updatedCandidate = await candidates.findByIdAndUpdate(
      id,
      { assignee: assignee },
      { new: true, runValidators: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Assignee updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating assignee:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// const assignCandidate = async (req, res) => {
//   try {
//     const { candidateId, assigneeId } = req.body;

//     // Validate input
//     if (!candidateId || !assigneeId) {
//       return res.status(400).json({ success: false, message: 'Candidate ID and Assignee ID are required' });
//     }

//     // Find the candidate
//     const candidate = await candidates.findById(candidateId);
//     if (!candidate) {
//       return res.status(404).json({ success: false, message: 'Candidate not found' });
//     }

//     // Find the assignee (hiring manager or design reviewer)
//     const assignee = await User.findById(assigneeId);
//     if (!assignee) {
//       return res.status(404).json({ success: false, message: 'Assignee not found' });
//     }

//     // Check if the assignee is a hiring manager or design reviewer
//     if (assignee.role !== 'Hiring Manager' && assignee.role !== 'Design Reviewer') {
//       return res.status(400).json({ success: false, message: 'Invalid assignee role' });
//     }

//     // Update the candidate
//     candidate.assignedTo = assigneeId;
//     await candidate.save();

//     // Update the assignee's assigned candidates list
//     if (!assignee.assignedCandidates.includes(candidateId)) {
//       assignee.assignedCandidates.push(candidateId);
//       await assignee.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Candidate assigned successfully',
//       data: { candidate, assignee: { id: assignee._id, name: assignee.name, role: assignee.role } }
//     });

//   } catch (error) {
//     console.error('Error in assignCandidate:', error);
//     res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//   }
// };

// const assignCandidate = async (req, res) => {
//   try {
//     const { candidateId, assigneeId, stage } = req.body;

//     const candidate = await candidates.findById(candidateId);
//     if (!candidate) {
//       return res.status(404).json({ success: false, message: 'Candidate not found' });
//     }

//     candidate.stageStatus[stage].assignedTo = assigneeId;
//     candidate.stageStatus[stage].status = 'Under Review';
//     await candidate.save();

//     res.status(200).json({
//       success: true,
//       message: 'Candidate assigned successfully',
//       data: candidate
//     });

//   } catch (error) {
//     console.error('Error in assignCandidate:', error);
//     res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//   }
// };

const fetchAssignedCandidate = async (req, res) => {
  try {
    const { reviewerId } = req.params;

    // Validate reviewerId
    if (!reviewerId) {
      return res.status(400).json({ success: false, message: 'Reviewer ID is required' });
    }

    // Check if the reviewer exists and is a Design Reviewer
    const reviewer = await User.findOne({ _id: reviewerId, role: 'Design Reviewer' });
    if (!reviewer) {
      return res.status(404).json({ success: false, message: 'Design Reviewer not found' });
    }

    // Fetch assigned candidates
    const assignedCandidates = await candidates.find({ 'stageStatus.Portfolio.assignedTo': reviewerId })
      .select('firstName lastName email stage stageStatus.Portfolio.status portfolio')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: assignedCandidates,
      message: 'Assigned candidates fetched successfully'
    });

  } catch (error) {
    console.error('Error in fetchAssignedCandidates:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};



const searchJobs = async (req, res) => {
  const searchTerm = req.query.jobTitle;
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term (title) is required" });
  }
  try {
    // Fetch all jobs from the database
    const jobArray = await jobs.find({
      jobTitle: { $regex: searchTerm, $options: "i" },
    });
    // Respond with the list of jobs
    res.status(200).json(jobArray);
  } catch (error) {
    // Handle error if fetching jobs fails
    res.status(500).json({ message: error.message });
  }
};

const filterJobs = asyncHandler(async (req, res) => {
  const { employmentType, jobProfile, experience } = req.body.filters;
  const query = { status: 'open' }; // Add the status filter here

  if (employmentType && employmentType.length > 0) {
    query.employmentType = { $in: employmentType };
  }
  if (jobProfile && jobProfile.length > 0) {
    query.jobProfile = { $in: jobProfile };
  }
  if (experience && (experience.min !== '' || experience.max !== '')) {
    query.fromExperience = {};
    if (experience.min !== '') {
      query.fromExperience.$gte = Number(experience.min);
    }
    if (experience.max !== '') {
      query.toExperience = { $lte: Number(experience.max) };
    }
  }

  const filteredJobs = await jobs.find(query); // Fetch jobs with the new query including status: 'open'
  res.status(200).json(filteredJobs);
});


const submitApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      portfolio,
      website,
      experience,
      noticePeriod,
      currentCTC,
      expectedCTC,
      skills,
      answers // New field for question responses
    } = req.body;

    // Validate required fields (including jobId from params)
    if (!jobId || !firstName || !lastName || !email || !phone || !portfolio || !website || !experience) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate email and phone
    // if (!validateEmail(email)) {
    //   return res.status(400).json({ message: 'Invalid email format' });
    // }

    // if (!validatePhone(phone)) {
    //   return res.status(400).json({ message: 'Invalid phone number format' });
    // }

    // Check if the job exists and get its questions
    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Validate answers against job questions
    const questionResponses = job.questions.map(question => {
      const answer = answers[question._id];
      if (question.required && !answer) {
        throw new Error(`Answer for question "${question.text}" is required`);
      }
      return {
        questionId: question._id,
        answer: answer || null
      };
    });

    // Create new candidate
    const newCandidate = new candidates({
      jobId,
      jobApplied: job.title,
      firstName,
      lastName,
      email,
      phone,
      website,
      portfolio,
      noticePeriod: parseInt(noticePeriod) || 0,
      currentCTC: parseFloat(currentCTC) || 0,
      expectedCTC: parseFloat(expectedCTC) || 0,
      experience: parseInt(experience),
      skills: skills || [],
      age: 0, // You might want to add this to the form or remove it from the model
      location: '', // You might want to add this to the form or remove it from the model
      budget: 0, // You might want to add this to the form or remove it from the model
      stage: 'Portfolio',
      status: 'N/A',
      stageStatus: {
        Portfolio: {
          status: 'Not Assigned'
        }
      },
      questionResponses // Add the question responses
    });

    await newCandidate.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      candidateId: newCandidate._id
    });
  } catch (error) {
    console.error('Error in submitApplication:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
export {
  fetchActiveJobs,
  submitApplication,
  updateCandidateStatusById,
  getCandidate,
  createCandidate,
  getCandidateById,
  updateStatusAndStage,
  updateAssignee,
  updateRating,
  allCandidate,
  stats,
  fetchAssignedCandidate,
  jobSpecificStats,
  filterJobs,
  searchJobs,
};
