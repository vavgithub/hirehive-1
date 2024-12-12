import React, { useEffect, useState } from 'react'
import Header from '../../components/utility/Header'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DynamicForm from '../../components/utility/DynamicForm';
import { showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/ui/Loader';


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
    mutationFn: (updatedData) => axios.patch(`/admin/candidate/update/${mainId}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidate', mainId]);
      showSuccessToast(`Data Updated Successfully`)
      navigate(-1)
    },
    onError: (error) => {
      console.error('Error updating candidate:', error);
      // Handle error (e.g., show an error message to the user)
    }
  })

  
    ;
  // if (error) return <div>Error: {error.message}</div>;

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
   
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full min-h-screen'>
      <Loader />
    </div>)
  }else{
    return (
      <div className='w-full bg-background-80 min-h-full'>
        <div className=" container mx-auto ">
          <div className='p-4'>
  
            <Header HeaderText="Edit Candidate Profile" withKebab='false' withBack="true" />
            <div className='flex gap-6 mt-5'>
              <div className='bg-background-30 w-96 h-96 rounded-xl flex flex-col items-center p-4'>
                <div className='to-background-100 w-64 rounded-xl overflow-hidden'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" alt="" />
                </div>
                <h2 className='typography-h2 mt-4'>
                  {data.firstName} {data.lastName}
                </h2>
              </div>
  
              <div className='col-span-2 w-full'>
                <DynamicForm
                  formSections={formSections}
                  initialData={data}  // Pass the fetched data as initialData
                  isLoading={updateCandidateMutation.isPending}
                  primaryButtonText={updateCandidateMutation.isPending ? "Saving..." :"Save"}
                  secondaryButtonText="Cancel"
                  onPrimaryAction={handleSave}
                  onSecondaryAction={handleCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditCandidateProfile