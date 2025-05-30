import React, { useEffect, useMemo, useRef, useState } from 'react'
import Datepicker from '../MUIUtilities/Datepicker';
import Timepicker from '../MUIUtilities/Timepicker';
import { Button } from '../Buttons/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateStageStatus } from '../../redux/applicationStageSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { formatTime } from '../../utility/formatTime';
import TextEditor from '../utility/TextEditor';
import SchedulerButton from '../ui/SchedulerButton';
import { InputField } from '../Inputs/InputField';
import { combineDateWithTime, convertLocalToUTC, formatUTCToLocalTimeAuto, UTCToDateFormatted } from '../../utility/timezoneConverter';
import StyledCard from '../Cards/StyledCard';
import Modal from '../Modals/Modal';
import IconWrapper from '../Cards/IconWrapper';
import { ChartNoAxesGantt, ChevronDown, ChevronUp } from 'lucide-react';

export function SubmissionForm({candidateId,jobId,stageData,setIsLoading}){
    const [taskLink, setTaskLink] = useState('');
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const submitTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('candidates/submit-design-task', taskData),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Under Review',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false);
        },
        onError: (error) => {
            console.error('Error submitting design task:', error);
            setIsLoading(false);
            // Handle error (e.g., show error message to user)
        }
    });

    const handleSubmitTask = () => {
        if (taskLink) {
            submitTaskMutation.mutate({
                candidateId,
                jobId,
                taskLink,
                comment
            });
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className='flex justify-between mb-4'>
                <div className='w-[80%]'>
                    <h4 className='mb-2 typography-large-p text-font-gray'>Task Description</h4>
                    <div className='text-font-gray typography-large-p' dangerouslySetInnerHTML={{ __html: stageData?.taskDescription ? stageData?.taskDescription : '' }}></div>
                </div>
                <div>
                    <p className='text-font-gray typography-large-p'>Due on</p>
                    <p>{UTCToDateFormatted(stageData?.currentCall?.scheduledDate)} - {formatUTCToLocalTimeAuto(stageData?.currentCall?.scheduledDate)}</p>
                </div>
            </div>

            <InputField
                id="taskLink"
                type="text"
                label="Task Link"
                extraClass={'custom-input'}
                required
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
            />
            <InputField
                id="comment"
                type="text"
                label="Comment (Optional)"
                extraClass={'custom-input'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
                <Button
                    className=" self-end "
                    variant="primary"
                    disabled={!taskLink}
                    onClick={handleSubmitTask}
                >
                    Submit Task
                </Button>
        </div>
    )
}

const fetchTaskPresets = async (jobProfile) => {
    const response = await axios.post(`/hr/get-task-presets`,{ jobProfile }, { withCredentials: true });
    return response.data;
}

function TaskForm({jobProfile,candidateId,candidateEmail,jobId,setIsLoading}) {
    //To detect if its a first render or not
    const isFirstRender = useRef(true);

    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [dueTime, setDueTime] = useState(null);
    
    const [descriptionError, setDescriptionError] = useState(false);
    const [dueDateError, setDueDateError] = useState(false);
    const [dueTimeError, setDueTimeError] = useState(false);
    
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    
    const [showTaskContent,setShowTaskContent] = useState(false);
    const [selectedTaskPreset, setSelectedTaskPreset] = useState('');
    const [presetLoaded, setPresetLoaded] = useState(false);

    const [showMore,setShowMore] = useState(false);

    const { data: taskData, isTaskDataLoading } = useQuery({
        queryKey: ['getAllTaskPresets',jobProfile],
        queryFn: () => fetchTaskPresets(jobProfile),
        enabled : !!jobProfile
    });
    
    const taskPresets = useMemo(() => taskData?.data || [] ,[taskData]) 

    const validateErrors = ()=> {
        if(!taskDescription.trim()){
            setDescriptionError(true)
        }else{
            setDescriptionError(false)
        }
        if(!dueDate){
            setDueDateError(true)
        }else{
            setDueDateError(false)
        }
        if(!dueTime){
            setDueTimeError(true)
        }else{
            setDueTimeError(false)
        }
    }


    useEffect(()=>{
        if(!isFirstRender.current){
            validateErrors()
        }
    },[taskDescription,dueDate,dueTime,isFirstRender])

    const sendTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('hr/send-design-task', taskData),
        onMutate: () => {
            setIsLoading(true); // Set loading to true when mutation starts
        },
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Sent',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
            setIsLoading(false); // Stop loading when task is successfully sent
        },
        onError: (error) => {
            console.error('Error sending design task:', error);
            setIsLoading(false); // Stop loading in case of an error
        }
    });

    const handleSendTask = (scheduledDate,scheduledTime) => {
        isFirstRender.current = false;
        validateErrors()
        // console.log(taskDescription)
        if (taskDescription.trim() && dueDate && dueTime) {
            sendTaskMutation.mutate({
                candidateId,
                jobId,
                taskDescription,
                dueDate: convertLocalToUTC(combineDateWithTime(new Date(dueDate.toISOString()),dueTime.format('HH:mm'))),
                dueTime: dueTime.format('HH:mm'),
                candidateEmail,
                ...(scheduledDate ? {scheduledDate : convertLocalToUTC(combineDateWithTime(new Date(scheduledDate.toISOString()),scheduledTime.format('HH:mm')))} : {}),
                ...(scheduledTime ? {scheduledTime : scheduledTime?.format('HH:mm')} : {}),
            });
        }
    };

    const handleViewPreset = (template) => {
        setShowTaskContent(template)
    }

    const handleSetTemplateToEditor = (template) => {
        setPresetLoaded(false);
        setSelectedTaskPreset(template?.htmlString);
    }
    useEffect(()=>{
        if(selectedTaskPreset){
            setPresetLoaded(true)
        }else{
            setPresetLoaded(false)
        }
    },[selectedTaskPreset])

    useEffect(() => {
        if(taskDescription === '<p><br></p>'){
            setSelectedTaskPreset(false)
            setPresetLoaded(false)
        }
    },[taskDescription])

  return (
        <div className="flex flex-col gap-4 relative mt-4">
            <div >
                <label className="typography-body ">Draft your design task </label>
                <span className="text-red-100">*</span>
            </div>

            <TextEditor clearPreset={setSelectedTaskPreset} hasClearOption presetLoaded={presetLoaded} presetTemplate={selectedTaskPreset} htmlData={taskDescription} loaded={false} errors={descriptionError} placeholder={"Write a Task Description"} setEditorContent={(data)=>setTaskDescription(data)} />

            {descriptionError && <p className="text-red-500 absolute typography-small-p top-[23rem]">Task Description is required</p>}

            {/* Preset Section */}
            {taskPresets?.length > 0 && 
            <>
            <div className='flex items-center gap-6 relative'>
                <div className='h-[1px] w-[50%] bg-font-gray'></div>
                <p className='typography-body text-font-gray'>OR</p>
                <div className='h-[1px] w-[50%] bg-font-gray'></div>
            </div>
            <div className='relative'>
                <label htmlFor="preset" className='typography-body mb-4 block'>Choose Design Task from  Presets</label>
                <div className='grid grid-cols-2 gap-6'>
                {
                    taskPresets?.filter((task,index) => showMore ? true : index < 2).map(task => (
                    <StyledCard  key={task?._id} onClick={() => handleViewPreset(task)} backgroundColor={'bg-background-70 hover:bg-background-60 cursor-pointer flex flex-col gap-2 relative '}>
                        <h4 className='whitespace-nowrap overflow-hidden text-ellipsis'>{task?.title}</h4>
                        <p className='typography-body text-font-gray whitespace-nowrap overflow-hidden text-ellipsis w-[50%]'>{task?.level}-{task?.category}</p>
                    </StyledCard>
                    ))
                }
                </div>
                <div className='typography-small-p text-font-gray'>
                    {
                        showMore 
                        ? <p className='flex gap-1 mt-2 place-self-end cursor-pointer' onClick={()=>setShowMore(!showMore)}>Hide <IconWrapper inheritColor customIconSize={2} customStrokeWidth={4} size={0} icon={ChevronUp} /></p>
                        : <p className='flex gap-1 mt-2 place-self-end cursor-pointer' onClick={()=>setShowMore(!showMore)}>Show More <IconWrapper inheritColor customIconSize={2} customStrokeWidth={4} size={0} icon={ChevronDown} /></p>
                    }
                </div>
            </div>
            </>
            }

            <div className='flex justify-normal gap-4'>
                <div className='w-full relative'>
                    <div className='pb-4' >

                        <label className="typography-body ">Due Date</label>
                        <span className="text-red-100">*</span>
                    </div>


                    <Datepicker error={dueDateError} onChange={setDueDate} value={dueDate} />
                    {dueDateError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Date is required</p>}
                </div>
                <div className='w-full relative'>
                    <div className='pb-4'>

                        <label className="typography-body ">Due Time</label>
                        <span className="text-red-100">*</span>
                    </div>

                    <Timepicker error={dueTimeError} onChange={setDueTime} value={dueTime} />
                    {dueTimeError && <p className='absolute text-red-100 typography-small-p top-[5.2rem]'>Time is required</p>}
                </div>
            </div>
            <div className='w-full flex justify-end'>

                    {/* <Button
                        variant="primary"
                        onClick={handleSendTask}
                    >
                        Send Email
                    </Button> */}
                    <SchedulerButton buttonText={"Send Email"} onConfirm={handleSendTask} modalTitle={"Schedule Email"} modalMessage={"Schedule design task email with specified date and time"} buttonVariant={"primary"}/>
            </div>
            <Modal
            open={showTaskContent}
            item={showTaskContent}
            customTitle={showTaskContent?.title}
            customMessage={`Sample Design Task Template for ${showTaskContent?.level} ${showTaskContent?.category} ${showTaskContent?.category === 'UI UX' ? 'Designer' : ''}`}
            specifiedWidth={'max-w-4xl'}
            onClose={() => setShowTaskContent(false)}
            customConfirmLabel={'Insert'}
            onConfirm={handleSetTemplateToEditor}
            >
                {showTaskContent?.htmlString && 
                <div className='max-h-[50vh] overflow-y-scroll scrollbar-hide mt-5' dangerouslySetInnerHTML={{ __html : showTaskContent?.htmlString}}>

                </div>}
            </Modal>
        </div>
  )
}

export default TaskForm
