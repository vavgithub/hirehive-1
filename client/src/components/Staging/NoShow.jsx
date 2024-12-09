import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../ui/Button';

const NoShowAction = ({ stage, candidateId, jobId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const noShowMutation = useMutation({
        mutationFn: () => axios.post('/hr/no-show', {
            candidateId,
            jobId,
            currentStage: stage
        }),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage,
                status: 'No Show',
                data: data
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
    });

    const handleNoShow = () => {
        noShowMutation.mutate();
    };

    return (
        <div className='w-[170px]'>
            <Button 
                variant="cancelSec"
                onClick={handleNoShow}
                disabled={noShowMutation.isLoading}
            >
                {noShowMutation.isLoading ? 'Updating...' : 'No Show'}
            </Button>
        </div>
    );
};

export default NoShowAction;