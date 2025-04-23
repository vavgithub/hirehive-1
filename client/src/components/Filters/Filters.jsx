import React, { useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import BudgetFilter from './BudgetFilter';
import StyledCard from '../Cards/StyledCard';
import { useAuthContext } from '../../context/AuthProvider';
import { CheckboxGroup } from '../Checkboxes/CheckboxGroup';
import IconWrapper from '../Cards/IconWrapper';
import { CircleSlash2, ClockArrowUp, ClockFading, GraduationCap, Handshake, Hourglass } from 'lucide-react';

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
                active: () => <IconWrapper size={0} icon={ClockArrowUp} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={ClockArrowUp} customIconSize={6} isInActiveIcon />
            }
        },
        {
            value: 'Contract',
            label: 'Contract',
            icon: {
                active: () => <IconWrapper size={0} icon={Hourglass} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={Hourglass} customIconSize={6} isInActiveIcon />
            }
        },
        {
            value: 'Internship',
            label: 'Intern',
            icon: {
                active: () => <IconWrapper size={0} icon={GraduationCap} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={GraduationCap} customIconSize={6} isInActiveIcon />
            }
        },
        ...((role === "Hiring Manager" || role === "Admin")? [{
            value: 'Part Time',
            label: 'Part-time',
            icon: {
                active: () => <IconWrapper size={0} icon={ClockFading} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={ClockFading} customIconSize={6} isInActiveIcon />
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
                active: () => <IconWrapper size={0} icon={Handshake} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={Handshake} customIconSize={6} isInActiveIcon />
            }
        },
        {
            value: 'NotHired', label: 'Not Hired', icon: {
                active: () => <IconWrapper size={0} icon={CircleSlash2} customIconSize={6} isActiveIcon />,
                inactive: () => <IconWrapper size={0} icon={CircleSlash2} customIconSize={6} isInActiveIcon />
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
            <StyledCard padding={2} extraStyles={"relative md:w-72"}>
                <h3 className='text-gray-200  font-bricolage font-semibold mb-2 text-xl tracking-wide' >Filter</h3>
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
