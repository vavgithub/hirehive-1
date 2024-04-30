import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "loc is required"],
      lowercase: true,
      trim: true,
    },
    category: {
      type: Array,
      required: [true, "cat is required"],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "des is required"],
    },
    overview: {
      type: String,
      required: [true, "overview is required"],
      lowercase: true,
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, "req is required"],
      lowercase: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["fulltime", "internship"],
      required: true,
    },
    experienceLevel:{
        type:String,
        enum:["entry" , "intermidiate" , "senior"],
        required:true,
    },
    jobFunction:{
        type:String,
        enum:["design" , "engineering" , "sales" , "marketing"],
        required:true,
    }    
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
