import React, { useMemo, useState } from 'react'
import Header from '../../components/utility/Header'
import StyledCard from '../../components/Cards/StyledCard'
import CustomToolTip from '../../components/Tooltip/CustomToolTip'
import PencilIcon, { PencilEditIcon } from '../../svg/Buttons/PencilIcon'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from '../../api/axios'
import { useQuery } from '@tanstack/react-query'
import ToggleSwitch from '../../components/ui/ToggleSwitch'

function PersonalDetails({memberData}){
    return (
        <StyledCard backgroundColor={"bg-background-30"}>
          <h2 className="typography-h2 mb-6">Personal Details</h2>
          <div className="flex justify-between flex-col gap-6 sm:flex-row">
            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] ">
              <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray whitespace-nowrap">Email</p>
              </div>
              <div className="flex flex-col gap-6 typography-body">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.email}</p>
              </div>
            </div>
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex flex-col gap-6 typography-body">
                  <p className="text-font-gray whitespace-nowrap">Phone Number</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p>{memberData?.phone}</p>
                </div>
            </div>
          </div> 
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
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{memberData?.experience}</p>
                </div>
            </div>
            </div>
        </StyledCard>
    )
}

function TeamsProfile() {

    const [isEditing,setIsEditing] = useState(false);

    const {id : memberId } = useParams();


    const { data : teamMembers , isLoading : isTeamMembersLoading } = useQuery({
        queryKey: ['team_members'],
        queryFn: () => axios.get('/admin/get-all-members').then(res => res.data),
    })

    const member = useMemo(()=>{
        return teamMembers?.members?.find(eachMember => eachMember?._id === memberId || eachMember?.member_id === memberId);
    },[memberId,teamMembers])

  return (
    <div className="container mx-4 pt-4 h-screen">
        <Header
        HeaderText="Teams Profile"
        withBack="true"
        page="page1"
        />
        <div className='w-full flex gap-4'>
            <div className="lg:w-[70%] flex flex-col gap-4">
                <PersonalDetails memberData={member} />  
                <ProfessionalDetails memberData={member} />  
            </div>
            <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%] ">
                <StyledCard backgroundColor={"bg-background-30"} extraStyles=" flex flex-col items-center relative">
                    {!member?.member_id && <button type="button" onClick={()=>setIsEditing(true)} className="absolute top-6 right-6 border rounded-xl p-2 border-font-gray hover:bg-background-70">
                    <CustomToolTip title={"Edit Profile"} arrowed>
                        <PencilIcon/>
                    </CustomToolTip>
                    </button>}
                    <div className="relative w-[8rem] min-h-[5rem] ">
                    <div  className="absolute w-[8rem] left-0  -top-14 aspect-square overflow-hidden rounded-full">
                        <img src={member?.profilePictureUrl ? member?.profilePictureUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                    </div>
                    </div>
                    <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">{member?.name}</h1>
                    <p className="typography-small-p text-center text-font-gray">{member?.role}</p>
                    {/* Actions */}
                    <div className='flex justify-between w-full mt-4 items-center'>
                        <p className='typography-body'>Status</p>
                        <p className='flex items-center gap-1 typography-large-p text-font-gray'>{member?.isAvailable ? "Active" : "InActive"}<ToggleSwitch checkValue={member?.isAvailable} /></p>
                    </div>
                </StyledCard>
            </div>
        </div>
    </div>
  )
}

export default TeamsProfile
