import React from 'react';
import useNavigate  from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        // Navigate to login page
        navigate('/login');
    };

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Welcome to Dashboard
                        </h1>
                        <p className="text-lg text-gray-900 dark:text-white">User Email: {userData?.email}</p>
                        <button onClick={handleLogout} className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logout</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
