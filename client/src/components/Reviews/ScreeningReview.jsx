import React, { useEffect, useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../Buttons/Button';
import { showErrorToast } from '../ui/Toast';
import StyledCard from '../Cards/StyledCard';
import { stagingConfig } from '../../config/staging.config';
import { useAuthContext } from '../../context/AuthProvider';

function ScreeningReview({ jobProfile, candidate, onSubmit ,rounded = "bottom"}){
  
  const { user } = useAuthContext();
  const roundedClass =  rounded === "bottom" ? 'rounded-b-xl' : rounded === "top" ? "rounded-t-xl" : "rounded-xl";
  const scoringConfig = stagingConfig[jobProfile]?.find(stage => stage.name === "Screening");

  const [ratings, setRatings] = useState( Object.fromEntries(Object.entries(scoringConfig?.score)?.filter(([key,value]) => key !== "Budget")?.map(([key,value])=>[key,0])));

  const customSchema = user?.companyDetails?.customScreeningParam[jobProfile] ?? []

  useEffect(() => {
    if(scoringConfig?.hasSplitScoring && customSchema){
      let newRating = {...ratings}
      customSchema?.map(schema => {
        if(ratings.hasOwnProperty(schema?.defaultKey)){
          newRating[schema.customKey] = 0
          delete newRating[schema?.defaultKey]
        } 
      })
      setRatings(newRating)
    }
  },[scoringConfig?.hasSplitScoring,customSchema])

  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };
  const handleSubmit = () => {
      if(Object.entries(ratings).filter(([key,value]) => key !== "Budget" && value === 0)?.length > 0){
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
      <StyledCard padding={2} backgroundColor={'bg-background-70'} borderRadius={roundedClass} extraStyles=' grid grid-cols-2 gap-4 '>
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
