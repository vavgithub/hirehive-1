import React, { useEffect, useRef, useState } from 'react';
import AssigneeSelector from '../utility/AssigneeSelector';
import Datepicker from '../utility/Datepicker'
import Timepicker from '../utility/Timepicker'
import { Button } from '../ui/Button';
import { InputField } from '../Form/FormFields';
import { getStages } from './staging.config';


export const ScheduleForm = ({ candidateData, onSubmit, isRescheduling, initialData, onCancel }) => {
    const [date, setDate] = useState(isRescheduling ? null : (initialData ? new Date(initialData.scheduledDate) : null));
    const [time, setTime] = useState(isRescheduling ? null : (initialData ? initialData.scheduledTime : null));
    const [assignee, setAssignee] = useState(isRescheduling ? null : (initialData ? initialData.assignedTo : null));
    const [meetingLink, setMeetingLink] = useState(isRescheduling ? '' : (initialData ? initialData.meetingLink : ''));

    const [dateError,setDateError] = useState(false);
    const [timeError,setTimeError] = useState(false);
    const [assigneeError,setAssigneeError] = useState(false);
    const [linkError,setLinkError] = useState(false);

    const stages = getStages("UI UX")
    const currentStageIndex = stages.findIndex(stage => stage === candidateData?.jobApplication?.currentStage);
    
    //validating every fields
    const validateErrors = ()=>{
        !date ? setDateError(true) : setDateError(false);
        !time ? setTimeError(true) : setTimeError(false);
        !assignee ? setAssigneeError(true) : setAssigneeError(false);
        !meetingLink ? setLinkError(true) : setLinkError(false);
    }

    //To detect if its a first render or not
    const isFirstRender = useRef(true);

    const isFormValid = date && time && assignee && meetingLink;

    const handleSubmit = () => {
        //Once form submitted, firstRender is made false to trigger continuous validations
        isFirstRender.current = false;
        validateErrors()        
        if (isFormValid) {
            onSubmit({
                date: date.toISOString(),
                time: time.format('HH:mm'),
                assigneeId: assignee._id,
                meetingLink
            });
        }
    };

    //To validate errors after changing each field
    useEffect(()=>{
        if(!isFirstRender.current){
            validateErrors()
        }
    },[isFirstRender,date,time,assignee,meetingLink])

    return (
        <div className="flex flex-col gap-4">
            <div className='grid grid-cols-3 gap-4'>

                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Date</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Datepicker onChange={setDate} value={date} error={dateError} />
                    {dateError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Date is required</p>}
                </div>


                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Time</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <Timepicker onChange={setTime} value={time} error={timeError} />
                    {timeError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Time is required</p>}
                </div>


                <div className='flex flex-col gap-4 relative'>
                    <div>

                        <label className="typography-body ">Reviewer</label>
                        <span className="text-red-100">*</span>
                    </div>
                    <AssigneeSelector
                        mode="default"
                        value={assignee}
                        onChange={setAssignee}
                        onSelect={setAssignee}
                        error={assigneeError}
                        autoFill={currentStageIndex > 0 ? candidateData?.jobApplication?.stageStatuses[stages[currentStageIndex - 1]]?.assignedTo : false}
                        previousAssigneeId={candidateData?.jobApplication?.stageStatuses[stages[currentStageIndex - 1]]?.assignedTo ?? false}
                    />
                    {assigneeError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Reviewer is required</p>}
                </div>
            </div>
            <InputField
                id="meetingLink"
                type="text"
                label="Meeting Link"
                required
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                error={linkError}
                errorMessage="Meeting link is required"
            />
            <div className='flex gap-4'>
                {isRescheduling ? (
                    <div className='flex gap-4 w-full justify-end'>
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                    </div>
                ) : (
                    <div className='flex w-full justify-end'>


                            <Button
                                variant="primary"
                                // disabled={!isFormValid}
                                onClick={handleSubmit}
                            >
                                Schedule Call
                            </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleForm;