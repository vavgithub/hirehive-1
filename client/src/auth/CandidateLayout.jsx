import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import LightLogo from "../svg/Logo/lightLogo.png"
import useCandidateAuth from '../hooks/useCandidateAuth';
import { useDispatch } from 'react-redux';
import { logoutCandidateAuth } from '../redux/candidateAuthSlice';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import useScroll from '../hooks/useScroll';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import StyledMenu from '../components/MUIUtilities/StyledMenu';
import Modal from '../components/Modals/Modal';
import IconWrapper from '../components/Cards/IconWrapper';
import { Briefcase, BriefcaseBusiness, LogOut, Send, Settings, MenuIcon, User } from 'lucide-react';
import Footer from '../components/Footer/Footer';
import TelegramBannerIcon from "../svg/Banners/telegramBannerIcon.png"
import { Button } from '../components/Buttons/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import { use } from 'react';
import { useLogo, useTelegramBanner, useUnknownProfilePicture } from '../context/ThemeContext';

const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

const CandidateLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get candidate data from Redux store
  const { candidateData, hasGivenAssessment, isAuthenticated, isDone } = useCandidateAuth();
  const scrollPosition = useScroll()

  // Initialize modal visibility state based on assessment status
  const [isAssessmentModalVisible, setIsAssessmentModalVisible] = useState(false);
  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] = useState(false);

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      setIsAssessmentModalVisible(!hasGivenAssessment && candidateData?.pendingAssessments?.length !== 0);
      setIsAssessmentBannerVisible(!hasGivenAssessment && candidateData?.pendingAssessments?.length !== 0);
    }
  }, [hasGivenAssessment, isDone]);

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      setIsAssessmentModalVisible(false);
      setIsAssessmentBannerVisible(false);
    };
  }, []);

  const handleConnectTelegram = async () => {
        window.open(`https://t.me/${TELEGRAM_BOT_USERNAME}?start=${candidateData?._id}`, '_blank');
  }

  const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture();
  const Logo = useLogo();

  const handleLogout = async () => {
    try {
      await dispatch(logoutCandidateAuth()).unwrap();
      showSuccessToast('Success', 'Logged out successfully');
      navigate('/');
    } catch (error) {
      showErrorToast('Error', error.message || 'Logout failed');
      // console.error('Logout failed:', error);
    }
  };

  const handleCloseAssessmentModal = () => {
    setIsAssessmentModalVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define sidebar menu items with icons
  const menuItems = [
    // {
    //   name: 'Dashboard',
    //   path: '/candidate/dashboard',
    //   icon: DashboardIcon,
    //   activeIcon: DashboardIconActive,
    // },
    {
      name: 'All Jobs',
      path: '/candidate/all-jobs',
      icon: ()=><IconWrapper isInActiveIcon icon={Briefcase} />,
      activeIcon: ()=><IconWrapper isActiveIcon icon={Briefcase} />,
    },
    {
      name: 'My Jobs',
      path: '/candidate/my-jobs',
      icon: ()=><IconWrapper isInActiveIcon icon={BriefcaseBusiness} />,
      activeIcon: ()=><IconWrapper isActiveIcon icon={BriefcaseBusiness} />,
    },
  ];

  // NavItem component for consistent styling
  const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, children, onClick }) => (
    <div className="relative flex flex-row items-center justify-between  mx-4 rounded-xl">
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `w-full flex items-center min-h-11 gap-2 pl-2 py-2 rounded-xl hover:bg-background-60 ${isActive || isPending ? 'selection-primary  ' : ''}`
        }
        onClick={onClick}
      >
        {({ isActive, isPending }) => (
          <>
            {isActive || isPending ? <ActiveIcon className="text-xl" /> : <Icon className="text-xl" />}
            <span>{children}</span>
          </>
        )}
      </NavLink>
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${isActive || isPending ? 'bg-teal-400' : 'bg-transparent'
          }`
        }
      />
    </div>
  );


  const   ProfileComponent = () => {
    const profilePath = "/candidate/profile";
    const [anchorEl, setAnchorEl] = useState(null)
    // Function to handle dropdown menu opening
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget); // Set the element that opens the menu
    };

    // Function to handle dropdown menu closing
    const handleMenuClose = () => {
      setAnchorEl(null); // Close the menu
    };

    const itemComponents = [
      {
        onClick: handleMenuClose,
        content: () => (
          <NavLink to={profilePath} className={({ isActive }) =>
            `w-full flex items-center ${isActive ? "text-font-accent" : ""} hover:bg-background-60 hover:text-font-accent px-4 py-2 rounded-xl `}
          >
            <IconWrapper inheritColor={true} size={0} customIconSize={5}  icon={User} />
            <span className='typography-large-p ml-2'>
              Profile
            </span>
          </NavLink>
        )
      },
      {
        onClick: handleLogout,
        content: () => (
          <div className='flex items-center hover:bg-background-60 hover:text-font-accent px-4 py-2 w-full rounded-xl'>
            <IconWrapper inheritColor={true} size={0} customIconSize={5}  icon={LogOut} />
            <span className='typography-large-p ml-2'>
              Logout
            </span>
          </div>
        )
      }
    ]

    return (
      <>
        <div className={`flex items-center px-2 relative mx-4 py-1 justify-start hover:bg-background-60 rounded-xl ${location.pathname === profilePath ? "selection-primary" : " text-font-main "}`}>
          <IconButton onClick={handleMenuClick} className={`flex gap-2 `}>
            <Avatar alt={candidateData?.firstName} sx={{ width: "32px", height: "32px" }} src={candidateData?.profilePictureUrl || UNKNOWN_PROFILE_PICTURE_URL} />
            <span className={`typography-body ${location.pathname === profilePath ? "text-font-accent" : "text-font-main"} `}>{candidateData?.firstName}</span>
          </IconButton>
          <div className={`absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${location.pathname === profilePath
            ? "bg-teal-400" : "bg-transparent"}`} />
        </div>

        <StyledMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} itemComponents={itemComponents} />
      </>
    )
  }

  // Only render the layout if authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const location = useLocation();
  const TelegramBanner = useTelegramBanner()

  const darkBgPaths = ["/candidate/profile"]

  return (
    <div className={`flex flex-col  ${darkBgPaths.some(path => location?.pathname.startsWith(path)) ? ' bg-background-100 ' :' bg-background-100 '} bg-cover bg-top h-full overflow-x-hidden `}>
      {/* Mobile Menu Button */}
      <div className={'min-h-[4rem] w-full md:hidden z-30 fixed ' + (darkBgPaths.includes(location.pathname) ? "bg-background-100" : "")}>
        <div className='flex m-4 z-30 '>
          <img className='h-11 z-30' src={Logo} />
        </div>
        <div
          className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-full  "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IconWrapper icon={MenuIcon}  size={0} customIconSize={7} customStrokeWidth={5} />
        </div>
        <div
          className="z-20 bg-gradient-to-b from-black-100 via-black-100 to-transparent w-full top-0 absolute"
          style={{
            transition: 'all 0.1s ease-in',
            minHeight: scrollPosition > 30 ? '6rem' : '0rem', // Apply conditional minHeight
          }}
        ></div>
      </div>

      {/* Sidebar for desktop / Floating menu for mobile */}
      <div
        className={`
          fixed md:relative z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-[110%] md:translate-x-0'}
          transition-transform duration-300 ease-in-out
          w-[16rem] h-[calc(100vh-2rem)] m-4 rounded-xl
          bg-background-90 text-font-gray
          flex flex-col justify-between py-6
        `}
        style={{ position: 'fixed' }}
      >
        <div className="flex flex-col gap-6 typography-body ">
          <div className='px-6 pt-2 pb-4  flex justify-between'>

            <img className='h-11 cursor-pointer ' onClick={() => navigate('/')} src={Logo} />
          <ThemeToggle /> {/* Add ThemeToggle here */}
          </div>
          {menuItems.map((item) => (
            <NavItem
              key={item.name}
              to={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavItem>
          ))}
        </div>
        <div >
          {candidateData &&
            <>
              {!candidateData?.isTelegramConnected && <div className='max-w-full mx-4 my-4 relative '>
                <img src={TelegramBannerIcon} className='absolute max-w-[46px] -top-[24px] -right-[10px]' />
                <img src={TelegramBanner} className='max-w-full ' />
                <div className='absolute top-[6%] left-4 max-w-[90%]'>
                  <h4 className=' text-font-main  font-semibold mb-1'>Connect Telegram</h4>
                  <p className=' text-font-main typography-body mb-4'>Get instant job updates. <br/> Stay ahead always.</p>
                  <Button  onClick={handleConnectTelegram} className='!px-4 w-full' variant='primary' icon={() => <IconWrapper size={0} inheritColor customIconSize={5} customStrokeWidth={5} icon={Send}/>}>Connect Now</Button>
                </div>
              </div>}
              <div className='my-4'>
                <NavItem               
                key={'settings'}
                to={'/candidate/settings'}
                icon={()=><IconWrapper isInActiveIcon icon={Settings} />}
                activeIcon={()=><IconWrapper isActiveIcon icon={Settings}
                />}>
                Settings
               </NavItem>
              </div>
              <ProfileComponent />
            </>
          }
        </div>
      </div>


      {/* Assessment Modal */}
      <Modal
        open={isAssessmentModalVisible}
        onClose={handleCloseAssessmentModal}
        actionType="ASSESSMENT"
        onConfirm={() => {
          navigate('/candidate/assessment');
          setIsAssessmentModalVisible(false);
        }}
      />

      {/* Main Content */}
      <div className="mt-[4.6rem] md:mt-0 md:ml-[17rem] md:w-[calc(100vw-17rem)] flex flex-col items-center min-h-[calc(100vh-5rem)] ">
        <Outlet />
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <Footer variant='sidebar' />
    </div>
  );
};

export default CandidateLayout;
