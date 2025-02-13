import React from 'react'
import PasswordComponent from '../PasswordComponent'
import { useForm } from 'react-hook-form';
import { steps } from '../../pages/Admin/Register';

function PasswordForm({setCurrentStep}) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
        setValue,
        reset,
      } = useForm({
        mode: 'onChange',
        defaultValues: {
            password : "",
            confirmPassword : ""
        },
      });

      console.log(errors)

      const handlePasswordSubmit = (data) =>{
            console.log(data)
            setCurrentStep(steps[3].id)
      }
  return (
    <div>
      <PasswordComponent cardbg='bg-card-bg bg-cover bg-center bg-no-repeat' handlePasswordSubmit={handleSubmit(handlePasswordSubmit)} control={control}  />
    </div>
  )
}

export default PasswordForm
