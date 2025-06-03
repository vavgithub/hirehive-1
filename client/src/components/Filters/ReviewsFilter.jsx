import React, { useEffect, useRef, useState } from 'react';
import IconWrapper from '../Cards/IconWrapper';
import { SlidersHorizontal, Trash } from 'lucide-react';
import TickCheckbox from '../Checkboxes/TickCheckbox';
import { JOB_PROFILES } from '../../config/jobprofile.config';

const ArrowIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
  >
    <path d="M8 20L16 12L8 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReviewsFilter = ({ onApplyFilters, candidates = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const firstRenderRef = useRef(true);

  const [selectedFilters, setSelectedFilters] = useState({
    jobName: [],
    stage: [],
    "job Type": [],
    "job Profile": [],
  });

  const [showDropdown, setShowDropdown] = useState({
    jobName: false,
    stage: false,
    "job Type": false,
    "job Profile": false,
  });

  // Extract unique job names and stages from candidates data
  const getUniqueJobNames = () => {
    const jobNames = new Set();
    candidates.forEach(candidate => {
      candidate.jobApplications?.filter(app => app.currentStage !== "Hired").forEach(application => {
        if (application.jobTitle) {
          jobNames.add(application.jobTitle);
        }
      });
    });
    return Array.from(jobNames).sort();
  };

  const getUniqueStages = () => {
    const stages = new Set();
    candidates.forEach(candidate => {
      candidate.jobApplications?.forEach(application => {
        if (application.currentStage && application.currentStage !== "Hired") {
          stages.add(application.currentStage);
        }
      });
    });
    return Array.from(stages).sort();
  };

  // Updated formatSelectedValues to return an object with value and className
  const formatSelectedValues = (category, values) => {
    if (!values || values.length === 0) {
      return {
        value: 'All',
        className: 'text-font-main typography-body group-hover:text-accent-100'
      };
    }

    if (values.length === 1) {
      return {
        value: values[0],
        className: 'typography-body text-accent-100'
      };
    }

    return {
      value: (
        <>
          <span className="text-accent-100">{values[0]} </span> + {values.length - 1} more
        </>
      ),
      className: 'text-font-gray typography-body whitespace-nowrap text-ellipsis overflow-hidden'
    };
  };

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleDropdown = (category) => {
    setShowDropdown({
      jobName: false,
      stage: false,
      "job Type": false,
      "job Profile": false,
      [category]: !showDropdown[category],
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setShowDropdown({
      jobName: false,
      stage: false,
      "job Type": false,
      "job Profile": false,
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({
      jobName: [],
      stage: [],
      "job Type": [],
      "job Profile": []
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
    "job Profile": Object.values(JOB_PROFILES),
    jobName: getUniqueJobNames(),
    stage: getUniqueStages(),
    "job Type" : ["Full Time", "Part Time", "Contract", "Internship"],
  };

  // Apply filters whenever selectedFilters changes
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      onApplyFilters(selectedFilters);
    }
  }, [selectedFilters, onApplyFilters]);

  // Check if any filters are applied
  const hasActiveFilters = Object.values(selectedFilters).some(filter => 
    Array.isArray(filter) && filter.length > 0
  );

  return (
    <div className="relative" ref={menuRef}>
      <div 
        className={"cursor-pointer gap-2 flex items-center typography-body hover:bg-background-60 hover:text-accent-100 rounded-xl p-2 text-font-gray"} 
        onClick={(e) => toggleMenu(e)}
      >
        <IconWrapper inheritColor={true} size={0} customIconSize={4} customStrokeWidth={5} icon={SlidersHorizontal} />
        Filter {hasActiveFilters && <span className='w-2 h-2 rounded-full my-auto bg-red-40'></span>}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 p-2 w-[18rem] max-w-[19rem] bg-background-80 rounded-xl flex flex-col gap-2 shadow-[5px_5px_50px_rgba(0,0,0,0.9)]">
          {hasActiveFilters && (
            <p 
              onClick={handleClearAll} 
              className='cursor-pointer flex gap-2 items-center text-accent-red justify-end w-full typography-body pr-4 pt-2'
            >
              <IconWrapper icon={Trash} size={0} inheritColor />
              Clear All
            </p>
          )}
          
          {Object.keys(categories).map((category) => (
            <div key={category} className="w-full">
              <div 
                className={"flex justify-between group h-10 hover:bg-background-60 p-4 rounded-xl items-center cursor-pointer " + 
                  (selectedFilters[category]?.length > 0 ? "text-accent-100 bg-accent-300 " : "text-font-gray")} 
                onClick={() => handleDropdown(category)}
              >
                <div className="flex gap-2 w-[90%]">
                  <span className="typography-body capitalize whitespace-nowrap">
                    {category === 'jobName' ? 'Job Name' : category}:
                  </span>
                  <span className={formatSelectedValues(category, selectedFilters[category]).className}>
                    {formatSelectedValues(category, selectedFilters[category]).value}
                  </span>
                </div>
                <div className='group-hover:text-accent-100'>
                  <ArrowIcon isOpen={showDropdown[category]} />
                </div>
              </div>
              
              {showDropdown[category] && (
                <div className="p-2 rounded-xl absolute typography-body left-[18.5rem] min-w-[15.625rem] bg-background-80 w-max flex gap-2 flex-col" 
                     style={{ boxShadow: "5px 5px 50px rgba(0,0,0,0.9)" }}>
                  {categories[category].map((item) => (
                    <label 
                      key={item} 
                      className={"group relative flex items-center p-4 h-10 hover:bg-background-60 cursor-pointer hover:text-accent-100 rounded-xl " + 
                        (selectedFilters[category].includes(item) ? "bg-accent-300 text-accent-100 " : "text-font-main")}
                    >
                      <TickCheckbox
                        id={`${category}-${item}`}
                        checked={selectedFilters[category].includes(item)}
                        onChange={() => handleSelect(category, item)}
                        labelClassName=""
                      />
                      <span className="ml-2">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsFilter;