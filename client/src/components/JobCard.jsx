import React from 'react'
import ThreeDots from './ThreeDots';
import { getTimeAgo } from '../utility/getTimeAgo';
import PriceIcon from '../svg/JobCard/PriceIcon';
import JobTypeIcon from '../svg/JobCard/JobTypeIcon';
import GraphIcon from '../svg/JobCard/GraphIcon';

const JobCard = ({ job, status, handleAction, page, onClick, withKebab, isAdmin , isCandidate }) => {
    const formattedCreatedAt = getTimeAgo(job.createdAt);
    return (
        <div className="bg-background-90 shadow rounded-xl mb-4" onClick={() => onClick(job._id)}>
            <div className="flex justify-between items-center p-4">

                {/* <Typography variant='h3' className='text-white'></Typography> */}
                <h3 className='typography-h3 '>{job.jobTitle}</h3>
                <div className='flex items-center'>
                    <span className={`bg-background-70 typography-body px-4 py-2 rounded-xl`}>{job.jobProfile}</span>
                    {
                        withKebab && (
                            <ThreeDots job={job} handleAction={handleAction} page={page} />
                        )
                    }
                </div>
            </div>
            <div className="flex items-center px-4">
                <div className="mr-8 flex gap-2 items-center">
                    <JobTypeIcon />
                    <p className="typography-body ">{job.employmentType}</p>
                </div>
                <div className="mr-8 flex gap-2 justify-center items-center">
                    <PriceIcon />
                    <p className="typography-body ">{job.budgetFrom} - {job.budgetTo} LPA </p>
                </div>
                <div className='mr-8 flex gap-2 justify-center items-center'>
                    <GraphIcon />
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
                    <div className='flex'>
                        <p className='typography-body text-font-gray'>Closure Reason:</p>
                        <p className='typography-body'>{job.closingReason} || "N/A" </p>
                    </div>

                )
            }

            <div className="flex items-center justify-between bg-background-40 p-4 rounded-b-xl">

                {
                    isAdmin && (
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Candidates</span>
                                <span className="typography-body">{job.applied}125 Applied </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Engagement</span>
                                <span className="typography-body">{job.applyClickCount} Click </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Applications</span>
                                <span className="typography-body">{job.applied}10 Processed </span>
                            </div>

                            <div className='flex flex-col'>
                                <span className='typography-small-p text-font-gray'>Posted</span>
                                <span className="typography-body">{formattedCreatedAt} </span>
                            </div>

                        </div>


                    )
                }

                {isCandidate && (
                    <div className='flex gap-28'>
                        <div className='flex flex-col'>
                            <span className='typography-small-p text-font-gray'>Posted</span>
                            <span className="ml-2 typography-body">{formattedCreatedAt} </span>
                        </div>

                        <div className='flex flex-col'>
                            <span className='typography-small-p text-font-gray'>Workplace Type</span>
                            <span className="ml-2 typography-body">{job.workplaceType}</span>
                        </div>

                    </div>
                )}




            </div>

        </div>
    );
};

export default JobCard