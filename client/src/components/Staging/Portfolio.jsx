import React, { useState } from 'react';
import {  CardContent, Box } from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from '../../api/axios';
import StatusBadge from '../ui/StatusBadge';
import Label from '../ui/Label';
import WarningIcon from '../../svg/Staging/WarningIcon';
import AssigneeSelector from '../utility/AssigneeSelector';
import { useDispatch, useSelector } from 'react-redux';
import StageActions from './StageAction';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';
import Scorer from '../../components/ui/Scorer';
import { useAuthContext } from '../../context/AuthProvider';
import RightTick from '../../svg/Staging/RightTick';
import PortfolioIcon from '../../svg/PortfolioIcon';
import FileMainIcon from '../../svg/FileMainIcon';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import ClosedBadge from '../../svg/ClosedBadge';
import Loader from '../ui/Loader';
import PortfolioReview from '../Reviews/PortfolioReview';
import StyledCard from '../ui/StyledCard';



const Portfolio = ({ candidateId, jobId ,isClosed}) => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Portfolio);
    const candidateData = useSelector(state => state.candidate.candidateData);

    const [isLoading, setIsLoading] = useState(false); // Loading state



    // Add this line outside renderContent
    const isDisabled = stageData?.status === 'Rejected' || stageData?.status === 'Cleared' || stageData?.status === 'Reviewed';


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


    const updateAssigneeMutation = useMutation({
        mutationFn: (newAssignee) => axios.put('dr/update-assignee', {
            candidateId,
            jobId,
            stage: 'Portfolio',
            assigneeId: newAssignee._id
        }),
        onSuccess: (response) => {
           
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
        }
    });

    const handleAssigneeChange = (newAssignee) => {
        updateAssigneeMutation.mutate(newAssignee);
    };

    const renderHiringManagerContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
                return (
                    <div className='flex flex-col gap-4'>

                        <Label icon={WarningIcon} text="Candidate's portfolio has not yet been assigned to a reviewer." />
                        <div className='w-2/5'>
                            <h4 className='typography-body my-4 font-outfit'>Select Reviewer</h4>
                            <AssigneeSelector
                                mode="default"
                                value={stageData?.assignedTo}
                                onChange={handleAssigneeChange}
                                onSelect={handleAssigneeChange}
                            />
                        </div>
                    </div>
                );
            case 'Under Review':
                return (
                    <Label icon={WarningIcon} text="Portfolio is currently under review by the design reviewer." />
                );
            case 'Reviewed':
                return renderReviewedContent();
            case 'Cleared':
            case 'Rejected':
                return renderClearedRejectedContent();
            default:
                return null;
        }
    };


    const renderDesignReviewerContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
                return (
                    <Label icon={WarningIcon} text="This portfolio has not been assigned to you yet." />
                );
            case 'Under Review':
                return (
                    <>
                        <Label text="Please review the portfolio and update the details below." />
                        <PortfolioReview candidate={candidateData} onSubmit={handleReviewSubmit} />
                    </>
                );
            case 'Reviewed':
            case 'Cleared':
            case 'Rejected':
                return renderReviewedContent();
            default:
                return null;
        }
    };

    const renderCandidateContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
            case 'Under Review':
                return (
                    <Label icon={WarningIcon} text="Your portfolio is currently being reviewed. We will notify you once the review is complete." />
                );
            case 'Reviewed':
            case 'Cleared':
                return (
                    <Label icon={RightTick} text="You are now ready to move on to the next round. Our team will contact you soon with further details" />
                );
            case 'Rejected':
                return (
                    <Label icon={RightTick} text="Unfortunately, you did not clear the round. Thank you for your interest. We encourage you to reapply in the future" />
                );
            default:
                return null;
        }
    };

    const renderReviewedContent = (isCandidate = false) => (
        <>
            <div className='w-full'>
                <div className='flex justify-between gap-4'>
                    <div className='w-full'>
                        <p className='typography-small-p text-font-gray'>Remarks</p>
                        <p className='typography-body pb-8'>{stageData?.feedback || 'No feedbacks'}</p>
                    </div>
                    <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                        <div className='p-4 flex flex-col items-center'>
                            <p className='typography-small-p text-font-gray'>Total Score:</p>
                            <div className='flex flex-col items-center text-font-accent'>
                                <p className='display-d2 font-bold'>{stageData?.score || 0}</p>
                                <p className='typography-small-p text-font-gray'>Out Of 5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {role == "Hiring Manager" && (
                <StageActions
                    stage="Portfolio"
                    candidateId={candidateId}
                    jobId={jobId}
                    setIsLoading={setIsLoading}
                    isBudgetScoreSubmitted={true}
                />
            )}
        </>
    );

    const renderClearedRejectedContent = () => (
        <div className='w-full'>
            <div className='flex justify-between gap-4'>
                <div className='w-full'>
                    <p className='typography-small-p text-font-gray'>Remarks</p>
                    <p className='typography-body pb-8'>{stageData?.status === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback ? stageData?.feedback : 'No feedbacks'}</p>
                </div>
                <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                    <div className='p-4 flex flex-col items-center'>
                        <p className='typography-small-p text-font-gray'>Total Score:</p>
                        <div className='flex flex-col items-center text-font-accent'>
                            <p className='display-d2 font-bold'>{stageData?.score || 0}</p>
                            <p className='typography-small-p text-font-gray'>Out Of 5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
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
        <>
        <StyledCard
            padding={3}
            backgroundColor={"bg-background-30"}
            extraStyles={"relative min-h-[10rem]"}
        >
                <CardContent sx={{
                    padding:"0px"
                }}>
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                        <div className='flex'>
                            <h3 className='typography-h3 mr-6'>Portfolio</h3>
                            <div className='flex gap-2 items-center justify-center'>

                                {
                                    isClosed && 
                                    <div className='absolute top-0  right-0 flex items-center justify-center h-full'>
                                        <ClosedBadge />
                                    </div>
                                }

                                <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
                                    <FileMainIcon />
                                </div>
                                <a href={ensureAbsoluteUrl(candidateData?.jobApplication?.professionalInfo?.portfolio)} target="_blank" rel="noopener noreferrer" className='typography-body text-font-primary underline flex gap-2' >View Portfolio
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#045FFD" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <Box display="flex" alignItems="center" justifyContent={"end"} width={"40%"}>
                            {!isClosed && <StatusBadge customWidth={'w-fit'} status={stageData?.status} />}
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
            </StyledCard>
            
        </>
    );
};

export default Portfolio;