import React from 'react';

const Tabs = ({ tabs, activeTab, handleTabClick }) => {
    return (
        <div className='flex gap-6 bg-background-100 w-[400px] rounded-xl items-center px-6'>
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className="relative cursor-pointer flex flex-col items-center w-full p-2"
                    onClick={() => handleTabClick(tab.name)}
                >
                    <div
                        className={`p-1 typography-body rounded-xl flex justify-center items-center ${
                            activeTab === tab.name ? 'text-accent-100' : ''
                        }`}
                    >
                        <span className="flex-shrink-0">
                            {activeTab === tab.name ? tab.activeIcon : tab.icon}
                        </span>
                        <span className='ml-2'>{tab.label}</span>
                    </div>
                    {activeTab === tab.name && (
                        <div className="absolute bottom-[0px] h-[6px] w-8 bg-accent-100 rounded-tr-xl rounded-tl-xl" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tabs;