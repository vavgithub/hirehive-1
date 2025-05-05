import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { candidateLogout } from '../api/authApi';
import LightLogo from "../svg/Logo/lightLogo.svg"
import useCandidateAuth from '../hooks/useCandidateAuth';
import AssessmentBanner from '../components/ui/AssessmentBanner';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCandidateAuth } from '../redux/candidateAuthSlice';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import useScroll from '../hooks/useScroll';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import StyledMenu from '../components/MUIUtilities/StyledMenu';
import Modal from '../components/Modals/Modal';
import ContactUs from '../components/Form/ContactUs';
import IconWrapper from '../components/Cards/IconWrapper';
import { Briefcase, BriefcaseBusiness, LogOut, User } from 'lucide-react';
import { UNKNOWN_PROFILE_PICTURE_URL } from '../utility/config';

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
    <div className="relative flex flex-row items-center justify-between hover:bg-background-60 mx-4 rounded-xl">
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `w-full flex items-center min-h-11 gap-2  py-2 rounded-xl ${isActive || isPending ? 'text-font-accent bg-background-60  ' : ''}`
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
        <div className={`flex items-center px-2 relative mx-4 py-1 justify-start hover:bg-background-60 rounded-xl ${location.pathname === profilePath ? "bg-background-60" : ""}`}>
          <IconButton onClick={handleMenuClick} className={`flex gap-2 ${location.pathname === profilePath ? "text-font-accent"
            : ""}`}>
            <Avatar alt={candidateData?.firstName} sx={{ width: "32px", height: "32px" }} src={candidateData?.profilePictureUrl || UNKNOWN_PROFILE_PICTURE_URL} />
            <span className={`typography-body  ${location.pathname === profilePath ? "text-font-accent"
              : "text-white"}`}>{candidateData?.firstName}</span>
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

  const darkBgPaths = ["/candidate/profile"]

  return (
    <div className={`flex flex-col md:flex-row ${darkBgPaths.some(path => location?.pathname.startsWith(path)) ? ' bg-background-80 ' :' bg-main-bg '} bg-cover bg-top h-full overflow-x-hidden`}>
      {/* Mobile Menu Button */}
      <div className={'min-h-[4rem] w-full md:hidden z-30 fixed ' + (darkBgPaths.includes(location.pathname) ? "bg-background-80" : "")}>
        <div className='flex m-4 z-30'>
          <img className='h-11 z-30' src={LightLogo} />
        </div>
        <div
          className="md:hidden absolute top-4 right-4 z-50 p-2 rounded-full shadow-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
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
          w-60 h-[calc(100vh-2rem)] m-4 rounded-xl
          bg-background-100 text-font-gray
          flex flex-col justify-between py-6
        `}
        style={{ position: 'fixed' }}
      >
        <div className="flex flex-col gap-5 typography-body ">
          <div className='px-6 pt-2  flex '>

            <img className='h-11' src={LightLogo} />
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

            <ProfileComponent />
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
      <div className="mt-[4.6rem] md:mt-0 md:ml-[16rem] md:w-[calc(100vw-16rem)] flex flex-col items-center min-h-screen ">
        {/* {isAssessmentBannerVisible &&  <AssessmentBanner />} */}
        <Outlet />
        {/* <ContactUs /> */}
      </div>
      {/* <div className="md:ml-[192px] flex-1 p-4 md:p-6">

<Outlet />
</div> */}

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

    </div>
  );
};

export default CandidateLayout;
