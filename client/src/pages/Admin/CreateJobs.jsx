import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import EditIcon from '../../svg/EditIcon';
// import { Link, Navigate } from 'react-router-dom';
// import useHistory from 'react-router-dom';

const CreateJobs = () => {

    const [formData, setFormData] = useState({
        jobtitle: '',
        location: '',
        jobType: '',
        category: '',
        experienceLevel: '',
        description: '',
        requirements: '',
        qualifications: '',
        skills: [],
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        console.log(formData)
    };


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Set status based on button clicked
            // const status = event.nativeEvent.submitter.name === 'createJob' ? 'active' : 'draft';
            const formDataWithStatus = { ...formData, status: 'active' };
            const response = await axios.post('http://localhost:8008/api/createJobs', formDataWithStatus);
            console.log('Job created successfully:', response.data);
            navigate('/admin/jobs'); // Navigate to homepage
            // const history = useHistory();
            // history.push('/'); // Navigate to homepage
            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            console.error('this if frotned error  creating job:', error);
            // Handle error: show error message or log to console
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
    }
    const setSkills = (skills) => {
        setFormData({ ...formData, skills });
    };
    const paths = [
        { name: 'Jobs', href: '/admin/jobs',},
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
                <div className="mb-4 flex justify-between">
                    <div className='w-1/2 mr-2'>
                        <label htmlFor="title" className="block font-bold mb-2">
                            Job Title*
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter job title"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='w-1/2 '>
                        <label htmlFor="location" className="block font-bold mb-2">
                            Location*
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter your location"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <div className="w-1/3 mr-2">
                        <label htmlFor="jobType" className="block font-bold mb-2">
                            Job Type*
                        </label>
                        <select
                            id="jobType"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="fulltime">Full-time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    <div className="w-1/3 mr-2">
                        <label htmlFor="category" className="block font-bold mb-2">
                            Category*
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="sales">Sales</option>
                            <option value="marketing">Marketing</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                        </select>
                    </div>

                    <div className="w-1/3 mr-2">
                        <label htmlFor="experienceLevel" className="block font-bold mb-2">
                            Experience Level*
                        </label>
                        <select
                            id="experienceLevel"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="entry">Entry Level</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>
                </div>

                <div className='mb-4'>
                    <label htmlFor="skills" className="block font-bold mb-2">
                        Skills*
                    </label>
                    <SkillsInput skills={formData.skills} setSkills={setSkills} allSkills={allSkills}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block font-bold mb-2">
                        Job Description*
                    </label>
                    <textarea
                        id="description"
                        placeholder="Write a job description"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label htmlFor="requirements" className="block font-bold mb-2">
                        Job Requirements*
                    </label>
                    <textarea
                        id="requirements"
                        placeholder="Write job requirements"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label htmlFor="qualifications" className="block font-bold mb-2">
                        Job Qualification*
                    </label>
                    <textarea
                        id="qualifications"
                        placeholder="Write job qualifactiona"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formData.qualifications}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit" name="createJob" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Create Job Listing
                    </button>
                    <button type="button" onClick={handleSaveForLater} name="saveForLater" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Save for Later
                    </button>
                </div>
            </form>
            <div className="container mx-auto p-4">
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title*</label>
                        <input
                            type="text"
                            placeholder="Enter job title"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Workplace Type*</label>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                       />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee Location*</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">-Select-</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employment Type*</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">-Select-</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Profile*</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">-Select-</option>
                            {/* Add options here */}
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Experience*</label>
                            <div className="flex space-x-2">
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">From</option>
                                    {/* Add options here */}
                                </select>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">To</option>
                                    {/* Add options here */}
                                </select>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Budget*</label>
                            <div className="flex space-x-2">
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">From</option>

                                    {/* Add options here */}
                                </select>
                                <select
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">To</option>
                                    {/* Add options here */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
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


