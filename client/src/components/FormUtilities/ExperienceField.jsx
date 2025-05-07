import React from "react";
import { NumberInputField } from "../Inputs/NumberInputField";

export const ExperienceField = React.forwardRef(({ value, onChange ,required ,errors }, ref) => (
  <div className="relative">
    <label className="typography-body">Experience{required && <span className="text-red-100">*</span>}</label>
    <div className='flex gap-4'>
      {['from', 'to'].map((label) => (
        <NumberInputField
          key={label}
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          value={value[label]}
          onChange={(newValue) => onChange({ ...value, [label]: newValue })}
          unit="yrs"
          ref={ref}
          required
        />
      ))}
    </div>
    {errors?.experienceTo?.message && <p className="text-red-500 absolute typography-small-p top-[5.75rem]">{errors?.experienceTo?.message}</p>}
  </div>
));