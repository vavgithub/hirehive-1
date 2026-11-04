// CandidateLogin.jsx
import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from '../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GeodeLogo } from '@/components/geode/Logo';
import { Button } from '../../components/Buttons/Button';
import ForgotPassword from '../Admin/ForgotPassword';
import { loginCandidateAuth } from '../../redux/candidateAuthSlice';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import Loader from '../../components/Loaders/Loader';
import TogglePassword from '../../components/utility/TogglePassword';
import LoaderModal from '../../components/Loaders/LoaderModal';
import * as Sentry from '@sentry/react';

const CandidateLogin = () => {
  const dispatch = useDispatch();
  const { authError, isLoadingAuth } = useSelector((state) => state.candidateAuth);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated ,isLoading ,isDone} = useCandidateAuth();

  const [passwordType,setPasswordType] = useState('password');

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/candidate/my-jobs',{replace:true});
    }
  },[isAuthenticated])

  useEffect(()=>{
    let timer;
    if(authError !== 'Not authorized, token missing'){
      setError(authError);
      timer = setTimeout(()=>setError(""),2000)
    }
    return ()=> clearTimeout(timer);
  },[authError])

  useEffect(()=>{
    if(!isLoading && loading && isDone){
      setLoading(isLoading)
    }
  },[isLoading,loading , isDone])
  
  const isFormValid = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isFormValid){
        const result = await dispatch(loginCandidateAuth({ email, password })).unwrap();
        if (result) {
          navigate('/candidate/all-jobs',{replace:true});
        }
      }else{
        (!email.trim() && !password.trim()) ? setError("Please enter your email and password") : !email.trim() ? setError("Please enter your email") :  !password.trim() ? setError("Please enter your password") :  setError("")
        
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: { file: "CandidateLogin.jsx", action: "handleSubmit", role: "candidate" },
        extra: { response: error?.response?.data },
      });
      // Error handling is now managed by Redux
      // console.error('Login failed:', error);
    }
  };

  
  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen">
      <Loader />
    </div>
    );
  }else{
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted p-6">
        {isLoadingAuth && <LoaderModal/>}
        <div className="w-full max-w-sm rounded-lg border bg-card p-6 text-card-foreground">
        {showForgotPassword ? (
                      <ForgotPassword role="Candidate" onBack={() => setShowForgotPassword(false)} />
                  ) : (
                    <>
          <div className="mb-6 flex justify-center">
            <GeodeLogo />
          </div>
          <h1 className="mb-2 text-center text-2xl font-medium">Welcome Back</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">Login to your account below</p>
          {/* <button className="bg-blue-600 text-font-main py-2 px-4 rounded-lg mb-5 flex items-center justify-center">
                  Continue with Google
              </button>
              <div className="flex items-center mb-4">
                  <hr className="flex-grow border-gray-700" />
                  <span className="px-3 text-gray-700">OR</span>
                  <hr className="flex-grow border-gray-700" />
              </div> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bricolage">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            </div>
              <div>
                <label htmlFor="password" className="block mb-2 font-bricolage">Password</label>
              <TogglePassword typeState={passwordType} setTypeState={setPasswordType}>
                <input type={passwordType} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full" />
              </TogglePassword>
              </div>
            {error && <p className="text-red-500 typography-small-p mb-4">{error}</p>}
            <div className='flex justify-end'>
                                  <span
                                      onClick={() => setShowForgotPassword(true)}
                                      className="mb-6 mt-2 block cursor-pointer text-left text-sm text-foreground hover:underline"
                                  >
                                      Forgot Password?
                                  </span>
                              </div>
            {/* <a href="#" className="text-blue-500 mb-6 mt-2 block text-right">Forgot Password?</a> */}
            <Button  type="submit" variant="primary" className="mt-6 w-full" disabled={ isLoadingAuth}>
              {isLoadingAuth ? "Logging In..." : "Login"}
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
  }
};

export default CandidateLogin;
