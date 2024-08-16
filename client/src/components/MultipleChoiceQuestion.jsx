import React, { useState } from 'react';
import { Button } from './ui/Button';

const MultipleChoiceQuestion = ({ question, onUpdate, onDelete, onCopy, isEditing }) => {
  const [localQuestion, setLocalQuestion] = useState(question.text);
  const [localOptions, setLocalOptions] = useState(question.options);
  const [localRequired, setLocalRequired] = useState(question.required);

  const addOption = () => {
    setLocalOptions([...localOptions, `Option ${localOptions.length + 1}`]);
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

  if (!isEditing) {
    return (
      <div className="bg-background-30 p-4 rounded-xl mb-4 max-w-[900px]">
        <h3 className="font-bold mb-2">{question.text}</h3>
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <input type="radio" id={`option-${question.id}-${index}`} name={`question-${question.id}`} disabled />
            <label htmlFor={`option-${question.id}-${index}`} className="ml-2">{option}</label>
          </div>
        ))}
        <div className="mt-2">
          {question.required && <span className="text-red-500 mr-2">*Required</span>}
          <Button onClick={() => onUpdate({ ...question, isEditing: true })}>Edit</Button>
          <Button onClick={onCopy} className="ml-2">Copy</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-30 p-4 rounded-xl mb-4 w-[1024px]">
      <input
        type="text"
        value={localQuestion}
        onChange={(e) => setLocalQuestion(e.target.value)}
        placeholder="Question"
        className="w-full mb-2 p-2 bg-background-70 rounded"
      />
      {localOptions.map((option, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            className="flex-grow p-2 bg-background-70 rounded mr-2"
          />
          <div className='bg-background-70'>

          <Button onClick={() => deleteOption(index)} variant="destructive" size="icon">
            X
          </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-2">
        <Button onClick={addOption} variant="tertiary">
          + Add option
        </Button>
        
      </div>
      <div className="flex mt-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onDelete} variant="destructive" className="ml-2">
          Delete
        </Button>
        <div className="flex items-center">
          <span className="mr-2">Required</span>
          <input
            type="checkbox"
            checked={localRequired}
            onChange={() => setLocalRequired(!localRequired)}
          />
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;