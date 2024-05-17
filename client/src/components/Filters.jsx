import React from 'react';

const Filters = ({ filters, statistics, handleCheckboxChange , activeTab }) => {
    console.log('this is new statics', statistics); // Check statistics object in console
    const isDisabled = activeTab === 'draft' || activeTab === 'archived'; // Determine if inputs should be disabled
    const textColor = isDisabled ? 'text-gray-400' : 'text-gray-700'; // Conditional text color
    return (
        <div className=' w-64'>
        <div className="bg-gray-100 p-4 rounded-md">
            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Job Type</h3>
                <div>
                    <div className='flex justify-between'>

                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="fulltime"
                                checked={filters.jobType.includes('fulltime')}
                                onChange={() => handleCheckboxChange('jobType', 'fulltime')}
                                disabled={isDisabled}
                            />
                             <span className={`ml-2 ${textColor}`}>Full-time</span>
                            {/* <span className="ml-2 text-gray-700">Full-time</span> */}
                        </label>
                        <p className={`ml-2 ${textColor}`}>{statistics?.totalFullTimeJobs || 0}</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>

                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="internship"
                                checked={filters.jobType.includes('internship')}
                                onChange={() => handleCheckboxChange('jobType', 'internship')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Internship</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}> {statistics.totalInternships || 0}</p>
                    </div>
                </div>
            </div>


            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Exprience Level</h3>
                <div>
                    <div className='flex justify-between'>

                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="entry"
                                checked={filters.experienceLevel.includes('entry')}
                                onChange={() => handleCheckboxChange('experienceLevel', 'entry')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Entry Level</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}> {statistics.totalEntryLevelJobs || 0}</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="intermediate"
                                checked={filters.experienceLevel.includes('intermediate')}
                                onChange={() => handleCheckboxChange('experienceLevel', 'intermediate')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Intermediate</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}> {statistics.totalMidLevelJobs || 0}</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="senior"
                                checked={filters.experienceLevel.includes('senior')}
                                onChange={() => handleCheckboxChange('experienceLevel', 'senior')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Senior Level</span>

                        </label>
                        <p className={`ml-2 ${textColor}`}> {statistics.totalSeniorLevelJobs || 0}</p>
                    </div>

                </div>
            </div>

            {/* Job Fucntionining */}

            <div className="mb-4 text-left">
                <h3 className="text-gray-800 font-semibold mb-2">Job Function</h3>

                <div>

                    <div className='flex justify-between'>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="design"
                                checked={filters.category.includes('design')}
                                onChange={() => handleCheckboxChange('category', 'design')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Design</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}>{statistics.totalDesignJobs || 0}</p>
                    </div>

                </div>
                <div>
                    <div className='flex justify-between'>

                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="engineering"
                                checked={filters.category.includes('engineering')}
                                onChange={() => handleCheckboxChange('category', 'engineering')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Engineering</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}>{statistics.totalEngineeringJobs || 0}</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="sales"
                                checked={filters.category.includes('sales')}
                                onChange={() => handleCheckboxChange('category', 'sales')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Sales</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}>{statistics.totalSalesJobs || 0}</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="marketing"
                                checked={filters.category.includes('marketing')}
                                onChange={() => handleCheckboxChange('category', 'marketing')}
                                disabled={isDisabled}
                            />
                            <span className={`ml-2 ${textColor}`}>Marketing</span>
                        </label>
                        <p className={`ml-2 ${textColor}`}>{statistics.totalMarketingJobs || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Filters;
