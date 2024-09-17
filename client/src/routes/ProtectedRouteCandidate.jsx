// ProtectedRouteCandidate.jsx

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuthCandidate from '../hooks/useAuthCandidate';

const ProtectedRouteCandidate = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthCandidate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};


export default ProtectedRouteCandidate;
