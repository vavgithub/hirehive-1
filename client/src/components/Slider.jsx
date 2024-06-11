// src/components/Slider.js
import React, { useState } from 'react';

const Slider = ({ min, max }) => {
    const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg">
      <h2 className="text-white text-lg font-semibold mb-4">Experience level</h2>
      <div className="relative mb-8">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
        />
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-600 rounded-lg"></div>
        <div
          className="absolute top-0 h-2 bg-blue-500 rounded-lg"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`
          }}
        ></div>
        <div
          className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white cursor-pointer"
          style={{ left: `calc(${((minValue - min) / (max - min)) * 100}% - 8px)` }}
        ></div>
        <div
          className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white cursor-pointer"
          style={{ left: `calc(${((maxValue - min) / (max - min)) * 100}% - 8px)` }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white">Min Experience:</span>
          <div className="flex items-center space-x-1 bg-gray-700 text-white rounded-lg p-2">
            <input
              type="number"
              min={min}
              max={max}
              value={minValue}
              onChange={handleMinChange}
              className="bg-transparent w-12 text-center outline-none"
            />
            <span>Yrs</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white">Max Experience:</span>
          <div className="flex items-center space-x-1 bg-gray-700 text-white rounded-lg p-2">
            <input
              type="number"
              min={min}
              max={max}
              value={maxValue}
              onChange={handleMaxChange}
              className="bg-transparent w-12 text-center outline-none"
            />
            <span>Yrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
