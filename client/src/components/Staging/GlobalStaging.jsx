import React, { useEffect, useMemo, useState } from 'react'
import StyledCard from '../Cards/StyledCard.jsx'
import StatusBadge from '../ui/StatusBadge'
import { logConfig, stagingConfig } from '../../config/staging.config.js';   
import ClosedBadge from '../../svg/Icons/ClosedBadge.jsx';
import AssigneeSelector from '../MUIUtilities/AssigneeSelector.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import Label from '../ui/Label.jsx';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice.js';
import axios from '../../services/axios.js';
import StageRating from './StageRating.jsx';
import { showErrorToast, showSuccessToast } from '../ui/Toast.jsx';
import { Button, DefaultIcon } from '../Buttons/Button.jsx';
import Modal from '../Modals/Modal.jsx';
import { ACTION_TYPES } from '../../utility/ActionTypes.js';
import { getMaxScoreForStage } from '../../pages/Admin/ViewCandidateProfile.jsx';
import { getCandidateScore } from './StageAction.jsx';
import ScheduleForm from './ScheduleForm.jsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import { formatIntoLocaleString, formatTime } from '../../utility/formatTime.js';
import NoShowAction from './NoShow.jsx';
import useScheduler from '../../hooks/useScheduler.jsx';
import BulletMarks from '../ui/BulletMarks.jsx';
import Scorer from '../ui/Scorer.jsx';
import TaskForm, { SubmissionForm } from './TaskForm.jsx';
import TaskDetails, { SubmissionDetails } from './TaskDetails.jsx';
import HiredStamp from "../../svg/Background/HiredStamp.svg"
import Loader from '../Loaders/Loader.jsx';
import WarningIcon from '../../svg/Staging/WarningIcon.jsx';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import IconWrapper from '../Cards/IconWrapper.jsx';
import { Calendar, Clock, Copy, DatabaseZap, Link } from 'lucide-react';
import useAuth from '../../hooks/useAuth.jsx';
import { formatUTCToLocalTimeAuto, UTCToDateFormatted } from '../../utility/timezoneConverter.js';
import { moveCandidate, rejectCandidate, rescheduleCall, scheduleCall, submitBudgetScore, undoStageActions } from '../../services/hr.service.js';
import { submitReview, updateAssignee } from '../../services/dr.service.js';
import CustomToolTip from '../Tooltip/CustomToolTip.jsx';
import { useScoreBg } from '../../context/ThemeContext.jsx';

function GlobalStaging({selectedStage,stageStatuses,role,jobProfile,isClosed}) {
    const stageData = stageStatuses[selectedStage];
    const currentStatus = stageData?.status;
    const candidateData = useSelector(state => state.candidate.candidateData);
    
    //To get admin Data for companyDetails
    const { data : adminData } = useAuth();

    const { stageTitle, stageConfig, stageBasedConfig , candidateId, jobId} = useMemo(()=>{
      const isValidstage =  stagingConfig[jobProfile]?.filter(stage=> stage?.name === selectedStage);
      const stageTitle = isValidstage?.length > 0 ? isValidstage[0]?.name : "";
      const stageConfig = isValidstage[0];
      const stageBasedConfig = isValidstage[0]?.contentConfig[currentStatus] ? isValidstage[0]?.contentConfig[currentStatus][role] : isValidstage[0]?.contentConfig ? Object.values(isValidstage[0]?.contentConfig)[0][role] : {};
      const candidateId = candidateData?._id;
      const jobId = candidateData?.jobApplication?.jobId;

      return {stageTitle, stageConfig, stageBasedConfig, candidateId, jobId}
    },[candidateData,jobProfile,selectedStage,role])


    // const data = useScheduler(candidateData, stageData, "Under Review")

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isLoading,setIsLoading] = useState(false);

    const [showMore,setShowMore] = useState(false);

    //Actions management
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isBudgetScoreSubmitted, setIsBudgetScoreSubmitted] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [budgetScore, setBudgetScore] = useState(0);

    useEffect(()=>{
      if(stageTitle === "Screening"){
        if(stageData?.score?.Budget){
          setIsBudgetScoreSubmitted(true)
        }else{
            setBudgetScore(0)
          setIsBudgetScoreSubmitted(false)
        }
      }
    },[stageTitle,stageData])

    //Assignee Updation
    const updateAssigneeMutation = useMutation({
      mutationFn: (newAssignee) => updateAssignee(candidateId,jobId,stageTitle,newAssignee?._id),
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
      mutationFn: rejectCandidate,
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
        mutationFn: moveCandidate,
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
  
    const handleReject = (item, rejectionReason, scheduledDate , scheduledTime) => {     
        rejectCandidateMutation.mutate({ candidateId, jobId, rejectionReason, scheduledDate , scheduledTime });
    };

    const handleMoveToNextRound = () => {
        moveToNextRoundMutation.mutate({
            candidateId,
            jobId,
            currentStage : stageTitle
        });
    };

    //Schedule actions
    const scheduleMutation = useMutation({
        mutationFn: scheduleCall,
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
        mutationFn: rescheduleCall,
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

    const undoActionMutation = useMutation({
        mutationFn: undoStageActions,
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            showSuccessToast('Success',data?.message || 'Action Undone Successfully')
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            showErrorToast("Error",error?.response?.data?.message || 'Error occured in undo actions')
            console.error("Error undo action:", error);
            // Handle error (e.g., show error message to user)
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const handleSchedule = (scheduleData) => {
        scheduleMutation.mutate({ candidateId, jobId, stage : stageTitle, ...scheduleData });
    };

    const handleReschedule = (rescheduleData) => {
        rescheduleMutation.mutate({ candidateId, jobId, stage: stageTitle, ...rescheduleData });
    };

    //Scoring functions
    const getTotalScore = () => {
    return Object.values(stageData?.score || {}).reduce((acc, val) => acc + (val ?? 0), 0);
    };

    const submitBudgetScoreMutation = useMutation({
        mutationFn: submitBudgetScore,
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

            submitBudgetScoreMutation.mutate({ candidateId, jobId, stage: 'Screening', score : budgetScore});
        }
    };

    const handleUndoAction = () => {
        undoActionMutation.mutate({candidateId , jobId })
    }

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
      <div className={' bg-background-70 flex justify-between items-center rounded-xl p-4'}>
            <div className='flex flex-col'>
                {!isRescheduled && <span className='typography-small-p text-font-gray '>Date</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2 h-11'}>
                    <IconWrapper icon={Calendar} size={0} customIconSize={5} isInActiveIcon={true} customStrokeWidth={4} />
                    <p className={isRescheduled && 'typography-body'}>
                        {UTCToDateFormatted(call.scheduledDate)}
                    </p>
                </div>
            </div>
            {isRescheduled && <div className='w-1 h-1 border-font-gray bg-font-gray border-[1px] rounded-full '></div>}
            <div className='flex flex-col'>
                {!isRescheduled && <span className='typography-small-p text-font-gray '>Time</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2 h-11'}>
                    <IconWrapper icon={Clock} size={0} customIconSize={5} isInActiveIcon={true} customStrokeWidth={4} />
                    <p className={isRescheduled && 'typography-body'}>
                        {formatUTCToLocalTimeAuto(call.scheduledDate)}
                    </p>
                </div>
            </div>
            {isRescheduled && <div className='w-1 h-1 border-font-gray bg-font-gray border-[1px] rounded-full '></div>}
            <div className='flex flex-col '>
                {!isRescheduled && <span className='typography-small-p text-font-gray '>Meeting Link</span>}
                <div className={(isRescheduled && "text-font-gray ") + ' flex items-center gap-2'}>
                    <IconWrapper icon={Link} size={0} customIconSize={5} isInActiveIcon={true} customStrokeWidth={4} />
                    <a target='_blank'  rel="noopener noreferrer" href={call?.meetingLink} className={(isRescheduled ? "text-font-gray typography-body " : "text-font-primary") + ' mr-2 '}>screening_meeting_link</a>
                    {!isRescheduled && <CopyToClipboard text={call?.meetingLink}>
                        <IconWrapper hasBg icon={Copy} size={4} customIconSize={5}  customStrokeWidth={4} />
                    </CopyToClipboard>}
                </div>
            </div>
        </div>
    )

    const renderScoreCategories = () => {
        const scoreCategories = []
        if(typeof stageConfig?.score === "object"){
            Object.keys(stageData.score).map(scoreLabel => {
                if(scoreLabel === "Budget"){
                    if(isBudgetScoreSubmitted){
                        scoreCategories.push(
                            {
                                label : scoreLabel,
                                value :  stageData?.score[scoreLabel]
                            }
                        )
                    }
                }else{
                    scoreCategories.push(
                        {
                            label : scoreLabel,
                            value :  stageData?.score[scoreLabel]
                        }
                    )
                }
            })
        }

        return (<div className='grid grid-cols-3 gap-8 w-full '>
            {scoreCategories.map((category, index) => (
                <div key={index} className='grid grid-cols-[2fr,1fr] w-full gap-4 items-center'>
                    <span className='typography-body text-font-gray '>{category.label}</span>
                    <BulletMarks marks={category.value} />
                </div>
            ))}
        </div>)
    };

    //Logs
    const hasLog = (stageTitle && currentStatus) && stageData?.logs?.find(log => log.status === currentStatus)
    
    const stars = useScoreBg()

    return (
    <StyledCard  
    backgroundColor={"bg-background-100"}
    extraStyles={"relative min-h-[12rem] overflow-hidden"}
    >
        {
            isClosed &&
            <div className='absolute top-4 right-0 flex items-center justify-center h-fit z-20'>
                <ClosedBadge />
            </div>
        }
        {isClosed &&
        <div className='absolute top-0 z-10 right-0 flex items-center justify-center h-full w-full bg-[#00000080] rounded-xl'>
        </div>}
      {/* Header Part */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <h2>{stageTitle}</h2>
            {stageConfig?.extraHeaderContent && stageConfig?.extraHeaderContent({portfolio : candidateData.jobApplication.professionalInfo.portfolio})}
        </div>
        <div className='flex items-center w-[40%] justify-end'>
            {stageBasedConfig?.hasUndoButton && <button type='button' className={stageBasedConfig?.hasUndoButtonDisabled ? "opacity-40" : ""} disabled={stageBasedConfig?.hasUndoButtonDisabled} onClick={handleUndoAction} >
                {
                    stageBasedConfig?.hasUndoButtonDisabled ? 
                    <IconWrapper customIconSize={4} isInActiveIcon={stageBasedConfig?.hasUndoButtonDisabled} icon={RotateCcw} />
                    : <CustomToolTip disabled={stageBasedConfig.hasUndoButtonDisabled} arrowed title={'Undo'}><IconWrapper customIconSize={4} isInActiveIcon={stageBasedConfig?.hasUndoButtonDisabled} icon={RotateCcw} /></CustomToolTip>
                }
                
                </button>}
            {isClosed || <StatusBadge customWidth={'w-fit'} status={currentStatus} />}
            {
                stageBasedConfig?.hasAssigneeSelectorIcon && (

                    <AssigneeSelector
                        mode="icon"
                        value={stageData?.assignedTo}
                        onChange={handleAssigneeChange}
                        // onSelect={handleAssigneeChange}
                        disabled={!stageBasedConfig?.hasAssigneeSelectorEnabled} // Disable only if status is 'Rejected' or 'Cleared'
                    />

                )
            }

            {(!isClosed && stageBasedConfig?.hasBudgetLabel) &&
                <>
                    <div className='h-8 w-1 rounded bg-background-70 mx-2'></div>

                    <div className='w-8 h-8 rounded-full bg-background-70 flex items-center justify-center mr-2'>
                        <IconWrapper icon={DatabaseZap} customIconSize={0} />
                    </div>
                    <span className='typograhpy-body'>{candidateData?.jobApplication?.professionalInfo?.expectedCTC ? `${candidateData?.jobApplication?.professionalInfo?.expectedCTC} LPA` : candidateData?.jobApplication?.professionalInfo?.hourlyRate ? `${candidateData?.jobApplication?.professionalInfo?.hourlyRate} INR/hr` : '-'}</span>
                </>}
            </div>
      </div>
      {/* Body Section */}
      {
        (isLoading || updateAssigneeMutation.isPending || submitReviewMutation.isPending || submitBudgetScoreMutation.isPending ) ? 
            <div className='flex justify-center items-center w-full'>
                <Loader />
            </div>
        :
        <>
        <div >
        {(!stageData?.scheduledDate && stageBasedConfig?.hasLabel) && <div className='my-4'><Label icon={stageBasedConfig?.hasLabel?.icon} text={stageBasedConfig?.hasLabel?.hasCustomContent ? (stageBasedConfig?.hasLabel?.content + candidateData?.jobApplication?.jobApplied) : stageBasedConfig?.hasLabel?.content} /></div>}
        {
            stageBasedConfig?.hasSubmissionDetails  && 
            <SubmissionDetails isEditable={stageBasedConfig?.isSubmissionEditable} candidateData={candidateData} stageData={stageData} />
        }
        {(!stageData?.scheduledDate && stageBasedConfig?.hasAssigneeSelector) && 
          <div className='w-2/5'>
              <h4 className='typography-body my-4 '>Select Reviewer</h4>
              <AssigneeSelector
                  mode="default"
                  value={stageData?.assignedTo}
                  onChange={handleAssigneeChange}
                //   onSelect={handleAssigneeChange}
              />
          </div>
        }
        {
            (stageBasedConfig?.hasTaskForm && !stageData?.scheduledDate) && 
            <TaskForm
            jobProfile={jobProfile}
            candidateId={candidateId}
            jobId={jobId}
            candidateEmail={candidateData?.email}
            setIsLoading={setIsLoading}
            />
        }
        {
            (stageBasedConfig?.hasScheduledLabel && stageData?.scheduledDate && stageTitle === "Design Task" && currentStatus === "Pending") &&
            <div className='mt-4'>
            <Label icon={WarningIcon} text={`Design Task mail is Scheduled for ${UTCToDateFormatted(stageData.scheduledDate)} ${formatUTCToLocalTimeAuto(stageData.scheduledDate)}`}/>
            <TaskDetails stageData={stageData} />
            </div>
        }
        {
            (stageBasedConfig?.hasScheduledLabel && stageData?.scheduledDate && stageTitle === "Design Task" && currentStatus === "Sent") &&
            <div className='mt-4'>
            <Label icon={WarningIcon} text={`Rejection mail is Scheduled for ${UTCToDateFormatted(stageData.scheduledDate)} ${formatUTCToLocalTimeAuto(stageData.scheduledDate)}`}/>
            <TaskDetails stageData={stageData} />
            </div>
        }
        {
            stageBasedConfig?.hasTaskDetails && !stageData?.scheduledDate && 
            <TaskDetails stageData={stageData} />
        }
        {
            stageBasedConfig?.hasHiredLabel && 
                <img className='absolute top-4 left-3/4' src={HiredStamp} alt='Hired Stamp' />
        }
        {
            stageBasedConfig?.hasSubmissionForm && 
            <SubmissionForm candidateId={candidateId} jobId={jobId} stageData={stageData} setIsLoading={setIsLoading} />
        }
        {
          stageBasedConfig?.hasRatingComponent && <StageRating  customSchema={adminData?.companyDetails?.customScreeningParam ? adminData?.companyDetails?.customScreeningParam[jobProfile] : null} candidateId={candidateId} jobId={jobId} name={stageConfig?.name} candidate={candidateData} onSubmit={handleReviewSubmit} stageConfig={stageConfig} role={role} />
        }
        <div className='flex gap-4 w-full '>
            {(stageBasedConfig?.hasRemarks || stageBasedConfig?.hasRejectionReason || stageBasedConfig?.hasScoreBoard) && 
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
                    <div className='p-8 rounded-xl bg-background-60 flex  '>
                        {renderScoreCategories()}
                    </div>
                </div>
            }
            </div>}
            <div className={(stageTitle === "Hired" ? 'w-[100%]' : 'w-[35%]') + ' flex flex-col '}>
            {stageBasedConfig?.hasScoreCard && 
            <div className={` bg-background-80 rounded-xl ${stageTitle === "Hired" ? 'w-[35%] lg:w-[25%] xl:w-[15%]' : 'w-[90%] lg:w-[55%] xl:w-[40%]' } h-fit my-4 self-end`}>
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
                    <p className={currentStatus === "Reviewed" ? "typography-small-p text-font-gray mb-2" :'typography-body text-font-main mb-4'}>Score Budget</p>
                    <div className='flex gap-4'>
                        <Scorer value={budgetScore} onChange={setBudgetScore} />
                        <Button 
                            icon={DefaultIcon}   
                            variant="iconSec"
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
          <h3 className='mb-2'>Call Details</h3>
          <p className='typography-small-p text-font-gray my-2'>Active Schedule</p>
          {renderCallData(stageData?.currentCall)}
        </div>
        }
      {stageBasedConfig?.hasScheduledForm && 
        <div className='w-full mt-4'>
          <ScheduleForm
            log={stageBasedConfig?.hasLog ? hasLog : null}
            isDisabled={!isBudgetScoreSubmitted && stageTitle === "Screening"}
            candidateData={candidateData}
            onSubmit={handleSchedule}
          />
        </div>}
      {
        isRescheduling && 
        <ScheduleForm
            log={stageBasedConfig?.hasLog ? hasLog : null}
            isDisabled={!isBudgetScoreSubmitted && stageTitle === "Screening"}
            candidateData={candidateData}
            onSubmit={handleReschedule}
            isRescheduling={true}
            initialData={stageData.currentCall}
            onCancel={() => setIsRescheduling(false)}
        />
      }

    {(stageBasedConfig?.hasCallHistory && (currentStatus !== "Cleared" ? stageData?.callHistory?.length > 0  : true)) && 
      <div className='mt-4 relative w-[50%]'>
          <p className='typography-small-p text-font-gray mt-1'>{currentStatus !== "Cleared" ? "Reschedules" : "Calls"}</p>
          {currentStatus !== "Cleared" ? ( stageData?.callHistory?.length > 0 && stageData.callHistory.filter((call,index) => index === 0).map((call, index) => (
              <div key={index} className='mt-2 '>
                  {renderCallData(call, true)}
                  {/* <p className='typography-small-p text-font-gray mt-3'>Status: {call.status}</p> */}
              </div>
          )) ): 
        <div  className='mt-2 '>
            {renderCallData(stageData?.currentCall, true)}
        </div>
          }       
          {showMore &&  stageData?.callHistory?.length > 0 && stageData.callHistory.filter((call,index)=>currentStatus !== "Cleared" ? index !== 0 : true).map((call, index) => (
              <div key={index} className='mt-2 '>
                  {renderCallData(call, true)}
                  {/* <p className='typography-small-p text-font-gray mt-3'>Status: {call.status}</p> */}
              </div>
          ))}
           {stageData?.callHistory?.length > (currentStatus !== "Cleared" ? 1 : 0)&& <p onClick={() => setShowMore(!showMore)} className='cursor-pointer mt-2 typography-small-p text-font-gray flex items-center gap-1 '>{!showMore ? <><ChevronDown size={16} /> Show More </> : <> <ChevronUp size={16} /> Hide</>}</p>}
      </div>
    }
    {
        (stageBasedConfig?.hasScheduledLabel && (currentStatus === "Reviewed" || stageTitle === "Portfolio" || currentStatus === "No Show" || stageTitle === 'Hired') && stageData?.scheduledDate) &&
        <div className='mt-4'><Label icon={WarningIcon} text={`Rejection mail is Scheduled for ${UTCToDateFormatted(stageData.scheduledDate)} ${formatUTCToLocalTimeAuto(stageData.scheduledDate)}`}/></div>
    }

    {!stageBasedConfig?.actions && !stageBasedConfig?.hasScheduledForm && !isRescheduling && stageBasedConfig?.hasLog &&  hasLog && <div className='mt-6 '>
        <p className='typography-small-p text-font-gray'>{logConfig[stageTitle][hasLog?.status]}</p>
        <p>{UTCToDateFormatted(hasLog?.date)}</p>
    </div>}

      {/* Action Section */}
      {stageBasedConfig?.actions && !isRescheduling && !((currentStatus === "Reviewed" || stageTitle === "Portfolio" || stageTitle === "Design Task" || currentStatus === "No Show" || stageTitle === 'Hired') && stageData?.scheduledDate) &&
      <div className={'w-full flex  mt-4 ' + ((stageBasedConfig?.hasLog && hasLog ) ? 'justify-between' : 'justify-end')}>
          {(stageBasedConfig?.hasLog && hasLog)  && <div className=''>
                <p className='typography-small-p text-font-gray'>{logConfig[stageTitle][hasLog?.status]}</p>
                <p>{UTCToDateFormatted(hasLog?.date)}</p>
            </div>}
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
          companyName={adminData?.companyDetails?.name}
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