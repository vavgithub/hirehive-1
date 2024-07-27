import React, { useState } from 'react'
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect'
import { Button } from '../ui/Button'
import BasicSelect from '../BasicSelect';
import Label from '../ui/Label';
import ArrowIcon from '../../svg/ArrowIcon';
import WarningIcon from '../../svg/Staging/WarningIcon';
import DatePicker from '../utility/Datepicker';
import TimePicker from '../utility/Timepicker';

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


const ScreeningStage = ({ candidateData, assignee, onAssigneeChange, allAssignees, onStatusUpdate, onReject, onNext }) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const isUpdateDisabled = !selectedDate || !selectedTime;

    const handleUpdate = () => {
        // Implement your update logic here
        console.log("Updating with date:", selectedDate, "and time:", selectedTime);
        // You might want to call onStatusUpdate or make an API call here
    };

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
            <div>
                <div className='flex justify-between bg-background-90'>
                    <h1 className='typography-h3 text-white'>Screening</h1>
                    <div className='flex gap-5'>

                        || {candidateData.stageStatus.Screening}  ||
                        || {candidateData.assignees.Screening}   ||
                        || {candidateData.budget}LPA ||
                    </div>
                </div>
                {/* <div className='flex gap-4' >

            <div>
                <ProgressIndicator stage="Portfolio" status={candidateData.status} />
            </div>

        </div> */}
            </div>



            <div className='m-8'>

                {candidateData.stageStatus.Screening == "Not Assigned" &&

                    <p className='bg-background-80 inline' > This candidate's portfolio has not yet been assigned to a reviewer.</p>
                }

                {candidateData.stageStatus.Screening == "Under Review" &&
                    <p className='bg-background-80 inline'>The portfolio is now being reviewed by the assigned reviewer..</p>
                }

            </div>



            {/* middle layer */}
            <div className='flex' >

                <div className='m-4'>
                    {candidateData.stageStatus.Screening == "Call Pending" &&
                        <Label icon={<WarningIcon />} text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below" />

                        // <p className='bg-background-80 inline' > This candidate's portfolio has not yet been assigned to a reviewer.</p>
                    }
                    <div className='flex gap-4'>

                    <DatePicker onChange={handleDateChange} />
                    <TimePicker onChange={handleTimeChange} />

                    </div>

                    <div >
                        <p className='typography-large-p'>
                            Meeting Link
                        </p>

                        <input></input>
                    </div>

                    {candidateData.stageStatus.Portfolio == "Under Review" &&
                        <p className='bg-background-80 inline'>The portfolio is now being reviewed by the assigned reviewer..</p>
                    }
                </div>

                {/* <div className='w-8 ml-[85%]'>
            {
                candidateData.assignees.Screening === "Bob" &&
                <BasicSelect
                    label="Assignee"
                    value={assignee}
                    onChange={onAssigneeChange}
                    list={allAssignees}
                />
            }

            {
                candidateData.assignees.Screening === "Bob" &&
                <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpenPortfolio(!isModalOpenPortfolio)}>Assign Portfolio</button>            
            }

        </div> */}
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
                    {/* {
                candidateData.status == "Not Assigned" ? <Button variant="secondary"
                    onClick={() => setOpenAssigneeModal(true)}
                    className="mb-4 px-4 py-2 bg-black text-white rounded "
                >
                    Assign Multiple Candidates
                </Button> : (
                    <div className='flex gap-6'>
                        <div className='w-[236px]'>
                            <Button variant="cancel" onClick={onReject}> Reject </Button>
                        </div>
                        <div className='w-[236px]'>
                            <Button variant="secondary" onClick={onNext}> Move To Next Round </Button>
                        </div>
                    </div>
                )
            } */}
                    {
                        candidateData.stageStatus.Screening == "Call Pending" &&
                        <Button variant="primary"   disabled={isUpdateDisabled}     onClick={handleUpdate}>Update</Button>
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

export default ScreeningStage