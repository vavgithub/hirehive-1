import { ButtonCheckbox } from "./ButtonCheckbox";
import { CustomCheckbox } from "./CustomCheckbox";

export const CheckboxGroup = ({ title, options, filters, handleCheckboxChange, isDisabled, statistics, useCustomIconCheckbox }) => {
    if (useCustomIconCheckbox) {
        return (
            <div className="mb-4">
                <span className="typography-body text-font-main font-semibold mb-2">{title}</span>
                <div className="grid grid-cols-3 gap-2 w-fit">
                    {options.map(({ value, label, statKey, icon }) => (
                        <CustomCheckbox
                            key={value}
                            label={label}
                            icon={filters.includes(value) ? icon.active : icon.inactive}
                            isChecked={filters.includes(value)}
                            onChange={() => handleCheckboxChange(value)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Original checkbox group for other filter types
    return (
        <div className="mb-4">
            <span className="typography-body  text-font-main font-semibold mb-2">{title}</span>
            <div className="flex flex-wrap gap-2">
                {options.map(({ value, label }) => (
                    <ButtonCheckbox
                        key={value}
                        label={label}
                        isChecked={filters.includes(value)}
                        onChange={() => handleCheckboxChange(value)}
                    />
                ))}
            </div>
        </div>
    );
};