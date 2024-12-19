import React from 'react';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/FormFields';
import { validationRules } from '../../utility/validationRules';

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

  export const ResumePortfolioSection = ({ control }) => {
    return (
      <div>
        <h3 className="typography-h3 mt-8 mb-4">Resume & Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <h3 className="typography-h3 mt-8 mb-4">Professional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
            rules={validationRules.currentCTC}
            label="Current CTC (In LPA)"
            type="number"
            required={true}
  
          />
          
          <FormField
            name="expectedCTC"
            control={control}
            rules={validationRules.expectedCTC}
            label="Expected CTC (In LPA)"
            type="number"
            required={true}
          />
        </div>
      </div>
    );
  };
  
  // And similarly for personal details:
  export const PersonalDetailsSection = ({ control }) => {
    return (
      <div>
        <h3 className="typography-h3 mt-8 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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