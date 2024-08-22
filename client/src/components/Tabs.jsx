import React from 'react';

const Tabs = ({ tabs, activeTab, handleTabClick }) => {
    return (
        <div className='flex gap-6 p-2 bg-background-100 w-max rounded-md items-center'>
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className="relative cursor-pointer flex flex-col items-center w-36"
                    onClick={() => handleTabClick(tab.name)}
                >
                    <span
                        className={`p-1 rounded-md flex justify-center items-center ${
                            activeTab === tab.name ? 'text-accent-100' : ''
                        }`}
                    >
                        {tab.label} {tab.count !== undefined && `(${tab.count})`}
                    </span>
                    {activeTab === tab.name && (
                        <div className="absolute bottom-[-8px] h-[6px] w-8 bg-accent-100 rounded-tr-xl rounded-tl-xl" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tabs;