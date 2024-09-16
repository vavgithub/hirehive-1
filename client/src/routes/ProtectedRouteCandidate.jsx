// ProtectedRouteCandidate.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ProtectedRouteCandidate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/candidate/dashboard'); // Try accessing a protected route
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/candidate/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRouteCandidate;
