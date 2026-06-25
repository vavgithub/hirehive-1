// ViewJobs.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../services/axios';
import Tabs from '../../components/ui/Tabs';
import StatsGrid from '../../components/ui/StatsGrid';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/ui/SideCard';
import Table from '../../components/tableUtilities/Table';
import Header from '../../components/utility/Header';
import { ACTION_TYPES, getModalMessage } from '../../utility/ActionTypes';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import Modal from '../../components/Modals/Modal';
import MakeActiveJobModal from '../../components/Modals/MakeActiveJobModal';
import CustomBadge from '../../components/Badge/CustomBadge';
import { useAuthContext } from '../../context/AuthProvider';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, Check, Eye, File, FileText, Folder, MonitorDot, MousePointer2, PenTool, Users } from 'lucide-react';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { closeJob, deleteJob, draftJob, fetchjobsById, fetchOverallJobStats, publishJob, reOpenJob } from '../../services/jobs.service';
import useDebounce from '../../hooks/useDebounce';
import * as Sentry from '@sentry/react';


const ViewJobs = () => {
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useAuthContext(); // Get user data from the context
    const role = user?.role || 'Admin';

    const [closeReason, setCloseReason] = useState('');

    const [activeTab, setActiveTab] = useState('candidate');

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);

    const [location,setLocation] = useState(null);
    const [filters,setFilters] = useState({});
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [filterObj,setFilterObj] = useState({});
    const [sortFilterObj,setSortFilterObj] = useState({});
    const [sortModel,setSortModel] = useState([])
    const [search,setSearch] = useState("");

    const [budgetFilter, setBudgetFilter] = useState(() => {
        const savedFilter = localStorage.getItem(`budgetFilter_${mainId}`);
        return savedFilter ? JSON.parse(savedFilter) : { from: '', to: '' };
    });

    const [debouncedQuery] = useDebounce(search,400);

    //Server-side sort management for tables
    useEffect(() => {
        const selectedSort = {}
        sortModel.map(model => {
        selectedSort[model.field] = model.sort
        })
        setSortFilterObj(selectedSort);
    }, [sortModel]);

    useEffect(()=>{
        //removing non-populated filters
        setFilterObj({...Object.fromEntries(Object.entries(filters).filter(([Key,value]) =>!!(Array.isArray(value) ? value?.length : value))), ...((budgetFilter?.from || budgetFilter?.to) ? {'budget' : budgetFilter} : {} )})
    },[filters,budgetFilter])


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        {
            name: 'jobDetails', label: 'Job Details', icon: <IconWrapper icon={FileText} size={0} inheritColor={true} customIconSize={4} />,
            activeIcon: <IconWrapper icon={FileText} size={0} inheritColor={true} customIconSize={4} />,
        },
        {
            name: 'candidate', label: 'Candidates', icon: <IconWrapper icon={Users} size={0} inheritColor={true} customIconSize={4} />,
            activeIcon: <IconWrapper icon={Users} size={0} inheritColor={true} customIconSize={4} />,
        }
    ];


    const handleCloseReasonChange = (reason) => {
        setCloseReason(reason);
    };




    const confirmAction = (job) => {
        switch (modalAction) {
            case ACTION_TYPES.DELETE:
                deleteMutation.mutate(mainId);
                break;
            case ACTION_TYPES.DRAFT:
                draftMutation.mutate(mainId);
                break;
            case ACTION_TYPES.CLOSE:
                closeMutation.mutate({ jobId: mainId, reason : closeReason });
                break;
            case ACTION_TYPES.REOPEN:
                reOpenMutation.mutate(job?._id ?? mainId)
                break;
            case ACTION_TYPES.MAKE_ACTIVE:
                publishMutation.mutate(mainId);
                break;
            case ACTION_TYPES.EDIT:
                navigate(`${getRoute(role,ROUTE_KEY.EDIT_JOB)}/${mainId}`);
                setModalOpen(false);
                break;
            default:
                console.log('Unknown action:', modalAction);
        }
    };


    // Fetch job data
    const { data: formData, isLoading: isJobLoading } = useQuery({
        queryKey: ['job', mainId],
        queryFn: () => fetchjobsById(mainId),
    });

    const { data: apiResponse, isLoading, isError, refetch } = useQuery({
        queryKey: ['candidates', mainId,location,page,pageSize,filterObj,debouncedQuery,sortFilterObj],
        queryFn: () => axios.post(`/admin/candidate/${mainId}`,{...(location ? location : {} ) ,page : page + 1 ,pageLimit : pageSize ,filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj}).then(res => res.data),
        enabled: activeTab === 'candidate', // Only fetch data if not in readOnly mode
    });

    const getCandidatesExportData = async () => {
        try {
          const response = await axios.post(`/admin/candidate/${mainId}`,{...(location ? location : {} ) ,filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj}).then(res => res.data);
          return response?.candidates || []
        } catch (error) {
          Sentry.captureException(error, {
            tags: { file: "ViewJobs.jsx", action: "getCandidatesExportData", role: "admin" },
            extra: { response: error?.response?.data, message: error?.message },
          });
          console.log("Export data error :",error)
        }
    }

    // Add new query for job statistics
    const { data: jobStats = { data: { totalCount: 0, stageStats: {}, jobDetails: {} } },
        isLoading: isStatsLoading
    } = useQuery({
        queryKey: ['jobStats', mainId],
        queryFn: () => fetchOverallJobStats(mainId),
    });


    // Mutations
    const deleteMutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['job'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const draftMutation = useMutation({
        mutationFn: draftJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const closeMutation = useMutation({
        mutationFn: closeJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const reOpenMutation = useMutation({
        mutationFn: reOpenJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    })

    const publishMutation = useMutation({
        mutationFn: publishJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            queryClient.invalidateQueries({ queryKey: ['job', mainId] });
            setModalOpen(false);
            navigate(`${getRoute(role, ROUTE_KEY.JOBS_VIEW_JOB)}/${mainId}`);
        },
    })

    //scroll preserve for table
    // 2. Restore scroll position after data is loaded
    useEffect(() => {
        if ( activeTab === "candidate") {
            const savedScrollY = sessionStorage.getItem('job_candidates_scroll_position');
            if (savedScrollY) {
                requestAnimationFrame(() => {
                    document.getElementById('adminContainer').scrollTo(0, parseFloat(savedScrollY));
                });
            }
        }
    }, [ activeTab]);

    // Show loader if data is loading
    // Show loader if any data is loading
    if (isJobLoading || isStatsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }
    const { questions = [] } = formData || {};

    const applicationsReceivedStats = {
        monthly: `${jobStats?.data?.comparison?.applicationsReceived?.monthly ?? 0}% since last month`,
        weekly: `${jobStats?.data?.comparison?.applicationsReceived?.weekly ?? 0}% since last week`,
        daily: `${jobStats?.data?.comparison?.applicationsReceived?.daily ?? 0}% since yesterday`,
    }

    // Update the stats arrays to use the fetched data
    const candidateStats = [
        { title: 'Total', value: jobStats?.data?.totalCount || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />, statistics: applicationsReceivedStats },
        { title: 'Portfolio', value: jobStats?.data?.stageStats?.Portfolio || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Folder} /> },
        { title: 'Screening', value: jobStats?.data?.stageStats?.Screening || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={MonitorDot} /> },
        { title: 'Design Task', value: jobStats?.data?.stageStats['Design Task'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={PenTool} /> },
        { title: 'Round 1', value: jobStats?.data?.stageStats['Round 1'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Briefcase} /> },
        { title: 'Round 2', value: jobStats?.data?.stageStats['Round 2'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Briefcase} /> },
        { title: 'Offer Sent', value: jobStats?.data?.stageStats?.Hired || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={PenTool} /> },
    ];

    const jobsDetailStats = [
        { title: 'Clicks', value: jobStats?.data?.jobDetails?.views || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Eye} /> },
        { title: 'Applications Received', value: jobStats?.data?.jobDetails?.applicationsReceived || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={File} />, statistics: applicationsReceivedStats },
        { title: 'Qualified applications', value: jobStats?.data?.jobDetails?.qualifiedApplications || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Check} /> },
        { title: 'Engagement Rate', value: `${jobStats?.data?.jobDetails?.engagementRate || 0}%`, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={MousePointer2} /> },
    ];


    const handleAction = (action, jobId) => {
        setModalOpen(true);
        setSelectedJob(jobId);
        setModalAction(action);
    };



    return (

        <Container>
            <Header
                HeaderText={formData?.jobTitle}
                withKebab={true}
                withBack="true"
                onBack={() => navigate(-1)}
                job={formData}
                handleAction={handleAction}
                rightContent={
                    <Tabs
                        bgVariant='secondary'
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                }
            />


            {activeTab === 'jobDetails' && (
                <StyledCard padding={2}>
                    <StatsGrid stats={jobsDetailStats} />
                    <div className='flex justify-between mt-4 gap-4'>
                        <StyledCard padding={2} backgroundColor={'bg-background-80'} extraStyles='w-[45%]'>
                            <h3 className="mb-2">Job Description</h3>
                            <div className='text-font-gray typography-body' dangerouslySetInnerHTML={{ __html: formData.jobDescription ? formatDescription(formData.jobDescription) : '' }}></div>
                            <h3 className="mt-4 mb-2">Skills</h3>
                            <div className='flex flex-wrap gap-2'>
                                {formData.skills && formData.skills.map((skill, index) => (
                                    <CustomBadge key={index} label={skill} borderRadius={10} />
                                ))}
                            </div>
                        </StyledCard>
                        <StyledCard padding={2} backgroundColor={'bg-background-80'} extraStyles='w-[45%]'>
                            <h3 className='mb-4'>Additional Questions</h3>
                            {questions?.length > 0 ? questions.map((question, index) => (
                                <div key={question._id} className="mb-4">
                                    <label className="typography-body">
                                        Q{index + 1}. {question.text}
                                        {question.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {(
                                        question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="my-2 typography-body flex justify-start items-center gap-3">
                                                <div className='typography-small-p text-font-gray'>Option {optionIndex + 1}  </div>
                                                <label htmlFor={`question-${question._id}-option-${optionIndex}`}>{option}</label>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )) : <p className='typography-body text-font-gray'>No Questions Available</p>}
                        </StyledCard>
                        <div className='pb-2'>
                            <SideCard formData={formData} />
                        </div>
                    </div>
                </StyledCard>
            )}

            {activeTab === 'candidate' && (
                <StyledCard >
                    <div className="mb-4">
                        <StatsGrid stats={candidateStats} />
                    </div>
                    <div>
                        <Table
                            jobId={mainId} // Pass jobId to Table component
                            jobData={formData}
                            currentPage={page} 
                            setCurrentPage={setPage}
                            pageSize={pageSize} 
                            setPageSize={setPageSize}
                            filters={filters}
                            setFilters={setFilters}
                            searchTerm={search}
                            setSearchTerm={setSearch}
                            sortModel={sortModel}
                            setSortModel={setSortModel}
                            budgetFilter={budgetFilter}
                            setBudgetFilter={setBudgetFilter}
                            addLocationFilter={setLocation} 
                            tableData={apiResponse?.candidates || []}
                            totalCount={apiResponse?.totalCount || 0}
                            getDataWithoutPagination={getCandidatesExportData}
                            isTableDataLoading={isLoading}
                        >
                        </Table>
                    </div>
                </StyledCard>
            )}

            <MakeActiveJobModal
                open={modalOpen && modalAction === ACTION_TYPES.MAKE_ACTIVE}
                job={formData}
                isPublishing={publishMutation.isPending}
                onClose={() => setModalOpen(false)}
                onEdit={() => {
                    setModalOpen(false);
                    navigate(`${getRoute(role, ROUTE_KEY.EDIT_JOB)}/${mainId}`);
                }}
                onMakeActive={() => publishMutation.mutate(mainId)}
            />
            <Modal
                open={modalOpen && modalAction !== ACTION_TYPES.MAKE_ACTIVE}
                onClose={() => {
                    setModalOpen(false);
                    setCloseReason(''); // Reset close reason when modal is closed
                }}
                actionType={modalAction}
                onConfirm={(job) => confirmAction(job, closeReason)}
                item={selectedJob}
                customMessage={selectedJob ? getModalMessage(modalAction, formData?.jobTitle) : ''}
                closeReason={closeReason}
                onCloseReasonChange={handleCloseReasonChange}
            />
        </Container>

    );
};

export default ViewJobs;
