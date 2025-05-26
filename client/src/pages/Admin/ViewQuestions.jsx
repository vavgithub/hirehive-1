import React from "react";
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
        HeaderText={data?.title}
        withBack="true"
      ></Header>
      <StyledCard>
    {data?.questions?.length > 0 && 
        <div className="space-y-4  scrollbar-hide">
            {data?.questions.map((qstn, index) => (
                <div key={qstn._id} className=" rounded-xl pb-4">
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
      </StyledCard>
    </Container>
  );
}

export default ViewQuestions;
