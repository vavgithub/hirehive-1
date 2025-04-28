import { Controller } from "react-hook-form";
import { InputField } from "./FormFields";

// Reusable form field component
export const FormField = ({ 
    name,
    control,
    rules,
    label,
    rowWise = false,
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
            rowWise={rowWise}
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