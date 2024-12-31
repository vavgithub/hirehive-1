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
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateOTP, otpStore } from "../../utils/otp.js";
import { sendEmail } from "../../utils/sentEmail.js";
import { getPasswordResetContent, getResetSuccessfulContent, getSignupEmailContent } from "../../utils/emailTemplates.js";

// Secret key for JWT (store this in environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.OTP_EMAIL,
//     pass: process.env.OTP_EMAIL_CRED,
//   },
// });

// // Helper function to send OTP email
// const sendOtpEmail = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.OTP_EMAIL,
//     to: email,
//     subject: "OTP Verification",
//     text: `Your OTP code is ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// };

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get job stages helper
const getJobStages = (jobProfile) => {
  return jobStagesStatuses[jobProfile] || [];
};

// auth.controller.js
// Resume upload controller
export const uploadResumeController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const cloudinaryUrl = await uploadToCloudinary(
      req.file.path, // Pass the complete path instead of just filename
      "resumes"
    );

    res.status(200).json({ resumeUrl: cloudinaryUrl });
  } catch (error) {
    console.error("Error in resume upload:", error);
    res.status(500).json({ message: error.message || "Error uploading resume" });
  }
};

export const uploadProfilePictureController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const cloudinaryUrl = await uploadToCloudinary(
      req.file.path, // Pass the complete path instead of just filename
      "candidate-profile-pictures"
    );

    res.status(200).json({ profilePictureUrl: cloudinaryUrl });
  } catch (error) {
    console.error("Error in profile picture upload:", error);
    res.status(500).json({ message: error.message || "Error uploading profile picture" });
  }
};


export const registerCandidate = async (req, res) => {
  try {
    const {
      jobId,
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
      profilePictureUrl, // Add this new field
    } = req.body;

    const job = await jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const jobApplied = job.jobTitle;

    const jobStages = getJobStages(job.jobProfile);

    // Check for existing email and phone separately
    const existingEmail = await Candidate.findOne({ email });
    const existingPhone = await Candidate.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({ 
        message: "Phone number already exists",
        field: "phone"
      });
    }

    // Generate OTP and hash it
    const otp = generateOtp();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

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

    // Professional info object
    const professionalInfo = {
      website,
      portfolio,
      noticePeriod,
      currentCTC,
      expectedCTC,
      experience,
      skills,
    };

    if(!existingEmail){
  
      // Create new candidate with job application data
      const newCandidate = new Candidate({
        firstName,
        lastName,
        email,
        phone,
        ...professionalInfo,
        otp: hashedOtp,
        profilePictureUrl, // Add the profile picture URL
        otpExpires: Date.now() + 10 * 60 * 1000,
        jobApplications: [
          {          
            jobId,
            jobApplied,
            questionResponses,
            applicationDate: new Date(),
            currentStage: jobStages[0]?.name || "",
            stageStatuses: initialStageStatuses,
            resumeUrl,
            professionalInfo
          },
        ],
      });
  
      await newCandidate.save();

    }else{
      existingEmail.otp = hashedOtp
      existingEmail.otpExpires = Date.now() + 10 * 60 * 1000

      //if email exist with different phone, new phone is updated
      if(existingEmail && existingEmail.phone !== phone ){
        existingEmail.phone = phone
      }

      if(profilePictureUrl) {
        existingEmail.profilePictureUrl = profilePictureUrl; // Update profile picture if provided
      }

      // Check if the candidate has already applied for the same job
      const alreadyAppliedJob = existingEmail.jobApplications.some(
        (application) => application.jobId.toString() === jobId
      );

      //if not already applied job, create new job entry
      if (!alreadyAppliedJob) {
        const newJobApplication = {          
          jobId,
          jobApplied,
          questionResponses,
          applicationDate: new Date(),
          currentStage: jobStages[0]?.name || "",
          stageStatuses: initialStageStatuses,
          resumeUrl,
          professionalInfo
        }

        existingEmail.jobApplications.push(newJobApplication)
      }

      await existingEmail.save()
    } 

    //get custom HTML content for signup email
    const mailContent = getSignupEmailContent(firstName + " " + lastName, otp) 
    
    //send OTP anyways
    await sendEmail(email,"OTP Verification", mailContent);

    res.status(200).json({ message: existingEmail ? "Account exists. OTP sent to email for verification." : "Candidate registered. OTP sent to email." });
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

// auth.controller.js - Updated applyToJob function

export const applyToJob = async (req, res) => {
  try {
    const candidateId = req.candidate._id;
    const {
      jobId,
      website,
      portfolio,
      noticePeriod,
      currentCTC,
      expectedCTC,
      experience,
      skills,
      questionResponses,
      resumeUrl,
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
      return res.status(400).json({ message: "You have already applied to this job." });
    }

    // Professional info object that will be used both globally and in the job application
    const professionalInfo = {
      website,
      portfolio,
      noticePeriod,
      currentCTC,
      expectedCTC,
      experience,
      skills,
    };

    // Update candidate's global professional information
    Object.assign(candidate, professionalInfo);

    const jobStages = getJobStages(jobProfile);
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

    // Create new job application with professionalInfo included
    const newApplication = {
      jobId,
      jobApplied,
      questionResponses,
      applicationDate: new Date(),
      currentStage: jobStages[0]?.name || "",
      stageStatuses: initialStageStatuses,
      resumeUrl,
      rating: "N/A",
      professionalInfo // Include professional info in the job application
    };

    candidate.jobApplications.push(newApplication);
    await candidate.save();

    res.status(200).json({ 
      message: "Successfully applied to the job.",
      application: newApplication
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Modifications to getCandidateDashboard function
export const getCandidateDashboard = async (req, res) => {
  try {
       const candidate = await Candidate.aggregate([
      // Match the candidate by ID
      {
        $match: { _id: req.candidate._id },
      },
      // Perform a lookup to populate jobApplications.jobId
      {
        $lookup: {
          from: "jobs", // The collection to join
          localField: "jobApplications.jobId", // The field in Candidate
          foreignField: "_id", // The field in Jobs
          as: "jobDetails", // The resulting array of matching documents
        },
      },
      // Project to include only necessary fields and format the output
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          expectedCTC: 1,
          portfolio: 1,
          website: 1,
          noticePeriod: 1,
          currentCTC: 1,
          experience: 1,
          skills: 1,
          hasGivenAssessment: 1,
          "jobApplications.applicationDate": 1,
          "jobApplications.currentStage": 1,
          "jobApplications.stageStatuses": 1,
          "jobApplications.jobApplied": 1,
          "jobApplications.jobId": 1,
          "jobDetails": {
            _id: 1,
            jobTitle: 1,
            status: 1,
          },
        },
      },
    ])
    
    if (candidate.length === 0) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Format the response to include relevant job application details
    const formattedApplications = candidate[0].jobApplications.map((app,index) => {
      const isValid = candidate[0].jobDetails.find(currentJob=>currentJob._id.toString() === app.jobId.toString());
      return ({
        jobId: isValid?._id || app.jobId,
        jobTitle:isValid?.jobTitle || app.jobApplied,
        jobStatus: isValid?.status || 'deleted',
        applicationDate: app.applicationDate,
        currentStage: app.currentStage,
        stageStatuses: Array.from(app.stageStatuses),
      })
    });

    res.status(200).json({
      candidate: {
        _id: candidate[0]._id,
        firstName: candidate[0].firstName,
        lastName: candidate[0].lastName,
        email: candidate[0].email,
        phone: candidate[0].phone,
        expectedCTC: candidate[0].expectedCTC,
        portfolio: candidate[0].portfolio,
        website: candidate[0].website,
        noticePeriod: candidate[0].noticePeriod,
        currentCTC: candidate[0].currentCTC,
        expectedCTC: candidate[0].expectedCTC,
        experience: candidate[0].experience,
        skills: candidate[0].skills,
        hasGivenAssessment:candidate[0].hasGivenAssessment,
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
    // const candidate = await Candidate.findById(req.candidate._id).populate({
    //   path: "jobApplications.jobId",
    //   model: "jobs",
    // });

    const candidate = await Candidate.aggregate([
      // Match the candidate by ID
      {
        $match: { _id: req.candidate._id },
      },
      // Perform a lookup to populate jobApplications.jobId
      {
        $lookup: {
          from: "jobs", // The collection to join
          localField: "jobApplications.jobId", // The field in Candidate
          foreignField: "_id", // The field in Jobs
          as: "jobDetails", // The resulting array of matching documents
        },
      },
      // Project to include only necessary fields and format the output
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          expectedCTC: 1,
          portfolio: 1,
          website: 1,
          noticePeriod: 1,
          currentCTC: 1,
          experience: 1,
          skills: 1,
          hasGivenAssessment: 1,
          "jobApplications.applicationDate": 1,
          "jobApplications.currentStage": 1,
          "jobApplications.stageStatuses": 1,
          "jobApplications.jobApplied": 1,
          "jobApplications.jobId": 1,
          "jobDetails": 1,
        },
      },
    ])

    if (candidate.length === 0) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    //validating applications by checking if its deleted or not
    const formattedApplications = candidate[0].jobApplications.map((app,index) => {
      const isValid = candidate[0].jobDetails.find(currentJob=>currentJob._id.toString() === app.jobId.toString()); 
      let jobIdObj = isValid  ? {...isValid,applicationDate : app.applicationDate} : {
        jobId : app.jobId,
        jobTitle : app.jobApplied,
        status : "deleted",
        applicationDate : app.applicationDate
      }
      return ({
        ...app,
        jobId : jobIdObj
      })
    });

    // Sort the validated jobApplications by 'applicationDate' in descending order
    const sortedJobApplications = formattedApplications.sort((a, b) => {
      return new Date(b.applicationDate) - new Date(a.applicationDate);
    });

    res.status(200).json({ jobApplications: sortedJobApplications });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Request Password Reset / Send OTP
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const candidate = await Candidate.findOne({ email });
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }

  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP with expiry (15 minutes)
  otpStore.set(email, {
    otp,
    expiry: Date.now() + 15 * 60 * 1000
  });

  // Email content
  const emailContent = getPasswordResetContent(candidate.firstName + " " + candidate.lastName,otp)

  // Send email
  await sendEmail(
    email,
    'Password Reset Request - HireHive',
    emailContent
  );

  res.json({ message: 'OTP sent successfully' });
});

// Verify OTP
export const verifyOTPForgot = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const storedOTPData = otpStore.get(email);
  
  if (!storedOTPData) {
    res.status(400);
    throw new Error('OTP expired or invalid');
  }

  if (Date.now() > storedOTPData.expiry) {
    otpStore.delete(email);
    res.status(400);
    throw new Error('OTP expired');
  }

  if (storedOTPData.otp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP');
  }

  res.json({ message: 'OTP verified successfully' });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  // Verify OTP again
  const storedOTPData = otpStore.get(email);
  if (!storedOTPData || storedOTPData.otp !== otp || Date.now() > storedOTPData.expiry) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  // Find and update user
  const candidate = await Candidate.findOne({ email });
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }

  //hash the new password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Update password
  candidate.password = hashedPassword;
  await candidate.save();

  // Clear OTP
  otpStore.delete(email);

  // Send confirmation email
  const emailContent = getResetSuccessfulContent(candidate.firstName + " " + candidate.lastName)

  await sendEmail(
    email,
    'Password Reset Successful - HireHive',
    emailContent
  );

  res.json({ message: 'Password reset successful' });
});