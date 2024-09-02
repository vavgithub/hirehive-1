import React, { useState } from 'react'
import Filters from '../../components/Filters'

const HomePage = () => {
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' }
    });
    const handleCheckboxChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (!updatedFilters[filterType]) {
                updatedFilters[filterType] = [];
            }
            const index = updatedFilters[filterType].indexOf(value);

            if (index !== -1) {
                updatedFilters[filterType].splice(index, 1);
            } else {
                updatedFilters[filterType].push(value);
            }

            return updatedFilters;
        });
    };

    const handleExperienceFilter = (experience) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            experience
        }));
    };
    
    const clearAllFilters = () => {
        setFilters({
            employmentType: [],
            experienceLevel: [],
            jobProfile: [],
            experience: { min: '', max: '' }
        });
    };

    return (
        <div className='px-[10%]'>
            <h1 className='typography-h1'>Jobs</h1>
            <div className='py-14  bg-main-bg bg-cover flex flex-col items-center justify-center'>
                <h1 className='display-d2 max-w-96 text-center'>Unlock Your Career Potential</h1>
                <input className='w-[400px]' placeholder='Enter the job title'></input>
            </div>
            <Filters filters={filters}  handleCheckboxChange={handleCheckboxChange}  handleExperienceFilter={handleExperienceFilter} clearAllFilters={clearAllFilters} />
        </div>
    )
}

export default HomePage