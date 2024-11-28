import React, { useEffect, useRef, useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import Filter from '../../svg/Buttons/Filter';
import { fetchAvailableDesignReviewers } from '../../api/authApi';

const ArrowIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
  >
    <path d="M8 20L16 12L8 4" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterForDataTable = ({ onApplyFilters ,readOnly}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState({
    stage: [],
    status: [],
    experience: '',
    rating: [],
    assignee: [],
  });

  const [showDropdown, setShowDropdown] = useState({
    stage: false,
    status: false,
    experience: false,
    budget: false,
    rating: false,
    assignee: false,
  });

  const [designReviewers, setDesignReviewers] = useState([]);

  // Updated formatSelectedValues to return an object with value and className
  const formatSelectedValues = (category, values) => {
    if (!values || values.length === 0) {
      return {
        value: 'All',
        className: 'text-white typography-body' // lighter gray for 'All'
      };
    }

    if (category === 'experience' && values) {
      return {
        value: values,
        className: 'text-blue-400 typography-body' // blue color for experience values
      };
    }

    if (values.length === 1) {
      return {
        value: values[0],
        className: 'text-white typography-body' // white for single selected value
      };
    }

    return {
      value: (
        <>
          <span className="text-white">{values[0]} </span> + {values.length - 1} more
        </>
      ),
      className: 'text-font-gray typography-body whitespace-nowrap text-ellipsis overflow-hidden' // white for multiple selected values
    };
  };

  useEffect(() => {
    const loadDesignReviewers = async () => {
      try {
        const managers = await fetchAvailableDesignReviewers();
        setDesignReviewers(managers);
      } catch (error) {
        console.error('Error fetching hiring managers:', error);
      }
    };
    loadDesignReviewers();
  }, []);

  const stageStatusMap = {
    Portfolio: ['Not Assigned', 'Under Review', 'Completed', 'Rejected'],
    Screening: ['Call Pending', 'Call Scheduled', 'Under Review', 'Completed', 'No Show', 'Rejected'],
    'Design Task': ['Sent', 'Not Assigned', 'Under Review', 'Completed', 'Rejected', 'Not Submitted'],
    'Round 1': ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
    'Round 2': ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
  };

  const allStatuses = [
    'Not Assigned',
    'Under Review',
    'Completed',
    'Rejected',
    'Call Pending',
    'Call Scheduled',
    'No Show',
    'Sent',
    'Not Submitted'
  ]
  

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleStageSelect = (value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      stage: prev.stage.includes(value)
        ? prev.stage.filter((item) => item !== value)
        : [...prev.stage, value],
      status: [],
    }));
  };

  const handleExperienceApply = (min, max) => {
    setSelectedFilters((prev) => ({
      ...prev,
      experience: `${min}-${max} yrs`
    }));
    setShowDropdown((prev) => ({
      ...prev,
      experience: false
    }));
  };

  const handleDropdown = (category) => {
    setShowDropdown({
      stage: false,
      status: false,
      experience: false,
      budget: false,
      rating: false,
      assignee: false,
      [category]: !showDropdown[category],
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setShowDropdown({
      stage: false,
      status: false,
      experience: false,
      budget: false,
      rating: false,
      assignee: false,
    });
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = {
    stage: ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2', 'Hired'],
    status: selectedFilters.stage.length === 1 ? stageStatusMap[selectedFilters.stage[0]] : allStatuses,
    rating: ['Good Fit', 'Not A Good Fit', 'May Be'],
    ...(!readOnly && {assignee: designReviewers.map(reviewer => reviewer)}),
  };

  useEffect(() => {
    onApplyFilters(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="cursor-pointer gap-2 text-font-gray flex typography-body" onClick={(e) => toggleMenu(e)}>
        <Filter /> Filter
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-[290px] max-w-[19rem] bg-background-40 px-6 py-4 rounded-xl flex flex-col gap-4 shadow-[2px_4px_30px_rgba(0,0,0,0.3)]">
          {Object.keys(categories).map((category) => (
            <div key={category} className="w-full">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => handleDropdown(category)}>
                <div className="flex gap-2 w-[90%] ">
                  <span className="capitalize text-gray-400">
                    {category}:
                  </span>
                  <span className={formatSelectedValues(category, selectedFilters[category]).className}>
                    {formatSelectedValues(category,category === 'assignee' ? selectedFilters[category].map(each=>each.name)  : selectedFilters[category]).value}
                  </span>
                </div>
                <ArrowIcon isOpen={showDropdown[category]} />
              </div>
              {showDropdown[category] && (
                category === 'experience' ? (
                  <ExperienceFilter onApply={handleExperienceApply} />
                ) : (
                  <div className="px-6 py-4 rounded-xl absolute typography-body left-64 bg-background-40 w-max flex flex-col gap-4 shadow-[2px_4px_30px_rgba(0,0,0,0.3)]">
                    {categories[category].map((item) => (
                      <label key={category === 'assignee' ? item._id :item} className="flex items-center text-white">
                        <input
                          type="checkbox"
                          checked={category === 'assignee' ? selectedFilters[category].find(each=>each.name === item.name) ?? "" :selectedFilters[category].includes(item)}
                          onChange={() => category === 'stage' ? handleStageSelect(item) : handleSelect(category, item)}
                          className="mr-2"
                        />
                        {category === 'assignee' ? item.name :item}
                      </label>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterForDataTable;