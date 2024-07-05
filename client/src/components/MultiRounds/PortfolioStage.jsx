import React from 'react'
import BasicSelect from '../BasicSelect';
import ProgressIndicator from '../ProgressIndicator';

const PortfolioStage = ({ candidateData, assignee, onAssigneeChange, allAssignees }) => {
    return (
        <div className='p-4' >
            <div className='flex justify-between'>
                <div>
                    <h1>Portfolio</h1>
                </div>
                <div className='flex gap-4' >

                    <div>
                        <ProgressIndicator stage="Portfolio" status={candidateData.status} />
                    </div>
                    <div>
                        {candidateData.status}
                    </div>
                    <div>
                        Current Assignee: {assignee || 'Not Assigned'}
                    </div>
                </div>
            </div>
            <div>
                {candidateData.status == "Not Assigned" &&
                    <p>This candidate's portfolio has not yet been assigned to a reviewer.</p>
                }

                {candidateData.status == "Under Review" &&
                    <p>The portfolio is now being reviewed by the assigned reviewer..</p>
                }
            </div>
            <div className='flex' >
                <div className='w-8 ml-[85%]'>

                    {
                        candidateData.assignee === "Not Assigned" &&
                        <BasicSelect
                            label="Assignee"
                            value={assignee}
                            onChange={onAssigneeChange}
                            list={allAssignees}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default PortfolioStage