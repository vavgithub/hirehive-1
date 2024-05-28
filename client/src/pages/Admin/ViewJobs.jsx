import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';





const ViewJobs = () => {
    const [formData, setFormData] = useState(null);
    const { id: mainId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('jobDescription'); // State to track active tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
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

    const candidates = [
        { name: 'Jordyn Press', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Ryan Bergson', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Angel Herwitz', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Jordyn Septimus', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Madelyn Aminoff', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Chance Workman', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
        { name: 'Adison Curtis', position: 'Senior UI/UX designer', experience: 4, rating: 4.0 },
    ];




    const jobData = {
        title: 'Senior UI/UX designer',
        overview: 'We\'re seeking a talented Senior UI/UX Designer to join our innovative team and play a pivotal role in shaping the user experience across our digital platforms. As a Senior UI/UX Designer, you\'ll lead design projects, set design standards, and mentor junior designers, contributing to the development of intuitive and visually appealing user interfaces that enhance user satisfaction and drive business growth.',
        jobType: 'Full-time',
        jobCategory: 'Design',
        postedDate: '08-04-2024',
        skills: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 3', 'Tag 3', 'Tag 3'],
        responsibilities: [
            'Lead and oversee UI/UX design projects from concept to completion, ensuring adherence to design standards and best practices.',
            'Collaborate with cross-functional teams to gather requirements, define user personas, and translate business objectives into design solutions.',
            'Create wireframes, mockups, and prototypes to visualize design concepts and iterate on designs based on user feedback.',
            'Conduct user research, usability testing, and analysis to identify user needs, preferences, and pain points, informing design decisions and improvements.',
        ],
        qualifications: [
            'Bachelor\'s degree in Graphic Design, Interaction Design, Human-Computer Interaction, or related field.',
            '5+ years of experience in UI/UX design, with a proven track record of delivering successful design projects.',
            'Strong portfolio showcasing a range of UI/UX design work, including wireframes, prototypes, and user interfaces.',
            'Proficiency in design tools such as Adobe Creative Suite, Sketch, Figma, or similar.',
            'Excellent communication, collaboration, and problem-solving skills, with the ability to work effectively in a fast-paced environment.',
        ],
    };

    const handleEditClick = () => {
        navigate(`/admin/edit-job/${mainId}`);
    }

    return (
        <div className='bg-white'>
            <div className="px-24 pt-4 h-[216px] bg-gray-200 flex flex-col justify-between">


                <div className="flex flex-col ">

                    <div className='flex justify-between mt-[60px]'>
                        <h1 className="text-2xl font-bold">{formData.title}</h1>
                        {/* <Link to={`edit-job/${mainId}`} className="bg-black text-white px-4 py-2 rounded">Edit job listing</Link> */}
                        <button onClick={handleEditClick} className="bg-black text-white px-4 py-2 rounded">Edit Job Listing</button>
                    </div>
                    <div className='flex gap-2'>
                        <span className='bg-gray-300 rounded capitalize'>{formData.category}</span>
                        <span className='bg-gray-300 rounded capitalize'>{formData.experienceLevel}</span>
                        <span className='bg-gray-300 rounded capitalize'>{formData.jobType}</span>
                    </div>
                </div>
                <div className='flex mt-[48px] gap-[76px]'>
                    <span className={activeTab === 'jobDescription' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('jobDescription')}>Job Description</span>
                    <span className={activeTab === 'candidate' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('candidate')}>Candidates</span>
                    <span className={activeTab === 'aboutCompany' ? 'underline cursor-pointer' : 'cursor-pointer'} onClick={() => handleTabClick('aboutCompany')}>About Company</span>


                </div>
            </div>
            {
                activeTab === 'jobDescription' && (

                    <div className=" bg-white  px-24 pt-4 p-6 ">
                        <h2 className="text-lg font-bold mb-2">Overview</h2>
                        <div className="mb-4">
                            <p className="text-gray-600">{formData.description}</p>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-2">Skills</h2>
                            <div className="flex flex-wrap">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md mr-2 mb-2"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-2">Responsibility</h2>
                            <div className="mb-4">
                                <p className="text-gray-600">{formData.requirements}</p>
                            </div>
                            {/* <ul className="list-disc pl-4">
                                {jobData.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="mb-2">
                                        {responsibility}
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-2">Qualification</h2>
                            <div className="mb-4">
                                <p className="text-gray-600">{formData.qualifications}</p>
                            </div>
                            {/* <ul className="list-disc pl-4">
                                {jobData.qualifications.map((qualification, index) => (
                                    <li key={index} className="mb-2">
                                        {qualification}
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                    </div>
                )
            }

            {
                activeTab === "candidate" && (
                    <div className="px-24 pt-4 bg-white p-4 rounded-md w-[70%] ">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="py-2 text-left">Name</th>
                                    <th className="py-2 text-left">Current Position</th>
                                    <th className="py-2 text-left">Experience</th>
                                    <th className="py-2 text-left">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 ">{candidate.name}</td>
                                        <td className="py-2 ">{candidate.position}</td>
                                        <td className="py-2 ">{candidate.experience}</td>
                                        <td className="py-2 ">{candidate.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }



        </div>



    )

};

export default ViewJobs;