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
                <div className="mr-8 flex">
                    <ClockIcon/>
                    <p className="typography-body text-blue-100">{job.employmentType}</p>
                </div>
                <div className="mr-8 flex justify-center items-center">
                    <DollarIcon/>
                    <p className="typography-body text-white">{job.budgetFrom} - {job.budgetTo} LPA </p>
                </div>
                <div className='mr-8 flex justify-center items-center'>
                    <ExperienceIcon/>
                    <p className="typography-body text-white">{job.experienceFrom} - {job.experienceTo} Year</p>
                </div>
            </div>
            <p className='typography-body truncate px-4 my-4 text-font-gray '>
                {job.jobDescription}
            </p>

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
                    <span className="ml-2 typography-body text-white">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Engagement</span>
                <span className="ml-2 typography-body text-white">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Applications</span>
                <span className="ml-2 typography-body text-white">{job.applied}125 </span>
                </div>

                <div className='flex flex-col'>
                <span className='typography-small-p text-font-gray'>Posted</span>
                <span className="ml-2 typography-body text-white">{formattedCreatedAt} </span>
                </div>

            </div>

        </div>
    );
};

export default JobCard