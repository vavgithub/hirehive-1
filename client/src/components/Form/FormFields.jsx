// src/components/ui/FormFields.js
import React from "react";

export const InputField = React.memo(({ id, label, value, onChange, required }) => (
  <div className='space-y-1 flex flex-col gap-1'>
    <label className="typography-body">{label}{required && <span className="text-red-100">*</span>}</label>
    <input
      id={id}
      type="text"
      placeholder={`Enter ${label.toLowerCase()}`}
      className='w-full ring-teal-300 focus:outline-teal-500 outline-1  p-2 rounded-xl pl-4 mt-4'
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
));

export const CustomDropdown = React.memo(({ field, label, options, value, onChange, isOpen, toggleDropdown, handleOptionClick }) => (
  <div className="space-y-1 flex flex-col gap-1">
    <label className="typography-body">{label}*</label>
    <div className="relative focus:outline focus:outline-teal-400">
      <button
        type="button"
        onClick={() => toggleDropdown(field)}
        className="mt-1 h-[44px] bg-background-40 block text-font-gray w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4"
      >
        {options.find(opt => opt.value === value)?.label || '-Select-'}
      </button>
      {isOpen && (
        <ul className="absolute mt-1 bg-background-40 rounded-md shadow-lg w-full space-y-2 z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(field, option)}
              className="cursor-pointer px-4 py-2 hover:bg-background-60"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
));

export const ExperienceField = React.memo(({ formData, handleExperienceChange, incrementExperience, decrementExperience }) => (
  <div>
    <label className="typography-body">Experience*</label>
    <div className='flex gap-2'>
      {['From', 'To'].map((label) => (
        <NumberInputField
          key={label}
          label={label}
          value={formData[`experience${label}`]}
          onChange={(value) => handleExperienceChange(`experience${label}`, value)}
          onIncrement={() => incrementExperience(`experience${label}`)}
          onDecrement={() => decrementExperience(`experience${label}`)}
          unit="Yrs"
        />
      ))}
    </div>
  </div>
));

export const BudgetField = React.memo(({ formData, handleExperienceChange, incrementExperience, decrementExperience }) => (
  <div>
    <label className="typography-body">Budget*</label>
    <div className='flex gap-2'>
      {['From', 'To'].map((label) => (
        <NumberInputField
          key={label}
          label={label}
          value={formData[`budget${label}`]}
          onChange={(value) => handleExperienceChange(`budget${label}`, value)}
          onIncrement={() => incrementExperience(`budget${label}`)}
          onDecrement={() => decrementExperience(`budget${label}`)}
          unit="Lpa"
        />
      ))}
    </div>
  </div>
));

export const NumberInputField = React.memo(({ label, value, onChange, onIncrement, onDecrement, unit }) => (
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
      />
      <div className='flex gap-2 items-center pr-4'>
        <p className='typography-body text-font-gray'> {unit}</p>
        <button type="button" onClick={onDecrement}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M5 12.5H19" stroke="#808389" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" onClick={onIncrement}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
));