import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const stages = ['Portfolio', 'Screening', 'Design task', 'Round 1', 'Round 2'];

const StageContent = ({ stage, candidateData, onAutoAssign }) => {
  switch (stage) {
    case 'Portfolio':
      return (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              This candidate's portfolio has not yet been assigned to a reviewer.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2">Portfolio</span>
              <a href={candidateData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                Portfolio link <FaExternalLinkAlt className="ml-1" />
              </a>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Website</span>
              <a href={candidateData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                Website link <FaExternalLinkAlt className="ml-1" />
              </a>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="mr-2">Date started:</span>
              <span>{new Date(candidateData.applicationDate).toLocaleDateString()}</span>
            </div>
            <button
              onClick={onAutoAssign}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Auto assign portfolio
            </button>
          </div>
        </>
      );
    case 'Screening':
      return <p>Content for Screening stage</p>;
    case 'Design task':
      return <p>Content for Design task stage</p>;
    case 'Round 1':
      return <p>Content for Round 1 stage</p>;
    case 'Round 2':
      return <p>Content for Round 2 stage</p>;
    default:
      return <p>No content available for this stage</p>;
  }
};

const MultiRoundStages = ({ initialStage, candidateData, onAutoAssign }) => {
  const [currentStage, setCurrentStage] = useState(initialStage);
  const currentStageIndex = stages.indexOf(currentStage);

  const handleStageChange = (stage) => {
    setCurrentStage(stage);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Stage</h2>
      <div className="flex justify-between mb-4">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isDisabled = index > currentStageIndex;

          return (
            <button
              key={index}
              onClick={() => !isDisabled && handleStageChange(stage)}
              className={`flex items-center justify-center w-40 h-12 rounded-full ${
                isCurrent
                  ? 'bg-blue-600 text-white'
                  : isCompleted
                  ? 'bg-green-500 text-white'
                  : isDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              disabled={isDisabled}
            >
              <span>{stage}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{currentStage}</h3>
          <div className="flex items-center">
            <span className="mr-4">Not assigned</span>
            <span>0% complete</span>
          </div>
        </div>

        <StageContent stage={currentStage} candidateData={candidateData} onAutoAssign={onAutoAssign} />
      </div>
    </div>
  );
};

export default MultiRoundStages;