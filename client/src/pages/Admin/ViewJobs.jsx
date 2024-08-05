// ViewJobs.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import Breadcrumb from '../../components/Breadcrumb';
import Tabs from '../../components/Tabs';
import StatsGrid from '../../components/StatsGrid';
import Modal from '../../components/Modal';
import InputPopUpModal from '../../components/InputPopUpModal';
import ThreeDots from '../../components/ThreeDots';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/SideCard';
import Table from '../../components/Table';
import one from '../../svg/StatsCard/Jobs Page/one';


const ViewJobs = () => {
    const [formData, setFormData] = useState(null);
    const [candidatesData, setCandidatesData] = useState([]);
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('candidate');
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
                    navigate(-1);
                })
                .catch(error => {
                    console.error("Failed to delete the job", error);
                });
        }
        if (modalAction === 'draft') {
            axios.put(`http://localhost:8008/api/draftJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job closed successfully:", response.data.message);
                    setOpen(false);
                    navigate(-1);
                })
                .catch(error => {
                    console.error("Failed to archive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'closed') {
            axios.put(`http://localhost:8008/api/unarchiveJob/${selectedJobId}`)
                .then(response => {
                    console.log("Job unarchived successfully:", response.data.message);
                    setOpen(false);
                    navigate(-1);
                })
                .catch(error => {
                    console.error("Failed to unarchive the job", error.response ? error.response.data.message : "No additional error information");
                });
        }
        if (modalAction === 'edit') {
            navigate(`/admin/edit-job/${selectedJobId}`);
        }
    };

    const fetchJobData = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/api/getJobById/${mainId}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    };

    const fetchCandidatesData = async () => {
        try {
            const response = await axios.get(`http://localhost:8008/api/v1/candidates/${mainId}/candidates`);
            console.log(candidatesData)
            setCandidatesData(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const updateCandidate = async (id, updates) => {
        try {
            const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update/${id}`, updates);
            const updatedCandidate = response.data;
            setCandidatesData(prevCandidates =>
                prevCandidates.map(candidate => 
                    candidate._id === id ? { ...candidate, ...updatedCandidate } : candidate
                )
            );
        } catch (error) {
            console.error('Error updating candidate:', error);
        }
    };

    // const updateAssignee = async (candidatesData) => {
    //     try {
    //       const response = await axios.patch('http://localhost:8008/api/v1/candidates/update-assignee', {
    //         candidatesData
    //       });
    
    //       if (response.status === 200) {
    //         // Update the local state with the updated assignees
    //         setCandidatesData(prevCandidates =>
    //           prevCandidates.map(candidate => {
    //             const updated = candidatesData.find(c => c.id === candidate._id);
    //             return updated ? { ...candidate, assignee: updated.assignee } : candidate;
    //           })
    //         );
    //         console.log('Assignees updated successfully on the server.');
    //       } else {
    //         throw new Error(`Failed to update assignee, response status: ${response.status}`);
    //       }
    //     } catch (error) {
    //       console.error('Error updating assignee:', error);
    //       if (error.response) {
    //         console.error('Server responded with:', error.response.data);
    //       }
    //       throw error;
    //     }
    //   };

    const updateAssignee = async (candidatesData) => {
        try {
          const response = await axios.patch('http://localhost:8008/api/v1/candidates/update-assignee', {
            candidatesData
          });
      
          if (response.status === 200) {
            setCandidatesData(prevCandidates =>
              prevCandidates.map(candidate => {
                const updated = candidatesData.find(c => c.id === candidate._id);
                return updated ? { ...candidate, assignee: updated.assignee, status: updated.status } : candidate;
              })
            );
            console.log('Assignees and statuses updated successfully on the server.');
          } else {
            throw new Error(`Failed to update assignee and status, response status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error updating assignee and status:', error);
          if (error.response) {
            console.error('Server responded with:', error.response.data);
          }
          throw error;
        }
      };


      const updateRating = async (id, rating) => {
        try {
          const response = await axios.patch(`http://localhost:8008/api/v1/candidates/update-rating/${id}`, { rating });
          const updatedCandidate = response.data;
          setCandidatesData(prevCandidates =>
            prevCandidates.map(candidate => candidate._id === id ? updatedCandidate : candidate)
          );
          return updatedCandidate; // Return the updated candidate
        } catch (error) {
          console.error('Error updating candidate rating:', error);
          throw error; // Throw the error so it can be caught in the DataTable component
        }
      };
    

      useEffect(() => {
        if (mainId) {
          localStorage.setItem('currentJobId', mainId);
        }
      }, [mainId]); 

    useEffect(() => {
        fetchJobData();
        fetchCandidatesData();
    }, [mainId, location]);

    if (!formData) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/admin/edit-job/${mainId}`);
    };

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

    const candidateStats = [
        { title: 'Total', value: candidatesData.length.toString() , icon: one},
        { title: 'Portfolio', value: candidatesData.filter(c => c.stage === 'Portfolio').length.toString() , icon: one},
        { title: 'Screening', value: candidatesData.filter(c => c.stage === 'Screening').length.toString() , icon: one},
        // { title: 'Design Task', value: candidatesData.filter(c => c.stage === 'Design Task').length.toString() , icon: one},
        { title: 'Round 1', value: candidatesData.filter(c => c.stage === 'Round 1').length.toString() , icon: one},
        // { title: 'Round 2', value: candidatesData.filter(c => c.stage === 'Round 2').length.toString() , icon: one},
        // { title: 'Offer Sent', value: candidatesData.filter(c => c.stage === 'Hired').length.toString() , icon: one},
    ];

    const jobsDetailStats = [
        { title: 'Views', value: "0", icon: one },
        { title: 'Applications Received', value: candidatesData.length.toString(), icon: one },
        { title: 'Qualified applications', value: '80', icon: one },
        { title: 'Engagement Rate', value: '78%', icon: one },
    ];

    return (
        <div className="pt-4 w-full">
            <div onClick={back}>Back</div>
            <div className='flex justify-between'>
                <div>
                    <Breadcrumb paths={paths} />
                    <h1 className='text-2xl font-bold'>{formData.jobTitle}</h1>
                </div>
                {activeTab === 'jobDetails' && (
                    <div className='flex gap-4'>
                        <button onClick={handleEditClick} className=" text-black outline px-2 outline-black rounded">Edit Job Posting</button>
                        <div className='outline rounded w-[32px] h-[32px] px-2 py-2 flex items-center justify-center'>
                            <ThreeDots job={formData} handleAction={handleAction} page="viewJob" />
                        </div>
                    </div>
                )}
            </div>

            <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />

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
                            <Table rowsData={candidatesData} onUpdateCandidate={updateCandidate}/>
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

            <Modal open={open} onClose={() => setOpen(false)} action={modalAction} confirmAction={confirmAction} />
        </div>
    );
};

export default ViewJobs;
