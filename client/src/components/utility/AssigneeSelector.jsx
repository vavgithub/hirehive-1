import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '../../svg/SearchIcon';

const AssigneeSelector = ({ mode = 'icon', value, onChange, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const assignees = [
        { id: 1, name: 'Jordyn' },
  
        { id: 2, name: 'Emily Parker' },
        { id: 3, name: 'James Dean' },
        { id: 4, name: 'William Taylor' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredAssignees = assignees.filter(assignee =>
        assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (assignee) => {
        onChange(assignee);
        setIsOpen(false);
        onSelect(assignee);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const renderTrigger = () => {
        const shouldShowIcon = !value || value === 'N/A';
        if (mode === 'icon') {
            return (
                <button
                    onClick={toggleDropdown}
                    className="rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    {shouldShowIcon ? (
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#1B1C1D" />
                            <path d="M18.6641 22V20.6667C18.6641 19.9594 18.3831 19.2811 17.883 18.7811C17.3829 18.281 16.7046 18 15.9974 18H11.3307C10.6235 18 9.94521 18.281 9.44511 18.7811C8.94501 19.2811 8.66406 19.9594 8.66406 20.6667V22M21.3307 13.3333V17.3333M23.3307 15.3333H19.3307M16.3307 12.6667C16.3307 14.1394 15.1368 15.3333 13.6641 15.3333C12.1913 15.3333 10.9974 14.1394 10.9974 12.6667C10.9974 11.1939 12.1913 10 13.6641 10C15.1368 10 16.3307 11.1939 16.3307 12.6667Z" stroke="white" strokeWidth="0.825" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-accent-100 text-background-60 flex items-center justify-center">
                            {value && value.name ? value.name[0].toUpperCase() : '?'}
                        </div>
                    )}
                </button>
            );
        } else {
            return (
                <div onClick={toggleDropdown} className="relative w-full">
                    <input
                        type="text"
                        className="w-full px-6 py-2 rounded-md shadow-sm focus:outline-none"
                        placeholder="-Select-"
                        value={value && value.name ? value.name : ''}
                        readOnly
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Icons">
                                <path id="Icon" d="M4 8.5L12 16.5L20 8.5" stroke="#585B5F" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </span>
                    <span className="absolute inset-y-0 left-0 flex items-center pr-2 pointer-events-none">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Icons">
                                <path id="Icon" d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5M16 7.5C16 9.70914 14.2091 11.5 12 11.5C9.79086 11.5 8 9.70914 8 7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5Z" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </span>
                </div>
            );
        }
    };

    return (
        <div className={`relative ${mode === 'icon' ? 'inline-block' : 'w-full'}`} ref={dropdownRef}>
            {renderTrigger()}

            {isOpen && (
                <div className={`absolute scrollbar-hide right-0 z-10 mt-1 ${mode === 'icon' ? 'w-64' : 'w-full'} bg-background-40 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}>
                    <div className="sticky top-0 z-10 flex items-center bg-background-40">
                        <SearchIcon />
                        <input
                            type="text"
                            className="block w-full px-4 py-2 text-sm bg-background-40 focus:outline-none"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className="py-1 ">
                        {filteredAssignees.map((assignee) => (
                            <li
                                key={assignee.id}
                                className={`m-2 text-white rounded select-none relative py-2 pl-3 pr-9 bg-background-60 hover:text-accent-100 cursor-pointer ${
                                    value && value.id === assignee.id
                                        ? 'bg-background-90 text-accent-100'
                                        : 'text-gray-900'
                                }`}
                                onClick={() => handleSelect(assignee)}
                            >
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 text-background-60 flex items-center justify-center mr-3">
                                        {assignee.name[0].toUpperCase()}
                                    </div>
                                    <span className="font-normal typography-large-p block truncate">{assignee.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AssigneeSelector;