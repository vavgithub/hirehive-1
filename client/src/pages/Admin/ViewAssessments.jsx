import React, { useMemo, useState } from 'react'
import Header from '../../components/utility/Header'
import Container from '../../components/Cards/Container'
import StyledCard from '../../components/Cards/StyledCard'
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import LoaderModal from '../../components/Loaders/LoaderModal';
import IconWrapper from '../../components/Cards/IconWrapper';
import { ClipboardCheck, ShieldBan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { useAuthContext } from '../../context/AuthProvider';
import FillLoader from '../../components/Loaders/FillLoader';
import ContactUsForm from '../../components/Form/ContactUsForm';

const fetchAssessmentTemplates = async() => {
    const response = await axios.get(`/jobs/get-assessment-templates`, { withCredentials: true });
    return response.data;
}

function ViewAssessments() {
    const { user , isLoading } = useAuthContext();
    const { data: assessmentData, isassessmentLoading } = useQuery({
        queryKey: ['getAllAssessmentTemplates',user?._id],
        queryFn: () => fetchAssessmentTemplates(),
        staleTime : Infinity,
        refetchOnMount : true,
        retry : false
    });

    const navigate = useNavigate();
    const [showContactUs,setShowContactUs] = useState(false);

    const categorizedTemplates = useMemo(()=>{
        let result = {}
        if(assessmentData?.templates?.length > 0 && assessmentData?.hasAccess){
            assessmentData?.templates.map(template => {
                if(result[template.category]){
                    result[template.category].push(template)
                }else{
                    result[template.category] = [template]
                }
            })
        }
        return result
    },[assessmentData])

  return (
    <Container >
        <Header
        HeaderText="Assessments"
        withBack="true"
        >
        </Header>
        <StyledCard extraStyles={'flex flex-col gap-8 '}>
                {(isassessmentLoading || isLoading) ? <FillLoader/> : (assessmentData?.hasAccess === false) ?
                    <div>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <StyledCard backgroundColor={'bg-background-70'} extraStyles={'flex flex-col justify-center items-center mb-6'}>
                                <IconWrapper icon={ShieldBan} isErrorIcon customStrokeWidth={5} size={0} customIconSize={10} />
                                <h2 className='mt-4 pb-0'>Access Denied</h2>
                            </StyledCard>
                            <p className='typography-body text-font-gray'>To get access to this feature, complete building your team.</p>
                            <p className='typography-body text-font-gray'>If you have any further concerns or queries, Reach out to us on submitting this <span onClick={()=>setShowContactUs(true)} className='underline hover:text-font-accent cursor-pointer'>Contact Us</span>  Form.</p>
                        </div>
                    </div>
                :
                    categorizedTemplates && Object.entries(categorizedTemplates).map(([category,assessments]) => (
                        <StyledCard backgroundColor={'bg-background-80'} key={category} >
                            <h2>{category}</h2>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    assessments?.map(assessment =>(
                                        <StyledCard key={assessment?._id} onClick={()=>navigate(`${getRoute(user?.role,ROUTE_KEY.VIEW_ASSESSMENTS_QUESTIONS)}/${assessment?._id}`)} backgroundColor={'bg-background-70'} extraStyles={'cursor-pointer hover:bg-background-60 relative overflow-hidden'}>
                                            <h4 className='w-full whitespace-nowrap text-ellipsis overflow-hidden'>{assessment?.title}</h4>
                                            <div className='text-font-gray opacity-25 -rotate-12 absolute -bottom-6 -right-6'>
                                                <IconWrapper icon={ClipboardCheck} size={0} customIconSize={10} customStrokeWidth={10} inheritColor />
                                            </div>
                                        </StyledCard>
                                    ))
                                }
                            </div>
                        </StyledCard>
                    ))
                }
        </StyledCard>
        <ContactUsForm isOpen={showContactUs} setIsOpen={setShowContactUs} />
    </Container>
  )
}

export default ViewAssessments
