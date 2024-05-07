import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="flex gap-6 px-24 items-center bg-slate-500 text-white py-4 w-full h-[96px]">
                <div className="text-xl font-bold">
                    <Link to="/">HireHive</Link>
                </div>
                <div>
                    <Link to="/jobs" className="hover:text-gray-300">Jobs</Link>
                </div>
                <div>
                    <Link to="/candidates" className="hover:text-gray-300">Candidates</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Navbar;