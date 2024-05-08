import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../components/Filters';
// import { fetchActiveJobsStats } from '../utils';
//import useNavigate  from 'react-router-dom';

const Dashboard = () => {
    //const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [statistics, setStatistics] = useState({});


    const [activeJobsCountFilter, setActiveJobsCountFilter] = useState(0);

    const [activeTab, setActiveTab] = useState('active'); // State to track active tab
    const [archivedJobs, setArchivedJobs] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);
    const [draftJobs, setDraftJobs] = useState([]);

    const [open, setOpen] = useState(false);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const [filters, setFilters] = useState({
        jobType: [],
        experienceLevel: [],
        category: []
    });

    const [showDropdown, setShowDropdown] = useState(false);

    const [modalAction, setModalAction] = useState('');

    const handleAction = (action, jobId) => {
        setOpen(true);
        setSelectedJobId(jobId);
        setModalAction(action); // Set the type of action to manage modal content
    };

    const confirmAction = () => {
        if (modalAction === 'delete') {
            axios.delete(`http://localhost:8008/api/deleteJob/${selectedJobId}`)
                .then(() => {
                    console.log("Job deleted successfully");
                    setOpen(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Failed to delete the job", error);
                });
        }
        if (modalAction === 'archive') {
            axios.put(`http://localhost:8008/api/archiveJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job archived successfully:", response.data.message);
                    // Update the state to reflect the change without reloading:
                    const updatedJobs = activeJobs.map(job => {
                        if (job._id === selectedJobId) {
                            return { ...job, status: 'archived' };
                        }
                        return job;
                    });
                    setActiveJobs(updatedJobs);
                    setOpen(false);
                    window.location.reload();
                    // Alternatively, you could reload the page if state management gets too complex:
                    // window.location.reload();
                })
                .catch(error => {
                    console.error("Failed to archive the job", error.response ? error.response.data.message : "No additional error information");
                    // Handle error in UI
                });
        }
        if (modalAction === 'unarchive') {
            axios.put(`http://localhost:8008/api/unarchiveJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job archived successfully:", response.data.message);
                    // Update the state to reflect the change without reloading:
                    const updatedJobs = archivedJobs.map(job => {
                        if (job._id === selectedJobId) {
                            return { ...job, status: 'active' };
                        }
                        return job;
                    });
                    setArchivedJobs(updatedJobs);
                    setOpen(false);
                    window.location.reload();
                    // Alternatively, you could reload the page if state management gets too complex:
                    // window.location.reload();
                })
                .catch(error => {
                    console.error("Failed to archive the job", error.response ? error.response.data.message : "No additional error information");
                    // Handle error in UI
                });
        }
        // Add further actions like edit or archive if needed
    };


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

    const fetchActiveJobsStats = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/activeJobsFilterCount');
            setActiveJobsCountFilter(response.data);
        } catch (error) {
            console.error('Error fetching job statistics:', error);
        }
        console.log("hers the data" + statistics)
    };

    const [selectedJobId, setSelectedJobId] = useState(null);
    const handleDelete = (jobId) => {
        setOpen(true);
        setSelectedJobId(jobId); // Store job ID to be accessible for the delete confirmation
    };
    const handleArchive = (jobId) => {
        setOpen(true);
        setSelectedJobId(jobId); // Store job ID to be accessible for the delete confirmation
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8008/api/deleteJob/${selectedJobId}`)
            .then(response => {
                const updatedJobs = activeJobs.filter(job => job._id !== selectedJobId);
                setActiveJobs(updatedJobs);
                console.log("Job deleted successfully");
                setOpen(false);
                window.location.reload(); // Reload the page to reflect changes
                // Here you can also refresh the job list or handle the UI update
            })
            .catch(error => {
                console.error("Failed to delete the job", error);
                // Handle error appropriately in the UI
            });
    };

    useEffect(() => {
        fetchFilterJobs();
    }, [filters]); // Trigger fetchJobs whenever filters change  

    useEffect(() => {
        fetchJobs();
        fetchJobCount();
        fetchStatistics();
        fetchActiveJobsStats();
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

    useEffect(() => {
        // Filter jobs based on status
        const activeJobsFiltered = jobs.filter(job => job.status === 'active');
        const draftJobsFiltered = jobs.filter(job => job.status === 'draft');
        const archivedJobsFiltered = jobs.filter(job => job.status === 'archived');
        setActiveJobs(activeJobsFiltered);
        setDraftJobs(draftJobsFiltered);
        setArchivedJobs(archivedJobsFiltered);
    }, [jobs]); // Trigger filtering when jobs data changes

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const reveredJobArray = jobs.reverse();

    return (
        <div className="mx-24 pt-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Jobs</h1>
                <Link to="/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link>
                {/* <button className="bg-black text-white px-4 py-2 rounded">Create job listing</button> */}
            </div>
            <div className='flex gap-3'>

                <div className="flex justify-between mb-4">
                    <div className='bg-gray-100 flex flex-col p-2 rounded-md'>

                        <div className="text-gray-600" >Total Jobs:</div>
                        <h1 className='text-2xl'>{jobCount}</h1>
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div className='bg-gray-100 flex flex-col p-2 rounded-md'>

                        <div className="text-gray-600" >Application Received:</div>
                        <h1 className='text-2xl'>0</h1>
                    </div>
                </div>
            </div>


            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <span className={activeTab === 'active' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('active')}>Active Jobs ({statistics?.totalActiveJobs})</span>
                    <span className={activeTab === 'draft' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('draft')}>Draft Jobs ({statistics?.totalDraftJobs})</span>
                    <span className={activeTab === 'archived' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('archived')}>Archived Jobs ({statistics?.totalArchivedJobs})</span>
                </div>
                <div className="mb-4 w-[360px]">
                    <input
                        className="border border-gray-300 px-4 py-2 w-full rounded"
                        placeholder="Job title or keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className='flex'>
                <Filters filters={filters} statistics={activeJobsCountFilter} handleCheckboxChange={handleCheckboxChange} activeTab={activeTab} />
                <div className='w-full ml-4'>

                    {
                        searchQuery.length != 0 && filterJobs && jobs.map((job) => {
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="text-sm text-gray-500">posted 1 day ago</div>
                                </div>
                                <div className="flex mb-2">
                                    {/* {
                                        job.category.map((category) => (
                                            <span key={category} className="bg-gray-200 text-gray-600 px-2 py-1 mr-2 rounded">{category}</span>
                                        ))
                                    } */}
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



                    {/* Display jobs based on active tab */}
                    {activeTab === 'active' &&
                        activeJobs.map((job) => (
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div>
                                        {/* <div onClick={() => handleDelete(job._id)}>Delete</div>
                                        <div onClick={() => handleArchive(job._id)}>Edit</div>
                                        <div onClick={() => setOpen(true)}>Archived</div>
                                         */}
                                        <button onClick={() => handleAction('delete', job._id)}>Delete</button>
                                        <button onClick={() => handleAction('edit', job._id)}>Edit</button>
                                        <button onClick={() => handleAction('archive', job._id)}>Archive</button>

                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{job.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))}
                    {activeTab === 'draft' &&
                        draftJobs.map((job) => (
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <h2 className="text-lg font-bold">{job.title}</h2>
                                <p className="text-gray-700 mb-4">{job.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))}
                    {activeTab === 'archived' &&
                        archivedJobs.map((job) => (
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                                <div className='flex justify-between'>
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div>
                                        {/* <div onClick={() => handleDelete(job._id)}>Delete</div>
                                        <div onClick={() => handleArchive(job._id)}>Edit</div>
                                        <div onClick={() => setOpen(true)}>Archived</div>
                                         */}
                                        {/* <button onClick={() => handleAction('delete', job._id)}>Delete</button> */}
                                        {/* <button onClick={() => handleAction('edit', job._id)}>Edit</button> */}
                                        <button onClick={() => handleAction('unarchive', job._id)}>Unarchive</button>

                                    </div>
                                </div>
                                {/* <h2 className="text-lg font-bold">{job.title}</h2> */}
                                <p className="text-gray-700 mb-4">{job.description}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))}

                </div>

            </div>
            <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />

        </div>


    );
};

export default Dashboard;


const Modal = ({ open, onClose, action, confirmAction }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                {/* <div className="text-center w-56">
                    <h3 className="text-lg font-black text-gray-800">{action === 'delete' ? 'Confirm Delete' : action === 'edit' ? 'Confirm Edit' : 'Confirm Archive'}</h3>
                    <p className="text-sm text-gray-500">
                        {action === 'delete' ? 'Are you sure you want to delete this item?' : action === 'edit' ? 'Are you sure you want to edit this item?' : 'Are you sure you want to archive this item?'}
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-danger w-full" onClick={confirmAction}>Confirm</button>
                        <button className="btn btn-light w-full" onClick={onClose}>Cancel</button>
                    </div>
                </div> */}
                <div className="text-center w-56">
                    <h3 className="text-lg font-black text-gray-800">
                        {action === 'delete' ? 'Confirm Delete' :
                            action === 'edit' ? 'Confirm Edit' :
                                action === 'unarchive' ? 'Confirm Unarchive' : 'Confirm Archive'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {action === 'delete' ? 'Are you sure you want to delete this item?' :
                            action === 'edit' ? 'Are you sure you want to edit this item?' :
                                action === 'unarchive' ? 'Are you sure you want to unarchive this item?' :
                                    'Are you sure you want to archive this item?'}
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-danger w-full" onClick={confirmAction}>
                            Confirm
                        </button>
                        <button className="btn btn-light w-full" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};