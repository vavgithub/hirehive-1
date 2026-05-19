import { asyncHandler } from '../../utils/asyncHandler.js';
import {User} from '../../models/admin/user.model.js';
import generateToken from '../../utils/generateToken.js';
import { getUploadPath, uploadGoogleImagesToCloudinary, uploadToCloudinary } from '../../utils/cloudinary.js';
import path from 'path';
import { sendEmail } from '../../utils/sentEmail.js';
import { generateOTP, otpStore } from '../../utils/otp.js';
import { getInvitationContent, getPasswordResetContent, getResetSuccessfulContent, getSignupEmailContent } from '../../utils/emailTemplates.js';
import { Company } from '../../models/admin/company.model.js';
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../middlewares/authMiddleware.js';
import { getCountryNameFromPhoneNumber } from '../../utils/countryUtils.js';
import { uploadGoogleImageToS3, uploadToS3 } from '../../utils/s3utility.js';
import { checkScopes, getAccessOauthClient, getAuthorizationUrl, getOAuthTokens, getPlaceDetails, getRoleBasedScopes, getUserInfo, revokeOauthClient, SCOPE_KEYS, SCOPES, USE_TYPES, WORKSPACE_KEYS } from '../../utils/integrations/google.js';
import { randomBytes } from 'crypto';
import { decrypt, encrypt } from '../../utils/crypto.js';
import { error } from 'console';
import { captureError } from "../../utils/errorHandler.js";



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
      // const profilePictureUrl = await uploadToCloudinary(
      //   req.file.filename,
      //   'profile-pictures'
      // );

      const profilePictureUrl = await uploadToS3(
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
    captureError(error, { controller: "auth.controller.js", action: "uploadProfilePicture" });

    console.error('Error uploading profile picture:', error);
      res.status(500).json({ 
        message: 'Error uploading profile picture',
        error: error.message 
      });
    }
  };

export const uploadCompanyLogo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const userId = req.user._id;
    const companyId = req.user.company_id;
    
    // Pass just the filename instead of full path
    // const companyLogoUrl = await uploadToCloudinary(
    //   req.file.filename,
    //   'company-logo'
    // );

    const companyLogoUrl = await uploadToS3(
      req.file.filename,
      'company-logo'
    );

    // Update user profile with the new picture URL
    const updatedUser = await Company.findByIdAndUpdate(
      companyId, 
      { logoUrl: companyLogoUrl },
      { new: true }
    );

    res.status(200).json({ 
      message: 'Company Logo updated successfully',
    });
    
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "uploadCompanyLogo" });

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
        let isRequestedUser = false;
        if(user?.company_id){
          const userRequested = await Company.findOne({_id : user.company_id });
          if(userRequested?.invited_team_members?.length > 0){
            for(let member of userRequested.invited_team_members){
              if(member?.email === user.email && member.status === "REQUESTED"){
                isRequestedUser = true;
                break
              }
            }
          }
        }
        return res
        .status(401)
        .json({error: isRequestedUser ? "You request is under processing. Please try again after sometime." :"You are currently not completed verfication. Please follow Registration."});
      }

      const token = generateToken(user._id);
      
        res.cookie('jwt', token, cookieOptions);

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
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
  const user = await User.findById(req.user._id).select('+integrations').populate('company_id');

  if (user) {
      res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
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
          profilePicture: user.profilePicture,
          companyDetails : user?.company_id,
          hasAuth : {
            view_calendar : user?.integrations?.google?.scopes?.includes(SCOPE_KEYS.VIEW_CALENDAR),
            edit_calendar : user?.integrations?.google?.scopes?.includes(SCOPE_KEYS.EDIT_CALENDAR),
            view_events : user?.integrations?.google?.scopes?.includes(SCOPE_KEYS.VIEW_EVENTS),
            edit_events : user?.integrations?.google?.scopes?.includes(SCOPE_KEYS.EDIT_EVENTS),
          }
      });
  } else {
      res.status(404);
      throw new Error('User not found');
  }
});

//Getting Design Reviewers + Admin of one company
export const getAvailableDesignReviewers = async (req, res) => {
  try {
    const company_id = req.user?.company_id;

    const users = await User.find({
      company_id,
      isAvailable: true,
      role: { $in: ['Design Reviewer', 'Admin'] }
    }).select('_id firstName lastName email isAvailable profilePicture role');

    const allReviewers = users.filter(user => user.role === 'Design Reviewer');
    const admin = users.find(user => user.role === 'Admin') || null;

    res.status(200).json({
      success: true,
      data: allReviewers,
      admin
    });
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "getAvailableDesignReviewers" });

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
  const { email, firstName , lastName} = req.body;

  if(!email?.trim() || !firstName?.trim() || !lastName?.trim() ){
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
      firstName,
      lastName,
      otp,
      timestamp: Date.now(),
      registrationStep: 'OTP_PENDING'
    });

    // Send OTP email using template
    await sendEmail(
      email,
      'Welcome to HireHive - Verify Your Email',
      getSignupEmailContent(firstName + " " + lastName, otp)
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

    const { email , firstName , lastName , role , company_id } = decoded;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      const company = await Company.findById({_id : company_id});
      if(company 
        && company?.invited_team_members?.find(member=>((member?.email === email) && (member?.status === "INVITED"))) 
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
      firstName , 
      lastName,
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
      getSignupEmailContent(firstName + " " + lastName, otp)
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
    firstName : userData?.firstName,
    lastName : userData?.lastName,
    email,
    role : userData?.role ?? "Admin",
    jobTitle : userData?.role ?? "Admin",
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
          member.status = "JOINED"
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


// Verify password
export const verifyPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const userData = await User.findOne({ email });

  if (!userData ) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Email ID'
    });
  }

  const isVerified = await userData.matchPassword(password);

  if(!isVerified){
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Password'
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Password confirmed successfully',
    currentStage : userData.verificationStage
  });
});

// Send Member Request to Join Team
export const sendMemberRequest = asyncHandler(async (req, res) => {
  const { email, companyId } = req.body;
  
  const userData = await User.findOne({ email });

  if (!userData ) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Email ID'
    });
  }

  const companyData = await Company.findOne({ _id : companyId });
  
    if (!companyData ) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Data. Please try again.'
      });
    }
  
    // Check if a member with the email already exists
    const emailExists = companyData.invited_team_members.some(
      member => member.email === userData.email
    );

    if(emailExists){
      return res.status(400).json({
        status: 'error',
        message: `Your Request is already processing at ${companyData?.name}. Please try to login after sometime.`
      });
    }

  const memberData = {
    id : userData?.firstName + Date.now(),
    firstName : userData.firstName,
    lastName : userData.lastName,
    email : userData.email,
    role : "Hiring Manager",
    status : "REQUESTED",
  }

  // Push the new member to the array
  companyData.invited_team_members.push(memberData);

  await companyData.save();

  //update company Id and role of user
  userData.role = "Hiring Manager";
  userData.company_id = companyData._id;

  await userData.save();

  res.status(200).json({
    status: 'success',
    message: 'Request sent successfully. Please Login to continue.',
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
      message: `This company is already registered. Contact admin at ${existingCompany[0]?.registeredBy?.email} or send a request to join`,
      companyExist : true,
      companyId : existingCompany[0]?._id
    });
  }

  let companyLogoUrl = "";
  if(req.file){
      // Pass just the filename instead of full path
      // companyLogoUrl = await uploadToCloudinary(
      //   req.file.filename,
      //   'company-logo'
      // );

      companyLogoUrl = await uploadToS3(
        req.file.filename,
        'company-logo'
      );
  }

  let geoLocation = null;
  if(companyDetails?.locationId && companyDetails?.sessionId ){
      const { locationId , sessionId } = companyDetails
      const result = await getPlaceDetails(locationId,sessionId);
      if(result.latlng?.longitude && result.latlng?.latitude){
        geoLocation = {
            type : 'Point',
            coordinates : [result.latlng.longitude , result.latlng.latitude]
        }
      }
  }

  // Create new user
  const company = await Company.create({
    name: companyDetails.companyName,
    logoUrl : companyLogoUrl,
    industryType: companyDetails.industry,
    location: companyDetails.location,
    size: companyDetails.companySize,
    ...(geoLocation ? {geoLocation} : {}),
    registeredBy : {
      user_id : userData?._id,
      name : userData?.firstName + " " + userData?.lastName,
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
      firstName : member.firstName,
      lastName : member.lastName,
      email : member.email,
      role : member.role,
      status : "ADDED",
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
      { email : customMember.email , firstName : customMember.firstName, lastName : customMember.lastName, role: customMember.role , company_id : userData?.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const inviteUrl = `${process.env.FRONTEND_URL}/admin/register?token=${inviteToken}&email=${customMember.email}`;

    // Send invitation email using template
    await sendEmail(
      customMember.email,
      `Join HireHive as ${customMember.role}`,
      getInvitationContent(customMember.firstName + " " + customMember.lastName,customMember.role,updatedCompany?.name,inviteUrl) // You might want to create a specific template for invitations
    );

    // Update the invited field directly in MongoDB
    await Company.findOneAndUpdate(
      { _id: userData?.company_id, "invited_team_members.email": customMember.email }, 
      { $set: { "invited_team_members.$.status": "INVITED" } },
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
      firstName: decoded.firstName,
      lastName: decoded.lastName,
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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token: authToken
      }
    });
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "completeDesignReviewerRegistration" });

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
    // const name = `${firstName} ${lastName}`.trim();

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        jobTitle,
        experience,
        ...(phone ? {location : getCountryNameFromPhoneNumber('+'+phone) ?? ''} : {}),
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
    captureError(error, { controller: "auth.controller.js", action: "editUserProfile" });

    res.status(400).json({
      status: 'error',
      message: error.message || 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});


export const editCompanyProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const companyId = req.user.company_id;
    const {
      name,
      location,
      locationId,
      sessionId,
      industryType,
      size,
      about,
      website,
      founded,
      focusAreas
    } = req.body;

      const allCompanies = await Company.find({
        _id: { $ne: companyId }
      });

      const normalizedName = name.replace(/\s+/g, '').toLowerCase();

      const isExistingCompany = allCompanies.filter(company =>
        company.name.replace(/\s+/g, '').toLowerCase() === normalizedName
      );
      if(isExistingCompany?.length > 0){
        return res.status(400).json({
          status: 'error',
          message: 'Company Name is already taken.'
        });
      }
    
    let geoLocation = null;
    if(locationId && sessionId ){
        const result = await getPlaceDetails(locationId,sessionId);
        if(result.latlng?.longitude && result.latlng?.latitude){
          geoLocation = {
              type : 'Point',
              coordinates : [result.latlng.longitude , result.latlng.latitude]
          }
        }
    }

    // Find and update the user
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        name,
        location,
        industryType,
        ...(geoLocation ? {geoLocation} : {}),
        size,
        about,
        website,
        founded,
        focusAreas
      },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data : updatedCompany
    });

  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "editCompanyProfile" });

    res.status(400).json({
      status: 'error',
      message: error.message || 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

//GOOGLE AUTH INTEGRATIONS
export const authorizeWithGoogle = asyncHandler(async (req,res) => {
  try {
    // Generate a secure random state value.
    const state = randomBytes(32).toString('hex');

    // Store state in the session
    req.session.state = state;
    req.session.useType = USE_TYPES['LOGIN/REGISTER']

    const { authorizationUrl } = await getAuthorizationUrl(state,SCOPES.AUTH)

    res.status(200).json({
      status : 'success',
      authorizationUrl,
      message : "Processing Authorization Successfully"
    })
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "authorizeWithGoogle" });

    console.log(error)
      res.status(400).json({
        status: 'error',
        message: error.message || 'Error updating profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
})

export const unAuthorizeWithGoogle = asyncHandler(async (req,res) => {
  try {    
    const userId = req.user.id

    if(!userId){
      return res.status(400).json({
        error : true,
        message : 'Invalid permission for processing request.'
      })
    }

    const user = await User.findById({_id : userId}).select('+integrations');
    if(!user){
      return res.status(400).json({
        error : true,
        message : 'Invalid request processing data.'
      })
    }
    user.integrations.google.scopes = user.integrations.google.scopes?.includes('AUTH') ?  ['AUTH'] : []
    const isRevoked = await revokeOauthClient(decrypt(user.integrations.google.token))
    user.integrations.google.token = null
    if(isRevoked){
      await user.save()
    }

    res.status(200).json({
      status : 'success',
      message : "Revoked Authorization Successfully"
    })
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "unAuthorizeWithGoogle" });

    console.log(error)
      res.status(400).json({
        status: 'error',
        message: error.message || 'Error revoking google creds',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
})

export const authorizeInvitedUsersWithGoogle = asyncHandler(async (req,res) => {
  try {
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

    const { email , firstName , lastName , role , company_id } = decoded;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      const company = await Company.findById({_id : company_id});
      if(company 
        && company?.invited_team_members?.find(member=>((member?.email === email) && (member?.status === "INVITED"))) 
        && existingUser.verificationStage === "PASSWORD"){
        //Managing requested user
        await User.deleteOne({ email })
      }else{
        return res.status(401).json({ 
          status: 'error',
          message: 'Account already registered'
        });
      }
    }
    // Generate a secure random state value.
    const state = randomBytes(32).toString('hex');

    // Store state in the session
    req.session.state = state;
    req.session.useType = USE_TYPES['LOGIN/REGISTER']
    if(token && email){
      req.session.invited = {email , company_id}
    }

    const { authorizationUrl } = await getAuthorizationUrl(state,SCOPES.AUTH)

    res.status(200).json({
      status : 'success',
      authorizationUrl,
      message : "Processing Authorization Successfully"
    })
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "authorizeInvitedUsersWithGoogle" });

    console.log(error)
      res.status(400).json({
        status: 'error',
        message: error.message || 'Error updating profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
})

export const authorizeGoogleWorkspace = asyncHandler(async (req,res) => {
  try {
    // Generate a secure random state value.
    const state = randomBytes(32).toString('hex');

    // Store state in the session
    req.session.state = state;
    req.session.useType = USE_TYPES.WORKSPACE
    req.session.userEmail = req.user?.email
    req.session.userRole = req.user?.role
    const { authorizationUrl } = await getAuthorizationUrl(state,getRoleBasedScopes(req.user.role))

    res.status(200).json({
      status : 'success',
      authorizationUrl,
      message : "Processing Authorization Successfully"
    })
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "authorizeGoogleWorkspace" });

    console.log(error)
      res.status(400).json({
        status: 'error',
        message: error.message || 'Error updating profile',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
})

export const redirectForGoogleToken = asyncHandler(async (req,res) => {
  try {
    const query = req.query;
    const authState = query?.state ?? null;
    const userRoleSession = req.session?.userRole;
    const routeKey = (userRoleSession === 'Hiring Manager' ? 'hiring-manager' : userRoleSession === 'Design Reviewer' ?  'design-reviewer' : 'admin' )
    if(authState && req.session?.state && authState === req.session.state){
      //Authorized requests
      const code = query?.code;
      const tokens = await getOAuthTokens(code);

      let encryptedToken = null;
      let scopes = null;
      let currentUserStage = null;
      if(tokens?.refresh_token){
        encryptedToken = encrypt(tokens?.refresh_token);
      }
      //Check authorized  scopes by user
      if(tokens?.scope){
        scopes = tokens.scope.split(' ')
      }

      if(scopes?.length > 0){
        const scopeKeys = checkScopes(scopes);
        //GOOGLE_AUTH_FUNCTIONALITIES
        if(req.session?.useType === USE_TYPES['LOGIN/REGISTER'] && scopeKeys.includes('AUTH') && tokens?.access_token){
          //LOGIN/REGISTER MANAGEMENT
          const oauth2Client = await getAccessOauthClient(tokens?.access_token)
          const userInfo = await getUserInfo(oauth2Client)
          if(userInfo && userInfo?.email && userInfo?.verified_email){
              const isExisting = await User.findOne({email : userInfo?.email}).select('+integrations')
              if(isExisting){
                if(isExisting?.auth_type === 'GOOGLE'){
                  // Generate JWT
                  if(isExisting?.integrations?.google?.scopes?.length > 0){
                    const unExisitngScopes = scopeKeys.filter(key => !isExisting.integrations.google.scopes.includes(key));
                    isExisting.integrations.google.scopes.push(...unExisitngScopes)
                  }
                  currentUserStage = isExisting.verificationStage
                  await isExisting.save()
                  const token = generateToken(isExisting._id)
                  res.cookie('jwt', token, cookieOptions);
                }else{
                  //EMAIL LOGGED IN USER
                  const encryptedError = encrypt('Invalid Credentials')
                  return res.redirect(`${process.env.FRONTEND_URL}/admin/register?error=${encryptedError}`)
                }
              }else{
                const [firstName, ...lastName] = userInfo?.name?.split(' ');
                let profilePictureUrl = ''
                if(userInfo?.picture){
                  profilePictureUrl = await uploadGoogleImageToS3(
                    userInfo.picture,
                    'profile-pictures'
                  );
                }

                //Revoking unmatched email which is invited
                if(req.session?.invited?.email && (req.session?.invited?.email !== userInfo.email)){
                  //EMAIL LOGGED IN USER
                  const encryptedError = encrypt('Unmatched email with the join invitation.')
                  return res.redirect(`${process.env.FRONTEND_URL}/admin/register?error=${encryptedError}`)
                }

                const createUser = await User.create({
                  firstName ,
                  lastName : lastName.join(' '),
                  email : userInfo.email,
                  verificationStage : 'PASSWORD',
                  role : "Admin",
                  auth_type : 'GOOGLE',
                  profilePicture : profilePictureUrl,
                  integrations : {
                    google : {
                      scopes : scopeKeys.filter(scope => scope === SCOPE_KEYS.AUTH)
                    }
                  }
                })

                //Invitees management
                if(req.session?.invited?.email === createUser.email){
                  const company = await Company.findOne({
                    _id: req.session?.invited?.company_id,
                    "invited_team_members.email": createUser.email
                  });
                  
                  if (!company) {
                    console.error("No matching document found!");
                  } else {
                    // Find the specific team member and update the `member_id`
                    company?.invited_team_members.forEach(member => {
                      if (member.email === createUser.email) {
                        member.member_id = createUser._id;  // Update member_id
                        member.status = "JOINED"
                        createUser.role = member.role
                      }
                    });

                    // Save the updated document
                    await company.save();
                    createUser.company_id = req.session?.invited?.company_id
                    createUser.verificationStage = 'DONE'
                    await createUser.save(); 
                  }
                  delete req.session.invited
                }

                currentUserStage = createUser.verificationStage
                //Id only token
                const token = generateToken(createUser._id)
                res.cookie('jwt', token, cookieOptions);
              }
          }else{
            const encryptedError = encrypt('Invalid Credentials')
            return res.redirect(`${process.env.FRONTEND_URL}/admin/register?error=${encryptedError}`)
          }
        }else if(req.session?.useType === USE_TYPES.WORKSPACE && scopeKeys.some(key => key !== "AUTH" && key in SCOPES) && tokens?.refresh_token){
          //WORKSPACE SCOPE MANAGEMENT
          if(req.session.userEmail){
            const isExisting = await User.findOne({ email : req.session.userEmail }).select('+integrations');
            //Checks if access given to all scopes based on user role.
            const hasAllExceptAuth = WORKSPACE_KEYS(isExisting.role)
            .every(key => scopeKeys.includes(key));
            if(!hasAllExceptAuth){
              //Returns to user
                return res.redirect(`${process.env.FRONTEND_URL}/${routeKey}/settings?error=ALLOW_ACCESS`)
            }

            if(!isExisting?.integrations?.google?.token){
              isExisting.integrations.google.token = encryptedToken
            }
            if(isExisting?.integrations?.google?.scopes?.length > 0){
              const unExisitngScopes = scopeKeys.filter(key => !isExisting.integrations.google.scopes.includes(key));
              isExisting.integrations.google.scopes.push(...unExisitngScopes)
            }else{
              isExisting.integrations.google.scopes.push(...scopeKeys)
            }
            await isExisting.save()
          }
          console.log('GOt the client for Calendar')
        }
      }
      
      
      req.session = null
      return res.redirect(userRoleSession ? `${process.env.FRONTEND_URL}/${routeKey}/settings` : `${process.env.FRONTEND_URL}/admin/register?currentStage=${currentUserStage}`)
    }else{
      //Requests from unauthorized server
      return res.redirect(`${process.env.FRONTEND_URL}/admin/register?error=Invalid_Creds`)
    }
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "redirectForGoogleToken" });

    console.log(error)
    //Handle invalid_grant error
    const userRoleSession = req.session?.userRole;
    req.session = null
    const routeKey = ( userRoleSession === 'Admin' ? 'admin' : userRoleSession === 'Hiring Manager' ? 'hiring-manager' : 'design-reviewer' )
    return res.redirect(userRoleSession ? `${process.env.FRONTEND_URL}/${routeKey}/settings` : `${process.env.FRONTEND_URL}/admin/register?error=Invalid_Creds`)
  }
})

export const checkAuthStatus = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById({_id : id})
    if(user?.verificationStage === 'DONE'){
      return res.status(200).json({
        message: 'Please login to continue',
      });
    }
    if(['REGISTER','OTP'].includes(user?.verificationStage)){
      throw new Error('Invalid registration. Please try again.')
    }
    if(user.auth_type === 'EMAIL'){
      throw new Error('Invalid Credentials.')
    }
    return res.status(200).json({
      message: 'Registration needs to be completed',
      userData : user,
      currentStage : user?.verificationStage
    });
  } catch (error) {
    captureError(error, { controller: "auth.controller.js", action: "checkAuthStatus" });

    console.log(error)
    res.status(400).json({
        status: 'error',
        message: error.message || 'Error checking user status',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
})