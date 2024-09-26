import React, { useEffect, useState } from 'react'
import JobCard from '../../components/JobCard';
import Filters from '../../components/Filters';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const fetchOpenJobs = () => axios.get('/candidates/jobs/open').then(res => res.data);
const searchJobs = (query) => axios.get(`/candidates/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => axios.post('/candidates/filterJobs', { filters }).then(res => res.data);



const AllJobs = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try accessing a protected route
                await axios.get('/auth/candidate/dashboard');
                // If successful, redirect to protected HomePage
                navigate('/candidate/all-jobs');
            } catch (error) {
                // Not authenticated, stay on the public HomePage
            }
        };

        checkAuth();
    }, [navigate]);


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
        <div className='m-4'>
            <h1 className='typography-h1'>All Jobs</h1>
            <div className='flex gap-4 mt-4'>
                <div>
                <input
                        type='text'
                        className="mb-4"
                        placeholder="Job title or keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} handleExperienceFilter={handleExperienceFilter} clearAllFilters={clearAllFilters} />
                </div>

                <div className='flex flex-col w-fill-available'>
                    {displayJobs.map((job) => (
                        <JobCard
                            isCandidate={true}
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

export default AllJobs