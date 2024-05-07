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
    jobType:{
      type:String,
      enum:["fulltime" , "internship"],
      required:true,
    },
    category:{
      type:String,
      enum:["design" , "engineering" , "sales" , "marketing"],
      required:true,
    },
    experienceLevel:{
      type:String,
      enum:["entry" , "intermidiate" , "senior"],
      required:true,
    },
    description: {
      type: String,
      required: [true, "des is required"],
    },
    requirements: {
      type: String,
      required: [true, "req is required"],
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
