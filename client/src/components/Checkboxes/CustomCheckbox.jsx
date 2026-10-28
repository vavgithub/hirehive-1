export const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange, count }) => (
    <div
        className={`flex flex-col items-center justify-center gap-geode-2 px-geode-3 py-geode-3 rounded-xl cursor-pointer hover:outline-accent-100 hover:outline hover:outline-2 ${isChecked ? ' selection-primary ' : 'bg-background-80 text-font-gray'
            }`}
        onClick={onChange}
    >
        <Icon />
        <span className="typography-large-p text-center">
            {label}
        </span>
    </div>
);