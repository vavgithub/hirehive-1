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
        jobTitle,
        workplaceType,
        employeeLocation,
        employmentType,
        jobProfile,
        fromExperience,
        toExperience,
        budgetFrom,
        budgetTo,
        jobDescription,
        skills,
        status,
    } = req.body;

    // Create a new job instance using the Job model
    const newJob = new jobs({
      jobTitle,
      workplaceType,
      employeeLocation,
      employmentType,
      jobProfile,
      fromExperience,
      toExperience,
      budgetFrom,
      budgetTo,
      jobDescription,
      skills,
      status,
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

const filterJobs = async (req, res) => {
  const { employmentType, jobProfile } = req.body.filters;
  try {
    const query = {};
    if (employmentType && employmentType.length > 0) {
      query.employmentType = { $in: employmentType };
      console.log(query.employmentType);
    }
    // if (experienceLevel && experienceLevel.length > 0) {
    //   query.experienceLevel = {
    //     $in: experienceLevel.map((level) => level.toLowerCase()),
    //   };
    // }
    if (jobProfile && jobProfile.length > 0) {
      query.jobProfile = {
        $in: jobProfile.map((type) => type.toLowerCase())};
        console.log(query.jobProfile);
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
        $match: { status: "open" }, // Filter only open jobs
      },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalClosedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$employmentType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "Full Time"] }, 1, 0] },
          },
          totalContractJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "contract"] }, 1, 0] },
          },
          totalUiUxJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "uiux"] }, 1, 0] }
        },
        totalMotionGraphicsJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "motiongraphic"] }, 1, 0] }
        },
        total3DJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "3d"] }, 1, 0] }
        },
        totalVideoEditorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "videoeditor"] }, 1, 0] }
        },
        totalDigitalMarketingExecutiveJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "digitalmarketingexecutive"] }, 1, 0] }
        },
        totalProjectManagerJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "projectmanager"] }, 1, 0] }
        },
        totalArtDirectorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "artdirector"] }, 1, 0] }
        },
        totalFrontendDeveloperJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "frontenddeveloper"] }, 1, 0] }
        }
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

const closedJobsFilterCount = async (req, res) => {
  try {
    const stats = await jobs.aggregate([
      {
        $match: { status: "closed" }, // Filter only open jobs
      },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalClosedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$employmentType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "Full Time"] }, 1, 0] },
          },
          totalContractJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "contract"] }, 1, 0] },
          },
          totalUiUxJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "uiux"] }, 1, 0] }
        },
        totalMotionGraphicsJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "motiongraphic"] }, 1, 0] }
        },
        total3DJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "3d"] }, 1, 0] }
        },
        totalVideoEditorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "videoeditor"] }, 1, 0] }
        },
        totalDigitalMarketingExecutiveJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "digitalmarketingexecutive"] }, 1, 0] }
        },
        totalProjectManagerJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "projectmanager"] }, 1, 0] }
        },
        totalArtDirectorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "artdirector"] }, 1, 0] }
        },
        totalFrontendDeveloperJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "frontenddeveloper"] }, 1, 0] }
        }
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

const draftJobsFilterCount = async (req, res) => {
  try {
    const stats = await jobs.aggregate([
      {
        $match: { status: "draft" }, // Filter only draft jobs
      },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalClosedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$employmentType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "Full Time"] }, 1, 0] },
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
          totalUiUxJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "uiux"] }, 1, 0] }
        },
        totalMotionGraphicsJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "motiongraphic"] }, 1, 0] }
        },
        total3DJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "3d"] }, 1, 0] }
        },
        totalVideoEditorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "videoeditor"] }, 1, 0] }
        },
        totalDigitalMarketingExecutiveJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "digitalmarketingexecutive"] }, 1, 0] }
        },
        totalProjectManagerJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "projectmanager"] }, 1, 0] }
        },
        totalArtDirectorJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "artdirector"] }, 1, 0] }
        },
        totalFrontendDeveloperJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "frontenddeveloper"] }, 1, 0] }
        }
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
      //   $match: { status: "open" } // Filter only open jobs
      // },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          totalActiveJobs: {
            $sum: { $cond: [{ $eq: ["$status", "open"] }, 1, 0] },
          },
          totalDraftJobs: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          totalClosedJobs: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] },
          },
          totalInternships: {
            $sum: { $cond: [{ $eq: ["$employmentType", "internship"] }, 1, 0] },
          },
          totalFullTimeJobs: {
            $sum: { $cond: [{ $eq: ["$employmentType", "Full Time"] }, 1, 0] },
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
            $sum: { $cond: [{ $eq: ["$jobProfile", "design"] }, 1, 0] },
          },
          totalSalesJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "sales"] }, 1, 0] },
          },
          totalMarketingJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "marketing"] }, 1, 0] },
          },
          totalEngineeringJobs: {
            $sum: { $cond: [{ $eq: ["$jobProfile", "engineering"] }, 1, 0] },
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

      if (job.status === 'open') {
          job.status = 'closed';
          await job.save();
          res.send({ message: 'Job status updated to closed' });
      } else {
          res.status(400).send({ message: 'Job is not in an open state' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Error updating job status', error: error.message });
  }
};


const draftJob = async (req, res) => {
  const { id } = req.params;
  try{
    const job = await jobs.findById(id);
    if(!job){
      return res.status(404).send({ message: 'Job not found' });
    }
    if(job.status === 'open' || 'closed'){
      job.status = 'draft';
      await job.save();
      res.send({ message: 'Job status updated to draft' });
    }else{
      res.status(400).send({ message: 'Job is not in an open state' });
    }
  }catch (error) {
    res.status(500).send({ message: 'Error updating job status', error: error.message });
}
}

//here unarvhicee means for we are acting thi job from archive to open again
const unarchiveJob = async (req, res) => {
  const { id } = req.params;

  try {
      const job = await jobs.findById(id);

      if (!job) {
          return res.status(404).send({ message: 'Job not found' });
      }

      if (job.status === 'open') {
          job.status = 'closed';
          await job.save();
          res.send({ message: 'Job status updated to open' });
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
  getJobById,
  draftJobsFilterCount,
  closedJobsFilterCount,
  draftJob,
};

// totalSeniorLevelJobs: { $sum: { $cond: [{ $eq: ['$experienceLevel', 'senior'] }, 1, 0] },
