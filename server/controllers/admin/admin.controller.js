import { Company } from "../../models/admin/company.model.js";
import { User } from "../../models/admin/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getInvitationContent } from "../../utils/emailTemplates.js";
import { sendEmail } from "../../utils/sentEmail.js";

//add Team members controller
export const addTeamMember = asyncHandler(async (req,res) => {
    const { teamMember} = req.body;

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
        const isExisting = await User.findOne({ email : member?.email });
        if(isExisting){
          return res.status(400).json({
            status: 'error',
            message: `${member?.email} is already registered. Please check`
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