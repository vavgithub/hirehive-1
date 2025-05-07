import React from 'react'
import Modal from './Modal'
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import Loader from '../Loaders/Loader';

function TemplateModal({open,onClose,assessment}) {
    const {
        data: questions,
        isLoading,
        error
      } = useQuery({
        queryKey: ['assessment-questions', assessment?._id],
        queryFn: async () => {
          const response = await axios.get(`/admin/candidate/assessment-questions?assessmentId=${assessment?._id}`);
          return response.data.questions;
        },
        staleTime: Infinity,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!assessment?._id
      });
      
  return (
    <Modal
    open={open}
    onClose={onClose}
    customTitle={assessment?.title}
    customMessage={"This set of questions will be used to assess the candidate's suitability and qualifications for the role."}
    noCancel
    customConfirmLabel={'OK'}
    specifiedWidth={'max-w-[70vw]'}
    >
        {isLoading ? <div className='w-full min-h-[55vh] flex justify-center items-center'><Loader /></div> : questions?.length > 0 && 
        <div className="space-y-4 mt-4  max-h-[55vh] overflow-y-scroll scrollbar-hide">
            {questions.map((qstn, index) => (
                <div key={qstn.questionId} className=" rounded-xl pb-4">
                    <h3 className="typography-h3 mb-4">
                        Q{index + 1}. {qstn.text}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {qstn.options.map((option, optIndex) => (
                            <div
                                key={optIndex}
                                className={`p-4 rounded-lg typography-body bg-background-60  border-gray-200`}
                            >
                                {option.text}
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>}
    </Modal>
  )
}

export default TemplateModal
