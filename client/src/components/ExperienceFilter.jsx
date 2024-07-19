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
          <label className="">Min Experience</label>
          <input
            type="number"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            className="w-16 p-2 text-center rounded"
          />
          <span className=""> yr</span>
        </div>
        <div>
          <label className="">Max Experience</label>
          <input
            type="number"
            value={maxExperience}
            onChange={(e) => setMaxExperience(e.target.value)}
            className="w-16 p-2 text-center rounded"
          />
          <span className=""> yr</span>
        </div>
      </div>
      {/* <button
        onClick={handleApply}
        className="w-full p-2 text-white bg-blue-500 rounded"
        
      >
        Apply
      </button> */}
      <Button variant="secondary" onClick={handleApply} size="default">
        Apply
      </Button>
    </div>
  );
};

export default ExperienceFilter;