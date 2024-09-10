import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';

const CreateJobs = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (data) => {
    createJobMutation.mutate({ ...data, status: 'open' });
  };

  return (
    <div className="bg-background-80 h-screen">
      <div className='p-4'>
        <Header HeaderText="Create a New Job Listing" withBack="true" />
        <JobForm
          onSubmit={handleSubmit}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default CreateJobs;