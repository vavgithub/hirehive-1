import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/utility/Header';

const CreateJobs = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        workplaceType: '',
        employeeLocation: '',
        employmentType: '',
        jobProfile: '',
        experienceFrom: 0,
        experienceTo: 0,
        budgetFrom: 0,
        budgetTo: 0,
        jobDescription: '',
        skills: [],
        status: '',
    });

    const handleExperienceChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: Math.max(0, value) // Ensure the value is not negative
        }));
    };

    const incrementExperience = (field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: prevData[field] + 1
        }));
    };

    const decrementExperience = (field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: Math.max(0, prevData[field] - 1) // Ensure the value is not negative
        }));
    };

    const [dropdownStates, setDropdownStates] = useState({
        employeeLocation: { isOpen: false, selectedOption: '' },
        employmentType: { isOpen: false, selectedOption: '' },
        jobProfile: { isOpen: false, selectedOption: '' },
        workplaceType: { isOpen: false, selectedOption: '' },
    });

    const dropdownOptions = {
        employeeLocation: [
            { value: '', label: '-Select-' },
            { value: 'india', label: 'India' },
            { value: 'usa', label: 'USA' },
            { value: 'dubai', label: 'Dubai' },
        ],
        employmentType: [
            { value: '', label: '-Select-' },
            { value: 'Full Time', label: 'Full Time' },
            { value: 'Internship', label: 'Internship' },
            { value: 'Contract', label: 'Contract' },
        ],
        jobProfile: [
            { value: '', label: '-Select-' },
            { value: 'Frontend Developer', label: 'Frontend Developer' },
            { value: 'UI UX', label: 'UI UX' },
            { value: 'Motion Graphic', label: 'Motion Graphic' },
            { value: 'Art Director', label: '3D' },
            { value: 'Video Editor', label: 'Video Editor' },
            { value: 'Digital Marketing Executive', label: 'Digital Marketing Executive' },
            { value: 'Project Manager', label: 'Project Manager' },
            { value: 'Art Director', label: 'Art Director' },
        ],
        workplaceType: [
            { value: '', label: '-Select-' },
            { value: 'On-Site', label: "On-Site" },
            { value: 'Remote', label: "Remote" },
            { value: 'Hybrid', label: "Hybrid" }
        ]
    };

    const toggleDropdown = (field) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [field]: { ...prevState[field], isOpen: !prevState[field].isOpen }
        }));
    };

    const handleOptionClick = (field, option) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [field]: { isOpen: false, selectedOption: option.value }
        }));
        setFormData(prevData => ({ ...prevData, [field]: option.value }));
    };

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
            const response = await axios.post('http://localhost:8008/api/v1/createJobs', formDataWithStatus);
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
            const response = await axios.post('http://localhost:8008/api/v1/createJobs', data);
            console.log('Job created successfully:', response.data);
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    const setSkills = (skills) => {
        setFormData({ ...formData, skills });
    };

    const allSkills = ['React', 'React Native', 'Redux', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB'];

    return (
        <div className="bg-background-80 h-screen">
            {/* <Breadcrumb paths={paths} /> */}
            <div className='p-4'>
                <Header HeaderText="Create a New Job Listing"></Header>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='space-y-1'>
                            <label className="typography-body">Job Title*</label>
                            <input
                                id="jobTitle"
                                type="text"
                                placeholder="Enter job title"
                                className='w-full'
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className='space-y-1'>
                            {['workplaceType'].map((field) => (
                                <div key={field}>
                                    <label className="typography-body">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}*</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown(field)}
                                            className="mt-1 h-[44px] bg-background-40 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
                                        >
                                            {dropdownOptions[field].find(opt => opt.value === dropdownStates[field].selectedOption)?.label || '-Select-'}
                                        </button>
                                        {dropdownStates[field].isOpen && (
                                            <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
                                                {dropdownOptions[field].map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(field, option)}
                                                        className="cursor-pointer px-4 py-2 hover:bg-background-60"
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1">
                            {['employeeLocation'].map((field) => (
                                <div key={field}>
                                    <label className="typography-body">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}*</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown(field)}
                                            className="mt-1 h-[44px] bg-background-40 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
                                        >
                                            {dropdownOptions[field].find(opt => opt.value === dropdownStates[field].selectedOption)?.label || '-Select-'}
                                        </button>
                                        {dropdownStates[field].isOpen && (
                                            <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
                                                {dropdownOptions[field].map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(field, option)}
                                                        className="cursor-pointer px-4 py-2 hover:bg-background-60"
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1">
                            {['employmentType'].map((field) => (
                                <div key={field}>
                                    <label className="typography-body">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}*</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown(field)}
                                            className="mt-1 h-[44px] bg-background-40 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
                                        >
                                            {dropdownOptions[field].find(opt => opt.value === dropdownStates[field].selectedOption)?.label || '-Select-'}
                                        </button>
                                        {dropdownStates[field].isOpen && (
                                            <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
                                                {dropdownOptions[field].map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(field, option)}
                                                        className="cursor-pointer px-4 py-2 hover:bg-background-60"
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Job Profile in the second column */}
                        <div>
                            {['jobProfile'].map((field) => (
                                <div key={field}>
                                    <label className="typography-body">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}*</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => toggleDropdown(field)}
                                            className="mt-1 h-[44px] bg-background-40 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
                                        >
                                            {dropdownOptions[field].find(opt => opt.value === dropdownStates[field].selectedOption)?.label || '-Select-'}
                                        </button>
                                        {dropdownStates[field].isOpen && (
                                            <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
                                                {dropdownOptions[field].map((option) => (
                                                    <li
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(field, option)}
                                                        className="cursor-pointer px-4 py-2 hover:bg-background-60"
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>                      

                        <div>

                        </div>
                        <div >
                            <label className="typography-body">Experience*</label>
                            <div className='flex gap-2'>

                                {['From', 'To'].map((label) => (
                                    <div key={label} className='w-1/2'>
                                        <span className='typography-small-p text-font-gray'>{label}</span>
                                        <div className='items-center flex bg-background-40 rounded-xl'>
                                            <input
                                                type="number"
                                                placeholder='-Select-'
                                                className='outline-none no-spinner w-full'
                                                min="0"
                                                value={formData[`experience${label}`]}
                                                onChange={(e) => handleExperienceChange(`experience${label}`, parseInt(e.target.value))}
                                            />
                                            <div className='flex gap-2 items-center'>
                                                <p className='typography-body text-font-gray'> Yrs</p>
                                                <button type="button" onClick={() => decrementExperience(`experience${label}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <button type="button" onClick={() => incrementExperience(`experience${label}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div >
                            <label className="typography-body">Budget*</label>
                            <div className='flex gap-2'>

                                {['From', 'To'].map((label) => (
                                    <div key={label} className='w-1/2'>
                                        <span className='typography-small-p text-font-gray'>{label}</span>
                                        <div className='items-center flex bg-background-40 rounded-xl'>
                                            <input
                                                type="number"
                                                placeholder='-Select-'
                                                className='outline-none no-spinner w-full'
                                                min="0"
                                                value={formData[`budget${label}`]}
                                                onChange={(e) => handleExperienceChange(`budget${label}`, parseInt(e.target.value))}
                                            />
                                            <div className='flex gap-2 items-center'>
                                                <p className='typography-body text-font-gray'> Yrs</p>
                                                <button type="button" onClick={() => decrementExperience(`budget${label}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <button type="button" onClick={() => incrementExperience(`budget${label}`)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                className="w-full px-3 py-2 bg-background-40 rounded outline-none focus:outline-teal-300"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                required
                                rows="10"
                            ></textarea>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button type="submit" name="createJob" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Create Job Listing
                            </button>
                            <button type="button" onClick={handleSaveForLater} name="saveForLater" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                                Save for Later
                            </button>
                        </div>
                    </div >
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
            <div className="flex flex-wrap gap-2  rounded">
                {skills.map((skill, index) => (
                    <div key={index} className="p-2 flex items-center gap-1 typography-body bg-background-70 rounded px-2">
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
                    className="outline-none w-full"
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


