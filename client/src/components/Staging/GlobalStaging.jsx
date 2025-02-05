import React, { useEffect, useMemo, useState } from 'react'
import StyledCard from '../ui/StyledCard'
import StatusBadge from '../ui/StatusBadge'
import { stagingConfig } from './staging.config.js';   
import ClosedBadge from '../../svg/ClosedBadge.jsx';
import AssigneeSelector from '../utility/AssigneeSelector.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BudgetIcon from '../../svg/Staging/BudgetIcon.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../ui/Label.jsx';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice.js';
import axios from '../../api/axios.js';
import StageRating from './StageRating.jsx';
import { showErrorToast, showSuccessToast } from '../ui/Toast.jsx';
import { Button } from '../ui/Button.jsx';
import Modal from '../Modal.jsx';
import { ACTION_TYPES } from '../../utility/ActionTypes.js';
import { getMaxScoreForStage } from '../../pages/Admin/ViewCandidateProfile.jsx';
import { getCandidateScore } from './StageAction.jsx';
import { ScheduleForm } from './Screening.jsx';
import CalenderIcon from '../../svg/Staging/CalenderIcon.jsx';
import ClockIcon from '../../svg/Staging/ClockIcon.jsx';
import LinkIcon from '../../svg/Staging/LinkIcon.jsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon.jsx';
import { formatTime } from '../../utility/formatTime.js';
import NoShowAction from './NoShow.jsx';
import useScheduler from '../../hooks/useScheduler.jsx';
import BulletMarks from '../ui/BulletMarks.jsx';
import Scorer from '../ui/Scorer.jsx';
import TaskForm, { SubmissionForm } from './TaskForm.jsx';
import TaskDetails, { SubmissionDetails } from './TaskDetails.jsx';
import HiredStamp from "../../svg/Background/HiredStamp.svg"
import Loader from '../ui/Loader.jsx';

const submitReview = async ({ candidateId, reviewData }) => {
    const response = await axios.post('dr/submit-score-review', {
        candidateId,
        ...reviewData,
    });
    return response.data;
};

function GlobalStaging({selectedStage,stageStatuses,role,jobProfile,isClosed}) {
    const stageData = stageStatuses[selectedStage];
    const currentStatus = stageData?.status;
    const candidateData = useSelector(state => state.candidate.candidateData);

    const { stageTitle, stageConfig, stageBasedConfig , candidateId, jobId} = useMemo(()=>{
      const isValidstage =  stagingConfig[jobProfile]?.filter(stage=> stage?.name === selectedStage);
      const stageTitle = isValidstage?.length > 0 ? isValidstage[0]?.name : "";
  
      const stageConfig = isValidstage[0];
      const stageBasedConfig = isValidstage[0]?.contentConfig[currentStatus][role];
      const candidateId = candidateData?._id;
      const jobId = candidateData?.jobApplication?.jobId;

      return {stageTitle, stageConfig, stageBasedConfig, candidateId, jobId}
    },[candidateData,jobProfile,selectedStage,role])


    const data = useScheduler(candidateData, stageData, "Under Review")

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false);

    //Actions management
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isBudgetScoreSubmitted, setIsBudgetScoreSubmitted] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [budgetScore, setBudgetScore] = useState(0);

    useEffect(()=>{
      if(stageTitle === "Screening"){
        if(stageData?.score?.Budget){
          setIsBudgetScoreSubmitted(true)
        }
      }
    },[stageTitle])

    //Assignee Updation
    const updateAssigneeMutation = useMutation({
      mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
          candidateId,
          jobId,
          stage: stageTitle,
          assigneeId: newAssignee._id
      }),
      onSuccess: (response) => {
         
          const { updatedStageStatus, currentStage } = response.data;

          dispatch(updateStageStatus({
              stage: stageTitle,
              status: updatedStageStatus.status,
              data: {
                  ...stageData,
                  ...updatedStageStatus,
              }
          }));

          if (currentStage) {
              dispatch(setCurrentStage(currentStage));
          }

          queryClient.invalidateQueries(['candidate', candidateId, jobId]);
      },
      onError: (error) => {
          console.error("Assignee update error:", error);
      }
  });

  const handleAssigneeChange = (newAssignee) => {
      updateAssigneeMutation.mutate(newAssignee);
  };


  //Rating Submission
  const handleReviewSubmit = (candidateId, reviewData) => {
      submitReviewMutation.mutate({ candidateId, reviewData });
  };

  const submitReviewMutation = useMutation({
      mutationFn: submitReview,
      onSuccess: () => {

          queryClient.invalidateQueries(['candidate', candidateId, jobId]);
          showSuccessToast('Review Submitted', 'Your review has been successfully submitted.');
      },
      onError: (error) => {
          showErrorToast('Submission Failed', error.response?.data?.message || 'An error occurred while submitting your review.');
      },
  });

  //Actions API
  const rejectCandidateMutation = useMutation({
      mutationFn: ({ candidateId, jobId, rejectionReason }) => 
          axios.post('/hr/reject-candidate', { candidateId, jobId, rejectionReason }),
      onMutate: () => {
          setIsLoading(true); // Set loading to true when mutation starts
      },
      onSuccess: (data) => {
          dispatch(updateStageStatus({
              stage : stageTitle,
              status: 'Rejected',
              data: {
                  ...data,
                  rejectionReason: data.rejectionReason
              }
          }));
          queryClient.invalidateQueries(['candidate', candidateId, jobId]);
          setIsModalOpen(false);
          setIsLoading(false); // Stop loading when task is successfully sent
      },
      onError: (error) => {
          console.error('Error sending Rejection:', error);
          setIsLoading(false); // Stop loading in case of an error
      }
  });
  
    const moveToNextRoundMutation = useMutation({
        mutationFn: () => axios.post('/hr/move-candidate', {
            candidateId,
            jobId,
            currentStage : stageTitle
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage : stageTitle,
                status: 'Cleared',
                data: data
            }));
            dispatch(setCurrentStage(data.nextStage));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsModalOpen(false);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            console.error('Error moving to next round:', error);
            setIsLoading(false); // Stop loading in case of an error
        }
    });
  
    const handleReject = (item, rejectionReason) => {       
        rejectCandidateMutation.mutate({ candidateId, jobId, rejectionReason });
    };

    const handleMoveToNextRound = () => {
        moveToNextRoundMutation.mutate();
    };

    //Schedule actions
    const scheduleMutation = useMutation({
        mutationFn: (scheduleData) => axios.post('hr/schedule-call', {
            ...scheduleData,
            stage: stageTitle
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: stageTitle,
                status: 'Call Scheduled',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            console.error("Error scheduling interview:", error);
            // Handle error (e.g., show error message to user)
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const rescheduleMutation = useMutation({
        mutationFn: (rescheduleData) => axios.post('hr/reschedule-call', {
            ...rescheduleData,
            stage: stageTitle
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: stageTitle,
                status: 'Call Scheduled',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsRescheduling(false);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            console.error("Error rescheduling interview:", error);
            // Handle error (e.g., show error message to user)
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const handleSchedule = (scheduleData) => {
        scheduleMutation.mutate({ candidateId, jobId, ...scheduleData });
    };

    const handleReschedule = (rescheduleData) => {
        rescheduleMutation.mutate({ candidateId, jobId, ...rescheduleData });
    };

    //Scoring functions
    const getTotalScore = ()=>{
        let score = 0;    
        return score + (stageData?.score?.Attitude ?? 0) +
        (stageData?.score?.UX ?? 0) +
        (stageData?.score?.Tech ?? 0) +
        (stageData?.score?.Communication ?? 0) +
        (stageData?.score?.UI ?? 0) +
        (stageData?.score?.Budget ?? 0)
    }

    const submitBudgetScoreMutation = useMutation({
        mutationFn: (score) => axios.post('hr/submit-budget-score', { candidateId, jobId, stage: 'Screening', score }),
        onSuccess: (data) => {

            dispatch(updateStageStatus({
                stage: 'Screening',
                status: 'Reviewed',
                data: {
                    ...stageData,
                    score: data.updatedScore,
                }
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsBudgetScoreSubmitted(true);

            // Recalculate total score
            // const scores = Object.values(data.updatedScore);
            // const sum = scores.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
            // setTotalScore(sum);
        },
        onError: (error) => {
            console.error('Error submitting budget score:', error);
            // You can add user-facing error handling here, e.g., showing an error message
        }
    });

    const handleBudgetScoreSubmit = () => {
        if (budgetScore > 0) {

            submitBudgetScoreMutation.mutate(budgetScore);
        }
    };

    const { totalSum , grandSum } = useMemo(() => {
        let totalSum = 0;
        let grandSum = 0;
        if(stageStatuses && jobProfile && stageTitle){
            let stages = stagingConfig[jobProfile];
            for(let stage of stages){
                if(stage?.name !== stageTitle){
                    if(stage?.hasSplitScoring){
                        Object.keys(stage?.score)?.map(scoring=>{
                            totalSum += stageStatuses[stage?.name]?.score ? parseInt(stageStatuses[stage?.name]?.score[scoring] ?? 0) : 0
                            grandSum += stage?.score[scoring]
                        })
                    }else{
                        totalSum += parseInt(stageStatuses[stage?.name]?.score ?? 0)
                        grandSum += stage?.score
                    }
                }else{
                    if(stage?.hasSplitScoring){
                        Object.keys(stage?.score)?.map(scoring=>{
                            totalSum += stageStatuses[stage?.name]?.score ? parseInt(stageStatuses[stage?.name]?.score[scoring] ?? 0) : 0
                            grandSum += stage?.score[scoring]
                        })
                    }else{
                        totalSum += parseInt(stageStatuses[stage?.name]?.score ?? 0)
                        grandSum += stage?.score
                    }
                    break
                }
            }
        }
        return {
            totalSum : isNaN(totalSum) ? 0 : totalSum,
            grandSum : isNaN(grandSum) ? 0 : grandSum,
        }
    },[stagingConfig,jobProfile,stageStatuses,stageTitle]);

    const renderCallData = (call,isRescheduled) => (
      <div className={(isRescheduled && "w-[43%] ") + ' bg-background-80 flex justify-between items-center rounded-xl p-4'}>
            <div className='flex flex-col'>
                {!isRescheduled && <span className='typography-small-p text-font-gray'>Date</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2'}>
                    <CalenderIcon customStroke={"#808389"} />
                    <h2 className={isRescheduled && 'typography-body'}>
                        {new Date(call?.scheduledDate).toLocaleDateString('en-gb', { timeZone: 'UTC' })}
                    </h2>
                </div>
            </div>
            {isRescheduled && <div className='w-1 h-1 border-font-gray bg-font-gray border-[1px] rounded-full '></div>}
            <div className='flex flex-col'>
                {!isRescheduled && <span className='typography-small-p text-font-gray'>Time</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2'}>
                    <ClockIcon customStroke={"#808389"} />
                    <h2 className={isRescheduled && 'typography-body'}>
                        {formatTime(call?.scheduledTime)}
                    </h2>
                </div>
            </div>
            {isRescheduled && <div className='w-1 h-1 border-font-gray bg-font-gray border-[1px] rounded-full '></div>}
            <div className='flex flex-col '>
                {!isRescheduled && <span className='typography-small-p text-font-gray'>Meeting Link</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2'}>
                    <LinkIcon customStroke={"#808389"} />
                    <h2 className={(isRescheduled ? "text-font-gray typography-body " : "text-font-primary") + ' mr-2 '}>screening_meeting_link</h2>
                    {!isRescheduled && <CopyToClipboard text={call?.meetingLink}>
                        <button className='flex items-center bg-background-70 px-[10px] py-[10px] rounded-xl'>
                            <ClipboardIcon />
                        </button>
                    </CopyToClipboard>}
                </div>
            </div>
        </div>
    )


    const renderScoreCategories = () => {
        const categories = [
            { label: 'Attitude', value: stageData?.score?.Attitude },
            { label: 'UX', value: stageData?.score?.UX },
            { label: 'Tech', value: stageData?.score?.Tech },
            { label: 'Communication', value: stageData?.score?.Communication },
            { label: 'UI', value: stageData?.score?.UI },
            ...(isBudgetScoreSubmitted ? [{ label: 'Budget', value: stageData?.score?.Budget }] : []),
        ];

        return (<div className='grid grid-cols-3 gap-3 w-full '>
            {categories.map((category, index) => (
                <div key={index} className='grid grid-cols-[1fr,1fr] w-full gap-4 items-center'>
                    <span className='typography-body text-font-gray '>{category.label}</span>
                    <BulletMarks marks={category.value} />
                </div>
            ))}
        </div>)
    };

  return (
    <StyledCard 
    padding={3} 
    backgroundColor={"bg-background-30"}
    extraStyles={"relative min-h-[12rem]"}
    >
      {/* Header Part */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <h2 className='typography-h2'>{stageTitle}</h2>
            {stageConfig?.extraHeaderContent && stageConfig?.extraHeaderContent({portfolio : candidateData.jobApplication.professionalInfo.portfolio})}
        </div>
        <div className='flex items-center w-[40%] justify-end'>
            {
                isClosed &&
                <div className='absolute top-0  right-0 flex items-center justify-center h-full'>
                    <ClosedBadge />
                </div>
            }

            {isClosed || <StatusBadge customWidth={'w-fit'} status={currentStatus} />}
            {
                stageBasedConfig?.hasAssigneeSelectorIcon && (

                    <AssigneeSelector
                        mode="icon"
                        value={stageData?.assignedTo}
                        onChange={handleAssigneeChange}
                        onSelect={handleAssigneeChange}
                        disabled={!stageBasedConfig?.hasAssigneeSelectorEnabled} // Disable only if status is 'Rejected' or 'Cleared'
                    />

                )
            }

            {(!isClosed && stageBasedConfig?.hasBudgetLabel) &&
                <>
                    <div className='h-8 w-1 rounded bg-background-70 mx-2'></div>

                    <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center mr-2'>
                        <BudgetIcon />
                    </div>
                    <span className='typograhpy-body font-outfit'>{candidateData?.jobApplication?.professionalInfo?.expectedCTC}LPA</span>
                </>}
            </div>
      </div>
      {/* Body Section */}
      {
        isLoading ? 
            <div className='flex justify-center items-center w-full'>
                <Loader />
            </div>
        :
        <>
        <div >
        {stageBasedConfig?.hasLabel && <div className='mt-4'><Label icon={stageBasedConfig?.hasLabel?.icon} text={stageBasedConfig?.hasLabel?.hasCustomContent ? (stageBasedConfig?.hasLabel?.content + candidateData?.jobApplication?.jobApplied) : stageBasedConfig?.hasLabel?.content} /></div>}
        {
            stageBasedConfig?.hasSubmissionDetails && 
            <SubmissionDetails candidateData={candidateData} stageData={stageData} />
        }
        {stageBasedConfig?.hasAssigneeSelector && 
          <div className='w-2/5'>
              <h4 className='typography-body my-4 font-outfit'>Select Reviewer</h4>
              <AssigneeSelector
                  mode="default"
                  value={stageData?.assignedTo}
                  onChange={handleAssigneeChange}
                  onSelect={handleAssigneeChange}
              />
          </div>
        }
        {
            stageBasedConfig?.hasTaskForm && 
            <TaskForm
            candidateId={candidateId}
            jobId={jobId}
            candidateEmail={candidateData?.email}
            setIsLoading={setIsLoading}
            />
        }
        {
            stageBasedConfig?.hasTaskDetails && 
            <TaskDetails stageData={stageData} />
        }
        {
            stageBasedConfig?.hasHiredLabel && 
                <img className='absolute top-2 left-3/4' src={HiredStamp} alt='Hired Stamp' />
        }
        {
            stageBasedConfig?.hasSubmissionForm && 
            <SubmissionForm candidateId={candidateId} jobId={jobId} stageData={stageData} />
        }
        {
          stageBasedConfig?.hasRatingComponent && <StageRating candidateId={candidateId} jobId={jobId} name={stageConfig?.name} candidate={candidateData} onSubmit={handleReviewSubmit} stageConfig={stageConfig} />
        }
        <div className='flex gap-4 w-full '>
            <div className='w-[75%] flex flex-col justify-between gap-4 '>
            {(stageBasedConfig?.hasRemarks || stageBasedConfig?.hasRejectionReason) && 
                <div className='mt-4'>
                    <p className='typography-small-p text-font-gray'>{currentStatus === 'Rejected' ? "Rejection Reason" : "Remarks"}</p>
                    <p className='typography-body '>{currentStatus === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback ? stageData?.feedback : 'No feedbacks'}</p>
                </div>
            }
            {
                stageBasedConfig?.hasScoreBoard && 
                <div className=' flex flex-col'>
                    <p className='typography-small-p text-font-gray mb-4'>Score</p>                   
                    <div className='p-4 rounded-xl bg-background-60 flex min-h-[115px] '>
                        {renderScoreCategories()}
                    </div>
                </div>
            }
            </div>
            <div className='w-[35%] flex flex-col'>
            {stageBasedConfig?.hasScoreCard && 
            <div className='bg-stars bg-cover rounded-xl w-[160px] h-fit my-4 self-end'>
                <div className='p-4 flex flex-col items-center'>
                    <p className='typography-small-p text-font-gray'>Total Score:</p>
                    <div className='flex flex-col items-center text-font-accent'>
                        <p className='display-d2 font-bold'>{stageConfig?.showGrandTotal ? totalSum : stageConfig?.hasSplitScoring ? getTotalScore() : stageData?.score || 0}</p>
                        <p className='typography-small-p text-font-gray'>Out Of {stageConfig?.showGrandTotal ? grandSum :stageConfig?.hasSplitScoring ? Object.values(stageConfig?.score).reduce((acc,curr)=>(acc + curr),0) : stageConfig?.score}</p>
                    </div>
                </div>
            </div>}
            {
                (stageBasedConfig?.hasBudgetScoring && !isBudgetScoreSubmitted) && 
                <div>
                    <p className='typography-small-p text-font-gray mb-4'>Score Budget</p>
                    <div className='flex gap-4'>
                        <Scorer value={budgetScore} onChange={setBudgetScore} />
                        <Button
                            variant="icon"
                            onClick={handleBudgetScoreSubmit}
                            disabled={budgetScore === 0}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            }
            </div>
            
        </div>
      </div>
      
      {stageBasedConfig?.hasCallDetails && 
        <div className='my-4'>
          <h3 className='typography-h3 mb-2'>Call Details</h3>
          <h3 className='typography-small-p text-font-gray my-2'>Active Schedule</h3>
          {renderCallData(stageData?.currentCall)}
        </div>
        }
      {stageBasedConfig?.hasScheduledForm && 
        <div className='w-full mt-4'>
          <ScheduleForm
            candidateId={candidateId}
            jobId={jobId}
            onSubmit={handleSchedule}
          />
        </div>}
      {
        isRescheduling && 
        <ScheduleForm
            candidateId={candidateId}
            jobId={jobId}
            onSubmit={handleReschedule}
            isRescheduling={true}
            initialData={stageData.currentCall}
            onCancel={() => setIsRescheduling(false)}
        />
      }

    {(stageBasedConfig?.hasCallHistory && stageData?.callHistory?.length > 0) && 
      <div className='mt-4'>
          <h3 className='typography-small-p text-font-gray mt-1'>Reschedules</h3>
          {stageData.callHistory.map((call, index) => (
              <div key={index} className='mt-2'>
                  {renderCallData(call, true)}
                  <p className='typography-small-p text-font-gray mt-3'>Status: {call.status}</p>
              </div>
          ))}
      </div>
    }

      {/* Action Section */}
      {stageBasedConfig?.actions && 
      <div className='w-full flex justify-end mt-4'>
          <div className='flex items-center gap-4'>
              {(stageBasedConfig.actions?.hasRejectAction && !isRescheduling) && 
                  <Button
                      variant="cancelSec"
                      onClick={() => setIsModalOpen("REJECT")}
                      disabled={(stageTitle === "Screening" && currentStatus !== "No Show") ? !isBudgetScoreSubmitted : false}
                  >
                      Reject
                  </Button>
              }
              {stageBasedConfig?.actions?.hasMoveToNextRoundAction && 
                  <Button
                      variant="primary"
                      onClick={() => setIsModalOpen("MOVE")}
                      disabled={(stageTitle === "Screening" && currentStatus !== "No Show") ? !isBudgetScoreSubmitted : false}
                  >
                      Move to Next Round
                  </Button>
              }
                {stageBasedConfig?.actions?.hasHiredAction && 
                  <Button
                      variant="primary"
                      onClick={() => setIsModalOpen("MOVE")}
                      disabled={(stageTitle === "Screening" && currentStatus !== "No Show") ? !isBudgetScoreSubmitted : false}
                  >
                      Hired
                  </Button>
                 }
              {(stageBasedConfig?.actions?.hasNoShowAction && !isRescheduling) && 
                <NoShowAction
                stage={stageTitle}
                candidateId={candidateId}
                setIsLoading={setIsLoading}
                jobId={jobId}
                />
              }
              {(stageBasedConfig?.actions?.hasRescheduleAction && !isRescheduling) &&
                <Button
                    variant="secondary"
                    onClick={() => setIsRescheduling(true)}
                >
                    Reschedule Call
                </Button>
              } 
          </div>
      </div>}
      </>
      }

      {/* Modal Section */}
      {stageBasedConfig?.actions?.hasRejectAction && 
      <Modal
          open={isModalOpen === "REJECT"}
          onClose={() => setIsModalOpen(false)}
          actionType={ACTION_TYPES.REJECT}
          onConfirm={handleReject}
          item={{ candidateId, jobId }}
          candidateName={`${candidateData?.firstName} ${candidateData?.lastName}`}
          candidateScore={getCandidateScore(candidateData?.jobApplication?.stageStatuses)}
          maxScoreOfStage={getMaxScoreForStage(stageTitle)}
          jobTitle={candidateData?.jobApplication?.jobApplied}
          companyName="Your Company Name"
      />}

      {stageBasedConfig?.actions?.hasMoveToNextRoundAction && 
      <Modal
          open={isModalOpen === "MOVE"}
          onClose={() => setIsModalOpen(false)}
          actionType={ACTION_TYPES.MOVE}
          onConfirm={handleMoveToNextRound}
          candidateName={`${candidateData?.firstName} ${candidateData?.lastName}`}
          currentStage={stageTitle}
      />}

    {stageBasedConfig?.actions?.hasHiredAction && 
      <Modal
          open={isModalOpen === "MOVE"}
          onClose={() => setIsModalOpen(false)}
          actionType={ACTION_TYPES.MOVE}
          onConfirm={handleMoveToNextRound}
          candidateName={`${candidateData?.firstName} ${candidateData?.lastName}`}
          currentStage={stageTitle}
      />}
    </StyledCard>
  )
}

export default GlobalStaging