import React, { useState, useRef } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/Cards/StyledCard';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../components/Buttons/Button';
import CustomToolTip from '../../components/Tooltip/CustomToolTip';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import SkillsInput from '../../components/Inputs/SkillsInput';
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';
import axios from '../../services/axios';
import LoaderModal from '../../components/Loaders/LoaderModal';
import {  useQueryClient } from '@tanstack/react-query';
import { InputField } from '../../components/Inputs/InputField';
import Container from '../../components/Cards/Container';
import { PencilLine } from '@/components/geode/icons';
import IconWrapper from '../../components/Cards/IconWrapper';
import { companySizeOptions, industryTypeOptions, LocationOptions } from '../../components/Register/CompanyDetails';
import { formatPhoneNumber, PhoneInputField } from '../../components/Form/PhoneInputField';
import { validationRules } from '../../utility/validationRules';
import { editUserProfile } from '../../services/auth.service';
import * as Sentry from '@sentry/react';
import { resolveProfilePicture } from '../../utility/config';



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
    <div>
      <h3 className="mb-6">Personal Details</h3>
      {!isEditing ? (
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="typography-body text-font-gray">First Name</dt>
            <dd className="typography-body break-words">{userData?.firstName ?? '-'}</dd>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="typography-body text-font-gray">Last Name</dt>
            <dd className="typography-body break-words">{userData?.lastName ?? '-'}</dd>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="typography-body text-font-gray">Email</dt>
            <dd className="typography-body break-all">{userData.email}</dd>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <dt className="typography-body text-font-gray">Phone Number</dt>
            <dd className="typography-body">{formatPhoneNumber(userData.phone)}</dd>
          </div>
        </dl>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            defaultValue={userData.firstName}
            rules={{ required: 'First name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="firstName"
                label="First Name"
                labelStyles="text-font-gray"
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
            defaultValue={userData.lastName}
            rules={{ required: 'Last name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="lastName"
                label="Last Name"
                labelStyles="text-font-gray"
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
                value={field.value}
                disabled
              />
            )}
          />
          {/* <Controller
            name="phone"
            control={control}
            defaultValue={userData.phone}
            rules={{ required: 'Phone number is required' }}
            render={({ field, fieldState: { error } }) => (

            )}
          /> */}
          <div className='text-font-gray'>
          <PhoneInputField
            name="phone"
            rules={validationRules?.phoneNumber}
            control={control}
            label="Phone Number"
            />
          </div>
        </div>
      )}
    </div>
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
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
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
    profileImageRef.current.value = null;
  };

  const handleEditProfile = async (data) => {
    try {
      setIsLoading(true);
      const response = await editUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        jobTitle: data.jobTitle,
        experience: data.experience,
        skills: data.skills,
        tools_used: data.tools_used
      });

      
      if (response.data.status === 'success') {
        if(profileFile){
          uploadPicture(profileFile, {
            onError: (error) => {
              showErrorToast('Error', 'Failed to upload profile picture');
            },
            onSuccess: () => {
              // showSuccessToast('Success', 'Profile picture updated successfully');
            }
          });
        }
        // Invalidate the query to refetch user data
        queryClient.invalidateQueries('auth');
        showSuccessToast('Success', 'Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      Sentry.captureException(error, {
        tags: { file: "Profile.jsx", action: "handleEditProfile", role: "admin" },
        extra: { response: error?.response?.data, message: error?.message },
      });
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
    setProfileFile(null);
    setIsEditing(false);
  };

  return (
    // <div className="w-full bg-background-80 min-h-screen p-4">
    //   <div className="container">
    <Container extraContainerStyles={'relative'} hasBgColor>
      {isLoading && <LoaderModal />}
        <Header HeaderText="My Profile" 
        rightContent={
          !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className=" border rounded-xl p-2 border-font-gray hover:bg-background-70"
          >
            <CustomToolTip title="Edit Profile" arrowed>
              <IconWrapper size={2} customIconSize={3}  icon={PencilLine} />
            </CustomToolTip>
          </button>
        )} />
        <StyledCard extraStyles={isEditing ? ' mt-8 ' : ''}> 
          <form onSubmit={handleSubmit(handleEditProfile)}>
              <div className="lg:w-[70%] flex flex-col gap-8">
                  {/* Profile Section */}
                <div className="flex items-center relative justify-start gap-8">
                  <div className="relative w-[8rem] min-h-[5rem]">
                    <div className=" w-[8rem] left-0 -top-14 aspect-square overflow-hidden rounded-full">
                      <img
                        src={profileFile ? URL.createObjectURL(profileFile) : resolveProfilePicture(user?.profilePicture) }
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
                        <IconWrapper hasBg={true} customBgHover={'hover-outline'} size={3} customIconSize={3}  icon={PencilLine} />
                      </button>
                    )}
                  </div>
                  <div className='min-w-0 flex-1 py-1'>
                    <h2 className="break-words">
                      {user?.firstName + " " + user?.lastName}
                    </h2>
                    <p className='flex items-center gap-4 typography-large-p text-font-gray mt-4'>{user?.role}<span className='w-[6px] h-[6px] bg-font-gray inline-block rounded-full'></span>{user?.location ?? "-"}</p>
                  </div>
                </div>

                <PersonalDetails userData={user} isEditing={isEditing} control={control} />

                {/* Professional Details Section */}
                <div>
                  <h3 className="mb-6">Professional Details</h3>
                  {!isEditing ? (
                    <dl className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-font-gray">Job Title</dt>
                        <dd className="break-words">{user?.jobTitle || '-'}</dd>
                      </div>
                      <div>
                        <dt className="text-font-gray">Experience</dt>
                        <dd className="break-words">{user?.experience || '-'}</dd>
                      </div>
                    </dl>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Controller
                        name="jobTitle"
                        control={control}
                        defaultValue={user?.jobTitle}
                        render={({ field, fieldState: { error } }) => (
                          <InputField
                            type="text"
                            id="jobTitle"
                            label="Job Title"
                            labelStyles="text-font-gray"
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
                </div>

                {/* Skills & Expertise Section */}
                {((!isEditing && (user?.tools_used?.length > 0 || user?.skills?.length > 0)) || isEditing) &&
                <div>
                  <h3 className="mb-6">Skills & Expertise</h3>
                  {!isEditing ?  (
                    <div className="grid gap-6 sm:grid-cols-2 typography-body">
                      <div className="flex flex-col gap-2">
                        <p className="text-font-gray">Primary Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {(user?.skills).map((tool, index) => (
                            <span key={index} className="w-fit rounded-full bg-background-70 px-4 py-2">{tool}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-font-gray">Tools Proficiency</p>
                        <div className="flex flex-wrap gap-2">
                          {(user?.tools_used).map((tool, index) => (
                            <span key={index} className="w-fit rounded-full bg-background-70 px-4 py-2">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <Controller
                        name="skills"
                        control={control}
                        // rules={{
                        //   required: 'Skills are required',
                        //   validate: (value) =>
                        //     Array.isArray(value) && value.length > 0 ? true : 'Please add at least one skill',
                        // }}
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
                        // rules={{
                        //   required: 'Tools are required',
                        //   validate: (value) =>
                        //     Array.isArray(value) && value.length > 0 ? true : 'Please add at least one tool',
                        // }}
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
                </div>}
              </div>
            {isEditing && (
              <div className="absolute top-0 right-0 flex gap-4 ">
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
        </StyledCard>
        </Container>
    //   </div>
    // </div>
  );
}

export default Profile;