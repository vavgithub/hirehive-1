import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import CustomToolTip from '../../components/Tooltip/CustomToolTip'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from '../../api/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ToggleSwitch from '../../components/ui/ToggleSwitch'
import { Button } from '../../components/Buttons/Button'
import { Controller, useForm } from 'react-hook-form'
import { InputField } from '../../components/Inputs/InputField'
import GlobalDropDown from '../../components/Dropdowns/GlobalDropDown'
import { roleOptions } from '../../components/Register/AddMembers'
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast'
import { validationRules } from '../../utility/validationRules'
import LoaderModal from '../../components/Loaders/LoaderModal'
import Container from '../../components/Cards/Container'
import IconWrapper from '../../components/Cards/IconWrapper'
import { PencilLine } from 'lucide-react'
import { UNKNOWN_PROFILE_PICTURE_URL } from '../../utility/config'

const editMember = async ({teamMember,memberId}) => {
    const response = await axios.patch('/admin/edit-member',{teamMember,memberId});
    return response?.data
}

const reInviteMember = async ({memberId}) => {
  const response = await axios.post('/admin/re-invite-member',{ memberId });
  return response?.data
}

const changeMemberStatus = async ({memberId}) => {
  const response = await axios.post('/admin/change-member-status',{ memberId });
  return response?.data
}

function PersonalDetails({memberData,isEditing , control}){
    return (
      <StyledCard backgroundColor="bg-background-30">
      <h2 className="typography-h2 mb-6">Personal Details</h2>
      {!isEditing ? (
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">First Name</p>
              <p className="text-font-gray whitespace-nowrap">Email</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.name?.split(' ')[0]}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Last Name</p>
              <p className="text-font-gray whitespace-nowrap">Phone Number</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.name?.split(' ')[1]}</p>
              <p>{memberData?.phone ?? "NA"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Controller
            name="firstName"
            control={control}
            defaultValue={memberData?.name?.split(' ')[0]}
            rules={{ required: 'First name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="firstName"
                label="First Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue={memberData?.name?.split(' ')[1]}
            rules={{ required: 'Last name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="lastName"
                label="Last Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={memberData?.email}
            rules={validationRules.email}
            render={({ field }) => (
              <InputField
                type="email"
                id="email"
                label="Email"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                onChange={field.onChange}        
              />
            )}
          />
          <div className="flex gap-2 typography-body">
            <p className="whitespace-nowrap text-font-gray overflow-hidden text-ellipsis w-[40%]">Phone Number</p>
            <p className='w-full'>{memberData?.phone ?? "NA"}</p>
          </div>
        </div>
      )}
    </StyledCard>
    )
}

function ProfessionalDetails({memberData}){
    return (
        <StyledCard backgroundColor="bg-background-30">
            <h2 className="typography-h2 mb-6">Professional Details</h2>
            <div className="flex justify-between flex-col gap-6 sm:flex-row">

            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
                <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray whitespace-nowrap">Job Title</p>
                <p className="text-font-gray whitespace-nowrap">Experience</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.role}</p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.experience ?? 0} Yrs</p>
                </div>
            </div>
            </div>
        </StyledCard>
    )
}

function SkillsExpertiseSection({memberData}){
  return(
      <StyledCard backgroundColor="bg-background-30">
      <h2 className="typography-h2 mb-6">Skills & Expertise</h2>
        <div className="flex flex-col gap-6 typography-body">
          <div>
            <p className="text-font-gray mb-2">Primary Skills</p>
            <div className="flex gap-2 flex-wrap">
              {(memberData?.skills)?.map((tool, index) => (
                <span key={index} className="flex justify-center font-outfit w-fit bg-background-70 m px-6 py-2 rounded-full">{tool}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-font-gray mb-2">Tools Proficiency</p>
            <div className="flex gap-2 flex-wrap">
              {(memberData?.tools_used)?.map((tool, index) => (
                <span key={index} className="flex justify-center font-outfit w-fit bg-background-70 m px-6 py-2 rounded-full">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </StyledCard>
  )
}

function TeamsProfile() {

    const [isEditing,setIsEditing] = useState(false);
    const [active,setActive] = useState(false);

    const {id : memberId } = useParams();

    const queryClient = useQueryClient();

    const { data : teamMembers , isLoading : isTeamMembersLoading } = useQuery({
        queryKey: ['team_members'],
        queryFn: () => axios.get('/admin/get-all-members').then(res => res.data),
    })

    const member = useMemo(()=>{
        let foundMember = teamMembers?.members?.find(eachMember => eachMember?._id === memberId || eachMember?.member_id === memberId);
        setActive(foundMember?.isAvailable ?? false)
        return foundMember
    },[memberId,teamMembers]);

    
    const { control, handleSubmit, reset } = useForm({
      defaultValues: {
        firstName:  '',
        lastName:  '',
        email:  '',
        role :  ''
      },
    });

    useEffect(() => {
      if (member) {
        reset({
          firstName: member?.name?.split(' ')[0] || '',
          lastName: member?.name?.split(' ')[1] || '',
          email: member?.email || '',
          role: member?.role || ''
        });
      }
    }, [member, reset]);

    const editMemberMutation = useMutation({
      mutationFn : editMember,
      onSuccess : (data) => {
          queryClient.invalidateQueries('team_members');
          showSuccessToast("Success",data?.message || 'Profile editted successfully.');
      },
      onError : (error) => {
          showErrorToast("Error",error?.response?.data?.message || 'Error in editing team member.')
      }
    })

    const reInviteMemberMutation = useMutation({
      mutationFn : reInviteMember,
      onSuccess : (data) => {
          showSuccessToast("Success",data?.message || 'Profile editted successfully.');
      },
      onError : (error) => {
          showErrorToast("Error",error?.response?.data?.message || 'Error in editing team member.')
      }
    })

    const changeMemberStatusMutation = useMutation({
      mutationFn : changeMemberStatus,
      onSuccess : (data) => {
          showSuccessToast("Success",data?.message || 'Status changed successfully.');
      },
      onError : (error) => {
          showErrorToast("Error",error?.response?.data?.message || 'Error in changing status team member.')
      }
    })

    const handleEditMember = (data) => {
      const teamMember = {
        firstName : data?.firstName,
        lastName : data?.lastName,
        email : data?.email,
        role : data?.role
      }
      editMemberMutation.mutate({teamMember,memberId})
      setIsEditing(false)
    }

    const handleCancel = () => {
      setIsEditing(false)
      reset({
        firstName: member?.name?.split(' ')[0] || '',
        lastName: member?.name?.split(' ')[1] || '',
        email: member?.email || '',
        role: member?.role || ''
      });
    }

    const handleReInvite = () => {
      reInviteMemberMutation.mutate({memberId})
    }

    const handleToggle = (status) => {
      setActive(status)
      changeMemberStatusMutation.mutate({ memberId : member?.member_id })
    }

  return (
    // <div className="w-full p-4 min-h-screen">
    //     <div className='container'>
    <Container>
          <Header
          HeaderText="Teams Profile"
          withBack="true"
          page="page1"
          />
          {( reInviteMemberMutation?.isPending || editMemberMutation?.isPending || changeMemberStatusMutation?.isPending) && <LoaderModal/>}
          <form onSubmit={handleSubmit(handleEditMember)} className='w-full flex flex-col gap-4'>
            <div className='w-full flex gap-4'>
              <div className="lg:w-[70%] flex flex-col gap-4">
                  <PersonalDetails memberData={member} isEditing={isEditing} control={control} />  
                  <ProfessionalDetails memberData={member} />  
                  <SkillsExpertiseSection memberData={member} />
              </div>
              <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%] ">
                  <StyledCard backgroundColor={"bg-background-30"} extraStyles=" flex flex-col items-center relative">
                      {!member?.member_id && <button type="button" onClick={()=>setIsEditing(!isEditing)} className="absolute top-6 right-6 border rounded-xl p-2 border-font-gray hover:bg-background-70">
                      <CustomToolTip title={"Edit Profile"} arrowed>
                          <IconWrapper size={2} customIconSize={3}  icon={PencilLine} />
                      </CustomToolTip>
                      </button>}
                      <div className="relative w-[8rem] min-h-[5rem] ">
                      <div  className="absolute w-[8rem] left-0  -top-14 aspect-square overflow-hidden rounded-full">
                          <img src={member?.profilePicture ? member?.profilePicture : UNKNOWN_PROFILE_PICTURE_URL } alt="" className="object-cover w-full" />
                      </div>
                      </div>
                      <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">{member?.name}</h1>
                      <div className='w-full'>
                      {isEditing ? 
                      <Controller
                        name="role"
                        control={control}
                        defaultValue={member?.role}
                        render={({ field, fieldState: { error } }) => (
                        <div className='flex gap-2 items-center'>
                          <p className='typography-body text-font-gray w-[40%]'>Role</p>
                          <GlobalDropDown 
                          required
                          value={field?.value}
                          error={error}
                          errorMessage={error?.message}
                          onChange={field?.onChange}
                          options={roleOptions}
                          />
                        </div>
                        )}
                      />
                      : <p className="typography-small-p text-center text-font-gray">{member?.role}</p>}
                      </div>
                      {/* Actions */}
                      <div className='flex justify-between w-full mt-4 items-center'>
                          <p className='typography-body'>Status</p>
                          <p className='flex items-center gap-1 typography-large-p text-font-gray'>{active ? "Active" : "InActive"}
                            {member?.member_id && <ToggleSwitch disabled={!member?.member_id} checkValue={active} setCheckValue={handleToggle} />}
                          </p>
                      </div>
                      <div className='flex justify-between w-full mt-4 items-center'>
                          <p className='typography-body'>Joining Status</p>
                          <p className='flex items-center gap-1 typography-large-p text-font-gray'>{member?.member_id ? "Joined" :member?.invited ? "Invited" : "Added"}</p>
                      </div>
                      {!member?.member_id && <div className='flex justify-center w-full mt-4 items-center'>
                        <Button type="button" disabled={reInviteMemberMutation?.isPending} variant="primary" onClick={handleReInvite} >Re-invite</Button>
                      </div>}
                  </StyledCard>
              </div>
            </div>
              {
                isEditing && <div>
                  <div className="place-self-end flex gap-4 my-4">
                      <Button
                        onClick={handleCancel}
                        type="button"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                      >
                        {false ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                </div>
              }
          </form>
      </Container>
    //     </div>
    // </div>
  )
}

export default TeamsProfile
