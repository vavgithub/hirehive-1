
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

const DesignTask = ({ candidateId, jobId }) => {

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses['Design Task']);
    const candidateEmail = useSelector(state => state.candidate.candidateData.email);

    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [dueTime, setDueTime] = useState(null);

    const renderContent = () => {
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
                        return (
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
                            </div>
                        );  
            // Add other cases as needed
            default:
                return null;
        }
    };

    const sendTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('hr/send-design-task', taskData),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Sent',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
        onError: (error) => {
            console.error('Error sending design task:', error);
            // Handle error (e.g., show error message to user)
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
            console.log("Assignee update API response:", response);

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
        <AssigneeSelector
            mode="default"
            value={stageData?.assignedTo}
            onChange={handleAssigneeChange}
            onSelect={handleAssigneeChange}
        />

    )


    const renderPendingStatus = () => (
        <div className="flex flex-col gap-4">
            <Label icon={WarningIcon} text="Design task not sent. Please provide task details and set a due date/time." />
            <InputField
                id="taskDescription"
                type="text"
                label="Task Description"
                required
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <div className='grid grid-cols-2 gap-4'>
                <Datepicker onChange={setDueDate} value={dueDate} />
                <Timepicker onChange={setDueTime} value={dueTime} />
            </div>
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
                    <p className='typography-body mt-2'>{stageData?.taskDescription}</p>
                </div>
            </div>
        </div>
    );

    const renderReviewedStatus =()=>(

        <>
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
        </div>
        <StageActions
            stage="Design Task"
            candidateId={candidateId}
            jobId={jobId}
            isBudgetScoreSubmitted={true}
        />
    </>
    );

    const renderClearedStatus =()=>(
        <>
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
        </div>
    </>
    );

    const renderRejectedStatus =()=>(
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
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default DesignTask