import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../ui/Button';
import { showErrorToast } from '../ui/Toast';

function DesignTaskReview({ candidate, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
  
    const handleSubmit = () => {
      if(rating < 1){
        showErrorToast("Oopss","Please rate the candidate");
        return
      }
      onSubmit(candidate._id, {
        jobId: candidate.currentApplication?.jobId ? candidate.currentApplication.jobId  : candidate.jobApplication.jobId ,
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

export default DesignTaskReview

