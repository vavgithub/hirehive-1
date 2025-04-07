import dotenv from "dotenv";
import { getEnvironmentConfig, validateEnvVariables } from "./config/environments.js";

// Load environment-specific .env file
const environment = process.env.NODE_ENV || "development";
dotenv.config({
  path: `.env.${environment}`
});

// Validate required environment variables
validateEnvVariables(environment);

// Get environment-specific configuration
const envConfig = getEnvironmentConfig(environment);

import connectDB from "./db/index.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';

// Import routes
import jobRoutes from "./routes/admin/jobs.router.js";
import candidateRoutes from "./routes/candidate/candidate.router.js";
import authRoutes from "./routes/admin/auth.router.js";
import candidateAuthRoutes from "./routes/candidate/auth.router.js"
import adminCandidateRoutes from "./routes/admin/candidate.router.js"
import drRoutes from "./routes/admin/dr.router.js"
import hrRoutes from "./routes/admin/hr.router.js"
import adminRoutes from "./routes/admin/admin.router.js"
import startScheduledJobs from "./utils/scheduledJobs.js";
import { initializeUploadDir } from "./config/paths.js";
import corsConfig from "./config/cors.config.js";
import cookieSession from "cookie-session";
import { handleUploadError } from "./middlewares/uploadMiddleware.js";
import { User } from "./models/admin/user.model.js";
import { candidates } from "./models/candidate/candidate.model.js";
import { jobs } from "./models/admin/jobs.model.js";

const app = express();
await initializeUploadDir(envConfig.UPLOAD_DIR);

// Apply CORS configuration
app.use(cors(corsConfig(environment)));

app.use(
  cookieSession({
    name: 'hhv-session', // Name of the cookie
    keys: ['ygruwgy764t3667gwerwgyfgw367268'], // Encryption keys
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day in milliseconds)
  })
);

// Middleware setup
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

// Apply security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Logger setup based on environment
if (environment === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/hr", hrRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1/auth/candidate', candidateAuthRoutes);
app.use("/api/v1/candidates", candidateRoutes);
app.use("/api/v1/admin/candidate", adminCandidateRoutes);
app.use("/api/v1/dr", drRoutes);

const PORT = envConfig.PORT;

app.use(handleUploadError)

// async function updationForCompany(){

//     let jobsArr = await jobs.find()
//     jobsArr.forEach(async(job) => {
//       // Find the user associated with the job
//       const user = await User.findOne({ _id: job.createdBy });

//       // If user exists, update the job with company_id from user
//       if (user && user.company_id) {
//         await jobs.updateOne(
//           { _id: job._id }, // Find the specific job document
//           { $set: { company_id: user.company_id } } // Only update company_id
//         );
//       }
//     });

//     console.time("Execution Time"); // Start measuring time
//     const users = await candidates.find();
//     for(let user of users){
//       for(let app of user?.jobApplications){
//         const job = await jobs.findById({_id : app.jobId}).populate('company_id');

//         const companyDetails = {
//           _id : job?.company_id?._id,
//           name :job?.company_id?.name
//         }

//         if(job?.company_id?._id && job?.company_id?.name && app?.jobId){
//           const userWithApplication = await candidates.findOneAndUpdate({
//             _id: user?._id,
//             "jobApplications.jobId" : app.jobId
//           },{
//             $set : {
//               "jobApplications.$.companyDetails" : companyDetails
//             }
//           })
//         }
//       }
//     }
//     console.timeEnd("Execution Time"); // End measuring time and log it
// }

const dbUpdater = async () =>{
  const candidatesData = await candidates.find();
  for (const candidate of candidatesData) {
    for (const jobApp of candidate.jobApplications) {
      const job = await jobs.findById(jobApp.jobId);
      jobApp.jobType = job ? job.employmentType : "NA";
    }
    await candidate.save();
  }

}

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server running in ${environment} mode on port ${PORT}`
      )
    );
    // dbUpdater()
    // Start the scheduled jobs
    startScheduledJobs();
    // updationForCompany()

    app.on("error", (error) => {
      console.log("Error in starting server", error);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to HireHive Job Portal API");
});