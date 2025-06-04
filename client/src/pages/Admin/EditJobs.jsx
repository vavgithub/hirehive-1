import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../../components/Form/JobForm';
import axios from '../../services/axios';
import Header from '../../components/utility/Header';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import { useAuthContext } from '../../context/AuthProvider';
import Container from '../../components/Cards/Container';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import { fetchjobsById, updateJob } from '../../services/jobs.service';

const EditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get user data from the context
  const role = user?.role || 'Admin';

  const { isLoading, error, data } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchjobsById(id),
  });

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: (data) => {
      showSuccessToast('Job Updated', `"${data.job.jobTitle}" updated successfully`);
      setTimeout(() => {
        navigate(getRoute(role,ROUTE_KEY.ALLJOBS));  
      }, 1000);
    },
    onError: (error) => {
      // console.error('Error updating job:', error);
      showErrorToast('Error', error.response?.data?.message || 'Failed to update job. Please try again.');
    }
  });

  const handleSubmit = (formData) => {
    updateJobMutation.mutate({id,updatedJob :formData});
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full min-h-screen'>

      <Loader />
    </div>)
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container hasBgColor>
        <Header HeaderText="Edit Job Listing" withBack={"true"} />
        {data && (
          <JobForm
            initialData={data}
            onSubmit={handleSubmit}
            isLoading={updateJobMutation.isPending}
            isEditing={true}
            initialQuestions={data?.questions || []}
          />
        )}
    </Container>
  );
};

export default EditJobs;