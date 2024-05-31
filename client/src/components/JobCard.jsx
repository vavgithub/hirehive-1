import React from 'react'
import ThreeDots from './ThreeDots';
import AppliedIcon from '../svg/AppliedIcon';
import ProcessedIcon from '../svg/ProcessedIcon';
import ClockIcon from '../svg/ClockIcon';
import { getTimeAgo } from '../utility/getTimeAgo';
import ClickIcon from '../svg/ClickIcon';

const JobCard = ({ job, status, handleAction , handleViewJob }) => {
    const formattedCreatedAt = getTimeAgo(job.createdAt);
    return (
        <div className="p-4 bg-white shadow rounded mb-4" onClick={handleViewJob}>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <div className='flex items-center'>
                    <span className={`text-sm font-semibold ${job.category === 'UI/UX' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'} px-2 py-1 rounded`}>{job.category}</span>
                    <ThreeDots job={job} handleAction={handleAction} />
                </div>
            </div>
            <div className="flex items-center">
                <div className="mr-8">
                    <p className="text-gray-600 text-sm">Employment Type</p>
                    <p className="font-bold">{"Full-time"}</p>
                </div>
                <div className='bg-red-600 mr-2 ml-2 h-[32px] w-[2px]'></div>
                <div className="mr-8">
                    <p className="text-gray-600 text-sm">Budget</p>
                    <p className="font-bold">{"$50,000"}</p>
                </div>
                <div className='bg-red-600 mr-2 ml-2 h-[32px] w-[2px]'></div>
                <div>
                    <p className="text-gray-600 text-sm">Experience</p>
                    <p className="font-bold">{"3 years"}</p>
                </div>
            </div>
            <p className='line-clamp-1'>
                {job.description}
            </p>

            <div className="flex items-center justify-between">

                <div className='flex'>
                    <AppliedIcon />
                    <span className="ml-2">{job.applied}  applied</span>
                </div>

                <div className='flex'>
                    <ClickIcon />
                    <span className="ml-2">{job.clicks} clicks</span>
                </div>

                <div className='flex'>
                    <ProcessedIcon />
                    <span className="ml-2">processed</span>
                </div>

                <div className='flex'>
                    <ClockIcon />
                    {formattedCreatedAt}
                    
                </div> 

            </div>

        </div>
    );
};

export default JobCard