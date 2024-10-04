// auth.controller.js
import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

import { candidates as Candidate } from "../../models/candidate/candidate.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { jobs } from "../../models/admin/jobs.model.js";
import { jobStagesStatuses } from "../../config/jobStagesStatuses.js";

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Secret key for JWT (store this in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    // Extract the file extension
    const fileExtension = path.extname(filePath);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      folder: 'resumes',
      public_id: `resume_${Date.now()}${fileExtension}`, // Include the file extension
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      access_mode: 'public'
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const tempFilePath = path.join(__dirname, '..', '..', 'uploads', req.file.filename);

  try {
    const cloudinaryUrl = await uploadToCloudinary(tempFilePath);
    await fs.unlink(tempFilePath);
    res.status(200).json({ resumeUrl: cloudinaryUrl });
  } catch (error) {
    console.error('Error in resume upload:', error);
    res.status(500).json({ message: 'Error uploading resume' });
  }
};


// Configure nodemailer transporter (you'll need to use your own SMTP settings)
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_EMAIL_CRED,
  },
});

// Helper function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.OTP_EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};




// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// New helper function to get job stages
const getJobStages = (jobProfile) => {
  // Implement this function to return the stages for a given job profile
  // You can use the jobStages configuration you shared earlier
  return jobStagesStatuses[jobProfile] || [];
};

// Controller function to register a candidate

// auth.controller.js

export const registerCandidate = async (req, res) => {
  try {
    const {
      jobId,
      // jobApplied will be fetched from the job document using jobId
      firstName,
      lastName,
      email,
      phone,
      website,
      portfolio,
      noticePeriod,
      currentCTC,
      expectedCTC,
      experience,
      skills,
      questionResponses,
      resumeUrl,
      // Other fields as needed
    } = req.body;

    // Fetch the job details using jobId to get jobTitle (jobApplied)
    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const jobApplied = job.jobTitle;

    const jobStages = getJobStages(job.jobProfile);

    // Check if email or phone number already exists
    const existingCandidate = await Candidate.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingCandidate) {
      return res
        .status(400)
        .json({ message: "Email or phone number already exists" });
    }

    // Generate OTP and hash it
    const otp = generateOtp();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const initialStageStatuses = {};
    jobStages.forEach((stage, index) => {
      const initialStatus = index === 0 ? stage.statuses[0] : stage.statuses.find(status => status.toLowerCase().includes('not assigned')) || stage.statuses[0];
      initialStageStatuses[stage.name] = {
        status: initialStatus,
        rejectionReason: "N/A",
        assignedTo: null,
        score: {},
        currentCall: null,
        callHistory: [],
      };
    });

    // Create new candidate with job application data
    const newCandidate = new Candidate({
      firstName,
      lastName,
      email,
      phone,
      website,
      portfolio,
      noticePeriod,
      currentCTC,
      expectedCTC,
      experience,
      skills,
      otp: hashedOtp,
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      resumeUrl,

      jobApplications: [
        {          
          jobId,
          jobApplied,
          questionResponses,
          applicationDate: new Date(),
          currentStage: jobStages[0]?.name || "",
          stageStatuses: initialStageStatuses,
          resumeUrl,
        },
      ],
    });
    await newCandidate.save();

    // Send OTP to candidate's email
    await sendOtpEmail(email, otp);

    res
      .status(200)
      .json({ message: "Candidate registered. OTP sent to email." });
  } catch (error) {
    console.error("Error registering candidate:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to create password
export const createPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate password (you can add more validation as needed)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update candidate's password
    const candidate = await Candidate.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Password created successfully" });
  } catch (error) {
    console.error("Error creating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find candidate
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Check if OTP is expired
    if (candidate.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Compare hashed OTP
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOtp !== candidate.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Mark candidate as verified
    candidate.isVerified = true;
    candidate.otp = undefined;
    candidate.otpExpires = undefined;
    await candidate.save();

    // Generate JWT token
    const token = jwt.sign({ id: candidate._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use 'true' in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find candidate by email
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Check if candidate is verified
    if (!candidate.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your account first" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, candidate.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: candidate._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in candidate:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutCandidate = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// auth.controller.js

// auth.controller.js

export const applyToJob = async (req, res) => {
  try {
    const candidateId = req.candidate._id;
    const {
      jobId,
      questionResponses,
    } = req.body;

    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const jobApplied = job.jobTitle;
    const jobProfile = job.jobProfile;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const hasApplied = candidate.jobApplications.some(
      (application) => application.jobId.toString() === jobId
    );

    if (hasApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job." });
    }

    const jobStages = getJobStages(jobProfile);

    // Prepare stage statuses dynamically
    const initialStageStatuses = {};
    jobStages.forEach((stage, index) => {
      const initialStatus = index === 0 
        ? stage.statuses[0] 
        : stage.statuses.find(status => status.toLowerCase().includes('not assigned')) || stage.statuses[0];
      initialStageStatuses[stage.name] = {
        status: initialStatus,
        rejectionReason: "N/A",
        assignedTo: null,
        score: {},
        currentCall: null,
        callHistory: [],
      };
    });

    // Add the new job application
    candidate.jobApplications.push({
      resumeUrl: req.body.resumeUrl,
      jobId,
      jobApplied,
      questionResponses,
      applicationDate: new Date(),
      currentStage: jobStages[0]?.name || "",
      stageStatuses: initialStageStatuses,
    });

    await candidate.save();

    res.status(200).json({ message: "Successfully applied to the job." });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Modifications to getCandidateDashboard function
export const getCandidateDashboard = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.candidate._id).populate({
      path: "jobApplications.jobId",
      model: "jobs",
      select: "jobTitle status",
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Format the response to include relevant job application details
    const formattedApplications = candidate.jobApplications.map((app) => ({
      jobId: app.jobId._id,
      jobTitle: app.jobId.jobTitle,
      jobStatus: app.jobId.status,
      applicationDate: app.applicationDate,
      currentStage: app.currentStage,
      stageStatuses: Object.fromEntries(app.stageStatuses),
    }));

    res.status(200).json({
      candidate: {
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        expectedCTC: candidate.expectedCTC,
        portfolio: candidate.portfolio,
        website: candidate.website,
        noticePeriod: candidate.noticePeriod,
        currentCTC: candidate.currentCTC,
        expectedCTC: candidate.expectedCTC,
        experience: candidate.experience,
        skills: candidate.skills,
        jobApplications: formattedApplications, // Include jobApplications in the candidate object
        // Include other relevant candidate fields
      },
    });
  } catch (error) {
    console.error("Error fetching candidate dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// auth.controller.js

export const getCandidateAppliedJobs = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.candidate._id).populate({
      path: "jobApplications.jobId",
      model: "jobs",
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ jobApplications: candidate.jobApplications });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};
