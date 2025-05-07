import React, { useEffect, useRef, useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import { fetchAllDesignReviewers, fetchAvailableDesignReviewers } from '../../api/authApi';
import { useQuery } from '@tanstack/react-query';
import ScoreFilter, { MAX_SCORE, MIN_SCORE } from './ScoreFilter';
import IconWrapper from '../Cards/IconWrapper';
import { SlidersHorizontal, Trash } from 'lucide-react';
import TickCheckbox from '../Checkboxes/TickCheckbox';
import { allStatuses, stageStatusMap } from './config.filter';

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


const FilterForDataTable = ({ onApplyFilters, readOnly, preservedFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const firstRenderRef = useRef(true);

  const [selectedFilters, setSelectedFilters] = useState(preservedFilters ? preservedFilters : {
    stage: [],
    status: [],
    experience: '',
    rating: [],
    assessment: [],
    score: "",
    assignee: [],
    "job Type": []
  });

  const [showDropdown, setShowDropdown] = useState({
    stage: false,
    status: false,
    experience: false,
    budget: false,
    rating: false,
    assessment: false,
    score: false,
    assignee: false,
    "job Type": false
  });

  const [designReviewers, setDesignReviewers] = useState([]);

  useEffect(() => {
    setSelectedFilters(preservedFilters)
  }, [preservedFilters]);

  // Updated formatSelectedValues to return an object with value and className
  const formatSelectedValues = (category, values) => {
    if (!values || values.length === 0) {
      return {
        value: 'All',
        className: 'text-white typography-body group-hover:text-accent-100' // lighter gray for 'All'
      };
    }

    if (category === 'experience' && values) {
      return {
        value: values,
        className: 'text-blue-400 typography-body' // blue color for experience values
      };
    }

    if (category === 'score' && values) {
      return {
        value: !values ? "All" : `${values}`,
        className: 'text-white typography-body group-hover:text-accent-100' // lighter gray for 'All'
      };
    }

    if (values.length === 1) {
      return {
        value: values[0],
        className: ' typography-body text-accent-100' // white for single selected value
      };
    }

    return {
      value: (
        <>
          <span className="text-accent-100">{values[0]} </span> + {values.length - 1} more
        </>
      ),
      className: 'text-font-gray typography-body whitespace-nowrap text-ellipsis overflow-hidden' // white for multiple selected values
    };
  };

  const { data: allDesignReviewers, isLoading: reviewersLoading } = useQuery({
    queryKey: ['getAllDesignReviewers'],
    queryFn: () => fetchAllDesignReviewers(),
  });

  useEffect(() => {
    if (allDesignReviewers && allDesignReviewers?.data?.length > 0) {
      setDesignReviewers(allDesignReviewers?.data)
    } else {
      setDesignReviewers([])
    }
  }, [allDesignReviewers]);

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

  const handleScoreChange = (scoreObj) => {
    setSelectedFilters((prev) => ({
      ...prev,
      score: `${(scoreObj?.min && !isNaN(scoreObj?.min)) ? scoreObj?.min : MIN_SCORE} - ${(scoreObj?.max && !isNaN(scoreObj?.max)) ? scoreObj?.max : MAX_SCORE}`
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
      assessment: false,
      "job Type": false,
      score: false,
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
      assessment: false,
      score: false,
      "job Type": false
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({
      stage: [],
      status: [],
      experience: '',
      rating: [],
      assessment: [],
      score: "",
      assignee: [],
      "job Type": []
    })
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
    ...(readOnly && { "job Type": ["Full Time", "Part Time", "Contract", "Internship"] }),
    assessment: ["Completed", "Not Completed"],
    ...(!readOnly && { assignee: designReviewers.map(reviewer => reviewer) }),
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
    } else {
      onApplyFilters(selectedFilters);
    }
  }, [selectedFilters]);

  return (
    <div className="relative" ref={menuRef}>
      <div className={"cursor-pointer gap-2 flex typography-body hover:bg-background-60 hover:text-accent-100 rounded-xl p-2 text-font-gray"} onClick={(e) => toggleMenu(e)}>
        <IconWrapper inheritColor={true} size={0} customIconSize={4} customStrokeWidth={5} icon={SlidersHorizontal} />
        Filter {Object.values(selectedFilters).map((filter) => Array.isArray(filter) ? filter : !filter ? [] : [filter]).flat()?.length > 0 && <span className='w-2 h-2 rounded-full my-auto bg-red-40'></span>}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 p-2 w-[18rem] max-w-[19rem] bg-background-40 rounded-xl flex flex-col gap-2 shadow-[5px_5px_50px_rgba(0,0,0,0.9)]">
          {Object.values(selectedFilters).map((filter) => Array.isArray(filter) ? filter : !filter ? [] : [filter]).flat()?.length > 0 && <p onClick={handleClearAll} className='cursor-pointer flex gap-2 items-center text-accent-red justify-end w-full typography-body pr-4 pt-2'><IconWrapper icon={Trash} size={0} inheritColor></IconWrapper> Clear All</p>}
          {Object.keys(categories).map((category) => (
            <div key={category} className="w-full">
              <div className={"flex justify-between group h-10 hover:bg-background-60 p-4 rounded-xl items-center cursor-pointer " + (selectedFilters[category]?.length > 0 ? "text-accent-100 bg-accent-300 " : "text-font-gray")} onClick={() => handleDropdown(category)}>
                <div className="flex gap-2 w-[90%] ">
                  <span className="typography-body capitalize">
                    {category}:
                  </span>
                  <span className={formatSelectedValues(category, selectedFilters[category]).className}>
                    {formatSelectedValues(category, category === 'assignee' ? selectedFilters[category].map(each => each.name) : category === "score" ? selectedFilters[category] : selectedFilters[category]).value}
                  </span>
                </div>
                <div className='group-hover:text-accent-100'>
                  <ArrowIcon isOpen={showDropdown[category]} />
                </div>
              </div>
              {showDropdown[category] && (
                category === 'experience' ? (
                  <ExperienceFilter onApply={handleExperienceApply} />
                ) :
                  category === 'score' ? (
                    <ScoreFilter handleScoreChange={handleScoreChange} />
                  ) :
                    (
                      <div className="p-2 rounded-xl absolute typography-body left-[18.5rem] min-w-[15.625rem] bg-background-40 w-max flex gap-2 flex-col " style={{ boxShadow: "5px 5px 50px rgba(0,0,0,0.9)" }}>
                        {categories[category].map((item) => (
                          <label key={category === 'assignee' ? item._id : item} className={"group relative flex items-center p-4 h-10 hover:bg-background-60 cursor-pointer hover:text-accent-100 rounded-xl " + (category === 'assignee' ? selectedFilters[category].find(each => each.name === item.name) ? "bg-accent-300 text-accent-100 " : "" : selectedFilters[category].includes(item) ? "bg-accent-300 text-accent-100 " : "text-white")}>
                            <TickCheckbox
                              id={`${category}-${category === 'assignee' ? item._id : item}`}
                              checked={category === 'assignee' ? 
                                !!selectedFilters[category].find(each => each.name === item.name) : 
                                selectedFilters[category].includes(item)}
                              onChange={() => category === 'stage' ? handleStageSelect(item) : handleSelect(category, item)}
                              labelClassName=""
                            />
                            <span className="ml-2">{category === 'assignee' ? item.name : item}</span>
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