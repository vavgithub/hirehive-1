import React, { useState } from 'react'

const ExperienceFilter = ({ onApply }) => {
    const [minExperience, setMinExperience] = useState('');
    const [maxExperience, setMaxExperience] = useState('');
  
    const handleApply = () => {
      onApply(minExperience, maxExperience);
    };
  
    return (
      <div className="absolute left-44 p-2 bg-slate-800 rounded">
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="text-white">Min Experience</label>
            <input
              type="number"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              className="w-16 p-2 text-center text-white bg-slate-600 rounded"
            />
            <span className="text-white"> yr</span>
          </div>
          <div>
            <label className="text-white">Max Experience</label>
            <input
              type="number"
              value={maxExperience}
              onChange={(e) => setMaxExperience(e.target.value)}
              className="w-16 p-2 text-center text-white bg-slate-600 rounded"
            />
            <span className="text-white"> yr</span>
          </div>
        </div>
        <button
          onClick={handleApply}
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Apply
        </button>
      </div>
    );
  };

export default ExperienceFilter