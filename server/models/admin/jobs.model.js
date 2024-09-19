import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['multiple', 'text'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  options: [String],
  required: {
    type: Boolean,
    default: false
  },
  answerType: {
    type: String,
    enum: ['text', 'number'],
    default: 'text'
  }
});

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required:true,
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
      enum: ["", "Full Time", "Contract", "Internship"],
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
    skills: {
      type: [String],
    },
    jobDescription: {
      type: String,
    },
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
    questions: [questionSchema]
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);