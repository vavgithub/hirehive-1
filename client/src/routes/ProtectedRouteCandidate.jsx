// ProtectedRouteCandidate.jsx

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/ui/Loader';

const ProtectedRouteCandidate = ({ children }) => {
  const { isAuthenticatedCandidate, isLoadingAuth } = useSelector(
    (state) => state.candidateAuth
  );

  if (isLoadingAuth) {
    return <Loader />;
  }

  return isAuthenticatedCandidate ? children : <Navigate to="/login" />;
};


export default ProtectedRouteCandidate;
