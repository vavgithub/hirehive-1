import React, { useState } from 'react'
import OtpComponent from '../utility/OtpComponent'
import { steps } from '../../pages/Admin/Register';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import { useMutation } from '@tanstack/react-query';
import LoaderModal from '../Loaders/LoaderModal';
import axios from '../../api/axios';
import { useSearchParams } from 'react-router-dom';

const verifyOnboardOTP = async ({otp, email}) => {
    const response = await axios.post('/auth/register/verify-otp-for-admin',{otp, email});
    return response.data
}

const sendOTP = async ({token}) => {
  const response = await axios.post('/auth/register/send-invite-otp',{token});
  return response.data
}

function OtpForm({setCurrentStep}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError,setOtpError] = useState("");

    const { onboardData , setOnboardData } = useOnboardingContext();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const inviteMail = searchParams.get("email");

    const verifyOnboardOTPMutation = useMutation({
      mutationFn : verifyOnboardOTP,
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
        showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
      }
    })

    const handleOtpSubmit = (e)=> {
        e.preventDefault();
        if(otp.join("")?.length !== 6){
          setOtpError('Please enter the correct OTP')
          return
        }else{
          setOtpError("")
        }
        if(!onboardData?.email){
          showErrorToast("Error", "Unexpected error. Please Try again");
          setTimeout(()=>window.location.reload(),1000);
          return 
        }
        verifyOnboardOTPMutation.mutate({otp : otp?.join(""),email : onboardData?.email})
    }

    const handleSendOtp = () => {
      sendInviteOTPMutation.mutate({token})
    }
  
    const sendInviteOTPMutation = useMutation({
      mutationFn : sendOTP,
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
        if(data?.email){
          setOnboardData(prev => ({
            ...prev,
            email : data?.email
          }))
        }
      },
      onError : (error) => {
        showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
      }
    })

  return (
    <div>
      {(verifyOnboardOTPMutation?.isPending || sendInviteOTPMutation?.isPending) && <LoaderModal />}
      <OtpComponent inviteMail={inviteMail} showSendOTP={onboardData?.email ? false : token} handleSendOtp={handleSendOtp} isSubmitting={verifyOnboardOTPMutation?.isPending} cardbg='bg-card-bg bg-cover bg-center bg-no-repeat' handleOtpSubmit={handleOtpSubmit} otpError={otpError} email={onboardData?.email} otp={otp} setOtp={setOtp}/>
    </div>
  )
}

export default OtpForm
     