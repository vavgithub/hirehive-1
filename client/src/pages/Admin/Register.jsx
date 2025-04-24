import React, { useEffect, useLayoutEffect, useState } from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import OtpForm from '../../components/Register/OtpForm';
import PasswordForm from '../../components/Register/PasswordForm';
import DetailsForm from '../../components/Register/DetailsForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loaders/Loader';

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

    const [searchParams] = useSearchParams();

    //token check for invited entry
    useLayoutEffect(()=>{
      const token = searchParams.get('token')
      if(token){
          setCurrentStep(steps[1]?.id)
      }
    },[searchParams])

    useEffect(() => {
        if (authData) {
            if (authData.role === 'Admin') {
                navigate('/admin/dashboard');
            } else if (authData.role === 'Hiring Manager') {
                navigate('/hiring-manager/dashboard');
            } else if (authData.role === 'Design Reviewer') {
                navigate('/design-reviewer/dashboard');
            }
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


