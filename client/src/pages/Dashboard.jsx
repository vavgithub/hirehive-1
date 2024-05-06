import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../components/Filters';
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

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

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
        console.log("hers the data" + statistics)
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
        <div className="mx-24 pt-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Jobs</h1>
                <Link to="/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link>
                {/* <button className="bg-black text-white px-4 py-2 rounded">Create job listing</button> */}
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
                <Filters filters={filters} statistics={statistics} handleCheckboxChange={handleCheckboxChange} />
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
                                    {/* <div className="text-sm text-gray-500">posted 1 day ago</div> */}
                                    <button className="text-gray-500 focus:outline-none" onClick={toggleDropdown}>
                                        &#8230; {/* Three dots */}
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-4 top-8 bg-white shadow rounded py-2">
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit</button>
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</button>
                                        </div>
                                    )}
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
