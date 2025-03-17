import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { updateStageStatus } from '../../redux/applicationStageSlice';
import { Button } from '../Buttons/Button';

const NoShowAction = ({ stage, candidateId, jobId , setIsLoading }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const noShowMutation = useMutation({
        mutationFn: () => axios.post('/hr/no-show', {
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
                status: 'No Show',
                data: data
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError : (error) => {
            // console.log("Error In triggering no-show",error.message);
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const handleNoShow = () => {
        noShowMutation.mutate();
    };

    return (
            <Button 
                variant="cancelSec"
                onClick={handleNoShow}
                disabled={noShowMutation.isLoading}
            >
                {noShowMutation.isLoading ? 'Updating...' : 'No Show'}
            </Button>
    );
};

export default NoShowAction;