import React from 'react'

const PortfolioStage = ({ candidateData }) => {
    return (
            <div>
                <div className='flex justify-between bg-red-500'>
                    <div>

                        <h1>Portfolio</h1>
                    </div>
                    <div>
                        <div>
                            {candidateData.stage}
                        </div>
                        <div>
                            {candidateData.status}
                        </div>
                        <div>
                            {candidateData.assignee}
                        </div>
                        
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
    )
}

export default PortfolioStage