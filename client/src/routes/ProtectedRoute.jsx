// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || !allowedRoles.includes(data.role)) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
