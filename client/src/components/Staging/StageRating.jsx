import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../ui/Button';
import { showErrorToast } from '../ui/Toast';

function StageRating({name,candidate,onSubmit,stageConfig}) {
    const [rating, setRating] = useState(stageConfig?.hasSplitScoring ? Object.fromEntries(Object.entries(stageConfig?.score)?.map(([key,value])=>[key,0])) : 0);
    const [feedback, setFeedback] = useState('');
  
    const handleRatingChange = (category, value) => {
      setRating(prev => ({ ...prev, [category]: value }));
    };

    const handleSubmit = () => {
      if(stageConfig?.hasSplitScoring){
        if(rating.Attitude < 1 || rating.Communication < 1 || rating.UX < 1 || rating.UI < 1 || rating.Tech < 1){
            showErrorToast("Oopss","Please rate the candidate")
            return
        }
      }else{
        if(rating < 1){
          showErrorToast("Oopss","Please rate the candidate")
          return
        }
      }
      onSubmit(candidate._id, {
        jobId: candidate.currentApplication?.jobId ? candidate.currentApplication.jobId  : candidate.jobApplication.jobId ,
        stage: candidate.currentApplication?.currentStage ? candidate.currentApplication.currentStage : candidate.jobApplication.currentStage,
        ratings: rating,
        feedback,
      });
    };
  
    return (
      <div className='bg-background-90 flex gap-4 justify-between rounded-b-xl  items-center p-4'>
        <span className='flex-shrink-0 font-outfit'>{name} ratings</span>
        {stageConfig?.hasSplitScoring ? 
        Object.entries(rating).map(([category, value]) => (
          <div key={category} className='flex gap-4 items-center'>
            <span className='w-32  font-outfit'>{category}</span>
            <Scorer value={rating[category]} onChange={(v) => handleRatingChange(category, v)} />
  
          </div>
        ))
        :
        <Scorer value={rating} onChange={setRating} />}
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
}

export default StageRating
