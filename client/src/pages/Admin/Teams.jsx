import React, { useEffect, useState } from "react";
import StyledCard from "../../components/Cards/StyledCard";
import { Button } from "../../components/Buttons/Button";
import Modal from "../../components/Modals/Modal";
import { InputField } from "../../components/Inputs/InputField";
import GlobalDropDown from "../../components/Dropdowns/GlobalDropDown";
import { emailPattern } from "../../components/Register/RegisterForm";
import { roleOptions } from "../../components/Register/AddMembers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../components/ui/Toast";
import LoaderModal from "../../components/Loaders/LoaderModal";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Cards/Container";
import { useDispatch } from "react-redux";
import { setMembersCount } from "../../redux/AdminSlice";
import Header from "../../components/utility/Header";
import { useUnknownProfilePicture } from "../../context/ThemeContext";
import IconWrapper from "../../components/Cards/IconWrapper";
import { Edit2, Trash2 } from "lucide-react";
import { addMember, approveRequest, editMember, getAllTeamMembers, rejectRequest, removeTeamMember } from "../../services/admin.service";

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
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [pendingRemoveMember, setPendingRemoveMember] = useState(null);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture()

    const { data : teamMembers , isLoading : isTeamMembersLoading } = useQuery({
        queryKey: ['team_members'],
        queryFn: getAllTeamMembers,
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

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setRoleError("");
    }

    const editMemberMutation = useMutation({
        mutationFn: editMember,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['team_members'] });
            showSuccessToast("Success", data?.message || 'Team member updated successfully.');
            setShowEditmodal(false);
            resetForm();
        },
        onError: (error) => {
            showErrorToast("Error", error?.response?.data?.message || 'Error in editing team member.');
        }
    })

    const removeMemberMutation = useMutation({
        mutationFn: removeTeamMember,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['team_members'] });
            showSuccessToast("Success", data?.message || 'Team member removed successfully.');
            setShowRemoveModal(false);
            setPendingRemoveMember(null);
        },
        onError: (error) => {
            showErrorToast("Error", error?.response?.data?.message || 'Error removing team member.');
        }
    })

    const openEditModal = (e, member) => {
        e.stopPropagation();
        setShowAddmodal(false);
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setRoleError("");
        setFirstName(member?.firstName || "");
        setLastName(member?.lastName || "");
        setEmail(member?.email || "");
        setRole(member?.role || "");
        setShowEditmodal(member?.member_id || member?._id);
    }

    const handleRemoveMember = (e, member) => {
        e.stopPropagation();
        setPendingRemoveMember(member);
        setShowRemoveModal(true);
    }

    const handleConfirmRemoveMember = () => {
        if (!pendingRemoveMember?.email) return;
        removeMemberMutation.mutate({ email: pendingRemoveMember.email });
    }

    const validateMemberForm = () => {
        if (firstName?.trim() === "" && lastName?.trim() === "" && role?.trim() === "" && email?.trim() === "") {
            setFirstNameError("Please enter the firstname");
            setLastNameError("Please enter the lastName");
            setRoleError("Please select a role");
            setEmailError("Please enter the email");
            return false;
        }
        if (firstName?.trim() === "") {
            setFirstNameError("Please enter the firstname");
            return false;
        }
        setFirstNameError("");

        if (lastName?.trim() === "") {
            setLastNameError("Please enter the lastName");
            return false;
        }
        setLastNameError("");

        if (role?.trim() === "") {
            setRoleError("Please select a role");
            return false;
        }
        setRoleError("");

        if (email?.trim() === "") {
            setEmailError("Please enter the email");
            return false;
        }
        setEmailError("");

        if (!emailPattern.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        return true;
    }

    const confirmEditMember = (memberId) => {
        if (!validateMemberForm()) return;
        const teamMember = { firstName, lastName, email, role };
        editMemberMutation.mutate({ teamMember, memberId });
    }

    const renderMemberActions = (member) => (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
            <div
                onClick={(e) => openEditModal(e, member)}
                className="cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80"
                aria-label="Edit member"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openEditModal(e, member)}
            >
                <IconWrapper inheritColor icon={Edit2} size={0} customIconSize={3} />
            </div>
            {member?.status !== "REQUESTED" && (
                <div
                    onClick={(e) => handleRemoveMember(e, member)}
                    className="cursor-pointer bg-background-70 h-9 min-w-9 flex justify-center items-center rounded-xl hover:bg-background-80"
                    aria-label="Remove member"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRemoveMember(e, member)}
                >
                    <IconWrapper inheritColor icon={Trash2} size={0} customIconSize={3} className="text-red-100" />
                </div>
            )}
        </div>
    );

    const addMembers = () => {
            if (!validateMemberForm()) return;
            const teamMember = { firstName, lastName, email, role };
            addMemberMutation.mutate({ teamMember });
            setShowAddmodal(false);
            resetForm();
        }

  return (

    <Container>
        <div className="flex flex-row justify-between">
            
            <Header HeaderText={'Teams'}></Header>
            {(addMemberMutation?.isPending || editMemberMutation?.isPending || removeMemberMutation?.isPending || rejectRequestMutation?.isPending || approveRequestMutation?.isPending || isTeamMembersLoading) && <LoaderModal />}
        </div>
        <StyledCard padding={2} extraStyles={'flex flex-col items-center justify-between gap-4 mb-4'}>

        <div className="grid gap-4 grid-cols-5 ">
            {/* Add Card */}
            <StyledCard padding={2} backgroundColor={'bg-background-100'} extraStyles={'flex flex-col items-center justify-between gap-4 '}>
                {/* Member Profile Picture */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <img src={ UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                    <span className="absolute top-[60px] right-7 font-bold text-profile-plus scale-[3.4]">+</span>
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
                    <StyledCard key={member?.member_id ? member?.member_id : member?._id} backgroundColor={'bg-background-100'} onClick={()=>navigate(`/admin/teams/profile/${member?.member_id ? member?.member_id : member?._id}`)} padding={2} extraStyles={'relative flex flex-col items-center cursor-pointer justify-between gap-4 '}>
                        {renderMemberActions(member)}
                        {/* Member Profile Picture */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            <img src={member?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                        </div>
                        {/* Memeber Details */}
                        <div className="flex flex-col w-full">
                            <h3 className="text-center">{member?.firstName + " " + member?.lastName}</h3>
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
        {teamMembers?.members?.filter(member => member?.status === "REQUESTED")?.length > 0 && 
        <div className="w-full">
            <h2 className="mt-6 mb-4">New Member Request</h2>
            <StyledCard padding={0}  extraStyles="grid gap-4 grid-cols-5 ">
            {teamMembers?.members?.filter(member => member?.status === "REQUESTED").map(member => {
                return (
                    <StyledCard key={member?.member_id ? member?.member_id : member?._id} backgroundColor={'bg-background-80'} onClick={()=>navigate(`/admin/teams/profile/${member?.member_id ? member?.member_id : member?._id}`)} padding={2} extraStyles={'relative flex flex-col items-center cursor-pointer justify-between gap-4 '}>
                        {renderMemberActions(member)}
                        {/* Member Profile Picture */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            <img src={member?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL } alt="" className='object-cover w-full overflow-hidden' />
                        </div>
                        {/* Memeber Details */}
                        <div className="flex flex-col w-full">
                            <h3 className="text-center">{member?.firstName + " " + member?.lastName}</h3>
                            <p className="typography-small-p text-center text-font-gray">{member?.role}</p>
                        </div>
                        <div className="w-full flex justify-center">
                            {
                                member?.status === "REQUESTED" ? 
                                <div className="flex justify-between w-full gap-2">
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
            </StyledCard>
        </div>}
        </StyledCard>
        <Modal
        open={showAddModal || !!showEditModal}
        onClose={() => {
            setShowAddmodal(false);
            setShowEditmodal(false);
            resetForm();
        }}
        onConfirm={showAddModal ? addMembers : () => confirmEditMember(showEditModal)}
        customConfirmLabel={showAddModal ? "Add" : "Edit"}
        customTitle={showAddModal ? "Add Team Member" : "Edit Team Member"}
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

        <Modal
            open={showRemoveModal}
            onClose={() => {
                setShowRemoveModal(false);
                setPendingRemoveMember(null);
            }}
            onConfirm={handleConfirmRemoveMember}
            customTitle={`Remove ${pendingRemoveMember?.firstName ?? ''} ${pendingRemoveMember?.lastName ?? ''}?`}
            customMessage="This member will lose access to your Geode workspace."
            customConfirmLabel="Remove"
            cancelLabel="Cancel"
            isReadyToClose={false}
        />
    </Container>
  );
}

export default Teams;
