import React from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    console.log("from dashabord her is the token", token)
    if (token == null) {
        return <Navigate to="/auth/login" replace />
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/auth/login');
    }
    const { auth } = useAuth();
    return (
        <div>
            <nav className="flex gap-6 px-24 items-center justify-between bg-slate-500 text-white py-4 w-full h-[96px]">
                <div className='flex w-1/2 gap-4 items-center'>
                    <div className="text-xl font-bold">
                        <Link to="/">HireHive</Link>
                    </div>
                    <div>
                        <Link to="/jobs" className="hover:text-gray-300">Jobs</Link>
                    </div>
                    <div>
                        <Link to="/candidates" className="hover:text-gray-300">Candidates</Link>
                    </div>
                </div>
                <div>
                    <button onClick={handleLogout} className="bg-black text-white font-bold py-2 px-4 rounded">LOGOUT</button>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Navbar;