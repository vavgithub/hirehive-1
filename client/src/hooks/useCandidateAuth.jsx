//useAuthCandidate.jsx
import { useQuery } from '@tanstack/react-query';
import axios from '../services/axios';
import { fetchCandidateAuthData } from '../redux/candidateAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';

export const useCandidateAuth = () => {
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  const {
    candidateAuthData,
    isAuthenticatedCandidate,
    hasGivenAssessment,
    isLoadingAuth,
    authError
  } = useSelector((state) => state.candidateAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!candidateAuthData) {
          const result = await dispatch(fetchCandidateAuthData()).unwrap();
          if (result) {
            Sentry.setUser({
              id: result._id,
              email: result.email,
              role: 'candidate',
            });
          }
        } else {
          Sentry.setUser({
            id: candidateAuthData._id,
            email: candidateAuthData.email,
            role: 'candidate',
          });
        }
        setIsDone(true);
      } catch (error) {
        Sentry.captureException(error, {
          tags: { file: "useCandidateAuth.jsx", action: "fetchData", role: "candidate" },
          extra: { response: error?.response?.data, message: error?.message },
        });
        Sentry.setUser(null);
        setIsDone(true);
      }
    };

    fetchData();
  }, [dispatch, candidateAuthData]);
  return {
    candidateData: candidateAuthData,
    isAuthenticated: isAuthenticatedCandidate,
    hasGivenAssessment,
    isLoading: isLoadingAuth,
    error: authError,
    isDone
  };
};


export default useCandidateAuth;
