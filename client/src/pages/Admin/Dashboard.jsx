import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Filters from '../../components/Filters/Filters';
import Modal from '../../components/Modal';
import JobCard from '../../components/JobCard';
import Tabs from '../../components/ui/Tabs';
import StatsGrid from '../../components/ui/StatsGrid';
import one from '../../svg/StatsCard/Jobs Page/one';
import two from '../../svg/StatsCard/Jobs Page/two';
import three from '../../svg/StatsCard/Jobs Page/three';
import { Button } from '../../components/ui/Button';
import axios from "../../api/axios"
import Create from '../../svg/Buttons/Create';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import { DashboardIcon, DashboardIconActive } from '../../svg/Navbar/DashboardIcon';
import { OpenIcon, OpenIconActive } from '../../svg/Tabs/OpenIcon';
import { ClosedIcon, ClosedIconActive } from '../../svg/Tabs/ClosedIcon';
import { DraftsIcon, DraftsIconActive } from '../../svg/Tabs/DraftsIcon';
import NoJobs from "../../svg/Background/NoJobs.svg"
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/ui/Loader';
import SearchIcon from '../../svg/SearchIcon';


const fetchJobs = () => axios.get('/jobs/jobs').then(res => res.data);
const fetchOverallStats = () => axios.get('/jobs/stats/overall').then(res => res.data.data);
const searchJobs = (query) => axios.get(`/jobs/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => axios.post('/jobs/filterJobs', { filters }).then(res => res.data);

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('open');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [closeReason, setCloseReason] = useState('');
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' },
        budget: { min: '', max: '' },
        closingStatus: []  // Add this new filter
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch jobs and overall stats
    // Use the updated jobs query
    const { data: jobs = [], isLoading: isJobsLoading } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs
    });

    const { data: overallStats = { totalJobs: 0, totalCandidates: 0, totalHired: 0 }, isLoading: isStatsLoading } = useQuery({
        queryKey: ['overallStats'],
        queryFn: fetchOverallStats
    });




    const handleAction = (action, jobId) => {
        const job = jobs.find(j => j._id === jobId);
        setModalOpen(true);
        setSelectedJob(job);
        setModalAction(action);
    };

    // Update the filteredJobs query to get the loading state
    const { data: filteredJobs = [], isLoading: isFilteredJobsLoading } = useQuery({
        queryKey: ['filteredJobs', filters],
        queryFn: () => filterJobs(filters),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ),
    });

    // Update the search query to get the loading state
    const { data: searchResults = [], isLoading: isSearchLoading } = useQuery({
        queryKey: ['searchJobs', searchQuery],
        queryFn: () => searchJobs(searchQuery),
        enabled: searchQuery !== '',
    });
    const deleteMutation = useMutation({
        mutationFn: (jobId) => axios.delete(`/jobs/deleteJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['jobCount'] });
            setModalOpen(false);
            showErrorToast('Job Deleted', "Job Deleted Successfully");
        },
    });

    const draftMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/jobs/draftJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const reOpenMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/jobs/reOpen/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            setActiveTab("open");
        },
    })

    const unarchiveMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/jobs/unarchiveJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const closeMutation = useMutation({
        mutationFn: ({ jobId, reason }) =>
            axios.put(`/jobs/closeJob/${jobId}`, { reason }), // Add reason to request body
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            setCloseReason(''); // Reset the close reason
        },
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleBudgetFilter = (budget) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            budget
        }));
    };



    // Update clearAllFilters
    const clearAllFilters = () => {
        setFilters({
            employmentType: [],
            experienceLevel: [],
            jobProfile: [],
            experience: { min: '', max: '' },
            budget: { min: '', max: '' },
            closingStatus: []  // Add this
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
                closeMutation.mutate({ 
                    jobId: job._id, 
                    reason: closeReason  // Pass the closeReason
                });
                break;
            case ACTION_TYPES.REOPEN:
                reOpenMutation.mutate(job._id)
                break;
            case ACTION_TYPES.EDIT:
                navigate(`/admin/edit-job/${job._id}`);
                setModalOpen(false);
                break;
            default:
                console.log('Unknown action:', modalAction);
        }
    };

    const handleCloseReasonChange = (reason) => {
        setCloseReason(reason);
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
            case ACTION_TYPES.REOPEN:
                return `Are you sure you want to reOpen the "${job.jobTitle}" job post?`;
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


    const tabs = [
        {
            name: 'open',
            label: 'Open',
            icon: <OpenIcon />,
            activeIcon: <OpenIconActive />,
        },
        {
            name: 'closed', label: 'Closed', icon: <ClosedIcon />,
            activeIcon: <ClosedIconActive />,
        },
        {
            name: 'draft', label: 'Draft', icon: <DraftsIcon />,
            activeIcon: <DraftsIconActive />,
        },
    ];

    const JobsStats = [
        {
            title: 'Jobs Posted',
            value: overallStats.totalJobs,
            icon: one
        },
        {
            title: 'Applications Received',  // This label is now more accurate
            value: overallStats.totalApplications, // This now shows total applications
            icon: two
        },
        {
            title: 'Hired',
            value: overallStats.totalHired,
            icon: three
        }
    ];

    // Combined loading state
    const isLoadingResults = (searchQuery.length > 0 && isSearchLoading) ||
        (Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ) && isFilteredJobsLoading);

    // Get the jobs to display based on search or filters
    const displayJobs = searchQuery.length > 0 ? searchResults :
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);

    const currentPage = 'dashboard';


    return (
        <div className="container mx-4 pt-4 h-screen">
            <div className="flex flex-row justify-between mb-4">
                <h1 className='typography-h1'>Jobs</h1>
                {/* <Link to="/admin/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link> */}

                <div className='flex justify-center'>
                    <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
                </div>

            </div>

            <div className='bg-background-100 rounded-xl p-4'>

                <div className='flex gap-3'>
                    <StatsGrid stats={JobsStats} />
                </div>

                <div className='flex mt-4'>
                    <div>
                        <div className='mb-4 relative '>
                            <div className='absolute top-[10px] left-4'>
                                <SearchIcon />
                            </div>
                            <input
                                style={{paddingLeft : "48px"}}
                                type='text'
                                placeholder="Enter job title"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <Filters
                            filters={filters}
                            handleCheckboxChange={handleCheckboxChange}
                            activeTab={activeTab}
                            handleBudgetFilter={handleBudgetFilter}  // Add this
                            handleExperienceFilter={handleExperienceFilter}
                            clearAllFilters={clearAllFilters} />
                    </div>
                    <div className='w-full ml-4'>
                        <div className='flex justify-end '>
                            {
                                activeTab == "open" && displayJobs.length != 0 && displayJobs.filter(job=>job.status === "open").length !== 0 && (
                                    <div className="w-[216px] mb-4">
                                        <Button variant="primary" icon={Create} iconPosition="left" onClick={() => { navigate("/admin/create-job") }}>Create A Job Listing</Button>
                                    </div>
                                )
                            }
                        </div>
                        {isLoadingResults ? (
                            <div className="flex justify-center items-center min-h-full">
                                <Loader />
                            </div>
                        ) : (displayJobs.length === 0 || displayJobs.filter(job=>job.status === activeTab).length === 0) ? (
                            <div className='bg-background-80 h-full flex flex-col p-40 justify-center items-center rounded-xl'>
                                <img src={NoJobs} alt="No jobs found" />
                                <span className='typography-body m-6'>
                                    Create a job post to attract top talent and build your dream team
                                </span>
                                <div className="w-[216px]">
                                    <Button
                                        variant="primary"
                                        icon={Create}
                                        iconPosition="left"
                                        onClick={() => { navigate("/admin/create-job") }}
                                    >
                                        Create A Job Listing
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            displayJobs
                                .filter(job => job.status === activeTab)
                                .map((job) => (
                                    <JobCard 
                                    key={job._id} job={job}
                                    isAdmin={true} withKebab={true} page={currentPage}
                                    status={activeTab}
                                    handleAction={handleAction} 
                                    onClick={job.status==="deleted" ? undefined :
                                    ()=> handleViewJob(job._id)}
                                    />
                                ))
                        )}
                    </div>
                </div>
                {/* <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} /> */}
                <Modal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setCloseReason(''); // Reset close reason when modal is closed
                    }}
                    actionType={modalAction}
                    onConfirm={(job) => confirmAction(job)}
                    item={selectedJob}
                    customMessage={selectedJob ? getModalMessage(modalAction, selectedJob) : ''}
                    closeReason={closeReason}
                    onCloseReasonChange={handleCloseReasonChange}
                />
            </div>
        </div>
    );
};
export default Dashboard;
