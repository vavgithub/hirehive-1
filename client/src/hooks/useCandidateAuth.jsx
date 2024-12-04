//useAuthCandidate.jsx
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { fetchCandidateAuthData } from '../redux/candidateAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const useCandidateAuth = () => {
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  const {
    candidateAuthData,
    isAuthenticatedCandidate,
    isLoadingAuth,
    authError
  } = useSelector((state) => state.candidateAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!candidateAuthData) {
          await dispatch(fetchCandidateAuthData()).unwrap();
        }
        setIsDone(true);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        setIsDone(true);
      }
    };

    fetchData();
  }, [dispatch, candidateAuthData]);

  return {
    candidateData: candidateAuthData,
    isAuthenticated: isAuthenticatedCandidate,
    isLoading: isLoadingAuth,
    error: authError,
    isDone
  };
};


export default useCandidateAuth;
