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
            className={`w-11 h-11 rounded-xl cursor-pointer flex items-center justify-center typography-body 
              ${value == scoreValue ? 'bg-accent-300 text-font-accent' : 'bg-background-60 hover:bg-background-green'}`}
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
