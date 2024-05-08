import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      lowercase: true,
      trim: true,
    },
    jobType:{
      type:String,
      enum:["fulltime" , "internship"],
    },
    category:{
      type:String,
      enum:["design" , "engineering" , "sales" , "marketing"],
    },
    experienceLevel:{
      type:String,
      enum:["entry" , "intermidiate" , "senior"],
    },
    description: {
      type: String,
    },
    requirements: {
      type: String,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'draft' , 'archived'], // Define possible values for status
  }     
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
