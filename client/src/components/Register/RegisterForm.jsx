import React, { useState } from 'react'
import axios from '../../services/axios';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import { Button } from '../Buttons/Button';
import StatsGrid from '../../components/ui/StatsGrid';
import LoaderModal from '../Loaders/LoaderModal';
import GoogleIcon from '../../svg/Icons/GoogleIcon';
import { steps } from '../../pages/Admin/Register';
import { useMutation } from '@tanstack/react-query';
import { showErrorToast, showSuccessToast } from "../ui/Toast"
import { useOnboardingContext } from '../../context/OnboardingProvider';
import IconWrapper from '../Cards/IconWrapper';
import { Briefcase, FileText, X } from 'lucide-react';
import Modal from '../Modals/Modal';
import TogglePassword from '../utility/TogglePassword';
import { digitsRegex, lowerCaseRegex, passwordRegex, specialCharRegex, upperCaseRegex } from '../../utility/regex';
import ForgotPassword from '../../pages/Admin/ForgotPassword';
import { googleLogin, registerAdmin, verifyPassword } from '../../services/auth.service';
import { FcGoogle } from 'react-icons/fc';
import { useLogo } from '../../context/ThemeContext';
import * as Sentry from '@sentry/react';

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const statsOne = [
    { title: 'Jobs Posted', value: 100, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Briefcase} /> },
  ]
  const statsTwo = [
    { title: 'Application Received', value: 10, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={FileText} /> },
  ]

function RegisterForm({setCurrentStep}) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const { onboardData, setOnboardData } = useOnboardingContext();
    const Logo = useLogo();

    const [showPasswordPopup,setShowPasswordPopup] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [password, setPassword] = useState('');

    const [showForgotPassword,setShowForgotPassword] = useState(false);

    const registerAdminMutation = useMutation({
      mutationFn : registerAdmin,
      onSuccess : (data) => {
        if(data?.message){
          showSuccessToast("Success",data?.message)
        }
        if(data?.currentStage){
          if(['PASSWORD','COMPANY DETAILS','ADD MEMBERS'].includes(data?.currentStage)){
            setShowPasswordPopup(true)
          }else{
            steps.forEach((step,index,stepsArr) => {
              if(step?.id === data?.currentStage){
                setCurrentStep(stepsArr[index + 1]?.id)
              }
            })
          }
        }
        if(data?.userData){
          setOnboardData(data?.userData)
        }else{
          setOnboardData({
            firstName ,
            lastName,
            email
          })
        }
      },
      onError : (error) => {
        showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
      }
    })


    const verifyPasswordMutation = useMutation({
      mutationFn : verifyPassword,
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
      },
      onError : (error) => {
        showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
      }
    })

    const registerGoogle = async () => {
        try {
          const result = await googleLogin()
          if(result?.authorizationUrl){
            window.location.href = result.authorizationUrl;
          }
        } catch (error) {
          Sentry.captureException(error, {
            tags: { file: "RegisterForm.jsx", action: "registerGoogle", role: "admin" },
            extra: { response: error?.response?.data, message: error?.message },
          });
          showErrorToast('Error',error?.message)
        }
    }

    const handleFormSubmit =  (e) =>{
        e.preventDefault()
        if(!email && !firstName && !lastName){
          setError('Please fill all the details')
          return
        }else if (!email){
          setError('Please fill the email')
          return
        }else if(!emailPattern.test(email)){
          setError('Invalid email format')
          return
        }else if(!firstName.trim()){
          setError('Please fill the first name')
          return
        }else if(!lastName.trim()){
          setError('Please fill the last name')
          return
        }else{
          setError("")
          registerAdminMutation.mutate({firstName , lastName, email})
        }
    }
  
    const handlePassword = () => {
      if(!onboardData?.email){
        showErrorToast("Error", "Unexpected error. Please Try again");
        setTimeout(()=>window.location.reload(),1000);
        return 
      }
      if(password?.trim() === ""){
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return
      }
      if (password.length < 8) {
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return;
      }
  
      if (!upperCaseRegex.test(password)) {
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return;
      }
      if (!lowerCaseRegex.test(password)) {
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return;
      }
      if (!digitsRegex.test(password)) {
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return;
      }
      if (!specialCharRegex.test(password)) {
        showErrorToast("Error", "Invalid Password. Please enter the correct password");
        return;
      }
      verifyPasswordMutation.mutate({email : onboardData?.email , password })
    }

  return (
      <div className="flex h-screen ">
            {(registerAdminMutation?.isPending || loading) && <LoaderModal/>}
            {/* Left section with background image */}
            <div className="hidden lg:flex lg:w-3/5 bg-login-screen backdrop-blur-lg bg-cover p-12 flex-col justify-between relative">
              <div className='p-[2.75rem]'>
                <img className='h-12' src={Logo} />
                <h1 className="mt-8">GEODE - Hire Designers</h1>
                <p className="display-d2 max-w-xl mt-7 mb-4">Discover, hire, and explore top talent with HireHive</p>
                <p className='typography-body max-w-96'>Our advanced tools simplify job posting, application review, and career opportunities, ensuring you find the best candidates or land your next role effortlessly.</p>
                <p className="mb-8"></p>
              </div>
              <div className="bottom-12 right-12 flex space-x-4 z-10">
                <div className='absolute bottom-14 right-80'><StatsGrid stats={statsOne} /></div>
                <div className='absolute bottom-20 right-14'><StatsGrid stats={statsTwo} /></div>
              </div>
              <img src={sundarKanya} alt="Sundar Kanya" className="absolute bottom-0 right-0 h-[70%]" />
            </div>
            {/* Right section with login form */}
            <div className="w-full lg:w-2/5 bg-background-90 p-4 md:p-28   flex flex-col justify-center">
              <h1 className="text-center">Sign Up</h1>
              <p className="typography-body mb-8 text-center text-font-gray font-normal">Create an account</p>
                    <button type="button" onClick={registerGoogle} variant="secondary"  className='mx-auto flex gap-2 items-center bg-white text-black-100 py-2 px-3 h-11 rounded-lg'>
                        <IconWrapper icon={FcGoogle} size={0} customStrokeWidth={0} customIconSize={5} />
                        Continue With Google
                    </button> 
                   <div className="flex items-center my-4">
                      <hr className="flex-grow border-grey-100" />
                      <span className="px-3 text-grey-100">OR</span>
                      <hr className="flex-grow border-grey-100" />
                  </div> 
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstname" className="block mb-2 ">First Name</label>
                  <input type="text" id="firstname" placeholder="Enter your Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 rounded-lg   focus:outline-teal-400" />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastname" className="block mb-2 ">Last Name</label>
                  <input type="text" id="lastname" placeholder="Enter your Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 rounded-lg   focus:outline-teal-400" />
                </div>
                <div className="mb-1">
                  <label htmlFor="email" className="block mb-2 ">Work Email</label>
                  <input type="email" id="email" placeholder="Enter your work email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg   focus:outline-teal-400" />
                </div>
                  
                {error && <p className="text-red-500 typography-small-p mb-4">{error}</p>}
                <div className='flex justify-end'>
                                      
                                  </div>
                <Button type="submit" variant="primary" className="mt-6 " 
                // disabled={ isLoadingAuth}
                >
                  { "Sign Up"}
                </Button>
              </form>

              <p className="text-center mt-6 typography-body">
                    Already have an account? <a href="/admin/login" className="text-blue-500">Sign in</a>
                </p>
            </div>
            <Modal
            open={showPasswordPopup}
            onClose={()=>setShowPasswordPopup(false)}
            customTitle={"Confirm Your Password"}
            customMessage={"Please confirm your password to continue"}
            customConfirmLabel={'Confirm'}
            onConfirm={handlePassword}
            >
              <div>
                <div>
                  <label htmlFor="password" className="block mt-4 mb-2">Password</label>
                  <TogglePassword typeState={passwordType} setTypeState={setPasswordType}>
                    <input type={passwordType} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={(password && "tracking-widest") +" w-full focus:outline-teal-400 p-2 rounded-lg bg-black text-font-main"} />
                  </TogglePassword>
                </div>
                <div className='flex justify-end'>
                    <span
                      onClick={() => {setShowForgotPassword(true) ; setShowPasswordPopup(false)}}
                      className="text-font-primary cursor-pointer typography-body  mt-2 block text-left hover:underline"
                    >
                        Forgot Password?
                    </span>
                </div>
              </div>
            </Modal>
            <Modal
            open={showForgotPassword}
            onClose={()=>setShowForgotPassword(false)}
            customTitle={"Reset Your Password"}
            customMessage={"Please reset your password to continue"}
            customConfirmLabel={'Send OTP'}
            onConfirm={()=>console.log("")}
            noCancel
            noConfirm
            >
              <div className='mt-2 '>
              <ForgotPassword onBack={()=>{setShowForgotPassword(false); }} isModal setIsLoading={setLoading} />
                <div onClick={()=>setShowForgotPassword(false)} className='absolute -top-4 -right-4 cursor-pointer'>
                  <IconWrapper icon={X} hasBg customBgHover={"hover-outline"} />
                </div>
              </div>
            </Modal>
          </div>
  )
}

export default RegisterForm
