import React, { useState } from 'react';
import { Button } from './ui/Button';

const AssigneesInput = ({ assignees, setAssignees, allAssignees, singleSelect = false }) => {
    const [assignee, setAssignee] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setAssignee(inputValue);
        if (inputValue) {
            const filteredSuggestions = allAssignees.filter((s) =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions(allAssignees);
        }
    };

    const handleInputFocus = () => {
        if (!assignee) {
            setSuggestions(allAssignees);
        }
    };

    const handleCheckboxChange = (suggestion) => {
        if (singleSelect) {
            setAssignees([suggestion]);
        } else {
            if (assignees.includes(suggestion)) {
                setAssignees(assignees.filter((a) => a !== suggestion));
            } else {
                setAssignees([...assignees, suggestion]);
            }
        }
    };

    const removeAssignee = (index) => {
        const newAssignees = assignees.filter((_, idx) => idx !== index);
        setAssignees(newAssignees);
    };

    return (
        <div className='w-[576px]'>
            <div className="relative flex flex-wrap gap-2 p-2 px-8 bg-background-40 rounded">
                {assignees.map((assignee, index) => (
                    <div key={index} className="flex items-center gap-1 bg-background-70 rounded px-2">
                        {assignee}
                        <button onClick={() => removeAssignee(index)} className="text-blue-500 hover:text-blue-700">✖</button>
                    </div>
                ))}

                <input
                    type="text"
                    value={assignee}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder={singleSelect ? "-Select One-" : "-Select-"}
                    className={`outline-none px-2 ${assignees.length > 0 ? 'invisible' : ''}`}
                // className="outline-none px-4"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons">
                            <path id="Icon" d="M4 8.5L12 16.5L20 8.5" stroke="#585B5F" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </span>

                <span className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons">
                            <path id="Icon" d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5M16 7.5C16 9.70914 14.2091 11.5 12 11.5C9.79086 11.5 8 9.70914 8 7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5Z" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </span>
            </div>
            {suggestions.length > 0 && (
                <div className="bg-background-40 rounded mt-2">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="flex items-center cursor-pointer p-2"
                        >
                            <input
                                type={singleSelect ? "radio" : "checkbox"}
                                checked={assignees.includes(suggestion)}
                                onChange={() => handleCheckboxChange(suggestion)}
                                className="mr-2"
                            />
                            <span className='typography-body px'>{suggestion}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const InputPopUpModalAutoSelect = ({ open, onClose, confirmAction, assignees, setAssignees, allAssignees, heading, para, confirmButtonText = "Confirm", cancelButtonText = "Cancel", singleSelect = false }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center  ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-background-60 min-w-max rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                <div>
                    <h1 className='typography-h1'>
                        {heading}
                    </h1>
                    <p className='typography-large-p'>
                        {para}
                    </p>

                    <div className="mt-4">
                        <label className="typography-body">Select reviewers</label>
                        <AssigneesInput assignees={assignees} setAssignees={setAssignees} allAssignees={allAssignees} singleSelect={singleSelect} />
                    </div>

                    <div className="flex gap-4 mt-4 justify-end">

                        <div className='w-[140px]'>

                            <Button variant="secondary" onClick={onClose}>
                                {cancelButtonText}
                            </Button>
                        </div>

                        <div className='w-[140px]'>
                            <Button varinat="primary"
                                onClick={confirmAction}
                                disabled={assignees.length === 0}
                            >
                                {confirmButtonText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputPopUpModalAutoSelect;