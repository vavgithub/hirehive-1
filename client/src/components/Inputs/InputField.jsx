import React, { useState } from "react";
import TogglePassword from "../utility/TogglePassword";

export const InputField = React.forwardRef(({ 
  id, 
  type, 
  label, 
  required, 
  extraClass,
  labelStyles,
  placeholder,
  rowWise = false,
  error,
  errorMessage, 
  ...props 
}, ref) => {
  const [passwordType, setPasswordType] = useState('password');

  // Use higher specificity for error border
  const inputClasses = `
    w-full 
    p-2 
    bg-background-40 
    rounded 
    outline-none 
    focus:outline-teal-300
    ${error ? '!border !border-red-500' : 'border border-transparent'} 
    ${extraClass || ''}
  `.trim();

  return (
    <div className={'flex  gap-2 relative ' + (rowWise ? "justify-between items-center" : "flex-col justify-start")}>
      <label htmlFor={id} className={labelStyles + " typography-body "  + (rowWise ? " min-w-[25%] max-w-[25%] " : "")}>
        {label} {required && <span className="text-red-100">*</span>}
      </label>
      {type === "password" ? (
        <TogglePassword typeState={passwordType} setTypeState={setPasswordType}>
          <input
            id={id}
            type={passwordType}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className={(props.value && "tracking-widest ") + " " + inputClasses}
            ref={ref}
            {...props}
          />
        </TogglePassword>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder || `Enter ${label}`}
          className={inputClasses}
          ref={ref}
          {...props}
        />
      )}
      {error && errorMessage && (
        <span className={"text-red-500 typography-small-p  absolute " + (rowWise ? "top-[42px] left-[27%]" : "top-[4.8rem]")}>{errorMessage}</span>
      )}
    </div>
  );
});
InputField.displayName = 'InputField';