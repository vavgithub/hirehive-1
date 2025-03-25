import { Company } from "../../models/admin/company.model.js";
import { User } from "../../models/admin/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getInvitationContent } from "../../utils/emailTemplates.js";
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