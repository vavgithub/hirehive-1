
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
import { InputField } from '../Form/FormFields';
import { useDispatch, useSelector } from 'react-redux';
import Datepicker from '../utility/Datepicker'
import Timepicker from '../utility/Timepicker'
import StageActions from './StageAction';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';

import CalenderIcon from '../../svg/Staging/CalenderIcon';
import ClockIcon from '../../svg/Staging/ClockIcon';
import LinkIcon from '../../svg/Staging/LinkIcon';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon';
import { formatTime } from '../../utility/formatTime';
import { useAuthContext } from '../../context/AuthProvider';
import Loader from '../ui/Loader';
import Scorer from '../ui/Scorer';
import { formatDescription } from '../../utility/formatDescription';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import GreenTickIcon from '../../svg/Staging/GreenTickIcon';
import RightTick from '../../svg/Staging/RightTick';

const submitReview = async ({ candidateId, reviewData }) => {
    const response = await axios.post('dr/submit-score-review', {
        candidateId,
        ...reviewData,
    });
    return response.data;
};


const DesignTaskReview = ({ candidate, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        onSubmit(candidate._id, {
            jobId: candidate.jobApplication.jobId,
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

const DesignTask = ({ candidateId, jobId }) => {

    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified


    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses['Design Task']);
    const candidateData = useSelector(state => state.candidate.candidateData);
    const candidateEmail = useSelector(state => state.candidate.candidateData.email);


    // Add this line outside renderContent
    const isDisabled = stageData?.status === 'Sent' || stageData?.status === 'Pending' || stageData?.status === 'Rejected' || stageData?.status === 'Cleared' || stageData?.status === 'Reviewed';

    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [dueTime, setDueTime] = useState(null);

    const [taskLink, setTaskLink] = useState('');
    const [comment, setComment] = useState('');

    const [isLoading, setIsLoading] = useState(false); // Loading state


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


    const renderHiringManagerContent = () => {
        if (isLoading) {
            return (
                <div className='flex justify-center'>
                    <Loader />
                </div>

            )

        }
        switch (stageData?.status) {
            case 'Pending':
                return renderPendingStatus();
            case 'Sent':
                return renderSentStatus();
            case 'Not Assigned':
                return renderNotAssignedStatus();
            case 'Reviewed':
                return renderReviewedStatus();
            case 'Cleared':
            case 'Rejected':
                return renderClearedRejectedStatus();
            default:
                return null;
        }
    };

    const renderClearedRejectedStatus = () => (
        <div className='w-full'>
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

            {
                role === ""
            }
        </div>
    );

    const submitTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('candidates/submit-design-task', taskData),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Under Review',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
        onError: (error) => {
            console.error('Error submitting design task:', error);
            // Handle error (e.g., show error message to user)
        }
    });

    const handleSubmitTask = () => {
        if (taskLink) {
            submitTaskMutation.mutate({
                candidateId,
                jobId,
                taskLink,
                comment
            });
        }
    };

    const renderDesignReviewerContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return (
                    <Label text={"The design task has not yet been sent. Please check back later for updates."} />
                )
            case 'Sent':
                return (
                    <div className="flex flex-col gap-4">
                        <Label text="The design task has been sent to the candidate. Please wait for the submission." />
                        {/* {renderTaskDetails()} */}
                    </div>
                );
            case 'Under Review':
                return (
                    <div className="flex flex-col">
                        <Label icon={WarningIcon} text="Please review the candidate's submission and provide feedback." />
                        <DesignTaskReview candidate={candidateData} onSubmit={handleReviewSubmit} />
                    </div>
                );
            case 'Reviewed':
                return renderReviewedStatus();
            case 'Cleared':
            case 'Rejected':
                return renderReviewedStatus();
            default:
                return <Label icon={WarningIcon} text="Waiting for the task to be sent to the candidate." />;
        }
    };

    const renderCandidateContent = () => {
        switch (stageData?.status) {
            case 'Sent':
                return (
                    <div className="flex flex-col gap-4">
                        <Label icon={WarningIcon} text="You have been assigned a design task. Please complete it and submit the link before the due date." />

                        <InputField
                            id="taskLink"
                            type="text"
                            label="Task Link"
                            required
                            value={taskLink}
                            onChange={(e) => setTaskLink(e.target.value)}
                        />
                        <InputField
                            id="comment"
                            type="text"
                            label="Comment (Optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className='w-[170px]'>
                            <Button
                                variant="primary"
                                disabled={!taskLink}
                                onClick={handleSubmitTask}
                            >
                                Submit Task
                            </Button>
                        </div>
                    </div>
                );

            case 'Not Assigned':

                return (
                    <div className='flex flex-col gap-4'>
                        <Label icon={WarningIcon} text="Your performance is currently being reviewed. We will notify you once the review is complete." />
                        <div className='grid grid-cols-2 bg-background-80 p-4 rounded-xl'>
                            <div>
                                <p className='typography-small-p text-font-gray'> Task</p>
                                <a href={ensureAbsoluteUrl(stageData?.submittedTask)} target="_blank" rel="noopener noreferrer" className='typography-body text-font-primary  cursor-pointer flex gap-2' >Design Task_{candidateData.firstName}
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.99825 12C9.4277 12.5741 9.9756 13.0491 10.6048 13.3929C11.234 13.7367 11.9298 13.9411 12.6449 13.9923C13.36 14.0435 14.0778 13.9403 14.7496 13.6897C15.4214 13.4392 16.0314 13.047 16.5382 12.54L19.5382 9.53997C20.449 8.59695 20.953 7.33394 20.9416 6.02296C20.9302 4.71198 20.4044 3.45791 19.4773 2.53087C18.5503 1.60383 17.2962 1.07799 15.9853 1.0666C14.6743 1.0552 13.4113 1.55918 12.4682 2.46997L10.7482 4.17997M12.9982 9.99996C12.5688 9.42584 12.0209 8.95078 11.3917 8.60703C10.7625 8.26327 10.0667 8.05885 9.3516 8.00763C8.63645 7.95641 7.91866 8.0596 7.2469 8.31018C6.57514 8.56077 5.96513 8.9529 5.45825 9.45996L2.45825 12.46C1.54746 13.403 1.04348 14.666 1.05488 15.977C1.06627 17.288 1.59211 18.542 2.51915 19.4691C3.44619 20.3961 4.70026 20.9219 6.01124 20.9333C7.32222 20.9447 8.58524 20.4408 9.52825 19.53L11.2382 17.82" stroke="#045FFD" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                </a>
                            </div>
                            <div>
                                <p className='typography-small-p text-font-gray'> Comment</p>
                                <p>{stageData?.submittedComment}</p>
                            </div>
                        </div>
                    </div>

                )

            case 'Pending':
                return <Label icon={WarningIcon} text="Your submission is Pending. Please wait for feedback." />;
            case 'Under Review':
                return <Label icon={WarningIcon} text="Your submission is under review. Please wait for feedback." />;
            case 'Reviewed':
                return renderReviewedStatus();
            case 'Cleared':
                return renderClearedStatus();
            case 'Rejected':
                return renderClearedRejectedStatus();
            default:
                return <Label icon={WarningIcon} text="Waiting for the design task to be assigned." />;
        }
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

    const sendTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('hr/send-design-task', taskData),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Sent',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            console.error('Error sending design task:', error);
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const handleSendTask = () => {
        if (taskDescription && dueDate && dueTime) {
            sendTaskMutation.mutate({
                candidateId,
                jobId,
                taskDescription,
                dueDate: dueDate.toISOString(),
                dueTime: dueTime.format('HH:mm'),
                candidateEmail
            });
        }
    };

    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Design Task',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {
           

            const { updatedStageStatus, currentStage } = response.data;

            dispatch(updateStageStatus({
                stage: 'Design Task',
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

    const renderNotAssignedStatus = () => (
        <div className='flex flex-col gap-4'>
            <Label icon={WarningIcon} text="Candidate’s design task has not yet been assigned to a reviewer." />


            <div className='grid grid-cols-2 bg-background-80 p-4 rounded-xl'>
                <div>
                    <p className='typography-small-p text-font-gray'> Task</p>
                    <a href={ensureAbsoluteUrl(stageData?.submittedTask)} target="_blank" rel="noopener noreferrer" className='typography-body text-font-primary  flex gap-2' >Design Task_{candidateData.firstName}
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.99825 12C9.4277 12.5741 9.9756 13.0491 10.6048 13.3929C11.234 13.7367 11.9298 13.9411 12.6449 13.9923C13.36 14.0435 14.0778 13.9403 14.7496 13.6897C15.4214 13.4392 16.0314 13.047 16.5382 12.54L19.5382 9.53997C20.449 8.59695 20.953 7.33394 20.9416 6.02296C20.9302 4.71198 20.4044 3.45791 19.4773 2.53087C18.5503 1.60383 17.2962 1.07799 15.9853 1.0666C14.6743 1.0552 13.4113 1.55918 12.4682 2.46997L10.7482 4.17997M12.9982 9.99996C12.5688 9.42584 12.0209 8.95078 11.3917 8.60703C10.7625 8.26327 10.0667 8.05885 9.3516 8.00763C8.63645 7.95641 7.91866 8.0596 7.2469 8.31018C6.57514 8.56077 5.96513 8.9529 5.45825 9.45996L2.45825 12.46C1.54746 13.403 1.04348 14.666 1.05488 15.977C1.06627 17.288 1.59211 18.542 2.51915 19.4691C3.44619 20.3961 4.70026 20.9219 6.01124 20.9333C7.32222 20.9447 8.58524 20.4408 9.52825 19.53L11.2382 17.82" stroke="#045FFD" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </a>
                </div>
                <div>
                    <p className='typography-small-p text-font-gray'> Comment</p>
                    <p>{stageData?.submittedComment}</p>
                </div>
            </div>


            <div className='flex flex-col gap-2 w-1/2' >

                <label className="typography-body ">Select Reviewer </label>

                <AssigneeSelector
                    mode="default"
                    value={stageData?.assignedTo}
                    onChange={handleAssigneeChange}
                    onSelect={handleAssigneeChange}
                />
            </div>

        </div>

    )

    const renderTaskDetails = () => (
        <div>
            This is the table bro
        </div>

    )


    const renderPendingStatus = () => (
        <div className="flex flex-col gap-4">
            <Label icon={WarningIcon} text="Design task not sent. Please provide task details and set a due date/time." />
            <div >

                <label className="typography-body ">Design task details </label>
                <span className="text-red-100">*</span>
            </div>
            <textarea
                id="taskDescription"
                placeholder='Task Description'
                type="text"
                label="Task Description"
                required
                className="w-full rounded-xl px-3 py-2 bg-background-40  outline-none focus:outline-teal-300"
                rows="10"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className='flex justify-normal gap-4'>
                <div className='w-full'>
                    <div className='pb-4' >

                        <label className="typography-body ">Due Date</label>
                        <span className="text-red-100">*</span>
                    </div>


                    <Datepicker onChange={setDueDate} value={dueDate} />
                </div>
                <div className='w-full'>
                    <div className='pb-4'>

                        <label className="typography-body ">Due Time</label>
                        <span className="text-red-100">*</span>
                    </div>

                    <Timepicker onChange={setDueTime} value={dueTime} />
                </div>
            </div>
            <div className='w-full flex justify-end'>

                <div className='w-[170px]'>
                    <Button
                        variant="primary"
                        disabled={!taskDescription || !dueDate || !dueTime}
                        onClick={handleSendTask}
                    >
                        Send Email
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderSentStatus = () => (
        <div className='flex flex-col gap-4'>
            <Label icon={WarningIcon} text="The design task has been sent to the candidate." />
            <div className='bg-background-80 rounded-xl p-4'>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='flex flex-col'>
                        <span className='typography-small-p text-font-gray'>Due Date</span>
                        <div className='flex items-center gap-2'>
                            <CalenderIcon />
                            <h2>
                                {new Date(stageData?.currentCall?.scheduledDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                            </h2>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='typography-small-p text-font-gray'>Due Time</span>
                        <div className='flex items-center gap-2'>
                            <ClockIcon />
                            <h2>
                                {formatTime(stageData?.currentCall?.scheduledTime)}
                            </h2>
                        </div>
                    </div>
                </div>
                <div>
                    <span className='typography-small-p text-font-gray'>Task Description</span>

                    <div dangerouslySetInnerHTML={{ __html: stageData?.taskDescription ? formatDescription(stageData?.taskDescription) : '' }}></div>
                </div>
            </div>
        </div>
    );



    const renderReviewedStatus = () => (

        <>
            <div className='w-full flex flex-col gap-4'>
                <div className='flex justify-between gap-4'>
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Remarks</p>
                        <p className='typography-body pb-8'>{stageData?.feedback}</p>
                    </div>
                    {/* this below div */}
                    {role === 'Hiring Manager' && (
                        <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                            <div className='p-4 flex flex-col items-center'>
                                <p className='typography-small-p text-font-gray'>Total Score:</p>
                                <div className='flex flex-col items-center text-font-accent'>
                                    <p className='display-d2 font-bold'>{stageData?.score}</p>
                                    <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                role == "Hiring Manager" && (

                    <StageActions
                        stage="Design Task"
                        candidateId={candidateId}
                        jobId={jobId}
                        isBudgetScoreSubmitted={true}
                    />
                )
            }

        </>
    );

    const renderClearedStatus = () => (
        <>
            <div className='w-full '>
                {role === 'Hiring Manager' && (
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
                    </div>)}
                    <Label icon={RightTick} text={"You are now ready to move on to the next round. Our team will contact you soon with further details"}/>
            </div>
        </>
    );

    const renderRejectedStatus = () => (
        <>
            <div className='w-full'>
                <div className='flex justify-between gap-4'>
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Remarks</p>
                        <p className='typography-body pb-8'>{stageData?.rejectionReason}</p>
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
            </div>
        </>
    );



    return (
        <Card
            sx={{
                backgroundColor: "rgba(22, 23, 24, 1)",
                borderRadius: "12px",
                color: "white",
                fontFamily: 'Outfit, sans-serif',
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Design Task</h3>
                    </div>
                    <Box display="flex" alignItems="center">
                        <StatusBadge status={stageData?.status} />
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

export default DesignTask