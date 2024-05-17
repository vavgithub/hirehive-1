// import Job from ''; // Import your Mongoose model
import { MongooseError } from "mongoose";
import { jobs } from "../models/admin/jobs.model.js";
// Controller function to create a new job

const getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobArray = await jobs.find();
    // Respond with the list of jobs
    res.status(200).json(jobArray);
  } catch (error) {
    // Handle error if fetching jobs fails
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    // Destructure job details from request body
    const {
      title,
      location,
      jobType,
      category,
      experienceLevel,
      description,
      requirements,
      qualifications,
      status,
      skills,
    } = req.body;

    // Create a new job instance using the Job model
    const newJob = new jobs({
      title,
      location,
      jobType,
      category,
      experienceLevel,
      description,
      requirements,
      qualifications,
      status,
      skills,
    });

    // Save the job to the database
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
      res.status(500).json({ msg:"this is coming from backned" , message: error.message });
    }
  }
};

const getTotalJobCount = async (req, res) => {
  try {
    // Count the total number of jobs in the database
    const totalCount = await jobs.countDocuments();
    // Respond with the total count
    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchJobs = async (req, res) => {
  const searchTerm = req.query.title;
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term (title) is required" });
  }
  try {
    // Fetch all jobs from the database
    const jobArray = await jobs.find({
      title: { $regex: searchTerm, $options: "i" },
    });
    // Respond with the list of jobs
    res.status(200).json(jobArray);
  } catch (error) {
    // Handle error if fetching jobs fails
    res.status(500).json({ message: error.message });
  }
};

const filterJobs = async (req, res) => {
  const { jobType, experienceLevel, category } = req.body.filters;
  try {
    const query = {};
    if (jobType && jobType.length > 0) {
      query.jobType = { $in: jobType.map((type) => type.toLowerCase()) };
    }

    if (experienceLevel && experienceLevel.length > 0) {
      query.experienceLevel = {
        $in: experienceLevel.map((level) => level.toLowerCase()),
      };
    }

    if (category && category.length > 0) {
      query.category = {
        $in: category.map((func) => func.toLowerCase()),
      };
    }
    const filteredJobs = await jobs.find(query);
    res.status(200).json(filteredJobs);
  } catch (error) {
    console.log("Error Filtergin Jobs", error);
    res.status(500).json({ message: error.message });
  }
};

const activeJobsFilterCount = async (req, res) => {
  try {
    const stats = await jobs.aggregate([
      {
        $match: { status: "active" }, // Filter only active jobs
      },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalArchivedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "archived"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$jobType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$jobType", "fulltime"] }, 1, 0] },
          },
          totalEntryLevelJobs: {
            $sum: { $cond: [{ $eq: ["$experienceLevel", "entry"] }, 1, 0] },
          },
          totalMidLevelJobs: {
            $sum: {
              $cond: [{ $eq: ["$experienceLevel", "intermediate"] }, 1, 0],
            },
          },
          totalSeniorLevelJobs: {
            $sum: { $cond: [{ $eq: ["$experienceLevel", "senior"] }, 1, 0] },
          },
          totalDesignJobs: {
            $sum: { $cond: [{ $eq: ["$category", "design"] }, 1, 0] },
          },
          totalSalesJobs: {
            $sum: { $cond: [{ $eq: ["$category", "sales"] }, 1, 0] },
          },
          totalMarketingJobs: {
            $sum: { $cond: [{ $eq: ["$category", "marketing"] }, 1, 0] },
          },
          totalEngineeringJobs: {
            $sum: { $cond: [{ $eq: ["$category", "engineering"] }, 1, 0] },
          },
          // Add more conditions for other job functions/categories
        },
      },
    ]);

    if (stats.length > 0) {
      res.json(stats[0]); // Return the first (and only) result
    } else {
      res.json({}); // No stats found
    }
  } catch (error) {
    console.error("Error fetching job statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const jobsStats = async (req, res) => {
  try {
    const stats = await jobs.aggregate([
      // {
      //   $match: { status: "active" } // Filter only active jobs
      // },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalArchivedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "archived"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$jobType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$jobType", "fulltime"] }, 1, 0] },
          },
          totalEntryLevelJobs: {
            $sum: { $cond: [{ $eq: ["$experienceLevel", "entry"] }, 1, 0] },
          },
          totalMidLevelJobs: {
            $sum: {
              $cond: [{ $eq: ["$experienceLevel", "intermidiate"] }, 1, 0],
            },
          },
          totalSeniorLevelJobs: {
            $sum: { $cond: [{ $eq: ["$experienceLevel", "senior"] }, 1, 0] },
          },
          totalDesignJobs: {
            $sum: { $cond: [{ $eq: ["$category", "design"] }, 1, 0] },
          },
          totalSalesJobs: {
            $sum: { $cond: [{ $eq: ["$category", "sales"] }, 1, 0] },
          },
          totalMarketingJobs: {
            $sum: { $cond: [{ $eq: ["$category", "marketing"] }, 1, 0] },
          },
          totalEngineeringJobs: {
            $sum: { $cond: [{ $eq: ["$category", "engineering"] }, 1, 0] },
          },
          // Add more conditions for other job functions/categories
        },
      },
    ]);

    if (stats.length > 0) {
      res.json(stats[0]); // Return the first (and only) result
    } else {
      res.json({}); // No stats found
    }
  } catch (error) {
    console.error("Error fetching job statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await jobs.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const jobUpdates = req.body;
  try {
      const updatedJob = await jobs.findByIdAndUpdate(id, jobUpdates, {
          new: true, // Return the modified document rather than the original
          runValidators: true // Ensures updates meet your schema requirements
      });

      if (!updatedJob) {
          return res.status(404).send({ message: 'Job not found' });
      }

      res.send(updatedJob);
  } catch (error) {
      res.status(400).send({ message: 'Error updating job', error: error.message });
  }
};

const archiveJob = async (req, res) => {
  const { id } = req.params;

  try {
      const job = await jobs.findById(id);

      if (!job) {
          return res.status(404).send({ message: 'Job not found' });
      }

      if (job.status === 'active') {
          job.status = 'archived';
          await job.save();
          res.send({ message: 'Job status updated to archived' });
      } else {
          res.status(400).send({ message: 'Job is not in an active state' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Error updating job status', error: error.message });
  }
};

//here unarvhicee means for we are acting thi job from archive to active again
const unarchiveJob = async (req, res) => {
  const { id } = req.params;

  try {
      const job = await jobs.findById(id);

      if (!job) {
          return res.status(404).send({ message: 'Job not found' });
      }

      if (job.status === 'archived') {
          job.status = 'active';
          await job.save();
          res.send({ message: 'Job status updated to active' });
      } else {
          res.status(400).send({ message: 'Job is not in an archieved state' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Error updating job status', error: error.message });
  }
};

const editJob = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const job = await jobs.findById(id);

      if (!job) {
          return res.status(404).send({ message: 'Job not found' });
      }

      // Update each field with new data
      Object.keys(updates).forEach((key) => {
          job[key] = updates[key];
      });

      await job.save();
      res.send({ message: 'Job updated successfully', job });
  } catch (error) {
      res.status(500).send({ message: 'Error updating job', error: error.message });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
      const job = await jobs.findById(id);
      if (!job) {
          return res.status(404).send({ message: 'Job not found' });
      }
      res.send(job);
  } catch (error) {
      res.status(500).send({ message: 'Error retrieving job', error: error.message });
  }
};




// Export the controller function
export {
  createJob,
  getJobs,
  getTotalJobCount,
  searchJobs,
  filterJobs,
  jobsStats,
  activeJobsFilterCount,
  deleteJob,
  updateJob,
  archiveJob,
  unarchiveJob,
  editJob,
  getJobById
};

// totalSeniorLevelJobs: { $sum: { $cond: [{ $eq: ['$experienceLevel', 'senior'] }, 1, 0] },
