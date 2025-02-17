import React, { useEffect, useState } from 'react'
import DetailsFooter from './DetailsFooter'
import { CustomDropdown, InputField } from '../Form/FormFields';
import { Button } from '../ui/Button';
import StyledCard from '../ui/StyledCard';
import DeleteIcon from '../../svg/KebabList/DeleteIcon';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import GlobalDropDown from '../utility/GlobalDropDown';
import { DataGrid } from '@mui/x-data-grid';
import MuiCustomStylesForDataGrid from '../tableUtilities/MuiCustomStylesForDataGrid';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoaderModal from '../ui/LoaderModal';
import axios from '../../api/axios';
import { showErrorToast, showSuccessToast } from '../ui/Toast';

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

const addTeamMembers = async ({teamMembers, email , currentRole}) => {
    const response = await axios.post('/auth/register/add-team-member',{email, teamMembers , currentRole});
    return response.data
}

const skipAddMembers = async () => {
    const response = await axios.post('/auth/register/skip-add-member');
    return response.data
}

const validRoles = ["Admin","Hiring Manager","Design Reviewer"];

function AddMembers({currentStep,setCurrentStep}) {
    const [members,setMembers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [adminRole,setAdminRole] = useState("") 
    const { onboardData , setOnboardData } = useOnboardingContext();
    const navigate = useNavigate();

    const [hasSubmissionError,setHasSubmissionError] = useState(false);

    useEffect(()=>{
        if(onboardData?.role){
            setAdminRole(onboardData?.role)
        }
    },[onboardData])


    const addMembersMutation = useMutation({
        mutationFn : addTeamMembers,
        onSuccess : (data) => {
            if(data?.message){
                showSuccessToast("Success",data?.message)
            }
            if(data?.currentStage === "DONE"){
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
        if(members?.length <= 0 ){
            setHasSubmissionError("No members selected")
            return
        }
        if(!validRoles.includes(adminRole)){
            setHasSubmissionError("No admin added")
            return
        }
        //Email exist error handling
        if(!onboardData?.email){
            showErrorToast("Error", "Unexpected error. Please Try again");
            setTimeout(()=>window.location.reload(),1000);
            return 
        }
        addMembersMutation.mutate({teamMembers : members, email : onboardData?.email , currentRole : adminRole})
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

        if(adminRole === "Admin"){
            adminCount += 1
        }

        if(adminCount > 1){
            setHasSubmissionError("Only 1 admin is allowed")
        }else if(adminCount === 1){
            setHasSubmissionError(false)
        }else{
            setHasSubmissionError("At least 1 admin is required")
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

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            align:'center',
            headerAlign : 'center',
            disableColumnMenu: true,
            renderCell : (params) =>(
              <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.firstName + " " + params?.row?.lastName}</p>
            )
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            align:'center',
            headerAlign : 'center',
            disableColumnMenu: true,
            renderCell : (params) =>(
              <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params?.row?.email}</p>
            )
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            align:'center',
            headerAlign : 'center',
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
            renderCell : (params) =>(
                <div onClick={()=>removeMember(params?.row?.id)} className='cursor-pointer bg-black-100 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-60'>
                    <DeleteIcon />
                </div>
            )
        }
    ]

  return (
    <>
        {(skipAddMembersMutation?.isPending || addMembersMutation?.isPending) && <LoaderModal />}
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
                <MuiCustomStylesForDataGrid/>
                <DataGrid
                rows={members}
                columns={columns}
                getRowId={(row) => `${row.id}`} // Create a unique ID for each row
                slotProps={{
                    pagination : {
                    SelectProps: {
                        sx: {
                        fontFamily: 'Outfit, sans-serif !important'
                        },
                        MenuProps: {
                        sx :{
                            "& .MuiMenuItem-root": {
                            fontFamily: "Outfit, sans-serif !important"
                            }
                        },
                        PaperProps: {
                            sx: {
                            backgroundColor: '#0C0D0D', // Set background to yellow for the pagination select dropdown
                            color : "white",
                            fontFamily : 'Outfit, sans-serif !important',
                            },
                        },
                        
                        },
                    },
                    }
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
                }
                localeText={{ noRowsLabel: <p style={{fontFamily:"Outfit"}}>No Candidates</p> }}
                sx={{
                    '& .MuiDataGrid-root': {
                    borderRadius: '12px !important',
                    fontFamily: 'Outfit, sans-serif !important',
                    backgroundColor: 'black !important', // Ensure each header cell is transparent
                    },
                    '& .MuiDataGrid-topContainer': {
                    borderRadius : "12px !important"
                    },
                    '& .css-yrdy0g-MuiDataGrid-columnHeaderRow' :{
                    borderRadius: '12px !important',
                    },
                    '& .MuiTablePagination-root .MuiSelect-select.MuiTablePagination-select': {
                    fontFamily: 'Outfit, sans-serif !important'
                    },
                    '& .MuiTablePagination-menuItem': {
                    fontFamily: 'Outfit, sans-serif !important ', // Font family for menu items
                    },
                    '& .MuiDataGrid-cell': {
                    color: 'white',
                    borderBottom: 'none',
                    borderTop: 'none',
                    fontFamily: 'Outfit, sans-serif !important',
                    display: 'flex',
                    alignItems: 'center' // Center content vertically
                    },
                    '& .MuiDataGrid-columnHeaders': {
                    borderTop: 'none',
                    borderBottom: 'none',
                    color: 'gray',
                    fontFamily: 'Outfit, sans-serif !important',
                    backgroundColor: 'black !important', // Force transparent background
                    },
                    '& .MuiDataGrid-columnHeader': {
                    backgroundColor: 'black !important', // Ensure each header cell is transparent
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                    color: 'gray', // Ensure the header text is gray
                    },
                    '& .MuiDataGrid-row': {
                    borderBottom: 'none',
                    borderTop: 'none',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                    display: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif !important',
                    },
                    '& .MuiTablePagination-root': {
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif !important',
                    },
                    '& .MuiTablePagination-toolbar': {
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif !important',
                    },
                    '& .MuiDataGrid-filler': {
                    backgroundColor: 'black',
                    },
                    '& .css-8yphpr':{
                    height : "0px !important"
                    },
                    '& .MuiTablePagination-selectIcon': {
                    color: 'white',
                    fontFamily: 'Outfit, sans-serif !important',
                    },
                    '& .MuiTablePagination-selectLabel ' :{
                    fontFamily :"Outfit",
                    },
                    '& .MuiTablePagination-select ' :{
                    fontFamily :"Outfit",
                    },
                    '& .MuiTablePagination-displayedRows' :{
                    fontFamily :"Outfit",
                    },
                    '& .MuiSvgIcon-root': {
                    color:"white"
                    },
                    '& .MuiDataGrid-selectedRowCount ' : {
                    opacity : 0
                    },
                    '& .Mui-selected .MuiSvgIcon-root': {
                    color: 'rgb(24, 233, 208)',
                    },
                    '& .first-row': {
                    borderRadius:2,
                    backgroundColor: 'rgba(18, 19, 20, 1)',
                    '&:hover': {
                        backgroundColor: '#232425',
                    },
                    },
                    '& .second-row': {
                    borderRadius:2,
                    backgroundColor: 'rgba(12, 13, 13, 1)',
                    '&:hover': {
                        backgroundColor: '#232425',
                    },
                    },
                    borderRadius: "12px",
                    backgroundColor: 'black',
                    '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: 'transparent ' , // Ensure the background behind rows is also transparent
                    borderRadius: '12px !important',
                    },
                    '& .MuiDataGrid-scrollbarFiller' :{
                    minWidth: "0px !important"
                    },
                    '& .MuiDataGrid-scrollbar' :{
                        display: "none",
                        background : "transparent"
                    },
                    '& .MuiDataGrid-overlayWrapper':{
                    height:"3rem",
                    },
                    '& .MuiDataGrid-overlay':{
                    color: 'white',
                    backgroundColor : 'rgba(12, 13, 13, 1)'
                    },
                }}
                hideFooterPagination
                hideFooterSelectedRowCount 
                />
                        {/* // <StyledCard padding={2} extraStyles={' overflow-hidden'}>
                        //     <div key={member?.id} className='flex justify-between items-center '>
                        //         <p className='font-medium font-bricolage'>{member?.firstName + " " + member?.lastName}</p>
                        //         <p className='typography-body text-font-gray'>{member?.email}</p>
                        //         <p className='typography-body text-font-gray'>{roleOptions?.find(role=>role.value === member?.role).label}</p>
                        //         {/* <div className='w-[25%]'>
                        //         <CustomDropdown
                        //         value={member?.role}
                        //         onChange={setRole}
                        //         options={roleOptions}
                        //         />
                        //         </div>
                        //         <div onClick={()=>removeMember(member.id)} className='cursor-pointer bg-black-100 h-11 w-11 flex justify-center items-center rounded-xl hover:bg-background-60'>
                        //             <DeleteIcon />
                        //         </div>
                        //     </div>
                        // </StyledCard> */}

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
            
        <DetailsFooter skipFunction={handleSkip} submissionError={hasSubmissionError} isNextDisabled={hasSubmissionError || (members?.length === 0)} hasNextButton={true} hasSkipButton={true} currentStep={currentStep} setCurrentStep={setCurrentStep} nextFunction={handleSubmit} />
    </>
  )
}

export default AddMembers
