import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from '../../api/axios.js';
import Header from '../../components/utility/Header';
import { useCreateJobForm } from '../../hooks/useCreateJobForm';
import SkillsInput from '../../components/utility/SkillsInput.jsx';

const CreateJobs = () => {
    const navigate = useNavigate();
    const { formData, handleInputChange, handleExperienceChange, incrementExperience, decrementExperience, setSkills } = useCreateJobForm();

    const [dropdownStates, setDropdownStates] = useState({
        employeeLocation: { isOpen: false, selectedOption: '' },
        employmentType: { isOpen: false, selectedOption: '' },
        jobProfile: { isOpen: false, selectedOption: '' },
        workplaceType: { isOpen: false, selectedOption: '' },
    });

    const createJobMutation = useMutation({
        mutationFn: (jobData) => axios.post('/createJobs', jobData),
        onSuccess: () => {
            navigate('/admin/jobs');
        },
        onError: (error) => {
            console.error('Error creating job:', error);
            // Handle error (e.g., show error message to user)
        }
    });

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        createJobMutation.mutate({ ...formData, status: 'open' });
    }, [formData, createJobMutation]);

    const handleSaveForLater = useCallback(() => {
        createJobMutation.mutate({ ...formData, status: 'draft' });
    }, [formData, createJobMutation]);

    const toggleDropdown = useCallback((field) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [field]: { ...prevState[field], isOpen: !prevState[field].isOpen }
        }));
    }, []);

    const handleOptionClick = useCallback((field, option) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [field]: { isOpen: false, selectedOption: option.value }
        }));
        handleInputChange({ target: { id: field, value: option.value } });
    }, [handleInputChange]);

    const dropdownOptions = useMemo(() => ({
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
    }), []);

    const allSkills = useMemo(() => ['React', 'React Native', 'Redux', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB'], []);

    return (
        <div className="bg-background-80 h-screen">
            <div className='p-4'>
                <Header HeaderText="Create a New Job Listing" />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            id="jobTitle"
                            label="Job Title"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            required
                        />
                        <CustomDropdown
                            field="workplaceType"
                            label="Workplace Type"
                            options={dropdownOptions.workplaceType}
                            selectedOption={dropdownStates.workplaceType.selectedOption}
                            isOpen={dropdownStates.workplaceType.isOpen}
                            toggleDropdown={() => toggleDropdown('workplaceType')}
                            handleOptionClick={handleOptionClick}
                        />
                        <CustomDropdown
                            field="employeeLocation"
                            label="Employee Location"
                            options={dropdownOptions.employeeLocation}
                            selectedOption={dropdownStates.employeeLocation.selectedOption}
                            isOpen={dropdownStates.employeeLocation.isOpen}
                            toggleDropdown={() => toggleDropdown('employeeLocation')}
                            handleOptionClick={handleOptionClick}
                        />
                        <CustomDropdown
                            field="employmentType"
                            label="Employment Type"
                            options={dropdownOptions.employmentType}
                            selectedOption={dropdownStates.employmentType.selectedOption}
                            isOpen={dropdownStates.employmentType.isOpen}
                            toggleDropdown={() => toggleDropdown('employmentType')}
                            handleOptionClick={handleOptionClick}
                        />
                        <CustomDropdown
                            field="jobProfile"
                            label="Job Profile"
                            options={dropdownOptions.jobProfile}
                            selectedOption={dropdownStates.jobProfile.selectedOption}
                            isOpen={dropdownStates.jobProfile.isOpen}
                            toggleDropdown={() => toggleDropdown('jobProfile')}
                            handleOptionClick={handleOptionClick}
                        />
                        <div>

                        </div>
                        <ExperienceField
                            formData={formData}
                            handleExperienceChange={handleExperienceChange}
                            incrementExperience={incrementExperience}
                            decrementExperience={decrementExperience}
                        />
                        <BudgetField
                            formData={formData}
                            handleExperienceChange={handleExperienceChange}
                            incrementExperience={incrementExperience}
                            decrementExperience={decrementExperience}
                        />

                        <div className='w-full'>
                            <label htmlFor="jobDescription" className="block font-bold mb-2">Job Description*</label>
                            <textarea
                                id="jobDescription"
                                placeholder="Write a job description"
                                className="w-full px-3 py-2 bg-background-40 rounded outline-none focus:outline-teal-300"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                required
                                rows="10"
                            />
                        </div>

                        <div className="w-full mb-4">
                            <label htmlFor="skills" className="block font-bold mb-2">Skills*</label>
                            <SkillsInput skills={formData.skills} setSkills={setSkills} allSkills={allSkills} />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
                            disabled={createJobMutation.isLoading}
                        >
                            {createJobMutation.isLoading ? 'Creating...' : 'Create Job Listing'}
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveForLater}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                            disabled={createJobMutation.isLoading}
                        >
                            {createJobMutation.isLoading ? 'Saving...' : 'Save for Later'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const InputField = React.memo(({ id, label, value, onChange, required }) => (
    <div className='space-y-1'>
        <label className="typography-body">{label}*</label>
        <input
            id={id}
            type="text"
            placeholder={`Enter ${label.toLowerCase()}`}
            className='w-full'
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
));

const CustomDropdown = React.memo(({ field, label, options, selectedOption, isOpen, toggleDropdown, handleOptionClick }) => (
    <div className="space-y-1">
        <label className="typography-body">{label}*</label>
        <div className="relative">
            <button
                type="button"
                onClick={toggleDropdown}
                className="mt-1 h-[44px] bg-background-40 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
            >
                {options.find(opt => opt.value === selectedOption)?.label || '-Select-'}
            </button>
            {isOpen && (
                <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
                    {options.map((option) => (
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
));



const ExperienceField = React.memo(({ formData, handleExperienceChange, incrementExperience, decrementExperience }) => (
    <div>
        <label className="typography-body">Experience*</label>
        <div className='flex gap-2'>
            {['From', 'To'].map((label) => (
                <NumberInputField
                    key={label}
                    label={label}
                    value={formData[`experience${label}`]}
                    onChange={(value) => handleExperienceChange(`experience${label}`, value)}
                    onIncrement={() => incrementExperience(`experience${label}`)}
                    onDecrement={() => decrementExperience(`experience${label}`)}
                    unit="Yrs"
                />
            ))}
        </div>
    </div>
));

const BudgetField = React.memo(({ formData, handleExperienceChange, incrementExperience, decrementExperience }) => (
    <div>
        <label className="typography-body">Budget*</label>
        <div className='flex gap-2'>
            {['From', 'To'].map((label) => (
                <NumberInputField
                    key={label}
                    label={label}
                    value={formData[`budget${label}`]}
                    onChange={(value) => handleExperienceChange(`budget${label}`, value)}
                    onIncrement={() => incrementExperience(`budget${label}`)}
                    onDecrement={() => decrementExperience(`budget${label}`)}
                    unit="Lpa"
                />
            ))}
        </div>
    </div>
));

const NumberInputField = React.memo(({ label, value, onChange, onIncrement, onDecrement, unit }) => (
    <div className='w-1/2'>
        <span className='typography-small-p text-font-gray'>{label}</span>
        <div className='items-center flex bg-background-40 rounded-xl'>
            <input
                type="number"
                placeholder='-Select-'
                className='outline-none no-spinner w-full'
                min="0"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
            />
            <div className='flex gap-2 items-center'>
                <p className='typography-body text-font-gray'> {unit}</p>
                <button type="button" onClick={onDecrement}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M5 12.5H19" stroke="#808389" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}
                </button>
                <button type="button" onClick={onIncrement}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>}
                </button>
            </div>
        </div>
    </div>
));

export default CreateJobs;


