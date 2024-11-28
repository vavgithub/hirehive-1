import React, { useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import { FullTimeIcon, FullTimeIconActive } from '../../svg/Checkboxes/FullTimeIcons';
import { ContractIcon, ContractIconActive } from '../../svg/Checkboxes/ContractIcons';
import { InternIcon, InternIconActive } from '../../svg/Checkboxes/InternIcons';
import { HiredIcon, HiredIconActive } from '../../svg/Checkboxes/HiredIcons';
import { NotHired, NotHiredActive } from '../../svg/Checkboxes/NotHired';
import BudgetFilter from './BudgetFilter';


const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col justify-center p-3 rounded-xl cursor-pointer hover:bg-background-60 ${isChecked ? 'bg-accent-300' : 'bg-background-40'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className={` mt-2 typography-large-p ${isChecked ? 'text-font-accent' : 'text-font-gray'}`}>
            {label}
        </span>
        {/* {count !== undefined && (
            <span className={`mt-1 text-xs ${isChecked ? 'text-teal-300' : 'text-gray-500'}`}>
                {count}
            </span>
        )} */}
    </div>
);

const ButtonCheckbox = ({ label, isChecked, onChange }) => (
    <button
        className={`px-4 py-2 rounded-xl typography-large-p ${isChecked ? 'bg-accent-300 text-font-accent' : 'bg-background-40 text-font-gray'
            } hover:bg-background-60 transition-colors duration-200`}
        onClick={onChange}
    >
        {label}
    </button>
);

const CheckboxGroup = ({ title, options, filters, handleCheckboxChange, isDisabled, statistics, useCustomIconCheckbox }) => {
    if (useCustomIconCheckbox) {
        return (
            <div className="mb-4">
                <h3 className="text-gray-200 font-semibold mb-2">{title}</h3>
                <div className="grid grid-cols-3 gap-2">
                    {options.map(({ value, label, statKey, icon }) => (
                        <CustomCheckbox
                            key={value}
                            label={label}
                            icon={filters.includes(value) ? icon.active : icon.inactive}
                            isChecked={filters.includes(value)}
                            onChange={() => handleCheckboxChange(value)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Original checkbox group for other filter types
    return (
        <div className="mb-4">
            <h3 className="typoraphy-large-p text-gray-200 font-semibold mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {options.map(({ value, label }) => (
                    <ButtonCheckbox
                        key={value}
                        label={label}
                        isChecked={filters.includes(value)}
                        onChange={() => handleCheckboxChange(value)}
                    />
                ))}
            </div>
        </div>
    );
};

const Filters = ({ filters = {}, handleCheckboxChange, activeTab, handleExperienceFilter, handleBudgetFilter, clearAllFilters }) => {
    const isDisabled = activeTab === 'draft';
    const [shouldResetExperience, setShouldResetExperience] = useState(false);
    const [shouldResetBudget, setShouldResetBudget] = useState(false);


    const jobTypeOptions = [
        {
            value: 'Full Time',
            label: 'Full-time',
            icon: {
                active: FullTimeIconActive,
                inactive: FullTimeIcon
            }
        },
        {
            value: 'Contract',
            label: 'Contract',

            icon: {
                active: InternIconActive,
                inactive: InternIcon
            }
        },
        {
            value: 'Internship',
            label: 'Intern',
            icon: {
                active: ContractIconActive,
                inactive: ContractIcon
            }
        }
    ];

    const jobProfileOptions = [
        { value: 'UI UX', label: 'UI UX' },
        { value: 'Motion Graphic', label: 'Motion Graphic' },
        { value: 'Video Editor', label: 'Video Editor' },
        { value: '3D', label: '3D' },
        { value: 'Digital Marketing Executive', label: 'Digital Marketing Executive' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Art Director', label: 'Art Director' },
        { value: 'Frontend Developer', label: 'Frontend Developer' }
    ];

    const closedOptions = [
        {
            value: 'hired', label: 'Hired', icon: {
                active: HiredIconActive,
                inactive: HiredIcon
            }
        },
        {
            value: 'notHired', label: 'Not Hired', icon: {
                active: NotHiredActive,
                inactive: NotHired
            }
        }
    ];
    const handleExperienceApply = (experience) => {
        setShouldResetExperience(false);
        handleExperienceFilter(experience);
    };

    const handleBudgetApply = (budget) => {
        setShouldResetBudget(false);
        handleBudgetFilter(budget);
    };

    const handleClearAll = () => {
        clearAllFilters();
        setShouldResetExperience(true);
        setShouldResetBudget(true);
    };


    return (
        <div className='w-[304px]'>

            <div className="bg-background-90 p-4 rounded-xl relative">
                <h3 className='text-gray-200 font-semibold mb-2 text-lg tracking-wide' >Filter</h3>
                <div className='flex flex-row-reverse absolute top-5 right-5'>
                    <button
                        onClick={handleClearAll}
                        className="text-font-gray typography-small-p hover:text-blue-800 font-semibold"
                    >
                        Clear All
                    </button>
                </div>
                {activeTab === 'closed' && (
                    <CheckboxGroup
                        title="Job Status"
                        options={closedOptions}
                        filters={filters.closingStatus || []}
                        handleCheckboxChange={(value) => handleCheckboxChange('closingStatus', value)}
                        isDisabled={isDisabled}
                        useCustomIconCheckbox={true}
                    />
                )}

                <CheckboxGroup
                    title="Employment Type"
                    options={jobTypeOptions}
                    filters={filters.employmentType || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('employmentType', value)}
                    isDisabled={isDisabled}
                    useCustomIconCheckbox={true}
                />

                <CheckboxGroup
                    title="Job Profile"
                    options={jobProfileOptions}
                    filters={filters.jobProfile || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('jobProfile', value)}
                    isDisabled={isDisabled}
                />

                <div className="mb-4">
                <h3 className="typoraphy-large-p text-gray-200 font-semibold mb-2">Experience Filter</h3>
                    <ExperienceFilter
                        onApply={handleExperienceApply}
                        shouldReset={shouldResetExperience}
                    />
                </div>

                <div className="mb-4">
                    <h3 className="typography-large-p text-gray-200 font-semibold mb-2">Budget Filter</h3>
                    <BudgetFilter 
                        onApply={handleBudgetApply}
                        shouldReset={shouldResetBudget}
                    />
                </div>

            </div>
        </div>
    );
};

export default Filters;
