import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from '../../models/admin/user.model.js';
import generateToken from '../../utils/generateToken.js';
import { getUploadPath, uploadToCloudinary } from '../../utils/cloudinary.js';
import path from 'path';
import { sendEmail } from '../../utils/sentEmail.js';
import { generateOTP, otpStore } from '../../utils/otp.js';
import { getInvitationContent, getPasswordResetContent, getResetSuccessfulContent, getSignupEmailContent } from '../../utils/emailTemplates.js';
import { Company } from '../../models/admin/company.model.js';
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../middlewares/authMiddleware.js';



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

      if(user?.verificationStage !== "DONE"){
        return res
        .status(401)
        .json({error:"You are currently not completed verfication. Please follow Registration."});
      }

      const token = generateToken(user._id);
      
        res.cookie('jwt', token, cookieOptions);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        return res.status(401).json({error:"Invalid email or password"});
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
          phone: user.phone,
          jobTitle: user.jobTitle,
          location: user.location,
          experience: user.experience,
          skills: user.skills,
          tools_used: user.tools_used,
          tasks_done: user.tasks_done,
          tasks_pending: user.tasks_pending,
          role: user.role,
          profilePicture: user.profilePicture
      });
  } else {
      res.status(404);
      throw new Error('User not found');
  }
});

export const getAvailableDesignReviewers = async (req, res) => {
    try {
      const company_id = req.user?.company_id;

      const allReviewers = await User.find({ 
        role: 'Design Reviewer',
        company_id : company_id,
        isAvailable : true
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

  if(!email?.trim() || !fullName?.trim()){
    return res.status(400).json({
      status: 'error',
      message: 'Incomplete registration data'
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email }).populate('company_id').select('-password');

  if (existingUser && (!existingUser?.verificationStage || existingUser?.verificationStage === "DONE")) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already registered'
    });
  }
  
  if (existingUser && existingUser?.verificationStage ) {

    // Generate JWT
    const token = generateToken(existingUser._id)

    res.cookie('jwt', token, cookieOptions);

    return res.status(200).json({
      message: 'Registration needs to be completed',
      userData : existingUser,
      currentStage : existingUser?.verificationStage
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
      currentStage : "REGISTER"
    });
  }

});

export const sendInviteOTP = asyncHandler(async (req,res) => {
    const { token } = req.body;
    if(!token){
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Registration token'
      });
    }

    const decoded = verifyToken(token,process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ 
        status: 'error',
        message: 'Invalid or expired token'
      });
    }

    const { email , name , role , company_id } = decoded;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      const company = await Company.findById({_id : company_id});
      if(company 
        && company?.invited_team_members?.find(member=>((member?.email === email) && (member?.invited === true))) 
        && existingUser.verificationStage === "PASSWORD"){
        await User.deleteOne({ email })
      }else{
        return res.status(401).json({ 
          status: 'error',
          message: 'Account already registered'
        });
      }
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with user details
    otpStore.set(email, {
      fullName : name,
      otp,
      role,
      company_id,
      timestamp: Date.now(),
      registrationStep: 'OTP_PENDING'
    });

    // Send OTP email using template
    await sendEmail(
      email,
      'Welcome to HireHive - Verify Your Email',
      getSignupEmailContent(name, otp)
    );

    req.session.isInvited = email;

    return res.status(200).json({
      status: 'success',
      email : email,
      message: 'OTP sent successfully',
      currentStage : "REGISTER"
    })
})

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
    name : userData?.fullName,
    email,
    role : userData?.role ?? "Admin",
    ...(userData?.company_id ? {company_id : userData?.company_id} : {}),
    verificationStage : "OTP"
  })

  if(req.session?.isInvited === email){
    const company = await Company.findOne({
      _id: saveUser?.company_id,
      "invited_team_members.email": email
    });
    
    if (!company) {
      console.error("No matching document found!");
    } else {
      // Find the specific team member and update the `member_id`
      company?.invited_team_members.forEach(member => {
        if (member.email === email) {
          member.member_id = saveUser._id;  // Update member_id
        }
      });

      // Save the updated document
      await company.save();
    }
    delete req.session.isInvited
  }

  otpStore.delete(email);

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
  
  const userData = await User.findOne({ email });

  if (!userData || userData.verificationStage !== 'OTP') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  // Update registration step
  userData.password = password;

  //Specific to HR and DR onboarding
  if(userData?.role === "Hiring Manager" || userData?.role === "Design Reviewer"){
    userData.verificationStage = 'DONE'
    // Generate JWT
    const token = generateToken(userData._id)

    res.cookie('jwt', token, cookieOptions);
  }else{
    //local to admin onboarding process
    userData.verificationStage = 'PASSWORD';
  }

  await userData.save();

  res.status(200).json({
    status: 'success',
    message: 'Password set successfully',
    currentStage : userData.verificationStage
  });
});

// Complete Hiring Manager registration
export const completeHiringManagerRegistration = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const companyDetails = JSON.parse(req.body?.companyDetails);

  if(!companyDetails || !companyDetails?.companyName?.trim() || !companyDetails.location?.trim() || !companyDetails.industry?.trim() || !companyDetails.companySize?.trim()){
    return res.status(400).json({
      status: 'error',
      message: 'Incomplete company data to continue registration'
    });
  }
  
  const userData = await User.findOne({ email }).select('-password');
  if (!userData || userData.verificationStage !== 'PASSWORD') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  const companies = await Company.find().lean();

  const existingCompany = companies.filter(company=>{
    return company.name?.replace(/\s+/g, '')?.toLowerCase() === companyDetails?.companyName?.replace(/\s+/g, '')?.toLowerCase()
  })

  if(existingCompany?.length > 0){
    return res.status(400).json({
      status: 'error',
      message: `This company is already registered. Contact admin at ${existingCompany[0]?.registeredBy?.email}`,
      companyExist : true
    });
  }

  let companyLogoUrl = "";
  if(req.file){
      // Pass just the filename instead of full path
      companyLogoUrl = await uploadToCloudinary(
        req.file.filename,
        'company-logo'
      );
  }

  // Create new user
  const company = await Company.create({
    name: companyDetails.companyName,
    logoUrl : companyLogoUrl,
    industryType: companyDetails.industry,
    location: companyDetails.location,
    size: companyDetails.companySize,
    registeredBy : {
      user_id : userData?._id,
      name : userData?.name,
      email : userData?.email
    }
  });

  //Update user data with company
  userData.company_id = company?._id;
  userData.verificationStage = "COMPANY DETAILS"

  await userData.save();

  // Generate JWT
  const token = generateToken(userData._id)

  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({
    status: 'success',
    message : "Company details added successfully",
    userData : {
      ...userData.toObject(),
      company_id : {
        name: companyDetails.companyName,
        logoUrl : companyLogoUrl, 
        industryType: companyDetails.industry,
        location: companyDetails.location,
        size: companyDetails.companySize,
      }
    },
    currentStage : "COMPANY DETAILS"
  });
});


//add Team members controller
export const addTeamMembers = asyncHandler(async (req,res) => {
  const { email , teamMembers} = req.body;

  // Validtion for registration data
  const userData = await User.findOne({ email }).select('-password');
  if (!userData || userData.verificationStage !== 'COMPANY DETAILS' || teamMembers?.length <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  let adminCount = 1;

  let isValid = 0;
  let validRoles = ['Admin','Hiring Manager','Design Reviewer'];

  for(let member of teamMembers){
    if(member?.firstName && member?.lastName && member?.email && member?.role && validRoles.includes(member.role)){
      const isExisting = await User.findOne({ email : member?.email });
      if(isExisting){
        return res.status(400).json({
          status: 'error',
          message: `${member?.email} is already registered. Please check`
        });
      }else{
        isValid += 1
      }
      if(member.role === "Admin"){
        adminCount += 1
      }
    }
  }
  
  if((isValid !== teamMembers?.length) || adminCount !== 1 ){
    return res.status(400).json({
      status: 'error',
      message: 'Invalid registration state'
    });
  }

  //Add members to Company database + send invites
  for(let member of teamMembers){
    const customMember = {
      id : member.id,
      name : member.firstName + " " + member.lastName,
      email : member.email,
      role : member.role,
      invited : false,
    }
    const updatedCompany = await Company.findByIdAndUpdate(
      { _id : userData?.company_id} , 
      { $push : {
          invited_team_members : customMember
        }
      },
      { new : true , runValidators : true}
    )

    //Sending invites to members
    // Generate invitation token
    const inviteToken = jwt.sign(
      { email : customMember.email , name : customMember.name, role: customMember.role , company_id : userData?.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const inviteUrl = `${process.env.FRONTEND_URL}/admin/register?token=${inviteToken}&email=${customMember.email}`;

    // Send invitation email using template
    await sendEmail(
      customMember.email,
      `Join HireHive as ${customMember.role}`,
      getInvitationContent(customMember.name,customMember.role,updatedCompany?.name,inviteUrl) // You might want to create a specific template for invitations
    );

    // Update the invited field directly in MongoDB
    await Company.findOneAndUpdate(
      { _id: userData?.company_id, "invited_team_members.email": customMember.email }, 
      { $set: { "invited_team_members.$.invited": true } },
      { new: true }
    );
  }

  userData.verificationStage = "DONE"
  await userData.save();

  const companyDetails = await Company.findById({_id : userData.company_id})

  // Generate verified Token JWT
  const token = generateToken(userData._id)

  res.cookie('jwt', token, cookieOptions);

  return res.status(200).json({
    status: 'success',
    message : "Added Team members successfully",
    userData : {
      ...userData.toObject(),
      company_id : {
        name: companyDetails.companyName,
        logoUrl : companyDetails.logoUrl, 
        industryType: companyDetails.industry,
        location: companyDetails.location,
        size: companyDetails.companySize,
      }
    },
    currentStage : "DONE"
  })
})

export const skipAddMember = asyncHandler(async (req,res)=> {
    const { _id } = req.user;
    const user = await User.findById({_id});
    
    //Current completed stage verification
    if(user.verificationStage !== "COMPANY DETAILS"){
      return res.status(400).json({
        status: 'error',
        message: 'Invalid stage to skip registration'
      });
    }

    user.verificationStage = "DONE"
    await user.save();

    // Generate verified Token JWT
    const token = generateToken(user._id)

    res.cookie('jwt', token, cookieOptions);

    return res.status(200).json({
      status: 'success',
      message : "Added Team members successfully",
      currentStage : "DONE"
    })
})

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
    { email, name, role: 'Design Reviewer' , company_id : existingUser?.company_id },
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

export const editUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      firstName,
      lastName,
      phone,
      jobTitle,
      experience,
      skills,
      tools_used
    } = req.body;

    // Combine first and last name
    const name = `${firstName} ${lastName}`.trim();

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        jobTitle,
        experience,
        skills,
        tools_used
      },
      { 
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message || 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});