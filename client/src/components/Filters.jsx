import React, { useState } from 'react';
import ExperienceFilter from './ExperienceFilter';
import { FullTimeIcon, FullTimeIconActive } from '../svg/Checkboxes/FullTimeIcons';
import { ContractIcon, ContractIconActive } from '../svg/Checkboxes/ContractIcons';
import { InternIcon, InternIconActive } from '../svg/Checkboxes/InternIcons';


const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col justify-center p-3 rounded-lg cursor-pointer ${isChecked ? 'bg-gray-800' : 'bg-gray-900'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className={` mt-2 typography-large-p ${isChecked ? 'text-font-accent' : 'text-gray-400'}`}>
            {label}
        </span>
        {/* {count !== undefined && (
            <span className={`mt-1 text-xs ${isChecked ? 'text-teal-300' : 'text-gray-500'}`}>
                {count}
            </span>
        )} */}
    </div>
);

const CheckboxGroup = ({ title, options, filters, handleCheckboxChange, isDisabled, statistics, isEmploymentType }) => {
    if (isEmploymentType) {
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
                            count={statistics[statKey] || 0}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Original checkbox group for other filter types
    return (
        <div className="mb-4 text-left">
            <h3 className="text-gray-200 font-semibold mb-2">{title}</h3>
            {options.map(({ value, label, statKey }) => (
                <div key={value} className="flex justify-between">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            value={value}
                            checked={filters.includes(value)}
                            onChange={() => handleCheckboxChange(value)}
                            disabled={isDisabled}
                            className="form-checkbox text-teal-500"
                        />
                        <span className={`ml-2 ${isDisabled ? 'text-gray-500' : 'text-gray-300'}`}>{label}</span>
                    </label>
                    <p className={`ml-2 ${isDisabled ? 'text-gray-500' : 'text-gray-300'}`}>{statistics[statKey] || 0}</p>
                </div>
            ))}
        </div>
    );
};

const Filters = ({ filters = {}, statistics, handleCheckboxChange, activeTab, handleExperienceFilter, clearAllFilters }) => {
    const isDisabled = activeTab === 'draft';


    const jobTypeOptions = [
        {
            value: 'Full Time',
            label: 'Full-time',
            statKey: 'totalFullTimeJobs',
            icon: {
                active: FullTimeIconActive,
                inactive: FullTimeIcon
            }
        },
        {
            value: 'Contract',
            label: 'Contract',
            statKey: 'totalContractJobs',
            icon: {
                active: ContractIconActive,
                inactive: ContractIcon
            }
        },
        {
            value: 'Internship',
            label: 'Intern',
            statKey: 'totalInternships',
            icon: {
                active: InternIconActive,
                inactive: InternIcon
            }
        }
    ];

    const jobProfileOptions = [
        { value: 'uiux', label: 'UI UX', statKey: 'totalUiUxJobs' },
        { value: 'motiongraphic', label: 'Motion Graphics', statKey: 'totalMotionGraphicsJobs' },
        { value: '3d', label: '3d', statKey: 'total3DJobs' },
        { value: 'videoeditor', label: 'Video Editor', statKey: 'totalVideoEditorJobs' },
        { value: 'digitalmarketingexecutive', label: 'Digital Marketing Executive', statKey: 'totalDigitalMarketingExecutiveJobs' },
        { value: 'projectmanager', label: 'Project Manager', statKey: 'totalProjectManagerJobs' },
        { value: 'artdirector', label: 'Art Director', statKey: 'totalArtDirectorJobs' },
        { value: 'frontenddeveloper', label: 'Frontend Developer', statKey: 'totalFrontendDeveloperJobs' }
    ];

    const draftOptions = [
        { value: 'hired', label: 'Hired', statKey: 'totalHired' },
        { value: 'notHired', label: 'Not Hired', statKey: 'totalNotHired' }
    ];

    const handleExperienceApply = (experience) => {
        handleExperienceFilter(experience);
    };

    const handleClearAll = () => {
        clearAllFilters();
    };

    return (
        <div className='w-[304px]'>

            <div className="bg-background-90 p-4 rounded-md">
                <div className='flex flex-row-reverse'>
                    <button
                        onClick={handleClearAll}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        Clear All
                    </button>
                </div>
                {activeTab === 'closed' && (
                    <CheckboxGroup
                        title="Job Status"
                        options={draftOptions}
                        filters={filters.draftStatus || []}
                        handleCheckboxChange={(value) => handleCheckboxChange('draftStatus', value)}
                        isDisabled={isDisabled}
                        statistics={statistics}
                    />
                )}
                <CheckboxGroup
                    title="Employment Type"
                    options={jobTypeOptions}
                    filters={filters.employmentType || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('employmentType', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                    isEmploymentType={true}
                />

                <CheckboxGroup
                    title="Job Profile"
                    options={jobProfileOptions}
                    filters={filters.jobProfile || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('jobProfile', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />

                <div className="mb-4">

                    <ExperienceFilter onApply={handleExperienceApply} />

                </div>

            </div>
        </div>
    );
};

export default Filters;
