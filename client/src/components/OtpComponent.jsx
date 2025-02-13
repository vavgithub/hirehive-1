import React from 'react'
import { Button } from './ui/Button'
import StyledCard from './ui/StyledCard';

function OtpComponent({handleOtpSubmit , email , otp , isSubmitting , otpError , setOtp, cardbg = ""}) {
    
    // Handler for OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
        <div className="flex items-center h-screen w-screen justify-center  bg-cover bg-verification ">
          <StyledCard padding={0}  extraStyles={"w-full mx-8 md:mx-0 max-w-lg space-y-8  shadow-xl " + cardbg}>
            <form onSubmit={handleOtpSubmit} className="px-8 sm:px-16 text-center md:mb-20">
              <h1 className="typography-h2 sm:typography-h1 mt-8 md:mt-20 mb-4 ">OTP Verification</h1>
              <p className="text-font-gray text-center typography-large-p">
                To ensure security, please enter the OTP (One-Time Password) to
                verify your account. A code has been sent to
              </p>
              <h2 className='typography-h3 sm:typograhpy-h2 mt-3 md:mt-6 text-font-gray mx-auto w-[240px] min-[420px]:w-full whitespace-nowrap text-ellipsis overflow-hidden'>
                {email}
              </h2>
              <div className="flex justify-center  space-x-2 mt-4 ">
                {otp?.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="number"
                    maxLength="1"
                    className="no-spinner otp-input"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                  />
                ))}
              </div>
              {otpError && <span className="text-red-500">{otpError}</span>}

              <div className="flex justify-center mt-6 w-full gap-4  mb-6 ">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full "
                >
                  {isSubmitting ? 'Submitting...' : 'Verify'}
                </Button>
              </div>
            </form>
          </StyledCard>
        </div>
  )
}

export default OtpComponent
