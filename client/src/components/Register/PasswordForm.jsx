import React, { useState } from 'react'
import PasswordComponent from '../utility/PasswordComponent'
import { useForm } from 'react-hook-form';
import { steps } from '../../pages/Admin/Register';
import { digitsRegex, lowerCaseRegex, specialCharRegex, upperCaseRegex } from '../../utility/regex';
import axios from '../../api/axios';
import { useMutation } from '@tanstack/react-query';
import { useOnboardingContext } from '../../context/OnboardingProvider';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import useAuth from '../../hooks/useAuth';

const setPassword = async ({password, email}) => {
    const response = await axios.post('/auth/register/set-password',{password, email});
    return response.data
}

function PasswordForm({setCurrentStep}) {
    const [passwordError,setPasswordError] = useState("");
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        watch,
        setValue,
        reset,
      } = useForm({
        mode: 'onChange',
        defaultValues: {
            password : "",
            confirmPassword : ""
        },
      });

      const { onboardData , setOnboardData } = useOnboardingContext();

      const setPasswordMutation = useMutation({
        mutationFn : setPassword,
        onSuccess : (data) => {
          if(data?.message){
            showSuccessToast("Success",data?.message)
          }
          if(data?.currentStage !== "DONE"){
            steps.forEach((step,index,stepsArr) => {
              if(step?.id === data?.currentStage){
                setCurrentStep(stepsArr[index + 1]?.id)
              }
            })
          }else{
            refetchAuth()
          }
        },
        onError : (error) => {
          showErrorToast("Error",error?.response?.data?.message || "Unexpected Registration Error. Try again")
        } 
      })

      const handlePasswordSubmit = (e) =>{
          e.preventDefault();
          const password = getValues('password');
          const confirmPassword = getValues('confirmPassword');
          
          if(!password?.trim() && !confirmPassword?.trim()){
            setPasswordError("Please enter your new password");
            return;
          }
      
          if(!password?.trim()){
            setPasswordError("Please enter your new password");
            return;
          }
          
          if(!confirmPassword?.trim()){
            setPasswordError("Please confirm your password");
            return;
          }
      
          if (password !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
          }
      
          if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
          }
      
          if (!upperCaseRegex.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return;
          }
          if (!lowerCaseRegex.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter');
            return;
          }
          if (!digitsRegex.test(password)) {
            setPasswordError('Password must contain at least one number');
            return;
          }
          if (!specialCharRegex.test(password)) {
            setPasswordError('Password must contain at least one special character');
            return;
          }
          //Email exist error handling
          if(!onboardData?.email){
            showErrorToast("Error", "Unexpected error. Please Try again");
            setTimeout(()=>window.location.reload(),1000);
            return 
          }
          setPasswordMutation.mutate({password,email : onboardData?.email})
      }
  return (
    <div>
      <PasswordComponent watch={watch} cardbg='bg-card-bg bg-cover bg-center bg-no-repeat' handlePasswordSubmit={handlePasswordSubmit} control={control} passwordError={passwordError} />
    </div>
  )
}

export default PasswordForm
