import React from 'react';

const Tabs = ({ tabs, activeTab, handleTabClick }) => {
    return (
        <div className={ ' flex gap-8 bg-background-100  rounded-xl items-center px-8 '}>
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className="relative cursor-pointer flex flex-col items-center w-fit h-full py-3"
                    onClick={() => handleTabClick(tab.name)}
                >
                    <div
                        className={` typography-body rounded-xl flex justify-center items-center ${
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