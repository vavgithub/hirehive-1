import React, { useState } from 'react'
import BasicSelect from '../BasicSelect';
import ProgressIndicator from '../ProgressIndicator';
import { Button } from '../ui/Button';
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect';
import FileSaver from 'file-saver';

const getStageOptions = (stage) => {
    switch (stage) {
        case 'Portfolio':
            return ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'];
        case 'Screening':
            return ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        case 'Design Task':
            return ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'];
        case 'Round 1':
            return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        case 'Round 2':
            return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        default:
            return ['N/A'];
    }
};





const PortfolioStage = ({ candidateData, assignee, onAssigneeChange, allAssignees }) => {

    console.log(candidateData)

    //this is the modal for auto assign portfolio
    const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState([]);
    const list = getStageOptions(candidateData.stage);
    const [isModalOpenPortfolio, setIsModalOpenPortfolio] = useState(false);

    const handleMultipleAssigneeChange = async () => {
        return (
            console.log("Hello Saaab")
        )
    };


    return (
        <div className='w-full bg-background-100' >
            <div  >
                <div className='flex justify-between bg-background-90'>
                    <h1 className='typography-h3 text-white'>Portfolio</h1>
                    <div className='flex text-white'>

                        {candidateData.status}
                        {candidateData.assignees.Portfolio}
                        {candidateData.portfolio}
                    </div>
                </div>
                {/* <div className='flex gap-4' >

                    <div>
                        <ProgressIndicator stage="Portfolio" status={candidateData.status} />
                    </div>
    
                </div> */}
            </div>
            <div className='m-8'>
                <div>
                    hello
                </div>
                {candidateData.status == "Not Assigned" &&

                    <p className='bg-background-80 inline' > This candidate's portfolio has not yet been assigned to a reviewer.</p>
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
                    {
                        candidateData.assignee === "Not Assigned" &&
                        <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpenPortfolio(!isModalOpenPortfolio)}>Assign Portfolio</button>

                    }
                </div>
            </div>
            <div className='flex justify-between bg-background-90'>
                <div>
                    <p className='text-white'>Received On</p>
                    <p className='typography-h3 text-white'>
                        {candidateData.createdAt}
                    </p>

                </div>

                <div className='flex gap-4 '>
                    {
                        candidateData.status == "Not Assigned" ? <Button variant="secondary"
                            onClick={() => setOpenAssigneeModal(true)}
                            className="mb-4 px-4 py-2 bg-black text-white rounded "
                        >
                            Assign Multiple Candidates
                        </Button> : (
                            <div className='flex gap-6'>
                                <div className='w-[236px]'>
                                    <Button variant="cancel" >Reject</Button>
                                </div>
                                <div className='w-[236px]'>
                                    <Button variant="secondary">Move To Next Round</Button>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>

            <InputPopUpModalAutoSelect
                open={openAssigneeModal}
                onClose={() => setOpenAssigneeModal(false)}
                confirmAction={handleMultipleAssigneeChange}
                assignees={selectedAssignees}
                setAssignees={setSelectedAssignees}
                singleSelect={true}
                allAssignees={allAssignees}
                heading="Assign Multiple Candidates"
                para="Select assignees for candidates in Portfolio stage with 'Not Assigned' status."
                confirmButtonText="Assign"
                cancelButtonText="Cancel"
            />
        </div>
    )
}

export default PortfolioStage