import React, { useState } from 'react'
import CalenderIcon from '../../svg/Staging/CalenderIcon'
import ClockIcon from '../../svg/Staging/ClockIcon'
import { formatTime } from '../../utility/formatTime'
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl'

export function SubmissionDetails({stageData,candidateData}){
    return (
        <div className='grid grid-cols-2 bg-background-80 p-4 rounded-xl mt-4'>
            <div>
                <p className='typography-small-p text-font-gray'> Task</p>
                <a href={ensureAbsoluteUrl(stageData?.submittedTaskLink)} target="_blank" rel="noopener noreferrer" className='typography-body text-font-primary  flex gap-2' >Design Task_{candidateData?.firstName}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99825 12C9.4277 12.5741 9.9756 13.0491 10.6048 13.3929C11.234 13.7367 11.9298 13.9411 12.6449 13.9923C13.36 14.0435 14.0778 13.9403 14.7496 13.6897C15.4214 13.4392 16.0314 13.047 16.5382 12.54L19.5382 9.53997C20.449 8.59695 20.953 7.33394 20.9416 6.02296C20.9302 4.71198 20.4044 3.45791 19.4773 2.53087C18.5503 1.60383 17.2962 1.07799 15.9853 1.0666C14.6743 1.0552 13.4113 1.55918 12.4682 2.46997L10.7482 4.17997M12.9982 9.99996C12.5688 9.42584 12.0209 8.95078 11.3917 8.60703C10.7625 8.26327 10.0667 8.05885 9.3516 8.00763C8.63645 7.95641 7.91866 8.0596 7.2469 8.31018C6.57514 8.56077 5.96513 8.9529 5.45825 9.45996L2.45825 12.46C1.54746 13.403 1.04348 14.666 1.05488 15.977C1.06627 17.288 1.59211 18.542 2.51915 19.4691C3.44619 20.3961 4.70026 20.9219 6.01124 20.9333C7.32222 20.9447 8.58524 20.4408 9.52825 19.53L11.2382 17.82" stroke="#045FFD" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </a>
            </div>
            <div>
                <p className='typography-small-p text-font-gray'> Comment</p>
                <p className='typography-large-p'>{stageData?.submittedComment || "No Comments"}  </p>
            </div>
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
                        <CalenderIcon />
                        <h2>
                            {new Date(stageData?.currentCall?.scheduledDate).toLocaleDateString('en-gb', { timeZone: 'UTC' })}
                        </h2>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='typography-small-p text-font-gray'>Due Time</span>
                    <div className='flex items-center gap-2'>
                        <ClockIcon />
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
