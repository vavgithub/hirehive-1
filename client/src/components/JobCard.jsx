import React from 'react'
import ThreeDots from './ThreeDots';
import ClockIcon from '../svg/ClockIcon';
import { getTimeAgo } from '../utility/getTimeAgo';
import ExperienceIcon from '../svg/ExperienceIcon';
import DollarIcon from '../svg/DollarIcon';

const JobCard = ({ job, status, handleAction, page, onClick }) => {
    const formattedCreatedAt = getTimeAgo(job.createdAt);
    return (
        <div className="bg-background-90 shadow rounded mb-4" onClick={() => onClick(job._id)}>
            <div className="flex justify-between items-center p-4">

                {/* <Typography variant='h3' className='text-white'></Typography> */}
                <h3 className='typography-h3 '>{job.jobTitle}</h3>
                <div className='flex items-center'>
                    <span className={`bg-background-70 typography-body px-2 py-1 rounded`}>{job.jobProfile}</span>
                    <ThreeDots job={job} handleAction={handleAction} page={page} />
                </div>
            </div>
            <div className="flex items-center px-4">
                <div className="mr-8 flex gap-2">
                    <ClockIcon/>
                    <p className="typography-body ">{job.employmentType}</p>
                </div>
                <div className="mr-8 flex gap-2 justify-center items-center">
                    <DollarIcon/>
                    <p className="typography-body ">{job.budgetFrom} - {job.budgetTo} LPA </p>
                </div>
                <div className='mr-8 flex gap-2 justify-center items-center'>
                    <ExperienceIcon/>
                    <p className="typography-body">{job.experienceFrom} - {job.experienceTo} Year</p>
                </div>
            </div>
            <div className='w-[750px] max-w-full p-4'>
                <p className='typography-body inline-block  truncate text-ellipsis text-font-gray max-w-full'>
                    {job.jobDescription}
                </p>
            </div>

            {
                job.status == "closed" && (
                    <div>
                        <p className='typography-body'>Clouser Reason</p>
                        <p className='typography-body'>{job.closingReason} || "N/A" </p>
                    </div>

                )
            }

            <div className="flex items-center justify-between bg-background-40 p-4">

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Candidates</span>
                    <span className="ml-2 typography-body">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Engagement</span>
                <span className="ml-2 typography-body">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Applications</span>
                <span className="ml-2 typography-body">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Posted</span>
                <span className="ml-2 typography-body">{formattedCreatedAt} </span>
                </div>

            </div>

        </div>
    );
};

export default JobCard