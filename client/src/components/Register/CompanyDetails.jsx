import React, { useState } from 'react'
import DetailsFooter from './DetailsFooter';
import { CustomDropdown, InputField } from '../Form/FormFields';

function CompanyDetails({currentStep,setCurrentStep}) {
    const [companySize,setCompanySize] = useState('');
    const [location,setLocation] = useState('');
    const [industry,setIndustry] = useState('');

    const handleSubmit = ()=>{
        setCurrentStep("ADD MEMBERS")
    }
  return (
    <>
    <div className='w-full px-8  pt-6 pb-12 flex flex-col justify-center items-center'>
                <h1 className='typography-h1'>Tell us about your company</h1>
                <p className='typography-large-p text-font-gray font-light mt-2'>Provide your company details to help us match you with the right candidates.</p>
            </div>
            <div className='grid grid-cols-2 gap-x-6 gap-y-5 px-8 pb-8'>
                <InputField
                type="text"
                label="Company Name"
                labelStyles="font-bricolage font-medium"
                extraClass="mt-1"
                required
                error=""
                />
                <CustomDropdown    
                label="Company Size" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={companySize}
                onChange={setCompanySize}
                options={['1','2','3']}
                />
                <CustomDropdown
                label="Location" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={location}
                onChange={setLocation}
                options={['1','2','3']}
                />
                <CustomDropdown
                label="Industry" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={industry}
                onChange={setIndustry}
                options={['1','2','3']}
                />
            </div>
            <DetailsFooter hasNextButton={true} currentStep={currentStep} setCurrentStep={setCurrentStep} nextFunction={handleSubmit} />
    </>
  )
}

export default CompanyDetails
