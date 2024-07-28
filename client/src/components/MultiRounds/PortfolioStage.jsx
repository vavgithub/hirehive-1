import React, { useState } from 'react'
import BasicSelect from '../BasicSelect';
import ProgressIndicator from '../ProgressIndicator';
import { Button } from '../ui/Button';
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect';
import FileSaver from 'file-saver';
import axios from 'axios';
import Label from '../ui/Label';

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

const useHandleReject = (candidateData, onStatusUpdate) => {

    const [isRejecting, setIsRejecting] = useState(false);

    const handleReject = async () => {
        setIsRejecting(true);
        try {
            const currentStage = candidateData.stage;
            const updatedStatus = {
                ...candidateData.stageStatus,
                [currentStage]: 'Rejected'
            };

            // Make API call to update the candidate's status
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: updatedStatus
            });

            if (response.status === 200) {
                // Call the onStatusUpdate function to update the local state
                onStatusUpdate(currentStage, 'Rejected');
                console.log(`Candidate rejected in ${currentStage} stage`);
            } else {
                throw new Error('Failed to update candidate status');
            }
        } catch (error) {
            console.error('Error rejecting candidate:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsRejecting(false);
        }
    };

    return { handleReject, isRejecting };
};




const PortfolioStage = ({ candidateData, assignee, onAssigneeChange, allAssignees, onStatusUpdate, onReject, onNext }) => {
    const { handleReject, isRejecting } = useHandleReject(candidateData, onStatusUpdate);

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

  if (!candidateData || !candidateData.stageStatus || !candidateData.stageStatus.Portfolio) {
    return <div>Loading...</div>; // Or some other loading indicator
  }


    return (
        <div className='w-full bg-background-100' >
      <div>
        <div className='flex justify-between bg-background-90'>
          <h1 className='typography-h3 text-white'>Portfolio</h1>
          <div className='flex text-white'>
            {candidateData.stageStatus.Portfolio.status}
            {candidateData.stageStatus.Portfolio.assignee}
            {candidateData.portfolio}
          </div>
        </div>
      </div>


            {/* middle layer */}
           
      <div className='m-8'>
        {candidateData.stageStatus.Portfolio.status === "Not Assigned" &&
          <p className='bg-background-80 inline'>This candidate's portfolio has not yet been assigned to a reviewer.</p>
        }

        {candidateData.stageStatus.Portfolio.status === "Under Review" &&
          <p className='bg-background-80 inline'>The portfolio is now being reviewed by the assigned reviewer.</p>
        }

        {candidateData.stageStatus.Portfolio.status === "Cleared" &&
          <Label text="Lorem ipsum dolor sit amet consectetur. Eget congue magna interdum ac gravida elementum suspendisse. Urna amet magna massa mattis blandit vitae eu ante." />
        }
      </div>

      <div className='flex'>
        <div className='w-8 ml-[85%]'>
          {candidateData.stageStatus.Portfolio.assignee === "N/A" &&
            <BasicSelect
              label="Assignee"
              value={assignee}
              onChange={onAssigneeChange}
              list={allAssignees}
            />
          }
          {candidateData.stageStatus.Portfolio.assignee === "N/A" &&
            <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpenPortfolio(!isModalOpenPortfolio)}>Assign Portfolio</button>
          }
        </div>
      </div>


            {/* third layer */}
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
                                    <Button variant="cancel" onClick={onReject}  >Reject</Button>
                                </div>
                                <div className='w-[236px]'>
                                    <Button variant="secondary" onClick={onNext}>Move To Next Round</Button>
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