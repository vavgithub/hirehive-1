import { useEffect, useState } from 'react';
import axios from '../api/axios';

const useAuthCandidate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [candidateData, setCandidateData] = useState(null);

  const fetchCandidateData = async () => {
    try {
      const response = await axios.get('/auth/candidate/dashboard');
      setCandidateData(response.data.candidate); // The candidate object now includes jobApplications
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setCandidateData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  return { isAuthenticated, isLoading, candidateData, fetchCandidateData };
};

export default useAuthCandidate;