// 1. First, modify your Candidates component to save and restore scroll position

import React, { useEffect, useRef } from 'react'
import Header from '../../components/utility/Header'
import StatsGrid from '../../components/ui/StatsGrid'
import axios from "../../services/axios"
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import Table from '../../components/tableUtilities/Table';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, Folder, MonitorDot, PenTool, Users } from 'lucide-react';
import { getAllCandidatesAndStats, getAllCandidatesWithFilters } from '../../services/admin.candidate.service';
import { useState } from 'react';
import { useMemo } from 'react';
import useDebounce from '../../hooks/useDebounce';


const Candidates = () => {
  //Table filters variables for fetching data
  const [location,setLocation] = useState(null);
  const [filters,setFilters] = useState({});
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [filterObj,setFilterObj] = useState({});
  const [sortFilterObj,setSortFilterObj] = useState({});
  const [sortModel,setSortModel] = useState([])
  const [search,setSearch] = useState("");
  const [showContractors, setShowContractors] = useState(false);

  const [debouncedQuery] = useDebounce(search,400);

  useEffect(()=>{
    //removing non-populated filters
    setFilterObj({...Object.fromEntries(Object.entries(filters).filter(([Key,value]) =>!!(Array.isArray(value) ? value?.length : value))),showContractors})
  },[filters,showContractors])

    //Server-side sort management for tables
  useEffect(() => {
    const selectedSort = {}
    sortModel.map(model => {
      selectedSort[model.field] = model.sort
    })
    setSortFilterObj(selectedSort);
  }, [sortModel]);

  const { data, isStatsLoading, isStatsError } = useQuery({
    queryKey: ['candidatesStats'],
    queryFn: () => getAllCandidatesAndStats(),
    refetchOnMount : true
  });

  const { data : candidates , isLoading, isError } = useQuery({
    queryKey: ['candidates',location,page,pageSize,filterObj,debouncedQuery,sortFilterObj],
    queryFn: () => getAllCandidatesWithFilters({...(location ? location : {}) , page : page + 1 , pageLimit : pageSize , filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj}),
  });

  const getCandidatesExportData = async () => {
    try {
      const response = await getAllCandidatesWithFilters({...(location ? location : {}) , filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj});
      return response?.allCandidates || []
    } catch (error) {
      console.log("Export data error :",error)
    }
  }

  // 1. Disable browser auto scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  // 2. Restore scroll position after data is loaded
  useEffect(() => {
    if (!isLoading && !isError) {
      const savedScrollY = sessionStorage.getItem('candidates_scroll_position');
      if (savedScrollY) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseFloat(savedScrollY));
        });
      }
    }
  }, [isLoading, isError]);

  const candidateStats = {
    monthly: `${data?.stats?.statistics?.total?.monthly ?? 0}% since last month`,
    weekly: `${data?.stats?.statistics?.total?.weekly ?? 0}% since last week`,
    daily: `${data?.stats?.statistics?.total?.daily ?? 0}% since yesterday`,
  }

  const statsOne = [
    { title: 'Total', value: data?.stats?.Total || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Users} />, statistics: candidateStats },
    { title: 'Portfolio', value: data?.stats?.Portfolio || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Folder} /> },
    { title: 'Screening', value: data?.stats?.Screening || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={MonitorDot} /> },
    { title: 'Design Task', value: data?.stats?.['Design Task'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={PenTool} /> },
    { title: 'Round 1', value: data?.stats?.['Round 1'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Briefcase} /> },
    { title: 'Round 2', value: data?.stats?.['Round 2'] || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={Briefcase} /> },
    { title: 'Hired', value: data?.stats?.Hired || 0, icon: () => <IconWrapper size={10} isTeritiaryIcon icon={PenTool} /> },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) return <div>Error fetching candidates</div>;

  return (
    <Container >
      <Header HeaderText="Candidates" />
      <StyledCard >
        <div className="w-full max-w-7xl relative mb-4">
          <div className="absolute right-0 z-10 h-full w-28 bg-gradient-to-tr from-background via-background-green to-transparent pointer-events-none" />
          <StatsGrid stats={statsOne} />
        </div>
        <div >
          <Table 
          currentPage={page} 
          setCurrentPage={setPage}
          pageSize={pageSize} 
          setPageSize={setPageSize}
          filters={filters}
          setFilters={setFilters}
          sortModel={sortModel}
          setSortModel={setSortModel}
          searchTerm={search}
          setSearchTerm={setSearch}
          showContractors={showContractors}
          setShowContractors={setShowContractors}
          addLocationFilter={setLocation} 
          readOnly={true} 
          hasCheckBox={false} 
          totalCount={candidates?.totalCandidates || 0} 
          getDataWithoutPagination={getCandidatesExportData}
          readOnlyData={candidates?.allCandidates || []} 
          />
        </div>
      </StyledCard>
    </Container>
  );
};

export default Candidates;