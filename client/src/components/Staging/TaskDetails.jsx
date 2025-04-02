import React, { useState } from 'react'
import { formatTime } from '../../utility/formatTime'
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl'
import { Button } from '../Buttons/Button'
import axios from '../../api/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { showErrorToast, showSuccessToast } from '../ui/Toast'
import IconWrapper from '../Cards/IconWrapper'
import { Calendar , Clock, Link, PencilLine } from 'lucide-react'

const updateDesignTask = async ({taskLink,comment,jobId}) => {
    const response = await axios.post('/auth/candidate//update-design-task',{taskLink,comment,jobId});
    return response.data
}

export function SubmissionDetails({stageData,candidateData, isEditable}){
    const [isEditing,setIsEditing] = useState(false);
    const [taskLink,setTaskLink] = useState(stageData?.submittedTaskLink ?? "");
    const [comment,setComment] = useState(stageData?.submittedComment ?? "");
    const queryClient = useQueryClient();

    const updateDesignTaskMutation = useMutation({
        mutationFn : updateDesignTask,
        onSuccess : (data) => {
            if(data?.message){
                showSuccessToast("Success",data?.message);
                queryClient.invalidateQueries(['candidate', candidateData?._id, candidateData?.jobApplication?.jobId]);
                setIsEditing(false)
            }
        },
        onError : (error) => {
            showErrorToast("Error",error?.response?.data?.message || "Unexpected error on updation.")
        }
    })
    
    const handleEditTask = () => {
        if(!taskLink?.trim() || !comment?.trim()){
            showErrorToast("Error","Please fill all the fields")
        }
        updateDesignTaskMutation.mutate({taskLink,comment,jobId : candidateData?.jobApplication?.jobId})
    }

    return (
        <div className='mt-4 bg-background-80 p-4 rounded-xl relative'>
            <div className='grid grid-cols-2 gap-4   '>
                <div>
                    <p className='typography-small-p text-font-gray'> Task</p>
                    {!isEditing ? <a href={ensureAbsoluteUrl(stageData?.submittedTaskLink)} target="_blank"
                        rel="noopener noreferrer" className='typography-body text-font-primary  flex gap-2'>Design
                        Task_{candidateData?.firstName}
                         <IconWrapper inheritColor icon={Link} size={0} />
                    </a> :
                    <input type="text" className='mt-2' value={taskLink} onChange={(e)=>setTaskLink(e.target.value)} />
                    }
                </div>
                <div>
                    <p className='typography-small-p text-font-gray'> Comment</p>
                    {!isEditing ? <p  className='font-outfit typography-large-p'>{stageData?.submittedComment || "No Comments"}  </p>
                    :
                    <input type="text" className='mt-2' value={comment} onChange={(e)=>setComment(e.target.value)} />
                    }
                </div>
                {(isEditable && !isEditing) &&
                <button onClick={()=>setIsEditing(true)} type="button" className='absolute right-4 bottom-4 border rounded-xl
                    p-2 border-font-gray hover:bg-background-70'>
                    <IconWrapper icon={PencilLine} size={0} />
                </button>}

            </div>
            {
                isEditing && 
                <div className='flex justify-end w-full mt-4 gap-4'>
                <Button
                variant="secondary"
                onClick={()=>setIsEditing(false)}
                >
                    Cancel
                </Button>
                <Button
                variant="primary"
                onClick={handleEditTask}
                >
                    Save
                </Button>
                </div>
            }
        </div>
    )
}

function TaskDetails({stageData}) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
        <div className='bg-background-80 rounded-xl p-4'>
            <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='flex flex-col'>
                    <span className='typography-small-p text-font-gray'>Due Date</span>
                    <div className='flex items-center gap-2'>
                        <IconWrapper icon={Calendar} size={0} customIconSize={5} customStrokeWidth={5} />
                        <h2>
                            {new Date(stageData?.currentCall?.scheduledDate).toLocaleDateString('en-gb', { timeZone: 'UTC' })}
                        </h2>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='typography-small-p text-font-gray'>Due Time</span>
                    <div className='flex items-center gap-2'>
                        <IconWrapper icon={Clock} size={0} customIconSize={5} customStrokeWidth={5} />
                        <h2>
                            {formatTime(stageData?.currentCall?.scheduledTime)}
                        </h2>
                    </div>
                </div>
            </div>
            <div>
                <span className='typography-small-p text-font-gray'>Task Description</span>
                <div className='text-font-gray typography-large-p mt-2' dangerouslySetInnerHTML={{ __html: stageData?.taskDescription ? stageData?.taskDescription : '' }}></div>
            </div>
        </div>
    </div>
  )
}

export default TaskDetails
