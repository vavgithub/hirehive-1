import React, { useEffect, useState } from 'react';
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


const ScreeningReview = ({ candidate, onSubmit }) => {
    const [ratings, setRatings] = useState({
        Attitude: 0, Communication: 0, UX: 0, UI: 0, Tech: 0
    });
    const [feedback, setFeedback] = useState('');

    const handleRatingChange = (category, value) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    };
    const handleSubmit = () => {
        onSubmit(candidate._id, {
            jobId: candidate.jobApplication.jobId,
            stage: candidate.jobApplication.currentStage,
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

export const ScheduleForm = ({ candidateId, jobId, onSubmit, isRescheduling, initialData, onCancel }) => {
    const [date, setDate] = useState(isRescheduling ? null : (initialData ? new Date(initialData.scheduledDate) : null));
    const [time, setTime] = useState(isRescheduling ? null : (initialData ? initialData.scheduledTime : null));
    const [assignee, setAssignee] = useState(isRescheduling ? null : (initialData ? initialData.assignedTo : null));
    const [meetingLink, setMeetingLink] = useState(isRescheduling ? '' : (initialData ? initialData.meetingLink : ''));

    const isFormValid = date && time && assignee && meetingLink;

    const handleSubmit = () => {
        if (isFormValid) {
            onSubmit({
                date: date.toISOString(),
                time: time.format('HH:mm'),
                assigneeId: assignee._id,
                meetingLink
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className='grid grid-cols-3 gap-4'>

                <div className='flex flex-col gap-2'>
                    <div>

                        <label className="typography-body ">Date</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Datepicker onChange={setDate} value={date} />
                </div>


                <div className='flex flex-col gap-2'>
                    <div>

                        <label className="typography-body ">Time</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Timepicker onChange={setTime} value={time} />
                </div>


                <div className='flex flex-col gap-2'>
                    <div>

                        <label className="typography-body ">Reviewer</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <AssigneeSelector
                        mode="default"
                        value={assignee}
                        onChange={setAssignee}
                        onSelect={setAssignee}
                    />
                </div>
            </div>
            <InputField
                id="meetingLink"
                type="text"
                label="Meeting Link"
                required
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
            />
            <div className='flex gap-4'>
                {isRescheduling ? (
                    <div className='flex gap-4 w-full justify-end'>
                        <div className='w-[170px]'>
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className='w-[170px]'>
                            <Button
                                variant="primary"
                                disabled={!isFormValid}
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className='flex w-full justify-end'>


                        <div className='w-[170px]'>
                            <Button
                                variant="primary"
                                disabled={!isFormValid}
                                onClick={handleSubmit}
                            >
                                Schedule Call
                            </Button>
                        </div>
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
            console.error('Error submitting budget score:', error);
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
                <div className='bg-stars bg-cover rounded-xl w-[160px] '>
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
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Screening',
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

    const rescheduleMutation = useMutation({
        mutationFn: (rescheduleData) => axios.post('hr/reschedule-call', {
            ...rescheduleData,
            stage: 'Screening'
        }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Screening',
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
            console.error("Assignee update error:", error);
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
                        {new Date(call?.scheduledDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
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
                                    jobId={jobId}
                                />

                                <div className='w-[170px]'>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setIsRescheduling(true)}
                                    >
                                        Reschedule Call
                                    </Button>
                                </div>
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
                return <Label icon={WarningIcon} text="Screening is currently under review." />;
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
                        <StageActions
                            stage={"Screening"}
                            candidateId={candidateId}
                            jobId={jobId}
                            isBudgetScoreSubmitted={"true"}
                        >
                            {/* This will only show if status is No Show */}
                            <div className="w-[176px]">
                                <Button variant="primary"  onClick={() => setIsRescheduling(true)}>
                                    Reschedule Call
                                </Button>
                                
                            </div>
                        </StageActions>
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
                        <ScreeningReview candidate={candidateData} onSubmit={handleReviewSubmit} />;
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

    const renderReviewedContent = (isReadOnly = false) => (
        <>
            <div className='w-full'>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Remarks</p>
                        <p className='typography-body pb-2'>{stageData?.feedback}</p>
                    </div>
                    <div className='flex gap-4 pb-4 w-full'>
                        <div className='w-full flex  flex-col'>
                            <p className='typography-small-p text-font-gray mb-4'>Score</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='p-2   rounded-xl bg-background-60 flex min-h-[115px]'>
                                    {renderScoreCategories()}
                                </div>
                                <div>
                                    {!isReadOnly && renderBudgetScoreSection()}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!isReadOnly && (
                <StageActions
                    stage="Screening"
                    candidateId={candidateId}
                    jobId={jobId}
                    isBudgetScoreSubmitted={isBudgetScoreSubmitted}
                />
            )}
        </>
    );

    const renderClearedRejectedContent = () => (
        <div className='w-full'>
            <p className='typography-small-p text-font-gray'>{stageData?.status === 'Rejected' ? "Rejection Reason" : "Feedback"}</p>
            <p className='typography-body pb-8'>{stageData?.status === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback}</p>
            <div className='flex gap-4'>
                <div className='w-full p-2 rounded-xl bg-background-60'>
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
            { label: 'Budget', value: stageData?.score?.Budget },
        ];

        return (<div className='grid grid-cols-3 gap-3 w-full px-6 '>
            {categories.map((category, index) => (
                <div key={index} className='flex items-center w-full justify-between'>
                    <span className='typography-body text-font-gray'>{category.label}</span>
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
        <Card
            sx={{
                backgroundColor: "rgba(22, 23, 24, 1)",
                borderRadius: "12px",
                color: "white",
                fontFamily: 'Outfit, sans-serif',
                position: "relative",
                minHeight: "10rem"
            }}
        >
            <CardContent
                sx={{
                    padding: "28px"
                }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
                                <span className='typograhpy-body'>{candidateData.jobApplication.professionalInfo.expectedCTC}LPA</span>
                            </>}
                    </div>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default Screening;