import React, { useEffect, useState } from 'react'
import Header from '../../components/utility/Header'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DynamicForm from '../../components/Form/DynamicForm';
import { showSuccessToast } from '../../components/ui/Toast';
import Loader from '../../components/Loaders/Loader';
import StyledCard from '../../components/Cards/StyledCard';
import Container from '../../components/Cards/Container';


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
      // console.error('Error updating candidate:', error);
      // Handle error (e.g., show an error message to the user)
    }
  })

  
    ;
  // if (error) return <div>Error: {error.message}</div>;

  const formSections = [
    {
      title: 'Personnel Details',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter First Name', },
        { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter E-mail' },
        { name: 'phone', label: 'Phone', type: 'text', placeholder: 'Enter Phone Number' },
        // ... other fields
      ],
    },
    {
      title: 'Resume and Portfolio',
      fields: [
        { name: 'portfolio', label: 'Portfolio', type: 'text', placeholder: 'Enter Portfolio' },
        { name: 'website', label: 'Website', type: 'text', placeholder: 'Enter Website' },
      ],
    },
    {
      title: 'Professional Details',
      fields: [
        { name: 'experience', label: 'Experience', type: 'number' , placeholder: 'Enter Experience (In Years)' },
        { name: 'currentCTC', label: 'Current CTC', type: 'number', placeholder: 'Enter Current CTC (In LPA)' },
        { name: 'expectedCTC', label: 'Expected CTC', type: 'number', placeholder: 'Enter Expected CTC (In LPA)' },
        { name: 'noticePeriod', label: 'Notice Period', type: 'number', placeholder: 'Enter Notice Period (In Days)' }
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
          <Container hasBgColor >
            <Header HeaderText="Edit Candidate Profile" withKebab='false' withBack="true" />
            <div className='flex gap-6 mt-5'>
              <StyledCard backgroundColor={"bg-background-30"} padding={2} extraStyles=' w-96 h-96  flex flex-col items-center'>
                <div className='to-background-100 w-64 rounded-xl overflow-hidden'>
                  <img src={data.profilePictureUrl || " https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" className='object-cover h-full' />
                </div>
                <h2 className='typography-h2 mt-4'>
                  {data.firstName} {data.lastName}
                </h2>
              </StyledCard>
  
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
        </Container>
    )
  }
}

export default EditCandidateProfile