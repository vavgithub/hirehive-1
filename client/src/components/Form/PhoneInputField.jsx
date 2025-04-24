import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import "react-phone-input-2/lib/style.css"; // Import default CSS

export const PhoneInputField = ({
  name,
  control,
  rules,
  label,
  rowWise = false,
  required = false,
  ...props
}) => {
  const internalErrorRef = useRef(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{...rules,
        // validate : () => {
        //   return internalErrorRef.current ? "Invalid Phone Number" : true
        // }
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={"flex  relative " + (rowWise ? "flex-row justify-between items-center gap-2" : "flex-col")}>
          {label && (
            <label
              htmlFor={name}
              className={"typography-body mb-2 w-fit whitespace-nowrap " + (rowWise ? " min-w-[25%] max-w-[25%] text-font-gray" : "")}
            >
              {label}
              {required && <span className="text-red-100">*</span>}
            </label>
          )}
         <PhoneInput
         //All styles are in index.css file 
          country="in" // Set the default country code (customize as needed)
          value={value}
          onChange={
            (phone) => {
              // Make sure it's in +E.164 format
              onChange(phone.startsWith('+') ? phone : `+${phone}`);
            }}
          placeholder={'Enter Phone Number'}
          containerClass={"rounded-xl " + (rowWise ? "  min-w-[60%] w-[100%] " : "")  + (error && "border border-red-500")}
          dropdownClass=" scrollbar-hide w-[100%]"
          inputClass="typography-body text-white w-[100%]"
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


export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;

  // Ensure number starts with '+'
  const normalized = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber;

  const parsed = parsePhoneNumberFromString(normalized);
  if (!parsed) return phoneNumber; // fallback to raw if parsing fails

  return `+${parsed.countryCallingCode}-${parsed.nationalNumber}`;
};