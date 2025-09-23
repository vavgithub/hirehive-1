import React, { useEffect, useMemo, useState } from "react";
import Container from "../../components/Cards/Container";
import LoaderModal from "../../components/Loaders/LoaderModal";
import Header from "../../components/utility/Header";
import StyledCard from "../../components/Cards/StyledCard";
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import { getRoute, ROUTE_KEY } from "../../config/permissions.config";
import { useAuthContext } from "../../context/AuthProvider";
import { getAssessmentQuestionsById } from "../../services/admin.candidate.service";

function ViewQuestions() {
    const { assessment_id } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    
        const {
        data,
        isLoading,
        error
      } = useQuery({
        queryKey: ['assessment-questions', assessment_id],
        queryFn: () => getAssessmentQuestionsById(assessment_id),
        staleTime: Infinity,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!assessment_id
      });

      const noAccess = useMemo(()=> (error?.response?.data?.hasAccess === false), [error,data]);

      useEffect(()=>{
        if(noAccess){
          navigate(getRoute(user?.role,ROUTE_KEY.ASSESSMENTS))
        }
      },[noAccess])
      
  return (
    <Container>
      {isLoading && <LoaderModal/>}
      <Header
        HeaderText={(!isLoading && !noAccess) ? (data?.category + " : " + data?.title) : ''}
        withBack="true"
      ></Header>
      <StyledCard>
    {data?.questions?.length > 0 && 
        <div className="scrollbar-hide grid grid-cols-2 gap-6">
            {data?.questions.map((qstn, index) => (
                <StyledCard backgroundColor={'bg-background-100'} key={qstn._id} extraStyles={qstn.questionType === 'image' ? 'col-span-2' : ''}>
                    <h3 className="mb-4">
                        Q{index + 1}. {qstn.text}
                    </h3>
                    <div className={` flex  ${qstn.questionType === 'image' ? 'flex-row gap-2 justify-between' : 'flex-col'}`}>
                      <div className={"grid  gap-4 h-fit " + (qstn.questionType === 'image' ? 'w-[70%] grid-cols-1' : 'w-full grid-cols-2')}>
                          {qstn.options.map((option, optIndex) => (
                            <div
                            key={optIndex}
                            className={`p-4  rounded-lg typography-body bg-background-80  border-gray-200`}
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
