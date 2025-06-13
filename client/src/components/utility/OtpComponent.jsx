import React from 'react'
import { Button } from '../Buttons/Button'
import StyledCard from '../Cards/StyledCard';
import OTPInput from '../Inputs/OTPInput';
import { FcGoogle } from 'react-icons/fc';
import { googleLogin } from '../../services/auth.service';
import IconWrapper from '../Cards/IconWrapper';

function OtpComponent({hasFooter = false,showSendOTP, inviteMail , handleSendOtp, handleOtpSubmit , email , otp , isSubmitting , otpError , setOtp, cardbg = ""}) {
   

    // Handler for OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const registerGoogle = async () => {
      try {
        const result = await googleLogin()
        if(result?.authorizationUrl){
          window.location.href = result.authorizationUrl;
        }
      } catch (error) {
        showErrorToast('Error',error?.message)
      }
  }

  return (
        <div className={"flex items-center  w-screen justify-center  bg-cover bg-verification " + (hasFooter ? 'h-[calc(100vh-5rem)]' : 'h-screen')}>
          <StyledCard padding={0}  extraStyles={"w-full mx-8 md:mx-0 max-w-lg space-y-8  shadow-xl " + cardbg}>
            <form onSubmit={handleOtpSubmit} className="px-8 sm:px-16 text-center md:mb-20">
              <h1 className="mt-8 md:mt-20 mb-4 ">OTP Verification</h1>
              <p className="text-font-gray text-center typography-large-p">
                {showSendOTP ?
                "To ensure security, we need  to verify your account. So, please click on send OTP."
                :
                "To ensure security, please enter the OTP (One-Time Password) to verify your account. A code has been sent to"}
              </p>
              <h2 className='mt-3 md:mt-6 text-font-gray mx-auto w-[90%] sm:w-[75%] whitespace-nowrap text-ellipsis overflow-hidden'>
                {showSendOTP ? inviteMail :email}
              </h2>
              {showSendOTP ? 
                <div>
                  <Button
                  variant="primary"
                  className="w-full mt-6"
                  type="button"
                  onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                  <div className="flex items-center my-4">
                      <hr className="flex-grow border-grey-100" />
                      <span className="px-3 text-grey-100">OR</span>
                      <hr className="flex-grow border-grey-100" />
                  </div> 
                  <button type="button" onClick={registerGoogle} variant="secondary"  className='mx-auto flex gap-4 bg-white text-black-100 py-2 px-12 rounded-full'>
                      <IconWrapper icon={FcGoogle} size={0} customStrokeWidth={0} customIconSize={5} />
                      Continue With Google
                  </button>
                </div>
                :
              <>
              <div className='mt-4'>
                <OTPInput 
                length={6}
                onChange={setOtp}
                value={otp}
                />
              </div>
              {otpError && <span className="text-red-500 typography-small-p">{otpError}</span>}

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
              </>
              }
            </form>
          </StyledCard>
        </div>
  )
}

export default OtpComponent
