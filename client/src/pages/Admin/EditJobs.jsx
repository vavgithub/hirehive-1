import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';

const EditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ['job', id],
    queryFn: () => axios.get(`/jobs/getJobById/${id}`),
  });

  const updateJobMutation = useMutation({
    mutationFn: (updatedJob) => axios.put(`/jobs/editJob/${id}`, updatedJob),
    onSuccess: (data) => {
      console.log(data);
      showSuccessToast('Job Updated', `"${data.data.job.jobTitle}" updated successfully`);
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 1000);
    },
    onError: (error) => {
      console.error('Error updating job:', error);
      showErrorToast('Error', error.response?.data?.message || 'Failed to update job. Please try again.');
    }
  });

  const handleSubmit = (formData) => {
    updateJobMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-background-80 min-h-screen">
      <div className='p-4'>
        <Header HeaderText="Edit Job Listing" />
        {data?.data && (
          <JobForm
            initialData={data.data}
            onSubmit={handleSubmit}
            isEditing={true}
            initialQuestions={data.data.questions || []}
          />
        )}
      </div>
    </div>
  );
};

export default EditJobs;