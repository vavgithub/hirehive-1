import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Filters from '../../components/Filters';
import { useNavigate } from 'react-router-dom';
import ArchiveIcon from '../../svg/ArchivedIcon';
import EditIcon from '../../svg/EditIcon';
import DeleteIcon from '../../svg/DeleteIcon';
import ThreeDotsIcon from '../../svg/ThreeDotsIcon';
import AppliedIcon from '../../svg/AppliedIcon';
import ClickIcon from '../../svg/ClickIcon';
import ProcessedIcon from '../../svg/ProcessedIcon';
import ClockIcon from '../../svg/ClockIcon';
import { getTimeAgo } from '../../utility/getTimeAgo';
// import ThreeDots from '../../svg/ThreeDots';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [filterJobs, setFilterJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [statistics, setStatistics] = useState({});

    const [activeJobsCountFilter, setActiveJobsCountFilter] = useState(0);
    const [activeTab, setActiveTab] = useState('active');
    const [archivedJobs, setArchivedJobs] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);
    const [draftJobs, setDraftJobs] = useState([]);

    const [open, setOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [modalAction, setModalAction] = useState('');

    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const [filters, setFilters] = useState({
        jobType: [],
        experienceLevel: [],
        category: []
    });

    const handleAction = (action, jobId) => {
        setOpen(true);
        setSelectedJobId(jobId);
        setModalAction(action);
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
                    const updatedJobs = activeJobs.map(job => {
                        if (job._id === selectedJobId) {
                            return { ...job, status: 'archived' };
                        }
                        return job;
                    });
                    setActiveJobs(updatedJobs);
                    setOpen(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Failed to archive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'unarchive') {
            axios.put(`http://localhost:8008/api/unarchiveJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job unarchived successfully:", response.data.message);
                    const updatedJobs = archivedJobs.map(job => {
                        if (job._id === selectedJobId) {
                            return { ...job, status: 'active' };
                        }
                        return job;
                    });
                    setArchivedJobs(updatedJobs);
                    setOpen(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Failed to unarchive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'edit') {
            navigate(`/admin/edit-job/${selectedJobId}`);
        }
    };

    const handleCheckboxChange = (filterType, value) => {
        const updatedFilters = { ...filters };
        const index = updatedFilters[filterType].indexOf(value);

        if (index !== -1) {
            updatedFilters[filterType].splice(index, 1);
        } else {
            updatedFilters[filterType].push(value);
        }

        setFilters(updatedFilters);
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchJobCount = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/jobsCount');
            const data = response.data.totalCount;
            setJobCount(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFilterJobs = async () => {
        try {
            const response = await axios.post('http://localhost:8008/api/filterJobs', { filters });
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

    const fetchActiveJobsStats = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/activeJobsFilterCount');
            setActiveJobsCountFilter(response.data);
        } catch (error) {
            console.error('Error fetching job statistics:', error);
        }
    };

    const [draftJobsCountFilter, setDraftJobsCountFilter] = useState(0);

    const fetchDraftsJobsStats = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/draftJobsFilterCount');
            setDraftJobsCountFilter(response.data);
        } catch (error) {
            console.error('Error fetching job statistics:', error);
        }
    };

    useEffect(() => {
        fetchFilterJobs();
    }, [filters]);

    useEffect(() => {
        fetchJobs();
        fetchJobCount();
        fetchStatistics();
        fetchActiveJobsStats();
        fetchDraftsJobsStats();
    }, []);

    useEffect(() => {
        const searchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/searchJobs?title=${encodeURIComponent(searchQuery)}`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        if (searchQuery !== '') {
            searchJobs();
        } else {
            fetchJobs();
        }
    }, [searchQuery]);

    useEffect(() => {
        const activeJobsFiltered = jobs.filter(job => job.status === 'active');
        const draftJobsFiltered = jobs.filter(job => job.status === 'draft');
        const archivedJobsFiltered = jobs.filter(job => job.status === 'archived');
        setActiveJobs(activeJobsFiltered);
        setDraftJobs(draftJobsFiltered);
        setArchivedJobs(archivedJobsFiltered);
    }, [jobs]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const reveredJobArray = jobs.reverse();

    const token = localStorage.getItem('accessToken');
    if (token == null) {
        return <Navigate to="/auth/login" replace />
    }

    const handleKnowMore = (key) => {
        navigate(`/admin/view-job/${key}`);
    }

    const filtersConfig = activeTab === 'active' ? activeJobsCountFilter : draftJobsCountFilter;

    return (
        <div className="mx-24 pt-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Jobs</h1>
                <Link to="/admin/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link>
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
            <div className='flex'>
                <div>
                    <div className='w-64'>
                        <input
                            className="border border-gray-300 px-4 py-2 w-full rounded mb-4"
                            placeholder="Job title or keyword"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <Filters filters={filters} statistics={filtersConfig} handleCheckboxChange={handleCheckboxChange} activeTab={activeTab} />
                </div>
                <div className='w-full ml-4'>
                    <div className='flex justify-center mb-4'>
                        <div className='flex gap-6 p-2 bg-gray-300 w-max rounded-md items-center'>
                            <span className={activeTab === 'active' ? 'bg-white cursor-pointer p-1 rounded-md' : 'cursor-pointer'} onClick={() => handleTabClick('active')}>Open ({statistics?.totalActiveJobs})</span>
                            <span className={activeTab === 'draft' ? 'bg-white cursor-pointer p-1 rounded-md' : 'cursor-pointer'} onClick={() => handleTabClick('draft')}>Closed ({statistics?.totalDraftJobs})</span>
                            <span className={activeTab === 'archived' ? 'bg-white cursor-pointer p-1 rounded-md' : 'cursor-pointer'} onClick={() => handleTabClick('archived')}>Draft ({statistics?.totalArchivedJobs})</span>
                        </div>
                    </div>
                    {searchQuery.length !== 0 && filterJobs && jobs.map((job) => (
                        <div key={job._id} className="bg-white shadow rounded p-4 mb-4 w-[100%]">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-bold">{job.title}</h2>
                                <div className="text-sm text-gray-500">posted 1 day ago</div>
                            </div>
                            <div className="flex mb-2"></div>
                            <div className='flex'>
                                <p className="text-gray-700 mb-4">{job.description}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-gray-600">
                                    <span className="font-bold">{job.applicationsCount}</span> applied
                                </div>
                                <Link to={`/job/${job._id}`} className="bg-black text-white px-4 py-2 rounded"></Link>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'active' &&
                        activeJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} />
                        ))
                    }
                    {activeTab === 'draft' &&
                        draftJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} />
                        ))
                    }
                    {activeTab === 'archived' &&
                        archivedJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} />
                        ))
                    }
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />
        </div>
    );
};

export default Dashboard;



const JobCard = ({ job, status, handleAction }) => {
    const formattedCreatedAt = getTimeAgo(job.createdAt);
    return (
        <div className="p-4 bg-white shadow rounded mb-4">
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

const ThreeDots = ({ job, handleAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu} className="focus:outline-none">
                <ThreeDotsIcon /> {/* This is the three dots icon */}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">

                    {job.status == 'active' && (
                        <ul className="py-1">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('edit', job._id)}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('archive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('unarchive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Close job</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('delete', job._id)}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                        </ul>
                    )
                    }
                    {job.status == 'draft' && (
                        <ul className="py-1">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('edit', job._id)}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('archive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                        </ul>
                    )
                    }


                </div>
            )}
        </div>
    );
};

const Modal = ({ open, onClose, action, confirmAction }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
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
