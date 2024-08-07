import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Filters from '../../components/Filters';
import Modal from '../../components/Modal';
import JobCard from '../../components/JobCard';
import Tabs from '../../components/Tabs';
import StatsGrid from '../../components/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import three from '../../svg/StatsCard/Jobs Page/three';
import { Button } from '../../components/ui/Button';


const api = axios.create({
    baseURL: 'http://localhost:8008/api',
});


const fetchJobs = () => api.get('/jobs').then(res => res.data);
const fetchJobCount = () => api.get('/jobsCount').then(res => res.data.totalCount);
const fetchStatistics = () => api.get('/jobsStats').then(res => res.data);
const fetchActiveJobsStats = () => api.get('/activeJobsFilterCount').then(res => res.data);
const fetchClosedJobsStats = () => api.get('/closedJobsFilterCount').then(res => res.data);
const searchJobs = (query) => api.get(`/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => api.post('/filterJobs', { filters }).then(res => res.data);

// Define action types
const ACTION_TYPES = {
    DELETE: 'DELETE',
    EDIT: 'EDIT',
    DRAFT: 'DRAFT',
    CLOSE: 'CLOSE',
    REJECT: 'REJECT',
    ARCHIVE: 'ARCHIVE',
};

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('open');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' }
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });
    const { data: jobCount = 0 } = useQuery({ queryKey: ['jobCount'], queryFn: fetchJobCount });
    const { data: statistics = {} } = useQuery({ queryKey: ['statistics'], queryFn: fetchStatistics });
    const { data: activeJobsCountFilter = {} } = useQuery({ queryKey: ['activeJobsStats'], queryFn: fetchActiveJobsStats });
    const { data: closedJobsCountFilter = {} } = useQuery({ queryKey: ['closedJobsStats'], queryFn: fetchClosedJobsStats });

    const handleAction = (action, job) => {
        setModalOpen(true);
        setSelectedJob(job);
        setModalAction(ACTION_TYPES[action.toUpperCase()]);
    };

    const { data: filteredJobs = [] } = useQuery({
        queryKey: ['filteredJobs', filters],
        queryFn: () => filterJobs(filters),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ),
    });

    const { data: searchResults = [] } = useQuery({
        queryKey: ['searchJobs', searchQuery],
        queryFn: () => searchJobs(searchQuery),
        enabled: searchQuery !== '',
    });

    const deleteMutation = useMutation({
        mutationFn: (jobId) => api.delete(`/deleteJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const draftMutation = useMutation({
        mutationFn: (jobId) => api.put(`/draftJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const unarchiveMutation = useMutation({
        mutationFn: (jobId) => api.put(`/unarchiveJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };



    const clearAllFilters = () => {
        setFilters({
            employmentType: [],
            experienceLevel: [],
            jobProfile: [],
            experience: { min: '', max: '' }
        });
    };

    const confirmAction = (job) => {
        switch (modalAction) {
            case ACTION_TYPES.DELETE:
                deleteMutation.mutate(job._id);
                break;
            case ACTION_TYPES.DRAFT:
                draftMutation.mutate(job._id);
                break;
            case ACTION_TYPES.CLOSE:
                unarchiveMutation.mutate(job._id);
                break;
            case ACTION_TYPES.EDIT:
                navigate(`/admin/edit-job/${job._id}`);
                setModalOpen(false);
                break;
            default:
                console.log('Unknown action:', modalAction);
        }
    };

    const getModalMessage = (action, job) => {
        switch (action) {
            case ACTION_TYPES.DELETE:
                return `Are you sure you want to delete the "${job.jobTitle}" job post?`;
            case ACTION_TYPES.EDIT:
                return `Are you sure you want to edit the "${job.jobTitle}" job post?`;
            case ACTION_TYPES.DRAFT:
                return `Are you sure you want to move "${job.jobTitle}" to drafts?`;
            case ACTION_TYPES.CLOSE:
                return `Are you sure you want to close the "${job.jobTitle}" job post?`;
            case ACTION_TYPES.REJECT:
                return `Are you sure you want to reject the candidate for "${job.jobTitle}"?`;
            case ACTION_TYPES.ARCHIVE:
                return `Are you sure you want to archive the "${job.jobTitle}" job post?`;
            default:
                return `Are you sure you want to perform this action on "${job.jobTitle}"?`;
        }
    };

    const handleCheckboxChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (!updatedFilters[filterType]) {
                updatedFilters[filterType] = [];
            }
            const index = updatedFilters[filterType].indexOf(value);

            if (index !== -1) {
                updatedFilters[filterType].splice(index, 1);
            } else {
                updatedFilters[filterType].push(value);
            }

            return updatedFilters;
        });
    };

    const handleExperienceFilter = (experience) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            experience
        }));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleViewJob = (jobId) => {
        navigate(`/admin/jobs/view-job/${jobId}`);
    };

    // const token = localStorage.getItem('accessToken');
    // if (token == null) {
    //     return <Navigate to="/auth/login" replace />;
    // }

    const filtersConfig = activeTab === 'open' ? activeJobsCountFilter : closedJobsCountFilter;

    const tabs = [
        { name: 'open', label: 'Open', count: statistics?.totalActiveJobs },
        { name: 'closed', label: 'Closed', count: statistics?.totalClosedJobs },
        { name: 'draft', label: 'Draft', count: statistics?.totalDraftJobs },
    ];

    const JobsStats = [
        { title: 'Jobs Posted', value: 555, icon: one },
        { title: 'Application Received', value: 4455, icon: two },
        { title: 'Hired', value: 46, icon: three }

    ]

    const displayJobs = searchQuery.length > 0 ? searchResults :
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);

    const currentPage = 'dashboard';


    return (
        <div className="mx-4 pt-4 h-screen">
            <div className="flex flex-row justify-between mb-4">
                <h1 className='typography-h1'>Jobs</h1>
                {/* <Link to="/admin/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link> */}

                <div className='flex justify-center mb-4'>
                    <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
                </div>

            </div>

            <div className='bg-background-100'>

                <div className='flex gap-3'>
                    <StatsGrid stats={JobsStats} />
                </div>
                <div className='flex mx-4'>
                    <div>
                        <div>
                            <input
                                className="px-4 py-2 w-full rounded mb-4"
                                placeholder="Job title or keyword"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        {/* <Slider  min={0} max={20} /> */}
                        <Filters filters={filters} statistics={filtersConfig} handleCheckboxChange={handleCheckboxChange} activeTab={activeTab} handleExperienceFilter={handleExperienceFilter} clearAllFilters={clearAllFilters} />
                    </div>
                    <div className='w-full ml-4'>
                        <div className='flex justify-end pb-4'>

                            <div className="w-[216px]">
                                <Button variant="primary" onClick={() => { navigate("/admin/create-job") }}>Create A Job Listing</Button>
                            </div>


                        </div>
                        {displayJobs
                            .filter(job => job.status === activeTab)
                            .map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    page={currentPage}
                                    status={activeTab}
                                    handleAction={(action) => handleAction(action, job)}
                                    onClick={() => handleViewJob(job._id)}
                                />
                            ))
                        }
                    </div>
                </div>
                {/* <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} /> */}
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    actionType={modalAction}
                    onConfirm={confirmAction}
                    item={selectedJob}
                    customMessage={selectedJob ? getModalMessage(modalAction, selectedJob) : ''}
                />
            </div>
        </div>
    );
};
export default Dashboard;
