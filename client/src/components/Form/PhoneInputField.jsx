import React, { useRef, useState } from "react";
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
  const internalErrorRef = useRef(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{...rules,
        validate : () => {
          return internalErrorRef.current ? "Invalid Phone Number" : true
        }
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col relative">
          {label && (
            <label
              htmlFor={name}
              className="typography-body mb-2"
            >
              {label}
              {required && <span className="text-red-100">*</span>}
            </label>
          )}
         <PhoneInput
         //All styles are in index.css file 
          country="in" // Set the default country code (customize as needed)
          value={value}
          onChange={onChange}
          placeholder={'Enter Phone Number'}
          containerClass={"rounded-xl " + (error && "border border-red-500")}
          dropdownClass=" scrollbar-hide "
          inputClass="typography-body text-white "
          searchPlaceholder="Search"
          // Optionally enable search functionality in the dropdown
          enableSearch={true}
          // isValid={(value, country,countries,what) => {
          //   const validCountryLength = country?.format.replace(/[^.]/g, "").length;
          //   const valueLength = value?.length;
          //   internalErrorRef.current = validCountryLength !== valueLength
          //   return true
          // }}

        />
          {error && (
            <p className="text-red-500 text-xs font-outfit absolute top-[4.9rem]">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
