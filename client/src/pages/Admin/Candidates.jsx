import React from 'react'
import Header from '../../components/utility/Header'
import StatsGrid from '../../components/StatsGrid'
import one from '../../svg/StatsCard/Jobs Page/one';
import Table from '../../components/Table';
import axios from "../../api/axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Portfolio from '../../svg/StatsCard/View Candidate/Portfolio';
import Screening from '../../svg/StatsCard/View Candidate/Screening';
import DesignTask from '../../svg/StatsCard/View Candidate/DesignTask';
import Round1 from '../../svg/StatsCard/View Candidate/Round1';
import Round2 from '../../svg/StatsCard/View Candidate/Round2';
import OfferSent from '../../svg/StatsCard/View Candidate/OfferSent';
import Total from '../../svg/StatsCard/View Candidate/Total';
import Loader from '../../components/ui/Loader';

const statsOne = [
  { title: 'Total', value: 0, icon: Total },
  { title: 'Portfolio', value: 0, icon: Portfolio },
  { title: 'Screening', value: 0, icon: Screening },
  { title: 'Design Task', value: 0, icon: DesignTask },
  { title: 'Round 1', value: 0, icon: Round1 },
  { title: 'Round 2', value: 0, icon: Round2 },
  { title: 'Offer Sent', value: 0, icon: OfferSent },
]
const Candidates = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => axios.get('/admin/candidate/getData/data/allCandidatesWithStats').then(res => res.data),
  });

  const statsOne = [
    { title: 'Total', value: data?.stats?.Total || 0, icon: Total },
    { title: 'Portfolio', value: data?.stats?.Portfolio || 0, icon: Portfolio },
    { title: 'Screening', value: data?.stats?.Screening || 0, icon: Screening },
    { title: 'Design Task', value: data?.stats?.['Design Task'] || 0, icon: DesignTask },
    { title: 'Round 1', value: data?.stats?.['Round 1'] || 0, icon: Round1 },
    { title: 'Round 2', value: data?.stats?.['Round 2'] || 0, icon: Round2 },
    { title: 'Offer Sent', value: data?.stats?.['Offer Sent'] || 0, icon: OfferSent },
  ];

  // Show loader if data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching candidates</div>;

  return (
    <div className="mx-4 pt-4 h-screen">
      <Header HeaderText="Candidates" />
      <div className='bg-background-100 rounded-xl p-4'>
        <div className="w-full max-w-6xl">
          <StatsGrid stats={statsOne} />
        </div>
        <Table readOnly={true} readOnlyData={data?.candidates || []} />
      </div>
    </div>
  );
}

export default Candidates