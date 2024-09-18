// MyJobs.jsx

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ClockIcon from '../../svg/ClockIcon';
import DollarIcon from '../../svg/DollarIcon';
import ExperienceIcon from '../../svg/ExperienceIcon';

const MyJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get('/auth/candidate/applied-jobs');
                console.log(response);
                setAppliedJobs(response.data.jobApplications || []);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        };

        fetchAppliedJobs();
    }, []);


    return (
        <div className="p-2">
            <h1 className="typography-h1">My Jobs</h1>
            <div className='p-4 bg-background-30 rounded-xl'>

                {appliedJobs.length === 0 ? (
                    <p>You have not applied to any jobs yet.</p>
                ) : (
                    <ul>
                        {appliedJobs.map((application) => (
                            <li className='bg-background-90 p-4 my-4 rounded-xl ' key={application._id}>
                                <div className="flex justify-between items-center p-4">

                                    {/* <Typography variant='h3' className='text-white'></Typography> */}
                                    <h3 className='typography-h3 '>{application.jobId.jobTitle}</h3>
                                    <div className='flex items-center'>
                                        <span className={`bg-background-70 typography-body px-2 py-1 rounded`}>{application.jobId.jobProfile}</span>

                                    </div>
                                </div>
                                <div className="flex items-center px-4">
                                    <div className="mr-8 flex gap-2">
                                        <ClockIcon />
                                        <p className="typography-body ">{application.jobId.employmentType}</p>
                                    </div>
                                    <div className="mr-8 flex gap-2 justify-center items-center">
                                        <DollarIcon />
                                        <p className="typography-body ">{application.jobId.budgetFrom} - {application.jobId.budgetTo} LPA </p>
                                    </div>
                                    <div className='mr-8 flex gap-2 justify-center items-center'>
                                        <ExperienceIcon />
                                        <p className="typography-body">{application.jobId.experienceFrom} - {application.jobId.experienceTo} Year</p>
                                    </div>
                                </div>
                                <div className='bg-background-40'>

                                    <p>Applied on: {new Date(application.applicationDate).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
