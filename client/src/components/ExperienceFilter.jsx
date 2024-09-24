import React, { useState } from 'react';
import { Button } from './ui/Button';

const ExperienceFilter = ({ onApply }) => {
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');

  const handleApply = () => {
    onApply({ min: minExperience, max: maxExperience });
  };

  return (
    <div className="p-2 rounded">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="typography-small-p text-font-gray">Min Experience</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>

            <input

              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-16 p-2 bg-background-40 text-center no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">Years</span>
          </div>
        </div>
        <div>
          <label className="typography-small-p text-font-gray">Max Experience</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>

            <input

              value={maxExperience}
              onChange={(e) => setMaxExperience(e.target.value)}
              className="w-16 p-2 bg-background-40 text-center no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">Years</span>
          </div>
        </div>
      </div>
      <Button variant="secondary" onClick={handleApply} size="default">
        Apply
      </Button>
    </div>
  );
};

export default ExperienceFilter;