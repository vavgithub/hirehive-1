import React from 'react'

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
                    className="appearance-none border mr-2 h-4 w-4 rounded-md bg-background-100 hover:border-grey-100  checked:bg-accent-100 checked:border-accent-100 peer"
                />
                {/* <span className="absolute hidden top-0 h-4 w-4 items-center justify-center text-white peer-checked:flex">✔</span> */}
                <svg
                          className="hidden peer-checked:block absolute top-0 left-[-2px] w-[20px] scale-90 h-[20px] text-black-100 pointer-events-none"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="M5 12l4 4L19 7"></path>
                        </svg>
            
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