export const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col w-[4.5rem] sm:w-[5.25rem] justify-center p-3 rounded-xl cursor-pointer hover:bg-background-60 ${isChecked ? ' selection-primary ' : 'bg-background-70 text-font-gray'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className={` mt-2 whitespace-nowrap overflow-hidden text-ellipsis typography-large-p `}>
            {label}
        </span>
    </div>
);