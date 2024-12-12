import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { candidateLogout } from '../api/authApi';
import LightLogo from "../svg/Logo/lightLogo.svg"
// Import icons
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';
import { JobsIcon, JobsIconActive } from '../svg/Navbar/JobsIcon';
import { MyJobsIcon, MyJobsIconActive } from '../svg/Navbar/MyJobsIcon';
import { Button } from '../components/ui/Button';
import useCandidateAuth from '../hooks/useCandidateAuth';
import Modal from '../components/Modal';
import AssessmentBanner from '../components/ui/AssessmentBanner';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCandidateAuth } from '../redux/candidateAuthSlice';
import { showErrorToast, showSuccessToast } from '../components/ui/Toast';
import useScroll from '../hooks/useScroll';

const CandidateLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Get candidate data from Redux store
  const { candidateData, isAuthenticated, isDone } = useCandidateAuth();
  const scrollPosition = useScroll()

  // Initialize modal visibility state based on assessment status
  const [isAssessmentModalVisible, setIsAssessmentModalVisible] = useState(false);
  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] = useState(false);

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      console.log('Candidate data updated:', candidateData);
      console.log('Assessment status:', candidateData.hasGivenAssessment);
      setIsAssessmentModalVisible(!candidateData.hasGivenAssessment);
      setIsAssessmentBannerVisible(!candidateData.hasGivenAssessment);
    }
  }, [candidateData, isDone]);

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
      navigate('/login');
    } catch (error) {
      showErrorToast('Error', error.message || 'Logout failed');
      console.error('Logout failed:', error);
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
    {
      name: 'Dashboard',
      path: '/candidate/dashboard',
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
    },
    {
      name: 'All Jobs',
      path: '/candidate/all-jobs',
      icon: JobsIcon,
      activeIcon: JobsIconActive,
    },
    {
      name: 'My Jobs',
      path: '/candidate/my-jobs',
      icon: MyJobsIcon,
      activeIcon: MyJobsIconActive,
    },
  ];

  // NavItem component for consistent styling
  const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, children, onClick }) => (
    <div className="relative flex flex-row items-center justify-between hover:bg-background-60">
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `w-full flex items-center gap-2 pl-2 ${isActive || isPending ? 'text-font-accent' : ''}`
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

  // Only render the layout if authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }


  return (
    <div className="flex flex-col md:flex-row bg-main-bg bg-cover bg-top h-full overflow-x-hidden">
      {/* Mobile Menu Button */}
      <div className={'min-h-[4rem] w-full md:hidden z-30 fixed '}>
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
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          transition-transform duration-300 ease-in-out
          md:w-48 w-64 h-screen
          bg-background-100 text-font-gray
          flex flex-col justify-between py-4
        `}
        style={{ position: 'fixed' }}
      >
        <div className="flex flex-col gap-5 typography-body">
          <div className='p-2 flex '>

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
        <div className="px-4">
          {candidateData && (
            <>
              <span className="block mb-2 typography-body">
                Welcome, {candidateData.firstName}
              </span>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </>
          )}
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
      <div class="mt-[5rem] md:mt-0 md:ml-[12rem] md:w-[calc(100vw-12rem)] flex flex-col items-center min-h-screen">
        {isAssessmentBannerVisible &&  <AssessmentBanner />}
                <Outlet />
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
