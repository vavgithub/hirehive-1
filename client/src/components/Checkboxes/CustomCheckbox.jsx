export const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col w-[4.5rem] sm:w-[5.25rem] justify-center p-3 rounded-xl cursor-pointer hover:outline-accent-100 hover:outline hover:outline-2 ${isChecked ? ' selection-primary ' : 'bg-background-80 text-font-gray'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className={` mt-2 whitespace-nowrap overflow-hidden text-ellipsis typography-large-p `}>
            {label}
        </span>
    </div>
);