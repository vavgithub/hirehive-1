export const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col w-[85px] justify-center p-3 rounded-xl cursor-pointer hover:bg-background-60 ${isChecked ? 'bg-accent-300' : 'bg-background-40'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className={` mt-2 whitespace-nowrap overflow-hidden text-ellipsis typography-large-p ${isChecked ? 'text-font-accent' : 'text-font-gray'}`}>
            {label}
        </span>
    </div>
);