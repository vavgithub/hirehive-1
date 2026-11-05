export const CustomCheckbox = ({ label, icon: Icon, isChecked, onChange }) => (
    <button
        type="button"
        aria-pressed={isChecked}
        className={`inline-flex items-center gap-2 ${isChecked ? 'geode-chip geode-chip-on' : 'geode-chip'}`}
        onClick={onChange}
    >
        <Icon />
        <span>{label}</span>
    </button>
);
