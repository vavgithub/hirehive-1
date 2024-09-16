// CandidateDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const CandidateDashboard = () => {
  const [candidateData, setCandidateData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await axios.get('/auth/candidate/dashboard');
        setCandidateData(response.data.candidate);
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        navigate('/candidate/login'); // Redirect to login if not authorized
      }
    };

    fetchCandidateData();
  }, [navigate]);

  if (!candidateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="candidate-dashboard">
      <h2>Welcome, {candidateData.firstName}</h2>
      <h3>Your Applied Jobs:</h3>
      <ul>
        <li>{candidateData.jobApplied}</li>
        {/* If candidate can apply to multiple jobs, adjust accordingly */}
      </ul>
      {/* Display more candidate data as needed */}
    </div>
  );
};

export default CandidateDashboard;
