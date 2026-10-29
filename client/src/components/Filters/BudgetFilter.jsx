import React, { useState, useEffect } from 'react';
import { Button } from '../Buttons/Button';

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
    <div className=" rounded">
      <div className="mb-geode-4 flex gap-geode-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="typography-small-p text-font-gray">Min Budget</label>
          <div className="geode-affix-field">
            <input
              type="text"
              value={minBudget}
              onChange={handleMinBudgetChange}
              placeholder="0"
              aria-label="Minimum budget"
              className="geode-affix-input"
            />
            <span>LPA</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="typography-small-p text-font-gray">Max Budget</label>
          <div className="geode-affix-field">
            <input
              type="text"
              value={maxBudget}
              onChange={handleMaxBudgetChange}
              placeholder="0"
              aria-label="Maximum budget"
              className="geode-affix-input"
            />
            <span>LPA</span>
          </div>
        </div>
      </div>
      <Button 
        variant="secondary" 
        onClick={handleApply} 
        size="default"
        disabled={minBudget !== '' && maxBudget !== '' && Number(maxBudget) < Number(minBudget)}
        className={'w-full'}
      >
        Apply
      </Button>
    </div>
  );
};

export default BudgetFilter;