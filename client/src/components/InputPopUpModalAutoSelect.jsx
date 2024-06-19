import React, { useState } from 'react';
const AssigneesInput = ({ assignees, setAssignees, allAssignees }) => {
    const [assignee, setAssignee] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const trimmedAssignee = assignee.trim();
            if (trimmedAssignee && !assignees.includes(trimmedAssignee)) {
                setAssignees([...assignees, trimmedAssignee]);
                setAssignee('');
                setError('');
                setSuggestions([]);
            } else {
                setError('Same value not allowed');
            }
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setAssignee(inputValue);
        if (inputValue) {
            const filteredSuggestions = allAssignees.filter((s) =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!assignees.includes(suggestion)) {
            setAssignees([...assignees, suggestion]);
            setAssignee('');
            setError('');
            setSuggestions([]);
        } else {
            setError('Same value not allowed');
        }
    };

    const removeAssignee = (index) => {
        const newAssignees = assignees.filter((_, idx) => idx !== index);
        setAssignees(newAssignees);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
                {assignees.map((assignee, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-100 rounded px-2">
                        {assignee}
                        <button onClick={() => removeAssignee(index)} className="text-blue-500 hover:text-blue-700">✖</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={assignee}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add assignees"
                    className="outline-none"
                />
            </div>
            {suggestions.length > 0 && (
                <div className="border border-gray-300 rounded mt-2">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};


const InputPopUpModalAutoSelect = ({ open, onClose, confirmAction, assignees, setAssignees, allAssignees, heading, para, confirmButtonText = "Confirm", cancelButtonText = "Cancel" }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                <div className="w-56">
                    <h3 className="text-lg font-black text-gray-800">
                        {heading}
                    </h3>
                    <p className='text-sm text-gray-600'>
                        {para}
                    </p>

                    {/* Render AssigneesInput component */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Assignees</label>
                        <AssigneesInput assignees={assignees} setAssignees={setAssignees} allAssignees={allAssignees} />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="btn btn-danger w-full" onClick={confirmAction}>
                            {confirmButtonText}
                        </button>
                        <button className="btn btn-light w-full" onClick={onClose}>
                            {cancelButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputPopUpModalAutoSelect;
