import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import StatsGrid from '../../components/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import Scorer from '../../components/ui/Scorer';
import { Button } from '../../components/ui/Button';


const statsOne = [
  { title: 'Jobs Posted', value: 100, icon: one },
  { title: 'Jobs Posted', value: 100, icon: one },
  { title: 'Jobs Posted', value: 100, icon: one },
  { title: 'Jobs Posted', value: 100, icon: one },
]

const groupCandidatesByJobAndStage = (candidates) => {
  return candidates.reduce((acc, candidate) => {
    const jobTitle = candidate.jobApplied;
    const stage = candidate.stage;
    
    if (!acc[jobTitle]) {
      acc[jobTitle] = {};
    }
    if (!acc[jobTitle][stage]) {
      acc[jobTitle][stage] = [];
    }
    
    acc[jobTitle][stage].push(candidate);
    return acc;
  }, {});
};

const PortfolioReview = ({ candidate, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(candidate._id, { rating, feedback });
  };

  return (
    <div className='bg-background-100 flex gap-4 justify-between items-center p-4'>
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
    onSubmit(candidate._id, { ratings, feedback });
  };

  return (
    <div className='bg-background-100 flex flex-col gap-4 p-4'>
      {Object.entries(ratings).map(([category, value]) => (
        <div key={category} className='flex gap-4 items-center'>
          <span className='w-32'>{category}</span>
          <Scorer value={value} onChange={(v) => handleRatingChange(category, v)} />
        </div>
      ))}
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

const RoundReview = ({ roundNumber, candidate, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(candidate._id, { 
      stage: `Round ${roundNumber}`,
      rating, 
      feedback 
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

const Round1Review = (props) => <RoundReview roundNumber={1} {...props} />;
const Round2Review = (props) => <RoundReview roundNumber={2} {...props} />;


const Reviews = () => {
  const reviewerId = "66d5cd95d23888fb36a9ec5e";
  const [assignedCandidates, setAssignedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [groupedCandidates, setGroupedCandidates] = useState({});

  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/candidates/assigned/${reviewerId}`);
        const candidates = response.data.data;
        setAssignedCandidates(candidates);
        setGroupedCandidates(groupCandidatesByJobAndStage(candidates));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch assigned candidates');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [reviewerId]);


  console.log("check krr", assignedCandidates);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleSubmitReview = async (candidateId, reviewData) => {
    try {
      await axios.post(`/candidates/${candidateId}/review`, reviewData);
      // Update local state or refetch candidates
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    <div>
      <Header HeaderText="Reviews" />
      <div className='bg-background-30 m-6 p-6 rounded-xl'>
        <StatsGrid stats={statsOne} />
        {Object.entries(groupedCandidates).map(([jobTitle, stages]) => (
          <div key={jobTitle} className='mb-8'>
            <h2 className='text-xl font-bold mb-4'>{jobTitle}</h2>
            {Object.entries(stages).map(([stage, candidates]) => (
              <div key={stage} className='mb-6'>
                <h3 className='text-lg font-semibold mb-2'>{stage}</h3>
                <ul>
                  {candidates.map(candidate => (
                    <li key={candidate._id} className='mb-4'>
                      <div className='flex flex-col border border-gray-700 rounded-lg overflow-hidden'>
                        <div className='bg-background-90 p-4 flex items-center gap-4'>
                          <img src={candidate.avatar || '/default-avatar.png'} alt={candidate.firstName} className='w-10 h-10 rounded-full' />
                          <span>{candidate.firstName} {candidate.lastName}</span>
                        </div>
                        {stage === 'Portfolio' && <PortfolioReview candidate={candidate} onSubmit={handleSubmitReview} />}
                      {stage === 'Screening' && <ScreeningReview candidate={candidate} onSubmit={handleSubmitReview} />}
                      {stage === 'Round 1' && <Round1Review candidate={candidate} onSubmit={handleSubmitReview} />}
                      {stage === 'Round 2' && <Round2Review candidate={candidate} onSubmit={handleSubmitReview} />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews