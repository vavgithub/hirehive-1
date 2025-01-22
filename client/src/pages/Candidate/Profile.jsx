import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/utility/Header";
import useCandidateAuth from "../../hooks/useCandidateAuth";
import AssessmentBanner from "../../components/ui/AssessmentBanner";
import StyledCard from "../../components/ui/StyledCard";
import { ensureAbsoluteUrl } from "../../utility/ensureAbsoluteUrl";
import PencilIcon, { PencilEditIcon } from "../../svg/Buttons/PencilIcon";
import { InputField } from "../../components/Form/FormFields";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import UploadIcon from "../../svg/Buttons/UploadIcon";
import { validationRules } from "../../utility/validationRules";
import { uploadProfilePicture, uploadResume } from "./ApplyJob";
import axios from "../../api/axios";

const PersonalDetails = ({candidateData, isEditing , control}) => {
    return (
        <StyledCard backgroundColor={"bg-background-30"}>
          <h2 className="typography-h2 mb-6">Personal Details</h2>
          {!isEditing ? 
          <div className="flex justify-between flex-col gap-6 sm:flex-row">
            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] ">
              <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray whitespace-nowrap">First Name</p>
                <p className="text-font-gray whitespace-nowrap">Email</p>
              </div>
              <div className="flex flex-col gap-6 typography-body">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.firstName}</p>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.email}</p>
              </div>
            </div>
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex flex-col gap-6 typography-body">
                  <p className="text-font-gray whitespace-nowrap">Last Name</p>
                  <p className="text-font-gray whitespace-nowrap">Phone Number</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">{candidateData.lastName}</p>
                  <p>{candidateData.phone}</p>
                </div>
            </div>
          </div> 
          :
          <div className="flex flex-col gap-4">
            <Controller
              name="firstName"
              control={control}
              defaultValue={""}
              rules={validationRules.firstName}
              render={({ field ,fieldState : { error }}) => (
                <InputField
                  type="text"
                  id="firstName"
                  label="First Name"
                  labelStyles="text-font-gray"
                  rowWise
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue={""}
              rules={validationRules.lastName}
              render={({ field ,fieldState : { error }}) => (
                <InputField
                  type="text"
                  id="lastName"
                  label="Last Name"
                  labelStyles="text-font-gray"
                  rowWise
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              rules={validationRules.email}
              render={({ field ,fieldState : { error }}) => (
                <InputField
                  type="text"
                  id="email"
                  label="Email"
                  labelStyles="text-font-gray"
                  rowWise
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={error}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={""}
              rules={validationRules.phoneNumber}
              render={({ field ,fieldState : { error }}) => (
                <InputField
                  type="number"
                  id="phone"
                  label="Phone Number"
                  labelStyles="text-font-gray"
                  rowWise
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  error={error}
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          }
        </StyledCard>
    )
}

const ResumeAndPortfolioDetails = ({candidateData, isEditing, control ,resumeFile, setResumeFile}) => {
  const resumeRef = useRef();
  const [fileName,setFileName] = useState("");

  const handleResume = (e) => {
    setFileName(e.target.files[0]?.name)
    setResumeFile(e.target.files[0])
  }

  return (
      <StyledCard backgroundColor={"bg-background-30"}>
        <h2 className="typography-h2 mb-6">Resume and Portfolio</h2>
        {!isEditing ? 
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
              <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray">Resume</p>
                <p className="text-font-gray">Website</p>
              </div>
              <div className="flex flex-col gap-6 typography-body">
                <p className="w-fit whitespace-nowrap overflow-hidden text-ellipsis"><a href={candidateData.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-100">{candidateData?.firstName+"'s Resume"}</a></p>
                <p  className="w-fit whitespace-nowrap overflow-hidden text-ellipsis"><a href={ensureAbsoluteUrl(candidateData.website)} target="_blank" rel="noopener noreferrer"  className="underline text-blue-100">{candidateData?.website}</a></p>
              </div>
            </div>
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex sm:flex-col gap-6 typography-body">
                  <p className="text-font-gray hidden sm:block opacity-0">Dummy Div</p>
                  <p className="text-font-gray">Portfolio</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p className="hidden sm:block opacity-0">Dummy Div</p>
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis"><a href={ensureAbsoluteUrl(candidateData.portfolio)} target="_blank" rel="noopener noreferrer"  className="underline text-blue-100">{candidateData?.portfolio}</a></p>
                </div>
            </div>
          </div>
          : <div className="flex flex-col gap-4">
              <Controller
                name="resume"
                control={control}
                render={({ field ,fieldState : { error }}) => (
                  <div className="h-11 w-full flex items-center typography-body justify-between gap-2 font-outfit">
                    <p className="w-[28%] text-font-gray ">Resume</p>
                    <div className="w-[71%] bg-background-40 h-11 rounded-xl flex justify-between">
                    <p className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{fileName ? fileName : candidateData?.firstName + "'s Resume"}</p>
                    <span className="">
                    <Button icon={UploadIcon} variant="secondary" type="button" onClick={()=>resumeRef.current.click()}>{resumeFile ? "Edit" : "Choose"}</Button>   
                    </span>
                  </div>
                    <input onChange={handleResume} 
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ref={resumeRef} type="file"
                    className="opacity-0 w-0 h-0" />
                </div>
                )}
              />
              <Controller
                name="website"
                control={control}
                defaultValue={""}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="text"
                    id="website"
                    label="Website"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="portfolio"
                control={control}
                defaultValue={""}
                rules={validationRules.portfolio}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="text"
                    id="portfolio"
                    label="Portfolio"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              
            </div>}
      </StyledCard>
  )
}

const ProfessionalDetails = ({candidateData, isEditing ,control}) => {
  return (
      <StyledCard backgroundColor={"bg-background-30"}>
        <h2 className="typography-h2 mb-6">Professional Details</h2>
        {!isEditing ? 
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
            <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
              <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray">Experience</p>
                <p className="text-font-gray">Notice Period</p>
              </div>
              <div className="flex flex-col gap-6 typography-body">
              <p>{candidateData.experience } Years</p>
              <p>{candidateData.noticePeriod} Days</p>
              </div>
            </div>
              <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
                <div className="flex flex-col gap-6 typography-body">
                  <p className="text-font-gray ">Current CTC</p>
                  <p className="text-font-gray">Expected CTC</p>
                </div>
                <div className="flex flex-col gap-6 typography-body">
                  <p>{candidateData.currentCTC} LPA</p>
                  <p>{candidateData.expectedCTC} LPA</p>
                </div>
            </div>
          </div>
          :
          <div className="flex flex-col gap-4">
              <Controller
                name="experience"
                control={control}
                defaultValue={""}
                rules={validationRules.experience}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="number"
                    id="experience"
                    label="Experience"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="noticePeriod"
                control={control}
                defaultValue={""}
                rules={validationRules.noticePeriod}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="number"
                    id="noticePeriod"
                    label="Notice Period"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="currentCTC"
                control={control}
                defaultValue={""}
                rules={validationRules.currentCTC}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="number"
                    id="currentCTC"
                    label="Current CTC"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="expectedCTC"
                control={control}
                defaultValue={""}
                rules={validationRules.expectedCTC}
                render={({ field ,fieldState : { error }}) => (
                  <InputField
                    type="number"
                    id="expectedCTC"
                    label="Expected CTC"
                    labelStyles="text-font-gray"
                    rowWise
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    error={error}
                    errorMessage={error?.message}
                  />
                )}
              />
              
            </div>
          }
      </StyledCard>
  )
}

function Profile() {
  const { candidateData, isAuthenticated, isDone } = useCandidateAuth();
  const [isEditing,setIsEditing] = useState(false);

  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] =
    useState(false); 

  const profileImageRef = useRef();
  const [resumeFile,setResumeFile] = useState(null);
  const [profileFile,setProfileFile] = useState(null);

  const { control, handleSubmit, watch, setValue, setError, getValues,clearErrors, formState: { errors, isValid } } = useForm({
    defaultValues: {
      firstName : candidateData?.firstName ? candidateData.firstName : "",
      lastName : candidateData?.lastName ? candidateData.lastName : "",
      email : candidateData?.email ? candidateData.email : "",
      phone : candidateData?.phone ? candidateData.phone : 0,
      resume : candidateData?.resumeUrl ? candidateData.resumeUrl :"",
      portfolio : candidateData?.portfolio ? candidateData.portfolio :"",
      website : candidateData?.website ? candidateData.website :"",
      experience : candidateData?.experience ? candidateData.experience : 0,
      noticePeriod : candidateData?.noticePeriod ? candidateData.noticePeriod : 0,
      currentCTC : candidateData?.currentCTC ? candidateData.currentCTC : 0,
      expectedCTC : candidateData?.expectedCTC ? candidateData.expectedCTC : 0,

    },
    mode: 'onChange'
  });

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      setIsAssessmentBannerVisible(!candidateData.hasGivenAssessment);
    }
  }, [candidateData, isDone]);

  const handleEditProfile = async (data) => {
    console.log(resumeFile,profileFile,data)

    if(resumeFile){
      data.resume = await uploadResume(resumeFile,()=>{})
    }
    if(profileFile){
      data.profilePictureUrl = await uploadProfilePicture(profileFile)
    }
    console.log(data)
    const response = await axios.post("/auth/candidate/edit-profile",data)
    console.log("VANNU",response)
  }

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      setIsAssessmentBannerVisible(false);
    };
  }, []);
  return (
    <div className="w-full bg-background-80 min-h-screen py-4 px-4 ">
      <div className="container  mx-auto">
        <Header HeaderText={"My Profile"}  />
      {isAssessmentBannerVisible &&  <AssessmentBanner />}
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="flex w-full gap-4 flex-col-reverse lg:flex-row mt-8 lg:mt-0 ">
            <div className="lg:w-[70%] flex flex-col gap-4">
              <PersonalDetails candidateData={candidateData} isEditing={isEditing} control={control} />
              <ResumeAndPortfolioDetails candidateData={candidateData} isEditing={isEditing} control={control} resumeFile={resumeFile} setResumeFile={setResumeFile} />
              <ProfessionalDetails candidateData={candidateData} isEditing={isEditing} control={control} />
            </div>
            <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%] ">
                <StyledCard backgroundColor={"bg-background-30"} extraStyles=" flex flex-col items-center relative">
                  {isEditing || <button type="button" onClick={()=>setIsEditing(true)} className="absolute top-6 right-6 border rounded-xl p-2 border-font-gray hover:bg-background-60">
                    <PencilIcon/>
                  </button>}
                  <div className="relative w-[8rem] min-h-[5rem] ">
                    <div  className="absolute w-[8rem] left-0  -top-14 aspect-square overflow-hidden rounded-full">
                      <img src={profileFile ? URL.createObjectURL(profileFile) : candidateData?.profilePictureUrl ? candidateData?.profilePictureUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                      <input accept="image/*" onChange={(e)=>setProfileFile(e.target.files[0])} type="file" className="hidden" ref={profileImageRef} />
                    </div>
                    {isEditing && 
                    <button type="button" onClick={()=>profileImageRef.current.click()} className="absolute bottom-1 -right-1  rounded-xl">
                      <PencilEditIcon/>
                    </button>}
                  </div>
                  <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">{candidateData?.firstName + " " + candidateData?.lastName}</h1>
                  {!isEditing ? <>
                  <div className="w-full flex justify-center items-center gap-2">
                    <p className=" text-font-gray gap-2 typography-small-p">UX Designer</p>
                    <span className="inline-block min-w-[6px] bg-font-gray h-[6px] rounded-full"></span>
                    <p className=" text-font-gray gap-2 typography-small-p">Banglore</p>
                  </div>
                  <div className="mt-6 w-full font-outfit flex justify-between">
                    <p className="typography-body">Jobs Applied</p>
                    <p>{candidateData?.jobApplications?.length || 0}</p>
                  </div>
                  </> :
                  <div className="flex flex-col mt-2 gap-4">
                      <InputField type="text" label="Role"  rowWise={true} />
                      <InputField type="text" label="Location" rowWise={true} />
                  </div>
                  }
                </StyledCard>
            </div>
          </div>
            {isEditing && 
            <div className="place-self-end flex gap-4 mt-4">
              <Button onClick={()=>setIsEditing(false)} type="button" variant="secondary" >Cancel</Button>
              <Button type="Submit" >Save</Button>
            </div>}
        </form>
      </div>
    </div>
  );
}

export default Profile;
