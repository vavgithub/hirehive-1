import React, { useCallback, useEffect, useState } from 'react'
import InputPopUpModalAutoSelect from '../InputPopUpModalAutoSelect'
import { Button } from '../ui/Button'
import BasicSelect from '../BasicSelect';
import Label from '../ui/Label';
import ArrowIcon from '../../svg/ArrowIcon';
import WarningIcon from '../../svg/Staging/WarningIcon';
import DatePicker from '../utility/Datepicker';
import TimePicker from '../utility/Timepicker';
import axios from 'axios';
import AssigneeSelector from '../utility/AssigneeSelector';
import ClockIcon from '../../svg/Staging/ClockIcon';
import CalenderIcon from '../../svg/Staging/CalenderIcon';
import LinkIcon from '../../svg/Staging/LinkIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon';
import StatusBadge from '../ui/StatusBadge';
import BudgetIcon from '../../svg/Staging/BudgetIcon';
import BulletMarks from '../ui/BulletMarks';
import Scorer from '../ui/Scorer';
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



const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr}${ampm}`;
};


const ScreeningStage = ({ candidateData: initialCandidateData, onStatusUpdate, onReject, onNext }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateData);
    
    const [selectedAssignee, setSelectedAssignee] = useState(
        candidateData.stageStatus.Screening.assignee
        ? { name: candidateData.stageStatus.Screening.assignee }
            : null
        );
        const [selectedDate, setSelectedDate] = useState(null);
        const [selectedTime, setSelectedTime] = useState(null);
        const [meetLink, setMeetLink] = useState(null);
        
        const [isRescheduling, setIsRescheduling] = useState(false);
        
        const [budgetScore, setBudgetScore] = useState(null);
        const [totalScore, setTotalScore] = useState(0);
        
        const [rejectValue, setRejectValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReschedule = () => {
        setIsRescheduling(true);
    };
    
    const handleCancelReschedule = () => {
        setIsRescheduling(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setMeetLink(null);
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

    const [isCallPassed, setIsCallPassed] = useState(false);


   const checkCallTime = useCallback(() => {
    if (candidateData.stageStatus.Screening.status === 'Call Scheduled') {
        const currentCall = candidateData.stageStatus.Screening.currentCall;
        
        if (!currentCall.scheduledDate || !currentCall.scheduledTime) {
            console.error('Invalid scheduledDate or scheduledTime');
            return false;
        }
        
        try {
            // Extract the date portion from scheduledDate
            const scheduledDate = currentCall.scheduledDate.split('T')[0];

            // Extract the time portion from scheduledTime, ensuring it's in the correct format
            const scheduledTime = currentCall.scheduledTime.split('T')[1];

            // Combine date and time into a single UTC datetime string
            const combinedDateTimeString = `${scheduledDate}T${scheduledTime}`;
            const combinedDateTimeUTC = new Date(combinedDateTimeString);

            // Check if the combinedDateTimeUTC is a valid date
            if (isNaN(combinedDateTimeUTC)) {
                console.error('Invalid combined datetime');
                return false;
            }

            // Convert to local time (IST)
            const callDateTimeLocal = new Date(combinedDateTimeUTC.getTime() + (5.5 * 60 * 60 * 1000));

            // Get current time in UTC and convert to local time (IST)
            const nowUTC = new Date();
            const nowLocal = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000));
            const hasCallPassed = nowLocal > callDateTimeLocal;

            console.log('Current time in IST:', nowLocal.toISOString());
            console.log('Scheduled call time in IST:', callDateTimeLocal.toISOString());
            console.log('Has call passed:', hasCallPassed);

            setIsCallPassed(hasCallPassed);
            return hasCallPassed;
        } catch (error) {
            console.error('Error parsing date or time:', error);
            setIsCallPassed(false);
            return false;
        }
    }
    return false;
}, [candidateData]);


    useEffect(() => {
        if (isCallPassed) {
            return; // Don't set up the interval if the call has already passed
        }

        const initialCheck = checkCallTime();
        if (initialCheck) {
            return; // Don't set up the interval if the initial check shows the call has passed
        }

        const timer = setInterval(() => {
            const hasCallPassed = checkCallTime();
            if (hasCallPassed) {
                clearInterval(timer);
            }
        }, 1000); // Check every minute

        return () => clearInterval(timer);
    }, [checkCallTime, isCallPassed]);

    useEffect(() => {
        const scoreValues = Object.values(candidateData.stageStatus.Screening.score.totalScore).filter(value => value !== null);
        const sum = scoreValues.reduce((acc, value) => acc + value, 0);
        if (budgetScore !== null) {
            setTotalScore(sum + budgetScore);
        } else {
            setTotalScore(sum);
        }
    }, [candidateData, budgetScore]);

    const handleNext = async () => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
                        ...candidateData.stageStatus.Screening,
                        status: 'Under Review',
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Screening: {
                            ...prevData.stageStatus.Screening,
                            status: 'Under Review',
                        }
                    }
                }));
                console.log("Status changed to Under Review");
                // Optionally, you can call onStatusUpdate here if you need to inform the parent component
                // onStatusUpdate('Screening', 'Under Review');
            }
        } catch (error) {
            console.error('Error updating candidate status:', error);
            alert('Failed to update candidate status. Please try again.');
        }
    };


    // useEffect(() => {
    //     if (candidateData.stageStatus.Screening.status === 'Call Scheduled') {
    //         setSelectedDate(new Date(candidateData.stageStatus.Screening.scheduledDate));
    //         setSelectedTime(candidateData.stageStatus.Screening.scheduledTime);
    //     }
    // }, [candidateData]);

    const handleDateChange = (date) => {
        // const localDate = new Date(date);
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        // Convert the time to local timezone
        // const localTime = new Date(time);
        setSelectedTime(time);
    };

    const handleMeetChange = (e) => {
        setMeetLink(e.target.value)
    }

    const handleAssigneeSelect = (assignee) => {
        handleAssigneeUpdate(assignee);
    };

    const isUpdateDisabled = !selectedDate || !selectedTime || !selectedAssignee || !meetLink;

    const handleAssigneeUpdate = async (newAssignee) => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
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
                        Screening: {
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

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
                        ...candidateData.stageStatus.Screening,
                        status: 'Call Scheduled',
                        assignee: selectedAssignee ? selectedAssignee.name : null,
                        currentCall: {
                            scheduledDate: selectedDate.toISOString(),
                            scheduledTime: selectedTime.toISOString(),
                            meetingLink: meetLink
                        },
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Screening: {
                            ...prevData.stageStatus.Screening,
                            status: 'Call Scheduled',
                            assignee: selectedAssignee ? selectedAssignee.name : null,
                            currentCall: {
                                scheduledDate: selectedDate,
                                scheduledTime: selectedTime,
                                meetingLink: meetLink
                            },
                        }
                    }
                }));
                alert('Call scheduled successfully!');
            }
        } catch (error) {
            console.error('Error updating candidate:', error);
            alert('Failed to schedule the call. Please try again.');
        }
    };

    const handleConfirmForReject = async () =>{
        return "heyyyyyyyyyy";
    }


    const handleUpdateReschedule = async () => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
                        ...candidateData.stageStatus.Screening,
                        currentCall: {
                            scheduledDate: selectedDate,
                            scheduledTime: selectedTime,
                            meetingLink: meetLink
                        },
                        callHistory: [
                            ...candidateData.stageStatus.Screening.callHistory,
                            {
                                ...candidateData.stageStatus.Screening.currentCall,
                                status: 'Rescheduled'
                            }
                        ]
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(response.data);
                setIsRescheduling(false);
                alert('Call rescheduled successfully!');
            }
        } catch (error) {
            console.error('Error rescheduling call:', error);
            alert('Failed to reschedule the call. Please try again.');
        }
    };

    const handleBudgetScoreUpdate = async () => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${candidateData._id}`, {
                stageStatus: {
                    ...candidateData.stageStatus,
                    Screening: {
                        ...candidateData.stageStatus.Screening,
                        status: 'Reviewed',
                        score: {
                            ...candidateData.stageStatus.Screening.score,
                            totalScore: {
                                ...candidateData.stageStatus.Screening.score.totalScore,
                                Budget: budgetScore
                            }
                        }
                    }
                }
            });

            if (response.status === 200) {
                setCandidateData(prevData => ({
                    ...prevData,
                    stageStatus: {
                        ...prevData.stageStatus,
                        Screening: {
                            ...prevData.stageStatus.Screening,
                            status: 'Reviewed',
                            score: {
                                ...prevData.stageStatus.Screening.score,
                                totalScore: {
                                    ...prevData.stageStatus.Screening.score.totalScore,
                                    Budget: budgetScore
                                }
                            }
                        }
                    }
                }));
                setBudgetScore(budgetScore);
            }
        } catch (error) {
            console.error('Error updating budget score:', error);
            alert('Failed to update budget score. Please try again.');
        }
    };


    const renderStatusLabel = () => {
        // const { status, scheduledDate, scheduledTime, meetingLink } = candidateData.stageStatus.Screening;
        const { status, currentCall, callHistory, score , rejectionReason } = candidateData.stageStatus.Screening;
        const hasScore = Object.values(score.totalScore).some(value => value !== null);
        const categories = [
            { label: 'Attitude', value: score.totalScore.Attitude },
            { label: 'UX', value: score.totalScore.UX },
            { label: 'Tech', value: score.totalScore.Tech },
            { label: 'Communication', value: score.totalScore.Communication },
            { label: 'UI', value: score.totalScore.UI },
        ];

        switch (status) {
            case 'Call Pending':
                return (
                    <>
                        <Label
                            icon={<WarningIcon />}
                            text="Call not scheduled. Please contact the candidate to schedule the screening call and update the details below"
                        />
                        <div className='grid grid-cols-3 gap-6'>
                            <div className='flex flex-col'>
                                <span>Date</span>
                                <DatePicker onChange={handleDateChange} value={selectedDate} />

                            </div>

                            <div className='flex flex-col'>
                                <span>Time</span>
                                <TimePicker onChange={handleTimeChange} value={selectedTime} />

                            </div>
                            <div className=' flex flex-col'>
                                <span>Reviewer</span>
                                <AssigneeSelector
                                    mode="input"
                                    value={selectedAssignee}
                                    onChange={handleAssigneeSelect}
                                    onSelect={handleAssigneeSelect}
                                />
                            </div>

                            <div className=' flex flex-col  col-span-2'>
                                <span>Meeting Link</span>
                                <input type="text" placeholder='Enter Meeting Link' className='outline-none' value={meetLink} onChange={(e) => handleMeetChange(e)} />
                            </div>
                        </div>
                    </>
                );
            case 'Call Scheduled':
                return (
                    <>
                        <p className='typography-large-p text-font-gray pb-8'>
                            The screening call has been scheduled. You can reschedule or cancel the call if needed.
                        </p>
                        <div className='bg-background-80 grid grid-cols-3 rounded-xl p-4'>
                            {/* ... existing scheduled call details ... */}
                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Date</span>
                                <div className='flex items-center gap-2'>
                                    <CalenderIcon />
                                    <h2>
                                        {new Date(currentCall.scheduledDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                    </h2>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Time</span>
                                <div className='flex items-center gap-2'>
                                    <ClockIcon />
                                    <h2>
                                        {formatTime(currentCall.scheduledTime)}
                                    </h2>
                                </div>
                            </div>

                            <div className='flex flex-col '>
                                <span className='typography-small-p text-font-gray'>Meeting Link</span>
                                <div className='flex items-center gap-2'>
                                    <LinkIcon />
                                    <h2 className='mr-2 text-font-primary'>screening_meeting_link</h2>
                                    <CopyToClipboard text={currentCall.meetingLink}>
                                        <button className='flex items-center bg-background-70 px-[10px] py-[10px] rounded-xl'>
                                            <ClipboardIcon />
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                        {isRescheduling && (
                            <div className='mt-4 grid grid-cols-3 gap-6'>
                                <div className='flex flex-col'>
                                    <span>New Date</span>
                                    <DatePicker onChange={handleDateChange} value={selectedDate} />
                                </div>
                                <div className='flex flex-col'>
                                    <span>New Time</span>
                                    <TimePicker onChange={handleTimeChange} value={selectedTime} />
                                </div>
                                <div className='flex flex-col'>
                                    <span>New Meeting Link</span>
                                    <input
                                        type="text"
                                        placeholder='Enter Meeting Link'
                                        className='outline-none'
                                        value={meetLink}
                                        onChange={(e) => handleMeetChange(e)}
                                    />
                                </div>
                            </div>
                        )}
                        {callHistory.length > 0 && (
                            <div className='mt-4'>
                                <h3>Previous Schedules:</h3>
                                {callHistory.map((call, index) => (
                                    <div key={index}>
                                        <p>{new Date(call.scheduledDate).toLocaleDateString()} at {formatTime(call.scheduledTime)} - {call.status}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            case 'Under Review':

                return (
                    <>
                        {/* <Label text="Screening call is currently under review by the design reviewer" /> */}


                        <div className='flex  '>

                            {hasScore ? (
                                <div className='w-full '>
                                    <p className='typography-small-p text-font-gray'>Remarks</p>
                                    <p className='typography-body pb-8'>{score.remark}</p>
                                    <div className='flex justify-between gap-4'>
                                        <div className='w-full'>
                                            <p className='typography-small-p text-font-gray'>Score</p>



                                            <div className='grid grid-cols-3 grid-rows-2 rounded-xl gap-x-14 gap-y-4 p-4 bg-background-80 w-full'>
                                                {categories.map((category, index) => (
                                                    <div key={index} className='flex items-center justify-between'>
                                                        <span className='typography-small-p text-font-gray'>{category.label}</span>
                                                        <BulletMarks marks={category.value} />
                                                    </div>
                                                ))}
                                                {score.totalScore.Budget !== null && (
                                                    <div className='flex items-center w-48 justify-between'>
                                                        <span className='typography-small-p text-font-gray'>Budget</span>
                                                        <BulletMarks marks={score.totalScore.Budget} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>

                                            <div>



                                                <p className='typography-small-p text-font-gray'>Score Budget</p>
                                                <Scorer onScoreChange={setBudgetScore} />
                                            </div>

                                            <div className='flex flex-row-reverse'>
                                                <p className='text-font-gray typography-small-p'>Total Score: {totalScore}</p>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className='typography-small-p text-font-gray'>Screening call is currently under review by the design reviewer</p>
                                </div>
                            )}



                        </div>
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
                                        {categories.map((category, index) => (
                                            <div key={index} className='flex items-center justify-between'>
                                                <span className='typography-small-p text-font-gray'>{category.label}</span>
                                                <BulletMarks marks={category.value} />
                                            </div>
                                        ))}
                                        {score.totalScore.Budget !== null && (
                                            <div className='flex items-center justify-between'>
                                                <span className='typography-small-p text-font-gray'>Budget</span>
                                                <BulletMarks marks={score.totalScore.Budget} />
                                            </div>
                                        )}
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
                                <div className='grid grid-cols-3 grid-rows-2 rounded-xl gap-x-14 gap-y-4 p-4 bg-background-80 w-full'>
                                    {categories.map((category, index) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <span className='typography-small-p text-font-gray'>{category.label}</span>
                                            <BulletMarks marks={category.value} />
                                        </div>
                                    ))}
                                    {score.totalScore.Budget !== null && (
                                        <div className='flex items-center justify-between'>
                                            <span className='typography-small-p text-font-gray'>Budget</span>
                                            <BulletMarks marks={score.totalScore.Budget} />
                                        </div>
                                    )}
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
                                        <Button variant="icon" onClick={handleNext}></Button>
                                        // <Button variant="primary" >Next</Button>
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
        <div className='w-full bg-background-100 rounded-xl'>

            {/* first layer */}
            <div >
                <div className='flex items-center justify-between rounded-xl  bg-background-90 p-4'>
                    <h1 className='typography-h3 text-white'>Screening</h1>
                    <div className='flex items-center gap-4'>
                        <StatusBadge status={candidateData.stageStatus.Screening.status} />


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
            <div className='m-4'>
                {renderStatusLabel()}
            </div>


            {/* this is the third laye the footer */}
            <div className='flex justify-between rounded-xl bg-background-90 p-6'>
            {renderFooter()}

                {/* <div>
                    <p className='text-white'>Received On</p>
                    <p className='typography-h3 text-white'>
                        {candidateData.createdAt}
                    </p>

                </div>

                <div>
                    {candidateData.stageStatus.Screening.status === "Call Scheduled" && !isRescheduling && (
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
                    {isRescheduling && (
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
                    )}
                    {candidateData.stageStatus.Screening.status === "Call Pending" && (
                        <Button
                            variant="primary"
                            disabled={isUpdateDisabled}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    )}
                    {candidateData.stageStatus.Screening.status === "Under Review" && (
                        <Button
                            variant="icon"
                            disabled={budgetScore === null}
                            onClick={handleBudgetScoreUpdate}
                        >
                            Update
                        </Button>
                    )}

                    {
                        candidateData.stageStatus.Screening.status === "Reviewed" && (
                            <div className='flex gap-6'>
                                <div className='w-[236px]'>
                                    <Button variant="cancel"  onClick={() => setIsModalOpen(true)}  >Reject</Button>
                                    {/* <Button variant="cancel"  onClick={onReject}  >Reject</Button> */}
                                {/* </div>
                                <div className='w-[236px]'>
                                    <Button variant="primary" onClick={onNext}>Move To Next Round</Button>
                                </div>
                            </div>
                      */}
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
        </div>
    )
}

export default ScreeningStage