import { useCallback, useState } from 'react';

export const useCreateJobForm = (initialData = {
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
}) => {

    const [formData, setFormData] = useState(initialData);

    const handleInputChange = useCallback((event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    }, []);

    const handleExperienceChange = useCallback((field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: Math.max(0, parseInt(value) || 0)
        }));
    }, []);

    const incrementExperience = useCallback((field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: prevData[field] + 1
        }));
    }, []);

    const decrementExperience = useCallback((field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: Math.max(0, prevData[field] - 1)
        }));
    }, []);

    const setSkills = useCallback((skills) => {
        setFormData(prevData => ({ ...prevData, skills }));
    }, []);

    return {
        formData,
        setFormData,
        handleInputChange,
        handleExperienceChange,
        incrementExperience,
        decrementExperience,
        setSkills,
    };
};

