import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const stages = ['Portfolio', 'Screening', 'Design task', 'Round 1', 'Round 2'];

const MultiRoundStages = ({ currentStage, candidateData, onAutoAssign }) => {
    console.log('currentStage:', currentStage);
    console.log('candidateData.stage:', candidateData.stage);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Stage</h2>
            <div className="flex justify-between mb-4">
                {stages.map((stage, index) => {
                    const isCurrentStage = 
                        (typeof currentStage === 'number' && index + 1 === currentStage) ||
                        (typeof currentStage === 'string' && stage === currentStage) ||
                        stage === candidateData.stage;
                    
                    console.log(`Stage ${stage}: isCurrentStage = ${isCurrentStage}`);
                    
                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-center w-40 h-12 rounded-full ${
                                isCurrentStage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            <span>{stage}</span>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {typeof currentStage === 'number' ? stages[currentStage - 1] : currentStage}
                    </h3>
                    <div className="flex items-center">
                        <span className="mr-4">Not assigned</span>
                        <span>0% complete</span>
                    </div>
                </div>

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
            </div>
        </div>
    );
};

export default MultiRoundStages;
