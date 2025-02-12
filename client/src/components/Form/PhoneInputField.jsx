import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const PhoneInputField = ({
  name,
  control,
  rules,
  label,
  required = false,
  ...props
}) => {
  const [selectedCountry, setSelectedCountry] = useState("in");
  const [touched, setTouched] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        required: required ? "Phone Number is required" : false,
        validate: (value) => {
          // If the field is required and empty
          if (required && (!value || value.trim() === "")) {
            return "Phone Number is required";
          }

          // If there's a value, validate its format
          if (value) {
            // Remove the country code from the value
            const numberWithoutCountry = value.substring(selectedCountry.length);
            
            // Get expected length for the current country
            const expectedLength = {
              in: 10, // India
              us: 10, // United States
              gb: 10, // United Kingdom
              au: 9,  // Australia
              ca: 10, // Canada
              de: 11, // Germany
              fr: 9,  // France
              it: 10, // Italy
              jp: 10, // Japan
              es: 9,  // Spain
              ch: 9,  // Switzerland
              nl: 9,  // Netherlands
              se: 9,  // Sweden
              dk: 8,  // Denmark
              no: 8,  // Norway
              sg: 8,  // Singapore
              nz: 9,  // New Zealand
              ru: 10, // Russia
              br: 11, // Brazil
              mx: 10, // Mexico
              za: 9,  // South Africa
              ae: 9,  // UAE
              sa: 9,  // Saudi Arabia
              // Add more countries as needed
            }[selectedCountry] || 10;

            // Check if the number (without country code) matches expected length
            if (numberWithoutCountry.length !== expectedLength) {
              return `Phone number must be ${expectedLength} digits for the ${selectedCountry}`;
            }
          }

          return true;
        }
      }}
      render={({ field: { onChange, value, onBlur }, fieldState: { error, submitCount } }) => (
        <div className="flex flex-col relative">
          {label && (
            <label htmlFor={name} className="typography-body mb-2">
              {label}
              {required && <span className="text-red-100">*</span>}
            </label>
          )}
          <PhoneInput
            country="in"
            value={value}
            onChange={(val, country) => {
              setSelectedCountry(country.countryCode);
              onChange(val);
              setTouched(true);
            }}
            onBlur={() => {
              onBlur();
              setTouched(true);
            }}
            placeholder="Enter Phone Number"
            containerClass={"rounded-xl " + (error && "border border-red-500")}
            dropdownClass="scrollbar-hide"
            inputClass="typography-body text-white"
            searchPlaceholder="Search"
            enableSearch={true}
            {...props}
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