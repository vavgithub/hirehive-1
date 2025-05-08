// import Job from ''; // Import your Mongoose model
import { MongooseError } from "mongoose";
import { jobs } from "../../models/admin/jobs.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import mongoose from "mongoose";
import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { sanitizeLexicalHtml } from "../../utils/sanitize-html.js";
import { getPreviousMonthRange, getPreviousWeekRange, getYesterdayTodayRange } from "../../utils/dateRanges.js";
import { User } from "../../models/admin/user.model.js";
import { Assessment } from "../../models/admin/assessment.model.js";
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
      // JOB STATISTICS: Combine 4 countDocuments calls into 1 aggregation
      const getJobStatistics = async () => {
        const pipeline = [
          {
            $match: {
              createdBy: { $in: userIds }
            }
          },
          {
            $facet: {
              totalJobs: [{ $count: "totalJobs" }],
              openJobs: [
                {
                  $match: {
                    status: { $in: ["", "open"] }
                  }
                },
                { $count: "totalJobs" }
              ],
              closedJobs: [
                {
                  $match: {
                    status: "closed"
                  }
                },
                { $count: "totalJobs" }
              ],
              draftedJobs: [
                {
                  $match: {
                    status: "draft"
                  }
                },
                { $count: "totalJobs" }
              ]
            }
          },
          {
            $project: {
              totalJobs: { $arrayElemAt: ["$totalJobs.totalJobs", 0] },
              totalOpenJobs: { $arrayElemAt: ["$openJobs.totalJobs", 0] },
              totalClosedJobs: { $arrayElemAt: ["$closedJobs.totalJobs", 0] },
              totalDraftedJobs: { $arrayElemAt: ["$draftedJobs.totalJobs", 0] }
            }
          }
        ];

        const result = await jobs.aggregate(pipeline);
        return {
          totalJobs: result[0]?.totalJobs || 0,
          totalOpenJobs: result[0]?.totalOpenJobs || 0,
          totalClosedJobs: result[0]?.totalClosedJobs || 0,
          totalDraftedJobs: result[0]?.totalDraftedJobs || 0
        };
      };

      // CANDIDATE STATISTICS: Combine 2 aggregations into 1
      const getCandidateStatistics = async () => {
        const pipeline = [
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
              "jobDetails.createdBy": { $in: userIds }
            }
          },
          {
            $facet: {
              totalApplications: [{ $count: "totalApplications" }],
              totalHired: [
                {
                  $match: {
                    "jobApplications.currentStage": "Hired",
                    "jobApplications.stageStatuses.Hired.status": "Accepted"
                  }
                },
                { $group: { _id: "$_id" } }, // Group by candidate to avoid double-counting
                { $count: "totalHired" }
              ]
            }
          },
          {
            $project: {
              totalApplications: { $arrayElemAt: ["$totalApplications.totalApplications", 0] },
              totalHired: { $arrayElemAt: ["$totalHired.totalHired", 0] }
            }
          }
        ];

        const result = await candidates.aggregate(pipeline);
        return {
          totalApplications: result[0]?.totalApplications || 0,
          totalHired: result[0]?.totalHired || 0
        };
      };

      // Execute queries
      const { totalJobs, totalOpenJobs, totalClosedJobs, totalDraftedJobs } = await getJobStatistics();
      const { totalApplications, totalHired } = await getCandidateStatistics();

      // Utility functions (assumed to exist and unchanged)
      const { firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth } = getPreviousMonthRange();
      const { firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek } = getPreviousWeekRange();
      const { startOfYesterday, endOfYesterday, startOfToday } = getYesterdayTodayRange();

      // JOBS CREATED: Combine all 6 calls into 1 aggregation
      const getJobsCreated = async () => {
        const pipeline = [
          {
            $match: {
              createdBy: { $in: userIds },
              createdAt: { $gte: firstDayPreviousMonth } // Broad filter to include all relevant periods
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

        const result = await jobs.aggregate(pipeline);
        return {
          previousMonthJobs: result[0]?.previousMonthJobs || 0,
          currentMonthJobs: result[0]?.currentMonthJobs || 0,
          previousWeekJobs: result[0]?.previousWeekJobs || 0,
          currentWeekJobs: result[0]?.currentWeekJobs || 0,
          yesterdayJobs: result[0]?.yesterdayJobs || 0,
          todayJobs: result[0]?.todayJobs || 0
        };
      };

      // Execute Jobs Created query
      const {
        previousMonthJobs,
        currentMonthJobs,
        previousWeekJobs,
        currentWeekJobs,
        yesterdayJobs,
        todayJobs
      } = await getJobsCreated();

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

      // RECEIVED APPLICATIONS
      // Monthly: Keep as is (already 1 DB call)
      const monthlyPipeline = [
        { $unwind: "$jobApplications" },
        {
          $match: {
            isVerified: true,
            "jobApplications.companyDetails._id": req.user.company_id,
            "jobApplications.applicationDate": { $gte: firstDayPreviousMonth }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$jobApplications.applicationDate" },
              year: { $year: "$jobApplications.applicationDate" }
            },
            totalApplications: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ];

      const monthlyResult = await candidates.aggregate(monthlyPipeline);

      const previousMonthApplications = monthlyResult.find(entry =>
        entry._id.month === firstDayPreviousMonth.getMonth() + 1 &&
        entry._id.year === firstDayPreviousMonth.getFullYear()
      )?.totalApplications || 0;

      const currentMonthApplications = monthlyResult.find(entry =>
        entry._id.month === firstDayCurrentMonth.getMonth() + 1 &&
        entry._id.year === firstDayCurrentMonth.getFullYear()
      )?.totalApplications || 0;

      let monthlyApplicationsPercentageChange = 0;
      if (previousMonthApplications === 0) {
        monthlyApplicationsPercentageChange = currentMonthApplications * 100;
      } else {
        monthlyApplicationsPercentageChange = ((currentMonthApplications - previousMonthApplications) / previousMonthApplications) * 100;
      }

      // Weekly: Keep as is (already optimized with 1 DB call)
      const getWeeklyApplications = async (firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek, endDate) => {
        const pipeline = [
          { $unwind: "$jobApplications" },
          {
            $match: {
              isVerified: true,
              "jobApplications.companyDetails._id": req.user.company_id,
              "jobApplications.applicationDate": {
                $gte: firstDayPreviousWeek,
                $lte: endDate
              }
            }
          },
          {
            $facet: {
              previousWeek: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: firstDayPreviousWeek,
                      $lte: lastDayPreviousWeek
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              currentWeek: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: firstDayCurrentWeek,
                      $lte: endDate
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ]
            }
          },
          {
            $project: {
              previousWeekApplications: { $arrayElemAt: ["$previousWeek.totalApplications", 0] },
              currentWeekApplications: { $arrayElemAt: ["$currentWeek.totalApplications", 0] }
            }
          }
        ];

        const result = await candidates.aggregate(pipeline);
        return {
          previousWeekApplications: result[0]?.previousWeekApplications || 0,
          currentWeekApplications: result[0]?.currentWeekApplications || 0
        };
      };

      const { previousWeekApplications, currentWeekApplications } = await getWeeklyApplications(
        firstDayPreviousWeek,
        lastDayPreviousWeek,
        firstDayCurrentWeek,
        new Date()
      );

      let weeklyApplicationsPercentageChange = 0;
      if (previousWeekApplications === 0) {
        weeklyApplicationsPercentageChange = currentWeekApplications * 100;
      } else {
        weeklyApplicationsPercentageChange = ((currentWeekApplications - previousWeekApplications) / previousWeekApplications) * 100;
      }

      // Daily: Combine 2 calls into 1 aggregation
      const getDailyApplications = async (startOfYesterday, endOfYesterday, startOfToday, endDate) => {
        const pipeline = [
          { $unwind: "$jobApplications" },
          {
            $match: {
              isVerified: true,
              "jobApplications.companyDetails._id": req.user.company_id,
              "jobApplications.applicationDate": {
                $gte: startOfYesterday,
                $lte: endDate
              }
            }
          },
          {
            $facet: {
              yesterday: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: startOfYesterday,
                      $lte: endOfYesterday
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              today: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: startOfToday,
                      $lte: endDate
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ]
            }
          },
          {
            $project: {
              previousDayApplications: { $arrayElemAt: ["$yesterday.totalApplications", 0] },
              todayApplications: { $arrayElemAt: ["$today.totalApplications", 0] }
            }
          }
        ];

        const result = await candidates.aggregate(pipeline);
        return {
          previousDayApplications: result[0]?.previousDayApplications || 0,
          todayApplications: result[0]?.todayApplications || 0
        };
      };

      const { previousDayApplications, todayApplications } = await getDailyApplications(
        startOfYesterday,
        endOfYesterday,
        startOfToday,
        new Date()
      );

      let dailyApplicationsPercentageChange = 0;
      if (previousDayApplications === 0) {
        dailyApplicationsPercentageChange = todayApplications * 100;
      } else {
        dailyApplicationsPercentageChange = ((todayApplications - previousDayApplications) / previousDayApplications) * 100;
      }

      // HIRED
      // Monthly: Keep as is (already 1 DB call)
      const monthlyHiredPipeline = [
        { $unwind: "$jobApplications" },
        {
          $match: {
            isVerified: true,
            updatedAt: { $gte: firstDayPreviousMonth },
            "jobApplications.stageStatuses.Hired.status": "Accepted",
            "jobApplications.companyDetails._id": req.user.company_id
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$updatedAt" },
              year: { $year: "$updatedAt" }
            },
            totalApplications: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ];

      const monthlyHiredResult = await candidates.aggregate(monthlyHiredPipeline);

      const previousMonthHires = monthlyHiredResult.find(entry =>
        entry._id.month === firstDayPreviousMonth.getMonth() + 1 &&
        entry._id.year === firstDayPreviousMonth.getFullYear()
      )?.totalApplications || 0;

      const currentMonthHires = monthlyHiredResult.find(entry =>
        entry._id.month === firstDayCurrentMonth.getMonth() + 1 &&
        entry._id.year === firstDayCurrentMonth.getFullYear()
      )?.totalApplications || 0;

      let monthlyHiresPercentageChange = 0;
      if (previousMonthHires === 0) {
        monthlyHiresPercentageChange = currentMonthHires * 100;
      } else {
        monthlyHiresPercentageChange = ((currentMonthHires - previousMonthHires) / previousMonthHires) * 100;
      }

      // Weekly and Daily: Combine 4 calls into 1 aggregation
      const getWeeklyAndDailyHires = async (firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek, startOfYesterday, endOfYesterday, startOfToday, endDate) => {
        const pipeline = [
          { $unwind: "$jobApplications" },
          {
            $match: {
              isVerified: true,
              "jobApplications.companyDetails._id": req.user.company_id,
              "jobApplications.stageStatuses.Hired.status": "Accepted",
              updatedAt: { $gte: firstDayPreviousWeek, $lte: endDate }
            }
          },
          {
            $facet: {
              previousWeek: [
                {
                  $match: {
                    updatedAt: { $gte: firstDayPreviousWeek, $lte: lastDayPreviousWeek }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              currentWeek: [
                {
                  $match: {
                    updatedAt: { $gte: firstDayCurrentWeek, $lte: endDate }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              yesterday: [
                {
                  $match: {
                    updatedAt: { $gte: startOfYesterday, $lte: endOfYesterday }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              today: [
                {
                  $match: {
                    updatedAt: { $gte: startOfToday, $lte: endDate }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ]
            }
          },
          {
            $project: {
              previousWeekHires: { $arrayElemAt: ["$previousWeek.totalApplications", 0] },
              currentWeekHires: { $arrayElemAt: ["$currentWeek.totalApplications", 0] },
              previousDayHires: { $arrayElemAt: ["$yesterday.totalApplications", 0] },
              todayHires: { $arrayElemAt: ["$today.totalApplications", 0] }
            }
          }
        ];

        const result = await candidates.aggregate(pipeline);
        return {
          previousWeekHires: result[0]?.previousWeekHires || 0,
          currentWeekHires: result[0]?.currentWeekHires || 0,
          previousDayHires: result[0]?.previousDayHires || 0,
          todayHires: result[0]?.todayHires || 0
        };
      };

      const {
        previousWeekHires,
        currentWeekHires,
        previousDayHires,
        todayHires
      } = await getWeeklyAndDailyHires(
        firstDayPreviousWeek,
        lastDayPreviousWeek,
        firstDayCurrentWeek,
        startOfYesterday,
        endOfYesterday,
        startOfToday,
        new Date()
      );

      let weeklyHiresPercentageChange = 0;
      if (previousWeekHires === 0) {
        weeklyHiresPercentageChange = currentWeekHires * 100;
      } else {
        weeklyHiresPercentageChange = ((currentWeekHires - previousWeekHires) / previousWeekHires) * 100;
      }

      let dailyHiresPercentageChange = 0;
      if (previousDayHires === 0) {
        dailyHiresPercentageChange = todayHires * 100;
      } else {
        dailyHiresPercentageChange = ((todayHires - previousDayHires) / previousDayHires) * 100;
      }


      // Return the statistics
      return res.status(200).json({
        success: true,
        data: {
          totalJobs,
          totalOpenJobs,
          totalClosedJobs,
          totalDraftedJobs,
          totalApplications, // Changed from totalCandidates to totalApplications
          totalHired,
          jobStatistics: {
            monthly: Math.round(monthlyPercentageChange),
            weekly: Math.round(weeklyPercentageChange),
            daily: Math.round(dailyPercentageChange),
          },
          applicationStatistics: {
            monthly: Math.round(monthlyApplicationsPercentageChange),
            weekly: Math.round(weeklyApplicationsPercentageChange),
            daily: Math.round(dailyApplicationsPercentageChange),
          },
          hiredStatistics: {
            monthly: Math.round(monthlyHiresPercentageChange),
            weekly: Math.round(weeklyHiresPercentageChange),
            daily: Math.round(dailyHiresPercentageChange),
          },
        },
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


      const { firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth } = getPreviousMonthRange();
      const { firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek } = getPreviousWeekRange();
      const { startOfYesterday, endOfYesterday, startOfToday } = getYesterdayTodayRange();

      const getApplicationCounts = async (jobId, firstDayPreviousMonth, firstDayCurrentMonth, firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek, startOfYesterday, endOfYesterday, startOfToday, endDate) => {
        const pipeline = [
          { $unwind: "$jobApplications" },
          {
            $match: {
              isVerified: true,
              "jobApplications.jobId": new mongoose.Types.ObjectId(jobId),
              "jobApplications.applicationDate": { $gte: firstDayPreviousMonth, $lte: endDate }
            }
          },
          {
            $facet: {
              monthly: [
                {
                  $group: {
                    _id: {
                      month: { $month: "$jobApplications.applicationDate" },
                      year: { $year: "$jobApplications.applicationDate" }
                    },
                    totalApplications: { $sum: 1 }
                  }
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
              ],
              previousWeek: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: firstDayPreviousWeek,
                      $lte: lastDayPreviousWeek
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              currentWeek: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: firstDayCurrentWeek,
                      $lte: endDate
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              yesterday: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: startOfYesterday,
                      $lte: endOfYesterday
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ],
              today: [
                {
                  $match: {
                    "jobApplications.applicationDate": {
                      $gte: startOfToday,
                      $lte: endDate
                    }
                  }
                },
                { $group: { _id: null, totalApplications: { $sum: 1 } } }
              ]
            }
          },
          {
            $project: {
              monthly: 1,
              previousWeekApplications: { $arrayElemAt: ["$previousWeek.totalApplications", 0] },
              currentWeekApplications: { $arrayElemAt: ["$currentWeek.totalApplications", 0] },
              previousDayApplications: { $arrayElemAt: ["$yesterday.totalApplications", 0] },
              todayApplications: { $arrayElemAt: ["$today.totalApplications", 0] }
            }
          }
        ];

        const result = await candidates.aggregate(pipeline);
        const monthlyResult = result[0]?.monthly || [];

        // Extract monthly counts
        const previousMonthApplications = monthlyResult.find(entry =>
          entry._id.month === firstDayPreviousMonth.getMonth() + 1 &&
          entry._id.year === firstDayPreviousMonth.getFullYear()
        )?.totalApplications || 0;

        const currentMonthApplications = monthlyResult.find(entry =>
          entry._id.month === firstDayCurrentMonth.getMonth() + 1 &&
          entry._id.year === firstDayCurrentMonth.getFullYear()
        )?.totalApplications || 0;

        return {
          previousMonthApplications,
          currentMonthApplications,
          previousWeekApplications: result[0]?.previousWeekApplications || 0,
          currentWeekApplications: result[0]?.currentWeekApplications || 0,
          previousDayApplications: result[0]?.previousDayApplications || 0,
          todayApplications: result[0]?.todayApplications || 0
        };
      };

      // Execute query
      const {
        previousMonthApplications,
        currentMonthApplications,
        previousWeekApplications,
        currentWeekApplications,
        previousDayApplications,
        todayApplications
      } = await getApplicationCounts(
        jobId,
        firstDayPreviousMonth,
        firstDayCurrentMonth,
        firstDayPreviousWeek,
        lastDayPreviousWeek,
        firstDayCurrentWeek,
        startOfYesterday,
        endOfYesterday,
        startOfToday,
        new Date()
      );

      // Calculate percentage changes (unchanged)
      let monthlyApplicationsPercentageChange = 0;
      if (previousMonthApplications === 0) {
        monthlyApplicationsPercentageChange = currentMonthApplications * 100;
      } else {
        monthlyApplicationsPercentageChange = ((currentMonthApplications - previousMonthApplications) / previousMonthApplications) * 100;
      }

      let weeklyApplicationsPercentageChange = 0;
      if (previousWeekApplications === 0) {
        weeklyApplicationsPercentageChange = currentWeekApplications * 100;
      } else {
        weeklyApplicationsPercentageChange = ((currentWeekApplications - previousWeekApplications) / previousWeekApplications) * 100;
      }

      let dailyApplicationsPercentageChange = 0;
      if (previousDayApplications === 0) {
        dailyApplicationsPercentageChange = todayApplications * 100;
      } else {
        dailyApplicationsPercentageChange = ((todayApplications - previousDayApplications) / previousDayApplications) * 100;
      }

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
        comparison : {
          applicationsReceived: {
            monthly: Math.round(monthlyApplicationsPercentageChange),
            weekly: Math.round(weeklyApplicationsPercentageChange),
            daily: Math.round(dailyApplicationsPercentageChange),
          },          
        }
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
    const { page, status , pinned } = req.query;
    const pageNumber = page ? parseInt(page) : 1;
    const LIMIT = 5;

    let pinnedIds = pinned ? JSON.parse(pinned) : [];
    let closedPins = []

    if(pinnedIds?.length > LIMIT){
      return res.status(400).json({
        message: `Exceeded Pinned Jobs Count. Only ${LIMIT} jobs are allowed to pin.`,
      });
    }

    const company_id = req.user.company_id;
    let userIds = [];

    if(company_id){
      // Find all users in the same company
      const usersInCompany = await User.find({ company_id }, '_id'); // Get only _id fields
      // Extract user _id values into an array
       userIds = usersInCompany.map(user => user._id);
    }

      //check pinned jobs are open or not
      for(let pinnedJob of pinnedIds){
        const job = await jobs.findOne({_id: pinnedJob, createdBy: {$in : userIds} , status : "open" , })
        if(!job){
          closedPins.push(pinnedJob)
          pinnedIds = pinnedIds.filter(id => id !== pinnedJob)
        }
      }

    let jobsWithStats = []

    if(pageNumber === 1 && status === 'open' && pinnedIds?.length > 0 && pinnedIds?.length <= LIMIT){
      jobsWithStats = await jobs.aggregate([
        // Match jobs created by the current user
        {
          $match: {
            createdBy: {$in : userIds},
            status: status,
            _id : {$in : pinnedIds.map(id => new mongoose.Types.ObjectId(id))}
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
      if(jobsWithStats?.length < LIMIT){
        const extraJobs = await jobs.aggregate([
          // Match jobs created by the current user
          {
            $match: {
              createdBy: {$in : userIds},
              status: status,
            _id : {$nin : pinnedIds.map(id => new mongoose.Types.ObjectId(id))}
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
            $limit: (LIMIT - pinnedIds?.length),
          },
        ]);

        jobsWithStats.push(...extraJobs)
      }
    }else{

      jobsWithStats = await jobs.aggregate([
        // Match jobs created by the current user
        {
          $match: {
            createdBy: {$in : userIds},
            status: status,
            _id : {$nin : pinnedIds.map(id => new mongoose.Types.ObjectId(id))}
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
          $skip: (pinnedIds?.length === 0 || status !== 'open')  ? (pageNumber - 1) * LIMIT : (pageNumber === 2 ? (LIMIT - pinnedIds?.length) : ((pageNumber - 1) * LIMIT ) - (pinnedIds?.length)),
        },
        {
          $limit: LIMIT,
        },
      ]);
    }


    res.status(200).json({jobs : jobsWithStats , closedPins });
  } catch (error) {
    console.error("Error in getJobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

const getAssessmentTemplates = async (req,res) => {
  try {
    const existingAssessmentTemplates = await Assessment.find({ isAvailable : true }).select('-questions')
    res.status(200).json(existingAssessmentTemplates)
  } catch (error) {
    console.log("Error getting Assessment templates : ", error)
    res.status(500).json({
      success: false,
      message: "Error accessing assessment details",
      error: error.message,
    });
  }
}

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
      assessment_id,
      skills,
      isPublic,
      jobDescription,
      status,
      questions,
    } = req.body;

    if(assessment_id){
      const isExisitngAssessment = await Assessment.findById(assessment_id);
      if(!isExisitngAssessment){
        res.status(400).json({
          message: `Selected Assessment is invalid.`,
        });
        return
      }
    }

    const sanitizedDescription = sanitizeLexicalHtml(jobDescription); 

    const newJob = new jobs({
      jobTitle,
      workplaceType,
      employeeLocation,
      employmentType,
      jobProfile,
      isPublic,
      experienceFrom,
      experienceTo,
      ...(assessment_id ? {assessment_id} : {}),
      budgetFrom,
      budgetTo,
      skills,
      jobDescription: sanitizedDescription,
      status,
      createdBy: req.user._id,
      company_id : req.user?.company_id,
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
    const LIMIT = 5;

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
  getAssessmentTemplates,
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
