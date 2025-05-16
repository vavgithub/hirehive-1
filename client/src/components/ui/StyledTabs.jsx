import React from 'react';

const StyledTabs = ({ customSelectionClass = "selection-primary", customBgColor = "", tabs, activeTab, handleTabClick }) => {
    return (
        <div className={ ' flex   rounded-xl items-center  w-full justify-between ' + (customBgColor ? customBgColor : 'bg-background-90')}>
            {tabs.map((tab) => (
                <div
                    key={tab.name}
                    className="relative cursor-pointer flex flex-col items-center w-fit h-full "
                    onClick={() => handleTabClick(tab.name)}
                >
                    <div
                        className={` typography-body rounded-xl flex justify-center py-4 px-12 items-center ${
                            activeTab === tab.name ? customSelectionClass ? customSelectionClass : 'text-accent-100' : ''
                        }`}
                    >
                        <span className="flex-shrink-0 ">
                            {activeTab === tab.name ? tab.activeIcon : tab.icon}
                        </span>
                        <span className='ml-2'>{tab.label}</span>
                    </div>
                    {activeTab === tab.name && (
                        <div className="absolute bottom-[0px] h-[0.375rem] w-8 bg-accent-100 rounded-tr-xl rounded-tl-xl" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StyledTabs;