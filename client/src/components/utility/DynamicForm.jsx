import React, { useEffect } from 'react'
import { Button } from '../ui/Button';

const FormSection = ({ title, fields, data, onChange }) => (
  <div className="bg-background-30 p-4 rounded-xl mb-4">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => (
        <React.Fragment key={field.name}>
          <p className="typography-body text-font-gray self-center">{field.label}</p>
          <input
            type={field.type}
            value={data[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
          />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const DynamicForm = ({
  formSections,
  initialData = {},
  primaryButtonText = 'Submit',
  secondaryButtonText = 'Cancel',
  onPrimaryAction,
  onSecondaryAction
}) => {
  const initialFormData = React.useMemo(() => {
    return formSections.reduce((acc, section) => {
      section.fields.forEach(field => {
        acc[field.name] = '';
      });
      return acc;
    }, {});
  }, [formSections]);

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPrimaryAction) {
      onPrimaryAction(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      {formSections.map((section) => (
        <FormSection
          key={section.title}
          title={section.title}
          fields={section.fields}
          data={formData}
          onChange={handleChange}
        />
      ))}
      <div className="flex justify-end space-x-4 mt-6">
        <div className='w-[152px]'>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onSecondaryAction && onSecondaryAction(formData)}
          >
            {secondaryButtonText}
          </Button>
        </div>
        <div className='w-[152px]'>
          <Button type="submit">
            {primaryButtonText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DynamicForm;