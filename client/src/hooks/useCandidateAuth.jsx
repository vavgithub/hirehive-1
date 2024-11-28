//useAuthCandidate.jsx
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { fetchCandidateAuthData } from '../redux/candidateAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const useCandidateAuth = () => {
  const dispatch = useDispatch();
  const [isDone,setIsDone] = useState(false);
  const {
    candidateAuthData,
    isAuthenticatedCandidate,
    isLoadingAuth,
    authError
  } = useSelector((state) => state.candidateAuth);

  useEffect(() => {
    if (!candidateAuthData) {
      async function fetchData(){
        await dispatch(fetchCandidateAuthData()).unwrap();
        setIsDone(true)
      }
      fetchData()
    }

  }, [dispatch, isAuthenticatedCandidate, candidateAuthData]);

  useEffect(()=>{
    if(authError){
      setIsDone(true)
    }
  },[authError])

  return {
    candidateData: candidateAuthData,
    isAuthenticated: isAuthenticatedCandidate,
    isLoading: isLoadingAuth,
    error: authError,
    isDone
  };
};


export default useCandidateAuth;
