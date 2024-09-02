import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';



const Reviews = () => {
  const reviewerId = "66d5cd95d23888fb36a9ec5e";
  const [assignedCandidates, setAssignedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/candidates/assigned/${reviewerId}`);
        setAssignedCandidates(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assigned candidates');
        setLoading(false);
      }
    };
    
    fetchCandidates();
  }, [reviewerId]);
  console.log("check krr" , assignedCandidates);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Assigned Candidates</h2>
      <ul>
        {assignedCandidates.map(candidate => (
          <li key={candidate._id}>
            {candidate.firstName} {candidate.lastName} - {candidate.stageStatus.Portfolio.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews