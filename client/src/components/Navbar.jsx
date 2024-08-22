import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/auth/login');
    }

    const NavItem = ({ to,icon: Icon, activeIcon: ActiveIcon, children }) => (
        <div className="relative flex flex-row items-center justify-between hover:bg-background-60">
            <NavLink 
                to={to} 
                end={to === "/admin/dashboard"}
                className={({ isActive, isPending }) => 
                    `w-full flex items-center gap-2 pl-2 ${isActive || isPending ? "text-font-accent" : ""}`
                }
            >
                 {({ isActive, isPending }) => (
                    <div className='flex items-center'>
                        {isActive || isPending ? <ActiveIcon /> : <Icon />}
                        <span>{children}</span>
                    </div>
                )}
            </NavLink>
            <NavLink 
                to={to} 
                end={to === "/admin/dashboard"}
                className={({ isActive, isPending }) => 
                    `absolute right-0 w-2 h-8  rounded-tl-xl rounded-bl-xl  ${isActive || isPending ? "bg-teal-400" : "bg-transparent"}`
                }
            />
        </div>
    );

    return (
        <div className='flex bg-main-bg bg-cover bg-top h-full'>
            <div className="fixed flex h-screen z-[50000] w-48 flex-col gap-6 bg-background-100 text-font-gray typography-large-p justify-between py-4 ">
                <div className='flex flex-col gap-5 typography-body'>
                    <NavItem to="/admin/dashboard"  icon={DashboardIcon}  activeIcon={DashboardIconActive}>Dashboard</NavItem>
                    <NavItem to="/admin/jobs" icon={DashboardIcon}  activeIcon={DashboardIconActive}>Jobs</NavItem>
                    <NavItem to="/admin/candidates" icon={DashboardIcon}  activeIcon={DashboardIconActive}>Candidates</NavItem>
                    <NavItem to="/admin/reviews" icon={DashboardIcon}  activeIcon={DashboardIconActive}>Reviews</NavItem>
                    <NavItem to="/admin/reports" icon={DashboardIcon}  activeIcon={DashboardIconActive}>Reports</NavItem>
                </div>
                <div>
                    {/* <button onClick={handleLogout} className="bg-black text-white font-bold py-2 px-4 rounded">LOGOUT</button> */}
                </div>
            </div>

            <div className='ml-[192px] w-full h-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;