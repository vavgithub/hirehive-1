import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCreateJobForm } from '../../hooks/useCreateJobForm';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';

const CreateJobs = () => {
  const navigate = useNavigate();
  const { formData, handleInputChange, handleExperienceChange, incrementExperience, decrementExperience, setSkills } = useCreateJobForm();
  const [questions, setQuestions] = useState([]);

  const createJobMutation = useMutation({
    mutationFn: (jobData) => axios.post('/createJobs', jobData),
    onSuccess: (data) => {
      showSuccessToast('Job Posted', `"${data.data.jobTitle}" created successfully`);
      // Navigate after a short delay to ensure the toast is visible
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 1000);
    },
    onError: (error) => {
      console.error('Error creating job:', error);
      showErrorToast('Error', error.response?.data?.message || 'Failed to create job. Please try again.');
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createJobMutation.mutate({ ...formData, status: 'open', questions });
  };

  const handleQuestionsChange = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="bg-background-80 h-screen">
      <div className='p-4'>
        <Header HeaderText="Create a New Job Listing" withBack="true"></Header>
        <JobForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleExperienceChange={handleExperienceChange}
          incrementExperience={incrementExperience}
          decrementExperience={decrementExperience}
          setSkills={setSkills}
          handleSubmit={handleSubmit}
          isEditing={false}
          onQuestionsChange={handleQuestionsChange}
        />
      </div>
    </div>
  );
};

export default CreateJobs;