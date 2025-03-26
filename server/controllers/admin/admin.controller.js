import { Company } from "../../models/admin/company.model.js";
import { jobs } from "../../models/admin/jobs.model.js";
import { User } from "../../models/admin/user.model.js";
import { candidates } from "../../models/candidate/candidate.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getLast12Months } from "../../utils/dateUtilities.js";
import { getInvitationContent } from "../../utils/emailTemplates.js";
import { updateDateWithTime } from "../../utils/formatter.js";
import { sendEmail } from "../../utils/sentEmail.js";
import jwt from "jsonwebtoken";

//add Team members controller
export const addTeamMember = asyncHandler(async (req,res) => {
    const { teamMember } = req.body;

    const userData = req.user;

    const isExisitngCompany = await Company.findById({_id : userData?.company_id})

    if(!isExisitngCompany){
        return res.status(400).json({
            status: 'error',
            message: `No company found with this user.`
          });
    }
  
    let validRoles = ['Hiring Manager','Design Reviewer'];
  
      if(teamMember?.firstName && teamMember?.lastName && teamMember?.email && teamMember?.role && validRoles.includes(teamMember.role)){
        const isExisting = await User.findOne({ email : teamMember?.email });
        if(isExisting){
          return res.status(400).json({
            status: 'error',
            message: `${teamMember?.email} is already registered. Please check`
          });
        }
      }else{
        return res.status(400).json({
            status: 'error',
            message: `Invalid member data`
          });
      }
  
    //Add members to Company database + send invites
      const customMember = {
        id : teamMember.id,
        name : teamMember.firstName + " " + teamMember.lastName,
        email : teamMember.email,
        role : teamMember.role,
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
  
    return res.status(200).json({
      status: 'success',
      message : "Added & invited team member successfully",
    })
  })

  export const reInviteMember = asyncHandler(async (req,res) => {
    const { memberId } = req.body;

    const userData = req.user;

    const isExisitngCompany = await Company.findById({_id : userData?.company_id})

    if(!isExisitngCompany){
        return res.status(400).json({
            status: 'error',
            message: `No company found with this user.`
          });
    }
  
    const isMemberExistWithCompany = await Company.findOne(
      { _id : userData?.company_id , "invited_team_members._id" : memberId} ,{
        "invited_team_members.$" : 1
      })

    if(!isMemberExistWithCompany){
        return res.status(400).json({
            status: 'error',
            message: `No member found with this Company.`
          });
    }

    //Sending invites to members
    // Generate invitation token
    const inviteToken = jwt.sign(
      { email : isMemberExistWithCompany?.invited_team_members[0]?.email , name : isMemberExistWithCompany?.invited_team_members[0]?.name, role: isMemberExistWithCompany?.invited_team_members[0]?.role , company_id : userData?.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const inviteUrl = `${process.env.FRONTEND_URL}/admin/register?token=${inviteToken}&email=${isMemberExistWithCompany?.invited_team_members[0]?.email}`;

    // Send invitation email using template
    await sendEmail(
      isMemberExistWithCompany?.invited_team_members[0]?.email,
      `Join HireHive as ${isMemberExistWithCompany?.invited_team_members[0]?.role}`,
      getInvitationContent(isMemberExistWithCompany?.invited_team_members[0]?.name,isMemberExistWithCompany?.invited_team_members[0]?.role,isExisitngCompany?.name,inviteUrl) // You might want to create a specific template for invitations
    );

    // Update the invited field directly in MongoDB
    await Company.findOneAndUpdate(
      { _id: userData?.company_id, "invited_team_members.email": isMemberExistWithCompany?.invited_team_members[0]?.email }, 
      { $set: { "invited_team_members.$.invited": true } },
      { new: true }
    );
  
    return res.status(200).json({
      status: 'success',
      message : "Invited team member successfully",
    })
  })

  export const changeMemberStatus = asyncHandler(async (req,res) => {
    const { memberId } = req.body;

    const userData = req.user;

    const isExisitngCompany = await Company.findById({_id : userData?.company_id})

    if(!isExisitngCompany){
        return res.status(400).json({
            status: 'error',
            message: `No company found with this user.`
          });
    }
  
    const isMemberExist = await User.findById(
      { _id : memberId })

    if(!isMemberExist){
        return res.status(400).json({
            status: 'error',
            message: `No member found with this Company.`
          });
    }

    isMemberExist.isAvailable = !isMemberExist?.isAvailable;

    await isMemberExist.save()
  
    return res.status(200).json({
      status: 'success',
      message : "Status changed successfully",
    })
  })

  export const editTeamMember = asyncHandler(async (req,res) => {
    const { teamMember, memberId } = req.body;

    const userData = req.user;

    const isExisitngCompany = await Company.findById({_id : userData?.company_id})

    if(!isExisitngCompany){
        return res.status(400).json({
            status: 'error',
            message: `No company found with this user.`
          });
    }
  
    let validRoles = ['Hiring Manager','Design Reviewer'];
  
      if(teamMember?.firstName && teamMember?.lastName && teamMember?.email && teamMember?.role && validRoles.includes(teamMember.role)){
        const isExisting = await User.findOne({ email : teamMember?.email });
        if(isExisting){
          return res.status(400).json({
            status: 'error',
            message: `${teamMember?.email} is already registered. Details cannot be edited.`
          });
        }
      }else{
        return res.status(400).json({
            status: 'error',
            message: `Invalid member data`
          });
      }
  
    //Add members to Company database + send invites
      const customMember = {
        name : teamMember.firstName + " " + teamMember.lastName,
        email : teamMember.email,
        role : teamMember.role,
      }
      const updatedCompany = await Company.findOneAndUpdate(
        { _id : userData?.company_id,
          "invited_team_members._id" : memberId
        } , 
        { $set : {
            "invited_team_members.$.name" : customMember?.name,
            "invited_team_members.$.email" : customMember?.email,
            "invited_team_members.$.role" : customMember?.role,
          }
        },
        { new : true , runValidators : true}
      )
  
  
    return res.status(200).json({
      status: 'success',
      message : "Profile editted successfully",
    })
  })

export const getAllTeamMember = asyncHandler(async (req,res) => {
    const company = await Company.findById({_id : req.user?.company_id});

    if(!company){
        return res.status(400).json({
            status: 'error',
            message: `No Company Details Found.`
          });
    }
    let membersData = []
    if(company?.invited_team_members?.length > 0){
        for(let member of company.invited_team_members){
            if(member?.member_id){
                const user = await User.findById({_id : member.member_id}).select('-password');
                membersData.push({...member.toObject(),...user.toObject()});
            }else{
                membersData.push(member)
            }
        }
    }
    
    return res.status(200).json({
        status: 'success',
        message : "Fetched Team members successfully",
        members : membersData
      })
})


export const getDetailsForDashboard = asyncHandler(async (req,res) => {

  //Company Details
  const company = await Company.findById({_id : req.user?.company_id});

  if(!company){
      return res.status(400).json({
          status: 'error',
          message: `No Company Details Found.`
        });
  }
  //Team members
  let membersData = []
  if(company?.invited_team_members?.length > 0){
      for(let member of company.invited_team_members){
          if(member?.member_id){
              const user = await User.findById({_id : member.member_id}).select('-password');
              membersData.push({...member.toObject(),...user.toObject()});
          }else{
              membersData.push(member)
          }
      }
  }

  //Monthly Applications
  const monthData = getLast12Months();

  const companyJobs = await jobs.find({company_id : req.user?.company_id });
  const companyJobIds = companyJobs?.map(job => job._id);

  // Function to get application count within a date range
  const getApplicationCount = async (startDate, endDate) => {
    const pipeline = [
      { $unwind: "$jobApplications" }, // Flatten jobApplications array
      { 
        $match: { 
          "jobApplications.jobId" : {$in : companyJobIds},
          "jobApplications.applicationDate": { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      { 
        $group: { 
          _id: null, // We just need total count
          totalApplications: { $sum: 1 } 
        } 
      }
    ];

    const result = await candidates.aggregate(pipeline);
    return result.length > 0 ? result[0].totalApplications : 0;
  };

  const getTotalApplicationCount = async () => {
    const pipeline = [
      { $unwind: "$jobApplications" }, // Flatten jobApplications array
      { 
        $match: { 
          "jobApplications.jobId" : {$in : companyJobIds},
        } 
      },
      { 
        $group: { 
          _id: null, // We just need total count
          totalApplications: { $sum: 1 } 
        } 
      }
    ];

    const result = await candidates.aggregate(pipeline);
    return result.length > 0 ? result[0].totalApplications : 0;
  };

  const totalApplicationsCount = await getTotalApplicationCount();
  const monthlyApplications = [];
  for(let monthObj of monthData){
    const count = await getApplicationCount(monthObj.startDate,monthObj.endDate);
    monthlyApplications.push({
      month : monthObj.monthName,
      totalCount : count
    })
  }


  //Scheduled Interviews
  const getInterviews = async () => {
    const pipeline = [
        { $unwind: "$jobApplications" }, // Flatten jobApplications array
        { 
            $match: { 
                "jobApplications.jobId": { $in: companyJobIds },
            } 
        },
        { 
            $project: { 
                firstName: 1, 
                lastName: 1, 
                email: 1,
                phone: 1,
                jobApplications: 1, 
                scheduledStages: {
                    $objectToArray: "$jobApplications.stageStatuses"
                } 
            } 
        },
        { $unwind: "$scheduledStages" }, // Convert stageStatuses map to array
        { 
          $match: { 
              "scheduledStages.v.status": "Call Scheduled" // Filter scheduled interviews
          } 
        },
        { 
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phone: 1,
                jobApplications: 1,
                scheduledDate: "$scheduledStages.v.currentCall.scheduledDate", // Extract scheduledDate
                scheduledTime: "$scheduledStages.v.currentCall.scheduledTime", // Extract scheduledTime
                assignedTo: "$scheduledStages.v.assignedTo" // Extract assignedTo (user ID)
            }
        },
        {
            $lookup: {
                from: "users", // Users collection
                localField: "assignedTo",
                foreignField: "_id",
                as: "assigneeDetails"
            }
        },
        {
            $unwind: {
                path: "$assigneeDetails",
                preserveNullAndEmptyArrays: true // Keep unmatched if assignedTo is null
            }
        },
        { 
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phone: 1,
                jobApplications: 1,
                scheduledDate: 1,
                scheduledTime: 1,
                assignee: {
                    _id: "$assigneeDetails._id",
                    name: "$assigneeDetails.name",
                    email: "$assigneeDetails.email",
                    profilePicture: "$assigneeDetails.profilePicture"
                } // Populate only required assignee fields
            }
        },
        { 
            $group: { 
                _id: null, 
                totalInterviews: { $sum: 1 },
                interviews: { $push: "$$ROOT" } // Store sorted candidates
            } 
        }
    ];

    const result = await candidates.aggregate(pipeline);
    return result.length > 0 ? result[0] : { totalInterviews: 0, interviews: [] };
};

  const {totalInterviews , interviews } = await getInterviews();

  //Top 3 Interviews
  const sortedInterviews = interviews
  .map(interview => ({
      ...interview,
      interviewDate: updateDateWithTime(interview.scheduledDate, interview.scheduledTime)
  }))
  .sort((a, b) => a.interviewDate - b.interviewDate)
  .filter((_,i) => i < 3);

  //Interviews based on Stages
  const validInterviewStages = ['Screening','Round 1','Round 2'];
  const stageBasedInterviewsCount = validInterviewStages.reduce((acc, stage) => {
      acc[stage] = 0;
      return acc;
  }, {});

  for(let interview of interviews){
    if(validInterviewStages.includes(interview.jobApplications?.currentStage)){
      const insertionIndex = validInterviewStages.findIndex((stage)=>stage === interview.jobApplications?.currentStage);
      stageBasedInterviewsCount[validInterviewStages[insertionIndex]] = stageBasedInterviewsCount[validInterviewStages[insertionIndex]] + 1;
    }
  }

  //Leaderboard 
  //Top Applicants with Higher Assessment Score
  const getTopCandidates = async () => {
    const pipeline = [
        { $unwind: "$jobApplications" }, // Flatten jobApplications array
        { 
            $match: { 
                "jobApplications.jobId": { $in: companyJobIds },
                hasGivenAssessment: true
            } 
        },
        {
          $project: {
            _id: 1, // Keep the unique identifier
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            profilePictureUrl: 1,
            hasGivenAssessment: 1,
            assessmentScore: { $arrayElemAt: ["$questionnaireAttempts.score", 0] }
          }
        },
        { 
            $sort: { assessmentScore: -1 } // Sort candidates by highest assessment score
        },
        {
            $group: {
                _id: "$_id", // Group by unique candidate ID
                firstName: { $first: "$firstName" },
                lastName: { $first: "$lastName" },
                email: { $first: "$email" },
                phone: { $first: "$phone" },
                profilePictureUrl: { $first: "$profilePictureUrl" },
                hasGivenAssessment: { $first: "$hasGivenAssessment" },
                assessmentScore: { $first: "$assessmentScore" }
            }
        },
        { 
            $sort: { assessmentScore: -1 } // Ensure sorting is maintained after grouping
        }
    ];

    const result = await candidates.aggregate(pipeline);
    return result.length > 0 ? result : [];
  };

  const topCandidates = await getTopCandidates();

  return res.status(200).json({
      status: 'success',
      message : "Fetched Details successfully",
      members : membersData,
      companyDetails : company,
      applications : {
        totalApplicationsCount,
        monthlyApplications : monthlyApplications.reverse(),
      },
      activeJobs : companyJobs?.length,
      interviews : {
        totalCount : totalInterviews,
        upcomingInterviews : sortedInterviews,
        stageBasedInterviewsCount
      },
      leaderBoard : {
        candidates : topCandidates
      }
    })
})