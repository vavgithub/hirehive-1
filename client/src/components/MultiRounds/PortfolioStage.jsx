import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button';
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect';
import axios from 'axios';
import Label from '../ui/Label';
import StatusBadge from '../ui/StatusBadge';
import AssigneeSelector from '../utility/AssigneeSelector';
import PortfolioIcon from '../../svg/PortfolioIcon';
import WarningIcon from '../../svg/Staging/WarningIcon';
import InputPopUpModal from '../InputPopUpModal';

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





const PortfolioStage = ({ candidateData: initialCandidateData, assignee, onAssigneeChange, allAssignees, onStatusUpdate, onReject, onNext }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateData);

    const [selectedAssignee, setSelectedAssignee] = useState(
        candidateData.stageStatus.Portfolio.assignee
            ? { name: candidateData.stageStatus.Portfolio.assignee }
            : null
    );

    console.log(candidateData)

    //this is the modal for auto assign portfolio
    const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState([]);
    const list = getStageOptions(candidateData.stage);
    const [isModalOpenPortfolio, setIsModalOpenPortfolio] = useState(false);



    const [rejectValue, setRejectValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirmReject = () => {
        onReject(rejectValue);
        setIsModalOpen(false);
    };


    const handleAssigneeSelect = (assignee) => {
        handleAssigneeUpdate([assignee]);
    };

    const handleMultipleAssigneeChange = () => {
        if (selectedAssignees.length > 0) {
            handleAssigneeUpdate(selectedAssignees);
            setOpenAssigneeModal(false);
        } else {
            alert('Please select at least one assignee.');
        }
    };

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

    useEffect(() => {
        console.log('Selected assignees:', selectedAssignees);
    }, [selectedAssignees]);

    useEffect(() => {
        setCandidateData(initialCandidateData);
    }, [initialCandidateData]);

    const handleAssigneeUpdate = async (newAssignees) => {
        try {
            const assigneeNames = newAssignees.map(assignee => assignee.name || assignee);

            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Portfolio: {
                        ...candidateData.stageStatus.Portfolio,
                        assignee: assigneeNames.length === 1 ? assigneeNames[0] : assigneeNames,
                        status:"Under Review"
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Portfolio: {
                            ...prevData.stageStatus.Portfolio,
                            assignee: assigneeNames.length === 1 ? assigneeNames[0] : assigneeNames,
                            status:"Under Review"
                        }
                    }
                }));

                // Update selectedAssignee only if newAssignees is not empty
                if (newAssignees.length > 0) {
                    setSelectedAssignee(newAssignees[0]);
                } else {
                    setSelectedAssignee(null);
                }

                console.log('Assignee(s) updated successfully');
            }
        } catch (error) {
            console.error('Error updating assignee(s):', error);
            alert('Failed to update assignee(s). Please try again.');
        }
    };

    if (!candidateData || !candidateData.stageStatus || !candidateData.stageStatus.Portfolio) {
        return <div>Loading...</div>; // Or some other loading indicator
    }



    const renderStatusLabel = () => {
        // const { status,score } = candidateData.stageStatus.Screening;
        const { status, score  , rejectionReason , totalScore } = candidateData.stageStatus.Portfolio;
        // const hasScore = Object.values(score.totalScore).some(value => value !== null);


        switch (status) {


            case 'Not Assigned':
                return (
                    <>
                        <Label icon={<WarningIcon />} text="Candidate’s portfolio has not yet been assigned to a reviewer."></Label>
                    </>
                )

            case "Under Review":
                return (
                    <>
                    <Label text="Portfolio is currently under review by the design reviewer"></Label>
                    </>
                )


            case 'Reviewed':
                return (
                    <>
                        <div className='w-full '>
                           
                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                <p className='typography-small-p text-font-gray'>Remarks</p>
                                <p className='typography-body pb-8'>{score.remark}</p>
                                </div>

                                <div>
                                    <div>
                                        <p className='typography-small-p text-font-gray block'>Total Score:</p>
                                        <div className='flex '>
                                            <p className='display-d2 font-bold'>{score.totalScore}</p>
                                            <p className='typography-small-p text-font-gray pt-6 ml-2 w-[70px] '>Out Of 5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                );
            case 'Cleared':
                return (
                    <>
                        <div className=' flex justify-between w-full '>
                            <div>

                                <p className='typography-small-p text-font-gray'>Remarks</p>
                                <p className='typography-body pb-8'>{score.remark}</p>
                            </div>
                            <div className='flex justify-between gap-4'>
                                <div>
                                    <div>
                                        <p className='typography-small-p text-font-gray block'>Total Score:</p>
                                        <div className='flex '>
                                            <p className='display-d2 font-bold'>{score.totalScore}</p>
                                            <p className='typography-small-p text-font-gray pt-6 ml-2 w-[70px] '>Out Of 5</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                );
            case 'No Show':
                return <Label icon={<WarningIcon />} text="Candidate did not show up for the call" />;
            case 'Rejected':
                return (
                    <>
                        <div className='w-full '>
                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Reason for rejection</p>
                                    <p className='typography-body'>{rejectionReason}</p>
                                </div>
                                <div>
                                    <div>
                                        <p className='typography-small-p text-font-gray block'>Total Score:</p>
                                        <div className='flex '>
                                            <p className='display-d2 font-bold'>{totalScore}</p>
                                            <p className='typography-small-p text-font-gray pt-6 ml-2 w-[70px] '>Out Of 30</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };


    const renderFooter = () => {
        const { status } = candidateData.stageStatus.Portfolio;

        const commonFooterContent = (
            <div>
                <p className='text-white'>Received On</p>
                <p className='typography-h3 text-white'> {new Date(candidateData.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                </p>
                {/* {candidateData.createdAt} */}
            </div>
        );

        switch (status) {
            case "Not Assigned":
                return (
                    <>
                        {commonFooterContent}
                        <div className='w-[160px]'>

                        <Button variant="primary" onClick={() => setOpenAssigneeModal(!openAssigneeModal)}>Assign Portfolio</Button>
                        </div>
                    </>
                )
            case 'Call Scheduled':
                return (
                    <>
                        {commonFooterContent}
                        <div>

                            <div className='flex gap-2'>

                                <>
                                    <Button variant="cancel">No Show</Button>
                                </>

                            </div>

                        </div>
                    </>
                );
            case 'Call Pending':
                return (
                    <>
                        {commonFooterContent}

                    </>
                );
            case 'Under Review':
                return (
                    <>
                        {commonFooterContent}

                    </>
                );
            case 'Reviewed':
                return (
                    <>
                        {commonFooterContent}
                        <div className='flex gap-6'>
                            <div className='w-[236px]'>
                                <Button variant="cancel" onClick={() => setIsModalOpen(true)}>Reject</Button>
                            </div>
                            <div className='w-[236px]'>
                                <Button variant="primary" onClick={onNext}>Move To Next Round</Button>
                            </div>
                        </div>
                    </>
                );
            default:
                return commonFooterContent;
        }
    };


    return (
        <div className='w-full bg-background-100 rounded-xl' >

            {/* first layer */}
            <div >
                <div className='flex items-center justify-between rounded-xl  bg-background-90 p-4'>
                    <h1 className='typography-h3 text-white'>Portfolio</h1>
                    <div className='flex items-center gap-4'>
                        <StatusBadge status={candidateData.stageStatus.Portfolio.status} />

                        <AssigneeSelector
                            mode="icon"
                            value={selectedAssignee}
                            onChange={(newAssignee) => handleAssigneeUpdate([newAssignee])}
                            onSelect={(newAssignee) => handleAssigneeUpdate([newAssignee])}
                        />

                        <div className='h-8 w-1 rounded bg-background-70'></div>

                        <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
                            <PortfolioIcon />
                        </div>
                        <a className='typography-body text-font-primary underline flex gap-2' href={candidateData.portfolio}>View Portfolio
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#045FFD" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>

                    </div>
                </div>
            </div>


            {/* middle layer */}
            <div className='m-4'>
                {renderStatusLabel()}
            </div>
            

            {/* third layer */}
            <div className='flex justify-between bg-background-90'>
                <div className='flex justify-between rounded-xl bg-background-90 w-full p-6'>
                    {renderFooter()}
                </div>
            </div>

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