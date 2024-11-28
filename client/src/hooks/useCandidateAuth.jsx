//useAuthCandidate.jsx
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import { fetchCandidateAuthData } from '../redux/candidateAuthSlice';
import { useDispatch } from 'react-redux';

export const useCandidateAuth = () => {
  const dispatch = useDispatch();
  const {
    candidateAuthData,
    isAuthenticatedCandidate,
    isLoadingAuth,
    authError
  } = useSelector((state) => state.candidateAuth);

  useEffect(() => {
    if (!isAuthenticatedCandidate && !isLoadingAuth) {
      dispatch(fetchCandidateAuthData());
    }
  }, [dispatch, isAuthenticatedCandidate, isLoadingAuth]);

  return {
    candidateData: candidateAuthData,
    isAuthenticated: isAuthenticatedCandidate,
    isLoading: isLoadingAuth,
    error: authError
  };
};


export default useCandidateAuth;
