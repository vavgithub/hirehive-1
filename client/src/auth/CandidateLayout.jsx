import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { candidateLogout } from '../api/authApi';

// Import icons
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';
import { JobsIcon, JobsIconActive } from '../svg/Navbar/JobsIcon';
import { MyJobsIcon, MyJobsIconActive } from '../svg/Navbar/MyJobsIcon';
import { Button } from '../components/ui/Button';
import useAuthCandidate from '../hooks/useCandidateAuth';
import Modal from '../components/Modal';
import AssessmentBanner from '../components/ui/AssessmentBanner';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCandidateAuth } from '../redux/candidateAuthSlice';

const CandidateLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get candidate data from Redux store
  const { candidateAuthData, isAuthenticatedCandidate } = useSelector(
    (state) => state.candidateAuth
  );

  // Initialize modal visibility state based on assessment status
  const [isAssessmentModalVisible, setIsAssessmentModalVisible] = useState(
    candidateAuthData && !candidateAuthData.hasGivenAssessment
  );
  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] = useState(
    candidateAuthData && !candidateAuthData.hasGivenAssessment
  );

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
  if (!isAuthenticatedCandidate) {
    navigate('/login');
    return null;
  }


  return (
    <div className="flex flex-col md:flex-row bg-main-bg bg-cover bg-top min-h-screen">
      {/* Mobile Menu Button */}
      <div
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
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
        {candidateAuthData && (
            <>
              <span className="block mb-2 typography-body">
                Welcome, {candidateAuthData.firstName}
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
      <div className="md:ml-[192px] flex-1 p-4 md:p-6">
        {isAssessmentBannerVisible && <AssessmentBanner />}

        <Outlet />
      </div>

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
