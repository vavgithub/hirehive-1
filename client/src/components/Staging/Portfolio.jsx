import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';
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


  

const PortfolioReview = ({ candidate, onSubmit }) => {
    console.log("please check this bro niside funtions", candidate)
  
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
  
    const handleSubmit = () => {
        console.log("please checkk karerere")
      onSubmit(candidate._id, {
        jobId: candidate.jobApplication.jobId,
        stage: candidate.jobApplication.currentStage,
        ratings: rating,
        feedback,
      });
    };
  
    return (
      <div className='bg-background-90 flex gap-4 justify-between rounded-b-xl  items-center p-4'>
        <span className='flex-shrink-0'>Portfolio ratings</span>
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


const Portfolio = ({ candidateId, jobId }) => {
    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Portfolio);
    const candidateData = useSelector(state => state.candidate.candidateData);



    console.log("Current candiate data :", candidateData);

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
        }
    });

    const handleAssigneeChange = (newAssignee) => {
        updateAssigneeMutation.mutate(newAssignee);
    };

    const renderHiringManagerContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
                return (
                    <Box display="flex" alignItems="center" my={1}>
                        <Label icon={WarningIcon} text="Candidate's portfolio has not yet been assigned to a reviewer." />
                        <AssigneeSelector
                            mode="default"
                            value={stageData?.assignedTo}
                            onChange={handleAssigneeChange}
                            onSelect={handleAssigneeChange}
                        />
                    </Box>
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
                        <PortfolioReview candidate={candidateData} onSubmit={handleReviewSubmit}/>
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
            { role == "Hiring Manager" && (
                <StageActions
                    stage="Portfolio"
                    candidateId={candidateId}
                    jobId={jobId}
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
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Portfolio</h3>
                    </div>
                    <Box display="flex" alignItems="center">
                        <StatusBadge status={stageData?.status} />
                        {role === 'Hiring Manager' && (
                            <AssigneeSelector
                                mode="icon"
                                value={stageData?.assignedTo}
                                onChange={handleAssigneeChange}
                                onSelect={handleAssigneeChange}
                            />
                        )}
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
};

export default Portfolio;