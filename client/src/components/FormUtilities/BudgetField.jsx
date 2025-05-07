import React from "react";
import { NumberInputField } from "../Inputs/NumberInputField";

export const BudgetField = React.forwardRef(({ value, onChange, required, errors, employmentType }, ref) => {
  // Determine if we should show hourly rate instead of annual salary
  // const isHourlyRate = employmentType === 'Part Time' || employmentType === 'Contract';
  const isHourlyRate = employmentType === 'Contract';
  
  // Set the appropriate unit based on employment type
  const unit = isHourlyRate ? 'INR/hr' : 'LPA';
  
  // Field label based on employment type
  const fieldLabel = isHourlyRate ? 'Hourly Rate' : 'Budget';

  return (
    <div className="relative">
      <label className="typography-body">{fieldLabel}{required && <span className="text-red-100">*</span>}</label>
      <div className='flex gap-4'>
        {['from', 'to'].map((label) => (
          <NumberInputField
            key={label}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            value={value[label]}
            onChange={(newValue) => onChange({ ...value, [label]: newValue === "" ? newValue : parseInt(newValue,10) })}
            unit={unit}
            ref={ref}
            required
          />
        ))}
      </div>
      {errors?.budgetTo?.message && <p className="text-red-100 absolute typography-small-p top-[5.75rem]">{errors?.budgetTo?.message}</p>}
    </div>
  );
});