// import Job from ''; // Import your Mongoose model
import { MongooseError } from "mongoose";
import { jobs } from "../../models/admin/jobs.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import mongoose from "mongoose";
import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";
import { User } from "../../models/admin/user.model.js";
// Controller function to create a new job

export const StatisticsController = {
  /**
   * Get overall statistics including total jobs, total applications, and hired candidates
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getOverallStats(req, res) {
    try {
      // Extract the admin's _id from the authenticated user
      const adminId = req.user._id;
      const company_id = req.user.company_id;
      
      // Find all users in the same company
      const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
      // Extract user _id values into an array
      const userIds = usersInCompany.map(user => user._id);
      // ------------------------
      // JOB STATISTICS (Filter by jobs created by this admin)
      // ------------------------
      const totalJobs = await jobs.countDocuments({ createdBy: { $in: userIds }  });
      
      const totalOpenJobs = await jobs.countDocuments({ 
        createdBy: { $in: userIds } ,
        status: { $in: ["", "open"] }
      });
      
      const totalClosedJobs = await jobs.countDocuments({ 
        createdBy: { $in: userIds } ,
        status: "closed" 
      });
      
      const totalDraftedJobs = await jobs.countDocuments({ 
        createdBy: { $in: userIds } ,
        status: "draft" 
      });
      
      // ------------------------
      // CANDIDATE STATISTICS (Filter applications for jobs created by this admin)
      // ------------------------
      // Count total applications for jobs created by the admin
      const totalApplicationsResult = await candidates.aggregate([
        // Unwind the jobApplications array to get a document per application
        { $unwind: "$jobApplications" },
        // Join the jobs collection to fetch details of each job
        {
          $lookup: {
            from: "jobs",
            localField: "jobApplications.jobId",
            foreignField: "_id",
            as: "jobDetails"
          }
        },
        // Unwind the jobDetails array
        { $unwind: "$jobDetails" },
        // Match only those applications where the job was created by the admin
        {
          $match: {
            "jobDetails.createdBy": { $in: userIds } 
          }
        },
        // Count the total number of matching applications
        { $count: "totalApplications" }
      ]);
      const totalApplications = totalApplicationsResult[0]?.totalApplications || 0;
      
      // Count total hired candidates for jobs created by the admin
      const hiredCandidatesCount = await candidates.aggregate([
        { $unwind: "$jobApplications" },
        {
          $lookup: {
            from: "jobs",
            localField: "jobApplications.jobId",
            foreignField: "_id",
            as: "jobDetails"
          }
        },
        { $unwind: "$jobDetails" },
        {
          $match: {
            "jobDetails.createdBy": { $in: userIds } ,
            "jobApplications.currentStage": "Hired",
            "jobApplications.stageStatuses.Hired.status": "Accepted"
          }
        },
        // Group by candidate to avoid counting a candidate more than once if they have multiple hired applications
        { $group: { _id: "$_id" } },
        { $count: "totalHired" }
      ]);
      const totalHired = hiredCandidatesCount[0]?.totalHired || 0;
      
      // Return the filtered statistics
      return res.status(200).json({
        success: true,
        data: {
          totalJobs,
          totalOpenJobs,
          totalClosedJobs,
          totalDraftedJobs,
          totalApplications,
          totalHired
        }
      });
      
    } catch (error) {
      console.error('Error in getOverallStats:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching statistics',
        error: error.message
      });
    }
  }
  ,
  
  
  async getJobStats(req, res) {
    try {
      const { jobId } = req.params;

      // Get all candidates who applied for this job with their stage statuses
      const candidatesStats = await candidates.aggregate([
        // first filter out the only verified candidates
        {
          $match: {
            isVerified: true,
          },
        },
        // Unwind job applications to get individual applications
        { $unwind: "$jobApplications" },
        // Match applications for the specific job
        {
          $match: {
            "jobApplications.jobId": new mongoose.Types.ObjectId(jobId),
          },
        },
        // Group and collect all necessary information
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            stages: {
              $push: "$jobApplications.currentStage",
            },
            // Collect stage statuses for qualification checking
            stageStatuses: {
              $push: "$jobApplications.stageStatuses",
            },
          },
        },
      ]);

      const job = await jobs.findById(jobId);
      const stats = candidatesStats[0] || {
        totalCount: 0,
        stages: [],
        stageStatuses: [],
      };

      // Count candidates in each stage
      const stageStats = stats.stages.reduce((acc, stage) => {
        if (stage) {
          acc[stage] = (acc[stage] || 0) + 1;
        }
        return acc;
      }, {});

      // Calculate qualified applications based on stage status
      const qualifiedApplications = stats.stageStatuses.reduce(
        (count, statusMap) => {
          // Convert Map to Object if necessary
          const statuses =
            statusMap instanceof Map
              ? Object.fromEntries(statusMap)
              : statusMap;

          // Check if candidate is qualified based on their progress
          const isQualified =
            // Portfolio cleared
            statuses?.Portfolio?.status === "Cleared" ||
            // Or Screening cleared
            statuses?.Screening?.status === "Cleared" ||
            // Or Design Task cleared
            statuses?.["Design Task"]?.status === "Cleared" ||
            // Or in final stages (Round 1, Round 2, or Hired with positive status)
            statuses?.["Round 1"]?.status === "Cleared" ||
            statuses?.["Round 2"]?.status === "Cleared" ||
            statuses?.Hired?.status === "Accepted";

          return count + (isQualified ? 1 : 0);
        },
        0
      );

      // Ensure all stages have values
      const allStages = [
        "Portfolio",
        "Screening",
        "Design Task",
        "Round 1",
        "Round 2",
        "Hired",
      ];
      const normalizedStageStats = allStages.reduce((acc, stage) => {
        acc[stage] = stageStats[stage] || 0;
        return acc;
      }, {});

      const response = {
        totalCount: stats.totalCount,
        stageStats: normalizedStageStats,
        jobDetails: {
          views: job?.applyClickCount || 0,
          applicationsReceived: stats.totalCount,
          qualifiedApplications,
          engagementRate: job?.applyClickCount
            ? Math.round((stats.totalCount / job.applyClickCount) * 100)
            : 0,
        },
      };

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error("Error in getJobStats:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching job statistics",
        error: error.message,
      });
    }
  },
};

const getJobs = async (req, res) => {
  try {
    const { page, status } = req.query;
    const pageNumber = page ? parseInt(page) : 1;
    const LIMIT = 3;

    const company_id = req.user.company_id;
    let userIds = [];

    if(company_id){
      // Find all users in the same company
      const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
      // Extract user _id values into an array
       userIds = usersInCompany.map(user => user._id);
    }

    const jobsWithStats = await jobs.aggregate([
      // Match jobs created by the current user
      {
        $match: {
          createdBy: {$in : userIds},
          status: status,
        },
      },
      // Sort by creation date (newest first)
      {
        $sort: {
          createdAt: -1,
        },
      },
      // Lookup application statistics from candidates collection
     {
  $lookup: {
    from: "candidates",
    let: { jobId: "$_id" },
    pipeline: [
      { $unwind: "$jobApplications" },
      {
        $match: {
          isVerified: true, // Added condition to filter only verified candidates
          $expr: {
            $eq: ["$jobApplications.jobId", "$$jobId"],
          },
        },
      },
      {
        $group: {
          _id: "$jobApplications.jobId",
          totalApplications: { $sum: 1 },
          processedApplications: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$jobApplications.stageStatuses.Portfolio.status", "Cleared"] },
                    { $eq: ["$jobApplications.stageStatuses.Screening.status", "Cleared"] },
                    { $eq: ["$jobApplications.stageStatuses.Design Task.status", "Cleared"] },
                    { $eq: ["$jobApplications.stageStatuses.Round 1.status", "Cleared"] },
                    { $eq: ["$jobApplications.stageStatuses.Round 2.status", "Cleared"] },
                    { $eq: ["$jobApplications.stageStatuses.Hired.status", "Accepted"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ],
    as: "applicationStats",
  },
},
      // Add applied and processed fields
      {
        $addFields: {
          applied: {
            $cond: {
              if: { $gt: [{ $size: "$applicationStats" }, 0] },
              then: {
                $arrayElemAt: ["$applicationStats.totalApplications", 0],
              },
              else: 0,
            },
          },
          processed: {
            $cond: {
              if: { $gt: [{ $size: "$applicationStats" }, 0] },
              then: {
                $arrayElemAt: ["$applicationStats.processedApplications", 0],
              },
              else: 0,
            },
          },
        },
      },
      // Remove the applicationStats array from final output
      {
        $project: {
          applicationStats: 0,
        },
      },
      {
        $skip: (pageNumber - 1) * LIMIT,
      },
      {
        $limit: LIMIT,
      },
    ]);

    res.status(200).json(jobsWithStats);
  } catch (error) {
    console.error("Error in getJobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      workplaceType,
      employeeLocation,
      employmentType,
      jobProfile,
      experienceFrom,
      experienceTo,
      budgetFrom,
      budgetTo,
      skills,
      jobDescription,
      status,
      questions,
    } = req.body;

    const sanitizedDescription = sanitizeLexicalHtml(jobDescription);

    const newJob = new jobs({
      jobTitle,
      workplaceType,
      employeeLocation,
      employmentType,
      jobProfile,
      experienceFrom,
      experienceTo,
      budgetFrom,
      budgetTo,
      skills,
      jobDescription: sanitizedDescription,
      status,
      createdBy: req.user._id,
      questions,
    });

    const savedJob = await newJob.save();

    // Respond with the saved job object
    res.status(201).json(savedJob);
  } catch (error) {
    if (error instanceof MongooseError && error.code === 11000) {
      // Handle duplicate key error (E11000)
      res.status(400).json({
        message: `Job with title '${req.body.title}' already exists.`,
      });
    } else {
      // Handle other errors
      res
        .status(500)
        .json({ msg: "this is coming from backned", message: error.message });
    }
  }
};

const getTotalJobCount = async (req, res) => {
  try {
    // Count the total number of jobs in the database
    const totalCount = await jobs.countDocuments({ createdBy: req.user._id });
    // Respond with the total count
    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementApplyClickCount = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Use atomic increment to avoid race conditions
    const updatedJob = await jobs.findByIdAndUpdate(
      jobId,
      { $inc: { applyClickCount: 1 } },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ applyClickCount: updatedJob.applyClickCount });
  } catch (error) {
    console.error("Error incrementing apply click count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchJobs = async (req, res) => {
  const searchTerm = req.query.jobTitle;

  const { page, status } = req.query;
  const pageNumber = page ? parseInt(page) : 1;
  const LIMIT = 3;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term (title) is required" });
  }
  try {
    // Fetch all jobs from the database
    const jobArray = await jobs
      .find({
        jobTitle: { $regex: searchTerm, $options: "i" },
        createdBy: req.user._id,
        status: status,
      })
      .skip((pageNumber - 1) * LIMIT)
      .limit(LIMIT);

    const jobCount = await jobs.countDocuments({
      jobTitle: { $regex: searchTerm, $options: "i" },
      createdBy: req.user._id,
      status: status,
    });
    // Respond with the list of jobs
    res.status(200).json({ jobArray, jobCount });
  } catch (error) {
    // Handle error if fetching jobs fails
    res.status(500).json({ message: error.message });
  }
};

const filterJobs = asyncHandler(async (req, res) => {
  try {
    const { employmentType, jobProfile, experience, budget, closingStatus } =
      req.body.filters;
    const query = { createdBy: req.user._id };
    const { page, status } = req.body;
    const pageNumber = page ? parseInt(page) : 1;
    const LIMIT = 3;

    // Add employment type filter
    if (employmentType && employmentType.length > 0) {
      query.employmentType = { $in: employmentType };
    }

    // Add job profile filter
    if (jobProfile && jobProfile.length > 0) {
      query.jobProfile = { $in: jobProfile };
    }

    // Add experience range filter
    if (experience && (experience.min !== "" || experience.max !== "")) {
      if (experience.min !== "") {
        query.experienceFrom = { $gte: Number(experience.min) };
      }
      if (experience.max !== "") {
        query.experienceTo = { $lte: Number(experience.max) };
      }
    }

    // Add budget range filter
    if (budget && (budget.min !== "" || budget.max !== "")) {
      if (budget.min !== "") {
        query.budgetFrom = { $gte: Number(budget.min) };
      }
      if (budget.max !== "") {
        query.budgetTo = { $lte: Number(budget.max) };
      }
    }

    // Add closing status filter
    if (closingStatus && closingStatus.length > 0) {
      if (closingStatus.includes("Hired")) {
        query.closingReason = "Hired";
      } else if (closingStatus.includes("NotHired")) {
        query.closingReason = { $ne: "Hired" };
      }
    }

    if (status) {
      query.status = status;
    }

    const filteredJobs = await jobs
      .find(query)
      .skip((pageNumber - 1) * LIMIT)
      .limit(LIMIT);
    const filteredCount = await jobs.countDocuments(query);

    res.status(200).json({ filteredJobs, filteredCount });
  } catch (error) {
    console.error("Error in filterJobs:", error);
    res.status(500).json({
      success: false,
      message: "Error filtering jobs",
      error: error.message,
    });
  }
});

const filterSearchJobs = asyncHandler(async (req, res) => {
  try {
    const { employmentType, jobProfile, experience, budget, closingStatus } =
      req.body.filters;

    const company_id = req.user.company_id;
    
    // Find all users in the same company
    const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
    // Extract user _id values into an array
    const userIds = usersInCompany.map(user => user._id);

    const query = { createdBy: { $in: userIds }  };
    const { page, status } = req.body;
    const pageNumber = page ? parseInt(page) : 1;
    const LIMIT = 3;

    const searchTerm = req.body?.query ?? "";
    query.jobTitle = { $regex: searchTerm, $options: "i" };

    // Add employment type filter
    if (employmentType && employmentType.length > 0) {
      query.employmentType = { $in: employmentType };
    }

    // Add job profile filter
    if (jobProfile && jobProfile.length > 0) {
      query.jobProfile = { $in: jobProfile };
    }

    // Add experience range filter
    if (experience && (experience.min !== "" || experience.max !== "")) {
      if (experience.min !== "") {
        query.experienceFrom = { $gte: Number(experience.min) };
      }
      if (experience.max !== "") {
        query.experienceTo = { $lte: Number(experience.max) };
      }
    }

    // Add budget range filter
    if (budget && (budget.min !== "" || budget.max !== "")) {
      if (budget.min !== "") {
        query.budgetFrom = { $gte: Number(budget.min) };
      }
      if (budget.max !== "") {
        query.budgetTo = { $lte: Number(budget.max) };
      }
    }

    // Add closing status filter
    if (closingStatus && closingStatus.length > 0) {
      if (closingStatus.includes("Hired")) {
        query.closingReason = "Hired";
      } else if (closingStatus.includes("NotHired")) {
        query.closingReason = { $ne: "Hired" };
      }
    }

    if (status) {
      query.status = status;
    }

    const filteredSearchJobs = await jobs
      .find(query)
      .skip((pageNumber - 1) * LIMIT)
      .limit(LIMIT);
    const filteredSearchCount = await jobs.countDocuments(query);

    res.status(200).json({ filteredSearchJobs, filteredSearchCount });
  } catch (error) {
    console.error("Error in filterJobs:", error);
    res.status(500).json({
      success: false,
      message: "Error filtering jobs",
      error: error.message,
    });
  }
});

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await jobs.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const jobUpdates = req.body;
  try {
    const updatedJob = await jobs.findByIdAndUpdate(id, jobUpdates, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensures updates meet your schema requirements
    });

    if (!updatedJob) {
      return res.status(404).send({ message: "Job not found" });
    }

    res.send(updatedJob);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating job", error: error.message });
  }
};

const archiveJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await jobs.findById(id);

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    if (job.status === "open") {
      job.status = "closed";
      await job.save();
      res.send({ message: "Job status updated to closed" });
    } else {
      res.status(400).send({ message: "Job is not in an open state" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating job status", error: error.message });
  }
};

const closeJob = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const job = await jobs.findById(id);

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    if (job.status === "open") {
      job.status = "closed";
      job.closingReason = reason;
      await job.save();
      res.send({
        message: "Job closed successfully",
        closingReason: job.closingReason,
      });
    } else {
      res.status(400).send({ message: "Job is not in an open state" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error closing job", error: error.message });
  }
};

const draftJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await jobs.findById(id);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    if (job.status === "open" || "closed") {
      job.status = "draft";
      await job.save();
      res.send({ message: "Job status updated to draft" });
    } else {
      res.status(400).send({ message: "Job is not in an open state" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating job status", error: error.message });
  }
};

//here unarvhicee means for we are acting thi job from archive to open again
const unarchiveJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await jobs.findById(id);

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    if (job.status === "open") {
      job.status = "closed";
      await job.save();
      res.send({ message: "Job status updated to open" });
    } else {
      res.status(400).send({ message: "Job is not in an archieved state" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating job status", error: error.message });
  }
};

const reOpenJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await jobs.findById(id);

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    if (job.status === "closed") {
      job.status = "open";
      await job.save();
      res.send({ message: "Job status updated to open" });
    } else {
      res.status(400).send({ message: "Job is not in an archieved state" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating job status", error: error.message });
  }
};

const editJob = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.jobDescription) {
    const sanitizedDescription = sanitizeLexicalHtml(updates.jobDescription);
    updates.jobDescription = sanitizedDescription;
  }

  try {
    const job = await jobs.findById(id);

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }

    // Update each field with new data
    Object.keys(updates).forEach((key) => {
      job[key] = updates[key];
    });

    await job.save();
    res.send({ message: "Job updated successfully", job });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating job", error: error.message });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await jobs.findById(id);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.send(job);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving job", error: error.message });
  }
};

// Export the controller function
export {
  createJob,
  getJobs,
  getTotalJobCount,
  searchJobs,
  filterJobs,
  filterSearchJobs,
  deleteJob,
  updateJob,
  archiveJob,
  unarchiveJob,
  editJob,
  getJobById,
  draftJob,
  closeJob,
  reOpenJob,
};

// totalSeniorLevelJobs: { $sum: { $cond: [{ $eq: ['$experienceLevel', 'senior'] }, 1, 0] },
