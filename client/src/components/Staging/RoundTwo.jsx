import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Box,
} from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from '../../api/axios';
import StatusBadge from '../ui/StatusBadge';
import Label from '../ui/Label';
import WarningIcon from '../../svg/Staging/WarningIcon';
import AssigneeSelector from '../utility/AssigneeSelector';
import { useDispatch, useSelector } from 'react-redux';
import StageActions from './StageAction';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { ScheduleForm } from './Screening';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon';
import LinkIcon from '../../svg/Staging/LinkIcon';
import ClockIcon from '../../svg/Staging/ClockIcon';
import { formatTime } from '../../utility/formatTime';
import CalenderIcon from '../../svg/Staging/CalenderIcon';
import { Button } from '../ui/Button';
import { RoundReview } from '../../pages/DesignReviewer/Reviews';
import Scorer from '../ui/Scorer';
import { useAuthContext } from '../../context/AuthProvider';
import GreenTickIcon from '../../svg/Staging/GreenTickIcon';
import RightTick from '../../svg/Staging/RightTick';
import ClosedBadge from '../../svg/ClosedBadge';
import useScheduler from '../../hooks/useScheduler';

const RoundTwo = ({ candidateId, jobId ,isClosed }) => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses['Round 2']);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const candidateData = useSelector(state => state.candidate.candidateData);

    const isDisabled = stageData?.status === 'Rejected' || stageData?.status === 'Cleared' || stageData?.status === 'Reviewed';

    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const data = useScheduler(candidateData,stageData,"Under Review")    
    console.log("SCHEDULER : ",data);

    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Round 2',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {
           
            const { updatedStageStatus, currentStage } = response.data;

            dispatch(updateStageStatus({
                stage: 'Round 2',
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

    const scheduleMutation = useMutation({
        mutationFn: (scheduleData) => axios.post('hr/schedule-call', {
            ...scheduleData,
            stage: 'Round 2' // Specify the stage for Round 1
        }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Round 2',
                status: 'Call Scheduled',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
        onError: (error) => {
            console.error("Error scheduling interview:", error);
            // Handle error (e.g., show error message to user)
        }
    });

    const handleSchedule = (scheduleData) => {
        scheduleMutation.mutate({
            candidateId,
            jobId,
            ...scheduleData
        });
    };


    // Update rescheduleMutation similarly
    const rescheduleMutation = useMutation({
        mutationFn: (rescheduleData) => axios.post('hr/reschedule-call', {
            ...rescheduleData,
            stage: 'Round 2' // Specify the stage for Round 1
        }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Round 2',
                status: 'Call Scheduled',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsRescheduling(false);
        },
        onError: (error) => {
            console.error("Error rescheduling interview:", error);
            // Handle error (e.g., show error message to user)
        }
    });

    const handleReschedule = (rescheduleData) => {
        rescheduleMutation.mutate({
            candidateId,
            jobId,
            ...rescheduleData
        });
    };

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



    const renderCallDetails = (call) => (
        <div className='bg-background-80 grid grid-cols-3 rounded-xl p-4'>
            <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Date</span>
                <div className='flex items-center gap-2'>
                    <CalenderIcon />
                    <h2>
                        {new Date(call?.scheduledDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                    </h2>
                </div>
            </div>
            <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Time</span>
                <div className='flex items-center gap-2'>
                    <ClockIcon />
                    <h2>
                        {formatTime(call?.scheduledTime)}
                    </h2>
                </div>
            </div>
            <div className='flex flex-col '>
                <span className='typography-small-p text-font-gray'>Meeting Link</span>
                <div className='flex items-center gap-2'>
                    <LinkIcon />
                    <h2 className='mr-2 text-font-primary'>screening_meeting_link</h2>
                    <CopyToClipboard text={call?.meetingLink}>
                        <button className='flex items-center bg-background-70 px-[10px] py-[10px] rounded-xl'>
                            <ClipboardIcon />
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );


    const renderContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return (
                    <div className="flex flex-col gap-4">
                        {role === "Hiring Manager" && (

                            <div className='flex flex-col gap-2'>


                                <Label icon={WarningIcon} text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below" />
                                <ScheduleForm
                                    candidateId={candidateId}
                                    jobId={jobId}
                                    onSubmit={handleSchedule}
                                />
                            </div>
                        )}

                        {role === "Candidate" && (

                            <Label icon={WarningIcon} text={"Call not scheduled. Please contact the candidate to schedule the Round 2 call and update the details below"} />

                        )}
                    </div>
                );
            case 'Call Scheduled':
                return (
                    <div className='flex flex-col gap-4'>

                        {
                            role === "Hiring Manager" && (
                                <>


                                    <Label icon={WarningIcon} text={"The screening call has been scheduled. You can reschedule if needed."} />
                                    <h3 className='typography-h3'>Current Call</h3>
                                    {renderCallDetails(stageData?.currentCall)}
                                    {!isRescheduling && (
                                        <div className='w-[170px]'>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setIsRescheduling(true)}
                                            >
                                                Reschedule Call
                                            </Button>
                                        </div>
                                    )}
                                    {isRescheduling && (
                                        <ScheduleForm
                                            candidateId={candidateId}
                                            jobId={jobId}
                                            onSubmit={handleReschedule}
                                            isRescheduling={true}
                                            initialData={stageData.currentCall}
                                            onCancel={() => setIsRescheduling(false)}
                                        />
                                    )}
                                    {stageData.callHistory && stageData.callHistory.length > 0 && (
                                        <div className='mt-4'>
                                            <h3 className='typography-h3'>Previous Calls</h3>
                                            {stageData.callHistory.map((call, index) => (
                                                <div key={index} className='mt-2'>
                                                    {renderCallDetails(call)}
                                                    <p className='typography-small-p text-font-gray mt-1'>Status: {call.status}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )
                        }

                        {
                            role === "Candidate" && (
                                <>
                                    <Label icon={WarningIcon} text={"The call has been scheduled. Please be prepared to discuss with the founder."} />
                                    {renderCallDetails(stageData?.currentCall)}
                                </>
                            )
                        }
                    </div>
                );
            case 'Under Review':
                return (
                    <div className="flex flex-col  gap-4">


                        {role === "Hiring Manager" && (
                            <>
                                <Label icon={WarningIcon} text="Please review the candidate's performance and provide a score and feedback." />

                                <div className='flex gap-4'>



                                    <div className="flex flex-col w-full  gap-4">
                                        <span>Feedback:</span>

                                        <textarea
                                            className="w-full rounded-xl px-3 py-2 bg-background-40  outline-none focus:outline-teal-300"
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
                                <div className='flex justify-end'>

                                    <div className='w-[256px]'>

                                        <Button onClick={handleScoreSubmit} disabled={score === 0 || feedback === ''}>
                                            Submit Score
                                        </Button>
                                    </div>
                                </div>
                            </>)}

                        {
                            role === "Candidate" && (
                                <>
                                    <Label icon={WarningIcon} text={"Your performance is currently being reviewed. We will notify you once the review is complete."} />
                                </>
                            )
                        }
                    </div>
                );
            case 'Reviewed':
                return (
                    <>

                        {
                            role === "Hiring Manager" && (

                                <div className='w-full'>
                                    <div className='flex justify-between gap-4'>
                                        <div className='w-full'>
                                            <p className='typography-small-p text-font-gray'>Remarks</p>
                                            <p className='typography-body pb-8'>{stageData?.feedback}</p>
                                        </div>
                                        <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                                            <div className='p-4 flex flex-col items-center'>
                                                <p className='typography-small-p text-font-gray'>Total Score:</p>
                                                <div className='flex flex-col items-center text-font-accent'>
                                                    <p className='display-d2 font-bold'>{stageData?.score}</p>
                                                    <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <StageActions
                                        stage="Round 2"
                                        candidateId={candidateId}
                                        jobId={jobId}
                                        isBudgetScoreSubmitted={true}
                                    />
                                </div>


                            )
                        }

                        {
                            role === "Candidate" && (
                                <>
                                    <Label icon={WarningIcon} text={"Your performance is currently being reviewed. We will notify you once the review is complete."} />
                                </>
                            )
                        }

                    </>
                );
            case 'Cleared':
            case 'Rejected':
                return (
                    <div className='w-full'>

                        {
                            role === "Hiring Manager" && (


                                <div className='flex justify-between gap-4'>
                                    <div className='w-full'>
                                        <p className='typography-small-p text-font-gray'>Remarks</p>
                                        <p className='typography-body pb-8'>{stageData?.status === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback}</p>
                                    </div>
                                    <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                                        <div className='p-4 flex flex-col items-center'>
                                            <p className='typography-small-p text-font-gray'>Total Score:</p>
                                            <div className='flex flex-col items-center text-font-accent'>
                                                <p className='display-d2 font-bold'>{stageData?.score}</p>
                                                <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }

                        {
                            role === "Candidate" && (
                                <>
                                    <Label icon={RightTick} text={"Congratulations! You will be contacted soon for the next stage of the application process."} />
                                </>
                            )
                        }
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: "rgba(22, 23, 24, 1)",
                borderRadius: "12px",
                color: "white",
                fontFamily: 'Outfit, sans-serif',
                position : "relative",
                minHeight : "10rem"
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Round 2</h3>
                        {/* ... other content ... */}
                        {
                            isClosed && 
                            <div className='absolute top-0  right-0 flex items-center justify-center h-full'>
                                <ClosedBadge />
                            </div>
                        }
                    </div>
                    <Box display="flex" alignItems="center" justifyContent={"end"} width={"40%"}>
                        {isClosed || <StatusBadge customWidth={'w-fit'} status={stageData?.status} />}
                        {role === 'Hiring Manager' && (
                            <AssigneeSelector
                                mode="icon"
                                value={stageData?.assignedTo}
                                onChange={handleAssigneeChange}
                                onSelect={handleAssigneeChange}
                                disabled={isDisabled} // Disable only if status is 'Rejected' or 'Cleared'
                            />
                        )}
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default RoundTwo