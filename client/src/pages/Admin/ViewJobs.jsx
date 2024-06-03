import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Tabs from '../../components/Tabs';
import ThreeDots from '../../components/ThreeDots';

const ViewJobs = () => {
    const [formData, setFormData] = useState(null);
    const { id: mainId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('jobDetails'); // State to track active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        { name: 'jobDetails', label: 'Job Detail' },
        { name: 'candidate', label: 'Candidate' }
    ];


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


    return (
        <div className="ml-52 pt-4">
            <div onClick={back}>Back</div>
            <Breadcrumb paths={paths} />
            <h1 className='text-2xl font-bold'>{formData.jobTitle}</h1>
            <Tabs tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />

            <button onClick={handleEditClick} className=" text-black outline outline-black px-4 py-2 rounded">Edit Job Posting</button>
            <div className='border rounded w-min '  >  <ThreeDots job={formData} handleAction={handleAction} /> </div>


        </div>
    )

};

export default ViewJobs;