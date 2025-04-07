// 1. First, modify your Candidates component to save and restore scroll position

import React, { useEffect, useRef } from 'react'
import Header from '../../components/utility/Header'
import StatsGrid from '../../components/ui/StatsGrid'
import axios from "../../api/axios"
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import Table from '../../components/tableUtilities/Table';
import Container from '../../components/Cards/Container';
import IconWrapper from '../../components/Cards/IconWrapper';
import { Briefcase, Folder, MonitorDot, PenTool, Users } from 'lucide-react';


const Candidates = () => {
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => axios.get('/admin/candidate/getData/data/allCandidatesWithStats').then(res => res.data),
  });

  // console.log("what is this ?" , data);

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
    monthly : `${data?.stats?.statistics?.total?.monthly ?? 0}% since last month`,
    weekly : `${data?.stats?.statistics?.total?.weekly ?? 0}% since last week`,
    daily : `${data?.stats?.statistics?.total?.daily ?? 0}% since yesterday`,
}

  const statsOne = [
    { title: 'Total', value: data?.stats?.Total || 0, icon:  () => <IconWrapper size={10} isInActiveIcon icon={Users} /> , statistics : candidateStats},
    { title: 'Portfolio', value: data?.stats?.Portfolio || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Folder} /> },
    { title: 'Screening', value: data?.stats?.Screening || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={MonitorDot} /> },
    { title: 'Design Task', value: data?.stats?.['Design Task'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
    { title: 'Round 1', value: data?.stats?.['Round 1'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
    { title: 'Round 2', value: data?.stats?.['Round 2'] || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={Briefcase} /> },
    { title: 'Hired', value: data?.stats?.Hired || 0, icon: () => <IconWrapper size={10} isInActiveIcon icon={PenTool} /> },
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
        <StyledCard padding={2} backgroundColor={"bg-background-100"}>
          <div className="w-full max-w-7xl relative mb-2">
            <div className="absolute right-0 z-10 h-full w-28 bg-gradient-to-tr from-background via-background-green to-transparent pointer-events-none" />
            <StatsGrid stats={statsOne} />
          </div>
          <Table readOnly={true} readOnlyData={data?.candidates || []} />
        </StyledCard>
    </Container>
  );
};

export default Candidates;