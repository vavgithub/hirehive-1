import React, { useState } from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import { Button } from '../../components/ui/Button';
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import Logo from '../../svg/Logo/lightLogo.svg'
import LoaderModal from '../../components/ui/LoaderModal';
import GoogleIcon from '../../svg/GoogleIcon';
import { steps } from '../../pages/Admin/Register';



const statsOne = [
    { title: 'Jobs Posted', value: 100, icon: one },
  ]
  const statsTwo = [
    { title: 'Application Received', value: 10, icon: two },
  ]

function RegisterForm({setCurrentStep}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        setCurrentStep(steps[1]?.id)
    }

  return (
      <div className="flex h-screen ">
            {/* {isLoadingAuth && <LoaderModal/>} */}
            {/* Left section with background image */}
            <div className="hidden lg:flex lg:w-2/3 bg-login-screen backdrop-blur-lg bg-cover p-12 flex-col justify-between relative">
              <div className='p-[45px]'>
                <img className='h-12' src={Logo} />
                <h1 className="typography-h1 font-normal mt-8">VAV - Hire Designers</h1>
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
            <div className="w-full lg:w-1/2 bg-background-30 p-4 md:p-28   flex flex-col justify-center">
              <h2 className="typography-h1  text-center font-semibold">Sign Up</h2>
              <p className="typography-body mb-8 text-center text-font-gray font-normal">Create an account</p>
                    <Button type="button" variant="secondary" icon={GoogleIcon} className="w-full" >
                        Continue With Google
                    </Button>
                  <div className="flex items-center my-4">
                      <hr className="flex-grow border-grey-100" />
                      <span className="px-3 text-grey-100">OR</span>
                      <hr className="flex-grow border-grey-100" />
                  </div> 
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullname" className="block mb-2 font-bricolage">Full Name</label>
                  <input type="text" id="fullname" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400" />
                </div>
                <div className="mb-1">
                  <label htmlFor="email" className="block mb-2 font-bricolage">Work Email</label>
                  <input type="email" id="email" placeholder="Enter your work email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400" />
                </div>
                  
                {error && <p className="text-red-500 typography-small-p mb-4">{error}</p>}
                <div className='flex justify-end'>
                                      
                                  </div>
                <Button type="submit" variant="primary" className="mt-6 w-full " 
                // disabled={ isLoadingAuth}
                >
                  { "Sign Up"}
                </Button>
              </form>

              <p className="text-center mt-6 typography-body">
                    Already have an account? <a href="/admin/login" className="text-blue-500">Sign in</a>
                </p>
            </div>
          </div>
  )
}

export default RegisterForm
