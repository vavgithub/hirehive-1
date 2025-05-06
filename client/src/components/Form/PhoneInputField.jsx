import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
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
  const [isInvalid, setIsInvalid] = useState(false);
  const [countryCode, setCountryCode] = useState("in");

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate: (value) => {
          // Check if empty first (if required)
          if (required && (!value || value.trim() === "")) {
            return "Phone number is required";
          }
          
          // If there's a value, validate the phone number format and length
          if (value) {
            try {
              // Add the '+' prefix if not present
              const phoneWithPlus = value.startsWith('+') ? value : `+${value}`;
              
              // Use libphonenumber-js to validate the phone number
              const isValid = isValidPhoneNumber(phoneWithPlus);
              
              if (!isValid) {
                return "Invalid phone number format or length";
              }
            } catch (error) {
              return "Invalid phone number";
            }
          }
          
          return true;
        }
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // Function to handle phone number changes
        const handlePhoneChange = (value, country) => {
          onChange(value);
          setCountryCode(country.iso2);
          
          // Validate length based on country
          try {
            const phoneWithPlus = `+${value}`;
            setIsInvalid(!isValidPhoneNumber(phoneWithPlus));
          } catch (error) {
            setIsInvalid(true);
          }
        };

        return (
          <div className={"flex relative " + (rowWise ? "flex-row justify-between items-center gap-2" : "flex-col")}>
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
              country={countryCode} // Use the current country code
              value={value}
              onChange={handlePhoneChange}
              placeholder={'Enter Phone Number'}
              containerClass={"rounded-xl " + (rowWise ? "min-w-[60%] w-[100%] " : "") + ((error || isInvalid) && "border border-red-500")}
              dropdownClass="scrollbar-hide w-[100%]"
              inputClass="typography-body text-white w-[100%]"
              searchPlaceholder="Search"
              enableSearch={true}
              // Helpful for user feedback during typing, but doesn't replace our validation
              isValid={(inputNumber, country) => {
                if (!inputNumber) return true;
                try {
                  // Do a quick check if the length seems correct
                  // This is just for visual feedback during typing
                  const phoneObj = parsePhoneNumberFromString(`+${inputNumber}`);
                  return phoneObj ? phoneObj.isValid() : true;
                } catch (e) {
                  return true; // Let our validate function handle errors
                }
              }}
            />
            {error && (
              <p className="text-red-500 text-xs font-outfit absolute top-[4.9rem]">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export const formatPhoneNumber = (phoneNumber) => {
  const parsed = parsePhoneNumberFromString('+' + phoneNumber);
  if (!parsed) return phoneNumber;

  return `${parsed.countryCallingCode}-${parsed.nationalNumber}`;
};