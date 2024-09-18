// auth.controller.js

import { candidates as Candidate } from '../../models/candidate/candidate.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Secret key for JWT (store this in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Configure nodemailer transporter (you'll need to use your own SMTP settings)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'vevaaratvav@gmail.com',
    pass: 'uhpz qdwt kpqk splh',
  },
});

// Helper function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'vevaaratvav@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Controller function to register a candidate
export const registerCandidate = async (req, res) => {
  try {
    const {
      jobId,
      jobApplied,
      firstName,
      lastName,
      email,
      phone,
      // Other fields as needed
    } = req.body;

    // Check if email or phone number already exists
    const existingCandidate = await Candidate.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingCandidate) {
      return res.status(400).json({ message: 'Email or phone number already exists' });
    }

    // Generate OTP and hash it
    const otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Create new candidate
    const newCandidate = new Candidate({
      jobId,
      jobApplied,
      firstName,
      lastName,
      email,
      phone,
      otp: hashedOtp,
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      // Other fields
    });

    await newCandidate.save();

    // Send OTP to candidate's email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: 'Candidate registered. OTP sent to email.' });
  } catch (error) {
    console.error('Error registering candidate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to create password
export const createPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate password (you can add more validation as needed)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
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
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Password created successfully' });
  } catch (error) {
    console.error('Error creating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find candidate
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Check if OTP is expired
    if (candidate.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Compare hashed OTP
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    if (hashedOtp !== candidate.otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark candidate as verified
    candidate.isVerified = true;
    candidate.otp = undefined;
    candidate.otpExpires = undefined;
    await candidate.save();

    // Generate JWT token
    const token = jwt.sign({ id: candidate._id }, JWT_SECRET, { expiresIn: '7d' });

    // Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use 'true' in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const loginCandidate = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find candidate by email
      const candidate = await Candidate.findOne({ email });
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      // Check if candidate is verified
      if (!candidate.isVerified) {
        return res.status(401).json({ message: 'Please verify your account first' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, candidate.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: candidate._id }, JWT_SECRET, { expiresIn: '7d' });
  
      // Send token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
      console.error('Error logging in candidate:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  export const logoutCandidate = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

  // auth.controller.js

export const applyToJob = async (req, res) => {
  try {
    const candidateId = req.candidate._id;
    const {
      jobId,
      jobApplied,
      questionResponses,
      // Add other fields as necessary
    } = req.body;

    // Check if the candidate has already applied to this job
    const candidate = await Candidate.findById(candidateId);

    const hasApplied = candidate.jobApplications.some(
      (application) => application.jobId.toString() === jobId
    );

    if (hasApplied) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }

    // Add the new job application
    const newJobApplication = {
      jobId,
      jobApplied,
      questionResponses,
      // Add other fields as necessary
    };

    candidate.jobApplications.push(newJobApplication);
    await candidate.save();

    res.status(200).json({ message: 'Successfully applied to the job.' });
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  export const getCandidateDashboard = async (req, res) => {
    try {
      const candidateId = req.candidate._id;
  
      // Fetch candidate data, including applied jobs
      const candidate = await Candidate.findById(candidateId).populate('jobId');
  
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      res.status(200).json({ candidate });
    } catch (error) {
      console.error('Error fetching candidate dashboard:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // auth.controller.js

export const getCandidateAppliedJobs = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.candidate._id).populate({
      path: 'jobApplications.jobId',
      model: 'jobs',
    });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ jobApplications: candidate.jobApplications });
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
  
