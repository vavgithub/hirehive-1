// Validation rules in a separate file, e.g., validationRules.js
export const validationRules = {
  firstName: {
    required: "First name is required",
    validate: (value) => value.trim() !== "" || "First name is required",
  },
  lastName: {
    required: "Last name is required",
    validate: (value) => value.trim() !== "" || "Last name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  },
  phoneNumber: {
    required: "Phone number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Phone number must be exactly 10 digits",
    },
  },
  portfolio: {
    required: "Portfolio link is required",
    pattern: {
      message: "Please enter a valid URL",
    },
    validate: (value) => value.trim() !== "" || "Portfolio link is required",
  },
  experience: {
    required: "Experience is required",
    min: {
      value: 0,
      message: "Experience cannot be negative",
    },
  },
  noticePeriod: {
    required: "Notice period is required",
    min: {
      value: 0,
      message: "Notice period cannot be negative",
    },
  },
  currentCTC: {
    min: {
      value: 0,
      message: "CTC cannot be negative",
    },
    max: {
      value: 99,
      message: "Current CTC must be a two-digit value (e.g., 3 or 15)",
    },
    validate: (value) => {
      if (value && isNaN(value)) {
        return "Value must be a valid number.";
      }
      return true;
    },
  },
  expectedCTC: {
    min: {
      value: 0,
      message: "CTC cannot be negative",
    },
    max: {
      value: 99,
      message: "Expected CTC must be a two-digit value (e.g., 3 or 15)",
    },
    // Custom validation to ensure expectedCTC is greater than currentCTC
    validate: (value) => {
      if (value && isNaN(value)) {
        return "Value must be a valid number.";
      }
      return true;
    },
  },
  hourlyRate: {
    validate: (value) => {
      // If you want to enforce it being greater than 0 (or any other rules)
      if (value !== undefined && value !== null && value !== '' && 
          (isNaN(value) || parseFloat(value) <= 0)) {
        return 'Hourly rate must be a positive number.';
      }
      return true;
    }
  },
  resumeFile: {
    required: "Resume is required",
  },
  skills: {
    required: "At least one skill is required",
    validate: (value) => value.length > 0 || "Please add at least one skill",
  },
};

export const validateProfileImages = (file) => {
  if (!file) throw new Error("No file selected.");

  // Allowed file types
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPG, JPEG, and PNG files are allowed."
    );
  }

  return true;
};

export const validateResume = (file) => {
  if (!file) throw new Error("No file selected.");

  // Allowed file types
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]; // PDF and DOCX

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only PDF and DOCX files are allowed.");
  }
  return true;
};
