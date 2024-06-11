import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import EditIcon from '../../svg/EditIcon';
// import { Link, Navigate } from 'react-router-dom';
// import useHistory from 'react-router-dom';

const CreateJobs = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        workplaceType: '',
        employeeLocation: '',
        employmentType: '',
        jobProfile: '',
        fromExperience: '',
        toExperience: '',
        budgetFrom: '',
        budgetTo: '',
        jobDescription: '',
        status:'',
        skills: [],
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        console.log(formData);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataWithStatus = { ...formData, status: 'open' };
            const response = await axios.post('http://localhost:8008/api/createJobs', formDataWithStatus);
            console.log('Job created successfully:', response.data);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const handleSaveForLater = async () => {
        await postJobData({ ...formData, status: 'draft' });
    };

    const postJobData = async (data) => {
        try {
            const response = await axios.post('http://localhost:8008/api/createJobs', data);
            console.log('Job created successfully:', response.data);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const back = () => {
        navigate('/admin/jobs');
    };

    const setSkills = (skills) => {
        setFormData({ ...formData, skills });
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

    const paths = [
        { name: 'Jobs', href: '/admin/jobs' },
        { name: 'Create a New job listing', href: '/admin/create-job' },
    ];

    const allSkills = ['React', 'React Native', 'Redux', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB'];

    return (
        <div className="ml-52 pt-4">
            <Breadcrumb paths={paths} />
            <div className="max-w-2xl mx-24 py-10">
                <div onClick={back}>Back</div>
                <h2 className="text-3xl font-bold mb-6">Create a New Job Listing</h2>
                <form onSubmit={handleSubmit}>
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
                                <option value="Full Time">Full Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
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
                                <option value="">UI UX</option>
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
                    <div className="flex justify-end mt-4">
                        <button type="submit" name="createJob" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                            Create Job Listing
                        </button>
                        <button type="button" onClick={handleSaveForLater} name="saveForLater" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                            Save for Later
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateJobs;


const SkillsInput = ({ skills, setSkills, allSkills }) => {
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const trimmedSkill = skill.trim();
            if (trimmedSkill && !skills.includes(trimmedSkill)) {
                setSkills([...skills, trimmedSkill]);
                setSkill('');
                setError('');
                setSuggestions([]);
            } else {
                setError('Same value not allowed');
            }
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSkill(inputValue);
        if (inputValue) {
            const filteredSuggestions = allSkills.filter((s) =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!skills.includes(suggestion)) {
            setSkills([...skills, suggestion]);
            setSkill('');
            setError('');
            setSuggestions([]);
        } else {
            setError('Same value not allowed');
        }
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
            {suggestions.length > 0 && (
                <div className="border border-gray-300 rounded mt-2">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};


