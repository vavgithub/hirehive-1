import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
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
        "Art Director",
        "3D",
      ],
      default: "Frontend Developer",
    },
    experienceFrom: {
      type: Number,
      min: 1,
    },
    experienceTo: {
      type: Number,
      min: 2, // Assuming this will always be greater than fromExperience
    },
    budgetFrom: {
      type: Number,
      min: 0,
    },
    budgetTo: {
      type: Number,
      min: 0,
    },
    skills: {
      type: [String],
    },
    jobDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: ["", "open", "draft", "closed"], // Define possible values for status
    },
    closingReason: {
      type: String,
      enum: [
        "",
        "Hired",
        "Lack of suitable candidates",
        "Budget Constraints",
        "Changes in business needs",
        "Don’t want more entries",
      ],
      default: "",
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
