import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    // const token = localStorage.getItem('accessToken');
    // console.log("from dashabord her is the token", token)
    // if (token == null) {
    //     return <Navigate to="/auth/login" replace />
    // }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/auth/login');
    }
    const { auth } = useAuth();
    return (
        <div className='flex flex-col bg-background-30 '  >

            <div className="fixed flex h-screen w-48 flex-col gap-6 bg-background-100 text-white justify-between py-4 px-4">
                <div className='items-center'>
                    <div className="text-xl font-bold">
                        <Link to="">HireHive</Link>
                    </div>
                    <div>
                        <Link to="" className="hover:text-gray-300">Dashboard</Link>
                    </div>
                    <div>
                        <Link to="jobs" className="hover:text-gray-300">Jobs</Link>
                    </div>
                    <div>
                        <Link to="candidates" className="hover:text-gray-300">Candidates</Link>
                    </div>
                    <div>
                        <Link to="candidates" className="hover:text-gray-300">Reviews</Link>
                    </div>
                    <div>
                        <Link to="candidates" className="hover:text-gray-300">Reports</Link>
                    </div>
                </div>
                <div>
                    <button onClick={handleLogout} className="bg-black text-white font-bold py-2 px-4 rounded">LOGOUT</button>
                </div>
            </div>



            <Outlet />


        </div>
    );
};

export default Navbar;