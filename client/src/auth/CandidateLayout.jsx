// CandidateLayout.jsx

import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { candidateLogout } from '../api/authApi';
import axios from '../api/axios';
import { useQuery } from '@tanstack/react-query';

// Import icons
import { FaTachometerAlt } from 'react-icons/fa'; // Dashboard icon
import { FaBriefcase } from 'react-icons/fa';     // All Jobs icon
import { FaListAlt } from 'react-icons/fa';       // My Jobs icon
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';
import { JobsIcon, JobsIconActive } from '../svg/Navbar/JobsIcon';
import { MyJobsIcon, MyJobsIconActive } from '../svg/Navbar/MyJobsIcon';
import { Button } from '../components/ui/Button';

const CandidateLayout = () => {
  const navigate = useNavigate();

  // Fetch candidate data
  const { data: candidateData, refetch } = useQuery({
    queryKey: ['candidateData'],
    queryFn: async () => {
      const response = await axios.get('/auth/candidate/dashboard');
      return response.data.candidate;
    },
  });

  const handleLogout = async () => {
    try {
      await candidateLogout();
      refetch();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Define sidebar menu items with icons
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/candidate/dashboard',
      icon: DashboardIcon,
      activeIcon: DashboardIconActive, // Using the same icon for active state
    },
    {
      name: 'All Jobs',
      path: '/candidate/all-jobs',
      icon: JobsIcon,
      activeIcon: JobsIconActive, // Using the same icon for active state
    },
    {
      name: 'My Jobs',
      path: '/candidate/my-jobs',
      icon: MyJobsIcon,
      activeIcon: MyJobsIconActive, // Using the same icon for active state
    },
  ];

  // NavItem component for consistent styling
  const NavItem = ({ to, icon: Icon, activeIcon: ActiveIcon, children }) => (
    <div className="relative flex flex-row items-center justify-between hover:bg-background-60">
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `w-full flex items-center gap-2 pl-2 ${
            isActive || isPending ? 'text-font-accent' : ''
          }`
        }
      >
        {({ isActive, isPending }) => (
          <div className="flex items-center">
            {isActive || isPending ? (
              <ActiveIcon className="text-xl" />
            ) : (
              <Icon className="text-xl" />
            )}
            <span>{children}</span>
          </div>
        )}
      </NavLink>
      <NavLink
        to={to}
        end={to === '/candidate/dashboard'}
        className={({ isActive, isPending }) =>
          `absolute right-0 w-1 h-6 rounded-tl-xl rounded-bl-xl ${
            isActive || isPending ? 'bg-teal-400' : 'bg-transparent'
          }`
        }
      />
    </div>
  );

  return (
    <div className="flex bg-main-bg bg-cover bg-top h-full overflow-x-hidden">
      {/* Sidebar */}
      <div className="fixed flex h-screen z-[50000] w-48 flex-col gap-6 bg-background-100 text-font-gray typography-large-p justify-between py-4">
        <div className="flex flex-col gap-5 typography-body">
          {menuItems.map((item) => (
            <NavItem
              key={item.name}
              to={item.path}
              icon={item.icon}
              activeIcon={item.activeIcon}
            >
              {item.name}
            </NavItem>
          ))}
        </div>
        <div className="px-4">
          {candidateData && (
            <>
              <span>Welcome, {candidateData.firstName}</span>
              <Button variant="secondary" onClick={handleLogout}> Logout</Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[192px] w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default CandidateLayout;
