import React, { useState } from 'react';
// import  useNavigate  from 'react-router-dom';
import Formfields from '../components/Formfields';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../http/api';

const Login = () => {
    // const navigate = useNavigate();
    // const [data, setData] = useState({ email: '', password: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log("this is on success", data);
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Email:', email);
        console.log('Password:', password);
        let data = { email, password };
        mutation.mutate(data);
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // console.log(email, password);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Save user data to local storage
    //     localStorage.setItem('user', JSON.stringify(formData));
    //     // Redirect to dashboard
    //     navigate('/dashboard');
    // };

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

                            {
                                mutation.isError && (
                                    <div className="text-red-500">
                                        {mutation.error.message}
                                    </div>
                                )
                            }


                            <button type="submit" className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>

                            {/* <input name= type="email" />
                            <Formfields name="email" type="email" label="Your Email" placeholder="name@company.com" value={data.email} onChange={handleInputChange} />
                            <Formfields name="password" type="password" label="Password" placeholder="••••••••" value={data.password} onChange={handleInputChange} /> */}
                            {/* <div className='flex flex-row-reverse'>
                                <span>Forgot Password?</span>
                            </div> */}
                            {/* <div>

<Link to={"/"}>
</Link>
</div> */}
                            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                New User? <a href="#" className="font-medium text-black hover:underline dark:text-primary-500">Sign Up</a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
