import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.svg"
import StyledMenu from './MUIUtilities/StyledMenu';
import IconWrapper from './Cards/IconWrapper';
import { Briefcase, FileText, LayoutGrid, LogOut, MonitorDot, Star, User, Users } from 'lucide-react';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../utility/config';
import { useSelector } from 'react-redux';

//Screen URLs with BG for All Admin personas
const ADMIN_BG_SCREENS = [
    '/admin/profile',
    '/admin/create-job',
    '/admin/edit-job',
    '/admin/jobs/edit-candidate',
    '/hiring-manager/create-job',
    '/hiring-manager/edit-job',
    '/hiring-manager/profile',
    '/hiring-manager/jobs/edit-candidate',
    '/design-reviewer/profile',
]

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();  // Get current route
    const { user } = useAuthContext(); // Get user data from the context

    const [anchorEl, setAnchorEl] = useState(null); // State to control dropdown menu
    const { refetch } = useAuth();

    const { newMembersCount } = useSelector(state => state.admin)

    // Get profile path based on user role
    const getProfilePath = () => {
        if (user?.role === 'Hiring Manager') {
            return '/hiring-manager/profile';
        } if (user?.role === 'Admin') {
            return '/admin/profile';
        }
        else if (user?.role === 'Design Reviewer') {
            return '/design-reviewer/profile';
        }
    };


    const handleLogout = async () => {
        try {
            await logout();
            refetch();
            navigate('/admin/login');
        } catch (error) {
            // console.error('Logout failed:', error);
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

    const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, iconData, children, hasHighlighter }) => (
        <div className="relative flex flex-row items-center justify-between hover:bg-background-60 rounded-xl ">
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `w-full flex items-center min-h-11 gap-2 pl-2 py-2 rounded-xl ${isActive || isPending ? "text-font-accent bg-background-60" : ""}`
                }
            >
                {({ isActive, isPending }) => (
                    <div className='flex items-center'>
                        {isActive || isPending ? <ActiveIcon count={iconData} /> : <Icon count={iconData} />}
                        <span className= 'typography-body'>{children}</span>
                    </div>
                )}
            </NavLink>
            {hasHighlighter && <p className='w-2 absolute right-4 h-2 rounded-full bg-blue-100'></p>}
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

        const itemComponents = [
            {
                onClick: handleMenuClose,
                content: () => (
                    <NavLink
                        to={profilePath}
                        className={({ isActive }) =>
                            `w-full flex items-center ${isActive ? "text-font-accent" : ""}  hover:bg-background-60 hover:text-font-accent px-4 py-2 rounded-xl `}
                    >
                        <IconWrapper inheritColor={true} size={0} customIconSize={5} icon={User} />
                        <span className='typography-body  ml-2 '>
                            Profile
                        </span>
                    </NavLink>
                )
            },
            {
                onClick: handleLogout,
                content: () => (
                    <div className='flex items-center hover:bg-background-60 hover:text-accent-100 px-4 py-2 w-full rounded-xl'>
                        <IconWrapper inheritColor={true} size={0} customIconSize={5} icon={LogOut} />
                        <span className='typography-body  ml-2'>
                            Logout
                        </span>
                    </div>
                )
            }
        ]

        return (
            <>
                <div className={`flex items-center px-2 py-1 relative  rounded-xl justify-start hover:bg-background-60 ${location.pathname === profilePath ? "bg-background-60" : ""}`}>
                    <IconButton
                        onClick={handleMenuClick}
                        className={`flex gap-2  ${location.pathname === profilePath ? "text-font-accent  " : ""}`}
                    >
                        <Avatar alt={user?.firstName + " " + user?.lastName} sx={{ width: "32px", height: "32px" }}
                            src={user?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL} />
                        <span className={`typography-body  ${location.pathname === profilePath ? "text-font-accent" : "text-white"} `}>{user?.firstName + " " + user?.lastName}</span>
                    </IconButton>
                    <div className={`absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${location.pathname === profilePath ? "bg-teal-400" : "bg-transparent"}`} />
                </div>
                <StyledMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} itemComponents={itemComponents} />

            </>
        );
    };

    const renderMenuItems = () => {
        if (user?.role === 'Hiring Manager') {
            return (
                <>
                    <NavItem to="/hiring-manager/jobs" icon={() => <IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={() => <IconWrapper isActiveIcon icon={Briefcase} />}> Jobs </NavItem>
                    <NavItem to="/hiring-manager/candidates" icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}>Candidates</NavItem>
                </>
            );
        }
        if (user?.role === 'Admin') {
            return (
                <>
                    <NavItem to="/admin/dashboard" icon={() => <IconWrapper isInActiveIcon icon={LayoutGrid} />} activeIcon={() => <IconWrapper isActiveIcon icon={LayoutGrid} />}> Dashboard </NavItem>
                    <NavItem to="/admin/jobs" icon={() => <IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={() => <IconWrapper isActiveIcon icon={Briefcase} />}>Jobs</NavItem>
                    <NavItem to="/admin/candidates" icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}>All Candidates</NavItem>
                    <NavItem to="/admin/shortlisted" icon={() => <IconWrapper isInActiveIcon icon={MonitorDot} />} activeIcon={() => <IconWrapper isActiveIcon icon={MonitorDot} />}>Future Gems</NavItem>
                    <NavItem to="/admin/teams" hasHighlighter={newMembersCount > 0} icon={() => <IconWrapper isInActiveIcon icon={FileText} />} activeIcon={() => <IconWrapper isActiveIcon icon={FileText} />}>Teams</NavItem>
                </>
            );
        }
        else if (user?.role === 'Design Reviewer') {
            return (
                <>
                    {/* <NavItem to="/design-reviewer/dashboard" icon={DashboardIcon} activeIcon={DashboardIconActive}>Dashboard</NavItem> */}
                    <NavItem to="/design-reviewer/candidates" icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}>Candidates</NavItem>
                    <NavItem to="/design-reviewer/reviews" icon={() => <IconWrapper isInActiveIcon icon={Star} />} activeIcon={() => <IconWrapper isActiveIcon icon={Star} />}>Reviews</NavItem>
                </>
            );
        }
        return null;
    };

    //To get the exact path
    const { pathname } = useLocation()

    return (
        <div id='adminContainer' className={`flex ${ADMIN_BG_SCREENS.some(path => pathname.startsWith(path)) ? ' bg-background-80 ' : ' bg-background-80 '} bg-cover bg-top h-full overflow-x-hidden `}>
            <div className="fixed flex  w-[15rem] h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-background-100 text-font-gray typography-large-p justify-between py-4 ">
                <div className='flex flex-col gap-5 typography-body px-4'>
                    <div className=' pl-2 pt-4 pb-4 flex '>
                        <img className='h-11' src={LightLogo} />
                    </div>
                    {renderMenuItems()}
                </div>
                <div className='flex flex-col gap-2 mx-4'>
                    {user && renderProfileMenu()}
                </div>
            </div>

            <div className='ml-[16rem] w-[calc(100%-16rem)] flex justify-center min-h-screen'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;