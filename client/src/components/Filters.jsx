import React from 'react';

const CheckboxGroup = ({ title, options, filters, handleCheckboxChange, isDisabled, statistics }) => (
    <div className="mb-4 text-left">
        <h3 className="text-gray-800 font-semibold mb-2">{title}</h3>
        {options.map(({ value, label, statKey }) => (
            <div key={value} className="flex justify-between">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        value={value}
                        checked={filters.includes(value)}
                        onChange={() => handleCheckboxChange(value)}
                        disabled={isDisabled}
                    />
                    <span className={`ml-2 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>{label}</span>
                </label>
                <p className={`ml-2 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>{statistics[statKey] || 0}</p>
            </div>
        ))}
    </div>
);

const Filters = ({ filters, statistics, handleCheckboxChange, activeTab }) => {
    const isDisabled = activeTab === 'archived';

    const jobTypeOptions = [
        { value: 'fulltime', label: 'Full-time', statKey: 'totalFullTimeJobs' },
        { value: 'internship', label: 'Internship', statKey: 'totalInternships' }
    ];

    const experienceLevelOptions = [
        { value: 'entry', label: 'Entry Level', statKey: 'totalEntryLevelJobs' },
        { value: 'intermediate', label: 'Intermediate', statKey: 'totalMidLevelJobs' },
        { value: 'senior', label: 'Senior Level', statKey: 'totalSeniorLevelJobs' }
    ];

    const jobProfileOptions = [
        { value: 'design', label: 'UI UX', statKey: 'totalDesignJobs' },
        { value: 'engineering', label: 'Motion Graphics', statKey: 'totalEngineeringJobs' },
        { value: 'sales', label: '3D', statKey: 'totalSalesJobs' },
        { value: 'marketing', label: 'Video Editor', statKey: 'totalMarketingJobs' },
        { value: 'marketing', label: 'Digital Marketing Executive', statKey: 'totalMarketingJobs' },
        { value: 'marketing', label: 'Project Manager', statKey: 'totalMarketingJobs' },
        { value: 'marketing', label: 'Art Director', statKey: 'totalMarketingJobs' },
        { value: 'marketing', label: 'Frontend Developer', statKey: 'totalMarketingJobs' }
    ];

    const draftOptions = [
        { value: 'hired', label: 'Hired', statKey: 'totalHired' },
        { value: 'notHired', label: 'Not Hired', statKey: 'totalNotHired' }
    ];

    return (
        <div className='w-64'>
            <div className="bg-gray-100 p-4 rounded-md">
                {activeTab === 'draft' && (
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
                    title="Job Type"
                    options={jobTypeOptions}
                    filters={filters.jobType}
                    handleCheckboxChange={(value) => handleCheckboxChange('jobType', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />
                <CheckboxGroup
                    title="Experience Level"
                    options={experienceLevelOptions}
                    filters={filters.experienceLevel}
                    handleCheckboxChange={(value) => handleCheckboxChange('experienceLevel', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />
                <CheckboxGroup
                    title="Job Profile"
                    options={jobProfileOptions}
                    filters={filters.category}
                    handleCheckboxChange={(value) => handleCheckboxChange('category', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />

            </div>
        </div>
    );
};

export default Filters;
