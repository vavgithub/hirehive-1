import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.svg"
import StyledMenu from './MUIUtilities/StyledMenu';
import IconWrapper from './Cards/IconWrapper';
import { Briefcase, FileText, LayoutGrid, LogOut, Star, User, Users } from 'lucide-react';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../utility/config';
import { BookmarkFilledIcon, BookmarkIcon } from '../svg/Checkboxes/BookmarkIcons';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();  // Get current route
    const { user } = useAuthContext(); // Get user data from the context

    const [anchorEl, setAnchorEl] = useState(null); // State to control dropdown menu
    const { refetch } = useAuth();

    // Get profile path based on user role
    const getProfilePath = () => {
        if (user?.role === 'Hiring Manager') {
            return '/hiring-manager/profile';
        } if(user?.role === 'Admin'){
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

    const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, iconData, children }) => (
        <div className="relative flex flex-row items-center justify-between hover:bg-background-60 rounded-xl mx-2">
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

        const itemComponents = [
            {
              onClick : handleMenuClose,
              content : () => (
                <NavLink
                to={profilePath}
                className={({ isActive }) =>
                    `w-full flex items-center ${isActive ? "text-font-accent" : ""}  hover:bg-background-60 hover:text-font-accent px-4 py-2 rounded-xl `}
                >
                    <IconWrapper inheritColor={true} size={0} customIconSize={5}  icon={User} />
                    <span className='typography-body  ml-2 font-outfit'>
                        Profile
                    </span>
                </NavLink>
              )
            },
            {
              onClick : handleLogout,
              content : () => (
                <div className='flex items-center hover:bg-background-60 hover:text-accent-100 px-4 py-2 w-full rounded-xl'>
                    <IconWrapper inheritColor={true} size={0} customIconSize={5}  icon={LogOut} />
                    <span className='typography-body  ml-2 font-outfit'>
                        Logout
                    </span>
                </div>
              )
            }
          ]

        return (
            <>
                <div className={`flex items-center px-2 py-1 mx-2 rounded-xl justify-start hover:bg-background-60 ${location.pathname === profilePath ? "bg-background-60" : ""}`}>
                    <IconButton
                        onClick={handleMenuClick}
                        className={`flex gap-2  ${location.pathname === profilePath ? "text-font-accent  " : ""}`}
                    >
                        <Avatar alt={user?.name} sx={{ width: "32px", height: "32px" }}
                            src={user?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL } />
                        <span className={`typography-body  ${location.pathname === profilePath ? "text-font-accent" : "text-white"} `}>{user?.name}</span>
                    </IconButton>
                    <div className={`absolute right-2 w-1 h-6 rounded-tl-xl rounded-bl-xl ${location.pathname === profilePath ? "bg-teal-400" : "bg-transparent"}`} />
                </div>
                <StyledMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} itemComponents={itemComponents} />
                
            </>
        );
    };

    const renderMenuItems = () => {
        if (user?.role ==='Hiring Manager') {
            return (
                <>
                    {/* <NavItem to="/admin/dashboard" icon={DashboardIcon} activeIcon={DashboardIconActive}>Dashboard</NavItem> */}
                    <NavItem to="/hiring-manager/jobs" icon={()=><IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={()=><IconWrapper isActiveIcon icon={Briefcase} />}>Jobs</NavItem>
                    <NavItem to="/hiring-manager/candidates" icon={()=><IconWrapper isInActiveIcon icon={Users} />} activeIcon={()=><IconWrapper isActiveIcon icon={Users} />}>Candidates</NavItem>
                    {/* <NavItem to="/admin/reviews" icon={ReviewsIcon} activeIcon={ReviewsIconActive}>Reviews</NavItem>
                    <NavItem to="/admin/reports" icon={ReportsIcon} activeIcon={ReportsIconActive}>Reports</NavItem> */}
                </>
            );
        } 
        if(user?.role === 'Admin'){
            return (
                <>
                    <NavItem to="/admin/dashboard" icon={()=><IconWrapper isInActiveIcon icon={LayoutGrid} />} activeIcon={()=><IconWrapper isActiveIcon icon={LayoutGrid} />}>Dashboard</NavItem>
                    <NavItem to="/admin/jobs" icon={()=><IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={()=><IconWrapper isActiveIcon icon={Briefcase} />}>Jobs</NavItem>
                    <NavItem to="/admin/candidates" icon={()=><IconWrapper isInActiveIcon icon={Users} />} activeIcon={()=><IconWrapper isActiveIcon icon={Users} />}>All Candidates</NavItem>
                    <NavItem to="/admin/shortlisted" icon={BookmarkIcon} activeIcon={BookmarkFilledIcon}>Future Gems</NavItem>
                    <NavItem to="/admin/teams" icon={()=><IconWrapper isInActiveIcon icon={FileText} />} activeIcon={()=><IconWrapper isActiveIcon icon={FileText} />}>Teams</NavItem>
                    {/* <NavItem to="/admin/reviews" icon={ReviewsIcon} activeIcon={ReviewsIconActive}>Reviews</NavItem> */}
                    {/* <NavItem to="/admin/reviews" icon={ReviewsIcon} activeIcon={ReviewsIconActive}>Reviews</NavItem>
                    <NavItem to="/admin/reports" icon={ReportsIcon} activeIcon={ReportsIconActive}>Reports</NavItem> */}
                </>
            );
        }
        else if (user?.role === 'Design Reviewer') {
            return (
                <>
                    {/* <NavItem to="/design-reviewer/dashboard" icon={DashboardIcon} activeIcon={DashboardIconActive}>Dashboard</NavItem> */}
                    <NavItem to="/design-reviewer/candidates" icon={()=><IconWrapper isInActiveIcon icon={Users} />} activeIcon={()=><IconWrapper isActiveIcon icon={Users} />}>Candidates</NavItem>
                    <NavItem to="/design-reviewer/reviews" icon={()=><IconWrapper isInActiveIcon icon={Star} />} activeIcon={()=><IconWrapper isActiveIcon icon={Star} />}>Reviews</NavItem>
                </>
            );
        }
        return null;
    };

    return (
        <div id='adminContainer' className='flex bg-main-bg bg-cover bg-top h-full overflow-x-hidden '>
            <div className="fixed flex min-h-screen w-[16rem] flex-col gap-6 bg-background-100 text-font-gray typography-large-p justify-between py-4 ">
                <div className='flex flex-col gap-5 typography-body'>
                <div className='p-2 flex '>
                <img className='h-11' src={LightLogo}/>
                </div>
                    {renderMenuItems()}
                </div> 
                <div className='flex flex-col gap-2'>
                    {user && renderProfileMenu()}
                </div>
            </div>

            <div className='ml-[16rem] w-[calc(100vw-16rem)] flex justify-center min-h-screen'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;