import React, { useState, useEffect } from 'react';
import CutButton from '../../svg/MiniFormButtons/CutButton';
import DeleteButton from '../../svg/MiniFormButtons/DeleteButton';
import { Button } from '../Buttons/Button';
import ToggleSwitch from '../ui/ToggleSwitch';

const MultipleChoiceQuestion = ({ question, onUpdate, onDelete, onCopy, initialEditMode = false, onValidityChange , questionNumber}) => {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [localQuestion, setLocalQuestion] = useState(question.text);
  const [localOptions, setLocalOptions] = useState(question.options);
  const [localRequired, setLocalRequired] = useState(question.required);

  useEffect(() => {
    setIsEditing(initialEditMode);
  }, [initialEditMode]);

  useEffect(() => {
    const isValid = localQuestion.trim() !== '' && localOptions.some(option => option.trim() !== '');
    if (typeof onValidityChange === 'function') {
      onValidityChange(isValid);
    }
  }, [localQuestion, localOptions, onValidityChange]);

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        handleSave();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [localQuestion, localOptions, localRequired]);

  const addOption = () => {
    setLocalOptions([...localOptions, '']);
  };

  const updateOption = (index, value) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
  };

  const deleteOption = (index) => {
    setLocalOptions(localOptions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate({
      ...question,
      text: localQuestion,
      options: localOptions,
      required: localRequired,
    });
  };

  const handleEnterEditMode = () => {
    setIsEditing(true);
  };

  if (!isEditing) {
    return (
      <div 
        className="bg-background-30 w-full rounded-xl mb-4 p-4 cursor-pointer hover:bg-background-40 transition-colors"
        onClick={handleEnterEditMode}
      >
        <h3 className="font-bold mb-2">
          <span className="mr-2">Q{questionNumber}.</span>
          {question.text}
        </h3>
        {question.options.map((option, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input type="radio" id={`option-${question.id}-${index}`} name={`question-${question.id}`} disabled />
            <label htmlFor={`option-${question.id}-${index}`} className="ml-2">{option}</label>
          </div>
        ))}
        <div className="mt-2">
          {question.required && <span className="text-red-500 mr-2">*Required</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-30 p-4 w-full rounded-xl mb-4">
     <div className="flex items-center mb-2">
        <span className="mr-2 font-bold">Q{questionNumber}.</span>
        <input
          type="text"
          value={localQuestion}
          onChange={(e) => setLocalQuestion(e.target.value)}
          placeholder="Question"
          className="flex-grow p-2 bg-background-40 rounded-xl"
        />
      </div>
      {localOptions.map((option, index) => (
        <div key={index} className="flex w-[400px] mb-2 items-center gap-2">
          <div className='typography-small-p text-font-gray flex-shrink-0'>Option {index+1}</div>
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            className="flex-grow p-2 bg-background-40 rounded-xl"
          />
          <div className='bg-background-70 rounded-xl flex items-center justify-center'>
            <Button type="button" onClick={() => deleteOption(index)} variant="destructive" size="icon">
              <CutButton />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-2">
        <div onClick={addOption} className='text-font-primary cursor-pointer typography-large-p font-outfit'>
          + Add Option
        </div>
      </div>
      <div className="flex justify-end mt-2 p-4 items-center bg-background-40 rounded-xl space-x-4">
        <ToggleSwitch checkValue={localRequired} setCheckValue={setLocalRequired} label={"Required"} />
        <div onClick={(e) => { e.stopPropagation(); onCopy(); }} className='bg-blue-200 w-11 h-11  rounded-xl flex items-center justify-center cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </div>
        <div onClick={(e) => { e.stopPropagation(); onDelete(); }} className='bg-red-200 w-11 h-11  rounded-xl flex items-center justify-center cursor-pointer'>
          <DeleteButton />
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;