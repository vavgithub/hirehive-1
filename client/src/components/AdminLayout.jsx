import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../services/auth.service';
import * as Sentry from '@sentry/react';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.png"
import StyledMenu from './MUIUtilities/StyledMenu';
import IconWrapper from './Cards/IconWrapper';
import { Briefcase, CalendarDays, ChevronDown, ChevronUp, ClipboardCheck, CreditCard, FileText, IdCard, LayoutGrid, LogOut, MonitorDot, Settings, Star, User, UserCheck, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getRoute, hasRoutePermission, ROLES, ROUTE_KEY } from '../config/permissions.config';
import Footer from './Footer/Footer';
import ThemeToggle from './ui/ThemeToggle';
import { useLogo, useUnknownProfilePicture } from '../context/ThemeContext';
// import ThemeToggle from './ThemeToggle'; // Import ThemeToggle component
import { useQueryClient } from '@tanstack/react-query';

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
    const { user , setUser } = useAuthContext(); // Get user data from the context

    const [anchorEl, setAnchorEl] = useState(null);
    const { refetch } = useAuth();
    const queryClient = useQueryClient();

    const { newMembersCount } = useSelector(state => state.admin)

    // Get profile path based on user role
    const getProfilePath = () => {
        return getRoute(user?.role, ROUTE_KEY.PROFILE);
    };

    const handleLogout = async () => {
        try {
            await logout();
            Sentry.setUser(null);
            setUser(null)
            refetch();
            queryClient.clear()
            navigate('/admin/login');
        } catch (error) {
            // console.error('Logout failed:', error);
        }
    };
    const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture();

    // Function to handle dropdown menu opening
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle dropdown menu closing
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, iconData, children, hasHighlighter , isBold  = false, isPrimaryColor = false}) => (
        <div className="relative flex flex-row items-center justify-between  rounded-xl ">
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `w-full flex items-center min-h-11 gap-2 pl-2 py-2 rounded-xl hover:outline-accent-100 hover:outline hover:outline-2  ${isActive || isPending ? ` selection-primary ` : isPrimaryColor ? 'text-white' : ""}`
                }
            >
                {({ isActive, isPending }) => (
                    <div className='flex items-center gap-2'>
                        {isActive || isPending ? <ActiveIcon count={iconData} /> : <Icon count={iconData} />}
                        <span className= {(isBold ? 'font-semibold typography-h6' : ' typography-body ') +' '}>{children}</span>
                    </div>
                )}
            </NavLink>
            {hasHighlighter && <p className='w-2 absolute right-4 h-2 rounded-full bg-blue-100'></p>}
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive || isPending ? "bg-accent-100" : "bg-transparent"}`
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
                    className={`cursor-pointer w-full flex items-center justify-between min-h-11 gap-2 pl-2 pr-3 py-2 rounded-xl hover:outline-accent-100 hover:outline hover:outline-2  ${isActive ? 'selection-primary bg-transparent' : ''}`}
                >
                    <div className="flex items-center gap-2">
                        {isActive ? <ActiveIcon count={iconData} /> : <Icon count={iconData} />}
                        <span className="typography-body ">{children}</span>
                    </div>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {hasHighlighter && (
                    <p className="w-2 absolute right-4 h-2 rounded-full bg-blue-100"></p>
                )}

                {/* Submenu items */}
                {isOpen && (
                    <div className={"relative ml-10 mt-2 flex flex-col gap-2  " + (isActive && 'line-open')}>
                        {submenu.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 py-2 px-2 relative rounded-xl hover:outline-accent-100 hover:outline hover:outline-2  typography-body  ${isActive ? 'text-font-accent selection-primary' : ''
                                    }`
                                }
                            >
                                {({ isActive, isPending }) => (
                                    <>
                                        {(isActive && item.activeIcon) ? <item.activeIcon /> : <item.icon />}
                                        {item.label}
                                        {isActive && <div
                                            className={`absolute top-[18px] right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive ? 'bg-accent-100' : 'bg-transparent'}`}
                                        />}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const GreenDot = () => <div className='bg-teal-100 w-6 h-6 rounded-full m-[10px]'></div>

    // Adding Profile and Logout dropdown logic
    const renderProfileMenu = () => {
        const profilePath = getProfilePath();

        const itemComponents = [
            ...(hasRoutePermission(user?.role,ROUTE_KEY.COMPANY_PROFILE_VIEW) ? [{
                onClick : () => navigate(getRoute(user.role,ROUTE_KEY.COMPANY_PROFILE_VIEW)),
                content : () => (
                    <NavLink
                        to={getRoute(user.role,ROUTE_KEY.COMPANY_PROFILE_VIEW)}
                        className={({ isActive }) =>
                            `w-full flex items-center ${isActive ? " selection-primary " : ""}    hover:text-font-accent px-4 py-2 rounded-xl `}
                    >
                        <Avatar alt={user?.companyDetails?.name} sx={{ width: "32px", height: "32px" }}
                            src={user?.companyDetails?.logoUrl || UNKNOWN_PROFILE_PICTURE_URL} />
                        <span className='typography-h4  ml-2 overflow-hidden whitespace-nowrap text-ellipsis'>
                            {user?.companyDetails?.name}
                        </span>
                    </NavLink>)
            }] : {}),
            {
                onClick: handleMenuClose,
                content: () => (
                    <NavLink
                        to={profilePath}
                        className={({ isActive }) =>
                            `w-full flex items-center ${isActive ? " selection-primary " : ""}    hover:text-font-accent px-4 py-2 rounded-xl `}
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
                    <div className='flex items-center   hover:text-accent-100 px-4 py-2 w-full rounded-xl'>
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
                <div className={`flex items-center px-2 py-1 relative  rounded-xl justify-start hover:outline-accent-100 hover:outline hover:outline-2  ${location.pathname === profilePath ? "selection-primary" : ""}`}>
                    <IconButton
                        onClick={handleMenuClick}
                        className={`flex gap-2  ${location.pathname === profilePath ? "text-font-accent  " : ""}`}
                    >
                        <Avatar alt={user?.firstName + " " + user?.lastName}
                            src={user?.profilePicture || UNKNOWN_PROFILE_PICTURE_URL} />
                        <span className={`typography-body  ${location.pathname === profilePath ? "text-font-accent" : "text-font-main"} `}>{user?.firstName + " " + user?.lastName}</span>
                    </IconButton>
                    <div className={`absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${location.pathname === profilePath ? "bg-accent-100" : "bg-transparent"}`} />
                </div>
                <StyledMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} itemComponents={itemComponents} />
            </>
        );
    };

    const renderBottomMenu = () => {
        return (
            <>
                {hasRoutePermission(user.role, ROUTE_KEY.MANAGE_PLAN) && <NavItem to={getRoute(user.role, ROUTE_KEY.MANAGE_PLAN)} icon={() => <IconWrapper inheritColor icon={CreditCard} />} activeIcon={() => <IconWrapper inheritColor icon={CreditCard} />}> Manage Plan </NavItem>}
                {hasRoutePermission(user.role, ROUTE_KEY.SETTINGS) && <NavItem to={getRoute(user.role, ROUTE_KEY.SETTINGS)} icon={() => <IconWrapper inheritColor icon={Settings} />} activeIcon={() => <IconWrapper inheritColor icon={Settings} />}> Settings </NavItem>}
            </>
        )
    }

    const renderMenuItems = () => {
        const jobsSubMenu = [
            ...(hasRoutePermission(user.role, ROUTE_KEY.ALLJOBS) ? [{
                to: getRoute(user.role, ROUTE_KEY.ALLJOBS),
                label: 'All Jobs',
                icon: () => <IconWrapper inheritColor icon={Briefcase} />,
                activeIcon: () => <IconWrapper inheritColor icon={Briefcase} />
            }] : []),
            ...(hasRoutePermission(user.role, ROUTE_KEY.ASSESSMENTS) ? [{
                to: getRoute(user.role, ROUTE_KEY.ASSESSMENTS),
                label: 'Assessments',
                icon: () => <IconWrapper inheritColor icon={ClipboardCheck} />,
                activeIcon: () => <IconWrapper inheritColor icon={ClipboardCheck} />
            }] : [])
        ]

        const candidatesSubMenu = [
            ...(hasRoutePermission(user.role, ROUTE_KEY.ALL_CANDIDATES) ? [{
                to: getRoute(user.role, ROUTE_KEY.ALL_CANDIDATES),
                label: user?.role === ROLES.DESIGN_REVIEWER ? 'Candidates' : 'All Candidates',
                icon: () => <IconWrapper inheritColor icon={Users} />,
                activeIcon: () => <IconWrapper inheritColor icon={Users} />
            }] : []),
            ...(hasRoutePermission(user.role, ROUTE_KEY.SHORTLISTED) ? [{
                to: getRoute(user.role, ROUTE_KEY.SHORTLISTED),
                label: 'Future Gems',
                icon: () => <IconWrapper inheritColor icon={UserCheck} />,
                activeIcon: () => <IconWrapper inheritColor icon={UserCheck} />
            }] : [])
        ]

        return (
            <>
                {user?.role === "Admin" && <NavItem to={getRoute(user.role, ROUTE_KEY.DASHBOARD)} icon={() => <IconWrapper inheritColor icon={LayoutGrid} />} activeIcon={() => <IconWrapper inheritColor icon={LayoutGrid} />}> Dashboard </NavItem>}
                {hasRoutePermission(user?.role, ROUTE_KEY.JOBS) && ((jobsSubMenu?.length > 1)
                    ? <DropDownNavItem to={getRoute(user.role, ROUTE_KEY.JOBS)} submenu={jobsSubMenu} icon={() => <IconWrapper inheritColor icon={Briefcase} />} activeIcon={() => <IconWrapper inheritColor icon={Briefcase} />}> Jobs </DropDownNavItem>
                    : <NavItem to={jobsSubMenu[0]?.to} icon={jobsSubMenu[0]?.icon} activeIcon={jobsSubMenu[0]?.activeIcon}> {jobsSubMenu[0]?.label} </NavItem>)}
                {hasRoutePermission(user?.role, ROUTE_KEY.CANDIDATES) && (candidatesSubMenu?.length > 1) ?
                    <DropDownNavItem to={getRoute(user.role, ROUTE_KEY.CANDIDATES)} submenu={candidatesSubMenu} icon={() => <IconWrapper inheritColor icon={Users} />} activeIcon={() => <IconWrapper inheritColor icon={Users} />}>Candidates</DropDownNavItem>
                    : <NavItem to={candidatesSubMenu[0]?.to} icon={candidatesSubMenu[0]?.icon} activeIcon={candidatesSubMenu[0]?.activeIcon}> {candidatesSubMenu[0]?.label}</NavItem>}
                {hasRoutePermission(user?.role, ROUTE_KEY.REVIEWS) && <NavItem to={getRoute(user.role, ROUTE_KEY.REVIEWS)} icon={() => <IconWrapper inheritColor icon={Star} />} activeIcon={() => <IconWrapper inheritColor icon={Star} />}>Reviews</NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.CALENDAR) && <NavItem to={getRoute(user.role,ROUTE_KEY.CALENDAR)} icon={() => <IconWrapper inheritColor icon={CalendarDays} />} activeIcon={() => <IconWrapper inheritColor icon={CalendarDays} />}>Calendar</NavItem>}
                {hasRoutePermission(user?.role, ROUTE_KEY.TEAMS) && <NavItem to={getRoute(user.role, ROUTE_KEY.TEAMS)} hasHighlighter={newMembersCount > 0} icon={() => <IconWrapper inheritColor icon={IdCard} />} activeIcon={() => <IconWrapper inheritColor icon={IdCard} />}>Teams</NavItem>}
                {hasRoutePermission(user?.role, ROUTE_KEY.GUIDE) && <NavItem to={getRoute(user.role, ROUTE_KEY.GUIDE)} icon={() => <IconWrapper inheritColor icon={FileText} />} activeIcon={() => <IconWrapper inheritColor icon={FileText} />}>Guide</NavItem>}
            </>
        )
    };

    //To get the exact path
    const { pathname } = useLocation()
    const Logo = useLogo();

    return (
        <div id='adminContainer' className={`flex ${ADMIN_BG_SCREENS.some(path => pathname.startsWith(path)) ? ' bg-background-100 ' : ' bg-background-100 '} bg-cover bg-top h-full overflow-x-hidden flex flex-col`}>
            <div id='adminSidebar' className="fixed flex w-[16rem] h-[calc(100vh-2rem)] m-4 rounded-xl flex-col bg-background-100 text-font-gray typography-large-p justify-between py-6 ">
                <div className='flex flex-col gap-2 typography-body px-4'>
                    <div className='pl-2 pt-2 pb-4 flex items-center justify-between'>
                        <img className='h-9 cursor-pointer ' onClick={() => navigate('/admin')} src={Logo} alt="Logo" />
                        <ThemeToggle /> {/* Add ThemeToggle here */}
                    </div>
                    {renderMenuItems()}
                </div>
                <div className='flex flex-col gap-2 mx-4'>
                    {renderBottomMenu()}
                    {user && renderProfileMenu()}
                </div>
            </div>

            <div className='ml-[17rem] w-[calc(100%-17rem)] flex justify-center min-h-[calc(100vh-5rem)]'>
                <Outlet />
            </div>
            <Footer variant='sidebar' />
        </div>
    );
};

export default AdminLayout;