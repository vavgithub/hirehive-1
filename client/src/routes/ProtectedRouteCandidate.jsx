// ProtectedRouteCandidate.jsx

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loaders/Loader";
import { fetchCandidateAuthData } from "../redux/candidateAuthSlice";

const ProtectedRouteCandidate = ({ children }) => {
  const [isLoading,setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticatedCandidate, isLoadingAuth ,authError } = useSelector(
    (state) => state.candidateAuth
  );

  useEffect(()=>{
    if(!isAuthenticatedCandidate){
      async function fetchData(){
        await dispatch(fetchCandidateAuthData()).unwrap();
        setIsLoading(false)
      }
      fetchData()
    }
  },[isAuthenticatedCandidate])

  useEffect(()=>{
    if(authError){
      setIsLoading(false)
    }
  },[authError])
  
  if (isLoadingAuth || (isLoading && !isAuthenticatedCandidate)) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen">
      <Loader />
    </div>
    );
  }

  return (!isAuthenticatedCandidate && !isLoading) ? <Navigate to="/login" /> : children ;
};

export default ProtectedRouteCandidate;
