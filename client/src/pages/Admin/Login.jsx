import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { googleLogin, login } from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';
import ForgotPassword from './ForgotPassword';
import { showErrorToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import Logo from '../../svg/Logo/lightLogo.svg'
import { InputField } from '../../components/Inputs/InputField';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, FileText } from 'lucide-react';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import GoogleIcon from '../../svg/Icons/GoogleIcon';
import { FcGoogle } from 'react-icons/fc';

const statsOne = [
    { title: 'Jobs Posted', value: 100, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
  ]
  const statsTwo = [
    { title: 'Application Received', value: 10, icon: () => <IconWrapper size={10} isInActiveIcon icon={FileText} /> },
  ]



const Login = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();

    useEffect(() => {
        if (authData?.role) {
          navigate(getRoute(authData.role,ROUTE_KEY.DASHBOARD));
        }
    }, [authData, navigate]);

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            await refetchAuth();
        },
        onError: (error) => {
            showErrorToast('Error' , error?.response?.data?.error || "Server error");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
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

    if (authLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-admin-login-bg bg-cover">
            {/* Left section with background image */}
            <div className="hidden lg:flex m-4 lg:w-3/5 bg-admin-login-fg backdrop-blur-lg bg-cover p-4 flex-col justify-end relative">
                <div>
                    <img className='h-12' src={Logo} />
                    <h1 className="mt-8">VAV - Hire Designers</h1>
                    <p className="display-d2 max-w-xl mt-4 mb-4">Discover, hire, and explore top talent with HireHive</p>
                    <p className='typography-body max-w-96'>Our advanced tools simplify job posting, application review, and career opportunities, ensuring you find the best candidates or land your next role effortlessly.</p>
                    <p className="mb-8"></p>
                </div>
                {/* <div className="absolute bottom-12 right-12 flex space-x-4 z-10">
                    <div className='absolute bottom-6 right-96'><StatsGrid stats={statsOne} /></div>
                    <div className='absolute bottom-20 right-14 w-64'><StatsGrid stats={statsTwo} /></div>
                </div> */}
                {/* <img src={sundarKanya} alt="Sundar Kanya" className="absolute bottom-0 right-0 h-[70%]" /> */}
            </div>

            {/* Right section with login form */}
            <div className="w-full lg:w-2/5  p-28 flex flex-col justify-center items-start ">
                {showForgotPassword ? (
                    <ForgotPassword onBack={() => setShowForgotPassword(false)} />
                ) : (
                    <>
                        <h1 className="mb-2 text-center font-semibold w-full">Welcome Back</h1>
                        <p className="typography-body mb-10 text-center font-normal w-full">
                            Login to your account below
                        </p>
                        <button type="button" onClick={registerGoogle} variant="secondary"  className='mx-auto flex gap-4 bg-white text-black-100 py-2 px-12 rounded-full'>
                            <IconWrapper icon={FcGoogle} size={0} customStrokeWidth={0} customIconSize={5} />
                            Continue With Google
                        </button> 
                        <div className="flex items-center my-4 w-full">
                            <hr className="flex-grow border-grey-100" />
                            <span className="px-3 text-grey-100">OR</span>
                            <hr className="flex-grow border-grey-100" />
                        </div> 
                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className="space-y-4">
                                <InputField
                                    id="login-email"
                                    type="email"
                                    label="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                <InputField
                                    id="login-password"
                                    type="password"
                                    label="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                            </div>

                            <div className='flex justify-end'>
                                <span
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-font-primary cursor-pointer typography-body mb-6 mt-2 block text-left hover:underline"
                                >
                                    Forgot Password?
                                </span>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;