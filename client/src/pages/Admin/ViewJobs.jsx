// ViewJobs.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
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
import CustomBadge from '../../components/Badge/CustomBadge';
import { useAuthContext } from '../../context/AuthProvider';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, Check, Eye, File, FileText, Folder, MonitorDot, MousePointer2, PenTool, Users } from 'lucide-react';


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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        {
            name: 'jobDetails', label: 'Job Details', icon: <IconWrapper icon={FileText} size={0} isInActiveIcon={true} customIconSize={4} />,
            activeIcon: <IconWrapper icon={FileText} size={0} isActiveIcon={true} customIconSize={4} />,
        },
        {
            name: 'candidate', label: 'Candidates', icon: <IconWrapper icon={Users} size={0} isInActiveIcon={true} customIconSize={4} />,
            activeIcon: <IconWrapper icon={Users} size={0} isActiveIcon={true} customIconSize={4} />,
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
                closeMutation.mutate({ jobId: mainId, closeReason });
                break;
            case ACTION_TYPES.REOPEN:
                reOpenMutation.mutate(job._id)
                break;
            case ACTION_TYPES.EDIT:
                navigate(role === "Admin" ? `/admin/edit-job/${mainId}` : `/hiring-manager/edit-job/${mainId}`);
                setModalOpen(false);
                break;
            default:
                console.log('Unknown action:', modalAction);
        }
    };


    // Fetch job data
    const { data: formData, isLoading: isJobLoading } = useQuery({
        queryKey: ['job', mainId],
        queryFn: () => axios.get(`/jobs/getJobById/${mainId}`).then(res => res.data),
    });


    //fetch all candidate data for the respective job we have
    const { data: candidatesData, isLoading: isCandidatesLoading } = useQuery({
        queryKey: ['candidates', mainId],
        queryFn: () => axios.get(`/admin/candidate/${mainId}`).then(res => res.data),
    });
    // console.log("this tabel data", candidatesData);

    // Add new query for job statistics
    const { data: jobStats = { data: { totalCount: 0, stageStats: {}, jobDetails: {} } },
        isLoading: isStatsLoading
    } = useQuery({
        queryKey: ['jobStats', mainId],
        queryFn: () => axios.get(`jobs/stats/job/${mainId}`).then(res => res.data),
    });


    // Mutations
    const deleteMutation = useMutation({
        mutationFn: (mainId) => axios.delete(`/jobs/deleteJob/${mainId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['job'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const draftMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/jobs/draftJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const closeMutation = useMutation({
        mutationFn: ({ jobId, reason }) => axios.put(`/jobs/closeJob/${jobId}`, { reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    });

    const reOpenMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/jobs/reOpen/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
            navigate(-1);
        },
    })

    //scroll preserve for table
    // 2. Restore scroll position after data is loaded
    useEffect(() => {
        if (!isCandidatesLoading && activeTab === "candidate") {
            const savedScrollY = sessionStorage.getItem('job_candidates_scroll_position');
            if (savedScrollY) {
                requestAnimationFrame(() => {
                    document.getElementById('adminContainer').scrollTo(0, parseFloat(savedScrollY));
                });
            }
        }
    }, [isCandidatesLoading, activeTab]);

    // Show loader if data is loading
    // Show loader if any data is loading
    if (isJobLoading || isCandidatesLoading || isStatsLoading) {
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
        { title: 'Total', value: jobStats?.data?.totalCount || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Users} />, statistics: applicationsReceivedStats },
        { title: 'Portfolio', value: jobStats?.data?.stageStats?.Portfolio || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Folder} /> },
        { title: 'Screening', value: jobStats?.data?.stageStats?.Screening || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={MonitorDot} /> },
        { title: 'Design Task', value: jobStats?.data?.stageStats['Design Task'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
        { title: 'Round 1', value: jobStats?.data?.stageStats['Round 1'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
        { title: 'Round 2', value: jobStats?.data?.stageStats['Round 2'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
        { title: 'Offer Sent', value: jobStats?.data?.stageStats?.Hired || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
    ];

    const jobsDetailStats = [
        { title: 'Clicks', value: jobStats?.data?.jobDetails?.views || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Eye} /> },
        { title: 'Applications Received', value: jobStats?.data?.jobDetails?.applicationsReceived || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={File} />, statistics: applicationsReceivedStats },
        { title: 'Qualified applications', value: jobStats?.data?.jobDetails?.qualifiedApplications || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Check} /> },
        { title: 'Engagement Rate', value: `${jobStats?.data?.jobDetails?.engagementRate || 0}%`, icon: () => <IconWrapper size={10} isInActiveIcon icon={MousePointer2} /> },
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
                withKebab="true"
                withBack="true"
                onBack={() => navigate(-1)}
                job={formData}
                handleAction={handleAction}
                rightContent={
                    <Tabs
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />
                }
            />


            {activeTab === 'jobDetails' && (
                <StyledCard padding={2} backgroundColor={"bg-background-30"}>
                    <StatsGrid stats={jobsDetailStats} />
                    <div className='flex justify-between mt-4' >
                        <div className='w-4/5   '>
                            <h2 className="typography-h4 mb-2">Job Description</h2>
                            <div className='text-font-gray font-outfit' dangerouslySetInnerHTML={{ __html: formData.jobDescription ? formatDescription(formData.jobDescription) : '' }}></div>
                            <h3 className="typography-h3 mt-4 mb-2">Skills</h3>
                            <div className='flex flex-wrap gap-2'>
                                {formData.skills && formData.skills.map((skill, index) => (
                                    <CustomBadge key={index} label={skill} borderRadius={10} />
                                ))}
                            </div>
                        </div>
                        <div className='pb-2 '>
                            <SideCard formData={formData} />
                        </div>
                    </div>

                    <StyledCard padding={2} extraStyles='mt-12'>
                        <h3 className='typography-h3 mb-4'>Additional Questions</h3>
                        {questions.map((question, index) => (
                            <div key={question._id} className="mb-4">
                                <label className="typography-body">
                                    Q{index + 1}. {question.text}
                                    {question.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {(
                                    question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="my-2 typography-body flex justify-start items-center gap-3">
                                            <div className='typography-small-p text-font-gray'>Option {optionIndex + 1}  </div>
                                            {/* <div className='w-4'>
                                                </div> */}
                                            <label htmlFor={`question-${question._id}-option-${optionIndex}`}>{option}</label>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))}
                    </StyledCard>
                </StyledCard>
            )}

            {activeTab === 'candidate' && (
                <StyledCard backgroundColor={"bg-background-30"} padding={0} extraStyles={"py-4 pl-4"}>
                    <div className="mb-4">
                        <StatsGrid stats={candidateStats} />
                    </div>
                    <div className='mr-4'>
                        <Table
                            jobId={mainId} // Pass jobId to Table component
                            jobData={formData}
                        >
                        </Table>
                    </div>
                </StyledCard>
            )}

            <Modal
                open={modalOpen}
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
