import { Box, Card, CardContent } from '@mui/material';
import React, { useState } from 'react'
import StatusBadge from '../ui/StatusBadge';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';
import Label from '../ui/Label';
import HiredStamp from "../../svg/Background/HiredStamp.svg"
import StageActions from './StageAction';
import { useAuthContext } from '../../context/AuthProvider';
import Loader from '../ui/Loader';
import StyledCard from '../ui/StyledCard';

const Hired = ({ candidateId, jobId ,isClosed}) => {
    const fetchTotalScore = async (candidateId, jobId) => {
        const { data } = await axios.get(`hr/candidate/${candidateId}/job/${jobId}/scores`);
        return data;
    }

    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified
    const { data: score, error } = useQuery({
        queryKey: ['candidateScore', candidateId, jobId],
        queryFn: () => fetchTotalScore(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            // console.error('Query Error:', error);
            dispatch(setError(error.message));
        },
    });

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Hired);
    const candidateData = useSelector(state => state.candidate.candidateData);
    
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className='flex justify-center'>
                    <Loader />
                </div>

            )

        }
        switch (stageData?.status) {
            case 'Under Review':
                return (
                    <div>
                        {
                            role === "Hiring Manager" && (
                                <div>
                                    <div className='flex gap-4 py-4'>
                                        <div className='w-full'>
                                            <Label text="Please confirm if the candidate was hired." />
                                        </div>
                                        <div className='bg-stars bg-cover rounded-xl w-[160px]'>
                                            <div className='p-4 flex flex-col items-center'>
                                                <p className='typography-small-p text-font-gray'>Total Score:</p>
                                                <div className='flex flex-col items-center text-font-accent'>
                                                    <p className='display-d2 font-bold'>{score?.totalScore}</p>
                                                    <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <StageActions
                                        stage="Hired"
                                        candidateId={candidateId}
                                        jobId={jobId}
                                        setIsLoading={setIsLoading}
                                        isBudgetScoreSubmitted={true}
                                    />
                                </div>
                            )}

                        {
                            role === "Design Reviewer" && (
                                <div>
                                    <Label text={"Candidate's performance is now being reviewed."} />
                                </div>
                            )
                        }

                        {
                            role === "Candidate" && (
                                <div>
                                    <Label text={"Your application is under review. Please wait while someone from our team contacts you"} />
                                </div>
                            )
                        }


                    </div>
                );

            case 'Accepted':
                return (
                    <div >

                        {
                            role === "Hiring Manager" && (
                                <Label text={`Candidate hired for the role of "${candidateData.jobApplication.jobApplied}"`}></Label>
                            )
                        }

                        {
                            role === "Candidate" && (
                                <Label text={`Congratulations! You have been successfully hired as a "${candidateData.jobApplication.jobApplied}"`} />
                            )
                        }



                    </div>
                )
            case 'Reviewed':
                return (
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
                                            <p className='display-d2 font-bold'>{stageData?.score || 0}</p>
                                            <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StageActions
                            stage="Hired"
                            candidateId={candidateId}
                            jobId={jobId}
                            setIsLoading={setIsLoading}
                            isBudgetScoreSubmitted={true}
                        />
                    </>
                );
            case 'Cleared':
            case 'Rejected':
                return (
                    <div className='w-full'>
                        <div className='flex justify-between gap-4'>
                            <div className='w-full'>
                                <p className='typography-small-p text-font-gray'>Remarks</p>
                                <p className='typography-body pb-8'>{stageData?.status === 'Rejected' ? stageData?.rejectionReason : stageData?.feedback}</p>
                            </div>
                            { role == "Hiring Manager" && <div className='bg-stars bg-cover rounded-xl w-[160px] my-4'>
                                <div className='p-4 flex flex-col items-center'>
                                    <p className='typography-small-p text-font-gray'>Total Score:</p>
                                    <div className='flex flex-col items-center text-font-accent'>
                                        <p className='display-d2 font-bold'>{stageData?.score || 0}</p>
                                        <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <StyledCard
            padding={3}
            backgroundColor={"bg-background-30"}
            extraStyles={"relative min-h-[12rem]"}
        >
            {
                stageData?.status === "Accepted" && (

                    <img className='absolute top-2 left-3/4' src={HiredStamp} alt='Hired Stamp' />

                )
            }
            <CardContent 
                sx={{
                    padding: "0px"
                }}>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                    <div className='flex'>
                        <h3 className='typography-h3 mr-10'>Hired</h3>
                        {/* ... other content ... */}
                    </div>
                    <Box display="flex" alignItems="center">
                        <StatusBadge customWidth={"w-fit"} status={stageData?.status} />
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </StyledCard>
    );
}

export default Hired