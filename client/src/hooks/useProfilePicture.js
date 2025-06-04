// hooks/useProfilePicture.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadCompanyLogo, uploadProfilePicture } from '../services/auth.service';

export const useProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('profilePicture', file);
      return uploadProfilePicture(formData);
    },
    onSuccess: (data) => {
      // Update the auth query cache with the new profile picture URL
      queryClient.setQueryData(['auth'], (oldData) => ({
        ...oldData,
        profilePicture: data.profilePictureUrl,
      }));
    },
  });
};

export const useCompanyLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('companyLogo', file);
      return uploadCompanyLogo(formData);
    },
    onSuccess: (data) => {
      // Update the auth query cache with the new profile picture URL
      queryClient.invalidateQueries(['auth']);
    },
  });
};