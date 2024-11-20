import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';
import { JobsIcon, JobsIconActive } from '../svg/Navbar/JobsIcon';
import { CandidatesIcon, CandidatesIconActive } from '../svg/Navbar/CandidatesIcon';
import { ReviewsIcon, ReviewsIconActive } from '../svg/Navbar/ReviewsIcon';
import { ReportsIcon, ReportsIconActive } from '../svg/Navbar/ReportsIcon';
import Profile from '../svg/Buttons/Profile';
import Logout from '../svg/Buttons/Logout';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.svg"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();  // Get current route
    const { user } = useAuthContext(); // Get user data from the context

    console.log(user);

    const [anchorEl, setAnchorEl] = useState(null); // State to control dropdown menu
    const { refetch } = useAuth();

    // Get profile path based on user role
    const getProfilePath = () => {
        if (user?.role === 'Hiring Manager') {
            return '/admin/profile';
        } else if (user?.role === 'Design Reviewer') {
            return '/design-reviewer/profile';
        }
        return '/admin/profile'; // Default fallback
    };


    const handleLogout = async () => {
        try {
            await logout();
            refetch();
            navigate('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Function to handle dropdown menu opening
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the element that opens the menu
    };

    // Function to handle dropdown menu closing
    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, children }) => (
        <div className="relative flex flex-row items-center justify-between hover:bg-background-60">
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
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
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive || isPending ? "bg-teal-400" : "bg-transparent"}`
                }
            />
        </div>
    );

    // Adding Profile and Logout dropdown logic
    const renderProfileMenu = () => {
        const profilePath = getProfilePath();

        return (
            <>
                <div className={`flex items-center px-2 justify-start hover:bg-background-60`}>
                    <IconButton
                        onClick={handleMenuClick}
                        className={`flex gap-2  ${location.pathname === profilePath ? "text-font-accent" : ""}`}
                    >
                        <Avatar alt={user?.name} sx={{ width: "32px", height: "32px" }}
                            src={user?.profilePicture} />
                        <span className='typography-body text-white'>{user?.name}</span>
                    </IconButton>
                    <div className={`absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${location.pathname === profilePath ? "bg-teal-400" : "bg-transparent"}`} />
                </div>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        "& .MuiList-root": {
                            backgroundColor: 'rgba(12, 13, 13, 1)',
                            borderColor: 'rgba(12, 13, 13, 1)',
                            color: "white",
                            font: "Outfit"
                        }
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>
                        <NavLink
                            to={profilePath}
                            className={({ isActive }) =>
                                `w-full flex items-center ${isActive ? "text-font-accent" : ""}`}
                        >
                            <Profile />
                            <span className='typography-large ml-2'>
                                Profile
                            </span>
                        </NavLink>
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                        <Logout />
                        <span className='typography-large ml-2'>
                            Logout
                        </span>
                    </MenuItem>
                </Menu>
            </>
        );
    };

    const renderMenuItems = () => {
        if (user?.role === 'Hiring Manager') {
            return (
                <>
                    <NavItem to="/admin/dashboard" icon={DashboardIcon} activeIcon={DashboardIconActive}>Dashboard</NavItem>
                    <NavItem to="/admin/jobs" icon={JobsIcon} activeIcon={JobsIconActive}>Jobs</NavItem>
                    <NavItem to="/admin/candidates" icon={CandidatesIcon} activeIcon={CandidatesIconActive}>Candidates</NavItem>
                    <NavItem to="/admin/reviews" icon={ReviewsIcon} activeIcon={ReviewsIconActive}>Reviews</NavItem>
                    <NavItem to="/admin/reports" icon={ReportsIcon} activeIcon={ReportsIconActive}>Reports</NavItem>
                </>
            );
        } else if (user?.role === 'Design Reviewer') {
            return (
                <>
                    <NavItem to="/design-reviewer/dashboard" icon={DashboardIcon} activeIcon={DashboardIconActive}>Dashboard</NavItem>
                    <NavItem to="/design-reviewer/candidates" icon={CandidatesIcon} activeIcon={CandidatesIconActive}>Candidates</NavItem>
                    <NavItem to="/design-reviewer/reviews" icon={ReviewsIcon} activeIcon={ReviewsIconActive}>Reviews</NavItem>
                </>
            );
        }
        return null;
    };

    return (
        <div className='flex bg-main-bg bg-cover bg-top h-full overflow-x-hidden'>
            <div className="fixed flex h-screen w-48 flex-col gap-6 bg-background-100 text-font-gray typography-large-p justify-between py-4 ">
                <div className='flex flex-col gap-5 typography-body'>
                <div className='p-2 flex justify-center'>

                <img className='h-12' src={LightLogo}/>
                </div>
                    {renderMenuItems()}
                </div>
                <div>
                    {user && renderProfileMenu()}
                </div>
            </div>

            <div className='ml-[192px] w-full h-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;