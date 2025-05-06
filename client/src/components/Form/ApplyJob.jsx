// ApplyJob.jsx this is the component of every form field in the apply job page
import React from 'react';
import { validationRules } from '../../utility/validationRules';
import { ProfilePictureUpload } from '../FormUtilities/ProfilePictureUpload';
import { PhoneInputField } from './PhoneInputField';
import { InputField } from '../Inputs/InputField';

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
// Updated ProfessionalDetailsSection to handle employment type conditionally
  export const ProfessionalDetailsSection = ({ control, jobDetails }) => {
    // Check if job is part-time or contract to determine compensation field type
    const isHourlyRateJob = jobDetails?.employmentType === 'Part Time' || jobDetails?.employmentType === 'Contract';
    
    return (
      <div>
        <h3 className="typography-h3 mt-12 mb-4">Professional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          {/* Conditional rendering based on employment type */}
          {isHourlyRateJob ? (
            <FormField
              name="hourlyRate"
              control={control}
              label="Hourly Rate (INR/hr)"
              type="number"
              required={true}
              rules={{
                required: "Hourly rate is required",
                validate: (value) => {
                  if (isNaN(value)) {
                    return 'Value must be a valid number.';
                  }
                  return true;
                },
              }}
            />
          ) : (
            <>
              <FormField
                name="currentCTC"
                control={control}
                label="Current CTC (In LPA)"
                type="number"
                required={true}
                rules={validationRules.currentCTC}
              />              
              <FormField
                name="expectedCTC"
                control={control}
                label="Expected CTC (In LPA)"
                type="number"
                required={true}
                rules={validationRules.expectedCTC}
              />
            </>
          )}
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
          
          {/* Replace your normal phone number FormField with the new PhoneInputField */}
        <PhoneInputField
          name="phoneNumber"
          rules={validationRules?.phoneNumber}
          control={control}
          label="Phone Number"
          required
        />
        </div>
      </div>
    );
  };