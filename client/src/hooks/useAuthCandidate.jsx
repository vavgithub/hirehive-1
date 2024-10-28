import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';

const fetchCandidateData = async () => {
  try {
    const response = await axios.get('/auth/candidate/dashboard');
    return response.data.candidate; // The candidate object now includes jobApplications
  } catch (error) {
    throw error;
  }
};

const useAuthCandidate = () => {
  const { data: candidateData, error, isLoading, refetch } = useQuery({
    queryKey: ['authCandidate'],
    queryFn: fetchCandidateData,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const isAuthenticated = candidateData !== undefined && !error;

  return { isAuthenticated, isLoading, candidateData, refetch };
};

export default useAuthCandidate;
