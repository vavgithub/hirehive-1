import React, { useState, useRef } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/ui/StyledCard';
import { Controller, useForm } from 'react-hook-form';
import { InputField } from '../../components/Form/FormFields';
import { Button } from '../../components/ui/Button';
import { PencilEditIcon } from '../../svg/Buttons/PencilIcon';
import CustomToolTip from '../../components/utility/CustomToolTip';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import SkillsInput from '../../components/utility/SkillsInput';
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';
import axios from '../../api/axios';
import LoaderModal from '../../components/ui/LoaderModal';
import {  useQueryClient } from '@tanstack/react-query';



// Dummy data for skills and tools
const dummySkills = [
  'UI Design', 'UX Design', 'User Research', 'Wireframing', 'Prototyping',
  'Design Systems', 'Visual Design', 'Interaction Design',
  'Information Architecture', 'Usability Testing'
];

const dummyTools = [
  'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin',
  'Principle', 'Photoshop', 'Illustrator', 'Proto.io', 'Marvel', 'Asana' , 'Jira'
];

const PersonalDetails = ({ userData, isEditing, control }) => {
  return (
    <StyledCard backgroundColor="bg-background-30">
      <h2 className="typography-h2 mb-6">Personal Details</h2>
      {!isEditing ? (
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">First Name</p>
              <p className="text-font-gray whitespace-nowrap">Email</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{userData.name?.split(' ')[0]}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{userData.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Last Name</p>
              <p className="text-font-gray whitespace-nowrap">Phone Number</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{userData.name?.split(' ')[1]}</p>
              <p>{userData.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Controller
            name="firstName"
            control={control}
            defaultValue={userData.name?.split(' ')[0]}
            rules={{ required: 'First name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="firstName"
                label="First Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue={userData.name?.split(' ')[1]}
            rules={{ required: 'Last name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="lastName"
                label="Last Name"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={userData.email}
            render={({ field }) => (
              <InputField
                type="email"
                id="email"
                label="Email"
                labelStyles="text-font-gray"
                rowWise
                value={field.value}
                disabled
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue={userData.phone}
            rules={{ required: 'Phone number is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="number"
                id="phone"
                label="Phone Number"
                labelStyles="text-font-gray"
                extraClass="no-spinner"
                rowWise
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
      )}
    </StyledCard>
  );
};

function Profile() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const profileImageRef = useRef();
  const [profileFile, setProfileFile] = useState(null);
  const { mutate: uploadPicture, isLoading: uploading } = useProfilePicture();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      jobTitle: user?.jobTitle || '',
      experience: user?.experience || '',
      skills: user?.skills || [],
      tools_used: user?.tools_used || [],
    },
  });

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProfileFile(file);
    uploadPicture(file, {
      onError: (error) => {
        showErrorToast('Error', 'Failed to upload profile picture');
      },
      onSuccess: () => {
        showSuccessToast('Success', 'Profile picture updated successfully');
      }
    });
  };

  const handleEditProfile = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.put('/auth/register/edit-profile', {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        jobTitle: data.jobTitle,
        experience: data.experience,
        skills: data.skills,
        tools_used: data.tools_used
      });

      if (response.data.status === 'success') {
         // Invalidate the query to refetch user data
        queryClient.invalidateQueries('user');
        showSuccessToast('Success', 'Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      showErrorToast(
        'Error',
        error.response?.data?.message || 'Error updating profile'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-background-80 min-h-screen py-4 px-4">
      {isLoading && <LoaderModal />}
      <div className="container mx-auto">
        <Header HeaderText="My Profile" />
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="flex w-full gap-4 flex-col-reverse lg:flex-row mt-8 lg:mt-0">
            <div className="lg:w-[70%] flex flex-col gap-4">
              <PersonalDetails userData={user} isEditing={isEditing} control={control} />

              {/* Professional Details Section */}
              <StyledCard backgroundColor="bg-background-30">
                <h2 className="typography-h2 mb-6">Professional Details</h2>
                {!isEditing ? (
                  <div className="flex justify-between flex-col gap-6 sm:flex-row">

                    <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
                      <div className="flex flex-col gap-6 typography-body">
                        <p className="text-font-gray whitespace-nowrap">Job Title</p>
                        <p className="text-font-gray whitespace-nowrap">Experience</p>
                      </div>
                      <div className="flex flex-col gap-6 typography-body">
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">{user?.role}</p>
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">{user?.experience}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Controller
                      name="role"
                      control={control}
                      defaultValue={user?.role}
                      render={({ field, fieldState: { error } }) => (
                        <InputField
                          type="text"
                          id="role"
                          label="Job Title"
                          labelStyles="text-font-gray"
                          rowWise
                          value={field.value}
                          onChange={field.onChange}
                          error={error}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="experience"
                      control={control}
                      defaultValue={user?.experience}
                      render={({ field, fieldState: { error } }) => (
                        <InputField
                          type="number"
                          id="experience"
                          label="Experience"
                          labelStyles="text-font-gray"
                          rowWise
                          extraClass="no-spinner"
                          value={field.value}
                          onChange={field.onChange}
                          error={error}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                  </div>
                )}
              </StyledCard>

              {/* Skills & Expertise Section */}
              <StyledCard backgroundColor="bg-background-30">
                <h2 className="typography-h2 mb-6">Skills & Expertise</h2>
                {!isEditing ? (
                  <div className="flex flex-col gap-6 typography-body">
                    <div>
                      <p className="text-font-gray mb-2">Primary Skills</p>
                      <div className="flex gap-2 flex-wrap">
                        {(user?.skills).map((tool, index) => (
                          <span key={index} className="flex justify-center font-outfit w-fit bg-background-70 m px-6 py-2 rounded-full">{tool}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-font-gray mb-2">Tools Proficiency</p>
                      <div className="flex gap-2 flex-wrap">
                        {(user?.tools_used).map((tool, index) => (
                          <span key={index} className="flex justify-center font-outfit w-fit bg-background-70 m px-6 py-2 rounded-full">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <Controller
                      name="skills"
                      control={control}
                      rules={{
                        required: 'Skills are required',
                        validate: (value) =>
                          Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <div className="w-full">
                          <label htmlFor="skills" className="text-font-gray typography-body">
                            Primary Skills 
                          </label>
                          <SkillsInput
                            value={field.value || []}
                            onChange={field.onChange}
                            allSkills={dummySkills}
                            error={error}
                          />
                          {error && <span className="text-red-500 typography-small-p mt-1">{error.message}</span>}
                        </div>
                      )}
                    />
                    <Controller
                      name="tools_used"
                      control={control}
                      rules={{
                        required: 'Tools are required',
                        validate: (value) =>
                          Array.isArray(value) && value.length > 0 ? true : 'Please add at least one tool',
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <div className="w-full">
                          <label htmlFor="tools" className="text-font-gray typography-body">
                            Tools Proficiency 
                          </label>
                          <SkillsInput
                            value={field.value || []}
                            onChange={field.onChange}
                            allSkills={dummyTools}
                            error={error}
                          />
                          {error && <span className="text-red-500 typography-small-p mt-1">{error.message}</span>}
                        </div>
                      )}
                    />
                  </div>
                )}
              </StyledCard>
            </div>
            <div className="w-[100%] sm:w-[50%] mx-auto lg:w-[30%]">
              <StyledCard backgroundColor="bg-background-30" extraStyles="flex flex-col items-center relative">
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="absolute top-6 right-6 border rounded-xl p-2 border-font-gray hover:bg-background-70"
                  >
                    <CustomToolTip title="Edit Profile" arrowed>
                      <PencilEditIcon />
                    </CustomToolTip>
                  </button>
                )}
                <div className="relative w-[8rem] min-h-[5rem]">
                  <div className="absolute w-[8rem] left-0 -top-14 aspect-square overflow-hidden rounded-full">
                    <img
                      src={profileFile ? URL.createObjectURL(profileFile) : user?.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                    <input
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      type="file"
                      className="hidden"
                      ref={profileImageRef}
                      disabled={uploading}
                    />
                  </div>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => profileImageRef.current.click()}
                      className="absolute bottom-1 -right-1 rounded-xl"
                      disabled={uploading}
                    >
                      <PencilEditIcon className={uploading ? 'opacity-50' : ''} />
                    </button>
                  )}
                </div>
                <h1 className="typography-h1 whitespace-nowrap overflow-hidden w-full text-ellipsis text-center">
                  {user?.name}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-gray-600">{user?.email}</p>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <p className="text-gray-600">{user?.role}</p>
                </div>
                <div className="mt-6 w-full grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Reviews Completed</p>
                    <p className="text-xl font-semibold">{user?.tasks_done || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Pending Reviews</p>
                    <p className="text-xl font-semibold">{user?.tasks_pending || 0}</p>
                  </div>
                </div>
              </StyledCard>
            </div>
          </div>
          {isEditing && (
            <div className="place-self-end flex gap-4 mt-4">
              <Button
                onClick={handleCancel}
                type="button"
                variant="secondary"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;