import React, { useState } from "react";
import StyledCard from "../../components/Cards/StyledCard";
import { Button } from "../../components/Buttons/Button";
import PencilIcon from "../../svg/Buttons/PencilIcon";
import Modal from "../../components/Modals/Modal";
import { InputField } from "../../components/Inputs/InputField";
import GlobalDropDown from "../../components/Dropdowns/GlobalDropDown";
import { emailPattern } from "../../components/Register/RegisterForm";
import { roleOptions } from "../../components/Register/AddMembers";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

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

    const { data : teamMembers , isLoading : isTeamMembersLoading } = useQuery({
        queryKey: ['team_members'],
        queryFn: () => axios.get('/admin/get-all-members').then(res => res.data),
    })

    console.log(teamMembers)

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

        }

  return (
    <div className="container mx-4 pt-4 h-screen">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="typography-h1">Teams</h1>
        
      </div>
        <div className="grid grid-cols-5 gap-6">
            {/* Add Card */}
            <StyledCard padding={2} extraStyles={'flex flex-col items-center justify-between gap-4'}>
                {/* Member Profile Picture */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" alt="" className='object-cover w-full overflow-hidden' />
                    <span className="absolute top-7 right-12 font-bold text-[#BBBFC1] scale-[3.4]">+</span>
                </div>
                {/* Memeber Details */}
                <div className="flex flex-col ">
                    <p className="typography-body font-bricolage font-medium text-center ">Add Team Member</p>
                </div>
                <div className="w-full flex  items-center justify-center">
                    <Button type="button" onClick={()=>setShowAddmodal(true)} className="w-full">Add Member</Button>
                </div>
            </StyledCard>

            {teamMembers?.members?.map(member => {
                return (
                    <StyledCard padding={2} extraStyles={'flex flex-col items-center justify-between gap-4'}>
                        {/* Member Profile Picture */}
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                            {!member?.member_id && 
                            <span className="absolute top-2 right-2 p-2 bg-background-60 rounded-xl">
                                <PencilIcon />
                            </span>}
                            <img src={member?.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover w-full overflow-hidden' />
                        </div>
                        {/* Memeber Details */}
                        <div className="flex flex-col w-full">
                            <h3 className="typography-h3 text-center">{member?.name}</h3>
                            <p className="typography-small-p text-center text-font-gray">{member?.role}</p>
                        </div>
                        <div>
                            <p className="font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1">{ member?.member_id ? "Joined" : "Invited"}</p>
                        </div>
                    </StyledCard>
                )
            }) }
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
    </div>
  );
}

export default Teams;
