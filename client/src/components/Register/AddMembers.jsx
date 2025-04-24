import React, { useEffect, useState } from 'react'
import DetailsFooter from './DetailsFooter'
import { Button } from '../Buttons/Button';
import StyledCard from '../Cards/StyledCard';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import GlobalDropDown from '../Dropdowns/GlobalDropDown';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoaderModal from '../Loaders/LoaderModal';
import axios from '../../api/axios';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import useAuth from '../../hooks/useAuth';
import { emailPattern } from './RegisterForm';
import Modal from '../Modals/Modal';
import { InputField } from '../Inputs/InputField';
import MuiCustomStylesForDataGrid from '../tableUtilities/MuiCustomStylesForDataGrid';
import IconWrapper from '../Cards/IconWrapper';
import { Pencil, Trash } from 'lucide-react';

export const roleOptions = [
    {
        label : "HR",
        value : "Hiring Manager"
    },
    {
        label : "Design Reviewer",
        value : "Design Reviewer"
    },
]

const addTeamMembers = async ({teamMembers, email }) => {
    const response = await axios.post('/auth/register/add-team-member',{email, teamMembers });
    return response.data
}

const skipAddMembers = async () => {
    const response = await axios.post('/auth/register/skip-add-member');
    return response.data
}


function AddMembers({currentStep,setCurrentStep}) {
    const [members,setMembers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [roleError, setRoleError] = useState("");

    const [showAddModal,setShowAddmodal] = useState(false);
    const [showEditModal,setShowEditmodal] = useState(false);
    const [showInvitesModal,setShowInvitesModal] = useState(false);

    const { onboardData , setOnboardData } = useOnboardingContext();
    const navigate = useNavigate();
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();

    const [hasSubmissionError,setHasSubmissionError] = useState(false);

    useEffect(()=>{
        if(onboardData){
            const [firstName,lastName] = onboardData?.name?.split(" ");
            setMembers(prev=>[...prev,{
                ...onboardData,
                firstName : firstName,
                lastName : lastName ?? "",
                noAction : true
            }])
        }
    },[onboardData])


    const addMembersMutation = useMutation({
        mutationFn : addTeamMembers,
        onSuccess : (data) => {
            if(data?.message){
                showSuccessToast("Success",data?.message)
            }
            if(data?.currentStage === "DONE"){
                refetchAuth()
                navigate("/admin/dashboard")
            }
            if(data?.userData){
                setOnboardData(data?.userData)
            }
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
        }
    })

    const skipAddMembersMutation = useMutation({
        mutationFn : skipAddMembers,
        onSuccess : (data) => {
            if(data?.message){
                showSuccessToast("Success",data?.message)
            }
            if(data?.currentStage === "DONE"){
                refetchAuth()
                navigate("/admin/dashboard")
            }
            if(data?.userData){
                setOnboardData(data?.userData)
            }
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
        }
    })

    const handleSubmit = ()=>{
        if(members?.length <= 1 ){
            setHasSubmissionError("No members selected")
            return
        }
        // if(!validRoles.includes(adminRole)){
        //     setHasSubmissionError("No admin added")
        //     return
        // }
        //Email exist error handling
        if(!onboardData?.email){
            showErrorToast("Error", "Unexpected error. Please Try again");
            setTimeout(()=>window.location.reload(),1000);
            return 
        }
        addMembersMutation.mutate({teamMembers : members.filter(member=>member?.role !== "Admin"), email : onboardData?.email })
    }

    const handleSkip = ()=>{
        skipAddMembersMutation.mutate()
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

        if(adminCount > 1){
            setHasSubmissionError("Only 1 admin is allowed")
        }else if(adminCount === 1){
            setHasSubmissionError(false)
        }else{
            setHasSubmissionError("At least 1 admin is required")
        }
    },[members])

    const addMembers = () => {   
        if(firstName?.trim() === "" && lastName?.trim() === "" && role?.trim() === "" && email?.trim() === "" ){
            setFirstNameError("Please enter the firstname");
            setLastNameError("Please enter the lastName");
            setRoleError("Please select a role");
            setEmailError("Please enter the email");
            return
        }
        if(firstName?.trim() === ""){
            setFirstNameError("Please enter the firstname");
            return
        } 
        
        if(lastName?.trim() === ""){
            setLastNameError("Please enter the lastName");
            return
        } 
        
        if(role?.trim() === ""){
            setRoleError("Please select a role");
            return
        } 
        
        if(email?.trim() === ""){
            setEmailError("Please enter the email");
            return
        } 
        if(!emailPattern.test(email)){
            setEmailError('Invalid email format')
            return
        }
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
    const editMember = (id) => {
        const currentMember = members.filter(member => member.id === id);
        setFirstName(currentMember[0]?.firstName)
        setLastName(currentMember[0]?.lastName)
        setEmail(currentMember[0]?.email)
        setRole(currentMember[0]?.role)
        setShowEditmodal(id);
    }

    const confirmEditMember = (id) => {
        setMembers(prev =>  prev.map(member => {
                if(member.id === id){
                    console.log(member)
                    return {
                        id,
                        firstName,
                        lastName,
                        email,
                        role
                    }
                }else{

                    return member
                }
            })
        )
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            align:'left',
            headerAlign : 'left',
            disableColumnMenu: true,
            renderCell : (params) =>(
              <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.firstName + " " + params?.row?.lastName ?? ""}</p>
            )
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            align:'left',
            headerAlign : 'left',
            disableColumnMenu: true,
            renderCell : (params) =>(
              <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.email}</p>
            )
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            align:'left',
            headerAlign : 'left',
            disableColumnMenu: true,
            renderCell : (params) =>(
              <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.role}</p>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            align:'center',
            headerAlign : 'center',
            disableColumnMenu: true,
            renderCell : (params) =>{
                if(!params?.row?.noAction)
                return (
                    <div className='flex items-center h-full justify-center gap-2'>
                        <div onClick={()=>editMember(params?.row?.id)} className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'>
                            <IconWrapper icon={Pencil} size={0} />
                        </div>
                        <div onClick={()=>removeMember(params?.row?.id)} className='cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80'>
                            <IconWrapper icon={Trash} size={0} />
                        </div>
                    </div>
            )}
        }
    ]

    const handleShowModal = ()=>{
        setShowAddmodal(true)
        setFirstName("")
        setLastName("")
        setEmail("")
        setRole("")
        setFirstNameError("")
        setLastNameError("")
        setEmailError("")
        setRoleError("")
    }

  return (
    <>
        {(skipAddMembersMutation?.isPending || addMembersMutation?.isPending) && <LoaderModal />}
        <div className='w-full px-8  pt-6 pb-12 flex flex-col justify-center items-center'>
            <h1 className='typography-h1'>Add Your Team Members</h1>
            <p className='typography-large-p text-font-gray font-light mt-2'>Add key team members and assign their roles for the hiring process.</p>
        </div>

        
        <div className='max-h-[38vh] overflow-y-scroll scrollbar-hide'>
            {/* Members List */}
            {members?.length > 0 && 
            <div className='mx-8 mb-8 flex flex-col gap-4'>
                <MuiCustomStylesForDataGrid/>
                <div className='flex justify-between items-center'>
                <label className='font-bricolage font-semibold typography-body'>Team Members</label>
                <Button
                variant="secondary"
                type="button"
                onClick={handleShowModal}
                >
                   Add new member
                </Button>
                </div>
                <DataGrid
                rows={members}
                columns={columns}
                getRowId={(row) => `${row.id}`} // Create a unique ID for each row

                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
                }
                localeText={{ noRowsLabel: <p style={{fontFamily:"Gilroy"}}>No Candidates</p> }}

                hideFooterPagination
                hideFooterSelectedRowCount 
                />
            </div>
            }
            
        </div>
        <Modal
        open={showAddModal || showEditModal}
        onClose={showAddModal ? ()=>setShowAddmodal(false) : ()=>setShowEditmodal(false)}
        onConfirm={showAddModal ? addMembers : ()=>confirmEditMember(showEditModal)}
        customConfirmLabel={showAddModal ?"Add" :"Edit"}
        customTitle={showAddModal ?"Add Team Member" : "Edit Team Member"}
        customMessage={showAddModal ? "Add Team members of your company and invite them to join." : "Edit Team member of your company and invite them to join."}
        >
            {/* Add Memeber Form */}
            <div className='mt-4 flex flex-col gap-4'>
                <StyledCard padding={0} backgroundColor={"bg-transparent"} extraStyles={'flex flex-col gap-4 mb-4'}>
                        <InputField
                        type="text"
                        label="First Name"
                        labelStyles="font-bricolage font-medium"
                        extraClass="mt-1"
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        required
                        error={firstNameError}
                        errorMessage={firstNameError}
                        />
                        <InputField
                        type="text"
                        label="Last Name"
                        labelStyles="font-bricolage font-medium"
                        extraClass="mt-1"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        error={lastNameError}
                        errorMessage={lastNameError}
                        />
                        <InputField
                        type="email"
                        label="Email"
                        labelStyles="font-bricolage font-medium"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        extraClass="mt-1"
                        required
                        error={emailError}
                        errorMessage={emailError}
                        />
                        <GlobalDropDown 
                        label="Role" 
                        required
                        extraStylesForLabel="font-bricolage font-medium"
                        value={role}
                        error={roleError}
                        errorMessage={roleError}
                        onChange={setRole}
                        options={roleOptions}
                        />
                </StyledCard>
            </div>
        </Modal>
        <Modal
        open={showInvitesModal}
        onClose={()=>setShowInvitesModal(false)}
        onConfirm={handleSubmit}
        customTitle={"Send Team Invitations"}
        customMessage={"All your team members will receive an invite to join your organization."}
        customConfirmLabel={"Send"}
        />
        <DetailsFooter 
        skipType={"ADD TEAM MEMBERS"} 
        skipTitle={"Skip Adding Team Members?"} 
        skipMessage={"Adding your team members now allows for better collaboration, streamlined reviews, and faster hiring decisions."} 
        skipFunction={handleSkip} 
        submissionError={hasSubmissionError} 
        isNextDisabled={hasSubmissionError || (members?.length === 0)} 
        hasNextButton={true} 
        hasSkipButton={true}  
        nextFunction={()=>setShowInvitesModal(true)} 
        />
    </>
  )
}

export default AddMembers
