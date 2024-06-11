import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
    },
    workplaceType: {
      type: String,
      lowercase: true,
      trim: true,
    },
    employeeLocation: {
      type: String,
      lowercase: true,
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
        "frontenddeveloper",
        "uiux",
        "motiongraphic",
        "videoeditor",
        "digitalmarketingexecutive",
        "projectmanager",
        "artdirector",
        "3d"
      ],
      default: "frontendDeveloper",
    },
    fromExperience: {
      type: Number,
      
      min: 1,
    },
    toExperience: {
      type: Number,
     
      min: 2, // Assuming this will always be greater than fromExperience
    },
    budgetFrom: {
      type: Number,
  
    },
    budgetTo: {
      type: Number,

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
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
