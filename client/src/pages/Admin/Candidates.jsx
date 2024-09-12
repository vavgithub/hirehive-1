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

const fetchCandidatesAndStats = async () => {
    const [candidatesResponse, statsResponse] = await Promise.all([
      axios.get('/candidates/allCandidates'),
      axios.get('/candidates/stats')
    ]);
  
    return {
      candidates: candidatesResponse.data,
      stats: statsResponse.data
    };
  }

  
  const Candidates = () => {
    const queryClient = useQueryClient();
  
    const { data, isLoading, error } = useQuery({
      queryKey: ['candidatesAndStats'],
      queryFn: fetchCandidatesAndStats,
    });
  
    React.useEffect(() => {
      if (data) {
        console.log('Candidates and Stats data:', data)
      }
    }, [data]);
  
    const candidateStats = React.useMemo(() => {
      if (!data) return [];
  
      const { stats } = data;
  
      return [
        { title: 'Portfolio', value: stats.data.stageStats?.Portfolio || 0, icon: Portfolio },
        { title: 'Screening', value: stats.data.stageStats?.Screening || 0, icon: Screening },
        { title: 'Design Task', value: stats.data.stageStats?.['Design Task'] || 0, icon: DesignTask },
        { title: 'Round 1', value: stats.data.stageStats?.['Round 1'] || 0, icon: Round1 },
        { title: 'Round 2', value: stats.data.stageStats?.['Round 2'] || 0, icon: Round2 },
        { title: 'Hired', value: stats.data.stageStats?.Hired || 0, icon: OfferSent },
      ];
    }, [data]);
  
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>
  
    return (
      <div className="mx-4 pt-4 h-screen">
        <Header HeaderText="Candidates" />
        <div className='bg-background-100 rounded-xl p-4'>
          <div className="w-full max-w-6xl">
          <StatsGrid stats={candidateStats} />

          </div>
          <Table rowsData={data.candidates?.data || []} extraCTA='false' />
        </div>
      </div>
    );
  }
  

export default Candidates