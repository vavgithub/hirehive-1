import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
// import { updateStageStatus, setCurrentStage } from './applicationStageSlice';
import Portfolio from './Portfolio';
import Screening from './Screening';
import StageProgressBar from './StageProgressBar';
import DesignTask from './DesignTask';
import RoundOne from './RoundOne';
import RoundTwo from './RoundTwo';
import { setCurrentStage, updateStageStatus } from '../../redux/applicationStageSlice';

const stageComponents = {
    Portfolio,
    Screening,
    'Design Task': DesignTask,
    'Round 1': RoundOne,
    'Round 2': RoundTwo,
};

const ApplicationStaging = ({ candidateId, jobId }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { currentStage, stageStatuses } = useSelector((state) => state.applicationStage);
    console.log('ApplicationStaging - Current stage:', currentStage);
    console.log('ApplicationStaging - Stage statuses:', stageStatuses);

    const stages = Object.keys(stageStatuses);

    const updateStageMutation = useMutation({
        mutationFn: ({ stage, status, data }) =>
            axios.put(`/admin/update-stage/${candidateId}/${jobId}`, { stage, status, data }),
        onSuccess: (data, variables) => {
            dispatch(updateStageStatus(variables));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
    });

    const moveToNextStageMutation = useMutation({
        mutationFn: () => axios.post(`/admin/move-to-next-stage/${candidateId}/${jobId}`),
        onSuccess: (data) => {
            dispatch(setCurrentStage(data.nextStage));
            dispatch(updateStageStatus({
                stage: currentStage,
                status: 'Cleared',
                data: { completedDate: new Date() }
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
    });

    const handleUpdateStage = (stage, status, data) => {
        updateStageMutation.mutate({ stage, status, data });
    };

    const handleMoveToNextStage = () => {
        moveToNextStageMutation.mutate();
    };

    const renderStageComponent = (stage) => {
        const StageComponent = stageComponents[stage];
        if (!StageComponent) {
            console.warn(`No component found for stage: ${stage}`);
            return null;
        }

        const commonProps = {
            stageData: stageStatuses[stage],
            candidateId,
            jobId,
            onUpdateStage: handleUpdateStage,
            onMoveToNextStage: handleMoveToNextStage,
            isActive: stage === currentStage,
        };

        return <StageComponent {...commonProps} />;
    };


    if (!stages.length) {
        console.log('No stages available');
        return <div>No stages available. Please check the candidate data.</div>;
    }

    return (
        <div className="application-staging">
            <h2 className="mb-4">Application Stages</h2>
            <div className="stages-progress flex items-center">
                {stages.map((stage, index) => (
                    <React.Fragment key={stage}>
                        <div className="stage-item flex typography-body flex-col gap-2 justify-center items-center">
                            <div className="stage-icon">
                                <div className={`w-6 h-6 flex items-center justify-center rounded-full border border-white ${stage === currentStage ? 'bg-teal-400' : ''}`}>{index + 1}</div>
                            </div>
                            <div className="stage-name mb-2 typography-body">{stage}</div>
                        </div>
                        {index < stages.length - 1 && (
                            <div className="progress-bar flex-grow mx-2">
                                <StageProgressBar
                                    stage={stage}
                                    status={stageStatuses[stage]?.status}
                                    isActive={stage === currentStage}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="stages-content mt-8">
                {stages.map((stage) => (
                    <div key={stage} className={`stage-container ${stage === currentStage ? 'active' : ''}`}>
                        {renderStageComponent(stage)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationStaging;