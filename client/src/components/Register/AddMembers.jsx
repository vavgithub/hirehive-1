import React, { useEffect, useState } from 'react'
import DetailsFooter from './DetailsFooter'
import { CustomDropdown, InputField } from '../Form/FormFields';
import { Button } from '../ui/Button';
import StyledCard from '../ui/StyledCard';
import DeleteIcon from '../../svg/KebabList/DeleteIcon';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import GlobalDropDown from '../utility/GlobalDropDown';

export const roleOptions = [
    {
        label : "Admin",
        value : "Admin"
    },
    {
        label : "HR",
        value : "Hiring Manager"
    },
    {
        label : "Design Reviewer",
        value : "Design Reviewer"
    },
]

const addTeamMembers = async ({companyDetails, email}) => {
    const response = await axios.post('/auth/register/complete-hiring-manager',{email, companyDetails});
    return response.data
}

function AddMembers({currentStep,setCurrentStep}) {
    const [members,setMembers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [adminRole,setAdminRole] = useState("") 
    const { onboardData , setOnboardData } = useOnboardingContext();

    const [hasSubmissionError,setHasSubmissionError] = useState(false);

    useEffect(()=>{
        if(onboardData?.role){
            setAdminRole(onboardData?.role)
        }
    },[onboardData])

    const handleSubmit = ()=>{

    }

    //validation useEffect
    useEffect(()=>{
        let adminCount = 0;
        let emailSet = new Set();

        if(members?.length > 0){
            for(let member of members){
                if(member?.role === "Admin"){
                    adminCount += 1
                }
                emailSet.add(member.email)
            }
            if(emailSet.size !== members?.length){
                setHasSubmissionError("Duplicate emails are not allowed")
                return
            }
        }

        if(adminRole === "Admin"){
            adminCount += 1
        }

        if(adminCount > 1){
            setHasSubmissionError("Only 1 admin is allowed")
        }else if(adminCount === 1){
            setHasSubmissionError(false)
        }else{
            setHasSubmissionError("Only 1 admin is allowed")
        }
    },[adminRole,members])

    const addMembers = () => {    
        setMembers(prev => ([...prev, {
            id : firstName + Date.now(),
            firstName,
            lastName,
            email,
            role
        }]))
    }

    const removeMember = (id) => {
        setMembers(prev=> prev.filter(member => member.id !== id))
    }

  return (
    <>
        <div className='w-full px-8  pt-6 pb-12 flex flex-col justify-center items-center'>
            <h1 className='typography-h1'>Add Your Team Members</h1>
            <p className='typography-large-p text-font-gray font-light mt-2'>Add key team members and assign their roles for the hiring process.</p>
        </div>

        {onboardData && 
        <StyledCard padding={2} extraStyles={' mx-8 mb-4'}>
            <div  className='flex justify-between items-center '>
                <p className='font-medium font-bricolage'>{onboardData?.name}</p>
                <p className='typography-body text-font-gray'>{onboardData?.email}</p>
                <div className='w-[25%]'>
                <CustomDropdown
                value={adminRole}
                onChange={setAdminRole}
                options={roleOptions}
                />
                </div>
            </div>
        </StyledCard>}
        
        <div className='max-h-[38vh] overflow-y-scroll scrollbar-hide'>
            {/* Members List */}
            {members?.length > 0 && 
            <div className='mx-8 mb-8 flex flex-col gap-4'>
                {
                    members.map(member => {
                        return (
                        <StyledCard padding={2} extraStyles={' overflow-hidden'}>
                            <div key={member?.id} className='flex justify-between items-center '>
                                <p className='font-medium font-bricolage'>{member?.firstName + " " + member?.lastName}</p>
                                <p className='typography-body text-font-gray'>{member?.email}</p>
                                <p className='typography-body text-font-gray'>{roleOptions?.find(role=>role.value === member?.role).label}</p>
                                {/* <div className='w-[25%]'>
                                <CustomDropdown
                                value={member?.role}
                                onChange={setRole}
                                options={roleOptions}
                                />
                                </div> */}
                                <div onClick={()=>removeMember(member.id)} className='cursor-pointer bg-black-100 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-60'>
                                    <DeleteIcon />
                                </div>
                            </div>
                        </StyledCard>
                    )})
                }
            </div>
            }
            {/* Add Memeber Form */}
            <div className='px-8 pb-8 flex flex-col gap-4'>
                <StyledCard padding={2} extraStyles={'grid grid-cols-2 gap-x-6 gap-y-5'}>
                        <InputField
                        type="text"
                        label="First Name"
                        labelStyles="font-bricolage font-medium"
                        extraClass="mt-1"
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        required
                        error=""
                        />
                        <InputField
                        type="text"
                        label="Last Name"
                        labelStyles="font-bricolage font-medium"
                        extraClass="mt-1"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        required
                        error=""
                        />
                        <InputField
                        type="email"
                        label="Email"
                        labelStyles="font-bricolage font-medium"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        extraClass="mt-1"
                        required
                        error=""
                        />
                        {/* <CustomDropdown
                        label="Role" 
                        required
                        extraStylesForLabel="font-bricolage font-medium"
                        value={role}
                        onChange={setRole}
                        options={roleOptions}
                        /> */}
                        <GlobalDropDown 
                        label="Role" 
                        required
                        extraStylesForLabel="font-bricolage font-medium"
                        value={role}
                        error=""
                        onChange={setRole}
                        options={roleOptions}
                        />
                </StyledCard>
                <Button variant="secondary" className="self-end" onClick={addMembers}>Add</Button>
            </div>
        </div>
            
        <DetailsFooter submissionError={hasSubmissionError} isNextDisabled={hasSubmissionError} hasNextButton={true} hasSkipButton={true} currentStep={currentStep} setCurrentStep={setCurrentStep} nextFunction={handleSubmit} />
    </>
  )
}

export default AddMembers
