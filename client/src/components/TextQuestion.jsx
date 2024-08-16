import React, { useState } from 'react';
import { Button } from './ui/Button';

const TextQuestion = ({ question, onUpdate, onDelete, onCopy, isEditing }) => {
  const [localQuestion, setLocalQuestion] = useState(question.text);
  const [localRequired, setLocalRequired] = useState(question.required);

  const handleSave = () => {
    onUpdate({
      ...question,
      text: localQuestion,
      required: localRequired,
    });
  };

  if (!isEditing) {
    return (
      <div className="bg-background-30 p-4 rounded-xl mb-4">
        <h3 className="font-bold mb-2">{question.text}</h3>
        <textarea
          placeholder="Answer will be provided here"
          className="w-full p-2 bg-background-70 rounded mb-2"
          rows={3}
          disabled
        />
        <div className="mt-2">
          {question.required && <span className="text-red-500 mr-2">*Required</span>}
          <Button onClick={() => onUpdate({ ...question, isEditing: true })}>Edit</Button>
          <Button onClick={onCopy} className="ml-2">Copy</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-30 p-4 rounded-xl mb-4">
      <input
        type="text"
        value={localQuestion}
        onChange={(e) => setLocalQuestion(e.target.value)}
        placeholder="Question"
        className="w-full mb-2 p-2 bg-background-70 rounded"
      />
      <textarea
        placeholder="Answer will be provided here"
        className="w-full p-2 bg-background-70 rounded mb-2"
        rows={3}
        disabled
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">Required</span>
          <input
            type="checkbox"
            checked={localRequired}
            onChange={() => setLocalRequired(!localRequired)}
          />
        </div>
      </div>
      <div className="mt-2">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={onDelete} variant="destructive" className="ml-2">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TextQuestion;