import { useState, useMemo } from 'react';

const SkillsInput = ({ value = [], onChange, allSkills = [] ,error}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input value
  const suggestions = useMemo(() => {
    if (!inputValue) return [];
    const inputLower = inputValue.toLowerCase();
    return allSkills.filter(
      (skill) =>
        skill.toLowerCase().includes(inputLower) && !value.includes(skill)
    );
  }, [inputValue, allSkills, value]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInputValue(input);
    setShowSuggestions(true);
  };

  const addSkill = (skillToAdd) => {
    if (skillToAdd && !value.includes(skillToAdd)) {
      onChange([...value, skillToAdd]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (event) => {
    if (['Enter', ','].includes(event.key)) {
      event.preventDefault();
      const trimmedSkill = inputValue.trim();
      addSkill(trimmedSkill);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    addSkill(suggestion);
  };

  const removeSkill = (index) => {
    const newSkills = value.filter((_, idx) => idx !== index);
    onChange(newSkills);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded mt-2">
        {value.map((skill, index) => (
          <div
            key={index}
            className={`${error ? '!border !border-red-500' : 'border border-transparent'}  p-2 flex items-center gap-1 typography-body bg-background-70 rounded-xl px-2`}
          >
            {skill}
            <button type="button" onClick={() => removeSkill(index)}>
              <svg
                width="10"
                height="9"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 0.5L1 8.5M1 0.5L9 8.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add Skills"
          className={(error && '!border !border-red-500' )}
          aria-autocomplete="list"
          aria-controls="skills-suggestions"
          aria-expanded={showSuggestions}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="skills-suggestions"
          className="rounded-xl bg-background-70 mt-2 p-2"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-background-60"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
