import React, { useState } from 'react';

const Scorer = ({ onScoreChange }) => {
    const [score, setScore] = useState(0);

    const handleScoreClick = (value) => {
        setScore(value);
        onScoreChange(value); // Pass the score to the parent component
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                    <div
                        key={value}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center typography-body 
                          ${score >= value ? 'bg-background-green' : 'bg-background-70 hover:bg-background-green'}`}
                        onClick={() => handleScoreClick(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scorer;
