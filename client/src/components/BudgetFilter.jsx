import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

const BudgetFilter = ({ onApply, shouldReset }) => {
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  // Reset values when shouldReset changes
  useEffect(() => {
    if (shouldReset) {
      setMinBudget('');
      setMaxBudget('');
      // Notify parent component about the reset
      onApply({ min: '', max: '' });
    }
  }, [shouldReset, onApply]);

  const handleMinBudgetChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setMinBudget(value);
    }
  };

  const handleMaxBudgetChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setMaxBudget(value);
    }
  };

  const handleApply = () => {
    const min = minBudget === '' ? '' : Number(minBudget);
    const max = maxBudget === '' ? '' : Number(maxBudget);

    // Validate that max is greater than or equal to min if both are provided
    if (min !== '' && max !== '' && max < min) {
      console.error('Maximum budget should be greater than minimum budget');
      return;
    }

    onApply({ min, max });
  };

  return (
    <div className="p-2 rounded">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="typography-small-p text-font-gray">Min Budget</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>
            <input
              type="text"
              value={minBudget}
              onChange={handleMinBudgetChange}
              placeholder="0"
              className="w-16 p-2 bg-background-40 text-center no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">LPA</span>
          </div>
        </div>
        <div>
          <label className="typography-small-p text-font-gray">Max Budget</label>
          <div className='flex items-center bg-background-40 rounded-xl rounded-br-xl mt-1'>
            <input
              type="text"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
              placeholder="0"
              className="w-16 p-2 bg-background-40 text-center no-spinner rounded-xl"
            />
            <span className="text-font-gray pr-2">LPA</span>
          </div>
        </div>
      </div>
      <Button 
        variant="secondary" 
        onClick={handleApply} 
        size="default"
        disabled={minBudget !== '' && maxBudget !== '' && Number(maxBudget) < Number(minBudget)}
      >
        Apply
      </Button>
    </div>
  );
};

export default BudgetFilter;