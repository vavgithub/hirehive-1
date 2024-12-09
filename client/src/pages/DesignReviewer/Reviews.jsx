import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import Scorer from '../../components/ui/Scorer';
import { Button } from '../../components/ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Total from '../../svg/StatsCard/View Candidate/Total';
import Portfolio from '../../svg/StatsCard/View Candidate/Portfolio';
import Screening from '../../svg/StatsCard/View Candidate/Screening';
import DesignTask from '../../svg/StatsCard/View Candidate/DesignTask';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { Avatar } from '@mui/material';
import { FaFile, FaGlobe } from 'react-icons/fa';
import FileMainIcon from '../../svg/FileMainIcon';
import OfferSent from '../../svg/StatsCard/View Candidate/OfferSent';
import Round1 from '../../svg/StatsCard/View Candidate/Round1';
import Round2 from '../../svg/StatsCard/View Candidate/Round2';
import Loader from '../../components/ui/Loader';
import { useNavigate } from 'react-router-dom';


const statsOne = [
  { title: 'Total', value: 0, icon: Total },
  { title: 'Portfolio', value: 0, icon: Portfolio },
  { title: 'Screening', value: 0, icon: Screening },
  { title: 'Design Task', value: 0, icon: DesignTask },
  { title: 'Round 1', value: 0, icon: Round1 },
  { title: 'Round 2', value: 0, icon: Round2 },
  { title: 'Offer Sent', value: 0, icon: OfferSent },
]


const PortfolioReview = ({ candidate, onSubmit }) => {


  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(candidate._id, {
      jobId: candidate.currentApplication.jobId,
      stage: candidate.currentApplication.currentStage,
      ratings: rating,
      feedback,
    });
  };

  return (
    <div className='bg-background-90 flex gap-4 justify-between rounded-b-xl  items-center p-4'>
      <span className='flex-shrink-0'>Portfolio ratings</span>
      <Scorer value={rating} onChange={setRating} />
      <input
        type="text"
        className='w-full bg-background-80 text-white p-2 rounded'
        placeholder='Enter Your Feedback'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button variant="icon" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

const ScreeningReview = ({ candidate, onSubmit }) => {
  const [ratings, setRatings] = useState({
    Attitude: 0, Communication: 0, UX: 0, UI: 0, Tech: 0
  });
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };
  const handleSubmit = () => {
    onSubmit(candidate._id, {
      jobId: candidate.currentApplication.jobId,
      stage: candidate.currentApplication.currentStage,
      ratings,
      feedback,
    });
  };

  return (
    <div className='bg-background-90 grid grid-cols-2 gap-4 p-4'>
      {Object.entries(ratings).map(([category, value]) => (
        <div key={category} className='flex gap-4 items-center'>
          <span className='w-32'>{category}</span>
          <Scorer value={ratings[category]} onChange={(v) => handleRatingChange(category, v)} />

        </div>
      ))}
      <div className='flex gap-4'>

        <input
          type="text"
          className='w-full bg-background-80 text-white p-2 rounded'
          placeholder='Enter Your Feedback'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div>
          <Button variant="icon" onClick={handleSubmit}>Submit</Button>

        </div>
      </div>

    </div>
  );
};

export const RoundReview = ({ roundNumber, candidate, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(candidate._id, {
      jobId: candidate.currentApplication.jobId,
      stage: `Round ${roundNumber}`,
      ratings: rating,
      feedback,
    });
  };


  return (
    <div className='bg-background-100 flex gap-4 justify-between items-center p-4'>
      <span className='flex-shrink-0'>{`Round ${roundNumber} ratings`}</span>
      <Scorer value={rating} onChange={setRating} />

      <input
        type="text"
        className='w-full bg-background-80 text-white p-2 rounded'
        placeholder='Enter Your Feedback'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button variant="icon" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

const DesignTaskReview = ({ candidate, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(candidate._id, {
      jobId: candidate.currentApplication.jobId,
      stage: 'Design Task',
      ratings: rating,
      feedback,
    });
  };

  return (
    <div className='bg-background-100 flex gap-4 justify-between items-center p-4'>
      <span className='flex-shrink-0'>Design Task Ratings</span>
      <Scorer value={rating} onChange={setRating} />

      <input
        type="text"
        className='w-full bg-background-80 text-white p-2 rounded'
        placeholder='Enter Your Feedback'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button variant="icon" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

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

  // Fetch candidates
  const { data: candidates, isLoading, isError, error } = useQuery({
    queryKey: ['assignedCandidates'],
    queryFn: fetchCandidates,
  });

  // Fetch stats
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError, error: statsError } = useQuery({
    queryKey: ['underReviewStats'],
    queryFn: fetchUnderReviewStats,
  });


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


  const groupCandidatesByJobAndStage = (candidates) => {
    return candidates.reduce((jobAcc, candidate) => {
      candidate.jobApplications.forEach(application => {
        if (!jobAcc[application.jobTitle]) {
          jobAcc[application.jobTitle] = {};
        }
        if (!jobAcc[application.jobTitle][application.currentStage]) {
          jobAcc[application.jobTitle][application.currentStage] = [];
        }
        jobAcc[application.jobTitle][application.currentStage].push({ ...candidate, currentApplication: application });
      });
      return jobAcc;
    }, {});
  };
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) return <div>Error: {error.message}</div>;


  const groupedCandidates = groupCandidatesByJobAndStage(candidates);

  // Prepare statsOne object with real data
  const updatedStatsOne = statsOne.map((stat) => {
    const foundStat = statsData.find(s => s.stage === stat.title);
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

  return (
    <div className='p-4'>
      <Header HeaderText="Reviews" />
      <div className='bg-background-30  p-4 rounded-xl'>
        <div className="w-full max-w-6xl">

          <StatsGrid stats={updatedStatsOne} />
        </div>
        {Object.entries(groupedCandidates).map(([jobTitle, stages, jobProfile]) => (
          <div key={jobTitle} className="mb-8">
            <h1 className="typography-h1 my-4">{jobTitle}</h1>
            {stageOrder.map(stage => {
              if (stages[stage] && stages[stage].length > 0) {
                return (
                  <div key={stage} className="mb-6 ">
                    <h2 className="typography-h2 mb-3">{stage}</h2>
                    {stages[stage].map(candidate => (
                      <div key={`${candidate._id}-${candidate.currentApplication.jobId}`} className="mb-4 flex flex-col bg-background-60 rounded-xl ">
                        <div className='flex items-center p-4  justify-between cursor-pointer ' onClick={()=> handleNavigate(candidate)}>
                          <div className='flex items-center gap-4'>


                            <Avatar alt={candidate?.firstName} sx={{ width: "32px", height: "32px" }} src="/path-to-profile-image.jpg" />
                            <span className="typography-body ">
                              {candidate.firstName} {candidate.lastName}

                            </span>
                            <a href={ensureAbsoluteUrl(candidate.portfolio)} target="_blank" rel="noopener noreferrer">
                              <div onClick={(e)=>e.stopPropagation()}>
                              <FileMainIcon />

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
        ))}
      </div>
    </div>
  );
};

export default Reviews;