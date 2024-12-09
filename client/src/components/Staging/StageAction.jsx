import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import Modal from '../Modal';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';

const StageActions = ({ 
    stage, 
    candidateId, 
    jobId, 
    isBudgetScoreSubmitted,
    children // New prop for custom content
}) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = React.useState(false);

    const candidateData = useSelector(state => state.candidate.candidateData);
    // Get the current stage's status from the candidateData
    const currentStageStatus = candidateData?.jobApplication?.stageStatuses?.[stage]?.status;
    const isNoShow = currentStageStatus === 'No Show';

    const rejectCandidateMutation = useMutation({
        mutationFn: ({ candidateId, jobId, rejectionReason }) => 
            axios.post('/hr/reject-candidate', { candidateId, jobId, rejectionReason }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage,
                status: 'Rejected',
                data: {
                    ...data,
                    rejectionReason: data.rejectionReason
                }
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsRejectModalOpen(false);
        },
    });

    const moveToNextRoundMutation = useMutation({
        mutationFn: () => axios.post('/hr/move-candidate', {
            candidateId,
            jobId,
            currentStage: stage
        }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage,
                status: 'Cleared',
                data: data
            }));
            dispatch(setCurrentStage(data.nextStage));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsMoveModalOpen(false);
        },
    });

    const handleReject = (item, rejectionReason) => {       
        rejectCandidateMutation.mutate({ candidateId, jobId, rejectionReason });
    };

    const handleMoveToNextRound = () => {
        moveToNextRoundMutation.mutate();
    };

    // Determine button text based on stage
    const getButtonText = () => {
        return stage === "Hired" ? "Hired" : "Move to Next Round";
    };

    return (
        <div className='flex justify-end gap-4 mt-5'>
            <div className='w-[176px]'>
                <Button
                    variant="cancelSec"
                    onClick={() => setIsRejectModalOpen(true)}
                    disabled={!isBudgetScoreSubmitted}
                >
                    Reject
                </Button>
            </div>

            {!isNoShow ? (
                // Show Move to Next Round button if not No Show
                <div className='w-[176px]'>
                    <Button
                        variant="primary"
                        onClick={() => setIsMoveModalOpen(true)}
                        disabled={!isBudgetScoreSubmitted}
                    >
                        {getButtonText()}
                    </Button>
                </div>
            ) : (
                // Show children component if No Show
                children
            )}

            <Modal
                open={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                actionType={ACTION_TYPES.REJECT}
                onConfirm={handleReject}
                item={{ candidateId, jobId }}
                candidateName={`${candidateData?.firstName} ${candidateData?.lastName}`}
                jobTitle={candidateData?.jobApplication?.jobApplied}
                companyName="Your Company Name"
            />

            <Modal
                open={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                actionType={ACTION_TYPES.MOVE}
                onConfirm={handleMoveToNextRound}
                candidateName={`${candidateData?.firstName} ${candidateData?.lastName}`}
                currentStage={stage}
            />
        </div>
    );
};

export default StageActions;