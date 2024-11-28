import React from 'react';

const Loader = () => {
  return (
    <div className="relative w-24 h-24">
      <div
        className="absolute box-border w-8 h-8 bg-primary-100 top-1/2 left-1/2"
        style={{
          animation: "up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite",
        }}
      ></div>
      <div
        className="absolute box-border w-8 h-8 bg-white top-[calc(50%-2rem)] left-[calc(50%-2rem)]"
        style={{
          animation: "down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite",
        }}
      ></div>
    </div>
  );
};

export default Loader;
