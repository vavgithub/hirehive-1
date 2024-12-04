import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from '../../api/axios';
import JobCard from '../../components/JobCard';
import AssessmentBanner from '../../components/ui/AssessmentBanner';
import Loader from '../../components/ui/Loader';

// Keep the fetchAppliedJobs function separate for better organization
const fetchAppliedJobs = async () => {
  const response = await axios.get('/auth/candidate/applied-jobs');
  return response.data.jobApplications || [];
};

const MyJobs = () => {
  const navigate = useNavigate();
  
  // Replace useAuthCandidate with Redux selector
  const { candidateAuthData } = useSelector((state) => state.candidateAuth);
  const candidateId = candidateAuthData?._id || null;

  // Keep React Query for data fetching
  const { data: appliedJobs = [], isLoading, isError, error } = useQuery({
    queryKey: ['appliedJobs'],
    queryFn: fetchAppliedJobs,
    // Add enabled condition to prevent unnecessary fetching
    enabled: !!candidateId,
  });

  // Maintain mobile detection
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Navigation handler with mobile check
  const handleClick = (jobId) => {
    if (!isMobile) {
      navigate(`/candidate/viewJob/${candidateId}/${jobId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    console.error('Error fetching applied jobs:', error);
    return (
      <div className="m-2 pt-4">
        <h1 className="typography-h1">My Jobs</h1>
        <div className="p-4 bg-background-30 rounded-xl">
          Error fetching applied jobs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className='container m-4'>
      <h1 className="typography-h1">My Jobs</h1>
      <div className="p-4 bg-background-30 rounded-xl">
        {appliedJobs.length === 0 ? (
          <p>You have not applied to any jobs yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((application) => (
              <li key={application.jobId.jobId} className="mb-4">
                <JobCard
                  job={application.jobId}
                  isCandidate={true}
                  onClick={(application.jobId.status === "deleted" || application.jobId.status === "closed") ? undefined : () => handleClick(application.jobId._id)}
                  isAuthenticatedCandidate={true}
                  application={application}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyJobs;