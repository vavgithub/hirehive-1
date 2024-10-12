import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Portfolio from './Portfolio';
import Screening from './Screening';
import StageProgressBar from './StageProgressBar';
import DesignTask from './DesignTask';
import RoundOne from './RoundOne';
import RoundTwo from './RoundTwo';
import GreenTickIcon from '../../svg/Staging/GreenTickIcon';
import RejectTickIcon from '../../svg/Staging/RejectTickIcon';

const stageComponents = {
    Portfolio,
    Screening,
    'Design Task': DesignTask,
    'Round 1': RoundOne,
    'Round 2': RoundTwo,
};

const ApplicationStaging = ({ candidateId, jobId }) => {
    const { currentStage, stageStatuses } = useSelector((state) => state.applicationStage);
    const [selectedStage, setSelectedStage] = useState(null);

    console.log('ApplicationStaging - Current stage:', currentStage);
    console.log('ApplicationStaging - Stage statuses:', stageStatuses);

    const stages = Object.keys(stageStatuses);

    useEffect(() => {
        // Set the selected stage to the current stage when the component mounts or currentStage changes
        setSelectedStage(currentStage);
    }, [currentStage]);

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
            isActive: stage === currentStage,
        };

        return <StageComponent {...commonProps} />;
    };

    const isStageVisible = (stage) => {
        const stageIndex = stages.indexOf(stage);
        const currentStageIndex = stages.indexOf(currentStage);
        return (
            stage === currentStage ||
            (stageIndex <= currentStageIndex && ['Cleared', 'Rejected'].includes(stageStatuses[stage]?.status))
        );
    };

    const getStageIcon = (stage, index) => {
        const status = stageStatuses[stage]?.status;
        if (status === 'Cleared') {
            return <GreenTickIcon />;
        } else if (status === 'Rejected') {
            return <RejectTickIcon />;
        } else {
            return (
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border border-white ${stage === currentStage ? 'bg-teal-400' : ''}`}>
                    {index + 1}
                </div>
            );
        }
    };

    const visibleStages = stages.filter(isStageVisible);

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
                        <div 
                            className={`stage-item flex typography-body flex-col gap-2 justify-center items-center cursor-pointer ${isStageVisible(stage) ? '' : 'opacity-50'}`}
                            onClick={() => isStageVisible(stage) && setSelectedStage(stage)}
                        >
                            <div className="stage-icon">
                                {getStageIcon(stage, index)}
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
                {selectedStage && renderStageComponent(selectedStage)}
            </div>
        </div>
    );
};

export default ApplicationStaging;