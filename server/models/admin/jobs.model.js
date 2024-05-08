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
      enum:['',"fulltime" , "internship"],
      default:"fulltime",
    },
    category:{
      type:String,
      enum:['',"design" , "engineering" , "sales" , "marketing"],
      default:"design",
    },
    experienceLevel:{
      type:String,
      enum:['',"entry" , "intermidiate" , "senior"],
      default:"entry",
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
      enum: [ '', 'active', 'draft' , 'archived'], // Define possible values for status
      default: 'draft', // Set default value for status
    }     
  },
  { timestamps: true }
);

export const jobs = mongoose.model("jobs", jobSchema);
