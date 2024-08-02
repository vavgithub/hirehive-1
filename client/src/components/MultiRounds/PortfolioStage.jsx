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

    const renderStatusLabel = () => {
    // const { status,score } = candidateData.stageStatus.Screening;
        const { status , score} = candidateData.stageStatus.Portfolio;
        // const hasScore = Object.values(score.totalScore).some(value => value !== null);
        const categories = [
            { label: 'Attitude', value: score.totalScore.Attitude },
            { label: 'UX', value: score.totalScore.UX },
            { label: 'Tech', value: score.totalScore.Tech },
            { label: 'Communication', value: score.totalScore.Communication },
            { label: 'UI', value: score.totalScore.UI },
        ];

        switch (status) {
       

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
                        <div className='w-full '>
                            <p className='typography-small-p text-font-gray'>Remarks</p>
                            <p className='typography-body pb-8'>{score.remark}</p>
                            <div className='flex justify-between gap-4'>
                                <div className='w-full'>
                                    <p className='typography-small-p text-font-gray'>Score</p>

                                </div>
                                <div>
                                    <div>
                                        <p className='typography-small-p text-font-gray block'>Total Score:</p>
                                        <div className='flex '>
                                            <p className='display-d2 font-bold'>{""}</p>
                                            <p className='typography-small-p text-font-gray pt-6 ml-2 w-[70px] '>Out Of 30</p>
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
        const { status } = candidateData.stageStatus.Screening;

        const commonFooterContent = (
            <div>
                <p className='text-white'>Received On</p>
                <p className='typography-h3 text-white'>{candidateData.createdAt}</p>
            </div>
        );

        switch (status) {
            case 'Call Scheduled':
                return (
                    <>
                        {commonFooterContent}
                        <div>
                            {isRescheduling ? (
                                <div className='flex gap-2'>
                                    <Button
                                        variant="primary"
                                        disabled={!selectedDate || !selectedTime || !meetLink}
                                        onClick={handleUpdateReschedule}
                                    >
                                        Update
                                    </Button>
                                    <Button variant="secondary" onClick={handleCancelReschedule}>Cancel</Button>
                                </div>
                            ) : (
                                <div className='flex gap-2'>
                                    {isCallPassed ? (
                                        <Button variant="primary" onClick={handleNext}>Next</Button>
                                    ) : (
                                        <>
                                            <Button variant="cancel">No Show</Button>
                                            <Button variant="primary" onClick={handleReschedule}>Reschedule Call</Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'Call Pending':
                return (
                    <>
                        {commonFooterContent}
                        <Button
                            variant="primary"
                            disabled={!selectedDate || !selectedTime || !selectedAssignee || !meetLink}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </>
                );
            case 'Under Review':
                return (
                    <>
                        {commonFooterContent}
                        <Button
                            variant="icon"
                            disabled={budgetScore === null}
                            onClick={handleBudgetScoreUpdate}
                        >
                            Update
                        </Button>
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

              

                <div className='flex justify-between rounded-xl bg-background-90 p-6'>
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