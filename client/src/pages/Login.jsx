import React, { useState } from 'react';
// import  useNavigate  from 'react-router-dom';
import Formfields from '../components/Formfields';
import { Link } from 'react-router-dom';

const Login = () => {
    // const navigate = useNavigate();
    const [data , setData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // console.log(email, password);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify(formData));
        // Redirect to dashboard
        navigate('/dashboard');
    };

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
                            <Formfields name="email" type="email" label="Your Email" placeholder="name@company.com" value={data.email} onChange={handleInputChange} />
                            <Formfields name="password" type="password" label="Password" placeholder="••••••••" value={data.password} onChange={handleInputChange} />
                            {/* <div className='flex flex-row-reverse'>
                                <span>Forgot Password?</span>
                            </div> */}
                            <div>

                            <Link to={"/dashboard"}>
                            <button type="submit" className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </Link>
                            </div>
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
