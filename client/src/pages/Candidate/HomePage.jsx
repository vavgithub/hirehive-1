import React, { useEffect, useState } from 'react'
import Filters from '../../components/Filters/Filters'
import JobCard from '../../components/JobCard';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaGlobe, FaUser } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import Filter from '../../svg/Buttons/Filter';
import Logo from '../../svg/Logo/lightLogo.svg'
import { clearAuthError, fetchCandidateAuthData } from '../../redux/candidateAuthSlice';
import { useDispatch } from 'react-redux';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import Loader from '../../components/ui/Loader';
import NoJobs from "../../svg/Background/NoJobs.svg"

const fetchOpenJobs = () => axios.get('/candidates/jobs/open').then(res => res.data);
const searchJobs = (query) => axios.get(`/candidates/jobs/searchJobs?jobTitle=${encodeURIComponent(query)}`).then(res => res.data);
const filterJobs = (filters) => axios.post('/candidates/filterJobs', { filters }).then(res => res.data);

const HomePage = () => {
    const navigate = useNavigate();
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch()
    const { isAuthenticated ,isLoading ,isDone} = useCandidateAuth();

    useEffect(() => {
        if(isAuthenticated){
            navigate('/candidate/all-jobs',{replace:true});
        }
        return ()=> dispatch(clearAuthError())
    }, [navigate,isAuthenticated]);

    useEffect(()=>{
        if(!isLoading && loading && isDone){
            setLoading(isLoading)
        }
    },[isLoading,isDone,loading])

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' }
    });

    const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: fetchOpenJobs })

    const { data: filteredJobs = [] , isLoading: isFilteredJobsLoading} = useQuery({
        queryKey: ['filteredJobs', filters],
        queryFn: () => filterJobs(filters),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ),
    });

    const { data: searchResults = [] , isLoading: isSearchLoading} = useQuery({
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

    const handleBudgetFilter = (budget) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            budget
        }));
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
        return 
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

    // Combined loading state
    const isLoadingResults = (searchQuery.length > 0 && isSearchLoading) ||
    (Object.values(filters).some(filter =>
        Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
    ) && isFilteredJobsLoading);

    const displayJobs = searchQuery.length > 0 ? searchResults :
        (Object.values(filters).some(filter => Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')) ? filteredJobs : jobs);

    if(loading){
        return (
          <div className="flex justify-center items-center min-h-screen min-w-screen">
            <Loader />
          </div>
        );
    }else{
        return (
            <div className='container flex flex-col m-auto  px-4 '>
                <div className=' flex justify-between pt-4'>
    
                    <img className='h-12' src={Logo}/>
                    <div className='md:w-[220px]'>
                        <Button variant="primary" onClick={() => navigate("/login")}>Login</Button>
                    </div>
                </div>
                    <h1 className='typography-h1 py-4'>Jobs</h1>
                <div className=' py-8 bg-home-bg bg-cover flex flex-col items-center rounded-xl justify-center'>
                    <h1 className='typography-h1 sm:display-d2 px-6 sm:px-0 max-w-96 text-center'>Unlock Your Career Potential</h1>
                    <div className='flex justify-evenly gap-2 px-4 w-full md:w-3/5 mt-6 md:mt-9'>
                        <input
                            type='text'
                            className="w-full p-2 "
                            placeholder="Enter job title"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                      <div
                        className={`md:hidden ${isFilterVisible ? "bg-background-100" : "bg-background-40"} transition-colors duration-200 flex items-center gap-2 p-2 rounded-xl`}
                        onClick={toggleFilters}
                    >
                        <Filter />
                    </div>
                    </div>
                </div>
    
                {/* Mobile filter toggle button */}
                {/* <button
                    className="md:hidden my-4 flex items-center gap-2 bg-background-60 p-2 rounded-lg"
                    onClick={toggleFilters}
                >
                    <FaUser size={20} />
                    {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
                </button> */}
    
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    {/* Filters */}
                    <div className={`${isFilterVisible ? 'block' : 'hidden'} md:block`}>
                        <Filters
                            filters={filters}
                            handleCheckboxChange={handleCheckboxChange}
                            handleExperienceFilter={handleExperienceFilter}
                            handleBudgetFilter={handleBudgetFilter}
                            clearAllFilters={clearAllFilters}
                        />
                    </div>
    
                    {/* Job listings */}
                    <div className='flex flex-col w-full md:w-fill-available'>
                        {isLoadingResults ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <Loader />
                            </div>
                        ) :
                        displayJobs?.length === 0 ? 
                        <div className='bg-background-80 h-full flex flex-col p-8 sm:p-20 xl:p-40 justify-center items-center rounded-xl'>
                            <img src={NoJobs} alt="No jobs found" />
                            <span className='typography-body m-6'>
                                No Jobs available
                            </span>
                        </div> :
                        displayJobs.map((job) => (
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
}

export default HomePage