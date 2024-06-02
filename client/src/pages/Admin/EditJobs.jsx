import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobs = () => {
    const [formData, setFormData] = useState(null);
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    console.log(mainId);

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

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const generateToOptions = (fromValue, max, unit) => {
        let options = [];
        for (let i = fromValue + 1; i <= max; i++) {
            options.push(
                <option key={i} value={i}>{i} {unit}</option>
            );
        }
        return options;
    };

    const setSkills = (skills) => {
        setFormData({ ...formData, skills });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8008/api/editJob/${mainId}`, formData);
            console.log('Job updated successfully:', response.data);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const handleSubmitForActive = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8008/api/editJob/${mainId}`, { ...formData, status: 'active' });
            console.log('Job updated successfully:', response.data);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    }

    const allSkills = ['React', 'React Native', 'Redux', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB'];

    return (
        <div className="ml-52 pt-4">
        <div className="max-w-2xl mx-24 py-10">
            <h2 className="text-3xl font-bold mb-6">Edit Job Listing</h2>
            <form onSubmit={handleSubmitForActive}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Title*</label>
                            <input
                                id="jobTitle"
                                type="text"
                                placeholder="Enter job title"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Workplace Type*</label>
                            <input
                                id="workplaceType"
                                type="text"
                                placeholder="Enter your location"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.workplaceType}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employee Location*</label>
                            <select
                                id="employeeLocation"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.employeeLocation}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-Select-</option>
                                <option value="india">India</option>
                                <option value="usa">USA</option>
                                <option value="dubai">Dubai</option>
                                {/* Add options here */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employment Type*</label>
                            <select
                                id="employmentType"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.employmentType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-Select-</option>
                                <option value="fulltime">Full Time</option>
                                <option value="internship">Internship</option>
                                <option value="contract">Contract</option>
                                {/* Add options here */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Profile*</label>
                            <select
                                id="jobProfile"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.jobProfile}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-Select-</option>
                                <option value="frontenddeveloper">Frontend Developer</option>
                                <option value="uiux">UI UX</option>
                                <option value="motiongraphic">Motion Graphic</option>
                                <option value="3d">3D</option>
                                <option value="videoeditor">Video Editor</option>
                                <option value="digitalmarketingexecutive">Digital Marketing Executive</option>
                                <option value="projectmanager">Project Manager</option>
                                <option value="artdirector">Art Director</option>    
                                {/* Add options here */}
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Experience*</label>
                                <div className="flex space-x-2">
                                    <select
                                        id='fromExperience'
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.fromExperience}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">From</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <select
                                        id='toExperience'
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.toExperience}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">To</option>
                                        {formData.fromExperience && generateToOptions(parseInt(formData.fromExperience, 10), 4, "")}
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Budget*</label>
                                <div className="flex space-x-2">
                                    <select
                                        id='budgetFrom'
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.budgetFrom}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">From</option>
                                        <option value="1">1 Lpa</option>
                                        <option value="2">2 Lpa</option>
                                        <option value="3">3 Lpa</option>
                                        <option value="4">4 Lpa</option>
                                    </select>
                                    <select
                                        id='budgetTo'
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={formData.budgetTo}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">To</option>
                                        {formData.budgetFrom && generateToOptions(parseInt(formData.budgetFrom, 10), 4, "Lpa")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor="skills" className="block font-bold mb-2">
                                Skills*
                            </label>
                            <SkillsInput skills={formData.skills} setSkills={setSkills} allSkills={allSkills} />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="jobDescription" className="block font-bold mb-2">
                                Job Description*
                            </label>
                            <textarea
                                id="jobDescription"
                                placeholder="Write a job description"
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                required
                                rows="10"
                            ></textarea>
                        </div>
                    </div>

                <div className="flex justify-end">
                    <button type="button" onClick={handleSubmit} name="createJob" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Save
                    </button>
                    {
                        formData.status === 'draft' && (
                            <button type="submit" name="publish" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Make It Active
                            </button>
                        )
                    }

                    {/* <button type="button" onClick={handleSaveForLater} name="saveForLater" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Save for Later
                    </button> */}
                </div>
            </form>
        </div>
        </div>
    );
};

export default EditJobs;

const SkillsInput = ({ skills, setSkills }) => {
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const trimmedSkill = skill.trim();
            if (trimmedSkill && !skills.includes(trimmedSkill)) {
                setSkills([...skills, trimmedSkill]);
                setSkill('');
                setError('');
            } else {
                setError('Same value not allowed');
            }
        }
    };

    const handleInputChange = (event) => {
        setSkill(event.target.value);
    };

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, idx) => idx !== index);
        setSkills(newSkills);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-100 rounded px-2">
                        {skill}
                        <button onClick={() => removeSkill(index)} className="text-blue-500 hover:text-blue-700">✖</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={skill}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add skills"
                    className="outline-none"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};
