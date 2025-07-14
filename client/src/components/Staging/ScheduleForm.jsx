import React, { useEffect, useRef, useState } from 'react';
import AssigneeSelector from '../MUIUtilities/AssigneeSelector';
import Datepicker from '../MUIUtilities/Datepicker'
import Timepicker from '../MUIUtilities/Timepicker'
import { Button } from '../Buttons/Button';
import { InputField } from '../Inputs/InputField';
import { getStages, logConfig } from '../../config/staging.config';
import { combineDateWithTime, convertLocalToUTC, UTCToDateFormatted } from '../../utility/timezoneConverter';
import StyledCard from '../Cards/StyledCard';
import Modal from '../Modals/Modal';
import IconWrapper from '../Cards/IconWrapper';
import { Plus, X } from 'lucide-react';
import { emailRegex } from '../../utility/regex';
import { showErrorToast } from '../ui/Toast';
import { useAuthContext } from '../../context/AuthProvider';

export const ScheduleForm = ({ candidateData, onSubmit, isRescheduling, initialData, onCancel ,isDisabled , log = null }) => {
    const [date, setDate] = useState(isRescheduling ? null : (initialData ? new Date(initialData.scheduledDate) : null));
    const [time, setTime] = useState(isRescheduling ? null : (initialData ? initialData.scheduledTime : null));
    const [assignee, setAssignee] = useState(isRescheduling ? null : (initialData ? initialData.assignedTo : null));
    const [meetingLink, setMeetingLink] = useState(isRescheduling ? '' : (initialData ? initialData.meetingLink : ''));
    const [autoLink,setAutoLink] = useState(false);
    const [addedInvitees,setAddedInvitees] = useState([]);

    const [dateError,setDateError] = useState(false);
    const [timeError,setTimeError] = useState(false);
    const [assigneeError,setAssigneeError] = useState(false);
    const [linkError,setLinkError] = useState(false);

    const [openInviteesModal,setOpenInviteesModal] = useState(false);
    const [inviteeEmail,setInviteeEmail] = useState('');

    const [invitees,setInvitees] = useState([]);

    const { user } = useAuthContext();

    const stages = getStages("UI UX")
    const currentStageIndex = stages.findIndex(stage => stage === candidateData?.jobApplication?.currentStage);
    
    //validating every fields
    const validateErrors = ()=>{
        !date ? setDateError(true) : setDateError(false);
        !time ? setTimeError(true) : setTimeError(false);
        !assignee ? setAssigneeError(true) : setAssigneeError(false);
        (!autoLink && !meetingLink) ? setLinkError(true) : setLinkError(false);
    }

    const handleAddInvitees = () => {
        if(invitees?.length > 0){
            setAddedInvitees(invitees);
            setOpenInviteesModal(false)
            setInvitees([])
        }else{
            showErrorToast('Error','No new emails are added.')
        }
    }

    const addToInvitees = () => {
        if(emailRegex.test(inviteeEmail)){
            if(!invitees.includes(inviteeEmail)){
                setInvitees(prev => [...prev,inviteeEmail])
            }
            setInviteeEmail('')
        }else{
            showErrorToast('Error','Invalid Email ID')
        }
    }

    const handleAutoLinkClick = ()=>{  
        setMeetingLink('')
        setAutoLink(true)
    }

    const handleMeetLinkClick = ()=>{
        setAutoLink(false)
    }

    //To detect if its a first render or not
    const isFirstRender = useRef(true);

    const isFormValid = date && time && assignee && (meetingLink || autoLink);

    const handleSubmit = () => {
        //Once form submitted, firstRender is made false to trigger continuous validations
        isFirstRender.current = false;
        validateErrors()        
        if (isFormValid) {
            onSubmit({
                date: convertLocalToUTC(combineDateWithTime(new Date(date.toISOString()),time.format('HH:mm'))),
                time: time.format('HH:mm'),
                assigneeId: assignee._id,
                meetingLink,
                automaticLink : autoLink,
                addedInvitees
            });
        }
    };

    //To validate errors after changing each field
    useEffect(()=>{
        if(!isFirstRender.current){
            validateErrors()
        }
        if(meetingLink?.trim()){
            setAutoLink(false)
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
            {!user?.hasAuth?.edit_events && 
                <InputField
                id="meetingLink"
                type="text"
                label={"Meeting Link"}
                required
                value={meetingLink}
                extraClass={'custom-input '}
                onChange={(e) => setMeetingLink(e.target.value)}
                error={linkError}
                errorMessage="Meeting link is required"
            />
            }
            {user?.hasAuth?.edit_events && 
            <StyledCard backgroundColor={'bg-background-70'} >
                <h3 className='mb-4'>Choose Your Meeting Type</h3>
                <div className='flex w-full justify-between'>
                <StyledCard onClick={handleMeetLinkClick} backgroundColor={!autoLink ? 'selection-primary' :'bg-background-60'} extraStyles={'hover:bg-background-50 w-[50%]'}>
                    <h4 className=' mb-2'>Share Your Meeting Link</h4>
                    <InputField
                        id="meetingLink"
                        type="text"
                        label={"Meeting Link"}
                        labelStyles={'text-font-gray'}
                        // required
                        value={meetingLink}
                        extraClass={'custom-input text-white'}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        error={linkError}
                        errorMessage="Meeting link is required"
                    />
                </StyledCard>
                <div className=" flex items-center">
                    <span className="px-6 text-grey-100">OR</span>
                </div> 
                <StyledCard onClick={handleAutoLinkClick} backgroundColor={autoLink ? 'selection-primary' : 'bg-background-60'} extraStyles={'flex items-center w-[50%] hover:bg-background-50 cursor-pointer'} >
                    <div className='flex justify-between flex-col gap-4 w-full '>
                        <div>
                            <h4 className='typography-h4 '>Smart Google Meet Generator</h4>
                            <p className={'text-font-gray typography-large-p '}>Choose this option to automatically create Google Meet with invitees as Candidate and Reviewer</p>
                            {console.log(assignee)}
                            {autoLink && <p className='typography-body text-font-gray mt-2'>Participants : {candidateData?.firstName + ' ' + candidateData?.lastName }{assignee && (', ' + assignee?.firstName + ' ' + assignee?.lastName)}{addedInvitees?.length > 0 &&  addedInvitees.map(invitee => ', ' + invitee )}</p>}
                        </div>
                        <Button variant='secondary' type='button' onClick={()=>setOpenInviteesModal(true)} >Add More Invitees</Button>
                    </div>
                </StyledCard>
                </div>
            </StyledCard>}
            <div className='flex gap-4'>
                <div className={'flex gap-4 w-full ' + (log ? 'justify-between' : 'justify-end')}>
                    {
                        log && 
                        <div >
                            <p className='typography-small-p text-font-gray'>{log && candidateData?.jobApplication?.currentStage && logConfig[candidateData?.jobApplication?.currentStage][log?.status]}</p>
                            <p>{UTCToDateFormatted(log?.date)}</p>
                        </div>
                    }
                {isRescheduling ? (
                    <div className='flex gap-4'>
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
                            <Button
                                variant="primary"
                                disabled={isDisabled}
                                onClick={handleSubmit}
                            >
                                Schedule Call
                            </Button>
                )}
                </div>
            </div>
            <Modal 
                open={openInviteesModal}
                onClose={() => {setOpenInviteesModal(false); setInvitees([])}}
                onConfirm={handleAddInvitees}
                isReadyToClose={false}
                customTitle={'Invite Participants'}
                customMessage={'Add people you’d like to invite to this meeting. They will receive a calendar invite with the Google Meet link.'}
                customConfirmLabel={'Add'}
                specifiedWidth={'max-w-xl'}
            >
                <div className='mt-4 flex flex-col'>
                    <label className='typography-body mb-2' htmlFor="">Added Participants</label>
                    {invitees?.length > 0 ? 
                    <div className='flex gap-2 flex-wrap'>
                        {invitees.map(invitee => <div className=' px-6 py-2 typography-body rounded-full bg-background-80 w-fit flex justify-between gap-2 max-w-[50%]'>
                            <p className='overflow-hidden text-ellipsis whitespace-nowrap'>{invitee}</p>
                            <span className='cursor-pointer' 
                            onClick={()=>setInvitees(prev => prev.filter(email => email !== invitee))}>
                                <IconWrapper icon={X} size={0} customIconSize={2} />
                            </span>
                        </div>)}
                    </div>
                    : <p className='typography-body text-font-gray'>No Particpants added</p>
                    }
                    <label className='typography-body mt-4' htmlFor="inviteeEmail">Email</label>
                    <div
                    className='mt-2 relative ' 
                    >
                        <div onClick={addToInvitees} className=' cursor-pointer absolute right-2 top-[50%] -translate-y-[50%] text-font-primary'>
                            <IconWrapper icon={Plus} inheritColor  />
                        </div>
                        <input 
                        type="text" 
                        placeholder='Enter Email' 
                        id='inviteeEmail' 
                        onChange={(e) => setInviteeEmail(e.target.value)} 
                        value={inviteeEmail}
                    />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ScheduleForm;