export const ButtonCheckbox = ({ label, isChecked, onChange }) => (
    <button
        className={`px-4 py-2 rounded-xl typography-large-p ${isChecked ? 'bg-accent-300 text-font-accent' : 'bg-background-70 text-font-gray'
            } hover:bg-background-60 transition-colors duration-200`}
        onClick={onChange}
    >
        {label}
    </button>
);