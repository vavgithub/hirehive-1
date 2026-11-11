import React, { useEffect, useLayoutEffect, useState } from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import OtpForm from '../../components/Register/OtpForm';
import PasswordForm from '../../components/Register/PasswordForm';
import DetailsForm from '../../components/Register/DetailsForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loaders/Loader';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import { checkUserAuthStatus } from '../../services/auth.service';
import { useAuthContext } from '../../context/AuthProvider';
import * as Sentry from '@sentry/react';

export const steps = [
    { id: "REGISTER", label: "Register" },
    { id: "OTP", label: "Otp" },
    { id: "PASSWORD", label: "Password" },
    { id: "COMPANY DETAILS", label: "Company Details" },
    { id: "ADD MEMBERS", label: "Add Members" },
  ];

const Register = () => {
    const [currentStep,setCurrentStep] = useState(steps[0]?.id);
    const navigate = useNavigate();    
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();
    const { setUser } = useAuthContext();

    const [searchParams] = useSearchParams();
    const onboardContext = useOnboardingContext();

    async function checkAuthStatus(error){
      try {
        const response = await checkUserAuthStatus(error)
        if(response?.currentStage){
          steps.forEach((step,index,stepsArr) => {
            if(step?.id === response?.currentStage){
              setCurrentStep(stepsArr[index + 1]?.id)
            }
          })
        }
        if(response?.userData){
          onboardContext?.setOnboardData(response?.userData)
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: { file: "Register.jsx", action: "checkAuthStatus", role: "admin" },
          extra: { response: error?.response?.data, message: error?.message },
        });
        console.log(error)
        if(error?.response?.status !== 401){
          showErrorToast('Error',error.response.data.message)
        }
      }
    }

    //token check for invited entry
    useLayoutEffect(()=>{
      const token = searchParams.get('token')
      const error = searchParams.get('error')
      const currentStage = searchParams.get('currentStage')
      if(token){
          setCurrentStep(steps[1]?.id)
      }
      if(error || currentStage){
        checkAuthStatus(error ? error : null)
        if(currentStage && currentStage !== 'DONE'){
          showSuccessToast('Success','Please complete your registration to continue.')
        }
        navigate('/admin/register')
      }
    },[searchParams])

    useEffect(() => {
        if (authData?.role) {
            setUser(authData)
          navigate(getRoute(authData.role,ROUTE_KEY.DASHBOARD));
        }
    }, [authData, navigate]);

    if (authLoading) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <Loader />
          </div>
      );
    }else if(currentStep === "REGISTER"){
      return <RegisterForm setCurrentStep={setCurrentStep} />
    }else if(currentStep === "OTP"){
      return <OtpForm setCurrentStep={setCurrentStep} />   
    }else if(currentStep === "PASSWORD"){
      return <PasswordForm setCurrentStep={setCurrentStep} />   
    }else{
      return <DetailsForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
    }

};


export default Register


