import React, { useEffect, useState } from 'react'
import Header from '../../components/utility/Header'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DynamicForm from '../../components/utility/DynamicForm';


const fetchCandidate = async ({ queryKey }) => {
  const [_key, mainId] = queryKey;
  const { data } = await axios.get(`candidates/${mainId}`);
  return data;
};

const EditCandidateProfile = () => {
  const { id: mainId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['candidate', mainId],
    queryFn: fetchCandidate
  });

  const updateCandidateMutation = useMutation({
    mutationFn: (updatedData) => axios.patch(`candidates/update/${mainId}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidate', mainId]);
      alert("data updated")
    },
    onError: (error) => {
      console.error('Error updating candidate:', error);
      // Handle error (e.g., show an error message to the user)
    }
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formSections = [
    {
      title: 'Personnel Details',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name', },
        { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter Your E-mail' },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter Your Number' },
        // ... other fields
      ],
    },
    {
      title: 'Resume and Portfolio',
      fields: [
        { name: 'portfolio', label: 'Portfolio', type: 'text', placeholder: 'Enter Your E-mail' },
        { name: 'website', label: 'Website', type: 'text', placeholder: 'Enter Your Number' },
      ],
    },
    {
      title: 'Professional Details',
      fields: [
        { name: 'experience', label: 'Experience', type: 'number' },
        { name: 'currentCTC', label: 'Current CTC', type: 'number' },
        { name: 'expectedCTC', label: 'Expected CTC', type: 'number' },
        { name: 'noticePeriod', label: 'Notice Period', type: 'number' }
      ],
    },
    // ... other sections
  ];

  const handleSave = (formData) => {
    updateCandidateMutation.mutate(formData);
  };
  const handleCancel = (formData) => {
    // Handle cancellation
    navigate(-1);
    console.log('Cancelling. Current data:', formData);
  };

  return (
    <div className="bg-background-80 h-screen">
      <div className='p-4'>

        <Header HeaderText={`${data.firstName} ${data.lastName}`} withKebab='false' withBack="true" />
        <div className='grid grid-cols-3 gap-3'>
          <div className='bg-background-30 w-96 h-96 rounded-xl flex flex-col items-center p-4'>
            <div className='w-40 h-40 border border-white rounded'>
              <img src="" alt="" />
            </div>
            <h2 className='typography-h2 '>
              {data.firstName} {data.lastName}
            </h2>
          </div>

          <div className='col-span-2'>
            <DynamicForm
              formSections={formSections}
              initialData={data}  // Pass the fetched data as initialData
              primaryButtonText="Save"
              secondaryButtonText="Cancel"
              onPrimaryAction={handleSave}
              onSecondaryAction={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCandidateProfile