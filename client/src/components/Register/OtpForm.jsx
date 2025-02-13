import React, { useState } from 'react'
import OtpComponent from '../OtpComponent'
import { steps } from '../../pages/Admin/Register';

function OtpForm({setCurrentStep}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    
    const handleOtpSubmit = ()=> {
        setCurrentStep(steps[2].id)
    }

  return (
    <div>
      <OtpComponent cardbg='bg-card-bg bg-cover bg-center bg-no-repeat' handleOtpSubmit={handleOtpSubmit} email={"hhvtest@gmail.com"} otp={otp} setOtp={setOtp}/>
    </div>
  )
}

export default OtpForm
     