import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { candidateLogout, logout } from '../api/authApi';
import axios from '../api/axios';
import { useQuery } from '@tanstack/react-query';

const CandidateLayout = () => {
  const navigate = useNavigate();

  // Fetch candidate data
  const { data: candidateData, refetch } = useQuery({
    queryKey: ['candidateData'],
    queryFn: async () => {
      const response = await axios.get('/auth/candidate/dashboard');
      return response.data.candidate;
    }
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

  // Define sidebar menu items
  const menuItems = [
    { name: 'Dashboard', path: '/candidate/dashboard' },
    { name: 'All Jobs', path: '/candidate/all-jobs' },
    { name: 'My Jobs', path: '/candidate/my-jobs' },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="fixed h-screen w-48 bg-background-100 text-font-gray py-4">
        <div className="flex flex-col gap-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="px-4 py-2 hover:bg-background-60"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto px-4">
          {candidateData && (
            <>
              <span>Welcome, {candidateData.firstName}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-48 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default CandidateLayout;
