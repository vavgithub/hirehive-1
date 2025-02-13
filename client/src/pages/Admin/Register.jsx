import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import { Button } from '../../components/ui/Button';
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import ForgotPassword from '../Admin/ForgotPassword';
import { loginCandidateAuth } from '../../redux/candidateAuthSlice';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import Loader from '../../components/ui/Loader';
import TogglePassword from '../../components/utility/TogglePassword';
import Logo from '../../svg/Logo/lightLogo.svg'
import LoaderModal from '../../components/ui/LoaderModal';
import GoogleIcon from '../../svg/GoogleIcon';
import RegisterForm from '../../components/Register/RegisterForm';
import OtpForm from '../../components/Register/OtpForm';
import PasswordForm from '../../components/Register/PasswordForm';
import DetailsForm from '../../components/Register/DetailsForm';

export const steps = [
    { id: "REGISTER", label: "Register" },
    { id: "OTP", label: "Otp" },
    { id: "PASSWORD", label: "Password" },
    { id: "COMPANY DETAILS", label: "Company Details" },
    { id: "ADD MEMBERS", label: "Add Members" },
    { id: "INVITE MEMBERS", label: "Invite Members" }
  ];

const Register = () => {
    const [currentStep,setCurrentStep] = useState(steps[0]?.id);

    const [loading,setLoading] = useState(false);
    
    
    if(loading){
        return (
          <div className="flex justify-center items-center min-h-screen min-w-screen">
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


