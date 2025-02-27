import React from "react";
import { NumberInputField } from "../Inputs/NumberInputField";

export const BudgetField = React.forwardRef(({ value, onChange , required ,errors}, ref) => (
    <div className="relative">
      <label className="typography-body">Budget{required && <span className="text-red-100">*</span>}</label>
      <div className='flex gap-4'>
        {['from', 'to'].map((label) => (
          <NumberInputField
            key={label}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            value={value[label]}
            onChange={(newValue) => onChange({ ...value, [label]: newValue === "" ? newValue : parseInt(newValue,10) })}
            unit="LPA"
            ref={ref}
            required
          />
        ))}
      </div>
      {errors?.budgetTo?.message && <p className="text-red-100 absolute typography-small-p top-[92px]">{errors?.budgetTo?.message}</p>}
    </div>
  ));