import React, { useEffect, useState } from 'react'
import Filters from '../../components/Filters'
import JobCard from '../../components/JobCard';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaGlobe, FaUser } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';

const fetchOpenJobs = () => axios.get('/candidates/jobs/open').then(res => res.data);
const searchJobs = (query) => axios.get(`/candidates/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => axios.post('/candidates/filterJobs', { filters }).then(res => res.data);

const HomePage = () => {
    const navigate = useNavigate();
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/auth/candidate/dashboard');
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

    const toggleFilters = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const displayJobs = searchQuery.length > 0 ? searchResults :
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);

    return (
        <div className='px-4 md:px-[10%]'>
            <div className='flex justify-between pt-4'>

                <h1 className='typography-h1'>Jobs</h1>
                <div className='md:w-[220px]'>

                    <Button variant="secondary" onClick={()=>navigate("/login")}>Login</Button>
                </div>
            </div>
            <div className='py-8 md:py-14 bg-main-bg bg-cover flex flex-col items-center rounded-xl justify-center'>
                <h1 className='display-d2 max-w-96 text-center'>Unlock Your Career Potential</h1>
                <div className='w-full md:w-4/5 mt-6 md:mt-9'>
                    <input
                        type='text'
                        className="w-full mb-4 p-2 "
                        placeholder="Job title or keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Mobile filter toggle button */}
            <button
                className="md:hidden my-4 flex items-center gap-2 bg-background-60 p-2 rounded-lg"
                onClick={toggleFilters}
            >
                <FaUser size={20} />
                {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className='flex flex-col md:flex-row gap-4 mt-4'>
                {/* Filters */}
                <div className={`${isFilterVisible ? 'block' : 'hidden'} md:block`}>
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
                            key={job._id}
                            job={job}
                            status={open}
                            isCandidate={true}
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

export default HomePage