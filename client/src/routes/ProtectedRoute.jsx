// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { data, isLoading } = useAuth();

  console.log('ProtectedRoute:', { data, isLoading, allowedRoles });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !allowedRoles.includes(data.role)) {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;