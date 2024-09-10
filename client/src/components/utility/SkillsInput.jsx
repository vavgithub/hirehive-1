import { useState, useEffect } from "react";

const SkillsInput = ({ skills, setSkills, allSkills = [] }) => {
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Ensure skills is always an array
        if (!Array.isArray(skills)) {
            setSkills([]);
        }
    }, [skills, setSkills]);

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const trimmedSkill = skill.trim();
            if (trimmedSkill && !skills.includes(trimmedSkill)) {
                setSkills([...skills, trimmedSkill]);
                setSkill('');
                setError('');
                setSuggestions([]);
            } else {
                setError('Same value not allowed');
            }
        }
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSkill(inputValue);
        if (inputValue && Array.isArray(allSkills)) {
            const filteredSuggestions = allSkills.filter((s) =>
                s.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (!skills.includes(suggestion)) {
            setSkills([...skills, suggestion]);
            setSkill('');
            setError('');
            setSuggestions([]);
        } else {
            setError('Same value not allowed');
        }
    };

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, idx) => idx !== index);
        setSkills(newSkills);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 rounded">
                {Array.isArray(skills) && skills.map((skill, index) => (
                    <div key={index} className="p-2 flex items-center gap-1 typography-body bg-background-70 rounded px-2">
                        {skill}
                        <button type="button" onClick={() => removeSkill(index)} className="text-blue-500 hover:text-blue-700">✖</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={skill}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add skills"
                    className="outline-none w-full"
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

export default SkillsInput;