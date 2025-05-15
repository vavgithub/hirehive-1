import React from 'react'
import Header from '../../components/utility/Header'
import Container from '../../components/Cards/Container'
import StyledCard from '../../components/Cards/StyledCard'
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import LoaderModal from '../../components/Loaders/LoaderModal';
import IconWrapper from '../../components/Cards/IconWrapper';
import { ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { useAuthContext } from '../../context/AuthProvider';

const fetchAssessmentTemplates = async() => {
    const response = await axios.get(`/jobs/get-assessment-templates`, { withCredentials: true });
    return response.data;
}

function ViewAssessments() {
    const { user , isLoading } = useAuthContext();
    const { data: assessmentTemplates, isassessmentLoading } = useQuery({
        queryKey: ['getAllAssessmentTemplates'],
        queryFn: () => fetchAssessmentTemplates(),
        staleTime : Infinity,
        retry : false
    });

    const navigate = useNavigate();

  return (
    <Container >
        {(isassessmentLoading || isLoading) && <LoaderModal/>}
        <Header
        withKebab={true}
        HeaderText="Assessments"
        withBack="false"
        >
        </Header>
        <StyledCard>
            <div className='grid grid-cols-3 gap-6'>
                {
                    assessmentTemplates?.length > 0 && assessmentTemplates.map(assessment => (
                        <StyledCard onClick={()=>navigate(`${getRoute(user?.role,ROUTE_KEY.VIEW_ASSESSMENTS_QUESTIONS)}/${assessment?._id}`)} backgroundColor={'bg-background-80'} extraStyles={'cursor-pointer hover:bg-background-60 relative overflow-hidden'}>
                            <h3 className='typography-h3 w-full whitespace-nowrap text-ellipsis overflow-hidden'>{assessment?.title}</h3>
                            <p className='typography-body text-font-gray'>Category : {assessment?.category}</p>
                            <div className='text-font-gray opacity-40 -rotate-12 absolute -bottom-6 -right-6'>
                                <IconWrapper icon={ClipboardCheck} size={0} customIconSize={10} customStrokeWidth={10} inheritColor />
                            </div>
                        </StyledCard>
                    ))
                }
            </div>
        </StyledCard>
    </Container>
  )
}

export default ViewAssessments
