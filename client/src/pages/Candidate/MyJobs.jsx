import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from '../../api/axios';
import JobCard from '../../components/JobCard';
import AssessmentBanner from '../../components/ui/AssessmentBanner';
import Loader from '../../components/ui/Loader';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import StyledCard from '../../components/ui/StyledCard';
import Pagination from '../../components/utility/Pagination';
import ContactUs from '../../components/Form/ContactUs';

// Keep the fetchAppliedJobs function separate for better organization
const fetchAppliedJobs = async (page) => {
  const response = await axios.get(`/auth/candidate/applied-jobs?page=${page}`);
  return response.data;
};

const MyJobs = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 3;

  // Replace useAuthCandidate with Redux selector
  const { candidateAuthData } = useSelector((state) => state.candidateAuth);
  const candidateId = candidateAuthData?._id || null;


  //For resetting page on each result change
  useEffect(() => {
    setPage(1);
  }, [])

  // Keep React Query for data fetching
  const { data: appliedJobs, isLoading, isError, error } = useQuery({
    queryKey: ['appliedJobs', page],
    queryFn: () => fetchAppliedJobs(page),
    // Add enabled condition to prevent unnecessary fetching
    enabled: !!candidateId,
  });

  // Maintain mobile detection
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { candidateData, hasGivenAssessment, isAuthenticated, isDone } = useCandidateAuth();

  // Navigation handler with mobile check
  const handleClick = (jobId) => {
    if (!isMobile) {
      navigate(`/candidate/viewJob/${candidateId}/${jobId}`);
    }
  };

  const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] =
    useState(false);

  // Update visibility states when component mounts and when candidateData updates
  useEffect(() => {
    if (isDone && candidateData) {
      setIsAssessmentBannerVisible(!hasGivenAssessment);
    }
  }, [hasGivenAssessment, isDone]);

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      setIsAssessmentBannerVisible(false);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    // console.error('Error fetching applied jobs:', error);
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
    <div className='w-full p-4'>
      <div className='container '>
        <h1 className="typography-h1">My Jobs</h1>
        {isAssessmentBannerVisible && <AssessmentBanner />}
        <StyledCard padding={2} backgroundColor={"bg-background-30"}>
          {appliedJobs?.jobApplications?.length > 0 ? (
            <ul className='flex flex-col gap-4'>
              {appliedJobs?.jobApplications?.map((application, index) => (
                <li key={application.jobId._id || index} >
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
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <h2 className='typography-h2'>No Applied Jobs</h2>
              <p className='font-outfit typography-small-p text-font-gray'>You have not applied to any jobs yet.</p>
            </div>
          )}

          <div className='my-4'>
            <Pagination
              currentPage={page}
              setCurrentPage={setPage}
              pageLimit={PAGE_LIMIT}
              totalItems={
                appliedJobs?.totalAppliedJobs}
            />
          </div>
          <ContactUs />
        </StyledCard>
      </div>
    </div>
  );
};

export default MyJobs;