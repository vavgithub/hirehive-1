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

    console.log(stagingConfig[jobProfile],stageData,candidateData)

    const data = useScheduler(candidateData, stageData, "Under Review")

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false);

    //Actions management
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isBudgetScoreSubmitted, setIsBudgetScoreSubmitted] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);

    useEffect(()=>{
      if(stageTitle === "Screening"){
        if(stageData?.score?.budget){
          setIsBudgetScoreSubmitted(true)
        }
      }
    },[stageTitle])

    //Assignee Updation
    const updateAssigneeMutation = useMutation({
      mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
          candidateId,
          jobId,
          stage: 'Portfolio',
          assigneeId: newAssignee._id
      }),
      onSuccess: (response) => {
         
          const { updatedStageStatus, currentStage } = response.data;

          dispatch(updateStageStatus({
              stage: 'Portfolio',
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
            stage: 'Screening'
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Screening',
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
            stage: 'Screening'
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Screening',
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

  return (
    <StyledCard padding={3} >
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
      <div className='mt-4'>
        {stageBasedConfig?.hasLabel && <Label icon={stageBasedConfig?.hasLabel?.icon} text={stageBasedConfig?.hasLabel?.content} />}
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
          stageBasedConfig?.hasRatingComponent && <StageRating name={stageConfig?.name} candidate={candidateData} onSubmit={handleReviewSubmit} stageConfig={stageConfig} />
        }
        <div className='flex justify-between gap-4'>
            {(stageBasedConfig?.hasRemarks || stageBasedConfig?.hasRejectionReason) && 
            <div className='w-full'>
                <p className='typography-small-p text-font-gray'>Remarks</p>
                <p className='typography-body pb-8'>{currentStatus === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback ? stageData?.feedback : 'No feedbacks'}</p>
            </div>}
            
            {stageBasedConfig?.hasScoreCard && <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                <div className='p-4 flex flex-col items-center'>
                    <p className='typography-small-p text-font-gray'>Total Score:</p>
                    <div className='flex flex-col items-center text-font-accent'>
                        <p className='display-d2 font-bold'>{stageData?.score || 0}</p>
                        <p className='typography-small-p text-font-gray'>Out Of 5</p>
                    </div>
                </div>
            </div>}
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
              {stageBasedConfig.actions?.hasRejectAction && 
                  <Button
                      variant="cancelSec"
                      onClick={() => setIsModalOpen("REJECT")}
                      disabled={stageTitle === "Screening" ? !isBudgetScoreSubmitted : false}
                  >
                      Reject
                  </Button>
              }
              {stageBasedConfig?.actions?.hasMoveToNextRoundAction && 
                  <Button
                      variant="primary"
                      onClick={() => setIsModalOpen("MOVE")}
                      disabled={stageTitle === "Screening" ? !isBudgetScoreSubmitted : false}
                  >
                      Move to Next Round
                  </Button>
              }
              {(stageBasedConfig?.actions?.hasNoShowAction && !isRescheduling) && 
                <NoShowAction
                stage={"Screening"}
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
    </StyledCard>
  )
}

export default GlobalStaging
