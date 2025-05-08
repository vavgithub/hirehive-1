import React, { useEffect, useState } from "react";
import StyledCard from "../../components/Cards/StyledCard";
import { Button } from "../../components/Buttons/Button";
import Modal from "../../components/Modals/Modal";
import { InputField } from "../../components/Inputs/InputField";
import GlobalDropDown from "../../components/Dropdowns/GlobalDropDown";
import { emailPattern } from "../../components/Register/RegisterForm";
import { roleOptions } from "../../components/Register/AddMembers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";
import { showErrorToast, showSuccessToast } from "../../components/ui/Toast";
import LoaderModal from "../../components/Loaders/LoaderModal";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Cards/Container";
import { UNKNOWN_PROFILE_PICTURE_URL } from "../../utility/config";
import { useDispatch } from "react-redux";
import { setMembersCount } from "../../redux/AdminSlice";
import Header from "../../components/utility/Header";

const addMember = async ({teamMember}) => {
    const response = await axios.post('/admin/add-member',{teamMember});
    return response?.data
}

const approveRequest = async ({ email }) => {
    const response = await axios.post('/admin/register/approve-request', { email });
    return response?.data
}

const rejectRequest = async ({ email }) => {
    const response = await axios.post('/admin/register/reject-request', { email });
    return response?.data
}

function Teams() {
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

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data : teamMembers , isLoading : isTeamMembersLoading } = useQuery({
        queryKey: ['team_members'],
        queryFn: () => axios.get('/admin/get-all-members').then(res => res.data),
    })

    useEffect(()=>{
        if(teamMembers?.members?.length > 0){
            dispatch(setMembersCount(
                teamMembers.members.filter(member => member.status === "REQUESTED")?.length
            ))
        }else{
            dispatch(setMembersCount(0))
        }
    },[teamMembers])

    const addMemberMutation = useMutation({
        mutationFn : addMember,
        onSuccess : (data) => {
            queryClient.invalidateQueries('team_members');
            showSuccessToast("Success",data?.message || 'Team member added successfully.');
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || 'Error in adding team member.')
        }
    })

    const approveRequestMutation = useMutation({
        mutationFn : approveRequest,
        onSuccess : (data) => {
            queryClient.invalidateQueries('team_members');
            showSuccessToast("Success",data?.message || 'Request approved successfully.');
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || 'Error in approving request.')
        }
    })

    const handleApprove = (e,email) => {
        e.stopPropagation();
        approveRequestMutation.mutate({email})
    }

    const rejectRequestMutation = useMutation({
        mutationFn : rejectRequest,
        onSuccess : (data) => {
            queryClient.invalidateQueries('team_members');
            showSuccessToast("Success",data?.message || 'Request rejected successfully.');
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || 'Error in rejecting request.')
        }
    })

    const handleReject = (e,email) => {
        e.stopPropagation();
        rejectRequestMutation.mutate({email})
    }

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
            }else{
                setFirstNameError("")
            } 
            
            if(lastName?.trim() === ""){
                setLastNameError("Please enter the lastName");
                return
            }else{
                setLastNameError("")
            }
            
            if(role?.trim() === ""){
                setRoleError("Please select a role");
                return
            }else{
                setRoleError("")
            }
            
            if(email?.trim() === ""){
                setEmailError("Please enter the email");
                return
            }else{
                setEmailError("")
            }
            if(!emailPattern.test(email)){
                setEmailError('Invalid email format')
                return
            }
            const teamMember = {firstName,lastName,email,role}
            addMemberMutation.mutate({teamMember})
            setShowAddmodal(false)
            setFirstNameError("")
            setLastNameError("")
            setRoleError("")
            setEmailError("")
        }

  return (

    <Container>
        <div className="flex flex-row justify-between">
            
            <Header HeaderText={'Teams'}></Header>
            {(addMemberMutation?.isPending || rejectRequestMutation?.isPending || approveRequestMutation?.isPending || isTeamMembersLoading) && <LoaderModal />}
        </div>
        <StyledCard padding={2} extraStyles={'flex flex-col items-center justify-between gap-4 mb-4'}>

        <div className="grid gap-4 grid-cols-5 ">
            {/* Add Card */}
            <StyledCard padding={2} backgroundColor={'bg-background-70'} extraStyles={'flex flex-col items-center justify-between gap-4 '}>
                {/* Member Profile Picture */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <img src={ UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                    <span className="absolute top-7 right-12 font-bold text-[#3d3c3c] scale-[3.4]">+</span>
                </div>
                {/* Memeber Details */}
                <div className="flex flex-col ">
                    <p className="typography-body font-bricolage font-medium text-center ">Add Team Member</p>
                </div>
                <div className="w-full flex  items-center justify-center">
                    <Button type="button" onClick={()=>setShowAddmodal(true)} className="w-full whitespace-nowrap">Add Member</Button>
                </div>
            </StyledCard>

            {teamMembers?.members?.filter(member => member?.status !== "REQUESTED").map(member => {
                return (
                    <StyledCard key={member?.member_id ? member?.member_id : member?._id} backgroundColor={'bg-background-70'} onClick={()=>navigate(`/admin/teams/profile/${member?.member_id ? member?.member_id : member?._id}`)} padding={2} extraStyles={'flex flex-col items-center cursor-pointer justify-between gap-4 '}>
                        {/* Member Profile Picture */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            <img src={member?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                        </div>
                        {/* Memeber Details */}
                        <div className="flex flex-col w-full">
                            <h3 className="typography-h3 text-center">{member?.firstName + " " + member?.lastName}</h3>
                            <p className="typography-small-p text-center text-font-gray">{member?.role}</p>
                        </div>
                        <div className="w-full flex justify-center">
                            {
                                member?.status === "REQUESTED" ? 
                                <div className="flex justify-between w-full">
                                    <button type="button" onClick={(event) =>handleApprove(event,member?.email)}  className="text-sm font-bricolage font-medium px-4 py-1 border-2 rounded-xl border-green-700 text-green-500 hover:bg-green-90">Approve</button>
                                    <button type="button" onClick={(event) =>handleReject(event,member?.email)}  className="text-sm font-bricolage font-medium px-4 py-1 border-2 rounded-xl border-red-90 text-red-500 hover:bg-red-60">Reject</button>
                                </div>
                                :
                                <p className=" w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1">{ member?.status === "JOINED" ? "Joined" : "Invited"}</p>
                            }
                        </div>
                    </StyledCard>
                )
            }) }

        </div>
        </StyledCard>
        {teamMembers?.members?.filter(member => member?.status === "REQUESTED")?.length > 0 && 
        <div className="w-full">
            <h2 className="typography-h2 mt-6 mb-4">New Member Request</h2>
            <div  className="grid gap-4 grid-cols-5 ">
            {teamMembers?.members?.filter(member => member?.status === "REQUESTED").map(member => {
                return (
                    <StyledCard key={member?.member_id ? member?.member_id : member?._id} onClick={()=>navigate(`/admin/teams/profile/${member?.member_id ? member?.member_id : member?._id}`)} padding={2} extraStyles={'flex flex-col items-center cursor-pointer justify-between gap-4 '}>
                        {/* Member Profile Picture */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            <img src={member?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                        </div>
                        {/* Memeber Details */}
                        <div className="flex flex-col w-full">
                            <h3 className="typography-h3 text-center">{member?.firstName + " " + member?.lastName}</h3>
                            <p className="typography-small-p text-center text-font-gray">{member?.role}</p>
                        </div>
                        <div className="w-full flex justify-center">
                            {
                                member?.status === "REQUESTED" ? 
                                <div className="flex justify-between w-full">
                                    <button type="button" onClick={(event) =>handleApprove(event,member?.email)}  className="text-sm font-bricolage font-medium px-4 py-1 border-2 rounded-xl border-green-700 text-green-500 hover:bg-green-90">Approve</button>
                                    <button type="button" onClick={(event) =>handleReject(event,member?.email)}  className="text-sm font-bricolage font-medium px-4 py-1 border-2 rounded-xl border-red-90 text-red-500 hover:bg-red-60">Reject</button>
                                </div>
                                :
                                <p className=" w-fit font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1">{ member?.status === "JOINED" ? "Joined" : "Invited"}</p>
                            }
                        </div>
                    </StyledCard>
                )
            }) }
            </div>
        </div>}
        <Modal
        open={showAddModal || showEditModal}
        onClose={showAddModal ? ()=>setShowAddmodal(false) : ()=>setShowEditmodal(false)}
        onConfirm={showAddModal ? addMembers : ()=>confirmEditMember(showEditModal)}
        customConfirmLabel={showAddModal ?"Add" :"Edit"}
        customTitle={showAddModal ?"Add Team Member" : "Edit Team Member"}
        customMessage={showAddModal ? "Add Team members of your company and invite them to join." : "Edit Team member of your company and invite them to join."}
        isReadyToClose={false}
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
    </Container>
  );
}

export default Teams;
