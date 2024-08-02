import React, { useEffect, useState } from 'react'
import InputPopUpModal from '../InputPopUpModal'
import StatusBadge from '../ui/StatusBadge'
import AssigneeSelector from '../utility/AssigneeSelector'
import BudgetIcon from '../../svg/Staging/BudgetIcon'

const DesignTaskStage = ({ candidateData: initialCandidateData, onStatusUpdate, onReject, onNext }) => {
  const [candidateData, setCandidateData] = useState(initialCandidateData);
  const [selectedAssignee, setSelectedAssignee] = useState(
    candidateData.stageStatus["Design Task"].assignee
        ? { name: candidateData.stageStatus["Design Task"].assignee }
        : candidateData.stageStatus["Design Task"].assignee
            ? { name: candidateData.stageStatus["Design Task"].assignee }
            : null
);

const [rejectValue, setRejectValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(candidateData.stageStatus["Design Task"])

  const handleAssigneeSelect = (assignee) => {
    handleAssigneeUpdate(assignee);
};


const handleAssigneeUpdate = async (newAssignee) => {
    try {
        const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
            stageStatus: {
                ...candidateData.stageStatus,
                "Design Task": {
                    ...candidateData.stageStatus["Design Task"],
                    assignee: newAssignee ? newAssignee.name : null
                }
            }
        });

        if (response.status === 200) {
            setCandidateData(prevData => ({
                ...prevData,
                stageStatus: {
                    ...prevData.stageStatus,
                    "Design Task": {
                        ...prevData.stageStatus["Design Task"],
                        assignee: newAssignee ? newAssignee.name : null
                    }
                }
            }));
            setSelectedAssignee(newAssignee);
            console.log('Assignee updated successfully');
        }
    } catch (error) {
        console.error('Error updating assignee:', error);
        alert('Failed to update assignee. Please try again.');
    }
};

const handleConfirmReject = () => {
  onReject(rejectValue);
  setIsModalOpen(false);
};

useEffect(() => {
  setCandidateData(initialCandidateData);
}, [initialCandidateData]);

const fields = [
  {
      type: 'select',
      label: 'Please provide the reason for rejecting this candidate',
      value: rejectValue,
      onChange: (e) => setRejectValue(e.target.value),
      options: [
          { value: "", label: "Select Start Range" },
          { value: 'Candidates scores did not meet the criteria', label: 'Candidates scores did not meet the criteria' },
          { value: 'Candidate did not appear for the screening', label: 'Candidate did not appear for the screening' },
          { value: 'Candidate did not appear for round one', label: 'Candidate did not appear for round one' },
          { value: 'Candidate did not appear for round two', label: 'Candidate did not appear for round two'},
          { value: 'Candidate did not submit the design task', label: 'Candidate did not submit the design task' },
      ],
  }
]

  return (
    <div className='w-full bg-background-100 rounded-xl'>

        {/* first layer */}
        <div >
            <div className='flex items-center justify-between rounded-xl  bg-background-90 p-4'>
                <h1 className='typography-h3 text-white'>Screening</h1>
                <div className='flex items-center gap-4'>
                    <StatusBadge status={candidateData.stageStatus["Design Task"].status} />


                    <AssigneeSelector
                        mode="icon"
                        value={selectedAssignee}
                        onChange={handleAssigneeSelect}
                        onSelect={handleAssigneeSelect}
                    />

                    <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
                        <BudgetIcon />
                    </div>
                    <p className='typography-body'>{candidateData.budget}LPA</p>


                </div>
            </div>
        </div>


        {/* this is the middle layer */}
        {/* <div className='m-4'>
            {renderStatusLabel()}
        </div> */}


        {/* this is the third laye the footer */}
        
       
        <InputPopUpModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            confirmAction={handleConfirmReject}
            fields={fields}
            heading="Reject"
            para={`Are you sure you want to reject ${candidateData.firstName}?`}
            confirmButtonText="Reject"
            cancelButtonText="Cancel"
        />
    </div>
)
}

export default DesignTaskStage