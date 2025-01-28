// Validation rules in a separate file, e.g., validationRules.js
export const validationRules = {
    firstName: {
      required: 'First name is required',
      validate: (value) =>
        value.trim() !== '' || 'First name is required',
    },
    lastName: {
      required: 'Last name is required',
      validate: (value) =>
        value.trim() !== '' || 'Last name is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address',
      },
    },
    phoneNumber: {
      required: 'Phone number is required',
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Phone number must be exactly 10 digits',
      },
    },
    portfolio: {
      required: 'Portfolio link is required',
      pattern: {
        message: 'Please enter a valid URL',
      },
      validate: (value) =>
        value.trim() !== '' || 'Portfolio link is required',
    },
    experience: {
      required: 'Experience is required',
      min: {
        value: 0,
        message: 'Experience cannot be negative',
      },
    },
    noticePeriod: {
      required: 'Notice period is required',
      min: {
        value: 0,
        message: 'Notice period cannot be negative',
      },
    },
    currentCTC: {
      required: 'Current CTC is required',
      min: {
        value: 0,
        message: 'CTC cannot be negative',
      },
    },
    expectedCTC: {
      required: 'Expected CTC is required',
      min: {
        value: 0,
        message: 'CTC cannot be negative',
      },
      validate: (value, formValues) => {
        const currentCTC = parseFloat(formValues.currentCTC);
        return parseFloat(value) > currentCTC || 'Expected CTC should be higher than current CTC';
      },
    },
    resumeFile: {
      required: 'Resume is required',
    },
    skills: {
      required: 'At least one skill is required',
      validate: (value) => value.length > 0 || 'Please add at least one skill',
    },
  };
  