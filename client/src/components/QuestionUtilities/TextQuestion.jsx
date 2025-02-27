import React, { useState, useEffect } from 'react';
import DeleteButton from '../../svg/MiniFormButtons/DeleteButton';
import ToggleSwitch from '../ui/ToggleSwitch';

const TextQuestion = ({ question, onUpdate, onDelete, onCopy, initialEditMode = false, onValidityChange ,  questionNumber }) => {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [localQuestion, setLocalQuestion] = useState(question.text);
  const [localRequired, setLocalRequired] = useState(question.required);
  const [localAnswerType, setLocalAnswerType] = useState(question.answerType || 'text');

  useEffect(() => {
    setIsEditing(initialEditMode);
  }, [initialEditMode]);

  useEffect(() => {
    const isValid = localQuestion.trim() !== '';
    if (typeof onValidityChange === 'function') {
      onValidityChange(isValid);
    }
  }, [localQuestion, onValidityChange]);

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        handleSave();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [localQuestion, localRequired, localAnswerType]);

  const handleSave = () => {
    onUpdate({
      ...question,
      text: localQuestion,
      required: localRequired,
      answerType: localAnswerType,
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
        <p className="text-sm text-gray-600 mb-2">Answer type: {question.answerType || 'text'}</p>
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Answer Format</label>
        <select
          value={localAnswerType}
          onChange={(e) => setLocalAnswerType(e.target.value)}
          className="w-full p-2 bg-background-40 rounded-xl"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
        </select>
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

export default TextQuestion;