import React, { useEffect, useRef, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
const LOGIN_URL = 'api/v1/users/login';

const Login = () => {
    const { auth ,setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

             // Directly use response.data without parsing it again
        const result = response.data;
        console.log(result);

        setAuth({ email: result.data.user.email, password: result.data.user.password });
        console.log('Auth:', { email: result.data.user.email, accessToken: result.data.accessToken});

        // Store the access token in localStorage
        localStorage.setItem('accessToken', result.data.accessToken);

        // Store the access token in a cookie
        document.cookie = `accessToken=${result.data.accessToken}; path=/; secure`;

        
        navigate('/');
        setEmail('');
        setPassword('');
        }
        catch (error) {
            console.log(error);
             if (error.response.status == 401) {
                 errRef.current.innerText = 'Invalid email or password';
             } else if (error.response.status == 404) {
                 errRef.current.innerText = 'Email not found';
             } else if (error.response.status == 400) {
                 errRef.current.innerText = 'Email is required';
             }
             errRef.current.focus();
        }
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);



    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            HireHive
                        </h1>
                        <div className='flex'>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    ref={userRef}
                                    autoComplete='off'
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <p ref={errRef} className='text-red-600' >{errMsg}</p>



                            <button type="submit" className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
