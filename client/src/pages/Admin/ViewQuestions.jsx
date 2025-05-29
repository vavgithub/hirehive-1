import React, { useState } from "react";
import Container from "../../components/Cards/Container";
import LoaderModal from "../../components/Loaders/LoaderModal";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

function ViewQuestions() {
    const { assessment_id } = useParams()
        const {
        data,
        isLoading,
        error
      } = useQuery({
        queryKey: ['assessment-questions', assessment_id],
        queryFn: async () => {
          const response = await axios.get(`/admin/candidate/assessment-questions?assessmentId=${assessment_id}`);
          return response.data;
        },
        staleTime: Infinity,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!assessment_id
      });
      
  return (
    <Container>
      {isLoading && <LoaderModal/>}
      <Header
        HeaderText={data?.category + " : " + data?.title}
        withBack="true"
      ></Header>
      <StyledCard>
    {data?.questions?.length > 0 && 
        <div className="scrollbar-hide grid grid-cols-2 gap-6">
            {data?.questions.map((qstn, index) => (
                <StyledCard backgroundColor={'bg-background-80'} key={qstn._id} extraStyles={qstn.questionType === 'image' ? 'col-span-2' : ''}>
                    <h3 className="mb-4">
                        Q{index + 1}. {qstn.text}
                    </h3>
                    <div className={` flex  ${qstn.questionType === 'image' ? 'flex-row gap-2 justify-between' : 'flex-col'}`}>
                      <div className={"grid  gap-4 h-fit " + (qstn.questionType === 'image' ? 'w-[70%] grid-cols-1' : 'w-full grid-cols-2')}>
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
                            <div className="relative w-[30%]  flex justify-end">
                              <img
                                src={qstn.imageUrl}
                                alt="Question visual"
                                className="max-w-[80%] max-h-[16rem] rounded-xl"
                              />
                            </div>
                          )}
                    </div>

                </StyledCard>
            ))}
        </div>}
      </StyledCard>
    </Container>
  );
}

export default ViewQuestions;
