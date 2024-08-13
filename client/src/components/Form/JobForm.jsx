// src/components/ui/JobForm.js
import React, { useEffect, useState } from 'react';
import { InputField, CustomDropdown, ExperienceField, BudgetField } from './FormFields';
import SkillsInput from '../utility/SkillsInput';
import { dropdownOptions } from '../Form/dropdownOptions';

const JobForm = ({ 
    formData, 
    handleInputChange, 
    handleExperienceChange, 
    incrementExperience, 
    decrementExperience, 
    setSkills, 
    handleSubmit, 
    isEditing 
  }) => {
    const [dropdownStates, setDropdownStates] = useState({
      workplaceType: false,
      employeeLocation: false,
      employmentType: false,
      jobProfile: false,
    });
  
    useEffect(() => {
      console.log('JobForm received formData:', formData);
    }, [formData]);
  
    const toggleDropdown = (field) => {
      setDropdownStates(prev => ({ ...prev, [field]: !prev[field] }));
    };
  
    const handleOptionClick = (field, option) => {
      handleInputChange({ target: { id: field, value: option.value } });
      toggleDropdown(field);
    };
  
    if (!formData) {
      return <div>Loading form data...</div>;
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="jobTitle"
            label="Job Title"
            value={formData.jobTitle || ''}
            onChange={handleInputChange}
            required
          />
          {Object.keys(dropdownOptions).map((field) => (
            <CustomDropdown
              key={field}
              field={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              options={dropdownOptions[field]}
              value={formData[field] || ''}
              onChange={handleInputChange}
              isOpen={dropdownStates[field]}
              toggleDropdown={() => toggleDropdown(field)}
              handleOptionClick={handleOptionClick}
            />
          ))}
          
          <div>

          </div>
          <ExperienceField
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            incrementExperience={incrementExperience}
            decrementExperience={decrementExperience}
          />
          <BudgetField
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            incrementExperience={incrementExperience}
            decrementExperience={decrementExperience}
          />
          <div className="w-full mb-4">
            <label htmlFor="skills" className="block font-bold mb-2">Skills*</label>
            <SkillsInput skills={formData.skills || []} setSkills={setSkills} />
          </div>
          <div className='w-full'>
            <label htmlFor="jobDescription" className="block font-bold mb-2">Job Description*</label>
            <textarea
              id="jobDescription"
              placeholder="Write a job description"
              className="w-full px-3 py-2 bg-background-40 rounded outline-none focus:outline-teal-300"
              value={formData.jobDescription || ''}
              onChange={handleInputChange}
              required
              rows="10"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {isEditing ? 'Update Job Listing' : 'Create Job Listing'}
          </button>
          {isEditing && formData.status === 'draft' && (
            <button 
              type="button"
              onClick={() => handleSubmit({ ...formData, status: 'active' })}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Make It Active
            </button>
          )}
        </div>
      </form>
    );
  };
  
  export default JobForm;