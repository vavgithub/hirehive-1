// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoading, error } = useAuthContext();


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;