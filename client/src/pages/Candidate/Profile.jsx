import React, { useEffect, useState } from "react";
import Header from "../../components/utility/Header";
import useCandidateAuth from "../../hooks/useCandidateAuth";
import AssessmentBanner from "../../components/ui/AssessmentBanner";
import StyledCard from "../../components/ui/StyledCard";
import { ensureAbsoluteUrl } from "../../utility/ensureAbsoluteUrl";
import PencilIcon from "../../svg/Buttons/PencilIcon";

const PersonalDetails = ({candidateData}) => {
    return (
        <StyledCard backgroundColor={"bg-background-40"}>
          <h2 className="typography-h2 mb-6">Personal Details</h2>
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
        </StyledCard>
    )
}

const ResumeAndPortfolioDetails = ({candidateData}) => {
  return (
      <StyledCard backgroundColor={"bg-background-40"}>
        <h2 className="typography-h2 mb-6">Resume and Portfolio</h2>
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
      </StyledCard>
  )
}

const ProfessionalDetails = ({candidateData}) => {
  return (
      <StyledCard backgroundColor={"bg-background-40"}>
        <h2 className="typography-h2 mb-6">Professional Details</h2>
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
      </StyledCard>
  )
}

function Profile() {
  const { candidateData, isAuthenticated, isDone } = useCandidateAuth();

  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] =
    useState(false); 

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      setIsAssessmentBannerVisible(!candidateData.hasGivenAssessment);
    }
  }, [candidateData, isDone]);

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
        <div className="flex w-full gap-6 flex-col-reverse lg:flex-row mt-8 lg:mt-0 ">
          <div className="lg:w-[70%] flex flex-col gap-6">
            <PersonalDetails candidateData={candidateData} />
            <ResumeAndPortfolioDetails candidateData={candidateData} />
            <ProfessionalDetails candidateData={candidateData} />
          </div>
          <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%] ">
              <StyledCard extraStyles="bg-background-40 flex flex-col items-center relative">
                <button className="absolute top-6 right-6 border rounded-xl p-2 border-font-gray hover:bg-background-60">
                  <PencilIcon/>
                </button>
                <div className="relative w-[8rem] min-h-[5rem] ">
                <div  className="absolute w-[8rem] left-0  -top-14 aspect-square overflow-hidden rounded-full">
                  <img src={candidateData?.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className="object-cover w-full" />
                </div>
                </div>
                <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">{candidateData?.firstName + " " + candidateData?.lastName}</h1>
                <div className="w-full flex justify-center items-center gap-2">
                  <p className=" text-font-gray gap-2 typography-small-p">UX Designer</p>
                  <span className="inline-block min-w-[6px] bg-font-gray h-[6px] rounded-full"></span>
                  <p className=" text-font-gray gap-2 typography-small-p">Banglore</p>
                </div>
                <div className="mt-6 w-full font-outfit flex justify-between">
                  <p className="typography-body">Jobs Applied</p>
                  <p>{candidateData?.jobApplications?.length || 0}</p>
                </div>
              </StyledCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
