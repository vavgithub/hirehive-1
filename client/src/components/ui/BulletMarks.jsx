import React from 'react';

const BulletMarks = ({ marks }) => {
  return (
    <div className='flex space-x-1 h-2'>
      {Array.from({ length: 5 }).map((_, index) => (
        <div 
          key={index} 
          className={`w-2 h-2 rounded-full ${index < marks ? 'bg-white' : 'bg-background-90'}`}
        ></div>
      ))}
    </div>
  );
};

export default BulletMarks;
