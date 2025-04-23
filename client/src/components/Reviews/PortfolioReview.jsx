import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../Buttons/Button';
import { showErrorToast } from '../ui/Toast';
import StyledCard from '../Cards/StyledCard';

function PortfolioReview({ candidate, onSubmit ,rounded = "bottom"}) {

    const roundedClass =  rounded === "bottom" ? 'rounded-b-xl' : rounded === "top" ? "rounded-t-xl" : "rounded-xl"   

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
  
    const handleSubmit = () => {
      if(rating < 1){
        showErrorToast("Oopss","Please rate the candidate")
        return
      }
      onSubmit(candidate._id, {
        jobId: candidate.currentApplication?.jobId ? candidate.currentApplication.jobId  : candidate.jobApplication.jobId ,
        stage: candidate.currentApplication?.currentStage ? candidate.currentApplication.currentStage : candidate.jobApplication.currentStage,
        ratings: rating,
        feedback,
      });
    };
  
    return (
      <StyledCard padding={2} borderRadius={roundedClass} extraStyles=' flex gap-4 justify-between  items-center  font-outfit'>
        <span className='flex-shrink-0'>Portfolio Ratings</span>
        <Scorer value={rating} onChange={setRating} />
        <input
          type="text"
          className='w-full bg-background-80 text-white p-2 rounded'
          placeholder='Enter Your Feedback'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button variant="icon" onClick={handleSubmit}>Submit</Button>
      </StyledCard>
    );
  };

export default PortfolioReview

