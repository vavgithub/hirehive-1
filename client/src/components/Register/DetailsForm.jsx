import React, { useState } from 'react'
import StyledCard from '../ui/StyledCard'
import Stepper from './Stepper';
import { steps } from '../../pages/Admin/Register';
import CompanyDetails from './CompanyDetails';
import AddMembers from './AddMembers';
import InviteMembers from './InviteMembers';

function DetailsForm({currentStep,setCurrentStep}) {

  return (
    <div className="flex items-center w-screen justify-center min-h-screen bg-cover bg-verification">
        <StyledCard padding={0} backgroundColor={"bg-background-100"} extraStyles="mx-8 md:mx-0 w-[55%] max-w-[760px] shadow-xl overflow-hidden ">
            <Stepper padding={4} steps={steps?.filter((each,index)=> index > 2)} currentStep={currentStep} />
            {
                currentStep === "COMPANY DETAILS" &&  <CompanyDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === "ADD MEMBERS" &&  <AddMembers currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === "INVITE MEMBERS" &&  <InviteMembers currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
        </StyledCard>
    </div>
  )
}

export default DetailsForm
