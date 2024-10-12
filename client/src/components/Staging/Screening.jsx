import React from 'react';
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

const Screening = ({ candidateId, jobId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Screening);
    const candidateData = useSelector(state => state.candidate.candidateData);

    console.log("Current Screening stage data:", stageData);

    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Screening',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {
            console.log("Assignee update API response:", response);

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

    const renderContent = () => {
        switch (stageData?.status) {
            case 'Pending':
                return (
                    <Box display="flex" alignItems="center" my={1}>
                        <Label icon={WarningIcon} text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below" />
                    </Box>
                );
            case 'Call Scheduled':
                return (
                    <Label icon={WarningIcon} text={`Screening call scheduled for ${stageData.scheduledDate}`} />
                );
            case 'Under Review':
                return (
                    <Label icon={WarningIcon} text="Screening is currently under review." />
                );
            case 'Reviewed':
                return (
                    <>
                        <div className='w-full'>
                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Feedback</p>
                                    <p className='typography-body pb-8'>{stageData?.feedback}</p>
                                </div>
                                {stageData?.score && (
                                    <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                                        <div className='p-4 flex flex-col items-center'>
                                            <p className='typography-small-p text-font-gray'>Score:</p>
                                            <div className='flex flex-col items-center text-font-accent'>
                                                <p className='display-d2 font-bold'>{stageData?.score}</p>
                                                <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <StageActions
                            stage="Screening"
                            candidateId={candidateId}
                            jobId={jobId}
                        />
                    </>
                );
            case 'Cleared':
                return (
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Feedback</p>
                        <p className='typography-body pb-8'>{stageData?.feedback}</p>
                    </div>
                );
            case 'No Show':
                return (
                    <Label icon={WarningIcon} text="Candidate did not show up for the scheduled screening call." />
                );
            case 'Rejected':
                return (
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Reason for Rejection</p>
                        <p className='typography-body pb-8'>{stageData?.rejectionReason}</p>
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
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Screening</h3>
                        {/* ... other content ... */}
                    </div>
                    <Box display="flex" alignItems="center">
                        <StatusBadge status={stageData?.status} />
                        <AssigneeSelector
                            mode="icon"
                            value={stageData?.assignedTo}
                            onChange={handleAssigneeChange}
                            onSelect={handleAssigneeChange}
                        />
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default Screening;