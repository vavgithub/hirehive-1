import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons/Button';

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
    <div className=" rounded">
      <div className="mb-geode-4 flex gap-geode-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="typography-small-p text-font-gray">Min Experience</label>
          <div className="geode-affix-field">
            <input
              type="text"
              value={minExperience}
              onChange={handleMinExperienceChange}
              placeholder="0"
              aria-label="Minimum experience"
              className="geode-affix-input"
            />
            <span>yrs</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="typography-small-p text-font-gray">Max Experience</label>
          <div className="geode-affix-field">
            <input
              type="text"
              value={maxExperience}
              onChange={handleMaxExperienceChange}
              placeholder="0"
              aria-label="Maximum experience"
              className="geode-affix-input"
            />
            <span>yrs</span>
          </div>
        </div>
      </div>
      <Button 
        variant="secondary" 
        onClick={handleApply} 
        size="default"
        disabled={minExperience !== '' && maxExperience !== '' && Number(maxExperience) < Number(minExperience)}
        className={'w-full'}
      >
        Apply
      </Button>
    </div>
  );
};

export default ExperienceFilter;