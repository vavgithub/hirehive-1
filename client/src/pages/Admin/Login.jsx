import React, { useEffect, useState } from 'react';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';
import ForgotPassword from './ForgotPassword';
import { showErrorToast } from '../../components/ui/Toast';
import { InputField } from '../../components/Form/FormFields';
import Loader from '../../components/ui/Loader';

const statsOne = [
    { title: 'Jobs Posted', value: 100, icon: one },
]
const statsTwo = [
    { title: 'Application Received', value: 10, icon: two },
]



const Login = () => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { data: authData, isLoading: authLoading, refetch: refetchAuth } = useAuth();

    useEffect(() => {
        if (authData) {
            if (authData.role === 'Hiring Manager') {
                navigate('/admin/dashboard');
            } else if (authData.role === 'Design Reviewer') {
                navigate('/design-reviewer/dashboard');
            }
        }
    }, [authData, navigate]);

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            await refetchAuth();
        },
        onError: (error) => {
            showErrorToast('Invalid credentials' , 'Server Error');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

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
            <div className="hidden lg:flex m-4 lg:w-2/3 bg-admin-login-fg backdrop-blur-lg bg-cover p-4 flex-col justify-end relative">
                <div>
                    <h1 className="typography-h1">VAV - Hire Designers</h1>
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
            <div className="w-full lg:w-1/2  p-28 flex flex-col justify-center">
                {showForgotPassword ? (
                    <ForgotPassword onBack={() => setShowForgotPassword(false)} />
                ) : (
                    <>
                        <h2 className="typography-h1 mb-2 text-center font-semibold">Welcome Back</h2>
                        <p className="typography-body mb-10 text-center font-normal">
                            Login to your account below
                        </p>

                        <form onSubmit={handleSubmit}>
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
                                className="w-full"
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