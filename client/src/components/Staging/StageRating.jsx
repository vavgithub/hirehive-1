import React, { useState } from 'react'
import Scorer from '../ui/Scorer';
import { Button } from '../Buttons/Button';
import { showErrorToast } from '../ui/Toast';
import axios from '../../api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStageStatus } from '../../redux/applicationStageSlice';
import { useDispatch } from 'react-redux';

function StageRating({candidateId,jobId,name,candidate,onSubmit,stageConfig}) {
    const [rating, setRating] = useState(stageConfig?.hasSplitScoring ? Object.fromEntries(Object.entries(stageConfig?.score)?.map(([key,value])=>[key,0])) : 0);
    const [feedback, setFeedback] = useState('');
  
    //Round2 
    const [score, setScore] = useState(0);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const scoreRoundTwoMutation = useMutation({
      mutationFn: (scoreData) => axios.post('hr/score-round-two', scoreData),
      onSuccess: (data) => {
          dispatch(updateStageStatus({
              stage: 'Round 2',
              status: 'Reviewed',
              data: data.updatedStageStatus
          }));
          queryClient.invalidateQueries(['candidate', candidateId, jobId]);
      },
      onError: (error) => {
          console.error("Error scoring Round 2:", error);
          // Handle error (e.g., show error message to user)
      }
  });

  const handleScoreSubmit = () => {
      scoreRoundTwoMutation.mutate({ candidateId, jobId, score, feedback });
  };

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
    if(stageConfig?.name === "Round 2"){
      return (
        <>
            <div className='flex gap-4 mt-4'>
                <div className="flex flex-col w-full typography-body gap-4">
                    <span>Feedback:</span>

                    <textarea
                        className="w-full rounded-xl px-3 py-2 bg-background-40  outline-none focus:outline-teal-300 resize-none"
                        placeholder="Enter your feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                    />
                </div>
                <div className="flex flex-col  gap-4">
                    <span>Score:</span>
                    <Scorer value={score} onChange={setScore} />
                </div>

            </div>
            <div className='flex justify-end typography-body'>
                    <Button onClick={handleScoreSubmit} disabled={score === 0 || feedback === ''}>
                        Submit Score
                    </Button>
            </div>
        </>
      )
    }else{
      return (
        <div className='bg-background-90 flex typography-body gap-4 justify-between rounded-xl mt-4 items-center p-4'>
          {stageConfig?.hasSplitScoring ? 
          <>
          <div className='grid grid-cols-2 w-full gap-4'>
            {Object.entries(rating).map(([category, value]) => {
              if(category !== "Budget")
              return (
              <div key={category} className='flex gap-4 items-center'>
                <span className='w-32 '>{category}</span>
                <Scorer value={rating[category]} onChange={(v) => handleRatingChange(category, v)} />
      
              </div>
            )})}
            <div className='flex gap-4'>
              <input
                type="text"
                className='w-full bg-background-80 text-white p-2 rounded'
                placeholder='Enter Your Feedback'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button variant="icon" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
          </>
          :
          <>
          <span className='flex-shrink-0 '>{name} Ratings</span>
            <div className='flex w-[70%] gap-4'>
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
          </>}
        </div>
      );
    }
}

export default StageRating
