// ApplyJob.jsx this is the component of every form field in the apply job page
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/FormFields';
import { validationRules } from '../../utility/validationRules';
import { ProfilePictureUpload } from './ProfilePictureUpload';

// Reusable form field component
export const FormField = ({ 
    name,
    control,
    rules,
    label,
    type = "text",
    required = false,
    extraClass = "",
    ...props 
  }) => {
    // Add no-spinner class automatically for number inputs
    const combinedExtraClass = `${type === 'number' ? 'no-spinner' : ''} ${extraClass}`.trim();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <InputField
            id={name}
            type={type}
            label={label}
            required={required}
            error={error}
            errorMessage={error?.message}
            extraClass={combinedExtraClass}
            {...field}
            {...props}
          />
        )}
      />
    );
  };

  export const ResumePortfolioSection = ({ control , isAuthenticated }) => {
    return (
      <div>
        <h3 className={(isAuthenticated ? " mt-2 " : " mt-12 ") + " typography-h3  mb-4"}>Resume & Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="portfolio"
            control={control}
            rules={validationRules.portfolio}
            label="Portfolio"
            required={true}
            type="text"
          />
          
          <FormField
            name="website"
            control={control}
            rules={validationRules.website}
            label="Website"
            required={false}
            type="text"
          />
        </div>
      </div>
    );
  };
  
  // Example usage in your form sections:
  export const ProfessionalDetailsSection = ({ control }) => {
    return (
      <div>
        <h3 className="typography-h3 mt-12 mb-4">Professional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          <FormField
            name="experience"
            control={control}
            rules={validationRules.experience}
            label="Experience (In Years)"
            type="number"
            required={true}
   
          />
          
          <FormField
            name="noticePeriod"
            control={control}
            rules={validationRules.noticePeriod}
            label="Notice Period (In days)"
            type="number"
            required={true}
     
          />
          
          <FormField
            name="currentCTC"
            control={control}
            label="Current CTC (In LPA)"
            type="number"
            required={false}  
            rules={{
              // No "required" rule here
              validate: (value) => {
                // Optional: If you want to ensure it's a valid number when provided
                if (value && isNaN(value)) {
                  return 'Value must be a valid number.';
                }
                return true;
              },
            }}
          />
          
          <FormField
            name="expectedCTC"
            control={control}
            label="Expected CTC (In LPA)"
            type="number"
            required={false}
            rules={{
              // No "required" rule here
              validate: (value) => {
                // Optional: If you want to ensure it's a valid number when provided
                if (value && isNaN(value)) {
                  return 'Value must be a valid number.';
                }
                return true;
              },
            }}
          />
        </div>
      </div>
    );
  };
  
  // And similarly for personal details:
  export const PersonalDetailsSection = ({ control, onProfilePictureSelect, profilePicturePreview }) => {
    return (
      <div>
        <h3 className="typography-h3 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfilePictureUpload 
          control={control} 
          onFileSelect={onProfilePictureSelect}
          previewUrl={profilePicturePreview}  // Pass the preview URL to ProfilePictureUpload
        />
          {/* This empty div is just for adding vacant space only */}
          <div>
      
          </div>

          <FormField
            name="firstName"
            control={control}
            rules={validationRules.firstName}
            label="First Name"
            required={true}
          />
          
          <FormField
            name="lastName"
            control={control}
            rules={validationRules.lastName}
            label="Last Name"
            required={true}
          />
          
          <FormField
            name="email"
            control={control}
            rules={validationRules.email}
            label="Email"
            type="email"
            required={true}
          />
          
          <FormField
            name="phoneNumber"
            control={control}
            rules={validationRules.phoneNumber}
            label="Phone Number"
            type="number"
            required={true}
          />
        </div>
      </div>
    );
  };