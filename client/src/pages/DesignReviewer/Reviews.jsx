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
  const [assignedCandidates, setAssignedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [groupedCandidates, setGroupedCandidates] = useState({});


  console.log("check krr", assignedCandidates);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div>
      <Header HeaderText="Reviews" />
      <div className='bg-background-30 m-6 p-6 rounded-xl'>
        <StatsGrid stats={statsOne} />
        
      </div>
    </div>
  );
};

export default Reviews