import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import useNavigate  from 'react-router-dom';



const Dashboard = () => {
    //const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [statistics, setStatistics] = useState({});
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    const [filters, setFilters] = useState({
        jobType: [],
        experienceLevel: [],
        jobFunction: []
    });

    const handleCheckboxChange = (filterType, value) => {
        const updatedFilters = { ...filters };
        const index = updatedFilters[filterType].indexOf(value);

        if (index !== -1) {
            updatedFilters[filterType].splice(index, 1); // Remove filter
        } else {
            updatedFilters[filterType].push(value); // Add filter
        }

        setFilters(updatedFilters);
    };


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

    const fetchFilterJobs = async () => {
        try {
            const response = await axios.post('http://localhost:8008/api/filterJobs', { filters });
            console.log("yeh kya hai buhaiji", response.data)
            console.log(filters)
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching filtered jobs:', error);
        }
    };
    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/jobsStats');
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching job statistics:', error);
        }
    };

    useEffect(() => {
        fetchFilterJobs();
    }, [filters]); // Trigger fetchJobs whenever filters change  

    useEffect(() => {
        fetchJobs();
        fetchJobCount();
        fetchStatistics();
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
                    <div className="bg-gray-100 p-4 rounded-md">
                        <div className="mb-4 text-left">
                            <h3 className="text-gray-800 font-semibold mb-2">Job Type</h3>
                            <div>
                                <div className='flex justify-normal'>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value="fulltime"
                                            checked={filters.jobType.includes('fulltime')}
                                            onChange={() => handleCheckboxChange('jobType', 'fulltime')}
                                        />
                                        <span className="ml-2 text-gray-700">Full-time</span>
                                    </label>
                                        <p>{statistics.totalFullTimeJobs || 0}</p>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-normal'>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value="internship"
                                            checked={filters.jobType.includes('internship')}
                                            onChange={() => handleCheckboxChange('jobType', 'internship')}
                                        />
                                        <span className="ml-2 text-gray-700">Internship</span>
                                    </label>
                                    <p> {statistics.totalInternships || 0}</p>
                                </div>
                            </div>
                        </div>


                        <div className="mb-4 text-left">
                            <h3 className="text-gray-800 font-semibold mb-2">Exprience Level</h3>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="entry"
                                        checked={filters.experienceLevel.includes('entry')}
                                        onChange={() => handleCheckboxChange('experienceLevel', 'entry')}
                                    />
                                    <span className="ml-2 text-gray-700">Entry Level</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="intermidiate"
                                        checked={filters.experienceLevel.includes('intermidiate')}
                                        onChange={() => handleCheckboxChange('experienceLevel', 'intermidiate')}
                                    />
                                    <span className="ml-2 text-gray-700">Intermediate</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="senior"
                                        checked={filters.experienceLevel.includes('senior')}
                                        onChange={() => handleCheckboxChange('experienceLevel', 'senior')}
                                    />
                                    <span className="ml-2 text-gray-700">Senior Level</span>
                                </label>
                            </div>
                        </div>

                        {/* Job Fucntionining */}

                        <div className="mb-4 text-left">
                            <h3 className="text-gray-800 font-semibold mb-2">Job Function</h3>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="design"
                                        checked={filters.jobFunction.includes('design')}
                                        onChange={() => handleCheckboxChange('jobFunction', 'design')}
                                    />
                                    <span className="ml-2 text-gray-700">Design</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="engineering"
                                        checked={filters.jobFunction.includes('engineering')}
                                        onChange={() => handleCheckboxChange('jobFunction', 'engineering')}
                                    />
                                    <span className="ml-2 text-gray-700">Engineering</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="sales"
                                        checked={filters.jobFunction.includes('sales')}
                                        onChange={() => handleCheckboxChange('jobFunction', 'sales')}
                                    />
                                    <span className="ml-2 text-gray-700">Sales</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value="marketing"
                                        checked={filters.jobFunction.includes('marketing')}
                                        onChange={() => handleCheckboxChange('jobFunction', 'marketing')}
                                    />
                                    <span className="ml-2 text-gray-700">Marketing</span>
                                </label>
                            </div>
                        </div>
                    </div>
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
