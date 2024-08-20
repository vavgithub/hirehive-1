import React from 'react'
import Header from '../../components/utility/Header'
import StatsGrid from '../../components/StatsGrid'
import one from '../../svg/StatsCard/Jobs Page/one';
import Table from '../../components/Table';
import axios from "../../api/axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchCandidates = async () => {
    const { data } = await axios.get('/candidates/allCandidates')
    return data
  }

const Candidates = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['candidates'],
        queryFn: fetchCandidates,
      })

    
      React.useEffect(() => {
        if (data) {
          console.log('Candidates data:', data)
        }
      }, [data])
  
      const candidateStats = [
          { title: 'Total', value: 1, icon: one },
          { title: 'Portfolio', value: 2, icon: one },
          { title: 'Screening', value: 3, icon: one },
          { title: 'Design Task', value: 4, icon: one },
          { title: 'Round 1', value: 5, icon: one },
          { title: 'Round 2', value: 5, icon: one },
          { title: 'Offer Sent', value: 5, icon: one },
      ];
  
      if (isLoading) return <div>Loading...</div>
      if (error) return <div>An error occurred: {error.message}</div>
    return (
        <div className="mx-4 pt-4 h-screen">
            <Header HeaderText="Candidates"></Header>
            <div className='bg-background-100 rounded-xl'>
                <StatsGrid stats={candidateStats}></StatsGrid> 
                <Table rowsData={data.data}></Table>
            </div>
        </div>
    )
}

export default Candidates