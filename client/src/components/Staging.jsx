import React, { useEffect, useState } from 'react'
import PortfolioStage from './MultiRounds/PortfolioStage';
import ScreeningStage from './MultiRounds/ScreeningStage';
import DesignTaskStage from './MultiRounds/DesignTaskStage';
import Round1Stage from './MultiRounds/Round1Stage';
import Round2Stage from './MultiRounds/Round2Stage';
import ProgressIndicator from './ProgressIndicator';
import axios from 'axios';
import GreenTickIcon from '../svg/Staging/GreenTickIcon';
import RejectTickIcon from '../svg/Staging/RejectTickIcon';

const stages = ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2'];
const allAssignees = ['John', 'Vevaar', 'Komael', 'Eshan', 'Sushmita', 'Jordyn'];

const stageStatusOptions = {
  Portfolio: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'],
  Screening: ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
  'Design Task': ['Not Assigned', 'Sent', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'],
  'Round 1': ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
  'Round 2': ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
};

const Staging = ({ currentStage, candidateData: initialCandidateData }) => {
  const [activeStage, setActiveStage] = useState(currentStage);
  const [candidateData, setCandidateData] = useState(initialCandidateData);
  const [assignee, setAssignee] = useState(initialCandidateData.assignee || '');

  useEffect(() => {
    setActiveStage(currentStage);
    setCandidateData(initialCandidateData);
    setAssignee(initialCandidateData.assignee || '');
  }, [currentStage, initialCandidateData]);

  const isStageAccessible = (stage) => {
    return stages.indexOf(stage) <= stages.indexOf(currentStage);
  };

  const handleStageClick = (stage) => {
    if (isStageAccessible(stage)) {
      setActiveStage(stage);
    }
  };


  if (!candidateData || !candidateData.stageStatus) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  const handleAssigneeChange = async (event) => {
    const newAssignee = event.target.value;
    setAssignee(newAssignee);

    try {
      const response = await fetch(`http://localhost:8008/api/v1/candidates/${candidateData._id}/assignee`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignee: newAssignee }),
      });

      if (!response.ok) {
        throw new Error('Failed to update assignee');
      }

      // Optionally, you can update the local state with the response data
      const updatedCandidate = await response.json();
      // Update your local state with updatedCandidate if needed
    } catch (error) {
      console.error('Error updating assignee:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleReject = async (stage, reason) => {
    try {
      const updatedStageStatus = {
        ...candidateData.stageStatus,
        [stage.replace(/\s+/g, '')]: { 
          ...candidateData.stageStatus[stage.replace(/\s+/g, '')], 
          status: 'Rejected',
          rejectionReason: reason
        }
      };

      const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
        stageStatus: updatedStageStatus
      });

      if (response.status === 200) {
        setCandidateData(prevData => ({
          ...prevData,
          stageStatus: updatedStageStatus
        }));
        console.log(`Candidate rejected in ${stage} stage`);
      } else {
        throw new Error('Failed to update candidate status');
      }
    } catch (error) {
      console.error('Error rejecting candidate:', error);
    }
  };


  const handleNext = async (currentStage) => {
    try {
      const currentIndex = stages.indexOf(currentStage);
      if (currentIndex === stages.length - 1) {
        throw new Error('Already at the last stage');
      }

      const nextStage = stages[currentIndex + 1];
      const nextStageInitialStatus = stageStatusOptions[nextStage][0];

      const updatedStageStatus = {
        ...candidateData.stageStatus,
        [currentStage.replace(/\s+/g, '')]: { ...candidateData.stageStatus[currentStage.replace(/\s+/g, '')], status: 'Cleared' },
        [nextStage.replace(/\s+/g, '')]: { ...candidateData.stageStatus[nextStage.replace(/\s+/g, '')], status: nextStageInitialStatus }
      };

      const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
        stage: nextStage,
        stageStatus: updatedStageStatus
      });

      if (response.status === 200) {
        setCandidateData(prevData => ({
          ...prevData,
          stage: nextStage,
          stageStatus: updatedStageStatus
        }));
        setActiveStage(nextStage);
        console.log(`Candidate moved from ${currentStage} to ${nextStage}`);
      } else {
        throw new Error('Failed to update candidate stage');
      }
    } catch (error) {
      console.error('Error moving candidate to next stage:', error);
    }
  };


  const renderStageComponent = (stage) => {
    const commonProps = {
      candidateData: candidateData,
      assignee: assignee,
      onAssigneeChange: handleAssigneeChange,
      allAssignees: allAssignees,
      onReject: (reason) => handleReject(stage, reason),
      onNext: () => handleNext(stage),
    };

    switch (stage) {
      case 'Portfolio':
        return <PortfolioStage {...commonProps} />;
      case 'Screening':
        return <ScreeningStage {...commonProps} />;
      case 'Design Task':
        return <DesignTaskStage {...commonProps} />;
      case 'Round 1':
        return <Round1Stage {...commonProps} />;
      case 'Round 2':
        return <Round2Stage {...commonProps} />;
      default:
        return null;
    }
  };
  const getStageStatus = (stage) => {
    if (!candidateData || !candidateData.stageStatus) {
      console.warn(`candidateData or stageStatus is undefined for stage: ${stage}`);
      return 'Not Started';
    }
    const stageKey = stage.replace(/\s+/g, '');
    return candidateData.stageStatus[stageKey]?.status || 'Not Started';
  };

  // if (!candidateData || !candidateData.stageStatus.[stage].status) {
  //   return <div>Loading...</div>; // Or some other loading indicator
  // }

  return (
    <div>
      <div className='flex justify-around '>
        {stages.map((stage, index) => {
          const isAccessible = isStageAccessible(stage);
          const stageKey = stage.replace(/\s+/g, '');
          const stageData = candidateData.stageStatus[stageKey];
          const stageStatus = stageData ? stageData.status : 'Not Started';
          const isCleared = stageStatus === 'Cleared';
          const isRejected = stageStatus === 'Rejected';
          
          return (
            <div
              key={index}
              className={`p-2 cursor-pointer flex items-center justify-center gap-14 ${
                activeStage === stage
                  ? 'text-font-accent'
                  : isAccessible
                    ? ' text-white'
                    : 'text-font-gray cursor-not-allowed'
              }`}
              onClick={() => handleStageClick(stage)}
            >
              <div className='flex flex-col items-center'>
                {isCleared ? (
                  <GreenTickIcon />
                ) : isRejected ? (
                  <RejectTickIcon />
                ) : (
                  <div className="typography-small-p flex items-center justify-center w-6 h-6 border-2 border-gray-300 rounded-full">
                    {index + 1}
                  </div>
                )}
                <div>
                  {stage}
                </div>
              </div>
              <ProgressIndicator stage={stage} status={stageStatus} />
            </div>
          )
        })}
      </div>
      {renderStageComponent(activeStage)}
    </div>
  )
}

export default Staging