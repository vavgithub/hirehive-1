// hooks/useProfilePicture.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfilePicture } from '../api/authApi';

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