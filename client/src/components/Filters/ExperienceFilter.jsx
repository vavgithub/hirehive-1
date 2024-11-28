import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

const ExperienceFilter = ({ onApply, shouldReset }) => {
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');

  // Reset the values when shouldReset changes
  useEffect(() => {
    if (shouldReset) {
      setMinExperience('');
      setMaxExperience('');
      // Notify parent component about the reset
      onApply({ min: '', max: '' });
    }
  }, [shouldReset, onApply]);

  const handleMinExperienceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setMinExperience(value);
    }
  };

  const handleMaxExperienceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setMaxExperience(value);
    }
  };

  const handleApply = () => {
    const min = minExperience === '' ? '' : Number(minExperience);
    const max = maxExperience === '' ? '' : Number(maxExperience);

    // Validate that max is greater than or equal to min if both are provided
    if (min !== '' && max !== '' && max < min) {
      console.error('Maximum experience should be greater than minimum experience');
      return;
    }

    onApply({ min, max });
  };

  return (
    <div className="p-2 rounded">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="typography-small-p text-font-gray">Min Experience</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>
            <input
              type="text"
              value={minExperience}
              onChange={handleMinExperienceChange}
              placeholder="0"
              className="w-16 p-2 bg-background-40 text-left no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">Years</span>
          </div>
        </div>
        <div>
          <label className="typography-small-p text-font-gray">Max Experience</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>
            <input
              type="text"
              value={maxExperience}
              onChange={handleMaxExperienceChange}
              placeholder="0"
              className="w-16 p-2 bg-background-40 text-left no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">Years</span>
          </div>
        </div>
      </div>
      <Button 
        variant="secondary" 
        onClick={handleApply} 
        size="default"
        disabled={minExperience !== '' && maxExperience !== '' && Number(maxExperience) < Number(minExperience)}
      >
        Apply
      </Button>
    </div>
  );
};

export default ExperienceFilter;