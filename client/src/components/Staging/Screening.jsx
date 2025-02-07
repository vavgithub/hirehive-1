import React, { useEffect, useRef, useState } from 'react';
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
import Datepicker from '../utility/Datepicker'
import Timepicker from '../utility/Timepicker'
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';
import { InputField } from '../Form/FormFields';
import CalenderIcon from '../../svg/Staging/CalenderIcon';
import ClockIcon from '../../svg/Staging/ClockIcon';
import LinkIcon from '../../svg/Staging/LinkIcon';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon';
import { formatTime } from '../../utility/formatTime';
import CopyToClipboard from 'react-copy-to-clipboard';
import BulletMarks from '../ui/BulletMarks';
import Scorer from '../ui/Scorer';
import { useAuthContext } from '../../context/AuthProvider';
import BudgetIcon from '../../svg/Staging/BudgetIcon';
import RightTick from '../../svg/Staging/RightTick';
import ClosedBadge from '../../svg/ClosedBadge';
import useScheduler from '../../hooks/useScheduler';
import NoShowAction from './NoShow';
import Loader from '../ui/Loader';
import ScreeningReview from '../Reviews/ScreeningReview';
import StyledCard from '../ui/StyledCard';


export const ScheduleForm = ({ candidateId, jobId, onSubmit, isRescheduling, initialData, onCancel }) => {
    const [date, setDate] = useState(isRescheduling ? null : (initialData ? new Date(initialData.scheduledDate) : null));
    const [time, setTime] = useState(isRescheduling ? null : (initialData ? initialData.scheduledTime : null));
    const [assignee, setAssignee] = useState(isRescheduling ? null : (initialData ? initialData.assignedTo : null));
    const [meetingLink, setMeetingLink] = useState(isRescheduling ? '' : (initialData ? initialData.meetingLink : ''));

    const [dateError,setDateError] = useState(false);
    const [timeError,setTimeError] = useState(false);
    const [assigneeError,setAssigneeError] = useState(false);
    const [linkError,setLinkError] = useState(false);

    //validating every fields
    const validateErrors = ()=>{
        !date ? setDateError(true) : setDateError(false);
        !time ? setTimeError(true) : setTimeError(false);
        !assignee ? setAssigneeError(true) : setAssigneeError(false);
        !meetingLink ? setLinkError(true) : setLinkError(false);
    }

    //To detect if its a first render or not
    const isFirstRender = useRef(true);

    const isFormValid = date && time && assignee && meetingLink;

    const handleSubmit = () => {
        //Once form submitted, firstRender is made false to trigger continuous validations
        isFirstRender.current = false;
        validateErrors()        
        if (isFormValid) {
            onSubmit({
                date: date.toISOString(),
                time: time.format('HH:mm'),
                assigneeId: assignee._id,
                meetingLink
            });
        }
    };

    //To validate errors after changing each field
    useEffect(()=>{
        if(!isFirstRender.current){
            validateErrors()
        }
    },[isFirstRender,date,time,assignee,meetingLink])

    return (
        <div className="flex flex-col gap-4">
            <div className='grid grid-cols-3 gap-4'>

                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Date</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Datepicker onChange={setDate} value={date} error={dateError} />
                    {dateError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Date is required</p>}
                </div>


                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Time</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Timepicker onChange={setTime} value={time} error={timeError} />
                    {timeError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Time is required</p>}
                </div>


                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Reviewer</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <AssigneeSelector
                        mode="default"
                        value={assignee}
                        onChange={setAssignee}
                        onSelect={setAssignee}
                        error={assigneeError}
                    />
                    {assigneeError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Reviewer is required</p>}
                </div>
            </div>
            <InputField
                id="meetingLink"
                type="text"
                label="Meeting Link"
                required
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                error={linkError}
                errorMessage="Meeting link is required"
            />
            <div className='flex gap-4'>
                {isRescheduling ? (
                    <div className='flex gap-4 w-full justify-end'>
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                    </div>
                ) : (
                    <div className='flex w-full justify-end'>


                            <Button
                                variant="primary"
                                // disabled={!isFormValid}
                                onClick={handleSubmit}
                            >
                                Schedule Call
                            </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Screening = ({ candidateId, jobId, isClosed }) => {


    const dispatch = useDispatch();
    const [isRescheduling, setIsRescheduling] = useState(false);
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Screening);
    const candidateData = useSelector(state => state.candidate.candidateData);

    // Add this line outside renderContent
    const isDisabled = stageData?.status === 'Rejected' || stageData?.status === 'Cleared' || stageData?.status === 'Reviewed';

    const data = useScheduler(candidateData, stageData, "Under Review")

    const [isLoading, setIsLoading] = useState(false); // Loading state

    const { user } = useAuthContext();
    const role = user?.role || 'Candidate';


    const [budgetScore, setBudgetScore] = useState(0);
    const [isBudgetScoreSubmitted, setIsBudgetScoreSubmitted] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    //this is for updating the states for total count
    useEffect(() => {
        if (stageData?.score) {
            const scores = Object.values(stageData.score);
            const sum = scores.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
            setTotalScore(sum);
            setIsBudgetScoreSubmitted(!!stageData.score.Budget);
            setBudgetScore(stageData.score.Budget || 0);
        }
    }, [stageData]);

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
            const scores = Object.values(data.updatedScore);
            const sum = scores.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
            setTotalScore(sum);
        },
        onError: (error) => {
            // console.error('Error submitting budget score:', error);
            // You can add user-facing error handling here, e.g., showing an error message
        }
    });

    const submitReview = async ({ candidateId, reviewData }) => {
        const response = await axios.post('dr/submit-score-review', {
            candidateId,
            ...reviewData,
        });
        return response.data;
    };

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



    const handleBudgetScoreSubmit = () => {
        if (budgetScore > 0) {

            submitBudgetScoreMutation.mutate(budgetScore);
        }
    };


    const renderBudgetScoreSection = () => {
        if (!isBudgetScoreSubmitted) {
            return (
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
            );
        } else {
            return (
                <div className='bg-stars bg-cover rounded-xl w-[160px]'>
                    <div className='p-4 flex flex-col items-center'>
                        <p className='typography-small-p text-font-gray'>Total Score:</p>
                        <div className='flex flex-col items-center text-font-accent'>
                            <p className='display-d2 font-bold'>{totalScore}</p>
                            <p className='typography-small-p text-font-gray'>Out Of 30</p>
                        </div>
                    </div>
                </div>
            );
        }
    };

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
            // console.error("Error scheduling interview:", error);
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
            // console.error("Error rescheduling interview:", error);
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
    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Screening',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {


            const { updatedStageStatus, currentStage } = response.data;

            dispatch(updateStageStatus({
                stage: 'Screening',
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
            // console.error("Assignee update error:", error);
        }
    });

    const handleAssigneeChange = (newAssignee) => {
        updateAssigneeMutation.mutate(newAssignee);
    };

    const renderCallDetails = (call, isRescheduled) => (
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
    );

    const renderHiringManagerContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return (
                    <div className="flex flex-col gap-4">
                        <Label icon={WarningIcon} text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below" />
                        <ScheduleForm
                            candidateId={candidateId}
                            jobId={jobId}
                            onSubmit={handleSchedule}
                        />
                    </div>
                );
            case 'Call Scheduled':
                return (
                    <div className='flex flex-col gap-4'>
                        <Label icon={WarningIcon} text={"The screening call has been scheduled. You can reschedule if needed."} />
                        <h3 className='typography-small-p text-font-gray mt-1'>Active Schedule</h3>
                        {renderCallDetails(stageData?.currentCall)}
                        {!isRescheduling && (
                            <div className='w-full flex gap-4 justify-end '>

                                <NoShowAction
                                    stage={"Screening"}
                                    candidateId={candidateId}
                                    setIsLoading={setIsLoading}
                                    jobId={jobId}
                                />

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
                        {renderCallHistory()}
                    </div>
                );
            case 'Under Review':
                return (
                    <>
                        <Label icon={WarningIcon} text="Screening is currently under review." />
                        <div className='mt-4 flex justify-end'>
                            <NoShowAction
                                stage={"Screening"}
                                candidateId={candidateId}
                                setIsLoading={setIsLoading}
                                jobId={jobId}
                            />
                        </div>
                    </>
                )
            case 'Reviewed':
                return renderReviewedContent();
            case 'Cleared':
            case 'Rejected':
                return renderClearedRejectedContent();
            case 'No Show':
                return (
                    <>
                        <Label icon={WarningIcon} text="Candidate did not show up for the scheduled screening call." />
                        <div>
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
                            {/* {renderCallHistory()} */}

                        </div>
                        {!isRescheduling && <StageActions
                            stage={"Screening"}
                            candidateId={candidateId}
                            jobId={jobId}
                            setIsLoading={setIsLoading}
                            isBudgetScoreSubmitted={"true"}
                        >
                            {/* This will only show if status is No Show */}
                                <Button variant="primary" onClick={() => setIsRescheduling(true)}>
                                    Reschedule Call
                                </Button>
                        </StageActions>}
                    </>

                )

            default:
                return null;
        }
    };

    const renderDesignReviewerContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return (
                    <div>
                        <Label text={"The screening call has not yet been scheduled. Please check back later for updates."} />
                    </div>
                )
            case 'Call Scheduled':
                return (
                    <div className='flex flex-col gap-4'>
                        <Label icon={WarningIcon} text="The screening call has been scheduled." />
                        <h3 className='typography-h3'>Call Details</h3>
                        {renderCallDetails(stageData?.currentCall)}
                    </div>
                );
            case 'Under Review':
                return (
                    <div className='flex flex-col gap-4'>
                        <Label icon={WarningIcon} text="Please review the candidate's performance and provide scores." />
                        <ScreeningReview candidate={candidateData} onSubmit={handleReviewSubmit} rounded='full' />
                    </div>
                );
            case 'Reviewed':
            case 'Cleared':
            case 'Rejected':
                return renderReviewedContent(true);
            default:
                return <Label icon={WarningIcon} text="Waiting for the screening call to be scheduled." />;
        }
    };

    const renderCandidateContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return <Label icon={WarningIcon} text="Your screening call has not been scheduled yet. Please wait for further instructions." />;
            case 'Call Scheduled':
                return (
                    <div className='flex flex-col gap-4'>
                        <Label icon={WarningIcon} text="Your screening call has been scheduled. Please attend at the specified time." />
                        <h3 className='typography-h3'>Call Details</h3>
                        {renderCallDetails(stageData?.currentCall)}
                    </div>
                );
            case 'Under Review':
            case 'Reviewed':
                return <Label icon={WarningIcon} text="Your performance is currently being reviewed. We will notify you once the review is complete" />;
            case 'Cleared':
                return <Label icon={RightTick} text="You are now ready to move on to the next round. Our team will contact you soon with further details" />;
            case 'Rejected':
                return <Label icon={WarningIcon} text="Unfortunately, you did not clear the round. Thank you for your interest. We encourage you to reapply in the future" />;
            // return renderReviewedContent(true);
            case 'No Show':
                return <Label icon={WarningIcon} text="You missed the scheduled screening call. Please contact the hiring team for further instructions." />;
            default:
                return null;
        }
    };

    const renderReviewedContent = (isReadOnly = false) => {

        const getTotalScore = ()=>{
            let score = 0;    
            return score + (stageData?.score?.Attitude ?? 0) +
            (stageData?.score?.UX ?? 0) +
            (stageData?.score?.Tech ?? 0) +
            (stageData?.score?.Communication ?? 0) +
            (stageData?.score?.UI ?? 0) +
            (stageData?.score?.Budget ?? 0)
        }
        return (
        <>
            <div className='w-full'>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Remarks</p>
                        <p className='typography-body'>{stageData?.feedback  || 'No feedbacks'}</p>
                    </div>
                    <div className='flex gap-4 pb-4 w-full'>
                        <div className='max-w-[75%] flex  flex-col'>
                            <p className='typography-small-p text-font-gray mb-4'>Score</p>
                            
                                <div className='p-4 rounded-xl bg-background-60 flex min-h-[115px] '>
                                    {renderScoreCategories()}
                                </div>
                        </div>
                        <div className={'flex flex-col  ' + (isBudgetScoreSubmitted ? "justify-end" : "justify-between")}>
                            {!isReadOnly && renderBudgetScoreSection()}
                            {!isBudgetScoreSubmitted && <div className='self-end flex flex-col'>
                                <p className='typography-small-p text-font-gray'>Total Score</p>
                                <h1 className='typography-h2 self-end'>{getTotalScore()}</h1>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {!isReadOnly && (
                <StageActions
                    stage="Screening"
                    candidateId={candidateId}
                    jobId={jobId}
                    setIsLoading={setIsLoading}
                    isBudgetScoreSubmitted={isBudgetScoreSubmitted}
                />
            )}
        </>
        )
    }

    const renderClearedRejectedContent = () => (
        <div className='w-full'>
            <p className='typography-small-p text-font-gray'>{stageData?.status === 'Rejected' ? "Rejection Reason" : "Feedback"}</p>
            <p className='typography-body pb-8'>{stageData?.status === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback}</p>
            <div className='flex gap-4'>
                <div className='w-full p-4 rounded-xl bg-background-60 flex items-center max-w-[75%]'>
                    {renderScoreCategories()}
                </div>
                <div className='bg-stars bg-cover rounded-xl w-[160px]'>
                    <div className='p-4 flex flex-col items-center'>
                        <p className='typography-small-p text-font-gray'>Total Score:</p>
                        <div className='flex flex-col items-center text-font-accent'>
                            <p className='display-d2 font-bold'>{totalScore}</p>
                            <p className='typography-small-p text-font-gray'>Out Of 30</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

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

    // const renderBudgetScoreSection = () => (
    //     <div>
    //         <p className='typography-small-p text-font-gray mb-4'>Score Budget</p>
    //         {isBudgetScoreSubmitted ? (
    //             <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
    //                 <div className='p-4 flex flex-col items-center'>
    //                     <p className='typography-small-p text-font-gray'>Total Score:</p>
    //                     <div className='flex flex-col items-center text-font-accent'>
    //                         <p className='display-d2 font-bold'>{totalScore}</p>
    //                         <p className='typography-small-p text-font-gray'>Out Of 30</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         ) : (
    //             <div className='flex gap-4'>
    //                 <Scorer value={budgetScore} onChange={setBudgetScore} />
    //                 <Button
    //                     variant="icon"
    //                     onClick={handleBudgetScoreSubmit}
    //                     disabled={budgetScore === 0 || isBudgetScoreSubmitted}
    //                 >
    //                     Submit
    //                 </Button>
    //             </div>
    //         )}
    //     </div>
    // );

    const renderCallHistory = () => {
        if (stageData.callHistory && stageData.callHistory.length > 0) {
            return (
                <div className='mt-4'>
                    <h3 className='typography-small-p text-font-gray mt-1'>Reschedules</h3>
                    {stageData.callHistory.map((call, index) => (
                        <div key={index} className='mt-2'>
                            {renderCallDetails(call, true)}
                            <p className='typography-small-p text-font-gray mt-3'>Status: {call.status}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const renderContent = () => {
        if (isLoading || submitReviewMutation?.isPending || updateAssigneeMutation?.isPending) {
            return (
                <div className='flex justify-center'>
                    <Loader />
                </div>

            )

        }
        switch (role) {
            case 'Hiring Manager':
                return renderHiringManagerContent();
            case 'Design Reviewer':
                return renderDesignReviewerContent();
            case 'Candidate':
                return renderCandidateContent();
            default:
                return <Label icon={WarningIcon} text="Unknown user role" />;
        }
    };

    return (
        <StyledCard
            padding={3}
            backgroundColor={"bg-background-30"}
            extraStyles={"relative min-h-[10rem]"}
        >
            <CardContent
                sx={{
                    padding: "0"
                }}>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Screening</h3>
                        {/* ... other content ... */}
                    </div>
                    <div className='flex items-center w-[40%] justify-end'>

                        {
                            isClosed &&
                            <div className='absolute top-0  right-0 flex items-center justify-center h-full'>
                                <ClosedBadge />
                            </div>
                        }

                        {isClosed || <StatusBadge customWidth={'w-fit'} status={stageData?.status} />}
                        {
                            role == "Hiring Manager" && (

                                <AssigneeSelector
                                    mode="icon"
                                    value={stageData?.assignedTo}
                                    onChange={handleAssigneeChange}
                                    onSelect={handleAssigneeChange}
                                    disabled={isDisabled} // Disable only if status is 'Rejected' or 'Cleared'
                                />

                            )
                        }

                        {isClosed ||
                            <>
                                <div className='h-8 w-1 rounded bg-background-70 mx-2'></div>

                                <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center mr-2'>
                                    <BudgetIcon />
                                </div>
                                <span className='typograhpy-body font-outfit'>{candidateData.jobApplication.professionalInfo.expectedCTC}LPA</span>
                            </>}
                    </div>
                </Box>
                {renderContent()}
            </CardContent>
        </StyledCard>
    );
};

export default Screening;