import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import JobForm from '../../components/Form/JobForm';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useAuthContext } from '../../context/AuthProvider';

const CreateJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get user data from the context
  const role = user?.role || 'Admin';

  const createJobMutation = useMutation({
    mutationFn: (jobData) => axios.post('/jobs/createJobs', jobData),
    onSuccess: (data) => {
      const action = data.data.status === 'draft' ? 'saved as draft' : 'created';
      showSuccessToast('Job Action', `"${data.data.jobTitle}" ${action} successfully`);
      navigate(role === "Admin" ? '/admin/jobs' : '/hiring-manager/jobs');  
    },
    onError: (error) => {
      // console.error('Error with job action:', error);
      showErrorToast('Error', error.response?.data?.message || 'Failed to perform job action. Please try again.');
    }
  });

  const handleSubmit = (data, isDraft = false) => {
    const status = isDraft ? 'draft' : 'open';
    createJobMutation.mutate({ ...data, status });
  };

  return (
    <div className="bg-background-80 w-full ">
      <div className='p-4 container mx-auto'>
        <Header HeaderText="Create a New Job Listing" withBack="true" />
        <JobForm
          isLoading={createJobMutation.isPending}
          onSubmit={handleSubmit}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default CreateJobs;