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
import Hired from './Hired';
import QuestionResponses from './QuestionResponses';
import { Card } from '@mui/material';
import { useAuthContext } from '../../context/AuthProvider';
const stageComponents = {
    Portfolio,
    Screening,
    'Design Task': DesignTask,
    'Round 1': RoundOne,
    'Round 2': RoundTwo,
    Hired
};
const AccordionSection = ({ title, isOpen, onToggle, children, badge }) => (
    <Card
        sx={{
            backgroundColor: "rgba(22, 23, 24, 1)",
            borderRadius: "12px",
            color: "white",
            fontFamily: 'Outfit, sans-serif',
            marginTop: "12px"
        }}
    >
        <div className="w-full">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 flex justify-between items-center border-b border-background-80"
            >
                <div className="flex items-center gap-4">
                    <h3 className="typography-h3">{title}</h3>
                    {badge}
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className="p-6">
                    {children}
                </div>
            )}
        </div>
    </Card>
);
const ApplicationStaging = ({ candidateId, jobId }) => {

    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified

    const { currentStage, stageStatuses } = useSelector((state) => state.applicationStage);
    const candidateData = useSelector(state => state.candidate.candidateData);
    const [selectedStage, setSelectedStage] = useState(null);
    const [isQuestionsOpen, setIsQuestionsOpen] = useState(false);
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
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border  ${stage === currentStage ? 'border-teal-400 text-font-accent' : ''}`}>
                    {index + 1}
                </div>
            );
        }
    };
    const visibleStages = stages.filter(isStageVisible);
    if (!stages.length) {
      
        return <div>No stages available. Please check the candidate data.</div>;
    }
    const renderQuestionResponses = () => {
        const responses = candidateData?.jobApplication?.questionResponses;

        if (!responses || responses.length === 0) {
            return (
                <div className="text-center text-font-gray">
                    No question responses available
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {responses.map((response, index) => (
                    <div
                        key={response.questionId}
                        className="border border-background-80 rounded-lg p-4"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-background-80 flex items-center justify-center">
                                <span className="text-sm text-font-primary">{index + 1}</span>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="typography-body text-font-gray">
                                    {response.question.text}
                                    {response.question.required && (
                                        <span className="ml-1 text-red-500">*</span>
                                    )}
                                </div>
                                <div className="typography-body text-white">
                                    {response.question.type === 'multiple' ? (
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-background-80 rounded-full">
                                                {response.answer}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bg-background-80 p-3 rounded-lg">
                                            {response.answer}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="application-staging">
            <h2 className="mb-4">Application Stages</h2>

            {/* Stage Progress Section */}
            <div className="stages-progress flex">
                {stages.map((stage, index) => (
                    <React.Fragment key={stage}>
                        <div
                            className={`stage-item flex typography-body flex-col gap-2 justify-center items-center cursor-pointer ${isStageVisible(stage) ? '' : 'opacity-50'}`}
                            onClick={() => isStageVisible(stage) && setSelectedStage(stage)}
                        >
                            <div className="stage-icon">
                                {getStageIcon(stage, index)}
                            </div>
                            <div className={`stage-name mb-2 typography-body ${stage === currentStage ? "text-font-accent" : "text-white"}`}>
                                {stage}
                            </div>
                        </div>
                        {index < stages.length - 1 && (
                            <div className="progress-bar flex-grow mx-2 flex justify-center">
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

            {/* Stage Content */}
            <div className="stages-content mt-8">
                {selectedStage && renderStageComponent(selectedStage)}
            </div>

            {/* Question Responses Accordion */}

            {
                role === "Hiring Manager" && (

                    <AccordionSection
                        title="Application Questions"
                        isOpen={isQuestionsOpen}
                        onToggle={() => setIsQuestionsOpen(!isQuestionsOpen)}
                        badge={
                            <span className="typography-small-p text-font-gray">
                                {candidateData?.jobApplication?.questionResponses?.length || 0} Questions
                            </span>
                        }
                    >
                        {renderQuestionResponses()}
                    </AccordionSection>

                )
            }
        </div>
    );
};

export default ApplicationStaging;
