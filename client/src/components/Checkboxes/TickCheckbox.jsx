import React from 'react'
import RightTick from '../../svg/Staging/RightTick';
import { Check } from 'lucide-react';
import IconWrapper from '../Cards/IconWrapper';

const TickCheckbox = ({
    id,
    checked,
    onChange,
    label,
    className = "",
    labelClassName = "typography-body hover:text-accent-100 whitespace-nowrap text-font-gray cursor-pointer"
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative  flex items-center justify-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    className="appearance-none border mr-2 h-4 w-4 rounded bg-background-100 hover:border-grey-100  checked:bg-accent-100 checked:border-accent-100 peer"
                />
                {/* <span className="absolute hidden top-0 h-4 w-4 items-center justify-center text-white peer-checked:flex">✔</span> */}

                <div className="hidden peer-checked:block absolute top-[-1px] left-[-2px] w-[20px] scale-90 h-[20px] text-black-100 pointer-events-none">
                    <span className='text-black-100'><IconWrapper customStrokeWidth={4} customIconSize={3} icon={Check} inheritColor size={0} /></span>

                </div>


            </div>
            {label && (
                <label htmlFor={id} className={labelClassName}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default TickCheckbox