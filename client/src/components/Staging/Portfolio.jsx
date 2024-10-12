import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
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

const Portfolio = ({ candidateId, jobId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Portfolio)
    console.log("please check this whaats going wrong", stageData)
    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Portfolio',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {
            console.log("Assignee update API response:", response);

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
            // Optionally, you can dispatch an action to show an error message to the user
        }
    });

    const onViewPortfolio = () => {
        console.log("handle")
    }
    const handleAssigneeChange = (newAssignee) => {
        updateAssigneeMutation.mutate(newAssignee);
    };

    const renderContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
                return (
                    <Box display="flex" alignItems="center" my={1}>
                        <Label icon={WarningIcon} text="Candidate's portfolio has not yet been assigned to a reviewer." />
                    </Box>
                );
            case 'Under Review':
                return (
                    <Label icon={WarningIcon} text="Portfolio is currently under review by the design reviewer." />

                );
            case 'Reviewed':
                return (
                    <>
                        <div className='w-full '>

                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Remarks</p>
                                    <p className='typography-body pb-8'>{stageData?.feedback}</p>
                                </div>

                                <div className='bg-stars bg-cover rounded-xl w-[160px] my-4' >
                                    <div className='p-4 flex flex-col items-center'>
                                        <p className='typography-small-p text-font-gray '>Total Score:</p>
                                        <div className='flex flex-col items-center text-font-accent'>
                                            <p className='display-d2 font-bold'>{stageData?.score}</p>
                                            <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <StageActions
                            stage="Portfolio"
                            candidateId={candidateId}
                            jobId={jobId}
                        />
                    </>
                );
            case 'Cleared':
                return (
                    <> <div className='w-full '>

                    <div className='flex justify-between gap-4'>
                        <div className='w-full'>
                            <p className='typography-small-p text-font-gray'>Remarks</p>
                            <p className='typography-body pb-8'>{stageData?.feedback}</p>
                        </div>

                        <div className='bg-stars bg-cover rounded-xl w-[160px] my-4' >
                            <div className='p-4 flex flex-col items-center'>
                                <p className='typography-small-p text-font-gray '>Total Score:</p>
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
            case 'Rejected':
                return (
                    <>
                        <div className='w-full '>

                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Remarks</p>
                                    <p className='typography-body pb-8'>{stageData?.rejectionReason}</p>
                                </div>

                                <div className='bg-stars bg-cover rounded-xl w-[160px] my-4' >
                                    <div className='p-4 flex flex-col items-center'>
                                        <p className='typography-small-p text-font-gray '>Total Score:</p>
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
            default:
                return null;
        }
    };

    const renderActions = () => {
        switch (status) {
            case 'Reviewed':
                return (
                    <>
                        <Button variant="contained" color="error" onClick={onReject}>
                            Reject
                        </Button>
                        <Button variant="contained" color="primary" onClick={onMoveToNextRound}>
                            Move to next round
                        </Button>
                    </>
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
                        <h3 className='typography-h3 mr-10'>Portfolio</h3>
                        <div className='flex gap-4 items-center'>
                            <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <a className='typography-body text-font-primary underline flex gap-2' href="#" onClick={onViewPortfolio}>
                                View Portfolio
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#045FFD" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
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

export default Portfolio;