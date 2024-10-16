import { Box, Card, CardContent } from '@mui/material';
import React from 'react'
import StatusBadge from '../ui/StatusBadge';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useDispatch, useSelector } from 'react-redux';
import Label from '../ui/Label';
import StageActions from './StageAction';

const Hired = ({ candidateId, jobId }) => {
    const fetchTotalScore = async (candidateId, jobId) => {
        const { data } = await axios.get(`hr/candidate/${candidateId}/job/${jobId}/scores`);
        return data;
    }
    const { data: score, error } = useQuery({
        queryKey: ['candidateScore', candidateId, jobId],
        queryFn: () => fetchTotalScore(candidateId, jobId),
        cacheTime: 0,
        staleTime: 0,
        onError: (error) => {
            console.error('Query Error:', error);
            dispatch(setError(error.message));
        },
    });

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const stageData = useSelector(state => state.applicationStage.stageStatuses.Hired);
    console.log(stageData);

    const renderContent = () => {
        switch (stageData?.status) {
            case 'Not Assigned':
                return (
                    <div className="flex flex-col gap-4">
                        <Label text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below" />

                    </div>
                );
            case 'Under Review':
                return (
                    <>

                        <div className='flex gap-4'>


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
                            isBudgetScoreSubmitted={true}
                        />
                    </>

                );

            case 'Accepted':
                return (
                    <Label text={"Candidate hired for the role of “Junior UI/UX Designer"}></Label>
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
                                            <p className='display-d2 font-bold'>{stageData?.score}</p>
                                            <p className='typography-small-p text-font-gray'>Out Of 5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StageActions
                            stage="Round 1"
                            candidateId={candidateId}
                            jobId={jobId}
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
                        <h3 className='typography-h3 mr-10'>Hired</h3>
                        {/* ... other content ... */}
                    </div>
                    <Box display="flex" alignItems="center">
                        <StatusBadge status={stageData?.status} />
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
        </Card>
    );
}

export default Hired