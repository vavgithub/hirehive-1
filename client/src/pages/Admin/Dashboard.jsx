import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Filters from '../../components/Filters';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import JobCard from '../../components/JobCard';
import Slider from '../../components/Slider';
import Tabs from '../../components/Tabs';


const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
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
                const filteredJobs = response.data.filter(job => job.status === activeTab);
                setJobs(filteredJobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        if (searchQuery !== '') {
            searchJobs();
        } else {
            fetchJobs();
        }
    }, [searchQuery, activeTab]);

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

    const token = localStorage.getItem('accessToken');
    if (token == null) {
        return <Navigate to="/auth/login" replace />
    }

    const filtersConfig = activeTab === 'active' ? activeJobsCountFilter : draftJobsCountFilter;

    const handleViewJob = (jobId) => {
        console.log("am i clicking", jobId)
        navigate(`/admin/view-job/${jobId}`);
    }
    const tabs = [
        { name: 'active', label: 'Open', count: statistics?.totalActiveJobs },
        { name: 'draft', label: 'Draft', count: statistics?.totalDraftJobs },
        { name: 'archived', label: 'Archived', count: statistics?.totalArchivedJobs },
    ];

    return (
        <div className="ml-52 pt-4">
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
                    {/* <Slider  min={0} max={20} /> */}
                    <Filters filters={filters} statistics={filtersConfig} handleCheckboxChange={handleCheckboxChange} activeTab={activeTab} />
                </div>
                <div className='w-full ml-4'>
                    <div className='flex justify-center mb-4'>
                        {/* <div className='flex gap-6 p-2 bg-gray-300 w-max rounded-md items-center'>
                            <span className={activeTab === 'active' ? 'bg-white cursor-pointer p-1 rounded-md w-32 flex justify-center' : 'cursor-pointer w-32 flex justify-center'} onClick={() => handleTabClick('active')}>Open ({statistics?.totalActiveJobs})</span>
                            <span className={activeTab === 'draft' ? 'bg-white cursor-pointer p-1 rounded-md w-32 flex justify-center' : 'cursor-pointer w-32 flex justify-center'} onClick={() => handleTabClick('draft')}>Closed ({statistics?.totalDraftJobs})</span>
                            <span className={activeTab === 'archived' ? 'bg-white cursor-pointer p-1 rounded-md w-32 flex justify-center' : 'cursor-pointer w-32 flex justify-center'} onClick={() => handleTabClick('archived')}>Draft ({statistics?.totalArchivedJobs})</span>
                        </div> */}
                         <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
                    </div>
                    {searchQuery.length === 0 && activeTab === 'active' &&
                        activeJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} onClick={()=>handleViewJob(job._id)} />
                        ))
                    }
                    {searchQuery.length === 0 && activeTab === 'draft' &&
                        draftJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} onClick={()=>handleViewJob(job._id)} />
                        ))
                    }
                    {searchQuery.length === 0 && activeTab === 'archived' &&
                        archivedJobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction} onClick={()=>handleViewJob(job._id)}/>
                        ))
                    }
                    {searchQuery.length !== 0 &&
                        jobs.map((job) => (
                            <JobCard key={job._id} job={job} status={activeTab} handleAction={handleAction}  onClick={()=>handleViewJob(job._id)}/>
                        ))
                    }
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />
        </div>
    );
};
export default Dashboard;
