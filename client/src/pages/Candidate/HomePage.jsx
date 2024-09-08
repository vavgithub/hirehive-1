import React, { useState } from 'react'
import Filters from '../../components/Filters'
import JobCard from '../../components/JobCard';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';



const fetchOpenJobs = () => axios.get('/candidates/activeJobs').then(res => res.data);
const searchJobs = (query) => axios.get(`/candidates/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => axios.post('/candidates/filterJobs', { filters }).then(res => res.data);


const HomePage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' }
    });

    const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: fetchOpenJobs })


    const { data: filteredJobs = [] } = useQuery({
        queryKey: ['filteredJobs', filters],
        queryFn: () => filterJobs(filters),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ),
    });

    const { data: searchResults = [] } = useQuery({
        queryKey: ['searchJobs', searchQuery],
        queryFn: () => searchJobs(searchQuery),
        enabled: searchQuery !== '',
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

    const navigate = useNavigate();

    const clearAllFilters = () => {
        setFilters({
            employmentType: [],
            experienceLevel: [],
            jobProfile: [],
            experience: { min: '', max: '' }
        });
    };

    const handleAction = () => {
        console.log("Heheh")
    };

    const handleViewJob = (jobId) => {
        navigate(`/${jobId}`)
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }


    const displayJobs = searchQuery.length > 0 ? searchResults :
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);


    return (
        <div className='px-[10%]'>
            <h1 className='typography-h1'>Jobs</h1>
            <div className='py-14  bg-main-bg bg-cover flex flex-col items-center rounded-xl justify-center'>
                <h1 className='display-d2 max-w-96 text-center'>Unlock Your Career Potential</h1>
                <div className='w-4/5 mt-9'>
                    <input
                        className="px-4 py-2 w-full rounded mb-4"
                        placeholder="Job title or keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className='flex gap-4 mt-4'>
                <div>
                    <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} handleExperienceFilter={handleExperienceFilter} clearAllFilters={clearAllFilters} />
                </div>

                <div className='flex flex-col w-fill-available'>
                    {displayJobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                            status={open}
                            withKebab={false}
                            handleAction={handleAction}
                            onClick={() => handleViewJob(job._id)}
                        />
                    ))
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage