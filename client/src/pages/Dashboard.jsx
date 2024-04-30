import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import useNavigate  from 'react-router-dom';

const FilterSidebar = () => {

    const [datePosted, setDatePosted] = useState('Anytime');
    const [jobType, setJobType] = useState({ fullTime: false, internship: false });
    const [experienceLevel, setExperienceLevel] = useState({ entry: false, intermediate: false, senior: false });
    const [jobFunction, setJobFunction] = useState({ design: false, engineering: false, sales: false, marketing: false });

    const handleCheckboxChange = (event, category, value) => {
        switch (category) {
            case 'jobType':
                setJobType({ ...jobType, [value]: event.target.checked });
                break;
            case 'experienceLevel':
                setExperienceLevel({ ...experienceLevel, [value]: event.target.checked });
                break;
            case 'jobFunction':
                setJobFunction({ ...jobFunction, [value]: event.target.checked });
                break;
            default:
                break;
        }
    };
    
    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <div className="mb-4">
                <h3 className="text-gray-800 font-semibold mb-2 text-left">Date Posted</h3>
                <select
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700"
                    value={datePosted}
                    onChange={(e) => setDatePosted(e.target.value)}
                >
                    <option value="Anytime">Anytime</option>
                    <option value="Last 24 hours">Last 24 hours</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                </select>
            </div>

            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Job Type</h3>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobType.fullTime}
                            onChange={(e) => handleCheckboxChange(e, 'jobType', 'fullTime')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobType.internship}
                            onChange={(e) => handleCheckboxChange(e, 'jobType', 'internship')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Internship</span>
                    </label>
                </div>
            </div>

            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Exprience Level</h3>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={experienceLevel.entry}
                            onChange={(e) => handleCheckboxChange(e, 'experienceLevel', 'entry')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Entry Level</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={experienceLevel.intermediate}
                            onChange={(e) => handleCheckboxChange(e, 'experienceLevel', 'intermediate')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Intermediate</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={experienceLevel.senior}
                            onChange={(e) => handleCheckboxChange(e, 'experienceLevel', 'senior')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Senior Level</span>
                    </label>
                </div>
            </div>

            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Job Function</h3>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobFunction.design}
                            onChange={(e) => handleCheckboxChange(e, 'jobFunction', 'design')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Design</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobFunction.engineering}
                            onChange={(e) => handleCheckboxChange(e, 'jobFunction', 'engineering')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Engineering</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobFunction.sales}
                            onChange={(e) => handleCheckboxChange(e, 'jobFunction', 'sales')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Sales</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={jobFunction.marketing}
                            onChange={(e) => handleCheckboxChange(e, 'jobFunction', 'marketing')}
                            className="form-checkbox text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">Marketing</span>
                    </label>
                </div>
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Apply Filters</button>
        </div>
    );
};

const Dashboard = () => {
    //const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // const jobData = {
    //     jobsPosted: 56,
    //     applicationsReceived: 45,
    //     activeJob: {
    //         title: 'Senior UI/UX designer',
    //         type: 'UI/UX',
    //         level: 'Senior-level',
    //         experience: 'Experienced',
    //         description: "We're seeking an experienced Senior UI/UX Designer to lead our design team in crafting seamless user experiences across our digital platforms. As a key player, you'll define design standards, mentor junior designers, and collaborate closely with stakeholders to translate business objectives into innovative design solutions.",
    //         applicationsCount: 156,
    //     },
    // };
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/jobs');
            setJobs(response.data);
            console.log(response)
            // setJobs(response.data); // Assuming response.data is an array of job objects
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchJobCount = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/jobsCount');
            const data = response.data.totalCount;
            console.log(data)
            setJobCount(data);
            console.log(jobCount)

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchJobCount();
    }, []); // Run once on component mount

    useEffect(() => {
        const searchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/searchJobs?title=${encodeURIComponent(searchQuery)}`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        // Trigger fetchJobs when searchQuery changes
        if (searchQuery !== '') {
            searchJobs();
        } else {
            // If searchQuery is empty, fetch all jobs again
            fetchJobs();
        }
    }, [searchQuery]);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Jobs</h1>
                <button className="bg-black text-white px-4 py-2 rounded">Create job listing</button>
            </div>
            <div className="flex justify-between mb-4">
                <div className="text-gray-600">Jobs Posted:{jobCount}</div>
                <div className="text-gray-600">Application received:</div>
            </div>
            <div className="mb-4">
                <input
                    className="border border-gray-300 px-4 py-2 w-full rounded"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div className='flex'>
                <div className=' w-64'>
                    <FilterSidebar />

                </div>
                <div className='w-full ml-4'>
                    {
                        searchQuery.length != 0 && filterJobs && jobs.map((job) => {
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="text-sm text-gray-500">posted 1 day ago</div>
                                </div>
                                <div className="flex mb-2">
                                    {
                                        job.category.map((category) => (
                                            <span key={category} className="bg-gray-200 text-gray-600 px-2 py-1 mr-2 rounded">{category}</span>
                                        ))
                                    }
                                </div>
                                <div className='flex'>

                                    <p className="text-gray-700 mb-4">{job.description}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        })
                    }


                    {
                        jobs.map((job) => (
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="text-sm text-gray-500">posted 1 day ago</div>
                                </div>
                                <div className="flex mb-2">
                                    {
                                        job.category.map((category) => (
                                            <span key={category} className="bg-gray-200 text-gray-600 px-2 py-1 mr-2 rounded">{category}</span>
                                        ))
                                    }

                                </div>
                                <div className='flex'>

                                    <p className="text-gray-700 mb-4">{job.description}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>


    );
};

export default Dashboard;
