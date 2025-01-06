import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../ui/Button';
import { showErrorToast } from '../ui/Toast';

function ScreeningReview({ candidate, onSubmit }){
    const [ratings, setRatings] = useState({
      Attitude: 0, Communication: 0, UX: 0, UI: 0, Tech: 0
    });
    const [feedback, setFeedback] = useState('');
  
    const handleRatingChange = (category, value) => {
      setRatings(prev => ({ ...prev, [category]: value }));
    };
    const handleSubmit = () => {
        if(ratings.Attitude < 1 || ratings.Communication < 1 || ratings.UX < 1 || ratings.UI < 1 || ratings.Tech < 1){
            showErrorToast("Error","Please rate the candidate")
            return
        }
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

export default ScreeningReview
