import React, { useEffect, useState } from 'react'
import PortfolioStage from './MultiRounds/PortfolioStage';
import ScreeningStage from './MultiRounds/ScreeningStage';
import DesignTaskStage from './MultiRounds/DesignTaskStage';
import Round1Stage from './MultiRounds/Round1Stage';
import Round2Stage from './MultiRounds/Round2Stage';
import ProgressIndicator from './ProgressIndicator';
import axios from 'axios';

const stages = ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2'];
const allAssignees = ['John', 'Vevaar', 'Komael', 'Eshan', 'Sushmita', 'Jordyn'];

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

  const handleAssigneeChange = async(event) => {
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

  const handleReject = async (stage) => {
    try {
      const updatedStageStatus = {
        ...candidateData.stageStatus,
        [stage.replace(/\s+/g, '')]: 'Rejected'
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
      // Handle error (e.g., show error message to user)
    }
  };


  const renderStageComponent = (stage) => {
    const commonProps = {
      candidateData: candidateData,
      assignee: assignee,
      onAssigneeChange: handleAssigneeChange,
      allAssignees: allAssignees,
      onReject: () => handleReject(stage),
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
    const stageKey = stage.replace(/\s+/g, '');  // Remove spaces for object key
    return candidateData.stageStatus[stageKey] || 'Not Started';
  };

  if (!candidateData) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <div>
      <div className='flex justify-around '>
        {stages.map((stage, index) => {
          const isAccessible = isStageAccessible(stage);
          const stageStatus = getStageStatus(stage);
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
              {stage}
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