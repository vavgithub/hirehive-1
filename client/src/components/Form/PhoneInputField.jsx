import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default CSS

export const PhoneInputField = ({
  name,
  control,
  rules,
  label,
  required = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={name}
              className="typography-body mb-4"
            >
              {label}
              {required && <span className="text-red-100">*</span>}
            </label>
          )}
          
         <PhoneInput
        country={'us'} // Set the default country code (customize as needed)
        value={value}
        onChange={onChange}
        placeholder={'Enter Phone Number'}
        // Override container styling if necessary
        containerClass="w-full !hover:outline-teal-300 pointer"
        // Customizing the input field with Tailwind CSS classes
        inputClass={`
          w-full 
          p-2 
          pointer
          bg-background-40 
          rounded 
          outline-none 
          hover:bg-background-30
          hover:pointer
           
          ${error ? '!border !border-red-500' : 'border border-transparent'}
        `}
        // Customize the country dropdown button and list
        buttonClass="bg-transparent border-0"
        dropdownClass="rounded shadow-lg bg-white"
        // Optionally enable search functionality in the dropdown
        enableSearch={true}
      />
          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
