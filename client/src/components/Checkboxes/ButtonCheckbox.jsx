export const ButtonCheckbox = ({ label, isChecked, onChange }) => (
  <button
    type="button"
    aria-pressed={isChecked}
    className={isChecked ? 'geode-chip geode-chip-on' : 'geode-chip'}
    onClick={onChange}
  >
    {label}
  </button>
)
