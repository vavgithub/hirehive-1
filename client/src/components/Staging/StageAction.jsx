import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import Modal from '../Modal';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';
// import axios from '../../api/axios';
// import Modal from '../Modal';
// import { ACTION_TYPES } from '../../utility/ActionTypes';
// import { setCurrentStage } from '../../redux/applicationStageSlice';

const StageActions = ({ stage, candidateId, jobId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [isMoveModalOpen, setIsMoveModalOpen] = React.useState(false);

    const rejectCandidateMutation = useMutation({
        mutationFn: (rejectionReason) => axios.post('/hr/reject-candidate', {
            candidateId,
            jobId,
            stage,
            rejectionReason
        }),
    });

    const moveToNextRoundMutation = useMutation({
        mutationFn: () => axios.post('/hr/move-candidate', {
            candidateId,
            jobId,
            currentStage: stage
        }),
    });
    useEffect(() => {
        if (rejectCandidateMutation.isSuccess) {
            dispatch(updateStageStatus({
                stage,
                status: 'Rejected',
                data: rejectCandidateMutation.data
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsRejectModalOpen(false);
        }
    }, [rejectCandidateMutation.isSuccess, rejectCandidateMutation.data, dispatch, stage, candidateId, jobId]);

    useEffect(() => {
        if (moveToNextRoundMutation.isSuccess) {
            dispatch(updateStageStatus({
                stage,
                status: 'Cleared',
                data: moveToNextRoundMutation.data
            }));
            dispatch(setCurrentStage(moveToNextRoundMutation.data.nextStage));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsMoveModalOpen(false);
        }
    }, [moveToNextRoundMutation.isSuccess, moveToNextRoundMutation.data, dispatch, stage, candidateId, jobId]);

    const handleReject = (rejectionReason) => {
        rejectCandidateMutation.mutate(rejectionReason);
    };

    const handleMoveToNextRound = () => {
        moveToNextRoundMutation.mutate();
    };

    return (
        <div className='flex justify-end gap-4'>

            <div className='w-[176px]'>

                <Button
                    variant="cancel"
                    onClick={() => setIsRejectModalOpen(true)}
                >
                    Reject
                </Button>
            </div>

            <div className='w-[176px]'>
                <Button
                    variant="primary"
                    onClick={() => setIsMoveModalOpen(true)}
                >
                    Move to Next Round
                </Button>
            </div>


            <Modal
                open={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                actionType={ACTION_TYPES.REJECT}
                onConfirm={handleReject}
                candidateName={`Candidate Name`} // You'll need to pass this from the parent
                jobTitle={`Job Title`} // You'll need to pass this from the parent
                companyName={`Company Name`} // You'll need to pass this from the parent
            />

            <Modal
                open={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                actionType={ACTION_TYPES.MOVE}
                onConfirm={handleMoveToNextRound}
                candidateName={`Candidate Name`} // You'll need to pass this from the parent
                currentStage={stage}
            />
        </div>
    );
};

export default StageActions;