// CandidateLogin.jsx
import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import { Button } from '../../components/ui/Button';
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import ForgotPassword from '../Admin/ForgotPassword';

const statsOne = [
  { title: 'Jobs Posted', value: 100, icon: one },
]
const statsTwo = [
  { title: 'Application Received', value: 10, icon: two },
]

const CandidateLogin = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auth/candidate/login', { email, password });
      // Redirect to candidate dashboard
      navigate('/candidate/all-jobs');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const isFormValid = email && password;
  
  return (
    <div className="flex h-screen">
      {/* Left section with background image */}
      <div className="hidden lg:flex lg:w-2/3 bg-login-screen backdrop-blur-lg bg-cover p-12 flex-col justify-between relative">
        <div className='p-[45px]'>
          <h1 className="typography-h1 font-normal">HireHive</h1>
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
      {showForgotPassword ? (
                    <ForgotPassword onBack={() => setShowForgotPassword(false)} />
                ) : (
                  <>

        <h2 className="typography-h1 mb-2 text-center font-semibold">Welcome Back</h2>
        <p className="typography-body mb-10 text-center font-normal">Login to your account below</p>
        {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-5 flex items-center justify-center">
                Continue with Google
            </button>
            <div className="flex items-center mb-4">
                <hr className="flex-grow border-gray-700" />
                <span className="px-3 text-gray-700">OR</span>
                <hr className="flex-grow border-gray-700" />
            </div> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg bg-black text-white focus:outline-teal-400" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full focus:outline-teal-400 p-2 rounded-lg bg-black text-white" />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className='flex justify-end'>
                                <span
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-font-primary cursor-pointer typography-body mb-6 mt-2 block text-left hover:underline"
                                >
                                    Forgot Password?
                                </span>
                            </div>
          {/* <a href="#" className="text-blue-500 mb-6 mt-2 block text-right">Forgot Password?</a> */}
          <Button type="submit" variant="primary" className="mt-6" disabled={!isFormValid}>
            Login
          </Button>
        </form>
        </>
                )}
        {/* <p className="text-center mt-6">
                Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
            </p> */}
      </div>
    </div>
  );
};

export default CandidateLogin;
