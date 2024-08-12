import { useState } from 'react';

export const useCreateJobForm = () => {
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
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleExperienceChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: Math.max(0, value)
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
            [field]: Math.max(0, prevData[field] - 1)
        }));
    };

    const setSkills = (skills) => {
        setFormData(prevData => ({ ...prevData, skills }));
    };

    return {
        formData,
        handleInputChange,
        handleExperienceChange,
        incrementExperience,
        decrementExperience,
        setSkills,
    };
};