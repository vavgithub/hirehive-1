import React, { useEffect } from 'react';
import { Button } from '../Buttons/Button';
import StyledCard from '../Cards/StyledCard';
import { useForm } from 'react-hook-form';
import { validationRules } from '../../utility/validationRules';
import { showErrorToast } from '../ui/Toast';
import { FormField } from './FormField';

const FormSection = ({ title, fields, control }) => (
  <StyledCard backgroundColor="bg-background-30" extraStyles="mb-4">
    <h2 className="typography-h2">{title}</h2>
    <div className="grid gap-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          type={field.type}
          control={control}
          rules={validationRules[field.name]}
          label={field.label}
          rowWise
        />
      ))}
    </div>
  </StyledCard>
);

const DynamicForm = ({
  formSections,
  initialData = {},
  isLoading = false,
  primaryButtonText = 'Submit',
  secondaryButtonText = 'Cancel',
  onPrimaryAction,
  onSecondaryAction
}) => {
  const { control, handleSubmit, reset, trigger, getValues, formState: { errors } } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  useEffect(() => {
    // Build a list of allowed field names from formSections
    const allowedFields = formSections.flatMap(section =>
      section.fields.map(field => field.name)
    );
  
    // Filter initialData to only include allowed fields
    const filteredData = {};
    allowedFields.forEach((fieldName) => {
      if (initialData.hasOwnProperty(fieldName)) {
        filteredData[fieldName] = initialData[fieldName];
      }
    });
  
    reset(filteredData);
  }, [initialData, reset, formSections]);
  

  const handleFormSubmit = async () => {
    const isValid = await trigger(); // validate all fields

    if (!isValid) {
      showErrorToast("Error", 'Please fill all the fields and continue')
      return;
    }

    if (onPrimaryAction) {
      onPrimaryAction(getValues()); // get latest form values
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryAction) {
      onSecondaryAction(getValues());
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
      {formSections.map((section) => (
        <FormSection
          key={section.title}
          title={section.title}
          fields={section.fields}
          control={control}
        />
      ))}
      <div className="flex justify-end space-x-4 mt-7">
        <Button
          type="button"
          variant="secondary"
          onClick={handleSecondaryClick}
        >
          {secondaryButtonText}
        </Button>
        <Button disabled={isLoading} type="submit">
          {primaryButtonText}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;