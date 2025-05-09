import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
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


const statsOne = [
  { title: 'Total', value: 0, icon:  () => <IconWrapper size={10} isInActiveIcon icon={Users} /> },
  { title: 'Portfolio', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Folder} /> },
  { title: 'Screening', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={MonitorDot} /> },
  { title: 'Design Task', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
  { title: 'Round 1', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
  { title: 'Round 2', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
  { title: 'Offer Sent', value: 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
]


const Round1Review = (props) => <RoundReview roundNumber={1} {...props} />;
const Round2Review = (props) => <RoundReview roundNumber={2} {...props} />;

// API functions
const fetchCandidates = async () => {
  const response = await axios.get('dr/assigned-candidates');
  return response.data;
};

// API function to fetch stats
const fetchUnderReviewStats = async () => {
  const response = await axios.get('dr/under-review-stats');
  return response.data.stats;
};


const submitReview = async ({ candidateId, reviewData }) => {
  const response = await axios.post('dr/submit-score-review', {
    candidateId,
    ...reviewData,
  });
  return response.data;
};


const Reviews = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [groupedCandidates,setGroupedCandidates] = useState({});

  // Fetch candidates
  const { data: candidates, isLoading, isError, error } = useQuery({
    queryKey: ['assignedCandidates'],
    queryFn: fetchCandidates,
    refetchOnWindowFocus : false
  });

  // Fetch stats
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError, error: statsError } = useQuery({
    queryKey: ['underReviewStats'],
    queryFn: fetchUnderReviewStats,
    refetchOnWindowFocus : false
  });

  const groupCandidatesByJobAndStage = (candidates) => {
    return candidates.reduce((jobAcc, candidate) => {
      candidate?.jobApplications.forEach(application => {
        if (!jobAcc[application.jobTitle]) {
          jobAcc[application.jobTitle] = {};
        }
        if (!jobAcc[application.jobTitle][application.currentStage]) {
          jobAcc[application.jobTitle][application.currentStage] = [];
        }
        jobAcc[application.jobTitle][application.currentStage].push({ ...candidate, currentApplication: application });
      });

      //Sorting data based on JobTitle
      const sortedJobAcc = Object.fromEntries(
        Object.keys(jobAcc).sort().map(key => [key, jobAcc[key]])
      );

      return sortedJobAcc;
    }, {});
  };

  useEffect(()=>{
    if(candidates?.length > 0 && !isLoading){
      setGroupedCandidates(groupCandidatesByJobAndStage(candidates))
    }
  },[candidates])

  const [searchTerm,setSearchTerm] = useState("");

  useEffect(()=>{
    if(candidates?.length > 0){
      let regex = new RegExp(searchTerm, "i");
      const filteredCandidates = candidates?.filter(candidate =>{
        if(regex.test(candidate.firstName) || regex.test(candidate.lastName) || regex.test(candidate.email)){
          return candidate
        }
      })
      setGroupedCandidates(groupCandidatesByJobAndStage(filteredCandidates))
    }
  },[searchTerm,candidates])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }


  const submitReviewMutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignedCandidates'] });
      queryClient.invalidateQueries({ queryKey: ['underReviewStats'] }); // Invalidate stats on success
      showSuccessToast('Review Submitted', 'Your review has been successfully submitted.');
    },
    onError: (error) => {
      showErrorToast('Submission Failed', error.response?.data?.message || 'An error occurred while submitting your review.');
    },
  });

  const handleReviewSubmit = (candidateId, reviewData) => {
    submitReviewMutation.mutate({ candidateId, reviewData });
  };

  const renderReviewComponent = (candidate) => {
    switch (candidate.currentApplication.currentStage) {
      case 'Portfolio':
        return <PortfolioReview candidate={candidate} onSubmit={handleReviewSubmit} />;
      case 'Screening':
        return <ScreeningReview candidate={candidate} onSubmit={handleReviewSubmit} />;
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

  //this is for opening the portfolios in different tab
  const ensureAbsoluteUrl = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };
  
  const handleNavigate = ( candidate) =>{
   
    navigate(`/design-reviewer/candidates/view-candidate/${candidate._id}/${candidate.currentApplication.jobId}`)
  }

  const groupedEntries = candidates?.length > 0 ? Object.entries(groupedCandidates) : [];

  return (
    // <div className='w-full p-4'>
    //   <div className='container'>
    <Container>
      <Header HeaderText="Reviews" />
      <StyledCard backgroundColor={"bg-background-30"} padding={2}>
        <div className="w-full">

          <StatsGrid stats={updatedStatsOne} />
        </div>
        <div className='flex gap-4 items-center mt-4 w-full'>
          <div className='w-[20%]'>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
          </div>
        </div>
        {groupedEntries?.length > 0 ? groupedEntries.map(([jobTitle, stages, jobProfile]) => (
          <div key={jobTitle} className="mb-8">
            <h2 className="typography-h2 my-4">{jobTitle}</h2>
            {stageOrder.map(stage => {
              if (stages[stage] && stages[stage].length > 0) {
                return (
                  <div key={stage} className="mb-6 ">
                    <h3 className="typography-h3 mb-4">{stage}</h3>
                    {stages[stage].map(candidate => (
                      <div key={`${candidate._id}-${candidate.currentApplication.jobId}`} className="mb-4 flex flex-col bg-background-80 rounded-xl ">
                        <div className='flex items-center p-4  justify-between cursor-pointer ' onClick={()=> handleNavigate(candidate)}>
                          <div className='flex items-center gap-4 p-4'>


                            <Avatar alt={candidate?.firstName} sx={{ width: "32px", height: "32px" }} src={candidate.profilePictureUrl} />
                            <span className="typography-body ">
                              {candidate.firstName} {candidate.lastName}

                            </span>
                            <a href={ensureAbsoluteUrl(candidate.portfolio)} target="_blank" rel="noopener noreferrer">
                              <div onClick={(e)=>e.stopPropagation()}>
                              <IconWrapper hasBg={true} icon={FolderOpen} />
                              </div>
                            </a>
                          </div>

                          <div className="bg-background-80 p-2 px-4 typography-body  rounded-xl">
                            {candidate.currentApplication.jobProfile}
                          </div>


                        </div>
                        {renderReviewComponent(candidate)}
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
          <h2 className='typography-h2'>No Candidates</h2>
          <p className='typography-small-p text-font-gray'>No candidate assigned for review</p>
        </div>
        }
      </StyledCard>
    </Container>
    // </div>
    // </div>
  );
};

export default Reviews;