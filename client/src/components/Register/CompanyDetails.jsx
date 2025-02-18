import React, { useRef, useState } from 'react'
import DetailsFooter from './DetailsFooter';
import { CustomDropdown, InputField } from '../Form/FormFields';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import { useMutation } from '@tanstack/react-query';
import LoaderModal from '../ui/LoaderModal';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import axios from '../../api/axios';
import { steps } from '../../pages/Admin/Register';
import Modal from '../Modal';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import StyledCard from '../ui/StyledCard';
import { Button } from '../ui/Button';
import { validateProfileImages } from '../../utility/validationRules';

const LocationOptions = [
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'USA' },
  { value: 'dubai', label: 'Dubai' },
]

const companySizeOptions = [
  { value: '1-10', label: '1-10 Employees' },
  { value: '11-50', label: '11-50 Employees' },
  { value: '51-200', label: '51-200 Employees' },
  { value: '201-500', label: '201-500 Employees' },
  { value: '501-1000', label: '501-1,000 Employees' },
  { value: '1001-5000', label: '1,001-5,000 Employees' },
  { value: '5001-10000', label: '5,001-10,000 Employees' },
  { value: '10000+', label: '10,000+ Employees' }
]

const industryTypeOptions = [
  { value: 'it_software', label: 'IT & Software' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare & Pharmaceuticals' },
  { value: 'education', label: 'Education & Training' },
  { value: 'manufacturing', label: 'Manufacturing & Engineering' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'real_estate', label: 'Real Estate & Construction' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'telecom', label: 'Telecommunication' },
  { value: 'automobile', label: 'Automobile & Transportation' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'legal', label: 'Legal & Consulting' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'government', label: 'Government & Public Services' },
  { value: 'agriculture', label: 'Agriculture & Farming' }
]

const saveCompanyDetails = async (formData) => {
    const response = await axios.post('/auth/register/complete-hiring-manager',formData);
    return response.data
}

function CompanyDetails({currentStep,setCurrentStep}) {
    const [companyName,setCompanyName] = useState('');
    const [companySize,setCompanySize] = useState('');
    const [location,setLocation] = useState('');
    const [industry,setIndustry] = useState('');

    const [companyNameError,setCompanyNameError] = useState('');
    const [companySizeError,setCompanySizeError] = useState('');
    const [locationError,setLocationError] = useState('');
    const [industryError,setIndustryError] = useState('');
    const [imageError,setImageError] = useState('');
    
    const [showExistModal,setShowExistModal] = useState(false);

    const { onboardData , setOnboardData } = useOnboardingContext();
    const [previewUrl,setPreviewUrl] = useState("");
    const [file,setFile] = useState(null);

    const fileInputRef = useRef(null);
  
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file))
    };

    const saveCompanyDetailsMutation = useMutation({
      mutationFn : saveCompanyDetails,
      onSuccess : (data) => {
        if(data?.message){
          showSuccessToast("Success",data?.message)
        }
        if(data?.currentStage){
          steps.forEach((step,index,stepsArr) => {      
            if(step?.id === data?.currentStage){
              setCurrentStep(stepsArr[index + 1]?.id)
            }
          })
        }
        if(data?.userData){
          setOnboardData(data?.userData)
        }
      },
      onError : (error) => {
        if(error?.response?.data?.companyExist){
          setShowExistModal(error?.response?.data?.message)
        }else{
          console.log(error)
          showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
        }
      }
    })

    const handleSubmit = ()=>{
        console.log(file)
        if(!companyName?.trim() && !location?.trim() && !industry?.trim() && !companySize.trim()){
          showErrorToast("Error","Please fill all the forms")
          return
        }
        if(!companyName?.trim()){
          setCompanyNameError("Please enter a company name")
          return
        }
        if(!companySize?.trim()){
          setCompanySizeError("Please select a company size")
          return
        }
        if(!location?.trim()){
          setLocationError("Please select company location")
          return
        }
        if(!industry?.trim()){
          setIndustryError("Please select company industry")
          return
        }
        //Email exist error handling
        if(!onboardData?.email){
          showErrorToast("Error", "Unexpected error. Please Try again");
          setTimeout(()=>window.location.reload(),1000);
          return 
        }
        const formData = new FormData();
        formData.append('companyDetails',JSON.stringify({
          companyName,
          companySize,
          location,
          industry,
        }))
        formData.append("email",onboardData.email);
        if(file){
          try {
            validateProfileImages(file)
            formData.append("companyLogo",file)
            setImageError("")
          } catch (error) {
            setImageError(error?.message)
          }
        }
        (!file || (file && !imageError)) && saveCompanyDetailsMutation.mutate(formData)
    }
  return (
    <>
    {saveCompanyDetailsMutation.isPending && <LoaderModal />}
    <div className='w-full px-8  pt-6 pb-12 flex flex-col justify-center items-center'>
                <h1 className='typography-h1'>Tell us about your company</h1>
                <p className='typography-large-p text-font-gray font-light mt-2'>Provide your company details to help us match you with the right candidates.</p>
            </div>
            
            <div className='grid grid-cols-2 gap-x-6 gap-y-5 px-8 pb-8'>
                  <div >
                  <label className="typography-body font-bricolage font-semibold">Company Logo</label> 
                  <StyledCard 
                    padding={2}
                    backgroundColor={"bg-background-40"}
                    extraStyles=" hover:bg-background-60 cursor-pointer  mt-2 flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                      <div className='flex justify-start w-full gap-4'>
                        <div className="relative w-20 h-20">
                          <img src={previewUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="Profile" className="w-full h-full object-cover rounded-full" />
                          <div className="absolute bottom-0 right-0 p-1 bg-background-90 rounded-full">
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="typography-small-p text-font-gray my-2">
                            Click to {previewUrl ? "edit" : "upload"}  logo 
                          </span>
                          <Button variant="secondary" type="button" >{previewUrl ? "Edit" : "Upload"} </Button>
                        </div>
                      </div>           
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </StyledCard>
                  {imageError && (
                    <span className="text-red-500 typography-small-p mt-1">{imageError}</span>
                  )}
                </div>
                {/* Dummy Div */}
                <div></div>
                <InputField
                type="text"
                label="Company Name"
                labelStyles="font-bricolage font-medium"
                extraClass="mt-1"
                required
                error={companyNameError}
                errorMessage={companyNameError}
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
                />
                <CustomDropdown    
                label="Company Size" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={companySize}
                error={companySizeError ? {message : companySizeError} : null}
                onChange={setCompanySize}
                options={companySizeOptions}
                />
                <CustomDropdown
                label="Location" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={location}
                error={locationError ? {message : locationError} : null}
                onChange={setLocation}
                options={LocationOptions}
                />
                <CustomDropdown
                label="Industry" 
                required
                extraStylesForLabel="font-bricolage font-medium"
                value={industry}
                error={industryError ? {message : industryError} : null}
                onChange={setIndustry}
                options={industryTypeOptions}
                />
            </div>
            <DetailsFooter hasNextButton={true} currentStep={currentStep} setCurrentStep={setCurrentStep} nextFunction={handleSubmit} />
            {/* Company Details Suggestion Modal */}
            <Modal 
            actionType={ACTION_TYPES.COMPANYEXIST} 
            onClose={()=>{setShowExistModal(false)}} 
            customMessage={showExistModal}
            open={showExistModal} 
            cancelLabel='OK' cancelVariant='primary' />
    </>
  )
}

export default CompanyDetails
