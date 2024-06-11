import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Tabs from '../../components/Tabs';
import ThreeDots from '../../components/ThreeDots';
import Modal from '../../components/Modal';
import { formatDescription } from '../../utility/formatDescription';
import EmploymentTypeIcon from '../../svg/EmploymentTypeIcon';
import DesignIcon from '../../svg/DesignIcon';
import ExperienceLevelIcon from '../../svg/ExperienceLevelIcon';
import PostedIcon from '../../svg/PostedIcon';
import { postedDate } from '../../utility/postedDate';
import StatsGrid from '../../components/StatsGrid';
import { DataGrid } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import InputPopUpModal from '../../components/InputPopUpModal';

const ViewJobs = () => {
    const [formData, setFormData] = useState(null);
    const { id: mainId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('candidate'); // State to track active tab
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
        // Handle confirm action
        console.log('Confirmed with selections:', selectedValue1, selectedValue2);
        setIsModalOpen(false);
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

    const [open, setOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [modalAction, setModalAction] = useState('');

    const confirmAction = () => {
        if (modalAction === 'delete') {
            axios.delete(`http://localhost:8008/api/deleteJob/${selectedJobId}`)
                .then(() => {
                    console.log("Job deleted successfully");
                    setOpen(false);
                    navigate(-1)
                })
                .catch(error => {
                    console.error("Failed to delete the job", error);
                });
        }
        if (modalAction === 'draft') {
            axios.put(`http://localhost:8008/api/draftJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job closed successfully:", response.data.message);
                    // const updatedJobs = openJobs.map(job => {
                    //     if (job._id === selectedJobId) {
                    //         return { ...job, status: 'draft' };
                    //     }
                    //     return job;
                    // });
                    // setOpenJobs(updatedJobs);
                    setOpen(false);
                    navigate(-1)
                })
                .catch(error => {
                    console.error("Failed to archive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'closed') {
            axios.put(`http://localhost:8008/api/unarchiveJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job unarchived successfully:", response.data.message);
                    // const updatedJobs = closedJobs.map(job => {
                    //     if (job._id === selectedJobId) {
                    //         return { ...job, status: 'closed' };
                    //     }
                    //     return job;
                    // });
                    // setClosedJobs(updatedJobs);
                    setOpen(false);
                    navigate(-1)
                })
                .catch(error => {
                    console.error("Failed to unarchive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'edit') {
            navigate(`/admin/edit-job/${selectedJobId}`);
        }
    };


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/getJobById/${mainId}`);
                console.log(response.data)
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };
        fetchJob();
    }, [mainId]);

    if (!formData) {
        return <div>Loading...</div>;  // Show a loading message or spinner until the data is loaded
    }
    console.log(formData);


    const handleEditClick = () => {
        navigate(`/admin/edit-job/${mainId}`);
    }
    const paths = [
        { name: 'Jobs', href: '/admin/jobs' },
        { name: `${formData.jobTitle}`, href: '/admin/create-job' },
    ];
    const back = () => {
        navigate('/admin/jobs');
    };

    const handleAction = (action, jobId) => {
        setOpen(true);
        setSelectedJobId(jobId);
        setModalAction(action);
    };



    const currentPage = 'viewJob';


    const candidateStats = [
        { title: 'Total', value: "0" },
        { title: 'Portfolio', value: '0' },
        { title: 'Screening', value: '0' },
        { title: 'Design Task', value: '0' },
        { title: 'Round 1', value: '0' },
        { title: 'Round 2', value: '0' },
        { title: 'Offer Sent', value: '0' },
        // Add more stats as needed
    ];

    const jobsDetailStats = [
        { title: 'Views', value: "0" },
        { title: 'Applications Received', value: '156' },
        { title: 'Qualified applications', value: '80' },
        { title: 'Engagement Rate', value: '78%' },
        // Add more stats as needed
    ];





    return (
        <div className="ml-52 pt-4">
            <div onClick={back}>Back</div>
            <div className='flex justify-between'>
                <div>
                    <Breadcrumb paths={paths} />
                    <h1 className='text-2xl font-bold'>{formData.jobTitle}</h1>
                </div>
                {activeTab === 'jobDetails' && (
                    <div className='flex gap-4'>
                        <button onClick={handleEditClick} className=" text-black outline px-2 outline-black rounded">Edit Job Posting</button>
                        <div className='outline rounded w-[32px] h-[32px] px-2 py-2 flex items-center justify-center'  >  <ThreeDots job={formData} handleAction={handleAction} page={currentPage} /> </div>

                    </div>
                )
                }
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />

            {
                activeTab === 'jobDetails' && (
                    <div>
                        <StatsGrid stats={jobsDetailStats} />
                        <div className='flex '>
                            <div className='w-[70%]'>
                                <h2 className="text-xl font-bold mt-4 mb-2">Job Description</h2>
                                <div dangerouslySetInnerHTML={{ __html: formatDescription(formData.jobDescription) }}></div>
                                <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
                                {
                                    formData.skills && formData?.skills?.map((skill, index) => {
                                        return <span key={index} className="bg-[#C3C6D5] mr-4 text-black px-2 py-1 rounded-[50px]">{skill}</span>
                                    })
                                }
                            </div>
                            <div>
                                <SideCard formData={formData} />
                            </div>
                        </div>
                    </div>

                )
            }

            {
                activeTab === 'candidate' && (
                    <div >
                        <StatsGrid stats={candidateStats} />
                        <div className='flex'>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataTable/>    
                        </div>
                        </div>
                    </div>

                )
            }

            <button onClick={() => setIsModalOpen(true)}>Open Input Modal</button>
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

            <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />

        </div>
    )

};

export default ViewJobs;





const SideCard = ({ formData }) => {
    const formattedDate = postedDate(formData.createdAt);
    return (

        <div className="flex flex-col gap-2 border p-4 rounded w-max" >
            <div className="flex items-center">
                <EmploymentTypeIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize">{formData.employmentType}</p>
                    <p className="text-sm">Employment Type</p>
                </div>
            </div>
            <div className="flex items-center">
                <DesignIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formData.jobProfile}</p>
                    <p className="text-sm">Job Profile</p>
                </div>
            </div>

            <div className="flex items-center">
                <ExperienceLevelIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formData.fromExperience} - {formData.toExperience} Year</p>
                    <p className="text-sm">Experience Level</p>
                </div>
            </div>

            <div className="flex items-center">
                <PostedIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formattedDate}</p>
                    <p className="text-sm">Date Posted </p>
                </div>
            </div>

        </div>

    )
}