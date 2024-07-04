import React, { useEffect, useState } from 'react'
import PortfolioStage from './MultiRounds/PortfolioStage';
import ScreeningStage from './MultiRounds/ScreeningStage';
import DesignTaskStage from './MultiRounds/DesignTaskStage';
import Round1Stage from './MultiRounds/Round1Stage';
import Round2Stage from './MultiRounds/Round2Stage';

const stages = ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2'];

const Staging = ({ currentStage, candidateData }) => {

  const [activeStage, setActiveStage] = useState(currentStage);

  useEffect(() => {
    setActiveStage(currentStage)
  }, [currentStage])

  const isStageAccessible = (stage) => {
    return stages.indexOf(stage) <= stages.indexOf(currentStage);
  };

  const handleStageClick = (stage) => {
    if (isStageAccessible(stage)) {
      setActiveStage(stage);
    }
  };


  const renderStageComponent = (stage) => {
    switch (stage) {
      case 'Portfolio':
        return <PortfolioStage candidateData={candidateData}/>;
      case 'Screening':
        return <ScreeningStage />;
      case 'Design Task':
        return <DesignTaskStage />
      case 'Round 1':
        return <Round1Stage />
      case 'Round 2':
        return <Round2Stage />
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Stage</h1>
      <div className='flex justify-between'>
        {
          stages.map((stage, index) => {
            const isAccessible = isStageAccessible(stage);
            return (
              <div key={index} className={`p-2 cursor-pointer ${activeStage === stage
                ? 'bg-blue-500 text-white'
                : isAccessible
                  ? 'bg-slate-500 text-black'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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