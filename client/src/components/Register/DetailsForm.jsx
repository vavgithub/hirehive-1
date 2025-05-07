import React, { useState } from 'react'
import StyledCard from '../Cards/StyledCard'
import Stepper from '../utility/Stepper';
import { steps } from '../../pages/Admin/Register';
import CompanyDetails from './CompanyDetails';
import AddMembers from './AddMembers';

function DetailsForm({currentStep,setCurrentStep}) {

  return (
    <div className="flex items-center w-screen justify-center min-h-screen bg-cover bg-verification">
        <StyledCard padding={0} backgroundColor={"bg-background-100"} extraStyles="mx-8 md:mx-0 w-[55%] max-w-[47.5rem] shadow-xl  ">
            <Stepper padding={4} steps={steps?.filter((each,index)=> index > 2)} currentStep={currentStep} setCurrentStep={setCurrentStep} />
            {
                currentStep === "COMPANY DETAILS" &&  <CompanyDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === "ADD MEMBERS" &&  <AddMembers currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
        </StyledCard>
    </div>
  )
}

export default DetailsForm
