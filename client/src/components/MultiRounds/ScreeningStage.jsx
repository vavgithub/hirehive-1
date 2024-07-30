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
import AssigneeSelector from '../utility/AssigneeSelector';
import ClockIcon from '../../svg/Staging/ClockIcon';
import CalenderIcon from '../../svg/Staging/CalenderIcon';
import LinkIcon from '../../svg/Staging/LinkIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClipboardIcon from '../../svg/Staging/ClipboardIcon';
import StatusBadge from '../ui/StatusBadge';

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


const ScreeningStage = ({ candidateData: initialCandidateData, onStatusUpdate }) => {
    const [candidateData, setCandidateData] = useState(initialCandidateData);
    const [isCallPassed, setIsCallPassed] = useState(false);

    const [selectedAssignee, setSelectedAssignee] = useState(
        candidateData.stageStatus.Screening.assignee
            ? { name: candidateData.stageStatus.Screening.assignee }
            : null
    );
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [meetLink, setMeetLink] = useState(null);

    const [isRescheduling, setIsRescheduling] = useState(false);

    const handleReschedule = () => {
        setIsRescheduling(true);
      };

      const handleCancelReschedule = () => {
        setIsRescheduling(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setMeetLink(null);
      };  

      useEffect(() => {
        const checkCallTime = () => {
            if (candidateData.stageStatus.Screening.status === 'Call Scheduled') {
                const currentCall = candidateData.stageStatus.Screening.currentCall;
                
                if (!currentCall.scheduledDate || !currentCall.scheduledTime) {
                    console.error('Invalid scheduledDate or scheduledTime');
                    return;
                }

                try {
                    // Parse the scheduled date and time
                    const scheduledDate = new Date(currentCall.scheduledDate);
                    const scheduledTime = new Date(currentCall.scheduledTime);

                    // Create a new Date object using UTC values
                    const callDateTime = new Date(Date.UTC(
                        scheduledDate.getUTCFullYear(),
                        scheduledDate.getUTCMonth(),
                        scheduledDate.getUTCDate(),
                        scheduledTime.getUTCHours(),
                        scheduledTime.getUTCMinutes(),
                        0  // seconds
                    ));

                    const now = new Date();

                    // Compare the combined date-time with current time
                    const hasCallPassed = now > callDateTime;
                    setIsCallPassed(hasCallPassed);

                    console.log('Current time:', now.toISOString());
                    console.log('Scheduled call time:', callDateTime.toISOString());
                    console.log('Has call passed:', hasCallPassed);
                } catch (error) {
                    console.error('Error parsing date or time:', error);
                    setIsCallPassed(false); // Default to not passed if there's an error
                }
            }
        };

        checkCallTime();
        const timer = setInterval(checkCallTime, 60000); // Check every minute

        return () => clearInterval(timer);
    }, [candidateData]);


    const handleNext = ()=>{
        console.log("heheehe");
    }


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
                            scheduledDate: selectedDate,
                            scheduledTime: selectedTime,
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

    const renderStatusLabel = () => {
        // const { status, scheduledDate, scheduledTime, meetingLink } = candidateData.stageStatus.Screening;
        const { status, currentCall, callHistory } = candidateData.stageStatus.Screening;

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
                                        {new Date(currentCall.scheduledDate).toLocaleDateString()}
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
            <div className='m-6' >
                <div className='flex justify-between bg-background-90'>
                    <h1 className='typography-h3 text-white'>Screening</h1>
                    <div className='flex text-white '>
                    <StatusBadge status={candidateData.stageStatus.Screening.status} />

                        
                        <AssigneeSelector
                            mode="icon"
                            value={selectedAssignee}
                            onChange={handleAssigneeSelect}
                            onSelect={handleAssigneeSelect}
                        />
                        ${candidateData.stageStatus.Screening.assignee}
                        {candidateData.budget}LPA
                    </div>
                </div>
            </div>


            {/* this is the middle layer */}
            <div className='m-4'>
                {renderStatusLabel()}
            </div>


            {/* this is the third laye the footer */}
            <div className='flex justify-between bg-background-90 p-6'>

                <div>
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



                </div>
            </div>
        </div>
    )
}

export default ScreeningStage