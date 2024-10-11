import React from 'react';

const Scorer = ({ value, onChange }) => {
  const handleScoreClick = (score) => {
    onChange(score); // Pass the score to the parent component
  };

  return (
    <div className="flex ">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((scoreValue) => (
          <div
            key={scoreValue}
            className={`w-11 h-11 rounded-xl flex items-center justify-center typography-body 
              ${value == scoreValue ? 'bg-background-green text-font-accent' : 'bg-background-70 hover:bg-background-green'}`}
            onClick={() => handleScoreClick(scoreValue)}
          >
            {scoreValue}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scorer;
