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

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server running in ${environment} mode on port ${PORT}`
      )
    );
    
    // Start the scheduled jobs
    startScheduledJobs();

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