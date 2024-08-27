import React, { useEffect, useState } from 'react';
import sundarKanya from "../../svg/Background/sundar-kanya.png"
import StatsGrid from '../../components/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/Form/FormFields';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';

const statsOne = [
    { title: 'Jobs Posted', value: 100, icon: one },
]

const statsTwo = [
    { title: 'Application Received', value: 10, icon: two },
]
const Login = () => {

    
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
            await refetchAuth(); // Refetch auth data after successful login
        },
        onError: (error) => {
            alert(error.response?.data?.message || 'Login failed');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    if (authLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-screen">
            {/* Left section with background image */}
            <div className="hidden lg:flex lg:w-2/3 bg-login-screen backdrop-blur-lg bg-cover p-12 flex-col justify-between relative">
                <div className='p-[45px]'>
                    <h1 className="typography-h1 mt-8">HireHive</h1>
                    <p className="display-d2 max-w-xl">Discover, hire, and explore top talent with HireHive</p>
                    <p className='typography-body max-w-96'>Our advanced tools simplify job posting, application review, and career opportunities, ensuring you find the best candidates or land your next role effortlessly.</p>
                    <p className="mb-8"></p>
                </div>
                <div className="absolute bottom-12 left-12 flex space-x-4">
                    <StatsGrid stats={statsOne} />
                    <StatsGrid stats={statsTwo} />
                </div>

                <img src={sundarKanya} alt="Sundar Kanya" className="absolute bottom-0 right-0 w-1/2" />
            </div>

            {/* Right section with login form */}
            <div className="w-full lg:w-1/2 bg-background-30 p-28  flex flex-col justify-center">
                <h2 className="typography-h1 mb-2">Welcome Back</h2>
                <p className="typography-body mb-8">Login to your account below</p>

                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 flex items-center justify-center">
                    Continue with Google
                </button>

                <div className="flex items-center mb-4">
                    <hr className="flex-grow border-gray-600" />
                    <span className="px-3 text-gray-400">OR</span>
                    <hr className="flex-grow border-gray-600" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-teal-400" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input type="password" id="password" value={password}   onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full focus:outline-teal-400 p-2 rounded-lg bg-gray-800 text-white" />
                    </div>
                    <a href="#" className="text-blue-400 mb-4 block">Forgot Password?</a>
                    <Button type="submit" varinat="primary">Login</Button>
                </form>

                <p className="text-center">
                    Don't have an account? <a href="#" className="text-blue-400">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;