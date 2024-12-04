// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthProvider';
import Loader from '../components/ui/Loader';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoading, error } = useAuthContext();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen">
      <Loader />
    </div>
    );
  }

  if (error || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;