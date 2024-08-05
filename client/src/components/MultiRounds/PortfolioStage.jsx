import React, { useEffect, useState } from 'react'
import BasicSelect from '../BasicSelect';
import ProgressIndicator from '../ProgressIndicator';
import { Button } from '../ui/Button';
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect';
import FileSaver from 'file-saver';
import axios from 'axios';
import Label from '../ui/Label';
import StatusBadge from '../ui/StatusBadge';
import AssigneeSelector from '../utility/AssigneeSelector';
import BudgetIcon from '../../svg/Staging/BudgetIcon';
import PortfolioIcon from '../../svg/PortfolioIcon';
import WarningIcon from '../../svg/Staging/WarningIcon';

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




const PortfolioStage = ({ candidateData:initialCandidateData, assignee, onAssigneeChange, allAssignees, onStatusUpdate, onReject, onNext }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateData);
    const { handleReject, isRejecting } = useHandleReject(candidateData, onStatusUpdate);

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

    const handleMultipleAssigneeChange = async () => {
        return (
            console.log("Hello Saaab")
        )
    };

    const handleAssigneeSelect = (assignee) => {
        handleAssigneeUpdate(assignee);
    };

    useEffect(() => {
        setCandidateData(initialCandidateData);
    }, [initialCandidateData]);

    const handleAssigneeUpdate = async (newAssignee) => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Portfolio: {
                        ...candidateData.stageStatus.Screening,
                        assignee: newAssignee ? newAssignee.name : null
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Portfolio: {
                            ...prevData.stageStatus.Screening,
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


    if (!candidateData || !candidateData.stageStatus || !candidateData.stageStatus.Portfolio) {
        return <div>Loading...</div>; // Or some other loading indicator
    }



    const renderStatusLabel = () => {
        // const { status,score } = candidateData.stageStatus.Screening;
        const { status, score } = candidateData.stageStatus.Portfolio;
        // const hasScore = Object.values(score.totalScore).some(value => value !== null);


        switch (status) {

            case 'Not Assigned':
                return (
                    <>
                    <Label   icon={<WarningIcon />} text="Candidate’s portfolio has not yet been assigned to a reviewer."></Label>
                    </>
                )


            case 'Reviewed':
                return (
                    <>
                        <div className='w-full '>
                            <p className='typography-small-p text-font-gray'>Remarks</p>
                            <p className='typography-body pb-8'>{score.remark}</p>
                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Score</p>
                                    <div className='grid grid-cols-3 grid-rows-2 rounded-xl gap-x-14 gap-y-4 p-4 bg-background-80 w-full'>

                                    </div>
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
                <p className='typography-h3 text-white'>{candidateData.createdAt}</p>
            </div>
        );

        switch (status) {
            case "Not Assigned":
                return(
                    <>
                     {commonFooterContent}
                     <button className=" text-white px-4 py-2 rounded" onClick={() => setOpenAssigneeModal(!openAssigneeModal)}>Assign Portfolio</button>
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
                        {/* <Button
                            variant="primary"
                            disabled={!selectedDate || !selectedTime || !selectedAssignee || !meetLink}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button> */}
                    </>
                );
            case 'Under Review':
                return (
                    <>
                        {commonFooterContent}
                        {/* <Button
                            variant="icon"
                            disabled={budgetScore === null}
                            onClick={handleBudgetScoreUpdate}
                        >
                            Update
                        </Button> */}
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
                            onChange={handleAssigneeSelect}
                            onSelect={handleAssigneeSelect}
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

            <div className='m-8'>

                <div className='m-4'>
                    {renderStatusLabel()}
                </div>

            </div>




            {/* third layer */}
            <div className='flex justify-between bg-background-90'>

                {/* <div>
                    <p className='text-white'>Received On</p>
                    <p className='typography-h3 text-white'>
                        {candidateData.createdAt}
                    </p>

                </div> */}



                <div className='flex justify-between rounded-xl bg-background-90 w-full p-6'>
                    {renderFooter()}
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