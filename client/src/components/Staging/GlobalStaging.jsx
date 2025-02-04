import React from 'react'
import StyledCard from '../ui/StyledCard'
import StatusBadge from '../ui/StatusBadge'
import { stagingConfig } from './staging.config.js';   

function GlobalStaging({selectedStage,stageStatuses,role}) {
    const currentStatus = stageStatuses[selectedStage]?.status;
  return (
    <StyledCard padding={3} >
      <div className='flex justify-between items-center'>
        <div>
            <h2 className='typography-h2'>Portfolio</h2>
        </div>
        <div>
            <StatusBadge status={currentStatus} customWidth={"w-fit"} />
        </div>
      </div>
    </StyledCard>
  )
}

export default GlobalStaging
