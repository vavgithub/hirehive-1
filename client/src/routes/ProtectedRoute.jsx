// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
import Loader from '../components/Loaders/Loader';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoading, isDone } = useAuthContext();


  if (isLoading || !isDone) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen">
      <Loader />
    </div>
    );
  }

  // Only treat missing user as logged out. Transient /auth/profile errors
  // (503, network) must not redirect — AuthProvider keeps the last known user.
  if (!user && !isLoading && isDone) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isLoading && isDone && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
