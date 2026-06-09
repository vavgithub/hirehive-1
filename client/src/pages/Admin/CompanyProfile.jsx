import React, { useMemo, useRef, useState } from 'react'
import Container from '../../components/Cards/Container';
import LoaderModal from '../../components/Loaders/LoaderModal';
import Header from '../../components/utility/Header';
import CustomToolTip from '../../components/Tooltip/CustomToolTip';
import IconWrapper from '../../components/Cards/IconWrapper';
import { PencilLine } from 'lucide-react';
import StyledCard from '../../components/Cards/StyledCard';
import { useAuthContext } from '../../context/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { InputField } from '../../components/Inputs/InputField';
import { companySizeOptions, industryTypeOptions, LocationOptions } from '../../components/Register/CompanyDetails';
import GlobalDropDown from '../../components/Dropdowns/GlobalDropDown';
import SkillsInput from '../../components/Inputs/SkillsInput';
import { dummySkills } from '../../components/Dropdowns/dropdownOptions';
import { Button } from '../../components/Buttons/Button';
import { useCompanyLogo } from '../../hooks/useProfilePicture';
import YearPicker from '../../components/MUIUtilities/YearPicker';
import { showErrorToast, showSuccessToast } from '../../components/ui/Toast';
import { useQueryClient } from '@tanstack/react-query';
import axios from '../../services/axios';
import { hasPermission, PERMISSIONS } from '../../config/permissions.config';
import { editCompanyProfile } from '../../services/auth.service';
import * as Sentry from '@sentry/react';
import { LocationInputField } from '../../components/Inputs/LocationInputField';
import { validationRules } from '../../utility/validationRules';
import { useUnknownProfilePicture } from '../../context/ThemeContext';

const CompanyOverview = ({ companyDetails, isEditing, control ,setValue }) => {
  return (
    <div>
      <h3 className="typography-h3 mb-6">Company Overview</h3>
      {!isEditing ? (
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Company Name</p>
              <p className="text-font-gray whitespace-nowrap">Company Location</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{companyDetails?.name ?? '-'}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{(companyDetails.geoLocation && companyDetails?.location) ? companyDetails?.location : LocationOptions.find(loc => loc.value === companyDetails.location)?.label ?? '-'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Company Size</p>
              <p className="text-font-gray whitespace-nowrap">Industry</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis ">{companySizeOptions.find(size => size.value === companyDetails?.size)?.label ?? '-'}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis ">{industryTypeOptions.find(type => type.value === companyDetails?.industryType)?.label ?? '-'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            defaultValue={companyDetails?.name}
            rules={{ required: 'Company name is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="name"
                label="Company Name"
                labelStyles="text-font-gray"
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="size"
            control={control}
            defaultValue={companyDetails?.size}
            rules={{ required: 'Company size is required' }}
            render={({ field, fieldState: { error } }) => (
                <GlobalDropDown    
                label="Company Size" 
                value={field.value}
                error={error}
                extraStylesForLabel={'text-font-gray'}
                errorMessage={error?.message}
                onChange={field.onChange}
                options={companySizeOptions}
                />
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue={""}
            rules={validationRules.location}
            render={({ field, fieldState: { error } }) => (
              <LocationInputField   
                type="text"
                id="location"
                label="Location"
                labelStyles="text-font-gray"
                value={field.value ?? ""}
                onChange={field.onChange}
                setLocationId={(id) => setValue('locationId',id)}
                setSessionId={(id) => setValue('sessionId',id)}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="industryType"
            control={control}
            defaultValue={companyDetails?.industryType}
            render={({ field , fieldState: { error }}) => (
                <GlobalDropDown    
                label="Industry" 
                extraStylesForLabel={'text-font-gray'}
                value={field.value}
                error={error}
                errorMessage={error?.message}
                onChange={field.onChange}
                options={industryTypeOptions}
                />
            )}
          />
            <Controller
            name="about"
            control={control}
            defaultValue={companyDetails?.about}
            rules={{ required: 'About is required' }}
            render={({ field , fieldState: { error }}) => (
                <div className='flex flex-col gap-2 relative'>
                    <label htmlFor="about" className='typography-body text-font-gray'>About</label>
                    <textarea 
                    name="about" 
                    id="about" 
                    className={'custom-textarea ' + (error ? ' !border !border-red-500' : ' !border !border-transparent ')} 
                    rows={5} 
                    placeholder='Enter About' 
                    value={field.value} 
                    onChange={field.onChange}
                    >
                    </textarea>
                    {error && <span className="text-red-500 typography-small-p absolute -bottom-4">{error?.message}</span>}
                </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

const ProfessionalDetails = ({ companyDetails, isEditing, control }) => {
  return (
    <div>
      <h3 className="typography-h3 mb-6">Professional Details</h3>
      {!isEditing ? (
        <>
        <div className="flex justify-between flex-col gap-6 sm:flex-row">
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%]">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Company Website</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">{companyDetails?.website ?? '-'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:w-[45%] gap-[10%] justify-between">
            <div className="flex flex-col gap-6 typography-body">
              <p className="text-font-gray whitespace-nowrap">Founded</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
              <p className="whitespace-nowrap overflow-hidden text-ellipsis ">{companyDetails?.founded ?? '-'}</p>
            </div>
          </div>
        </div>
        {companyDetails?.focusAreas?.length > 0 && 
        <div className="flex justify-between flex-col gap-6 sm:flex-row typography-body mt-6">
            <div className="flex flex-col gap-2  ">
            <div className="flex flex-col gap-6 typography-body">
                <p className="text-font-gray whitespace-nowrap">Focus Areas</p>
            </div>
            <div className="flex flex-col gap-6 typography-body">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis flex gap-2 flex-wrap">
                {(companyDetails?.focusAreas)?.map((tool, index) => (
                <span key={index} className="flex justify-center  w-fit bg-background-70 m px-6 py-2 rounded-full">{tool}</span>
                ))}
                </p>
            </div>
            </div>

        </div>}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="website"
            control={control}
            defaultValue={companyDetails?.website}
            rules={{ required: 'Company website is required' }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type="text"
                id="website"
                label="Company Website"
                labelStyles="text-font-gray"
                value={field.value}
                onChange={field.onChange}
                error={error}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="founded"
            control={control}
            defaultValue={companyDetails?.founded}
            rules={{ required: 'Founded Year is required' }}
            render={({ field, fieldState: { error } }) => (
                <div className='flex flex-col gap-2'>
                    <label htmlFor="founded" className='typography-body text-font-gray'>Founded</label>
                    <YearPicker value={field.value} onChange={field.onChange} />
                </div>
            )}
          />
          <Controller
            name="focusAreas"
            control={control}
            defaultValue={companyDetails?.focusAreas}
            render={({ field , fieldState: { error }}) => (
                <div className="w-full">
                <label htmlFor="focusAreas" className="text-font-gray typography-body">
                    Focus Areas
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
        </div>
      )}
    </div>
  );
};

function CompanyProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    const companyDetails = useMemo(()=> user?.companyDetails ,[user])

    const profileImageRef = useRef();
    const [profileFile, setProfileFile] = useState(null);
    const { mutate: uploadPicture, isLoading: uploading } = useCompanyLogo();

    const { control, handleSubmit, reset , setValue } = useForm({
    defaultValues: {
        name: companyDetails?.name || '',
        size: companyDetails?.size || '',
        location: companyDetails?.location || '',
        industryType: companyDetails?.industryType || '',
        about: companyDetails?.about || '',
        website: companyDetails?.website || '',
        founded: companyDetails?.founded || '',
        focusAreas: companyDetails?.focusAreas || [],
        keyContacts: companyDetails?.keyContacts || [],
        locationId : '',
        sessionId : ''
    },
    });
    const UNKNOWN_PROFILE_PICTURE_URL = useUnknownProfilePicture();
    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setProfileFile(file);
        profileImageRef.current.value = null;
    };

    const handleCancel = () => {
        reset();
        setProfileFile(null);
        setIsEditing(false);
    };

    const handleEditProfile = async (data) => {
        try{
            setIsLoading(true);
            const response = await editCompanyProfile({
                name: data?.name ,
                size: data?.size ,
                location: data?.location ,
                locationId : data?.locationId,
                sessionId : data?.sessionId,
                industryType: data?.industryType ,
                about: data?.about ,
                website: data?.website ,
                founded: data?.founded ? new Date(data?.founded)?.getFullYear()?.toString() : '' ,
                focusAreas: data?.focusAreas ,
                keyContacts: data?.keyContacts , 
            });

            
            if (response.data.status === 'success') {
                if(profileFile){
                    uploadPicture(profileFile, {
                        onError: (error) => {
                        showErrorToast('Error', 'Failed to upload logo');
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
              tags: { file: "CompanyProfile.jsx", action: "handleEditProfile", role: "admin" },
              extra: { response: error?.response?.data, message: error?.message },
            });
            console.log(error)
            showErrorToast(
                'Error',
                error.response?.data?.message || 'Error updating profile'
            );
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Container extraContainerStyles={'relative'} hasBgColor>
      {isLoading && <LoaderModal />}
        <Header HeaderText="Company Profile" 
        rightContent={
          (!isEditing && hasPermission(user?.role,PERMISSIONS.EDIT_COMPANY_PROFILE)) && (
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
        <StyledCard>
            <form onSubmit={handleSubmit(handleEditProfile)}>
              <div className="lg:w-[70%] flex flex-col gap-8">
                  {/* Profile Section */}
                <div className="flex items-center relative justify-start gap-8">
                  <div className="relative w-[8rem] min-h-[5rem]">
                    <div className=" w-[8rem] left-0 -top-14 aspect-square overflow-hidden rounded-full">
                      <img
                        src={ profileFile ? URL.createObjectURL(profileFile) : (companyDetails?.logoUrl || UNKNOWN_PROFILE_PICTURE_URL) }
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
                  <div className='max-w-[60%] overflow-hidden py-1 text-ellipsis'>
                    <h2 className="typography-h2 whitespace-nowrap overflow-hidden w-full text-ellipsis ">
                      {companyDetails?.name}
                    </h2>
                    <p className=' typography-large-p text-font-gray line-clamp-3'>{companyDetails?.about ?? '-'}</p>
                  </div>
                </div>

                <CompanyOverview companyDetails={companyDetails} control={control} isEditing={isEditing} setValue={setValue} />
                <ProfessionalDetails companyDetails={companyDetails} control={control} isEditing={isEditing} />
                {isEditing && (
                <div className="absolute top-0 right-0 flex gap-4 ">
                    <Button
                    onClick={handleCancel}
                    type="button"
                    variant="secondary"
                    // disabled={isLoading}
                    >
                    Cancel
                    </Button>
                    <Button
                    type="submit"
                    // disabled={isLoading}
                    >
                    {false ? 'Saving...' : 'Save'}
                    </Button>
                </div>
                )}
                </div>
                </form>
        </StyledCard>
    </Container>
  )
}

export default CompanyProfile
