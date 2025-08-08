import React, { useEffect, useState } from 'react'
import axios from '../../services/axios';
import Header from '../../components/utility/Header';
import StatsGrid from '../../components/ui/StatsGrid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { Avatar } from '@mui/material';
import { FaFile, FaGlobe } from 'react-icons/fa';
import Loader from '../../components/Loaders/Loader';
import { useNavigate } from 'react-router-dom';
import PortfolioReview from '../../components/Reviews/PortfolioReview';
import ScreeningReview from '../../components/Reviews/ScreeningReview';
import DesignTaskReview from '../../components/Reviews/DesignTaskReview';
import RoundReview from '../../components/Reviews/RoundReview';
import StyledCard from '../../components/Cards/StyledCard';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, Folder, FolderOpen, MonitorDot, PenTool, Users } from 'lucide-react';
import ReviewsFilter from '../../components/Filters/ReviewsFilter'; // Import the new filter
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { useAuthContext } from '../../context/AuthProvider';
import { fetchAssignedCandidates, fetchUnderReviewStats, submitReview } from '../../services/dr.service';

const statsOne = [
  { title: 'Total', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Users} /> },
  { title: 'Portfolio', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Folder} /> },
  { title: 'Screening', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={MonitorDot} /> },
  { title: 'Design Task', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
  { title: 'Round 1', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
  { title: 'Round 2', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
  { title: 'Offer Sent', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
]

const Round1Review = (props) => <RoundReview roundNumber={1} {...props} />;
const Round2Review = (props) => <RoundReview roundNumber={2} {...props} />;


const Reviews = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [groupedCandidates, setGroupedCandidates] = useState({});
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    jobName: [],
    stage: [],
    'job Type' : [],
    'job Profile' : [],
  });

  // Fetch candidates
  const { data: candidates, isLoading, isError, error } = useQuery({
    queryKey: ['assignedCandidates'],
    queryFn: fetchAssignedCandidates,
    refetchOnWindowFocus: true
  });

  // Fetch stats
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError, error: statsError } = useQuery({
    queryKey: ['underReviewStats'],
    queryFn: fetchUnderReviewStats,
    refetchOnWindowFocus: true
  });

  const groupCandidatesByJobAndStage = (candidates) => {
    return candidates.reduce((jobAcc, candidate) => {
      candidate?.jobApplications.filter(app => app.currentStage !== "Hired").forEach(application => {
        if (!jobAcc[application.jobTitle]) {
          jobAcc[application.jobTitle] = {};
        }
        if (!jobAcc[application.jobTitle][application.currentStage]) {
          jobAcc[application.jobTitle][application.currentStage] = [];
        }
        jobAcc[application.jobTitle][application.currentStage].push({ ...candidate, currentApplication: application });
      });

      // Sorting data based on JobTitle
      const sortedJobAcc = Object.fromEntries(
        Object.keys(jobAcc).sort().map(key => [key, jobAcc[key]])
      );

      return sortedJobAcc;
    }, {});
  };

  // Apply filters function
  const applyFilters = (candidates, filters, searchTerm) => {
    let filtered = candidates || [];

    // Apply search filter
    if (searchTerm) {
      let regex = new RegExp(searchTerm, "i");
      filtered = filtered.filter(candidate => {
        return regex.test(candidate.firstName) || 
               regex.test(candidate.lastName) || 
               regex.test(candidate.email);
      });
    }

    // Apply job name filter
    if (filters.jobName && filters.jobName.length > 0) {
      filtered = filtered.filter(candidate => {
        return candidate.jobApplications?.some(application => 
          filters.jobName.includes(application.jobTitle)
        );
      });
    }

    // Apply stage filter
    if (filters.stage && filters.stage.length > 0) {
      filtered = filtered.filter(candidate => {
        return candidate.jobApplications?.some(application => 
          filters.stage.includes(application.currentStage)
        );
      });
    }

    // Apply job Type filter
    if (filters['job Type'] && filters['job Type'].length > 0) {
      filtered = filtered.filter(candidate => {
        return candidate.jobApplications?.some(application => 
          filters['job Type'].includes(application.jobType)
        );
      });
    }

    // Apply job Profile filter
    if (filters['job Profile'] && filters['job Profile'].length > 0) {
      filtered = filtered.filter(candidate => {
        return candidate.jobApplications?.some(application => 
          filters['job Profile'].includes(application.jobProfile)
        );
      });
    }

    return filtered;
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  // Handle search changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update filtered candidates when filters or search term changes
  useEffect(() => {
    if (candidates?.length > 0) {
      const filtered = applyFilters(candidates, appliedFilters, searchTerm);
      setFilteredCandidates(filtered);
      setGroupedCandidates(groupCandidatesByJobAndStage(filtered));
    }
  }, [candidates, appliedFilters, searchTerm]);

  // Initial setup when candidates are loaded
  useEffect(() => {
    if (candidates?.length > 0 && !isLoading) {
      setFilteredCandidates(candidates);
      setGroupedCandidates(groupCandidatesByJobAndStage(candidates));
    }
  }, [candidates, isLoading]);

  const submitReviewMutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedCandidates'] });
      queryClient.invalidateQueries({ queryKey: ['underReviewStats'] });
      showSuccessToast('Review Submitted', 'Your review has been successfully submitted.');
    },
    onError: (error) => {
      showErrorToast('Submission Failed', error.response?.data?.message || 'An error occurred while submitting your review.');
    },
  });

  const handleReviewSubmit = (candidateId, reviewData) => {
    submitReviewMutation.mutate({ candidateId, reviewData });
  };

  const renderReviewComponent = (candidate, jobProfile) => {
    switch (candidate.currentApplication.currentStage) {
      case 'Portfolio':
        return <PortfolioReview candidate={candidate} onSubmit={handleReviewSubmit} />;
      case 'Screening':
        return <ScreeningReview jobProfile={jobProfile} candidate={candidate} onSubmit={handleReviewSubmit} />;
      case 'Design Task':
        return <DesignTaskReview candidate={candidate} onSubmit={handleReviewSubmit} />;
      case 'Round 1':
        return <Round1Review candidate={candidate} onSubmit={handleReviewSubmit} />;
      case 'Round 2':
        return <Round2Review candidate={candidate} onSubmit={handleReviewSubmit} />;
      default:
        return null;
    }
  };

  // Show loader if data is loading
  if (isLoading || isStatsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) return <div>Error: {error.message}</div>;

  // Prepare statsOne object with real data
  const updatedStatsOne = statsOne.map((stat) => {
    const foundStat = statsData?.find(s => s.stage === stat.title);
    return { ...stat, value: foundStat ? foundStat.count : 0 };
  });

  // Define the order of stages
  const stageOrder = ['Portfolio', 'Design Task', 'Screening', 'Round 1'];

  // This is for opening the portfolios in different tab
  const ensureAbsoluteUrl = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const handleNavigate = (candidate) => {
    navigate(`${getRoute(user?.role,ROUTE_KEY.REVIEWS_VIEW_CANDIDATE)}/${candidate._id}/${candidate.currentApplication.jobId}`);
  }

  const groupedEntries = candidates?.length === 0 ? [] : filteredCandidates?.length > 0 ? Object.entries(groupedCandidates) : [];

  return (
    <Container>
      <Header HeaderText="Reviews" />
      <StyledCard backgroundColor={"bg-background-90"} padding={2}>
        <div className="w-full">
          <StatsGrid stats={updatedStatsOne} />
        </div>
        
        <div className='flex gap-4 items-center mt-4 w-full mb-8 '>
          <div className='w-[20%]'>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Add the ReviewsFilter component */}
          <ReviewsFilter 
            onApplyFilters={handleFilterChange}
            candidates={candidates || []}
          />
        </div>
        {groupedEntries?.length > 0 ? groupedEntries.map(([jobTitle, stages, jobProfile]) => (
          <div key={jobTitle} className="mb-8">
            <h2 className="mt-4">{jobTitle}</h2>
            {stageOrder.map(stage => {
              if (stages[stage] && stages[stage].length > 0) {
                return (
                  <div key={stage} >
                    <h3 className="mb-4">{stage}</h3>
                    {stages[stage].map(candidate => (
                      <div key={`${candidate._id}-${candidate.currentApplication.jobId}`} className="mb-4 flex flex-col bg-background-80 rounded-xl">
                        <div className='flex items-center p-4 justify-between cursor-pointer' onClick={() => handleNavigate(candidate)}>
                          <div className='flex items-center gap-4 p-4'>
                            <Avatar alt={candidate?.firstName} src={candidate.profilePictureUrl} />
                            <span className="typography-body">
                              {candidate.firstName} {candidate.lastName}
                            </span>
                            <a href={ensureAbsoluteUrl(candidate.portfolio)} target="_blank" rel="noopener noreferrer">
                              <div onClick={(e) => e.stopPropagation()}>
                                <IconWrapper hasBg={true} icon={FolderOpen} />
                              </div>
                            </a>
                          </div>

                          <div className="bg-background-70 p-2 px-4 typography-body rounded-xl">
                            {candidate.currentApplication.jobProfile}
                          </div>
                        </div>
                        {renderReviewComponent(candidate, candidate.currentApplication.jobProfile)}
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )) :
          <div className='my-4 flex flex-col items-center justify-center'>
            <h2>No Candidates</h2>
            <p className='typography-small-p text-font-gray'>
              {(appliedFilters.jobName?.length > 0 || appliedFilters.stage?.length > 0 || searchTerm) 
                ? 'No candidates match the selected filters' 
                : 'No candidate assigned for review'}
            </p>
          </div>
        }
      </StyledCard>
    </Container>
  );
};

export default Reviews;