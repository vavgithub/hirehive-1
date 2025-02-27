import React, { useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import { FullTimeIcon, FullTimeIconActive } from '../../svg/Checkboxes/FullTimeIcons';
import { ContractIcon, ContractIconActive } from '../../svg/Checkboxes/ContractIcons';
import { InternIcon, InternIconActive } from '../../svg/Checkboxes/InternIcons';
import { HiredIcon, HiredIconActive } from '../../svg/Checkboxes/HiredIcons';
import { NotHired, NotHiredActive } from '../../svg/Checkboxes/NotHired';
import BudgetFilter from './BudgetFilter';
import StyledCard from '../Cards/StyledCard';
import { useAuthContext } from '../../context/AuthProvider';
import { PartTimeIcon, PartTimeIconActive } from '../../svg/Checkboxes/PartTimeIcons';
import { CheckboxGroup } from '../Checkboxes/CheckboxGroup';

const Filters = ({ filters = {}, handleCheckboxChange, activeTab, handleExperienceFilter, handleBudgetFilter, clearAllFilters }) => {
    const isDisabled = activeTab === 'draft';
    const [shouldResetExperience, setShouldResetExperience] = useState(false);
    const [shouldResetBudget, setShouldResetBudget] = useState(false);

    const { user } = useAuthContext();
    const role = user?.role || 'Candidate'; // Default to Candidate if role is not specified

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
        },
        ...(role === "Hiring Manager" ? [{
            value: 'Part Time',
            label: 'Part-time',
            icon: {
                active: PartTimeIconActive,
                inactive: PartTimeIcon
            }
        }] : []),
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
            value: 'Hired', label: 'Hired', icon: {
                active: HiredIconActive,
                inactive: HiredIcon
            }
        },
        {
            value: 'NotHired', label: 'Not Hired', icon: {
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
            <StyledCard padding={2} extraStyles={" relative md:w-[304px]"}>
                <h3 className='text-gray-200 font-bricolage font-semibold mb-2 text-xl tracking-wide' >Filter</h3>
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
                <h3 className="typography-body font-bricolage text-gray-200 font-semibold mb-2">Experience Filter</h3>
                    <ExperienceFilter
                        onApply={handleExperienceApply}
                        shouldReset={shouldResetExperience}
                    />
                </div>

                <div className="mb-4">
                    <h3 className="typography-body font-bricolage text-gray-200 font-semibold mb-2">Budget Filter</h3>
                    <BudgetFilter 
                        onApply={handleBudgetApply}
                        shouldReset={shouldResetBudget}
                    />
                </div>

            </StyledCard>
    );
};

export default Filters;
