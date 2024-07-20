import React, { useEffect, useState } from 'react'
import PortfolioStage from './MultiRounds/PortfolioStage';
import ScreeningStage from './MultiRounds/ScreeningStage';
import DesignTaskStage from './MultiRounds/DesignTaskStage';
import Round1Stage from './MultiRounds/Round1Stage';
import Round2Stage from './MultiRounds/Round2Stage';

const stages = ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2'];
const allAssignees = ['John', 'Vevaar', 'Komael', 'Eshan', 'Sushmita', 'Jordyn'];

const Staging = ({ currentStage, candidateData }) => {
  const [activeStage, setActiveStage] = useState(currentStage);
  const [assignee, setAssignee] = useState(candidateData.assignee || '');

  useEffect(() => {
    setActiveStage(currentStage);
    setAssignee(candidateData.assignee || '');
  }, [currentStage, candidateData]);

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


  const renderStageComponent = (stage) => {
    const commonProps = {
      candidateData: candidateData,
      assignee: assignee,
      onAssigneeChange: handleAssigneeChange,
      allAssignees: allAssignees,
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

  return (
    <div>
      <div className='flex justify-between'>
        {
          stages.map((stage, index) => {
            const isAccessible = isStageAccessible(stage);
            return (
              <div key={index} className={`p-2 cursor-pointer ${activeStage === stage
                ? 'text-font-accent'
                : isAccessible
                  ? ' text-white'
                  : 'text-font-gray cursor-not-allowed'
                }`} onClick={() => handleStageClick(stage)} >{stage}</div>

            )
          })
        }
      </div>
      {renderStageComponent(activeStage)}
    </div>
  )
}

export default Staging