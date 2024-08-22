// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { data, isLoading, isError } = useAuth();

  console.log('ProtectedRoute:', { data, isLoading, isError, allowedRoles });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(data.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;