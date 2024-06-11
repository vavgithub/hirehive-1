import React from 'react';

const Tabs = ({ tabs, activeTab, handleTabClick }) => {
    return (
        <div className='flex gap-6 p-2 bg-gray-300 w-max rounded-md items-center'>
            {tabs.map((tab) => (
                <span
                    key={tab.name}
                    className={activeTab === tab.name ? 'bg-white cursor-pointer p-1 rounded-md w-32 flex justify-center' : 'cursor-pointer w-32 flex justify-center'}
                    onClick={() => handleTabClick(tab.name)}
                >
                    {tab.label} {tab.count !== undefined && `(${tab.count})`}
                </span>
            ))}
        </div>
    );
};

export default Tabs;
