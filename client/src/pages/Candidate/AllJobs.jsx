import React, { useEffect, useState } from 'react'
import JobCard from '../../components/JobCard';
import Filters from '../../components/Filters/Filters';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { FaGlobe, FaUser } from 'react-icons/fa';
import Export from '../../svg/Buttons/Export';
import Filter from '../../svg/Buttons/Filter';
import AssessmentBanner from '../../components/ui/AssessmentBanner';
import NoJobs from "../../svg/Background/NoJobs.svg"
import Loader from '../../components/ui/Loader';
import SearchIcon from '../../svg/SearchIcon';
import useCandidateAuth from '../../hooks/useCandidateAuth';
import StyledCard from '../../components/ui/StyledCard';
import Pagination from '../../components/utility/Pagination';

const fetchOpenJobs = (page) => axios.get(`/candidates/jobs/open?page=${page}`).then(res => res.data);
const searchJobs = (query,page) => axios.get(`/candidates/jobs/searchJobs?jobTitle=${encodeURIComponent(query)}&page=${page}`).then(res => res.data);
const filterJobs = (filters,page) => axios.post('/candidates/filterJobs', { filters ,page}).then(res => res.data);



const AllJobs = () => {
    const navigate = useNavigate();

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const { candidateData , hasGivenAssessment , isDone} = useCandidateAuth()

    const toggleFilters = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const [isAssessmentBannerVisible, setIsAssessmentBannerVisible] =
        useState(false); 
    
      // Update visibility states when component mounts and when candidateData updates
      useEffect(() => {
        if (isDone && candidateData) {
          setIsAssessmentBannerVisible(!hasGivenAssessment);
        }
      }, [hasGivenAssessment, isDone]);
    
      // Add cleanup on unmount
      useEffect(() => {
        return () => {
          setIsAssessmentBannerVisible(false);
        };
      }, []); 

    const [page,setPage] = useState(1);
    const PAGE_LIMIT = 3;

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        employmentType: [],
        experienceLevel: [],
        jobProfile: [],
        experience: { min: '', max: '' },
        budget: { min: '', max: '' },
    });

    //For resetting page on each result change
    useEffect(()=>{
        setPage(1);
    },[searchQuery,filters])

    const { data: jobData , isLoading : isJobsLoading} = useQuery({ queryKey: ['jobs',page], queryFn: ()=>fetchOpenJobs(page) })


    const { data: filteredData , isLoading: isFilteredJobsLoading} = useQuery({
        queryKey: ['filteredJobs', filters, page],
        queryFn: () => filterJobs(filters,page),
        enabled: Object.values(filters).some(filter =>
            Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
        ),
    });

    const { data: searchResults , isLoading: isSearchLoading} = useQuery({
        queryKey: ['searchJobs', searchQuery, page],
        queryFn: () => searchJobs(searchQuery,page),
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
    return
    };

    const handleViewJob = (jobId) => {
        navigate(`/${jobId}`)
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleBudgetFilter = (budget) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            budget
        }));
    };

    const isFiltered = (Object.values(filters).some(filter =>
        Array.isArray(filter) ? filter.length > 0 : Object.values(filter).some(val => val !== '')
    ));

    // Combined loading state
    const isLoadingResults = (searchQuery.length > 0 && isSearchLoading) ||
    (isFiltered && isFilteredJobsLoading) || isJobsLoading;

    const displayJobs = searchQuery.length > 0 ? searchResults?.searchJobs :
        (isFiltered ? filteredData?.filteredJobs : jobData?.activeJobs);


    return (
        <div className='w-full p-4'>
        <div className='container '>
            <div className='flex items-center justify-between'>
                <h1 className='typography-h1'>All Jobs</h1>
            </div>
            {isAssessmentBannerVisible &&  <AssessmentBanner />}
               <div className='md:hidden flex items-center justify-between mt-1 mb-4'>
               <div className='relative w-[86%] sm:w-[90%]'>
                        <div className='absolute top-[10px] left-4'>
                            <SearchIcon />
                        </div>
                        <input style={{paddingLeft : "48px"}} type='text' placeholder="Enter job title" value={searchQuery}
                            onChange={handleSearch} />
                    </div>
               <div
                    className={`md:hidden ${isFilterVisible ? "bg-background-100" : "bg-background-40"} transition-colors duration-200 flex items-center gap-2 p-2 rounded-xl`}
                    onClick={toggleFilters}
                >
                    
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

            <StyledCard padding={2} backgroundColor={"bg-background-30 "} extraStyles={'flex flex-col md:flex-row gap-4 '}>
                {/* Search and Filters */}
                <div className={`${isFilterVisible ? 'block' : 'hidden'} md:block`}>
                    <div className='hidden md:block  mb-4 relative '>
                        <div className='absolute top-[10px] left-4'>
                            <SearchIcon />
                        </div>
                        <input style={{paddingLeft : "48px"}} type='text' placeholder="Enter job title" value={searchQuery}
                            onChange={handleSearch} />
                    </div>
                    <Filters
                        filters={filters}
                        handleCheckboxChange={handleCheckboxChange}
                        handleExperienceFilter={handleExperienceFilter}
                        handleBudgetFilter={handleBudgetFilter}  // Add this
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
                    <div className='bg-background-80 h-full flex flex-col p-40 justify-center items-center rounded-xl'>
                        <img src={NoJobs} alt="No jobs found" />
                        <span className='typography-body m-6'>
                            No Jobs available
                        </span>
                    </div> :
                    displayJobs?.map((job) => { 
                        return(
                        <JobCard
                            isCandidate={true}
                            key={job._id}
                            job={job}
                            status={open}
                            isApplied={candidateData?.jobApplications.some(app=>app.jobId === job._id)}
                            withKebab={false}
                            handleAction={handleAction}
                            onClick={() => handleViewJob(job._id)}
                        />
                    )})}
                    <Pagination 
                    currentPage={page} 
                    setCurrentPage={setPage} 
                    pageLimit={PAGE_LIMIT} 
                    totalItems={
                        searchQuery.length > 0 ? searchResults?.searchJobsCount :
                        isFiltered ? filteredData?.filteredJobsCount : jobData?.totalOpenJobs} 
                    />
                </div>
            </StyledCard>
        </div>
    </div>
    )
}

export default AllJobs