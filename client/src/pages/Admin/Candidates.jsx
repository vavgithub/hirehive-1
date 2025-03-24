// 1. First, modify your Candidates component to save and restore scroll position

import React, { useEffect, useRef } from 'react'
import Header from '../../components/utility/Header'
import StatsGrid from '../../components/ui/StatsGrid'
import Table from '../../components/Table';
import axios from "../../api/axios"
import { useQuery } from '@tanstack/react-query';
import Portfolio from '../../svg/StatsCard/View Candidate/Portfolio';
import Screening from '../../svg/StatsCard/View Candidate/Screening';
import DesignTask from '../../svg/StatsCard/View Candidate/DesignTask';
import Round1 from '../../svg/StatsCard/View Candidate/Round1';
import Round2 from '../../svg/StatsCard/View Candidate/Round2';
import OfferSent from '../../svg/StatsCard/View Candidate/OfferSent';
import Total from '../../svg/StatsCard/View Candidate/Total';
import Loader from '../../components/ui/Loader';
import StyledCard from '../../components/ui/StyledCard';


const Candidates = () => {
  const containerRef = useRef(null);
  
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
    yesterday : `${data?.stats?.statistics?.total?.yesterday ?? 0}% since yesterday`,
}

  const statsOne = [
    { title: 'Total', value: data?.stats?.Total || 0, icon: Total , statistics : candidateStats},
    { title: 'Portfolio', value: data?.stats?.Portfolio || 0, icon: Portfolio },
    { title: 'Screening', value: data?.stats?.Screening || 0, icon: Screening },
    { title: 'Design Task', value: data?.stats?.['Design Task'] || 0, icon: DesignTask },
    { title: 'Round 1', value: data?.stats?.['Round 1'] || 0, icon: Round1 },
    { title: 'Round 2', value: data?.stats?.['Round 2'] || 0, icon: Round2 },
    { title: 'Hired', value: data?.stats?.Hired || 0, icon: OfferSent },
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
    <div className='w-full p-4' ref={containerRef}>
      <div className="container mx-auto">
        <Header HeaderText="Candidates" />
        <StyledCard padding={2} backgroundColor={"bg-background-100"}>
          <div className="w-full max-w-7xl relative">
            <div className="absolute right-0 z-10 h-full w-28 bg-gradient-to-tr from-background via-background-green to-transparent pointer-events-none" />
            <StatsGrid stats={statsOne} />
          </div>
          <Table readOnly={true} readOnlyData={data?.candidates || []} />
        </StyledCard>
      </div>
    </div>
  );
};

export default Candidates;