import { Icon, Minus, Plus } from "lucide-react";
import React from "react";
import IconWrapper from "../Cards/IconWrapper";

export const NumberInputField = React.forwardRef(({ label, value, onChange, unit }, ref) => {
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
        <div className='flex '>
          <div className='typography-body text-font-gray flex items-center border-r-[1px] border-grey-70 pr-3'>
            {unit}
          </div>
          <button type="button" onClick={handleDecrement} className="border-r-[1px] border-grey-70 text-gray-500">
            <IconWrapper icon={Minus} inheritColor />

          </button>
          <button type="button" onClick={handleIncrement} className=" text-gray-500">
            <IconWrapper icon={Plus} inheritColor />
          </button>
        </div>
      </div>
    </div>
  );
});