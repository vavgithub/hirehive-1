import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';
import { useCreateJobForm } from '../../hooks/useCreateJobForm';
import Header from '../../components/utility/Header';

const EditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData, setFormData, handleInputChange, handleExperienceChange, incrementExperience, decrementExperience, setSkills } = useCreateJobForm();
  const [questions, setQuestions] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['job', id],
    queryFn: () => axios.get(`/getJobById/${id}`),
  });

  useEffect(() => {
    if (data?.data) {
      console.log('Job data fetched:', data.data);
      setFormData(data.data);
      setQuestions(data.data.questions || []);
    }
  }, [data, setFormData]);

  const updateJobMutation = useMutation({
    mutationFn: (updatedJob) => axios.put(`/editJob/${id}`, updatedJob),
    onSuccess: () => {
      navigate('/admin/jobs');
    },
    onError: (error) => {
      console.error('Error updating job:', error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateJobMutation.mutate({ ...formData, questions });
  };

  const handleQuestionsChange = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-background-80 h-screen">
      <div className='p-4'>
        <Header HeaderText="Edit Job Listing"></Header>
        {data?.data && (
          <JobForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleExperienceChange={handleExperienceChange}
            incrementExperience={incrementExperience}
            decrementExperience={decrementExperience}
            setSkills={setSkills}
            handleSubmit={handleSubmit}
            isEditing={true}
            onQuestionsChange={handleQuestionsChange}
            initialQuestions={questions}
          />
        )}
      </div>
    </div>
  );
};

export default EditJobs;