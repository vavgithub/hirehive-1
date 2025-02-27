import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import Modal from '../Modals/Modal';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../Buttons/Button';
import { getMaxScoreForStage } from '../../pages/Admin/ViewCandidateProfile';

export const getCandidateScore = (stageStatuses) => {
    let totalScore = 0;
    let stages = stageStatuses;
    const getScreeningScore = (scoreObj) =>{
        let totalScreeningScore = 0;
        totalScreeningScore += 
        parseInt(scoreObj.Attitude ?? 0) +
        parseInt(scoreObj.Tech ?? 0) +
        parseInt(scoreObj.Communication ?? 0) +
        parseInt(scoreObj.UI ?? 0) +
        parseInt(scoreObj.UX ?? 0) +
        parseInt(scoreObj.Budget ?? 0) 
        return totalScreeningScore;
    }
    if(stages){
        Object.values(stages).forEach(stage=>
            stage.score ? typeof stage.score !== "object" ? totalScore += parseInt(stage.score) : totalScore += getScreeningScore(stage.score) : totalScore += 0
        )
    }
    return totalScore;
}

const StageActions = ({ 
    stage, 
    candidateId, 
    jobId,
    setIsLoading, 
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
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
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
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            // console.error('Error sending Rejection:', error);
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const moveToNextRoundMutation = useMutation({
        mutationFn: () => axios.post('/hr/move-candidate', {
            candidateId,
            jobId,
            currentStage: stage
        }),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage,
                status: 'Cleared',
                data: data
            }));
            dispatch(setCurrentStage(data.nextStage));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsMoveModalOpen(false);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            // console.error('Error moving to next round:', error);
            setIsLoading(false); // Stop loading in case of an error
        }
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
                <Button
                    variant="cancelSec"
                    onClick={() => setIsRejectModalOpen(true)}
                    disabled={!isBudgetScoreSubmitted}
                >
                    Reject
                </Button>

            {!isNoShow ? (
                // Show Move to Next Round button if not No Show
                    <Button
                        variant="primary"
                        onClick={() => setIsMoveModalOpen(true)}
                        disabled={!isBudgetScoreSubmitted}
                    >
                        {getButtonText()}
                    </Button>
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
                candidateScore={getCandidateScore(candidateData?.jobApplication?.stageStatuses)}
                maxScoreOfStage={getMaxScoreForStage(stage)}
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