import React, { useEffect, useState } from 'react'
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect'
import { Button } from '../ui/Button'
import BasicSelect from '../BasicSelect';
import Label from '../ui/Label';
import ArrowIcon from '../../svg/ArrowIcon';
import WarningIcon from '../../svg/Staging/WarningIcon';
import DatePicker from '../utility/Datepicker';
import TimePicker from '../utility/Timepicker';
import axios from 'axios';

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


const ScreeningStage = ({ candidateData: initialCandidateData, onStatusUpdate }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateData);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // useEffect(() => {
    //     if (candidateData.stageStatus.Screening.status === 'Call Scheduled') {
    //         setSelectedDate(new Date(candidateData.stageStatus.Screening.scheduledDate));
    //         setSelectedTime(candidateData.stageStatus.Screening.scheduledTime);
    //     }
    // }, [candidateData]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const isUpdateDisabled = !selectedDate || !selectedTime;

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
                        status: 'Call Scheduled',
                        scheduledDate: selectedDate,
                        scheduledTime: selectedTime
                    }
                }
            });

            if (response.status === 200) {
                // Update local state to reflect the changes
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Screening: {
                            status: 'Call Scheduled',
                            scheduledDate: selectedDate,
                            scheduledTime: selectedTime
                        }
                    }
                }));

                // Optionally, show a success message to the user
                alert('Call scheduled successfully!');
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
            // Optionally, show an error message to the user
            alert('Failed to schedule the call. Please try again.');
        }
    };

    const renderStatusLabel = () => {
        const { status, scheduledDate, scheduledTime } = candidateData.stageStatus.Screening;

        switch (status) {
            case 'Call Pending':
                return (
                    <>
                        <Label
                            icon={<WarningIcon />}
                            text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below"
                        />
                        <div className='flex gap-4'>
                            <DatePicker onChange={handleDateChange} value={selectedDate} />
                            <TimePicker onChange={handleTimeChange} value={selectedTime} />
                        </div>
                    </>
                );
            case 'Call Scheduled':
                return (
                    <Label
                        text={`Call scheduled for ${new Date(scheduledDate).toLocaleDateString()} at ${scheduledTime}`}
                    />
                );
            case 'Under Review':
                return <Label text="Candidate is under review" />;
            case 'Reviewed':
                return <Label text="Candidate has been reviewed" />;
            case 'Cleared':
                return <Label text="Candidate has cleared this stage" />;
            case 'No Show':
                return <Label icon={<WarningIcon />} text="Candidate did not show up for the call" />;
            case 'Rejected':
                return <Label text="Candidate has been rejected at this stage" />;
            default:
                return null;
        }
    };

    return (
        <div className='w-full bg-background-100'>

            {/* first layer */}
            <div  >
                <div className='flex justify-between bg-background-90'>
                    <h1 className='typography-h3 text-white'>Portfolio</h1>
                    <div className='flex text-white'>

                        {candidateData.stageStatus.Screening.status}
                        {candidateData.assignees.Screening}
                        {candidateData.budget}LPA
                    </div>
                </div>
                {/* <div className='flex gap-4' >

                    <div>
                        <ProgressIndicator stage="Portfolio" status={candidateData.status} />
                    </div>
    
                </div> */}
            </div>

            <div className='m-4'>
                {renderStatusLabel()}


                <div className='flex justify-end mt-4'>
                    <Button
                        variant="primary"
                        disabled={isUpdateDisabled}
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ScreeningStage