import React, { useMemo } from 'react'
import Modal from './Modal'
import { useQuery } from '@tanstack/react-query';
import axios from '../../services/axios';
import Loader from '../Loaders/Loader';
import StyledCard from '../Cards/StyledCard';
import { Headset, ShieldBan } from 'lucide-react';
import IconWrapper from '../Cards/IconWrapper';
import { getAssessmentQuestionsById } from '../../services/admin.candidate.service';

function TemplateModal({open,onClose,assessment}) {
    const {
        data,
        isLoading,
        error
      } = useQuery({
        queryKey: ['assessment-questions', assessment?._id],
        queryFn: () => getAssessmentQuestionsById(assessment?._id),
        staleTime: Infinity,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!assessment?._id
      });

      const noAccess = useMemo(()=> (error?.response?.data?.hasAccess === false), [error,data]);
      const questions = useMemo(()=>data?.questions || [],[data]);
      
  return (
    <Modal
    open={open}
    onClose={onClose}
    customTitle={assessment?.category + ' : ' +assessment?.title}
    customMessage={noAccess ? " " :"This set of questions will be used to assess the candidate's suitability and qualifications for the role."}
    noCancel
    customConfirmLabel={'OK'}
    specifiedWidth={'max-w-[70vw]'}
    >
        {isLoading ? <div className='w-full min-h-[55vh] flex justify-center items-center'><Loader /></div> : 
        noAccess ?
        <div>
            <div className='w-full flex flex-col justify-center items-center'>
              <StyledCard backgroundColor={'bg-background-70'} extraStyles={'flex flex-col justify-center items-center mb-6'}>
                <div className='text-primary-100'>
                    <IconWrapper icon={Headset} inheritColor customStrokeWidth={5} size={0} customIconSize={10} />
                </div>
                <h2 className='mt-4 pb-0'>Contact Support</h2>
            </StyledCard>
            <p className='typography-body text-font-gray'>To access this feature, Please check the Assessment tab and submit the Contact Support form.</p>
            </div>
        </div>
        :
        questions?.length > 0 && 
        <div className="space-y-6 mt-4  max-h-[55vh] overflow-y-scroll scrollbar-hide">
            {questions.map((qstn, index) => (
                <StyledCard key={qstn.questionId} backgroundColor={'bg-background-80'}>
                    <h3 className="mb-4">
                        Q{index + 1}. {qstn.text}
                    </h3>

                    <div className={` flex  ${qstn.questionType === 'image' ? 'flex-row gap-2 justify-between' : 'flex-col'}`}>
                      <div className={"grid grid-cols-2 gap-4 h-fit " + (qstn.questionType === 'image' ? 'w-[70%]' : 'w-full')}>
                          {qstn.options.map((option, optIndex) => (
                            <div
                            key={optIndex}
                            className={`p-4  rounded-lg typography-body bg-background-60  border-gray-200`}
                            >
                                  {option.text}
                              </div>
                          ))}
                      </div>
                          {qstn.questionType === 'image' && qstn.imageUrl && (
                            <div className="relative w-[30%] mb-6 flex justify-end">
                              <img
                                src={qstn.imageUrl}
                                alt="Question visual"
                                className="max-w-[80%] max-h-[20rem] rounded-xl"
                              />
                            </div>
                          )}
                    </div>

                </StyledCard>
            ))}
        </div>}
    </Modal>
  )
}

export default TemplateModal
