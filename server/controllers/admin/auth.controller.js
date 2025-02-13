import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from '../../models/admin/user.model.js';
import generateToken from '../../utils/generateToken.js';
import { getUploadPath, uploadToCloudinary } from '../../utils/cloudinary.js';
import path from 'path';
import { sendEmail } from '../../utils/sentEmail.js';
import { generateOTP, otpStore } from '../../utils/otp.js';
import { getPasswordResetContent, getResetSuccessfulContent, getSignupEmailContent } from '../../utils/emailTemplates.js';




const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict", 
  maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
};

export const uploadProfilePicture = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      const userId = req.user._id;
      
      // Pass just the filename instead of full path
      const profilePictureUrl = await uploadToCloudinary(
        req.file.filename,
        'profile-pictures'
      );
  
      // Update user profile with the new picture URL
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { profilePicture: profilePictureUrl },
        { new: true }
      );
  
      res.status(200).json({ 
        message: 'Profile picture updated successfully',
        profilePictureUrl,
        user: updatedUser 
      });
      
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ 
        message: 'Error uploading profile picture',
        error: error.message 
      });
    }
  };

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, cookieOptions);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// Authenticate User
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, cookieOptions);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401).json({error:"Invalid email or password"});
        throw new Error('Invalid email or password');
    }
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePicture:user.profilePicture,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export const getAvailableDesignReviewers = async (req, res) => {
    try {
      const allReviewers = await User.find({ 
        role: 'Design Reviewer'
      }).select('_id name email isAvailable profilePicture'); // Include _id and isAvailable
  
      res.status(200).json({ 
        success: true, 
        data: allReviewers 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching design reviewers', 
        error: error.message 
      });
    }
  };

// Request Password Reset / Send OTP
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP with expiry (15 minutes)
  otpStore.set(email, {
    otp,
    expiry: Date.now() + 15 * 60 * 1000
  });

  // Email content
  const emailContent = getPasswordResetContent(user.name,otp)

  // Send email
  await sendEmail(
    email,
    'Password Reset Request - HireHive',
    emailContent
  );

  res.json({ message: 'OTP sent successfully' });
});

// Verify OTP
export const verifyOTP = asyncHandler(async (req, res) => {
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
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update password
  user.password = password;
  await user.save();

  // Clear OTP
  otpStore.delete(email);

  // Send confirmation email
  const emailContent = getResetSuccessfulContent(user.name)

  await sendEmail(
    email,
    'Password Reset Successful - HireHive',
    emailContent
  );

  res.json({ message: 'Password reset successful' });
});

 
//here are the v2 controllers for onboarding hiring manager : 
// Initialize registration
export const initializeRegistration = asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email }).select('-password');

  if (existingUser && (!existingUser?.verficationStage || existingUser?.verficationStage === "DONE")) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already registered'
    });
  }
  
  if (existingUser && existingUser?.verficationStage ) {

    return res.status(400).json({
      message: 'Registration needs to be completed',
      userData : existingUser,
      currentStage : existingUser?.verficationStage
    });
  }
  
  if(!existingUser){ 
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with user details
    otpStore.set(email, {
      fullName,
      otp,
      timestamp: Date.now(),
      registrationStep: 'OTP_PENDING'
    });

    // Send OTP email using template
    await sendEmail(
      email,
      'Welcome to HireHive - Verify Your Email',
      getSignupEmailContent(fullName, otp)
    );

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
      currentStage : "INITIAL"
    });
  }

});

// Verify OTP
export const verifyOTPforAdmin = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  
  const userData = otpStore.get(email);
  if (!userData || userData.otp !== otp) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid OTP'
    });
  }

  // Check OTP expiration (10 minutes)
  const tenMinutes = 10 * 60 * 1000;
  if (Date.now() - userData.timestamp > tenMinutes) {
    otpStore.delete(email);
    return res.status(400).json({
      status: 'error',
      message: 'OTP has expired'
    });
  }

  // Update registration step
  // userData.registrationStep = 'PASSWORD_PENDING';
  // otpStore.set(email, userData);

  const saveUser = await User.create({
    name : userData?.fullname,
    email,
    role : "Hiring Manager",
    verficationStage : "OTP"
  })

  res.status(200).json({
    status: 'success',
    message: 'OTP verified successfully',
    userData : saveUser,
    currentStage : "OTP"
  });
});

// Set password
export const setPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const userData = otpStore.get(email);
  if (!userData || userData.registrationStep !== 'PASSWORD_PENDING') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  // Update registration step
  userData.password = password;
  userData.registrationStep = 'COMPANY_DETAILS_PENDING';
  otpStore.set(email, userData);

  res.status(200).json({
    status: 'success',
    message: 'Password set successfully'
  });
});

// Complete Hiring Manager registration
export const completeHiringManagerRegistration = asyncHandler(async (req, res) => {
  const { email, companyDetails } = req.body;
  
  const userData = otpStore.get(email);
  if (!userData || userData.registrationStep !== 'COMPANY_DETAILS_PENDING') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  // Create new user
  const user = await User.create({
    name: userData.fullName,
    email,
    password: userData.password,
    role: 'Hiring Manager',
    company: companyDetails.companyName,
    industry: companyDetails.industry,
    location: companyDetails.location,
    companySize: companyDetails.companySize
  });

  // Clear OTP store
  otpStore.delete(email);

  // Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      },
      token
    }
  });
});

// Invite team member (Design Reviewer)
export const inviteTeamMember = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already registered'
    });
  }

  // Generate invitation token
  const inviteToken = jwt.sign(
    { email, name, role: 'Design Reviewer' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const inviteUrl = `${process.env.FRONTEND_URL}/register?token=${inviteToken}`;

  // Send invitation email using template
  await sendEmail(
    email,
    'Join HireHive as Design Reviewer',
    getSignupEmailContent(name, generateOTP()) // You might want to create a specific template for invitations
  );

  res.status(200).json({
    status: 'success',
    message: 'Invitation sent successfully'
  });
});

// Complete Design Reviewer registration
export const completeDesignReviewerRegistration = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Create new user
    const user = await User.create({
      name: decoded.name,
      email: decoded.email,
      password,
      role: 'Design Reviewer'
    });

    // Generate JWT
    const authToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token: authToken
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid or expired invitation token'
    });
  }
});