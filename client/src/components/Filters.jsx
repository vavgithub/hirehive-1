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

const Filters = ({ filters = {}, statistics, handleCheckboxChange, activeTab }) => {
    const isDisabled = activeTab === 'draft';

    const jobTypeOptions = [
        { value: 'fulltime', label: 'Full-time', statKey: 'totalFullTimeJobs' },
        { value: 'internship', label: 'Internship', statKey: 'totalInternships' },
        { value: 'contract', label: 'Contract', statKey: 'totalContractJobs'}
    ];

    const jobProfileOptions = [
        { value: 'uiux', label: 'UI UX', statKey: 'totalUiUxJobs' },
        { value: 'motiongraphic', label: 'Motion Graphics', statKey: 'totalMotionGraphicsJobs' },
        { value: '3d', label: '3d', statKey: 'total3DJobs' },
        { value: 'videoeditor', label: 'Video Editor', statKey: 'totalVideoEditorJobs' },
        { value: 'digitalmarketingexecutive', label: 'Digital Marketing Executive', statKey: 'totalDigitalMarketingExecutiveJobs' },
        { value: 'projectmanager', label: 'Project Manager', statKey: 'totalProjectManagerJobs' },
        { value: 'artdirector', label: 'Art Director', statKey: 'totalArtDirectorJobs' },
        { value: 'frontenddeveloper', label: 'Frontend Developer', statKey: 'totalFrontendDeveloperJobs'}
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
                    title="Employment Type"
                    options={jobTypeOptions}
                    filters={filters.employmentType || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('employmentType', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />
          
                <CheckboxGroup
                    title="Job Profile"
                    options={jobProfileOptions}
                    filters={filters.jobProfile || []}
                    handleCheckboxChange={(value) => handleCheckboxChange('jobProfile', value)}
                    isDisabled={isDisabled}
                    statistics={statistics}
                />

            </div>
        </div>
    );
};

export default Filters;
