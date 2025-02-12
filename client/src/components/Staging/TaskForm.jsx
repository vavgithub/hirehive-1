import React, { useEffect, useRef, useState } from 'react'
import Datepicker from '../utility/Datepicker';
import Timepicker from '../utility/Timepicker';
import { Button } from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStageStatus } from '../../redux/applicationStageSlice';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { formatDescription } from '../../utility/formatDescription';
import { InputField } from '../Form/FormFields';
import { formatTime } from '../../utility/formatTime';
import TextEditor from '../utility/TextEditor';

export function SubmissionForm({candidateId,jobId,stageData}){
    const [taskLink, setTaskLink] = useState('');
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const submitTaskMutation = useMutation({
        mutationFn: (taskData) => axios.post('candidates/submit-design-task', taskData),
        onSuccess: (data) => {
            dispatch(updateStageStatus({
                stage: 'Design Task',
                status: 'Under Review',
                data: data.updatedStageStatus
            }));
            queryClient.invalidateQueries(['candidate', candidateId, jobId]);
        },
        onError: (error) => {
            console.error('Error submitting design task:', error);
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
        <div className="flex flex-col gap-4 mt-4 font-outfit">
            <div className='flex justify-between mb-4'>
                <div className='w-[80%]'>
                    <h4 className='mb-2 typography-large-p text-font-gray'>Task Description</h4>
                    <div className='text-font-gray typography-large-p' dangerouslySetInnerHTML={{ __html: stageData?.taskDescription ? stageData?.taskDescription : '' }}></div>
                </div>
                <div>
                    <p className='text-font-gray typography-large-p'>Due on</p>
                    <p>{new Date(stageData?.currentCall?.scheduledDate).toLocaleDateString('en-gb', { timeZone: 'UTC' ,day : "2-digit", month : "long" , year : "numeric"})} - {formatTime(stageData?.currentCall?.scheduledTime)}</p>
                </div>
            </div>

            <InputField
                id="taskLink"
                type="text"
                label="Task Link"
                required
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
            />
            <InputField
                id="comment"
                type="text"
                label="Comment (Optional)"
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

function TaskForm({candidateId,candidateEmail,jobId,setIsLoading}) {
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

    const handleSendTask = () => {
        isFirstRender.current = false;
        validateErrors()
        if (taskDescription.trim() && dueDate && dueTime) {
            sendTaskMutation.mutate({
                candidateId,
                jobId,
                taskDescription,
                dueDate: dueDate.toISOString(),
                dueTime: dueTime.format('HH:mm'),
                candidateEmail
            });
        }
    };
  return (
        <div className="flex flex-col gap-4 relative mt-4">
            <div >
                <label className="typography-body ">Design task details </label>
                <span className="text-red-100">*</span>
            </div>
            {/* <textarea
                id="taskDescription"
                placeholder='Task Description'
                type="text"
                label="Task Description"
                required
                className={(descriptionError ? '!border !border-red-500 ' : 'border border-transparent ') + "w-full rounded-xl px-3 py-2 bg-background-40 resize-none outline-none focus:outline-teal-300"}
                rows="10"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            /> */}
            <TextEditor htmlData={taskDescription} loaded={false} errors={descriptionError} placeholder={"Write a Task Description"} setEditorContent={(data)=>setTaskDescription(data)} />

            {descriptionError && <p className="text-red-500 absolute typography-small-p top-[23rem]">Task Description is required</p>}
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

                    <Button
                        variant="primary"
                        onClick={handleSendTask}
                    >
                        Send Email
                    </Button>
            </div>
        </div>
  )
}

export default TaskForm
