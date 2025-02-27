import React from "react";

export const NumberInputField = React.forwardRef(({ label , value, onChange, unit }, ref) => {
    const handleIncrement = () => onChange(parseInt(value, 10) + 1);
    const handleDecrement = () => onChange(Math.max(0, parseInt(value, 10) - 1));
  
    return (
      <div className='w-1/2'>
        <span className='typography-small-p  text-font-gray'>{label}</span>
        <div className='items-center gap-2 flex bg-background-40 rounded-xl'>
          <input
            type="number"
            placeholder='-Select-'
            className='outline-none no-spinner w-full p-2 pl-4'
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            ref={ref}
          />
          <div className='flex  items-center pr-4'>
            <p className='typography-body text-font-gray border-r-[1px] border-grey-70 pr-3'> {unit}</p>
            <button type="button" onClick={handleDecrement} className="border-r-[1px] border-grey-70 px-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={handleIncrement} className="pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M12 5.5V19.5M5 12.5H19" stroke="#808389" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  });