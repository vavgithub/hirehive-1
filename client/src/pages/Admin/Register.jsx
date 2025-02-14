import React, { useEffect, useState } from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import OtpForm from '../../components/Register/OtpForm';
import PasswordForm from '../../components/Register/PasswordForm';
import DetailsForm from '../../components/Register/DetailsForm';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';

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

    useEffect(() => {
        if (authData) {
            if (authData.role === 'Hiring Manager') {
                navigate('/admin/dashboard');
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


