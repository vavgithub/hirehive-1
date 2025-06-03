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
    labelClassName = "typography-body hover:text-accent-100 whitespace-nowrap  cursor-pointer"
}) => {
    return (
        <div className={`flex items-center gap-2 ${className} ${(checked && label) ? 'selection-primary' : ''}`}>
            <div className="relative  flex items-center justify-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    className="appearance-none  border border-font-gray mr-2 h-4 w-4 cursor-pointer rounded bg-background-100   checked:bg-accent-100 checked:border-accent-100 peer"
                />

                <div className="hidden peer-checked:block cursor-pointer absolute top-[-1px] left-[-2px] w-[1.25rem] scale-90 h-[1.25rem] text-black-100 pointer-events-none">
                    <span className='text-background-100'><IconWrapper customStrokeWidth={4} customIconSize={3} icon={Check} inheritColor size={0} /></span>

                </div>


            </div>
            {label && (
                <label htmlFor={id} className={labelClassName + (checked ? ' ' : ' text-font-gray ')}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default TickCheckbox