import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { logout } from '../services/auth.service';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import LightLogo from "../svg/Logo/lightLogo.svg"
import StyledMenu from './MUIUtilities/StyledMenu';
import IconWrapper from './Cards/IconWrapper';
import { Briefcase, CalendarDays, ChevronDown, ChevronUp, ClipboardCheck, FileText, IdCard, LayoutGrid, LogOut, MonitorDot, Settings, Star, User, UserCheck, Users } from 'lucide-react';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../utility/config';
import { useSelector } from 'react-redux';
import { getRoute, hasRoutePermission, ROLES, ROUTE_KEY } from '../config/permissions.config';
import Footer from './Footer/Footer';
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
    const { user } = useAuthContext(); // Get user data from the context

    const [anchorEl, setAnchorEl] = useState(null); // State to control dropdown menu
    const { refetch } = useAuth();
    const queryClient = useQueryClient();

    const { newMembersCount } = useSelector(state => state.admin)

    // Get profile path based on user role
    const getProfilePath = () => {
        return getRoute(user?.role,ROUTE_KEY.PROFILE);
    };

    // useEffect(() => {
    // const handleChange = () => {
    //     console.log("DPR changed:", window.devicePixelRatio);
    // };
    // console.log("DPR :", window.devicePixelRatio);

    // const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    // mq.addEventListener("change", handleChange);

    // return () => mq.removeEventListener("change", handleChange);
    // }, []);

    const handleLogout = async () => {
        try {
            await logout();
            refetch();
            queryClient.clear()
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

    const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, iconData, children, hasHighlighter , isBold  = false, isPrimaryColor = false}) => (
        <div className="relative flex flex-row items-center justify-between  rounded-xl ">
            <NavLink
                to={to}
                end={to === "/admin/dashboard" || to === "/design-reviewer/dashboard"}
                className={({ isActive, isPending }) =>
                    `w-full flex items-center min-h-11 gap-2 pl-2 py-2 rounded-xl hover:bg-background-60 ${isActive || isPending ? ` selection-primary ` : isPrimaryColor ? 'text-white' : ""}`
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
    const dropdownRef = useRef(null); // 👉 create ref for the wrapper

    const toggleDropdown = () => setIsOpen(!isOpen);

    // ✅ useEffect to close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
        };

        document.getElementById('adminSidebar')?.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.getElementById('adminSidebar')?.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative flex flex-col rounded-xl">
        {/* Parent menu item */}
        <div
            onClick={toggleDropdown}
            className={`cursor-pointer w-full flex items-center justify-between min-h-11 gap-2 pl-2 pr-3 py-2 rounded-xl hover:bg-background-60 ${isActive ? 'selection-primary' : ''}`}
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
        <div
            className={`absolute top-[18px] right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive ? 'bg-teal-400' : 'bg-transparent'}`}
        />

        {/* Submenu items */}
        {isOpen && (
        <div className={"relative ml-10 mt-2 flex flex-col gap-2 vertical-dashed-line " + (isActive && 'line-open')}>
            {submenu.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-2 rounded-xl hover:bg-background-60 typography-body  ${
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
                            `w-full flex items-center ${isActive ? " selection-primary " : ""}  hover:bg-background-60 hover:text-font-accent px-4 py-2 rounded-xl `}
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
                            `w-full flex items-center ${isActive ? " selection-primary " : ""}  hover:bg-background-60 hover:text-font-accent px-4 py-2 rounded-xl `}
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

    const renderBottomMenu = () => {
        return (
            <>
                {user?.role === "Admin" && <NavItem to={getRoute(user.role,ROUTE_KEY.SETTINGS)} icon={() => <IconWrapper isInActiveIcon icon={Settings} />} activeIcon={() => <IconWrapper isActiveIcon icon={Settings} />}> Settings </NavItem>}
            </>
        )
    }

    const renderMenuItems = () => {
        const jobsSubMenu = [
            ...(hasRoutePermission(user.role,ROUTE_KEY.ALLJOBS) ? [{
                to : getRoute(user.role,ROUTE_KEY.ALLJOBS),
                label : 'All Jobs',
                icon : () => <IconWrapper isInActiveIcon icon={Briefcase} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={Briefcase}/>
            }] : []),
            ...(hasRoutePermission(user.role,ROUTE_KEY.ASSESSMENTS) ? [{
                to : getRoute(user.role,ROUTE_KEY.ASSESSMENTS),
                label : 'Assessments',
                icon : () => <IconWrapper isInActiveIcon icon={ClipboardCheck} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={ClipboardCheck}/>
            }] : [])
        ]

        const candidatesSubMenu = [
            ...(hasRoutePermission(user.role,ROUTE_KEY.ALL_CANDIDATES) ? [{
                to : getRoute(user.role,ROUTE_KEY.ALL_CANDIDATES),
                label : user?.role === ROLES.DESIGN_REVIEWER ? 'Candidates' : 'All Candidates',
                icon : () => <IconWrapper isInActiveIcon icon={Users} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={Users}/>
            }] : []),
            ...(hasRoutePermission(user.role,ROUTE_KEY.SHORTLISTED) ? [{
                to : getRoute(user.role,ROUTE_KEY.SHORTLISTED),
                label : 'Future Gems',
                icon : () => <IconWrapper isInActiveIcon icon={UserCheck} />,
                activeIcon : () => <IconWrapper isActiveIcon icon={UserCheck}/>
            }] : [])
        ]

        return(
            <>
                {user?.role === "Admin" && <NavItem to={getRoute(user.role,ROUTE_KEY.DASHBOARD)} icon={() => <IconWrapper isInActiveIcon icon={LayoutGrid} />} activeIcon={() => <IconWrapper isActiveIcon icon={LayoutGrid} />}> Dashboard </NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.JOBS) && ((jobsSubMenu?.length  > 1 ) 
                ? <DropDownNavItem to={getRoute(user.role,ROUTE_KEY.JOBS)} submenu={jobsSubMenu} icon={() => <IconWrapper isInActiveIcon icon={Briefcase} />} activeIcon={() => <IconWrapper isActiveIcon icon={Briefcase} />}> Jobs </DropDownNavItem> 
                :<NavItem to={jobsSubMenu[0]?.to} icon={jobsSubMenu[0]?.icon} activeIcon={jobsSubMenu[0]?.activeIcon}> {jobsSubMenu[0]?.label} </NavItem>)}
                {hasRoutePermission(user?.role,ROUTE_KEY.CANDIDATES) && (candidatesSubMenu?.length > 1) ?
                 <DropDownNavItem to={getRoute(user.role,ROUTE_KEY.CANDIDATES)} submenu={candidatesSubMenu} icon={() => <IconWrapper isInActiveIcon icon={Users} />} activeIcon={() => <IconWrapper isActiveIcon icon={Users} />}>Candidates</DropDownNavItem> 
                 :<NavItem to={candidatesSubMenu[0]?.to} icon={candidatesSubMenu[0]?.icon} activeIcon={candidatesSubMenu[0]?.activeIcon}> {candidatesSubMenu[0]?.label}</NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.REVIEWS) && <NavItem to={getRoute(user.role,ROUTE_KEY.REVIEWS)} icon={() => <IconWrapper isInActiveIcon icon={Star} />} activeIcon={() => <IconWrapper isActiveIcon icon={Star} />}>Reviews</NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.INTERVIEWS) && <NavItem to={getRoute(user.role,ROUTE_KEY.INTERVIEWS)} icon={() => <IconWrapper isInActiveIcon icon={CalendarDays} />} activeIcon={() => <IconWrapper isActiveIcon icon={CalendarDays} />}>Calendar</NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.TEAMS) && <NavItem to={getRoute(user.role,ROUTE_KEY.TEAMS)} hasHighlighter={newMembersCount > 0} icon={() => <IconWrapper isInActiveIcon icon={IdCard} />} activeIcon={() => <IconWrapper isActiveIcon icon={IdCard} />}>Teams</NavItem>}
                {hasRoutePermission(user?.role,ROUTE_KEY.GUIDE) && <NavItem to={getRoute(user.role,ROUTE_KEY.GUIDE)} icon={() => <IconWrapper isInActiveIcon icon={FileText} />} activeIcon={() => <IconWrapper isActiveIcon icon={FileText} />}>Guide</NavItem>}
            </>
        )
    };

    //To get the exact path
    const { pathname } = useLocation()

    return (
        <div id='adminContainer' className={`flex ${ADMIN_BG_SCREENS.some(path => pathname.startsWith(path)) ? ' bg-background-100 ' : ' bg-background-100 '} bg-cover bg-top h-full overflow-x-hidden flex flex-col`}>
            <div id='adminSidebar' className="fixed flex  w-[16rem] h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-background-90 text-font-gray typography-large-p justify-between py-6 ">
                <div className='flex flex-col gap-2 typography-body px-4'>
                    <div className=' pl-2 pt-2 pb-4 flex '>
                        <img className='h-11 cursor-pointer ' onClick={() => navigate('/admin')} src={LightLogo} />
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