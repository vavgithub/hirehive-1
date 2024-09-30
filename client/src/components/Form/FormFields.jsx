import React, { useState } from "react";

export const InputField = React.forwardRef(({ id, type , label, required,extraClass, ...props }, ref) => (
  <div className='space-y-1 flex flex-col gap-1'>
    <label htmlFor={id} className="typography-body">{label}{required && <span className="text-red-100">*</span>}</label>
    <input
      id={id}
      type={type}
      placeholder={`Enter ${label.toLowerCase()}`}
      className={extraClass}
      ref={ref}
      {...props}
    />
  </div>
));

export const CustomDropdown = React.forwardRef(({ field, label, options, value, onChange, required }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1 flex flex-col gap-1">
      <label className="typography-body">{label}{required && <span className="text-red-100">*</span>}</label>
      <div className="relative focus:outline focus:outline-teal-400">
        <button
          type="button"
          onClick={toggleDropdown}
          className="mt-1 h-[44px] bg-background-40 block text-font-gray w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
          ref={ref}
        >
          {options.find(opt => opt.value === value)?.label || '-Select-'}
        </button>
        {isOpen && (
          <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer px-4 py-2 hover:bg-background-60"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export const ExperienceField = React.forwardRef(({ value, onChange ,required }, ref) => (
  <div>
    <label className="typography-body">Experience{required && <span className="text-red-100">*</span>}</label>
    <div className='flex gap-2'>
      {['from', 'to'].map((label) => (
        <NumberInputField
          key={label}
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          value={value[label]}
          onChange={(newValue) => onChange({ ...value, [label]: newValue })}
          unit="Yrs"
          ref={ref}
          required
        />
      ))}
    </div>
  </div>
));

export const BudgetField = React.forwardRef(({ value, onChange , required }, ref) => (
  <div>
    <label className="typography-body">Budget{required && <span className="text-red-100">*</span>}</label>
    <div className='flex gap-2'>
      {['from', 'to'].map((label) => (
        <NumberInputField
          key={label}
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          value={value[label]}
          onChange={(newValue) => onChange({ ...value, [label]: newValue })}
          unit="Lpa"
          ref={ref}
          required
        />
      ))}
    </div>
  </div>
));

export const NumberInputField = React.forwardRef(({ label , value, onChange, unit }, ref) => {
  const handleIncrement = () => onChange(parseInt(value, 10) + 1);
  const handleDecrement = () => onChange(Math.max(0, parseInt(value, 10) - 1));

  return (
    <div className='w-1/2'>
      <span className='typography-small-p text-font-gray'>{label}</span>
      <div className='items-center flex bg-background-40 rounded-xl'>
        <input
          type="number"
          placeholder='-Select-'
          className='outline-none no-spinner w-full p-2 pl-4'
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
        />
        <div className='flex gap-2 items-center pr-4'>
          <p className='typography-body text-font-gray'> {unit}</p>
          <button type="button" onClick={handleDecrement}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={handleIncrement}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});