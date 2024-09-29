import React, { useEffect, useState } from 'react'
import JobCard from '../../components/JobCard';
import Filters from '../../components/Filters';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { FaGlobe, FaUser } from 'react-icons/fa';
import Export from '../../svg/Buttons/Export';
import Filter from '../../svg/Buttons/Filter';

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


    const [isFilterVisible, setIsFilterVisible] = useState(false);


    const toggleFilters = () => {
        setIsFilterVisible(!isFilterVisible);
    };


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
        <div className='m-2 pt-8'>
            <div className='flex items-center justify-between'>

                <h1 className='typography-h1'>All Jobs</h1>
                <div className='md:hidden  flex items-center gap-2 bg-background-100 p-2 rounded-xl ' onClick={toggleFilters}>
                    <Filter />
                </div>

            </div>

            {/* Mobile filter toggle button */}

            {/* <button
                className="md:hidden mb-4 flex items-center gap-2 bg-background-60 p-2 rounded-lg"
                onClick={toggleFilters}
                {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            >
                <FaUser size={20} />

            </button> */}

            <div className='flex flex-col md:flex-row gap-4 mt-4 bg-background-30 p-4 rounded-xl'>
                {/* Search and Filters */}
                <div className={`${isFilterVisible ? 'block' : 'hidden'} md:block`}>
                    <input
                        type='text'
                        className="w-full md:w-auto mb-4 p-2 "
                        placeholder="Job title or keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Filters
                        filters={filters}
                        handleCheckboxChange={handleCheckboxChange}
                        handleExperienceFilter={handleExperienceFilter}
                        clearAllFilters={clearAllFilters}
                    />
                </div>

                {/* Job listings */}
                <div className='flex flex-col w-full md:w-fill-available'>
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
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllJobs