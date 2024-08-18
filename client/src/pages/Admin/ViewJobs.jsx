// ViewJobs.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import Tabs from '../../components/Tabs';
import StatsGrid from '../../components/StatsGrid';
import Modal from '../../components/Modal';
import InputPopUpModal from '../../components/InputPopUpModal';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/SideCard';
import Table from '../../components/Table';
import one from '../../svg/StatsCard/Jobs Page/one';
import Header from '../../components/utility/Header';
import { ACTION_TYPES } from '../../utility/ActionTypes';


const ViewJobs = () => {
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const [closeReason, setCloseReason] = useState('');

    const [activeTab, setActiveTab] = useState('candidate');

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        { name: 'jobDetails', label: 'Job Detail' },
        { name: 'candidate', label: 'Candidate' }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');

    const handleConfirm = () => {
        console.log('Confirmed with selections:', selectedValue1, selectedValue2);
        setIsModalOpen(false);
    };

    const handleCloseReasonChange = (reason) => {
        setCloseReason(reason);
    };

    const fields = [
        {
            type: 'select',
            label: 'Start Range',
            value: selectedValue1,
            onChange: (e) => setSelectedValue1(e.target.value),
            options: [
                { value: '1', label: '1 Lpa' },
                { value: '2', label: '2 Lpa' },
                { value: '3', label: '3 Lpa' },
                { value: '4', label: '4 Lpa' },
                { value: '5', label: '5 Lpa' },
            ],
        },
        {
            type: 'select',
            label: 'End Range',
            value: selectedValue2,
            onChange: (e) => setSelectedValue2(e.target.value),
            options: [
                { value: '1', label: '1 Lpa' },
                { value: '2', label: '2 Lpa' },
                { value: '3', label: '3 Lpa' },
                { value: '4', label: '4 Lpa' },
                { value: '5', label: '5 Lpa' },
            ],
        },
    ];


    const confirmAction = (job) => {
        switch (modalAction) {
            case ACTION_TYPES.DELETE:
                deleteMutation.mutate(job._id);
                break;
            case ACTION_TYPES.DRAFT:
                draftMutation.mutate(job._id);
                break;
            case ACTION_TYPES.CLOSE:
                closeMutation.mutate({ jobId: job._id, closeReason });
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
        queryFn: () => axios.get(`http://localhost:8008/api/v1/getJobById/${mainId}`).then(res => res.data),
    });

    // Fetch candidates data
    const { data: candidatesData, isLoading: isCandidatesLoading } = useQuery({
        queryKey: ['candidates', mainId],
        queryFn: () => axios.get(`http://localhost:8008/api/v1/candidates/${mainId}/candidates`).then(res => res.data),
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: (jobId) => axios.delete(`/deleteJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const draftMutation = useMutation({
        mutationFn: (jobId) => axios.put(`/draftJob/${jobId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const closeMutation = useMutation({
        mutationFn: ({ jobId, reason }) => axios.put(`/closeJob/${jobId}`, { reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            setModalOpen(false);
        },
    });

    const updateCandidateMutation = useMutation({
        mutationFn: ({ id, updates }) => axios.patch(`http://localhost:8008/api/v1/candidates/update/${id}`, updates),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(['candidates', mainId], (oldData) =>
                oldData.map(candidate =>
                    candidate._id === variables.id ? { ...candidate, ...data } : candidate
                )
            );
        },
    });

    const updateCandidate = (id, updates) => {
        updateCandidateMutation.mutate({ id, updates });
    };



    useEffect(() => {
        if (mainId) {
            localStorage.setItem('currentJobId', mainId);
        }
    }, [mainId]);

    // useEffect(() => {
    //     fetchJobData();
    //     fetchCandidatesData();
    // }, [mainId, location]);

    // if (!formData) {
    //     return <div>Loading...</div>;
    // }

    if (isJobLoading || isCandidatesLoading) {
        return <div>Loading...</div>;
    }




    const candidateStats = [
        { title: 'Total', value: candidatesData.length.toString(), icon: one },
        { title: 'Portfolio', value: candidatesData.filter(c => c.stage === 'Portfolio').length.toString(), icon: one },
        { title: 'Screening', value: candidatesData.filter(c => c.stage === 'Screening').length.toString(), icon: one },
        // { title: 'Design Task', value: candidatesData.filter(c => c.stage === 'Design Task').length.toString() , icon: one},
        { title: 'Round 1', value: candidatesData.filter(c => c.stage === 'Round 1').length.toString(), icon: one },
        // { title: 'Round 2', value: candidatesData.filter(c => c.stage === 'Round 2').length.toString() , icon: one},
        // { title: 'Offer Sent', value: candidatesData.filter(c => c.stage === 'Hired').length.toString() , icon: one},
    ];

    const jobsDetailStats = [
        { title: 'Views', value: "0", icon: one },
        { title: 'Applications Received', value: candidatesData.length.toString(), icon: one },
        { title: 'Qualified applications', value: '80', icon: one },
        { title: 'Engagement Rate', value: '78%', icon: one },
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
        <div className="mx-4 pt-4 h-screen">
           
            <Header HeaderText={formData.jobTitle} withKebab="true" job={formData} handleAction={handleAction}></Header>
            <div className='absolute right-24 top-5'>
                <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>


            {activeTab === 'jobDetails' && (
                <div>
                    <StatsGrid stats={jobsDetailStats} />
                    <div className='flex '>
                        <div className='w-[70%]'>
                            <h2 className="text-xl font-bold mt-4 mb-2">Job Description</h2>
                            <div dangerouslySetInnerHTML={{ __html: formatDescription(formData.jobDescription) }}></div>
                            <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
                            {formData.skills && formData.skills.map((skill, index) => (
                                <span key={index} className="bg-[#C3C6D5] mr-4 text-black px-2 py-1 rounded-[50px]">{skill}</span>
                            ))}
                        </div>
                        <div>
                            <SideCard formData={formData} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'candidate' && (
                <div>
                    <div>
                        <StatsGrid stats={candidateStats} />
                    </div>
                    <div className='flex'>
                        <div>
                            <Table rowsData={candidatesData} onUpdateCandidate={updateCandidate} />
                            {/* <DataTable rowsData={candidatesData} onUpdateCandidate={updateCandidate} onUpdateAssignee={updateAssignee} onUpdateRating={updateRating}/> */}
                        </div>
                    </div>
                </div>
            )}

            <InputPopUpModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                confirmAction={handleConfirm}
                fields={fields}
                heading="Screen with Budget"
                para="Candidates will no longer be able to apply. Are you sure you want to close this job?"
                confirmButtonText="Apply Budget"
                cancelButtonText="Cancel"
            />

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
