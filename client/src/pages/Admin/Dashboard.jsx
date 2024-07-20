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

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('open');
    const [open, setOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [modalAction, setModalAction] = useState('');
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
            setOpen(false);
        },
    });

    const draftMutation = useMutation({
        mutationFn: (jobId) => api.put(`/draftJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setOpen(false);
        },
    });

    const unarchiveMutation = useMutation({
        mutationFn: (jobId) => api.put(`/unarchiveJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setOpen(false);
        },
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAction = (action, jobId) => {
        setOpen(true);
        setSelectedJobId(jobId);
        setModalAction(action);
    };

    const clearAllFilters = () => {
        setFilters({
            employmentType: [],
            experienceLevel: [],
            jobProfile: [],
            experience: { min: '', max: '' }
        });
    };

    const confirmAction = () => {
        if (modalAction === 'delete') {
            deleteMutation.mutate(selectedJobId);
        }
        if (modalAction === 'draft') {
            draftMutation.mutate(selectedJobId);
        }
        if (modalAction === 'closed') {
            unarchiveMutation.mutate(selectedJobId);
        }
        if (modalAction === 'edit') {
            navigate(`/admin/edit-job/${selectedJobId}`);
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
        navigate(`/admin/view-job/${jobId}`);
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
        {title:'Jobs Posted' , value : 555 , icon: one},
        {title:'Application Received' , value : 4455 ,  icon: two},
        {title:'Hired' , value : 46  ,icon: three}
        
    ]

    const displayJobs = searchQuery.length > 0 ? searchResults : 
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);

    const currentPage = 'dashboard';


    return (
        <div className="mx-4 pt-4">
            <div className="flex flex-row justify-between mb-4">
                    <h1 className="font-bold text-white ">Jobs</h1>
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
                        <div className='w-64'>
                            <input
                                className="bg-background-40 px-4 py-2 w-full rounded mb-4"
                                placeholder="Job title or keyword"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        {/* <Slider  min={0} max={20} /> */}
                        <Filters filters={filters} statistics={filtersConfig} handleCheckboxChange={handleCheckboxChange} activeTab={activeTab} handleExperienceFilter={handleExperienceFilter} clearAllFilters={clearAllFilters} />
                    </div>
                    <div className='w-full ml-4'>
                       
                        {displayJobs
                            .filter(job => job.status === activeTab)
                            .map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    page={currentPage}
                                    status={activeTab}
                                    handleAction={handleAction}
                                    onClick={() => handleViewJob(job._id)}
                                />
                            ))
                        }
                    </div>
                </div>
                <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />
            </div>
        </div>
    );
};
export default Dashboard;
