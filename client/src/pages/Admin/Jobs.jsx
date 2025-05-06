import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Filters from '../../components/Filters/Filters';
import Modal from '../../components/Modals/Modal';
import JobCard from '../../components/Cards/JobCard';
import Tabs from '../../components/ui/Tabs';
import StatsGrid from '../../components/ui/StatsGrid';
import { Button } from '../../components/Buttons/Button';
import axios from "../../api/axios"
import { ACTION_TYPES, getModalMessage } from '../../utility/ActionTypes';
import NoJobs from "../../svg/Background/NoJobs.svg"
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import Pagination from '../../components/utility/Pagination';
import useDebounce from '../../hooks/useDebounce';
import { useAuthContext } from '../../context/AuthProvider';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Archive, Briefcase, CircleCheck, CircleCheckBig, CirclePlus, CircleX, FileText, Search } from 'lucide-react';
import Header from '../../components/utility/Header';
import LoaderModal from '../../components/Loaders/LoaderModal';
import usePinnedJobs from '../../hooks/usePinnedJobs';


const fetchJobs = (page, status,pinned) => axios.get(`/jobs/jobs?page=${page}&status=${status}&pinned=${JSON.stringify(pinned)}`).then(res => res.data);
const fetchOverallStats = () => axios.get('/jobs/stats/overall').then(res => res.data.data);
const filterSearchJobs = (query, filters, page, status) => axios.post('/jobs/filterSearchJobs', { filters, page, status, query }).then(res => res.data);

const Jobs = () => {
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

    const [page, setPage] = useState(1);
    const PAGE_LIMIT = 5;

    const [debouncedQuery] = useDebounce(searchQuery);
    
    const { user } = useAuthContext();

    const role = user?.role;
    // Add this line somewhere at the top of your component to extract the organization ID
    const orgId = user?.companyDetails?._id;

    const { setPinnedJobs, pinnedJobs , pinLoading, setUnPinnedJobs } = usePinnedJobs(user?.email)
    
    //For resetting page on each result change
    useEffect(() => {
        setPage(1);
    }, [activeTab, debouncedQuery, filters])

    // Fetch jobs and overall stats
    // Use the updated jobs query
    const { data: fetchJobData , isLoading: isJobsLoading } = useQuery({
        queryKey: ['jobs', page, activeTab,pinnedJobs],
        queryFn: () => fetchJobs(page, activeTab,pinnedJobs),
        enabled: !pinLoading, 
    });

    const jobs = fetchJobData?.jobs ?? [];

    if(fetchJobData?.closedPins?.length > 0){
        for(let jobId of fetchJobData.closedPins){
            setUnPinnedJobs(jobId)
        }
    }

    const {
        data: overallStats = {
            totalJobs: 0,
            totalOpenJobs: 0,
            totalClosedJobs: 0,
            totalDraftedJobs: 0,
            totalCandidates: 0,
            totalHired: 0
        },
        isLoading: isStatsLoading } = useQuery({
            queryKey: ['overallStats'],
            queryFn: fetchOverallStats
        });

    const handleAction = (action, jobId) => {
        const job = jobs.find(j => j._id === jobId);
        //HANDLING PIN AND UNPIN JOBS
        if(action === ACTION_TYPES.PIN ){
            if(pinnedJobs?.length >= 3){//PIN LIMIT = 3 (as pagination limit is 3)
                showErrorToast("Exceeded Pin Count",`Only 3 Jobs can be pinned. Please unpin one job and continue.`)
                return
            }
            setPinnedJobs(jobId)
            showSuccessToast("Success",`${job.jobTitle} job pinned successfully`)
        }else if(action === ACTION_TYPES.UNPIN){
            setUnPinnedJobs(jobId)
            showSuccessToast("Success",`${job.jobTitle} job unpinned successfully`)
        }else{
                if((action === ACTION_TYPES.CLOSE || action === ACTION_TYPES.DRAFT || action === ACTION_TYPES.DELETE) &&  pinnedJobs?.includes(jobId)){
                    setUnPinnedJobs(jobId)
                }
            setModalOpen(true);
            setSelectedJob(job);
            setModalAction(action);
        }
    };



    //Combined search and filter for jobs
    const { data: filteredSearchData, isLoading: isFilteredSearchJobsLoading } = useQuery({
        queryKey: ['filteredSearchJobs', debouncedQuery, filters, page, activeTab],
        queryFn: () => filterSearchJobs(debouncedQuery, filters, page, activeTab),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '') || debouncedQuery !== '',
        ),
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
                navigate(`/${role === 'Admin' ? 'admin' : 'hiring-manager'}/edit-job/${job._id}`);
                setModalOpen(false);
                break;
            default:
                console.log('Unknown action:', modalAction);
        }
    };

    const handleCloseReasonChange = (reason) => {
        setCloseReason(reason);
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
        if (role === "Admin") {
            navigate(`/admin/jobs/view-job/${jobId}`);
        }
        if (role === "Hiring Manager") {
            navigate(`/hiring-manager/jobs/view-job/${jobId}`);
        }
    };

    const handleCreateJob = () => {
        if (role === "Admin") {
            navigate("/admin/create-job");
        }
        if (role === "Hiring Manager") {
            navigate("/hiring-manager/create-job");
        }
    }


    const tabs = [
        {
            name: 'open',
            label: 'Open',
            icon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isInActiveIcon icon={CircleCheck} />,
            activeIcon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isActiveIcon icon={CircleCheck} />,
        },
        {
            name: 'closed', label: 'Closed', icon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isInActiveIcon icon={CircleX} />,
            activeIcon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isActiveIcon icon={CircleX} />,
        },
        {
            name: 'draft', label: 'Draft', icon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isInActiveIcon icon={Archive} />,
            activeIcon: <IconWrapper size={0} customIconSize={5} customStrokeWidth={4} isActiveIcon icon={Archive} />,
        },
    ];

    const JobsStats = [
        {
            title: 'Jobs Posted',
            value: overallStats.totalJobs,
            icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} />,
            statistics: {
                monthly: `${overallStats?.jobStatistics?.monthly ?? 0}% since last month`,
                weekly: `${overallStats?.jobStatistics?.weekly ?? 0}% since last week`,
                daily: `${overallStats?.jobStatistics?.daily ?? 0}% since last day`,
            }
        },
        {
            title: 'Applications Received',  // This label is now more accurate
            value: overallStats.totalApplications, // This now shows total applications
            icon: () => <IconWrapper size={10} isInActiveIcon icon={FileText} />,
            statistics: {
                monthly: `${overallStats?.applicationStatistics?.monthly ?? 0}% since last month`,
                weekly: `${overallStats?.applicationStatistics?.weekly ?? 0}% since last week`,
                daily: `${overallStats?.applicationStatistics?.daily ?? 0}% since last day`,
            }
        },
        {
            title: 'Hired',
            value: overallStats.totalHired,
            icon: () => <IconWrapper size={10} isInActiveIcon icon={CircleCheckBig} />,
            statistics: {
                monthly: `${overallStats?.hiredStatistics?.monthly ?? 0}% since last month`,
                weekly: `${overallStats?.hiredStatistics?.weekly ?? 0}% since last week`,
                daily: `${overallStats?.hiredStatistics?.daily ?? 0}% since last day`,
            }
        }
    ];

    const isFiltered = (Object.values(filters).some(filter =>
        Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
    ));


    const isLoadingResults = (debouncedQuery.length > 0 || isFiltered) ? isFilteredSearchJobsLoading : false;


    const displayJobs = useMemo(() => {
        return ((debouncedQuery.length > 0 || isFiltered) && !isFilteredSearchJobsLoading) ? filteredSearchData?.filteredSearchJobs : [...jobs?.filter(job => pinnedJobs.includes(job._id)),...jobs?.filter(job => !pinnedJobs.includes(job._id))];
    }, [filteredSearchData, isFiltered, debouncedQuery, jobs, pinnedJobs]);

    const currentPage = 'Jobs';

    return (
        <Container >
           <Header
            withKebab="true"
            page={currentPage}
            HeaderText="Jobs"
            handleAction={handleAction}
            withBack="false"
            orgId={orgId} // Pass the organization ID to Header
            rightContent={
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    handleTabClick={handleTabClick}
                />
            }
        >
        </Header>
            {/* <h1 className='typography-h1'>Jobs</h1> */}
            {/* <Link to="/admin/create-job" className="bg-black text-white px-4 py-2 rounded">Create job listing</Link> */}

            {/* <div className='flex justify-center items-center'>
                    <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
                </div> */}

            {(isStatsLoading  || isJobsLoading) && <LoaderModal />}
            <StyledCard padding={2} backgroundColor={"bg-background-100"}>

                <div className='flex gap-3'>
                    <StatsGrid stats={JobsStats} />
                </div>

                <div className='flex mt-4'>
                    <div className='w-[40%]'>
                        <div className='mb-4 relative '>
                            <div className='absolute top-[12px] left-4'>
                                <IconWrapper icon={Search} size={0} customIconSize={3} isInActiveIcon />
                            </div>
                            <input
                                style={{ paddingLeft: "48px" }}
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
                    <div className='w-full ml-4 flex flex-col gap-4'>
                        {
                            activeTab == "open" && displayJobs.length != 0 && displayJobs.filter(job => job.status === "open").length !== 0 && (
                                <div className='flex justify-end '>
                                    <div >
                                        <Button id="createJobBtn" variant="primary" icon={() => <IconWrapper icon={CirclePlus} size={0} customIconSize={5} customStrokeWidth={5} />} iconPosition="left" onClick={handleCreateJob}>Create A Job Listing</Button>
                                    </div>
                                </div>
                            )
                        }
                        {isLoadingResults  ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader />
                            </div>
                        ) : (displayJobs.length === 0 || displayJobs.filter(job => job.status === activeTab).length === 0) ? (
                            <div className='bg-background-80 h-full flex flex-col p-40 justify-center items-center rounded-xl'>
                                <img src={NoJobs} alt="No jobs found" />
                                <span className='typography-body m-6'>
                                    Create a job post to attract top talent and build your dream team
                                </span>
                                    <Button
                                        variant="primary"
                                        icon={() => <IconWrapper icon={CirclePlus} size={0} customIconSize={5} customStrokeWidth={5} />}
                                        iconPosition="left"
                                        onClick={handleCreateJob}
                                    >
                                        Create A Job Listing
                                    </Button>
                            </div>
                        ) : (
                            displayJobs
                                .filter(job => job.status === activeTab)
                                .map((job, index) => {
                                    // let skipValue = (page - 1) * PAGE_LIMIT;
                                    // let allowedValue = skipValue + PAGE_LIMIT;
                                    // if(index >= skipValue && index < allowedValue)
                                    return (
                                        <JobCard
                                            key={job._id} job={job}
                                            isAdmin={true} withKebab={true} page={currentPage}
                                            status={activeTab}
                                            handleAction={handleAction}
                                            onClick={job.status === "deleted" ? undefined :
                                                () => handleViewJob(job._id)}
                                            role={role}
                                            pinnedJobs={pinnedJobs}
                                        />
                                    )
                                })
                        )}
                        {((debouncedQuery || isFiltered) ? filteredSearchData?.filteredSearchCount :
                            (activeTab === "draft" ? overallStats?.totalDraftedJobs : activeTab === "closed" ? overallStats?.totalClosedJobs : overallStats?.totalOpenJobs)) !== 0 &&
                            <Pagination
                                currentPage={page}
                                setCurrentPage={setPage}
                                pageLimit={PAGE_LIMIT}
                                totalItems={
                                    (debouncedQuery || isFiltered) ? filteredSearchData?.filteredSearchCount :
                                        (activeTab === "draft" ? overallStats?.totalDraftedJobs : activeTab === "closed" ? overallStats?.totalClosedJobs : overallStats?.totalOpenJobs)
                                }
                            />
                        }
                    </div>
                </div>
                <Modal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setCloseReason(''); // Reset close reason when modal is closed
                    }}
                    actionType={modalAction}
                    onConfirm={(job) => confirmAction(job)}
                    item={selectedJob}
                    customMessage={selectedJob ? getModalMessage(modalAction, selectedJob?.jobTitle) : ''}
                    closeReason={closeReason}
                    onCloseReasonChange={handleCloseReasonChange}
                />
            </StyledCard>
        </Container>
    );
};
export default Jobs;
