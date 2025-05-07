import React, { useEffect, useState } from "react";
import { InputField } from "../Inputs/InputField";

export const CustomDropdown = React.forwardRef(
  (
    {
      field,
      label,
      options,
      value,
      onChange,
      required,
      error,
      extraStylesForLabel,
      maxHeight,
      searchEnabled = false
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const dropdownRef = React.useRef(null);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      if (!isOpen) setSearchTerm(""); // Reset search when opening
    };

    const handleOptionClick = (option) => {
      onChange(option?.value || option);
      setIsOpen(false);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const filteredOptions = searchEnabled
      ? options.filter((opt) =>
          ((opt.label || opt)?.toLowerCase?.().includes(searchTerm.toLowerCase()) && opt.value)
        )
      : options;

    return (
      <div className="flex flex-col gap-2 relative w-full" ref={dropdownRef}>
        {label && (
          <label className={"typography-body " + extraStylesForLabel}>
            {label}
            {required && <span className="text-red-100 ml-1">*</span>}
          </label>
        )}
        <div className="relative focus:outline focus:outline-teal-400">
          <button
            type="button"
            onClick={toggleDropdown}
            className={`${value ? "text-white" : "text-font-gray"} ${error ? '!border !border-red-500' : 'border border-transparent'}  typography-body mt-1 h-[2.75rem] flex items-center justify-between bg-background-40 hover:bg-background-60 w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4`}
            ref={ref}
          >
            {options.find((opt) => opt.value === value)?.label ||
              options.find((opt) => opt === value) ||
              "-Select-"}
            <svg
              width="18"
              height="9"
              viewBox="0 0 18 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.5L9 8.5L17 0.5"
                stroke="#585B5F"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute mt-1 bg-background-40 rounded-xl shadow-[0px_0px_20px_rgba(45,45,45,0.7)] w-full space-y-2 z-50 overflow-y-scroll scrollbar-hide"
              style={{ maxHeight: maxHeight || "200px" }}
            >
              {searchEnabled && (
                <li className="px-4 py-2">
                  <InputField
                    type={'text'}
                    autoFocus
                    placeholder={'Search'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </li>
              )}

              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option?.value || option}
                    onClick={() => handleOptionClick(option)}
                    className="cursor-pointer px-4 py-2 typography-body hover:bg-background-60"
                  >
                    {option.label
                      ? option.label
                      : typeof option === "string"
                      ? option
                      : ""}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No options found</li>
              )}
            </ul>
          )}
        </div>
        {error && (
          <p className="text-red-500 absolute typography-small-p top-[5rem]">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);
