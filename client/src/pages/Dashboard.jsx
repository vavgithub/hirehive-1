import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../components/Filters';
// import { fetchActiveJobsStats } from '../utils';
import { useNavigate } from 'react-router-dom';


const ArchiveIcon = () => {
    return (

        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.333 5.66667C18.333 5.20643 17.9599 4.83333 17.4997 4.83333C17.0394 4.83333 16.6663 5.20643 16.6663 5.66667H18.333ZM17.4997 16.5V17.3333C17.9599 17.3333 18.333 16.9602 18.333 16.5H17.4997ZM2.49967 16.5H1.66634C1.66634 16.9602 2.03944 17.3333 2.49967 17.3333V16.5ZM3.33301 5.66667C3.33301 5.20643 2.95991 4.83333 2.49967 4.83333C2.03944 4.83333 1.66634 5.20643 1.66634 5.66667H3.33301ZM0.833008 1.5V0.666667C0.372771 0.666667 -0.000325501 1.03976 -0.000325501 1.5L0.833008 1.5ZM19.1663 1.5H19.9997C19.9997 1.03976 19.6266 0.666667 19.1663 0.666667V1.5ZM19.1663 5.66667V6.5C19.6266 6.5 19.9997 6.1269 19.9997 5.66667H19.1663ZM0.833008 5.66667H-0.000325501C-0.000325501 6.1269 0.372771 6.5 0.833008 6.5L0.833008 5.66667ZM8.33301 8.16667C7.87277 8.16667 7.49967 8.53976 7.49967 9C7.49967 9.46024 7.87277 9.83333 8.33301 9.83333V8.16667ZM11.6663 9.83333C12.1266 9.83333 12.4997 9.46024 12.4997 9C12.4997 8.53976 12.1266 8.16667 11.6663 8.16667V9.83333ZM16.6663 5.66667V16.5H18.333V5.66667H16.6663ZM17.4997 15.6667H2.49967V17.3333H17.4997V15.6667ZM3.33301 16.5V5.66667H1.66634V16.5H3.33301ZM0.833008 2.33333H19.1663V0.666667H0.833008V2.33333ZM18.333 1.5V5.66667H19.9997V1.5H18.333ZM19.1663 4.83333H0.833008V6.5H19.1663V4.83333ZM1.66634 5.66667V1.5H-0.000325501V5.66667H1.66634ZM8.33301 9.83333H11.6663V8.16667H8.33301V9.83333Z" fill="#2A2D3C" />
        </svg>


    )
}

const DeleteIcon = () => {
    return (


        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4997 3.3335V2.50016V3.3335ZM6.66634 3.3335V2.50016C6.42604 2.50016 6.19743 2.6039 6.03919 2.78474L6.66634 3.3335ZM0.833008 10.0002L0.205861 9.45141C-0.0690542 9.7656 -0.0690542 10.2347 0.205861 10.5489L0.833008 10.0002ZM6.66634 16.6668L6.03919 17.2156C6.19743 17.3964 6.42604 17.5002 6.66634 17.5002V16.6668ZM15.5889 8.08942C15.9144 7.76398 15.9144 7.23634 15.5889 6.91091C15.2635 6.58547 14.7359 6.58547 14.4104 6.91091L15.5889 8.08942ZM9.41042 11.9109C9.08498 12.2363 9.08498 12.764 9.41042 13.0894C9.73586 13.4149 10.2635 13.4149 10.5889 13.0894L9.41042 11.9109ZM10.5889 6.91091C10.2635 6.58547 9.73586 6.58547 9.41042 6.91091C9.08498 7.23634 9.08498 7.76398 9.41042 8.08942L10.5889 6.91091ZM14.4104 13.0894C14.7359 13.4149 15.2635 13.4149 15.5889 13.0894C15.9144 12.764 15.9144 12.2363 15.5889 11.9109L14.4104 13.0894ZM17.4997 2.50016H6.66634V4.16683H17.4997V2.50016ZM6.03919 2.78474L0.205861 9.45141L1.46016 10.5489L7.29349 3.88225L6.03919 2.78474ZM0.205861 10.5489L6.03919 17.2156L7.29349 16.1181L1.46016 9.45141L0.205861 10.5489ZM6.66634 17.5002H17.4997V15.8335H6.66634V17.5002ZM17.4997 17.5002C18.1627 17.5002 18.7986 17.2368 19.2674 16.7679L18.0889 15.5894C17.9326 15.7457 17.7207 15.8335 17.4997 15.8335V17.5002ZM19.2674 16.7679C19.7363 16.2991 19.9997 15.6632 19.9997 15.0002H18.333C18.333 15.2212 18.2452 15.4331 18.0889 15.5894L19.2674 16.7679ZM19.9997 15.0002V5.00016H18.333V15.0002H19.9997ZM19.9997 5.00016C19.9997 4.33712 19.7363 3.70124 19.2674 3.2324L18.0889 4.41091C18.2452 4.56719 18.333 4.77915 18.333 5.00016H19.9997ZM19.2674 3.2324C18.7986 2.76355 18.1627 2.50016 17.4997 2.50016L17.4997 4.16683C17.7207 4.16683 17.9326 4.25463 18.0889 4.41091L19.2674 3.2324ZM14.4104 6.91091L9.41042 11.9109L10.5889 13.0894L15.5889 8.08942L14.4104 6.91091ZM9.41042 8.08942L14.4104 13.0894L15.5889 11.9109L10.5889 6.91091L9.41042 8.08942Z" fill="#2A2D3C" />
        </svg>


    )
}

const EditIcon = () => {
    return (


        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_742_946)">
                <path d="M9.16699 4.16653C9.62723 4.16653 10.0003 3.79343 10.0003 3.3332C10.0003 2.87296 9.62723 2.49986 9.16699 2.49986V4.16653ZM3.33366 3.3332V2.49986V3.3332ZM1.66699 4.99986H0.833659H1.66699ZM1.66699 16.6665H0.833659H1.66699ZM2.15515 17.845L1.56589 18.4343L2.15515 17.845ZM16.1788 17.845L16.7681 18.4343L16.1788 17.845ZM17.5003 10.8332C17.5003 10.373 17.1272 9.99986 16.667 9.99986C16.2068 9.99986 15.8337 10.373 15.8337 10.8332H17.5003ZM15.417 2.0832L14.8277 1.49394L15.417 2.0832ZM16.667 1.56543V0.732096V1.56543ZM17.917 2.0832L17.3277 2.67245L17.917 2.0832ZM17.917 4.5832L17.3277 3.99394L17.917 4.5832ZM10.0003 12.4999L10.2024 13.3083C10.349 13.2717 10.4828 13.1959 10.5896 13.0891L10.0003 12.4999ZM6.66699 13.3332L5.85854 13.1311C5.78755 13.4151 5.87075 13.7155 6.07774 13.9225C6.28472 14.1294 6.58513 14.2126 6.8691 14.1416L6.66699 13.3332ZM7.50033 9.99986L6.91107 9.41061C6.80427 9.51741 6.72851 9.65122 6.69187 9.79775L7.50033 9.99986ZM9.16699 2.49986H3.33366V4.16653H9.16699V2.49986ZM3.33366 2.49986C2.67062 2.49986 2.03473 2.76326 1.56589 3.2321L2.7444 4.41061C2.90068 4.25433 3.11264 4.16653 3.33366 4.16653V2.49986ZM1.56589 3.2321C1.09705 3.70094 0.833659 4.33682 0.833659 4.99986H2.50033C2.50033 4.77885 2.58812 4.56689 2.7444 4.41061L1.56589 3.2321ZM0.833659 4.99986V16.6665H2.50033V4.99986H0.833659ZM0.833659 16.6665C0.833659 17.3296 1.09705 17.9655 1.56589 18.4343L2.7444 17.2558C2.58812 17.0995 2.50033 16.8875 2.50033 16.6665H0.833659ZM1.56589 18.4343C2.03473 18.9031 2.67062 19.1665 3.33366 19.1665V17.4999C3.11265 17.4999 2.90068 17.4121 2.7444 17.2558L1.56589 18.4343ZM3.33366 19.1665H15.0003V17.4999H3.33366V19.1665ZM15.0003 19.1665C15.6634 19.1665 16.2993 18.9031 16.7681 18.4343L15.5896 17.2558C15.4333 17.4121 15.2213 17.4999 15.0003 17.4999V19.1665ZM16.7681 18.4343C17.2369 17.9655 17.5003 17.3296 17.5003 16.6665H15.8337C15.8337 16.8875 15.7459 17.0995 15.5896 17.2558L16.7681 18.4343ZM17.5003 16.6665V10.8332H15.8337V16.6665H17.5003ZM16.0062 2.67245C16.1815 2.49721 16.4192 2.39876 16.667 2.39876V0.732096C15.9771 0.732096 15.3155 1.00614 14.8277 1.49394L16.0062 2.67245ZM16.667 2.39876C16.9148 2.39876 17.1525 2.49721 17.3277 2.67245L18.5062 1.49394C18.0184 1.00614 17.3568 0.732096 16.667 0.732096V2.39876ZM17.3277 2.67245C17.503 2.84769 17.6014 3.08537 17.6014 3.3332H19.2681C19.2681 2.64334 18.994 1.98174 18.5062 1.49394L17.3277 2.67245ZM17.6014 3.3332C17.6014 3.58102 17.503 3.8187 17.3277 3.99394L18.5062 5.17245C18.994 4.68465 19.2681 4.02305 19.2681 3.3332H17.6014ZM17.3277 3.99394L9.41107 11.9106L10.5896 13.0891L18.5062 5.17245L17.3277 3.99394ZM9.79821 11.6914L6.46488 12.5247L6.8691 14.1416L10.2024 13.3083L9.79821 11.6914ZM7.47544 13.5353L8.30878 10.202L6.69187 9.79775L5.85854 13.1311L7.47544 13.5353ZM8.08958 10.5891L16.0062 2.67245L14.8277 1.49394L6.91107 9.41061L8.08958 10.5891Z" fill="#2A2D3C" />
            </g>
            <defs>
                <clipPath id="clip0_742_946">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>


    )
}

const Dashboard = () => {
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
    const navigate = useNavigate();

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
        if (modalAction === 'edit') {
            console.log("check i am wokring or not")
            navigate(`/edit-job/${selectedJobId}`)
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
    // const handleDelete = (jobId) => {
    //     setOpen(true);
    //     setSelectedJobId(jobId); // Store job ID to be accessible for the delete confirmation
    // };
    // const handleArchive = (jobId) => {
    //     setOpen(true);
    //     setSelectedJobId(jobId); // Store job ID to be accessible for the delete confirmation
    // };

    // const confirmDelete = () => {
    //     axios.delete(`http://localhost:8008/api/deleteJob/${selectedJobId}`)
    //         .then(response => {
    //             const updatedJobs = activeJobs.filter(job => job._id !== selectedJobId);
    //             setActiveJobs(updatedJobs);
    //             console.log("Job deleted successfully");
    //             setOpen(false);
    //             window.location.reload(); // Reload the page to reflect changes
    //             // Here you can also refresh the job list or handle the UI update
    //         })
    //         .catch(error => {
    //             console.error("Failed to delete the job", error);
    //             // Handle error appropriately in the UI
    //         });
    // };

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
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-full group relative overflow-hidden h-auto">
                                <div className='flex justify-between items-center'>
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="absolute  right-0 top-0 bottom-0 flex flex-col  pr-4 translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out">
                                        <div className='flex items-center  justify-between'>
                                            <button onClick={() => handleAction('delete', job._id)} className="text-black rounded m-1">Delete</button>
                                            <DeleteIcon />
                                        </div>
                                        <div className='flex items-center justify-between '>
                                            <button onClick={() => handleAction('edit', job._id)} className="text-black rounded m-1">Edit</button>
                                            <EditIcon />

                                        </div>
                                        <div className='flex items-center justify-between '>

                                            <button onClick={() => handleAction('archive', job._id)} className="text-black rounded m-1">Archive</button>
                                            <ArchiveIcon />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4 w-[90%]">{job.description}</p>
                                <div className="flex justify-between items-center pt-4">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))
                    }
                    {activeTab === 'draft' &&
                        draftJobs.map((job) => (
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-full group relative overflow-hidden h-auto">
                                <div className='flex justify-between items-center'>
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="absolute  right-0 top-0 bottom-0 flex flex-col  pr-4 translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out">
                                        <div className='flex items-center  justify-between'>
                                            <button onClick={() => handleAction('delete', job._id)} className="text-black rounded m-1">Delete</button>
                                            <DeleteIcon />
                                        </div>
                                        <div className='flex items-center justify-between '>
                                            <button onClick={() => handleAction('edit', job._id)} className="text-black rounded m-1">Edit</button>
                                            <EditIcon />

                                        </div>
                                        {/* <div className='flex items-center justify-between '>

                                            <button onClick={() => handleAction('archive', job._id)} className="text-black rounded m-1">Archive</button>
                                            <ArchiveIcon />
                                        </div> */}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4 w-[90%]" style={{width:"90%"}}>{job.description}</p>
                                <div className="flex justify-between items-center pt-4">
                                    <div className="text-gray-600">
                                        <span className="font-bold">{job.applicationsCount}</span> applied
                                    </div>
                                    <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                                </div>
                            </div>
                        ))}
                    {activeTab === 'archived' &&
                        archivedJobs.map((job) => (
                            // <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                            //     <div className='flex justify-between'>
                            //         <h2 className="text-lg font-bold">{job.title}</h2>
                            //         <div>
                            //             {/* <div onClick={() => handleDelete(job._id)}>Delete</div>
                            //             <div onClick={() => handleArchive(job._id)}>Edit</div>
                            //             <div onClick={() => setOpen(true)}>Archived</div>
                            //              */}
                            //             {/* <button onClick={() => handleAction('delete', job._id)}>Delete</button> */}
                            //             {/* <button onClick={() => handleAction('edit', job._id)}>Edit</button> */}
                            //             <button onClick={() => handleAction('unarchive', job._id)}>Unarchive</button>
                            //             <button onClick={() => handleAction('delete', job._id)}>Delete</button>

                            //         </div>
                            //     </div>
                            //     {/* <h2 className="text-lg font-bold">{job.title}</h2> */}
                            //     <p className="text-gray-700 mb-4">{job.description}</p>
                            //     <div className="flex justify-between items-center">
                            //         <div className="text-gray-600">
                            //             <span className="font-bold">{job.applicationsCount}</span> applied
                            //         </div>
                            //         <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded">Know More</Link>
                            //     </div>
                            // </div>
                            <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-full group relative overflow-hidden h-auto">
                                <div className='flex justify-between items-center'>
                                    <h2 className="text-lg font-bold">{job.title}</h2>
                                    <div className="absolute  right-0 top-0 bottom-0 flex flex-col  pr-4 translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out">

                                        <div className='flex items-center justify-between '>
                                            <button onClick={() => handleAction('unarchive', job._id)} className="text-black rounded m-1">Unarchive</button>
                                            <EditIcon />

                                        </div>
                                        <div className='flex items-center  justify-between'>
                                            <button onClick={() => handleAction('delete', job._id)} className="text-black rounded m-1">Delete</button>
                                            <DeleteIcon />
                                        </div>

                                        {/* <div className='flex items-center justify-between '>

                                            <button onClick={() => handleAction('archive', job._id)} className="text-black rounded m-1">Archive</button>
                                            <ArchiveIcon />
                                        </div> */}
                                    </div>
                                </div>
                               
                                    <p className="text-gray-700 mb-4 w-[90%]">{job.description}</p>
                             

                                <div className="flex justify-between items-center pt-4">
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