import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { candidateLogout } from '../api/authApi';
import axios from '../api/axios';
import { useQuery } from '@tanstack/react-query';

// Import icons
import { DashboardIcon, DashboardIconActive } from '../svg/Navbar/DashboardIcon';
import { JobsIcon, JobsIconActive } from '../svg/Navbar/JobsIcon';
import { MyJobsIcon, MyJobsIconActive } from '../svg/Navbar/MyJobsIcon';
import { Button } from '../components/ui/Button';
import { Menu } from 'lucide-react'; // Import Menu icon from lucide-react

const CandidateLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <NavLink
      to={to}
      end={to === '/candidate/dashboard'}
      className={({ isActive, isPending }) =>
        `flex items-center gap-2 p-2 ${
          isActive || isPending ? 'text-font-accent bg-background-60' : 'hover:bg-background-60'
        }`
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
  );

  return (
    <div className="flex flex-col md:flex-row bg-main-bg bg-cover bg-top min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-background-100 rounded-full shadow-lg"
        onClick={toggleMenu}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar for desktop / Floating menu for mobile */}
      <div className={`
        fixed md:relative z-40
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-300 ease-in-out
        md:w-48 w-64 h-screen
        bg-background-100 text-font-gray
        flex flex-col justify-between py-4
      `}>
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
          {candidateData && (
            <>
              <span className="block mb-2">Welcome, {candidateData.firstName}</span>
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
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