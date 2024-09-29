import React from 'react';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import JobCard from '../../components/JobCard';

const fetchAppliedJobs = async () => {
  const response = await axios.get('/auth/candidate/applied-jobs');
  return response.data.jobApplications || [];
};

const MyJobs = () => {
  const { data: appliedJobs = [], isLoading, isError, error } = useQuery({
    queryKey: ['appliedJobs'],
    queryFn: fetchAppliedJobs,
  });

  if (isLoading) {
    return <div>Loading your applied jobs...</div>;
  }

  if (isError) {
    console.error('Error fetching applied jobs:', error);
    return <div>Error fetching applied jobs. Please try again later.</div>;
  }
  return (
    <div className='m-2 pt-8'>
      <h1 className="typography-h1">My Jobs</h1>
      <div className="p-4 bg-background-30 rounded-xl">
        {appliedJobs.length === 0 ? (
          <p>You have not applied to any jobs yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((application) => (
              <li key={application.jobId._id} className="mb-4">
                <JobCard
                  job={application.jobId}
                  isCandidate={true}
                  isAuthenticatedCandidate={true}
                  application={application} // Pass application data here
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