import React, { useEffect, useState } from 'react'
import Filters from '../../components/Filters/Filters'
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Buttons/Button';
import Logo from '../../svg/Logo/lightLogo.svg'
import { clearAuthError, fetchCandidateAuthData } from '../../redux/candidateAuthSlice';
import { useDispatch } from 'react-redux';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import Loader from '../../components/Loaders/Loader';
import NoJobs from "../../svg/Background/NoJobs.svg"
import Pagination from '../../components/utility/Pagination';
import useDebounce from '../../hooks/useDebounce';
import JobCard from '../../components/Cards/JobCard';
import ContactUs from '../../components/Form/ContactUs';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { SlidersHorizontal } from 'lucide-react';

const fetchOpenJobs = (page) => axios.get(`/candidates/jobs/open?page=${page}`).then(res => res.data);
const searchJobs = (query,page) => axios.get(`/candidates/jobs/searchJobs?jobTitle=${encodeURIComponent(query)}&page=${page}`).then(res => res.data);
const filterJobs = (filters,page) => axios.post('/candidates/filterJobs', { filters ,page}).then(res => res.data);
const filterSearchJobs = (query,filters,page) => axios.post('/candidates/filterSearchJobs', { filters , page , query }).then(res => res.data);

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

    const [page,setPage] = useState(1);
    const PAGE_LIMIT = 3;

    const [debouncedQuery] = useDebounce(searchQuery);

    //For resetting page on each result change
    useEffect(()=>{
        setPage(1);
    },[debouncedQuery,filters])


    const { data: jobData , isLoading : isJobsLoading } = useQuery({ queryKey: ['jobs',page], queryFn: () => fetchOpenJobs(page) })

    // const { data: filteredData , isLoading: isFilteredJobsLoading} = useQuery({
    //     queryKey: ['filteredJobs', filters,page],
    //     queryFn: () => filterJobs(filters,page),
    //     enabled: Object.values(filters).some(filter =>
    //         Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
    //     ),
    // });

    // const { data: searchResults , isLoading: isSearchLoading} = useQuery({
    //     queryKey: ['searchJobs', debouncedQuery,page],
    //     queryFn: () => searchJobs(debouncedQuery,page),
    //     enabled: debouncedQuery !== '',
    // });

    const { data: filteredData , isLoading: isFilteredJobsLoading} = useQuery({
        queryKey: ['filteredSearchJobs',debouncedQuery, filters,page],
        queryFn: () => filterSearchJobs(debouncedQuery,filters,page),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '') || debouncedQuery !== ''
        ),
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

    const handleViewJob = (jobId,companyId) => {
        navigate(`/org/${companyId}/view-job/${jobId}`)
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const toggleFilters = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const isFiltered = (Object.values(filters).some(filter =>
        Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
    ));

    // const isLoadingResults = (debouncedQuery.length > 0 && isSearchLoading) ||
    // (isFiltered && isFilteredJobsLoading) || isJobsLoading;

    // Combined loading state
    const isLoadingResults = ((debouncedQuery.length > 0 || isFiltered) && isFilteredJobsLoading) || isJobsLoading;

    // const displayJobs = debouncedQuery.length > 0 ? searchResults?.searchJobs :
    //     (isFiltered ? filteredData?.filteredJobs : jobData?.activeJobs);

    const displayJobs = ( debouncedQuery.length > 0 || isFiltered)? filteredData?.filteredSearchJobs : jobData?.activeJobs;

    if(loading){
        return (
          <div className="flex justify-center items-center min-h-screen min-w-screen">
            <Loader />
          </div>
        );
    }else{
        return (
            // <div className='w-full  p-4 '>
            //     <div className='container'>
            <Container>
                    <div className=' flex justify-between items-center mt-2 mb-4'>
                        <div className='flex items-center justify-center gap-8'>

                        <img className='h-12' src={Logo}/>
                        <h1 className='display-d2  hidden md:block'>Jobs</h1>
                        </div>
                        <Button variant="primary" onClick={() => navigate("/login")}>Login</Button>
                    </div>
                    <h1 className='md:hidden display-d2 py-4'>Jobs</h1>
                        
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
                        <IconWrapper isInActiveIcon size={0} customIconSize={4} customStrokeWidth={5}  icon={SlidersHorizontal} />
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
                        <div className='flex flex-col gap-4 w-full md:w-fill-available'>
                            {isLoadingResults ? (
                                <div className="flex justify-center items-center min-h-full">
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
                                    onClick={() => handleViewJob(job._id,job?.companyDetails?._id ?? job?.company_id?._id)}
                                />
                            ))}
                            <Pagination 
                            currentPage={page} 
                            setCurrentPage={setPage} 
                            pageLimit={PAGE_LIMIT} 
                            totalItems={
                                // debouncedQuery.length > 0 ? searchResults?.searchJobsCount :
                                // isFiltered ? filteredData?.filteredJobsCount : jobData?.totalOpenJobs
                                (debouncedQuery.length > 0 || isFiltered) ? filteredData?.filteredSearchJobsCount : jobData?.totalOpenJobs
                            } 
                            />
                        </div>
                    </div>
                    <ContactUs />
            </Container>
            //     </div>
            // </div>
        )
    }
}

export default HomePage