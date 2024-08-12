// src/pages/CreateJobs.js
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useCreateJobForm } from '../../hooks/useCreateJobForm';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';

const CreateJobs = () => {
  const navigate = useNavigate();
  const { formData, handleInputChange, handleExperienceChange, incrementExperience, decrementExperience, setSkills } = useCreateJobForm();

  const createJobMutation = useMutation({
    mutationFn: (jobData) => axios.post('/createJobs', jobData),
    onSuccess: () => {
      navigate('/admin/jobs');
    },
    onError: (error) => {
      console.error('Error creating job:', error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createJobMutation.mutate({ ...formData, status: 'open' });
  };

  return (
    <div className="bg-background-80 h-screen">
      <div className='p-4'>
        <h1>Create a New Job Listing</h1>
        <JobForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleExperienceChange={handleExperienceChange}
          incrementExperience={incrementExperience}
          decrementExperience={decrementExperience}
          setSkills={setSkills}
          handleSubmit={handleSubmit}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default CreateJobs;