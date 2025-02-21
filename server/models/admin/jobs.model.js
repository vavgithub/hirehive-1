import mongoose from "mongoose";

// Schema for additional questions in a job
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['multiple', 'text'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [String],
  required: {
    type: Boolean,
    default: false,
  },
  answerType: {
    type: String,
    enum: ['text', 'number' , 'link'],
    default: 'text',
  },
});

// Main job schema
const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    workplaceType: {
      type: String,
      trim: true,
    },
    employeeLocation: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["", "Full Time","Part Time", "Contract", "Internship"],
      default: "Full Time",
    },
    jobProfile: {
      type: String,
      enum: [
        "",
        "Frontend Developer",
        "UI UX",
        "Motion Graphic",
        "Video Editor",
        "Digital Marketing Executive",
        "Project Manager",
        "Art Director",
        "3D",
        // Add more job profiles as needed
      ],
      default: "Frontend Developer",
    },
    experienceFrom: {
      type: Number,
      min: 0,
    },
    experienceTo: {
      type: Number,
      min: 1,
    },
    budgetFrom: {
      type: Number,
      min: 0,
    },
    budgetTo: {
      type: Number,
      min: 1,
    },
    skills: [String],
    jobDescription: String,
    status: {
      type: String,
      enum: ["", "open", "draft", "closed"],
    },
    closingReason: {
      type: String,
      enum: [
        "",
        "Hired",
        "Lack of suitable candidates",
        "Budget Constraints",
        "Changes in business needs",
        "Don't want more entries",
      ],
      default: "",
    },
    applyClickCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [questionSchema],
    // No 'stages' field here; stages are defined externally
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
