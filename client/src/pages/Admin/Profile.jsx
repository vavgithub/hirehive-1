import React from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import Header from '../../components/utility/Header';
import { Camera } from 'lucide-react';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import StyledCard from '../../components/ui/StyledCard';

const Profile = () => {
  const { user } = useAuthContext();
  const { mutate: uploadPicture, isLoading: uploading } = useProfilePicture();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadPicture(file, {
      onError: (error) => {
        console.error('Error uploading profile picture:', error);
        // You can add a toast notification here
      }
    });
  };

  return (
    <div className='w-full p-4'>
      <div className='container mx-auto'>
      <Header HeaderText={"Profile"} withBack="false" withKebab="false" />
      <StyledCard padding={2} backgroundColor={"bg-background-30"} extraStyles=' flex '>
        <div className='relative w-32 h-32 rounded-full overflow-hidden border border-gray-200'>
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
              <span className='text-xl'>{user?.name?.[0]}</span>
            </div>
          )}
          <label className='absolute bottom-4 right-4 p-1 bg-background-100 rounded-full cursor-pointer shadow-md'>
            <input
              type="file"
              className='hidden'
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Camera className={`w-4 h-4 ${uploading ? 'opacity-50' : ''}`} />
          </label>
        </div>
        <div className='ml-4 flex flex-col justify-center'>
          <h1 className='typography-h1'>{user?.name}</h1>
          <div className='flex items-center gap-4'>

            <p className='text-gray-600'>{user?.email}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="#808389" />
            </svg>
            <p className='text-gray-600'>{user?.role}</p>
          </div>

        </div>
      </StyledCard>
    </div>
    </div>
  );
};

export default Profile;