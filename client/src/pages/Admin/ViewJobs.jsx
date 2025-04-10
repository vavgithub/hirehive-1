// ViewJobs.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import Tabs from '../../components/ui/Tabs';
import StatsGrid from '../../components/ui/StatsGrid';
import Modal from '../../components/Modal';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/ui/SideCard';
import Table from '../../components/Table';
import one from '../../svg/StatsCard/Jobs Page/one';
import Header from '../../components/utility/Header';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import { ApplicationIcon, ApplicationIconActive } from '../../svg/Tabs/ApplicationIcon';
import { CandidateDetailsIcon, CandidateDetailsIconActive } from '../../svg/Tabs/CandidateDetailsIcon';
import Total from '../../svg/StatsCard/View Candidate/Total';
import Portfolio from '../../svg/StatsCard/View Candidate/Portfolio';
import Screening from '../../svg/StatsCard/View Candidate/Screening';
import DesignTask from '../../svg/StatsCard/View Candidate/DesignTask';
import Round1 from '../../svg/StatsCard/View Candidate/Round1';
import Round2 from '../../svg/StatsCard/View Candidate/Round2';
import OfferSent from '../../svg/StatsCard/View Candidate/OfferSent';
import EngRate from '../../svg/StatsCard/View Details/EngRate';
import QuaApp from '../../svg/StatsCard/View Details/Portfolio';
import AppRec from '../../svg/StatsCard/View Details/AppRec';
import Views from '../../svg/StatsCard/View Details/Views';
import Loader from '../../components/ui/Loader';
import StyledCard from '../../components/ui/StyledCard';


const ViewJobs = () => {
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
            name: 'jobDetails', label: 'Job Details', icon: <CandidateDetailsIcon />,
            activeIcon: <CandidateDetailsIconActive />,
        },
        {
            name: 'candidate', label: 'Candidates', icon: <ApplicationIcon />,
            activeIcon: <ApplicationIconActive />,
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
            case ACTION_TYPES.EDIT:
                navigate(`/admin/edit-job/${mainId}`);
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
    }, [isCandidatesLoading,activeTab]);

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
        monthly : `${jobStats?.data?.comparison?.applicationsReceived?.monthly ?? 0}% since last month`,
        weekly : `${jobStats?.data?.comparison?.applicationsReceived?.weekly ?? 0}% since last week`,
        daily : `${jobStats?.data?.comparison?.applicationsReceived?.daily ?? 0}% since yesterday`,
    }

    // Update the stats arrays to use the fetched data
    const candidateStats = [
        { title: 'Total', value: jobStats?.data?.totalCount || 0, icon: Total , statistics : applicationsReceivedStats},
        { title: 'Portfolio', value: jobStats?.data?.stageStats?.Portfolio || 0, icon: Portfolio },
        { title: 'Screening', value: jobStats?.data?.stageStats?.Screening || 0, icon: Screening },
        { title: 'Design Task', value: jobStats?.data?.stageStats['Design Task'] || 0, icon: DesignTask },
        { title: 'Round 1', value: jobStats?.data?.stageStats['Round 1'] || 0, icon: Round1 },
        { title: 'Round 2', value: jobStats?.data?.stageStats['Round 2'] || 0, icon: Round2 },
        { title: 'Offer Sent', value: jobStats?.data?.stageStats?.Hired || 0, icon: OfferSent },
    ];

    const jobsDetailStats = [
        { title: 'Clicks', value: jobStats?.data?.jobDetails?.views || 0, icon: Views },
        { title: 'Applications Received', value: jobStats?.data?.jobDetails?.applicationsReceived || 0, icon: AppRec , statistics : applicationsReceivedStats},
        { title: 'Qualified applications', value: jobStats?.data?.jobDetails?.qualifiedApplications || 0, icon: QuaApp },
        { title: 'Engagement Rate', value: `${jobStats?.data?.jobDetails?.engagementRate || 0}%`, icon: EngRate },
    ];


    const handleAction = (action, jobId) => {
        setModalOpen(true);
        setSelectedJob(jobId);
        setModalAction(action);
    };

    const getModalMessage = (action, job) => {
        switch (action) {
            case ACTION_TYPES.DELETE:
                return `Are you sure you want to delete the "${formData.jobTitle}" job post?`;
            case ACTION_TYPES.EDIT:
                return `Are you sure you want to edit the "${formData.jobTitle}" job post?`;
            case ACTION_TYPES.DRAFT:
                return `Are you sure you want to move "${formData.jobTitle}" to drafts?`;
            case ACTION_TYPES.CLOSE:
                return `Are you sure you want to close the "${formData.jobTitle}" job post?`;
            case ACTION_TYPES.REJECT:
                return `Are you sure you want to reject the candidate for "${formData.jobTitle}"?`;
            case ACTION_TYPES.ARCHIVE:
                return `Are you sure you want to archive the "${formData.jobTitle}" job post?`;
            default:
                return `Are you sure you want to perform this action on "${formData.jobTitle}"?`;
        }
    };


    return (
        <div className="px-4 pt-4 container h-screen w-full">
                <Header 
                HeaderText={formData?.jobTitle} 
                withKebab="true" 
                withBack="true"
                onBack={() => navigate("/admin/jobs")} 
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
            {/* <div className='absolute right-24 top-5'>
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div> */}

            {activeTab === 'jobDetails' && (
                <StyledCard padding={2} backgroundColor={"bg-background-30"}>
                    <StatsGrid stats={jobsDetailStats} />
                    <div className='flex justify-between'>
                        <div className='w-4/5   '>
                            <h2 className="typography-h4 mt-4 mb-2">Job Description</h2>
                            <div className='text-font-gray font-outfit' dangerouslySetInnerHTML={{ __html: formData.jobDescription ? formatDescription(formData.jobDescription) : '' }}></div>
                            <h2 className="text-[16px] font-outfit font-bold mt-4 mb-5">Skills</h2>
                            <div className='flex flex-wrap gap-3'>
                                {formData.skills && formData.skills.map((skill, index) => (
                                    <span key={index} className="flex justify-center font-outfit w-fit bg-background-70 m px-6 py-2 rounded-full">{skill}</span>))}
                            </div>
                        </div>
                        <div className='pb-4'>
                            <SideCard formData={formData} />
                        </div>
                    </div>

                    <StyledCard padding={2} extraStyles='mt-12'>   
                        <h3 className='typography-h3 mb-4'>Additional Questions</h3>
                        {questions.map((question, index) => (
                            <div key={question._id} className="mb-4">
                                <label className="typography-body">
                                    Q{index + 1}. { question.text} 
                                    {question.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {(
                                    question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="my-2 typography-body flex justify-start items-center gap-3">
                                            <div className='typography-small-p text-font-gray'>Option {optionIndex+1}  </div> 
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
               <StyledCard backgroundColor={"bg-background-30"} padding={2}>
                    <div className="mb-2">
                        <StatsGrid stats={candidateStats} />
                    </div>
                        <div className='w-full'>
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
                customMessage={selectedJob ? getModalMessage(modalAction, selectedJob) : ''}
                closeReason={closeReason}
                onCloseReasonChange={handleCloseReasonChange}
            />
        </div>
    );
};

export default ViewJobs;
