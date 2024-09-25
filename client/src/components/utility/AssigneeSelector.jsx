import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import SearchIcon from '../../svg/SearchIcon';
import { fetchAvailableDesignReviewers } from '../../api/authApi';

const AssigneeSelector = ({ mode = 'icon', value, onChange, onSelect }) => {
    const [reviewers, setReviewers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [selectedReviewer, setSelectedReviewer] = useState(value);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReviewers = async () => {
          try {
            setIsLoading(true);
            setError(null);
            const data = await fetchAvailableDesignReviewers();
            console.log('Fetched reviewers in component:', data);
            setReviewers(data);
          } catch (error) {
            console.error('Error fetching design reviewers in component:', error);
            setError(error.message);
            setReviewers([]);
          } finally {
            setIsLoading(false);
          }
        };
        loadReviewers();
    }, []);

    useEffect(() => {
        console.log('Current reviewers state:', reviewers);
        console.log('Current value prop:', value);
        if (value && reviewers.length > 0) {
            const reviewer = reviewers.find(r => r._id === value || r._id === value._id);
            console.log('Found reviewer:', reviewer);
            setSelectedReviewer(reviewer || null);
        } else {
            setSelectedReviewer(null);
        }
    }, [value, reviewers]);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    }, [isOpen]);



    const filteredReviewers = useCallback(() => {
        console.log('Filtering reviewers. Current state:', reviewers);
        if (!reviewers.length) return [];
        return reviewers.filter(reviewer =>
            reviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [reviewers, searchTerm]);

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
        setSearchTerm('');
    }, []);


   const handleSelect = useCallback((reviewer) => {
        setSelectedReviewer(reviewer);
        onChange(reviewer);
        onSelect(reviewer);
        closeDropdown();
    }, [onChange, onSelect, closeDropdown]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeDropdown]);



    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);

    const renderTrigger = () => {
        const shouldShowIcon = !selectedReviewer || selectedReviewer === 'N/A';
        console.log('Rendering trigger, selectedReviewer:', selectedReviewer); // Debug log
        if (mode === 'icon') {
            return (
                <button
                    ref={triggerRef}
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
                            {selectedReviewer.name ? selectedReviewer.name[0].toUpperCase() : '?'}
                        </div>
                    )}
                </button>
            );
        } return (
            <div onClick={toggleDropdown} className="relative w-full">
                <input
                    type="text"
                    className="w-full px-6 py-2 rounded-md shadow-sm focus:outline-none"
                    placeholder="-Select-"
                    value={selectedReviewer && selectedReviewer.name ? selectedReviewer.name : ''}
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
    };
    const renderDropdown = () => {
        if (!isOpen) return null;

        console.log('Rendering dropdown. IsLoading:', isLoading, 'Error:', error, 'Reviewers:', reviewers);

        return ReactDOM.createPortal(
            <div 
                ref={dropdownRef}
                style={{
                    position: 'absolute',
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                    zIndex: 9999,
                }}
                className={`w-64 bg-background-40 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
            >
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
                <ul className="py-1">
                    {isLoading ? (
                        <li className="px-4 py-2 text-white">Loading...</li>
                    ) : error ? (
                        <li className="px-4 py-2 text-red-500">Error: {error}</li>
                    ) : filteredReviewers().length > 0 ? (
                        filteredReviewers().map((reviewer) => (
                            <li
                                key={reviewer._id}
                                className={`m-2 text-white rounded select-none relative py-2 pl-3 pr-9 bg-background-60 hover:text-accent-100 cursor-pointer ${
                                    value && value._id === reviewer._id
                                        ? 'bg-background-90 text-accent-100'
                                        : 'text-gray-900'
                                }`}
                                onClick={() => handleSelect(reviewer)}
                            >
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-accent-100 text-background-60 flex items-center justify-center mr-3">
                                        {reviewer.name[0].toUpperCase()}
                                    </div>
                                    <span className="font-normal typography-large-p block truncate">{reviewer.name}</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-white">No reviewers found</li>
                    )}
                </ul>
            </div>,
            document.body
        );
    };

    return (
        <>
            {renderTrigger()}
            {renderDropdown()}
        </>
    );
};
export default AssigneeSelector;