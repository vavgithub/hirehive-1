import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../api/authApi';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.svg"
import StyledMenu from './MUIUtilities/StyledMenu';
import IconWrapper from './Cards/IconWrapper';
import { Briefcase, ChevronDown, ChevronUp, ClipboardCheck, FileText, LayoutGrid, LogOut, MonitorDot, Star, User, Users } from 'lucide-react';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../utility/config';
import { useSelector } from 'react-redux';
import { getRoute, hasRoutePermission, ROUTE_KEY } from '../config/permissions.config';

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
        return getRoute(user?.role,ROUTE_KEY.PROFILE);
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
        <div className="relative flex flex-row items-center justify-between  rounded-xl ">
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `w-full flex items-center min-h-11 gap-2 pl-2 py-2 rounded-xl hover:bg-background-60 ${isActive || isPending ? " selection-primary " : ""}`
                }
            >
                {({ isActive, isPending }) => (
                    <div className='flex items-center gap-2'>
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

    const DropDownNavItem = ({
    to,
    icon: Icon,
    activeIcon: ActiveIcon,
    iconData,
    children,
    hasHighlighter,
    submenu = []
    }) => {
    const { pathname } = useLocation();
    const isActive = pathname.startsWith(to);
    const [isOpen, setIsOpen] = useState(isActive);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative flex flex-col rounded-xl">
        {/* Parent menu item */}
        <div
            onClick={toggleDropdown}
            className={`cursor-pointer w-full flex items-center justify-between min-h-11 gap-2 pl-2 pr-3 py-2 rounded-xl hover:bg-background-60 ${isActive ? 'selection-primary' : ''}`}
        >
            <div className="flex items-center gap-2">
            {isActive ? <ActiveIcon count={iconData} /> : <Icon count={iconData} />}
            <span className="typography-body">{children}</span>
            </div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {hasHighlighter && (
            <p className="w-2 absolute right-4 h-2 rounded-full bg-blue-100"></p>
        )}
        <div
            className={`absolute top-[18px] right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive ? 'bg-teal-400' : 'bg-transparent'}`}
        />

        {/* Submenu items */}
        {isOpen && (
        <div className={"relative ml-6 mt-2 flex flex-col gap-2 vertical-dashed-line " + (isActive && 'line-open')}>
            {submenu.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-2 rounded-xl hover:bg-background-60 typography-body ${
                    isActive ? 'text-font-accent selection-primary' : ''
                }`
                }
            >
                {({ isActive, isPending }) => (
                <>
                    {(isActive && item.activeIcon) ? <item.activeIcon /> : <item.icon />}
                    {item.label}
                </>
                )}
            </NavLink>
            ))}
        </div>
        )}
        </div>
    );
    };


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
                <div className={`flex items-center px-2 py-1 relative  rounded-xl justify-start hover:bg-background-60 ${location.pathname === profilePath ? "selection-primary" : ""}`}>
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
        const jobsSubMenu = [
            {
                to : getRoute(user.role,ROUTE_KEY.ALLJOBS),
                label : 'All Jobs',
                icon : () => <IconWrapper isInActiveIcon icon={Briefcase} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={Briefcase}/>
            },
            {
                to : getRoute(user.role,ROUTE_KEY.ASSESSMENTS),
                label : 'Assessments',
                icon : () => <IconWrapper isInActiveIcon icon={ClipboardCheck} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={ClipboardCheck}/>
            }
        ]

        const candidatesSubMenu = [
            {
                to : getRoute(user.role,ROUTE_KEY.ALL_CANDIDATES),
                label : 'All Candidates',
                icon : () => <IconWrapper isInActiveIcon icon={Users} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={Users}/>
            },
            {
                to : getRoute(user.role,ROUTE_KEY.SHORTLISTED),
                label : 'Future Gems',
                icon : () => <IconWrapper isInActiveIcon icon={MonitorDot} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={MonitorDot}/>
            }
        ]

        return(
            <>
                {user?.role === "Admin" && <NavItem to={getRoute(user.role,ROUTE_KEY.DASHBOARD)} icon={() => <IconWrapper isInActiveIcon icon={LayoutGrid} />} activeIcon={() => <IconWrapper isActiveIcon icon={LayoutGrid} />}> Dashboard </NavItem>}
                {/* {hasRoutePermission(user?.role,ROUTE_KEY.JOBS) && <NavItem to={getRoute(user.role,ROUTE_KEY.JOBS)} icon={() => <IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={() => <IconWrapper isActiveIcon icon={Briefcase} />}> Jobs </NavItem>} */}
                {hasRoutePermission(user?.role,ROUTE_KEY.JOBS) && <DropDownNavItem to={getRoute(user.role,ROUTE_KEY.JOBS)} submenu={jobsSubMenu} icon={() => <IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={() => <IconWrapper isActiveIcon icon={Briefcase} />}> Jobs </DropDownNavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.CANDIDATES) && (hasRoutePermission(user?.role,ROUTE_KEY.ALL_CANDIDATES) && hasRoutePermission(user?.role,ROUTE_KEY.SHORTLISTED)) ?
                 <DropDownNavItem to={getRoute(user.role,ROUTE_KEY.CANDIDATES)} submenu={candidatesSubMenu} icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}>Candidates</DropDownNavItem> 
                 :<NavItem to={getRoute(user.role,ROUTE_KEY.CANDIDATES)} icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}> Candidates </NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.REVIEWS) && <NavItem to={getRoute(user.role,ROUTE_KEY.REVIEWS)} icon={() => <IconWrapper isInActiveIcon icon={Star} />} activeIcon={() => <IconWrapper isActiveIcon icon={Star} />}>Reviews</NavItem>}
                {/* {hasRoutePermission(user?.role,ROUTE_KEY.SHORTLISTED) && <NavItem to={getRoute(user.role,ROUTE_KEY.SHORTLISTED)} icon={() => <IconWrapper isInActiveIcon icon={MonitorDot} />} activeIcon={() => <IconWrapper isActiveIcon icon={MonitorDot} />}>Future Gems</NavItem>} */}
                {hasRoutePermission(user?.role,ROUTE_KEY.TEAMS) && <NavItem to={getRoute(user.role,ROUTE_KEY.TEAMS)} hasHighlighter={newMembersCount > 0} icon={() => <IconWrapper isInActiveIcon icon={FileText} />} activeIcon={() => <IconWrapper isActiveIcon icon={FileText} />}>Teams</NavItem>}
            </>
        )
    };

    //To get the exact path
    const { pathname } = useLocation()

    return (
        <div id='adminContainer' className={`flex ${ADMIN_BG_SCREENS.some(path => pathname.startsWith(path)) ? ' bg-background-100 ' : ' bg-background-100 '} bg-cover bg-top h-full overflow-x-hidden `}>
            <div className="fixed flex  w-[15rem] h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-background-90 text-font-gray typography-large-p justify-between py-6 ">
                <div className='flex flex-col gap-6 typography-body px-4'>
                    <div className=' pl-2 pt-2 pb-4 flex '>
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