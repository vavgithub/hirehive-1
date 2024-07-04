import React from 'react'
import BasicSelect from '../BasicSelect';
import ProgressIndicator from '../ProgressIndicator';

const PortfolioStage = ({ candidateData, assignee, onAssigneeChange, allAssignees }) => {
    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <h1>Portfolio</h1>
                </div>
                <div className='flex' >

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
            <div>
                <div>
                    <BasicSelect
                        label="Assignee"
                        value={assignee}
                        onChange={onAssigneeChange}
                        list={allAssignees}
                      
                    />
                </div>
            </div>
        </div>
    )
}

export default PortfolioStage