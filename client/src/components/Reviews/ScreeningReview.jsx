import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../Buttons/Button';
import { showErrorToast } from '../ui/Toast';
import StyledCard from '../Cards/StyledCard';

function ScreeningReview({ candidate, onSubmit ,rounded = "bottom"}){

  const roundedClass =  rounded === "bottom" ? 'rounded-b-xl' : rounded === "top" ? "rounded-t-xl" : "rounded-xl";

    const [ratings, setRatings] = useState({
      Attitude: 0, Communication: 0, UX: 0, UI: 0, Tech: 0
    });
    const [feedback, setFeedback] = useState('');
  
    const handleRatingChange = (category, value) => {
      setRatings(prev => ({ ...prev, [category]: value }));
    };
    const handleSubmit = () => {
        if(ratings.Attitude < 1 || ratings.Communication < 1 || ratings.UX < 1 || ratings.UI < 1 || ratings.Tech < 1){
            showErrorToast("Oopss","Please rate the candidate")
            return
        }
      onSubmit(candidate._id, {
        jobId: candidate.currentApplication?.jobId ? candidate.currentApplication.jobId  : candidate.jobApplication.jobId ,
        stage: candidate.currentApplication?.currentStage ? candidate.currentApplication.currentStage : candidate.jobApplication.currentStage,
        ratings,
        feedback,
      });
    };
  
    return (
      <StyledCard padding={2} borderRadius={roundedClass} extraStyles=' grid grid-cols-2 gap-4 '>
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
  
      </StyledCard>
    );
  };

export default ScreeningReview
