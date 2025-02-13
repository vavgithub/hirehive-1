import React, { useState } from 'react'
import DetailsFooter from './DetailsFooter';
import StyledCard from '../ui/StyledCard';
import { CustomDropdown } from '../Form/FormFields';
import { roleOptions } from './AddMembers';
import CircleCrossIcon from '../../svg/Staging/CircleCrossIcon';

function InviteMembers({currentStep,setCurrentStep}) {
    const [role, setRole] = useState("");
    let members = [
        {
        id : '12',
        firstName : "test",
        lastName : "123",
        email :"test@gmail.com",
        role : "Hiring Manager"
        },
        {
            id : '13',
            firstName : "test",
            lastName : "123",
            email :"test@gmail.com",
            role : "Hiring Manager"
        },
        {
            id : '14',
            firstName : "test",
            lastName : "123",
            email :"test@gmail.com",
            role : "Hiring Manager"
        }
    ]
    const handleSubmit = ()=>{
        setCurrentStep("ADD MEMBERS");
        //write code to persist data
    }

  return (
<>
        <div className='w-full px-8  pt-6 pb-12 flex flex-col justify-center items-center'>
            <h1 className='typography-h1'>Invite Your Team Members</h1>
            <p className='typography-large-p text-font-gray font-light mt-2'>Send invites to your team members to join and get started.</p>
        </div>
        
        <div className='max-h-[35vh] overflow-y-scroll scrollbar-hide'>
            {/* Members List */}
            {members?.length > 0 && 
            <div className='mx-8 mb-8 flex flex-col gap-4'>
                {
                    members.map(member => {
                        return (    
                        // <StyledCard padding={2} extraStyles={' overflow-hidden'}>
                            <div key={member?.id} className='flex justify-between items-center '>
                                <p className='font-medium font-bricolage'>{member?.firstName + " " + member?.lastName}</p>
                                <p className='typography-body text-font-gray'>{member?.email}</p>
                                <div className='w-[25%]'>
                                <CustomDropdown         
                                value={member?.role}
                                onChange={setRole}
                                options={roleOptions}       
                                />
                                </div>
                                <div onClick={()=>removeMember(member.id)} className='cursor-pointer bg-black-100 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-60'>
                                    <CircleCrossIcon />
                                </div>
                            </div>
                        // </StyledCard>
                    )})
                }
            </div>
            }
            
        </div>
            
        <DetailsFooter hasNextButton={true} currentStep={currentStep} setCurrentStep={setCurrentStep} nextFunction={handleSubmit} />
    </>
  )
}

export default InviteMembers
